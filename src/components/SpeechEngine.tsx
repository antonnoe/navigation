'use client';

export interface SpeechSegment {
  text: string;
  lang: 'nl-NL' | 'fr-FR';
  priority: 'safety' | 'info';
}

class SpeechEngineService {
  private activeUtterance: SpeechSynthesisUtterance | null = null;

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

  public speakSegment(segment: SpeechSegment, speed: number = 1.0): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve();

      // Bij 'safety' (need-to-know) breken we onmiddellijk lopende info af
      if (segment.priority === 'safety') {
        this.stopAll();
      }

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

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  }

  // Spreekt een gemengde zin vloeiend achter elkaar uit
  public async speakMixedSentence(segments: SpeechSegment[], mode: 'toergids' | 'alleen-pois' | 'stil') {
    for (const segment of segments) {
      if (mode === 'stil') break;
      if (mode === 'alleen-pois' && segment.priority === 'info') continue; // Sla toergids-verhalen over
      await this.speakSegment(segment);
    }
  }
}

export const SpeechEngine = new SpeechEngineService();
