// Genereert public/data/departementen.geojson: een vereenvoudigde versie van
// gregoiredavid/france-geojson (alle 96 metropolitane departementen), zodat de
// app deze als same-origin static asset kan laden i.p.v. een 3.4MB externe fetch.
//
// Run: node scripts/simplify-departementen.mjs

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { simplify } from "@turf/turf";

const BRON_URL =
  "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";
const TOLERANCE = 0.01; // Geverifieerd tegen 18 test-steden (incl. kust/eilanden): 0 misclassificaties
const UITVOER_PAD = fileURLToPath(
  new URL("../public/data/departementen.geojson", import.meta.url)
);

const response = await fetch(BRON_URL);
if (!response.ok) {
  throw new Error(`Kon bron niet ophalen: ${response.status} ${response.statusText}`);
}
const data = await response.json();

const vereenvoudigd = simplify(data, { tolerance: TOLERANCE, highQuality: false, mutate: false });

const schoongemaakt = {
  type: "FeatureCollection",
  features: vereenvoudigd.features.map((f) => ({
    type: "Feature",
    properties: { code: f.properties.code, nom: f.properties.nom },
    geometry: f.geometry,
  })),
};

const json = JSON.stringify(schoongemaakt);
writeFileSync(UITVOER_PAD, json);
console.log(
  `Geschreven: ${UITVOER_PAD} (${schoongemaakt.features.length} features, ${(json.length / 1024).toFixed(0)} KB)`
);
