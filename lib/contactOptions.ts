export const contactBudgetOptions = [
  "\u00a30-\u00a31,000",
  "\u00a31,000-\u00a35,000",
  "\u00a310,000-\u00a320,000",
  "\u00a320,000+",
] as const;

export const contactFocusOptions = [
  "Website design and frontend build",
  "Legacy system rebuild",
  "Backend services and APIs",
  "Database structure and reporting",
  "Ecommerce and product systems",
  "Shopify app build",
  "Discord bot build",
  "Customer portal or dashboard",
  "MVP design and build",
  "Monday.com and business integrations",
  "Warehouse, stock and QR tracking systems",
  "Custom dashboards and internal tools",
  "Other",
] as const;

export type ContactBudgetOption = (typeof contactBudgetOptions)[number];
export type ContactFocusOption = (typeof contactFocusOptions)[number];

export function isContactBudgetOption(value: string): value is ContactBudgetOption {
  return contactBudgetOptions.includes(value as ContactBudgetOption);
}

export function isContactFocusOption(value: string): value is ContactFocusOption {
  return contactFocusOptions.includes(value as ContactFocusOption);
}
