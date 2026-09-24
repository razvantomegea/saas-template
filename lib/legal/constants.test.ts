import { describe, expect, it } from "vitest";

import {
  getCopyrightNotice,
  getFormattedLegalAddress,
  LEGAL_COMPANY_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import {
  getPrivacyPolicy,
  getTermsOfService,
} from "@/lib/legal/documents/load-legal";

describe("legal constants", () => {
  it("formats copyright and address helpers", () => {
    expect(getCopyrightNotice()).toContain(LEGAL_COMPANY_NAME);
    expect(getCopyrightNotice()).toContain(String(new Date().getFullYear()));
    expect(getFormattedLegalAddress()).toBe(LEGAL_REGISTERED_ADDRESS);
  });
});

describe("load-legal", () => {
  it("returns English documents for the default locale", () => {
    const privacy = getPrivacyPolicy("en");
    const terms = getTermsOfService("en");

    expect(privacy.title).toMatch(/privacy/i);
    expect(terms.title).toMatch(/terms/i);
  });

  it("returns localized documents when available", () => {
    expect(getPrivacyPolicy("de").title.length).toBeGreaterThan(0);
    expect(getTermsOfService("de").title.length).toBeGreaterThan(0);
    expect(getPrivacyPolicy("ja").title.length).toBeGreaterThan(0);
    expect(getTermsOfService("ja").title.length).toBeGreaterThan(0);
  });

  it("falls back to English when locale is omitted", () => {
    expect(getPrivacyPolicy().title).toBe(getPrivacyPolicy("en").title);
    expect(getTermsOfService().title).toBe(getTermsOfService("en").title);
  });
});
