export const contactBudgetOptions = [
  "Under £1,000",
  "£1,000 to under £5,000",
  "£5,000 to under £10,000",
  "£10,000 to under £20,000",
  "£20,000 or more",
  "Not sure yet",
] as const;

export const contactFocusOptions = [
  "Not sure yet",
  "Website",
  "Online store",
  "Business software",
  "Legacy system rebuild",
  "Customer portal",
  "New product",
  "Integration or automation",
  "Shopify app",
  "Discord bot",
  "Ongoing support",
] as const;

export type ContactBudgetOption = (typeof contactBudgetOptions)[number];
export type ContactFocusOption = (typeof contactFocusOptions)[number];

export const contactServicePresets: Record<string, ContactFocusOption> = {
  shopify: "Shopify app",
  discord: "Discord bot",
};

// Accept known values from forms opened before the current release.
const previousBudgetOptions = [
  "\u00a30-\u00a31,000",
  "\u00a31,000-\u00a35,000",
  "\u00a310,000-\u00a320,000",
  "\u00a320,000+",
] as const;

const previousFocusOptions = [
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

export function isContactBudgetOption(value: string) {
  return [...contactBudgetOptions, ...previousBudgetOptions].some(
    (option) => option === value,
  );
}

export function isContactFocusOption(value: string) {
  return [...contactFocusOptions, ...previousFocusOptions].some(
    (option) => option === value,
  );
}
