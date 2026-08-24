// De "Safety First" pechknop met grote letters en GPS-locatie
"use client";

// TODO: GPS-locatie ophalen (navigator.geolocation) en doorsturen naar het
// gekozen pechhulp-nummer/-kanaal zodra dat is vastgesteld.

export default function EmergencyButton() {
  return (
    <button
      type="button"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-bordeaux px-8 py-5 text-xl font-bold text-white shadow-xl"
    >
      PECH
    </button>
  );
}
