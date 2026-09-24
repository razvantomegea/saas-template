import { beforeEach, describe, expect, it, vi } from "vitest";

vi.unmock("@/lib/i18n/request");

const mockHeaders = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  headers: mockHeaders,
}));

import { LOCALE_REQUEST_HEADER } from "@/lib/i18n/locales";
import { getRequestLocale } from "@/lib/i18n/request";

describe("getRequestLocale", () => {
  beforeEach(() => {
    mockHeaders.mockReset();
  });

  it("resolves locale from request header", async () => {
    mockHeaders.mockResolvedValue({
      get: (name: string) => (name === LOCALE_REQUEST_HEADER ? "de" : null),
    });

    await expect(getRequestLocale()).resolves.toBe("de");
  });

  it("falls back to default locale when header is missing", async () => {
    mockHeaders.mockResolvedValue({
      get: () => null,
    });

    await expect(getRequestLocale()).resolves.toBe("en");
  });
});
