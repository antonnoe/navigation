// Wekelijkse markten en brocantes onderweg

export type WekelijksEvent = {
  id: string;
  dorp: string;
  departementCode: string;
  coordinaten: [number, number]; // [lng, lat]
  dagVanDeWeek: number; // 0 = zondag ... 6 = zaterdag
  startTijd: string; // "HH:MM"
  eindTijd: string; // "HH:MM"
  verhaal: string;
};

// TODO: vullen met echte marktdata (coördinaten + verhaal) per plaats.
export const wekelelijkseEvents: WekelijksEvent[] = [];
