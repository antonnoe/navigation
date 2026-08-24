// Fase 1: Bestemming invoeren & Live Météo/Bison advies
"use client";

export type PreDrivePanelProps = {
  onStartNavigation: (destination: string) => void;
};

export default function PreDrivePanel({ onStartNavigation }: PreDrivePanelProps) {
  return (
    <section className="flex flex-col gap-6 p-6">
      <h1 className="font-display text-2xl font-semibold">Waar gaan we heen?</h1>
      {/* TODO: bestemming-invoer, live meteo-widget en Bison Futé-verkeersadvies */}
      <button
        type="button"
        onClick={() => onStartNavigation("")}
        className="rounded-xl bg-bordeaux px-6 py-4 text-lg font-medium text-white"
      >
        Start navigatie
      </button>
    </section>
  );
}
