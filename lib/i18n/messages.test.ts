import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { getMessages, getTranslator } from "@/lib/i18n/messages";
import { deepMergeMessages, lookupMessagePath } from "@/lib/i18n/deep-merge";
import { APP_LOCALES } from "@/lib/i18n/locales";
import { getFaqSections } from "@/lib/i18n/faq";
import {
  getPrivacyPolicy,
  getTermsOfService,
} from "@/lib/legal/documents/load-legal";
import { LEGAL_PRODUCT_NAME } from "@/lib/legal/constants";

function leafPaths(value: unknown, prefix = ""): string[] {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value as Record<string, unknown>).flatMap(
      ([key, child]) => leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return prefix ? [prefix] : [];
}

describe("i18n messages", () => {
  it("loads EN catalog and DE overlay with EN fallback", () => {
    expect(getMessages("en").nav.pricing).toBe("Pricing");
    expect(getMessages("de").nav.pricing).toBe("Preise");
    expect(getMessages("de").dashboard.title).toBe(LEGAL_PRODUCT_NAME);
    expect(getMessages("en").notes.title).toBe("Notes");
    expect(getMessages("en").home.ctaTrial).toBe("Start free trial");
  });

  it("translates with vars and falls back to path", () => {
    const t = getTranslator("en");
    expect(t("notes.used", { count: 3, limit: 25 })).toBe(
      "3 of 25 notes used.",
    );
    expect(t("missing.key")).toBe("missing.key");
  });

  it("deep merges and looks up paths", () => {
    const merged = deepMergeMessages(
      { nav: { a: "1", b: "2" }, x: "y" },
      { nav: { b: "B" } },
    );
    expect(merged).toEqual({ nav: { a: "1", b: "B" }, x: "y" });
    expect(lookupMessagePath(merged, "nav.b")).toBe("B");
    expect(deepMergeMessages({ a: 1 }, null)).toEqual({ a: 1 });
    expect(deepMergeMessages({ a: 1 }, undefined)).toEqual({ a: 1 });
    expect(
      deepMergeMessages(
        { nav: { a: "1" } },
        { nav: null as unknown as Record<string, unknown> },
      ),
    ).toEqual({ nav: null });
    expect(lookupMessagePath({ nav: { a: 1 } }, "nav.a")).toBeUndefined();
  });

  it("keeps leaf-key parity across every locale overlay", () => {
    const messagesDir = path.join(process.cwd(), "lib", "i18n", "messages");
    const en = JSON.parse(
      readFileSync(path.join(messagesDir, "en.json"), "utf8"),
    ) as Record<string, unknown>;
    const enKeys = new Set(leafPaths(en));

    for (const locale of APP_LOCALES) {
      if (locale === "en") {
        continue;
      }
      const overlay = JSON.parse(
        readFileSync(path.join(messagesDir, `${locale}.json`), "utf8"),
      ) as Record<string, unknown>;
      const overlayKeys = new Set(leafPaths(overlay));
      expect(
        [...enKeys].filter((key) => !overlayKeys.has(key)),
        `${locale} missing keys`,
      ).toEqual([]);
      expect(
        [...overlayKeys].filter((key) => !enKeys.has(key)),
        `${locale} extra keys`,
      ).toEqual([]);
    }
  });
});

describe("i18n FAQ and legal loaders", () => {
  it("keeps FAQ section and item ids stable across locales", () => {
    const en = getFaqSections("en");
    const enSectionIds = en.map((section) => section.id);
    const enItemIds = en.flatMap((section) =>
      section.items.map((item) => item.id),
    );

    for (const locale of APP_LOCALES) {
      const sections = getFaqSections(locale);
      expect(sections.map((section) => section.id)).toEqual(enSectionIds);
      expect(
        sections.flatMap((section) => section.items.map((item) => item.id)),
      ).toEqual(enItemIds);
    }
  });

  it("returns translated privacy and terms for DE", () => {
    const enPrivacy = getPrivacyPolicy("en");
    const dePrivacy = getPrivacyPolicy("de");
    expect(dePrivacy.title).not.toBe(enPrivacy.title);
    expect(dePrivacy.sections.length).toBe(enPrivacy.sections.length);

    const enTerms = getTermsOfService("en");
    const deTerms = getTermsOfService("de");
    expect(deTerms.title).not.toBe(enTerms.title);
    expect(deTerms.sections.length).toBe(enTerms.sections.length);
  });
});
