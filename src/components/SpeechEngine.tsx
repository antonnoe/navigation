// De meertalige audio-gids (Vloeiend NL met nette FR uitspraak)
"use client";

// TODO: koppelen aan een TTS-provider die Frans plaatsnamen correct
// uitspreekt binnen een Nederlandstalige gids (bv. SSML met lang-tags per
// woord in plaats van simpele browser SpeechSynthesis).

export type SpeechEngineProps = {
  text: string;
  enabled: boolean;
};

export default function SpeechEngine({ text, enabled }: SpeechEngineProps) {
  if (!enabled || !text) return null;
  return null;
}
