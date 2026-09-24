import { describe, expect, it } from "vitest";

import { localizedHrefForLocale } from "@/lib/i18n/link";

describe("localizedHrefForLocale", () => {
  it("leaves absolute and special URIs unchanged", () => {
    expect(localizedHrefForLocale("de", "https://example.com")).toBe(
      "https://example.com",
    );
    expect(localizedHrefForLocale("de", "mailto:a@b.com")).toBe(
      "mailto:a@b.com",
    );
    expect(localizedHrefForLocale("de", "#top")).toBe("#top");
  });

  it("localizes paths and preserves query strings", () => {
    expect(localizedHrefForLocale("de", "/pricing")).toBe("/de/pricing");
    expect(localizedHrefForLocale("de", "/signup?next=%2Fdashboard")).toBe(
      "/de/signup?next=%2Fdashboard",
    );
    expect(localizedHrefForLocale("en", "?x=1")).toBe("/?x=1");
  });
});
