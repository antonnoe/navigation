import { booleanPointInPolygon, distance, multiPolygon, point, polygon } from "@turf/turf";
import type { Feature, Point } from "geojson";
import { departementen, type Departement } from "./departementen";
import { events, type NavigatieEvent } from "./events";

const NADERING_RADIUS_KM = 5;

function valtBinnenDepartement(positie: Feature<Point>, departement: Departement): boolean {
  if (departement.grenzen.type === "Polygon") {
    return booleanPointInPolygon(positie, polygon(departement.grenzen.coordinates as number[][][]));
  }
  return booleanPointInPolygon(positie, multiPolygon(departement.grenzen.coordinates as number[][][][]));
}

export function zoekDepartement(longitude: number, latitude: number): string | null {
  const positie = point([longitude, latitude]);

  for (const departement of departementen) {
    if (valtBinnenDepartement(positie, departement)) {
      return departement.code;
    }
  }

  return null;
}

export function zoekNaderendEvent(longitude: number, latitude: number): NavigatieEvent | null {
  const positie = point([longitude, latitude]);

  for (const event of events) {
    const eventPositie = point([event.longitude, event.latitude]);
    if (distance(positie, eventPositie, { units: "kilometers" }) <= NADERING_RADIUS_KM) {
      return event;
    }
  }

  return null;
}
