import { describe, expect, it } from "vitest";

import { localizedHref } from "@/components/i18n/LocalizedLink";

describe("localizedHref", () => {
  it("prefixes internal paths for non-default locales", () => {
    expect(localizedHref("de", "/pricing")).toBe("/de/pricing");
    expect(localizedHref("de", "/signup?next=%2Fdashboard")).toBe(
      "/de/signup?next=%2Fdashboard",
    );
  });

  it("leaves default-locale paths unprefixed", () => {
    expect(localizedHref("en", "/pricing")).toBe("/pricing");
  });

  it("bypasses absolute, mailto, hash, tel, and sms URIs", () => {
    expect(localizedHref("de", "https://example.com/x")).toBe(
      "https://example.com/x",
    );
    expect(localizedHref("de", "http://example.com/x")).toBe(
      "http://example.com/x",
    );
    expect(localizedHref("de", "mailto:a@b.com")).toBe("mailto:a@b.com");
    expect(localizedHref("de", "#section")).toBe("#section");
    expect(localizedHref("de", "tel:+15551212")).toBe("tel:+15551212");
    expect(localizedHref("de", "sms:+15551212")).toBe("sms:+15551212");
  });
});
