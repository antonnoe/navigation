// Fase 3: Mapbox-kaart met grote [+][-] knoppen (geen knijpgebaren)
"use client";

// TODO: vervangen door Mapbox GL JS zodra `mapbox-gl` is geïnstalleerd en
// NEXT_PUBLIC_MAPBOX_TOKEN is geconfigureerd. Zoomen verloopt via de knoppen
// hieronder, niet via knijpgebaren (senioren-vriendelijk).

export type NavigationMapProps = {
  destination: string;
};

export default function NavigationMap({ destination }: NavigationMapProps) {
  return (
    <section className="relative flex-1">
      <div className="flex h-full min-h-80 items-center justify-center bg-black/5">
        <p className="font-body text-foreground/60">
          Kaart naar {destination || "bestemming"} (nog niet geladen)
        </p>
      </div>
      <div className="absolute right-4 bottom-4 flex flex-col gap-3">
        <button
          type="button"
          aria-label="Inzoomen"
          className="h-14 w-14 rounded-full bg-white text-2xl font-semibold shadow-lg"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Uitzoomen"
          className="h-14 w-14 rounded-full bg-white text-2xl font-semibold shadow-lg"
        >
          −
        </button>
      </div>
    </section>
  );
}
