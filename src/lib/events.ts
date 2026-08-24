// Wekelijkse markten en hun tijden

export type MarktEvent = {
  plaats: string;
  departementCode: string;
  weekdag: "ma" | "di" | "wo" | "do" | "vr" | "za" | "zo";
  starttijd: string;
  eindtijd: string;
};

// TODO: vullen met echte marktdata per plaats.
export const events: MarktEvent[] = [];
