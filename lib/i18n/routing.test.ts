import { describe, expect, it } from "vitest";

import {
  localizedPath,
  stripLocalePrefix,
  switchLocalePath,
} from "@/lib/i18n/routing";

describe("localizedPath", () => {
  it("keeps English paths unprefixed", () => {
    expect(localizedPath("en", "/")).toBe("/");
    expect(localizedPath("en", "/pricing")).toBe("/pricing");
    expect(localizedPath("en", "pricing")).toBe("/pricing");
  });

  it("prefixes non-default locales", () => {
    expect(localizedPath("de", "/")).toBe("/de");
    expect(localizedPath("de", "/pricing")).toBe("/de/pricing");
    expect(localizedPath("ja", "/blog/hello")).toBe("/ja/blog/hello");
  });
});

describe("stripLocalePrefix", () => {
  it("detects locale prefixes and defaults to en", () => {
    expect(stripLocalePrefix("/de/pricing")).toEqual({
      locale: "de",
      pathname: "/pricing",
    });
    expect(stripLocalePrefix("/de")).toEqual({
      locale: "de",
      pathname: "/",
    });
    expect(stripLocalePrefix("/pricing")).toEqual({
      locale: "en",
      pathname: "/pricing",
    });
  });
});

describe("switchLocalePath", () => {
  it("switches between prefixed and unprefixed locales", () => {
    expect(switchLocalePath("/de/pricing", "en")).toBe("/pricing");
    expect(switchLocalePath("/pricing", "de")).toBe("/de/pricing");
    expect(switchLocalePath("/ja", "ru")).toBe("/ru");
  });
});
