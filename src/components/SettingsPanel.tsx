// Fase 2: Grote senioren-knoppen voor audio-voorkeuren (Hond/EV)
"use client";

export type AudioProfile = "standaard" | "hond" | "ev";

export type SettingsPanelProps = {
  value: AudioProfile;
  onChange: (profile: AudioProfile) => void;
};

const PROFILES: { id: AudioProfile; label: string }[] = [
  { id: "standaard", label: "Standaard" },
  { id: "hond", label: "Met hond" },
  { id: "ev", label: "Elektrische auto" },
];

export default function SettingsPanel({ value, onChange }: SettingsPanelProps) {
  return (
    <section className="flex flex-col gap-4 p-6">
      <h2 className="font-display text-xl font-semibold">Audio-voorkeuren</h2>
      <div className="flex flex-col gap-3">
        {PROFILES.map((profile) => (
          <button
            key={profile.id}
            type="button"
            onClick={() => onChange(profile.id)}
            aria-pressed={value === profile.id}
            className={`rounded-xl px-6 py-5 text-lg font-medium ${
              value === profile.id
                ? "bg-actueel text-white"
                : "bg-black/5 text-foreground"
            }`}
          >
            {profile.label}
          </button>
        ))}
      </div>
    </section>
  );
}
