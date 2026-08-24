// Nederlandse wetenswaardigheden per departement, opgezocht op departementcode

export type StreekVerhaal = {
  naam: string;
  verhaal: string;
};

// TODO: vullen met echte streekverhalen, bv. streekVerhalen["62"] = { naam: "Pas-de-Calais", verhaal: "..." }.
export const streekVerhalen: Record<string, StreekVerhaal> = {};
