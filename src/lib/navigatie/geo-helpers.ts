import * as turf from '@turf/turf';
import type { Feature, MultiPolygon, Polygon } from 'geojson';
import { haalOfficiëleDepartementsGrenzen, type DepartementFeature } from './departementen';
import { wekelelijkseEvents, type WekelijksEvent } from './events';

const NADERING_RADIUS_KM = 3.0;

function isPolygonFeature(
  feature: DepartementFeature
): feature is Feature<Polygon | MultiPolygon, DepartementFeature['properties']> {
  return feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon';
}

// Controleer exact in welk van de 96 departementen de auto rijdt
export async function zoekDepartement(lng: number, lat: number): Promise<string | null> {
  const grenzenData = await haalOfficiëleDepartementsGrenzen();
  if (!grenzenData) return null;

  const punt = turf.point([lng, lat]);

  for (const feature of grenzenData.features) {
    if (!isPolygonFeature(feature)) continue;
    if (turf.booleanPointInPolygon(punt, feature)) {
      return feature.properties.code; // Geeft exact de 2-cijferige code terug (bijv. "60" voor Oise)
    }
  }
  return null;
}

// Controleer op naderende zaterdagmarkten
export function zoekNaderendEvent(lng: number, lat: number): WekelijksEvent | null {
  const autoPunt = turf.point([lng, lat]);
  const nu = new Date();
  const huidigeDag = nu.getDay(); // 0 = Zondag, 6 = Zaterdag
  const huidigeTijd = nu.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });

  for (const event of wekelelijkseEvents) {
    if (event.dagVanDeWeek === huidigeDag && huidigeTijd >= event.startTijd && huidigeTijd <= event.eindTijd) {
      const eventPunt = turf.point(event.coordinaten);
      const afstand = turf.distance(autoPunt, eventPunt, { units: 'kilometers' });

      if (afstand <= NADERING_RADIUS_KM) {
        return event;
      }
    }
  }
  return null;
}
