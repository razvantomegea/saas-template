import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  PENDING_FUNNEL_BEACONS_KEY,
  drainPendingFunnelBeacons,
  enqueuePendingFunnelBeacon,
  parseStoredConsent,
  readCookieConsent,
  subscribeCookieConsent,
  writeCookieConsent,
} from "@/lib/analytics/cookie-consent";

describe("cookie-consent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("returns null when consent is not stored", () => {
    expect(readCookieConsent()).toBeNull();
    expect(readCookieConsent()?.analytics).not.toBe(true);
  });

  it("writes and reads analytics consent", () => {
    const consent = writeCookieConsent(true);

    expect(consent.analytics).toBe(true);
    expect(
      window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
    ).toBeTruthy();
    expect(readCookieConsent()).toEqual(consent);
    expect(readCookieConsent()?.analytics).toBe(true);
  });

  it("rejects invalid stored consent", () => {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: "yes" }),
    );

    expect(readCookieConsent()).toBeNull();
  });

  it("parseStoredConsent returns null for malformed and non-object JSON", () => {
    expect(parseStoredConsent("not json{")).toBeNull();
    expect(parseStoredConsent("null")).toBeNull();
    expect(parseStoredConsent("123")).toBeNull();
  });

  it("returns false for essential-only consent", () => {
    const consent = writeCookieConsent(false);

    expect(consent.analytics).toBe(false);
    expect(readCookieConsent()?.analytics).toBe(false);
  });

  it("notifies subscribers when consent changes", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeCookieConsent(listener);

    writeCookieConsent(true);

    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });

  it("subscribeCookieConsent reacts to storage events and unsubscribes", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeCookieConsent(listener);

    window.dispatchEvent(new StorageEvent("storage"));
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    window.dispatchEvent(new StorageEvent("storage"));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("clears pending beacons when essential-only is chosen", () => {
    window.sessionStorage.setItem(
      PENDING_FUNNEL_BEACONS_KEY,
      JSON.stringify([{ event: "signup_page_viewed" }]),
    );

    writeCookieConsent(false);

    expect(
      window.sessionStorage.getItem(PENDING_FUNNEL_BEACONS_KEY),
    ).toBeNull();
  });

  it("ignores non-json and non-array pending funnel beacons", () => {
    window.sessionStorage.setItem(PENDING_FUNNEL_BEACONS_KEY, "not-json");
    expect(drainPendingFunnelBeacons()).toEqual([]);

    window.sessionStorage.setItem(
      PENDING_FUNNEL_BEACONS_KEY,
      JSON.stringify({ event: "signup_page_viewed" }),
    );
    expect(drainPendingFunnelBeacons()).toEqual([]);
  });

  it("enqueues and drains pending funnel beacons directly", () => {
    enqueuePendingFunnelBeacon({
      event: "pricing_cta_clicked",
      metadata: { plan: "pro" },
    });
    enqueuePendingFunnelBeacon({ event: "signup_page_viewed" });

    expect(drainPendingFunnelBeacons()).toEqual([
      { event: "pricing_cta_clicked", metadata: { plan: "pro" } },
      { event: "signup_page_viewed" },
    ]);
    expect(
      window.sessionStorage.getItem(PENDING_FUNNEL_BEACONS_KEY),
    ).toBeNull();
    expect(drainPendingFunnelBeacons()).toEqual([]);
  });

  it("filters invalid pending beacon entries", () => {
    window.sessionStorage.setItem(
      PENDING_FUNNEL_BEACONS_KEY,
      JSON.stringify([
        { event: "signup_page_viewed" },
        { event: 12 },
        null,
        "nope",
      ]),
    );

    expect(drainPendingFunnelBeacons()).toEqual([
      { event: "signup_page_viewed" },
    ]);
  });

  it("no-ops storage helpers when window is unavailable", () => {
    const originalWindow = globalThis.window;
    // @ts-expect-error intentional SSR simulation
    delete globalThis.window;

    expect(readCookieConsent()).toBeNull();
    expect(() =>
      enqueuePendingFunnelBeacon({ event: "signup_page_viewed" }),
    ).not.toThrow();
    expect(drainPendingFunnelBeacons()).toEqual([]);
    expect(writeCookieConsent(true).analytics).toBe(true);
    expect(subscribeCookieConsent(() => undefined)).toEqual(
      expect.any(Function),
    );
    subscribeCookieConsent(() => undefined)();

    globalThis.window = originalWindow;
  });
});
