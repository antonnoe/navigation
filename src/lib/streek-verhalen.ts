// Nederlandse wetenswaardigheden per departement

export type StreekVerhaal = {
  departementCode: string;
  titel: string;
  tekst: string;
};

// TODO: vullen met echte streekverhalen per departement.
export const streekVerhalen: StreekVerhaal[] = [];
