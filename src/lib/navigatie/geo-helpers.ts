import * as turf from '@turf/turf';
import type { Feature, LineString, MultiPolygon, Point, Polygon } from 'geojson';
import { haalOfficiëleDepartementsGrenzen, type DepartementFeature } from './departementen';
import { wekelelijkseEvents, type WekelijksEvent } from './events';

const NADERING_RADIUS_KM = 3.0;
// Vangnet voor het vereenvoudigde grenzenbestand: bij kustlijnen kan simplificatie
// een smalle kloof tussen polygon-rand en werkelijke locatie achterlaten (bv.
// Saint-Malo lag ~30m buiten de vereenvoudigde rand). Bij geen directe treffer
// pakken we het departement met de dichtstbijzijnde rand, maar alleen binnen
// deze marge - anders zou een auto in België/Nederland (60km+ tot de dichtstbijzijnde
// Franse departementsrand) ten onrechte een departement toegewezen krijgen.
const FALLBACK_MAX_RANDAFSTAND_KM = 5;

function isPolygonFeature(
  feature: DepartementFeature
): feature is Feature<Polygon | MultiPolygon, DepartementFeature['properties']> {
  return feature.geometry?.type === 'Polygon' || feature.geometry?.type === 'MultiPolygon';
}

function afstandTotRandKm(punt: Feature<Point>, feature: Feature<Polygon | MultiPolygon>): number {
  const lijn = turf.polygonToLine(feature);
  const lijnFeatures = lijn.type === 'FeatureCollection' ? lijn.features : [lijn];

  let minKm = Infinity;
  for (const lf of lijnFeatures) {
    if (lf.geometry.type === 'LineString') {
      minKm = Math.min(minKm, turf.pointToLineDistance(punt, lf as Feature<LineString>, { units: 'kilometers' }));
    } else {
      for (const coords of lf.geometry.coordinates) {
        minKm = Math.min(minKm, turf.pointToLineDistance(punt, turf.lineString(coords), { units: 'kilometers' }));
      }
    }
  }
  return minKm;
}

// Controleer exact in welk van de 96 departementen de auto rijdt
export async function zoekDepartement(lng: number, lat: number): Promise<string | null> {
  const grenzenData = await haalOfficiëleDepartementsGrenzen();
  if (!grenzenData) return null;

  const punt = turf.point([lng, lat]);
  const polygonFeatures = grenzenData.features.filter(isPolygonFeature);

  for (const feature of polygonFeatures) {
    if (turf.booleanPointInPolygon(punt, feature)) {
      return feature.properties.code; // Geeft exact de 2-cijferige code terug (bijv. "60" voor Oise)
    }
  }

  let dichtstbijzijndeCode: string | null = null;
  let minRandafstandKm = Infinity;
  for (const feature of polygonFeatures) {
    const randafstandKm = afstandTotRandKm(punt, feature);
    if (randafstandKm < minRandafstandKm) {
      minRandafstandKm = randafstandKm;
      dichtstbijzijndeCode = feature.properties.code;
    }
  }
  return minRandafstandKm <= FALLBACK_MAX_RANDAFSTAND_KM ? dichtstbijzijndeCode : null;
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
