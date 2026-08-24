import type { Feature, FeatureCollection, Geometry } from "geojson";

export type DepartementProperties = {
  code: string; // De officiële code: "01", "02", "62", "95", etc.
  nom: string; // De Franse naam
};

export type DepartementFeature = Feature<Geometry, DepartementProperties>;
export type DepartementGeoJSON = FeatureCollection<Geometry, DepartementProperties>;

// Open-data bron: gregoiredavid/france-geojson (departementsgrenzen, alle 96
// metropolitane departementen, ~3.4MB). Geverifieerd: properties zijn "code" en "nom".
const DEPARTEMENTEN_GEOJSON_URL =
  "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";

let gecachteGrenzen: DepartementGeoJSON | null = null;

export async function haalOfficiëleDepartementsGrenzen(): Promise<DepartementGeoJSON | null> {
  if (gecachteGrenzen) return gecachteGrenzen;

  try {
    const response = await fetch(DEPARTEMENTEN_GEOJSON_URL);
    if (!response.ok) throw new Error("Fout bij laden van Franse overheidsgrenzen");

    const data = (await response.json()) as DepartementGeoJSON;
    gecachteGrenzen = data;
    return gecachteGrenzen;
  } catch (error) {
    console.error("Geografische database-fout:", error);
    return null;
  }
}
