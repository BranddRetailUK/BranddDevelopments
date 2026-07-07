export const contactBudgetOptions = [
  "\u00a30-\u00a31,000",
  "\u00a31,000-\u00a35,000",
  "\u00a310,000-\u00a320,000",
  "\u00a320,000+",
] as const;

export type ContactBudgetOption = (typeof contactBudgetOptions)[number];

export function isContactBudgetOption(value: string): value is ContactBudgetOption {
  return contactBudgetOptions.includes(value as ContactBudgetOption);
}
