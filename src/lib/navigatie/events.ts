// Wekelijkse markten en brocantes onderweg

export type NavigatieEvent = {
  id: string;
  dorp: string;
  departementCode: string;
  latitude: number;
  longitude: number;
  weekdag: "ma" | "di" | "wo" | "do" | "vr" | "za" | "zo";
  starttijd: string;
  eindtijd: string;
  verhaal: string;
};

// TODO: vullen met echte marktdata (coördinaten + verhaal) per plaats.
export const events: NavigatieEvent[] = [];
