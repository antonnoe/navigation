'use client';

export interface SpeechSegment {
  text: string;
  lang: 'nl-NL' | 'fr-FR';
  priority: 'safety' | 'info';
}

// Vangnet-timeout per segment: sommige browsers (bekend Chrome-gedrag) laten een
// utterance soms stil mislukken na cancel()+speak() in snelle opeenvolging - geen
// onend, geen onerror, niets. Zonder vangnet blijft de rest van de zin dan voor
// altijd wachten. We schatten een ruime leestijd en gaan hoe dan ook verder.
const MIN_TIMEOUT_MS = 1500;
const MS_PER_CHAR = 90;

class SpeechEngineService {
  private stemmenGereed: Promise<void> | null = null;
  // Meerdere speakMixedSentence-oproepen kunnen door de app tegelijk getriggerd
  // worden (bv. een departement-verhaal én een Bison Futé-melding in dezelfde
  // GPS-tick). Zonder coördinatie concurreren die om dezelfde speechSynthesis-
  // wachtrij en kappen ze elkaar willekeurig af. wachtrij serialiseert ze;
  // huidigeGeneratie zorgt dat een safety-onderbreking oudere, nog lopende
  // reeksen direct laat stoppen i.p.v. erdoorheen te blijven praten.
  private wachtrij: Promise<void> = Promise.resolve();
  private huidigeGeneratie = 0;

  private wachtOpStemmen(): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();
    if (this.stemmenGereed) return this.stemmenGereed;

    this.stemmenGereed = new Promise((resolve) => {
      if (window.speechSynthesis.getVoices().length > 0) {
        resolve();
        return;
      }
      // Vangnet: sommige browsers vuren 'voiceschanged' nooit
      const timeoutId = setTimeout(resolve, 1000);
      window.speechSynthesis.addEventListener(
        'voiceschanged',
        () => {
          clearTimeout(timeoutId);
          resolve();
        },
        { once: true }
      );
    });
    return this.stemmenGereed;
  }

  private getVoiceForLang(lang: string): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined') return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.lang.startsWith(lang)) || null;
  }

  public stopAll(): void {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  }

  // Voegt opeenvolgende segmenten met dezelfde taal en prioriteit samen tot één
  // utterance. Ze zouden toch identieke stem/rate/pitch krijgen, en elke extra
  // utterance-grens is een kans op een hoorbare hapering.
  private groepeerSegmenten(segments: SpeechSegment[]): SpeechSegment[] {
    const gegroepeerd: SpeechSegment[] = [];
    for (const segment of segments) {
      const vorige = gegroepeerd[gegroepeerd.length - 1];
      if (vorige && vorige.lang === segment.lang && vorige.priority === segment.priority) {
        vorige.text += segment.text;
      } else {
        gegroepeerd.push({ ...segment });
      }
    }
    return gegroepeerd;
  }

  public async speakSegment(segment: SpeechSegment, speed: number = 1.0): Promise<void> {
    await this.wachtOpStemmen();

    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve();

      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.lang = segment.lang;

      // Senior-vriendelijke tweaks: safety-stem is iets lager en daadkrachtiger
      if (segment.priority === 'safety') {
        utterance.rate = speed * 1.05;
        utterance.pitch = 0.9;
      } else {
        utterance.rate = speed * 0.95; // Info rustiger uitspreken
        utterance.pitch = 1.1; // Vriendelijkere toon
      }

      const voice = this.getVoiceForLang(segment.lang);
      if (voice) utterance.voice = voice;

      let afgehandeld = false;
      const afronden = () => {
        if (afgehandeld) return;
        afgehandeld = true;
        clearTimeout(vangnetId);
        resolve();
      };

      utterance.onend = afronden;
      utterance.onerror = afronden;

      // Vangnet tegen stil vastlopende utterances (zie MIN_TIMEOUT_MS hierboven)
      const geschatteMs = MIN_TIMEOUT_MS + segment.text.length * MS_PER_CHAR;
      const vangnetId = setTimeout(afronden, geschatteMs);

      window.speechSynthesis.speak(utterance);
    });
  }

  private async speelSegmentenAf(segments: SpeechSegment[], generatie: number): Promise<void> {
    for (const segment of segments) {
      // Een nieuwere (safety-)oproep heeft deze reeks ingehaald - stop meteen
      // in plaats van nog restsegmenten over de nieuwe boodschap heen te praten.
      if (generatie !== this.huidigeGeneratie) return;
      await this.speakSegment(segment);
    }
  }

  // Spreekt een gemengde zin vloeiend achter elkaar uit. Meerdere gelijktijdige
  // oproepen worden na elkaar afgespeeld (nooit overlappend); een safety-oproep
  // onderbreekt meteen wat er nu speelt of nog in de wachtrij staat.
  public speakMixedSentence(segments: SpeechSegment[], mode: 'toergids' | 'alleen-pois' | 'stil'): Promise<void> {
    if (mode === 'stil') return Promise.resolve();

    const teSprekenSegmenten = this.groepeerSegmenten(
      segments.filter((s) => !(mode === 'alleen-pois' && s.priority === 'info'))
    );
    if (teSprekenSegmenten.length === 0) return Promise.resolve();

    const isSafety = teSprekenSegmenten.some((s) => s.priority === 'safety');
    if (isSafety) {
      this.stopAll();
      this.huidigeGeneratie += 1;
      this.wachtrij = Promise.resolve();
    }

    const mijnGeneratie = this.huidigeGeneratie;
    const dezeBeurt = this.wachtrij.then(() => this.speelSegmentenAf(teSprekenSegmenten, mijnGeneratie));
    this.wachtrij = dezeBeurt.catch(() => {});
    return dezeBeurt;
  }
}

export const SpeechEngine = new SpeechEngineService();
