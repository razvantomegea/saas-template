/**
 * Placeholder legal entity fields — replace before production and have a
 * lawyer review all policies. See docs/setup.md.
 */
export const LEGAL_PRIVACY_PATH = "/privacy" as const;

export const LEGAL_TERMS_PATH = "/terms" as const;

export const LEGAL_COOKIES_PATH = "/cookies" as const;

export const LEGAL_CONTACT_EMAIL = "legal@example.com";

export const LEGAL_COMPANY_NAME = "Example Company Ltd";

export const LEGAL_COMPANY_WEBSITE = "https://example.com/" as const;

export const LEGAL_COMPANY_WEBSITE_URL_PATTERN =
  /^https:\/\/example\.com(?:\/|$)/;

/** Company registration / tax id placeholder. */
export const LEGAL_CUI = "00000000";

export const LEGAL_REGISTERED_ADDRESS =
  "123 Example Street, Example City, EX1 2AB, Country";

export const LEGAL_JURISDICTION_CITY = "Example City";

export const LEGAL_PRODUCT_NAME = "SaaS Template";

export const LEGAL_GOVERNING_LAW = "Example Jurisdiction";

export const LEGAL_REFUND_WINDOW_HOURS = 24;

export const LEGAL_TRIAL_DAYS = 14;

export function getCopyrightNotice(): string {
  return `© ${new Date().getFullYear()} ${LEGAL_COMPANY_NAME}. All rights reserved.`;
}

export function getFormattedLegalAddress(): string {
  return LEGAL_REGISTERED_ADDRESS;
}
