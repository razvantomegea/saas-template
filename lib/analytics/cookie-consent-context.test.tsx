import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CookieConsentProvider,
  useCookieConsent,
  useOptionalCookieConsent,
} from "@/lib/analytics/cookie-consent-context";

describe("cookie-consent-context", () => {
  it("throws when hook is used outside provider", () => {
    expect(() => renderHook(() => useCookieConsent())).toThrow(
      /CookieConsentProvider/,
    );
  });

  it("returns null for optional hook outside provider", () => {
    const { result } = renderHook(() => useOptionalCookieConsent());
    expect(result.current).toBeNull();
  });

  it("exposes banner state before consent is stored", () => {
    window.localStorage.clear();

    const { result } = renderHook(() => useCookieConsent(), {
      wrapper: CookieConsentProvider,
    });

    expect(result.current.showBanner).toBe(true);
    expect(result.current.analyticsEnabled).toBe(false);
  });
});
