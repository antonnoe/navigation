import type { Feature, FeatureCollection, Geometry } from "geojson";

export type DepartementProperties = {
  code: string; // De officiële code: "01", "02", "62", "95", etc.
  nom: string; // De Franse naam
};

export type DepartementFeature = Feature<Geometry, DepartementProperties>;
export type DepartementGeoJSON = FeatureCollection<Geometry, DepartementProperties>;

// Lokaal gebundeld, vereenvoudigd bestand (public/data/departementen.geojson):
// alle 96 metropolitane departementen, afgeleid van gregoiredavid/france-geojson
// en vereenvoudigd met @turf/simplify (tolerance 0.01, ~3.4MB -> ~206KB).
// Zie scripts/simplify-departementen.mjs voor hoe het bestand is gegenereerd.
// Same-origin static asset: geen externe fetch, geen netwerkvertraging tijdens het rijden.
const DEPARTEMENTEN_GEOJSON_URL = "/data/departementen.geojson";

let gecachteGrenzen: DepartementGeoJSON | null = null;

export async function haalOfficiëleDepartementsGrenzen(): Promise<DepartementGeoJSON | null> {
  if (gecachteGrenzen) return gecachteGrenzen;

  try {
    const response = await fetch(DEPARTEMENTEN_GEOJSON_URL);
    if (!response.ok) throw new Error("Fout bij laden van departementsgrenzen");

    const data = (await response.json()) as DepartementGeoJSON;
    gecachteGrenzen = data;
    return gecachteGrenzen;
  } catch (error) {
    console.error("Geografische database-fout:", error);
    return null;
  }
}
