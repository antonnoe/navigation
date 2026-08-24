// GeoJSON-grenzen van Franse departementen

// TODO: vervangen door `@types/geojson` zodra die dependency is toegevoegd.
export type GeoJsonPolygon = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

export type Departement = {
  code: string;
  grenzen: GeoJsonPolygon;
};

// TODO: vullen met echte GeoJSON-grenzen per departement.
export const departementen: Departement[] = [];
