export const COOKIE_CONSENT_STORAGE_KEY = "saas-template-cookie-consent";
export const PENDING_FUNNEL_BEACONS_KEY =
  "saas-template-pending-funnel-beacons";

export type CookieConsent = {
  analytics: boolean;
  decidedAt: string;
};

export type PendingFunnelBeacon = {
  event: string;
  metadata?: Record<string, unknown>;
};

function isCookieConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.analytics === "boolean" &&
    typeof record.decidedAt === "string"
  );
}

export function parseStoredConsent(raw: string | null): CookieConsent | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isCookieConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseStoredConsent(
    window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
  );
}

function isPendingFunnelBeacon(value: unknown): value is PendingFunnelBeacon {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.event === "string";
}

function readPendingFunnelBeacons(): PendingFunnelBeacon[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.sessionStorage.getItem(PENDING_FUNNEL_BEACONS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isPendingFunnelBeacon);
  } catch {
    return [];
  }
}

export function enqueuePendingFunnelBeacon(beacon: PendingFunnelBeacon): void {
  if (typeof window === "undefined") {
    return;
  }

  const pending = readPendingFunnelBeacons();
  pending.push(beacon);
  window.sessionStorage.setItem(
    PENDING_FUNNEL_BEACONS_KEY,
    JSON.stringify(pending),
  );
}

export function drainPendingFunnelBeacons(): PendingFunnelBeacon[] {
  if (typeof window === "undefined") {
    return [];
  }

  const pending = readPendingFunnelBeacons();
  window.sessionStorage.removeItem(PENDING_FUNNEL_BEACONS_KEY);
  return pending;
}

function clearPendingFunnelBeacons(): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(PENDING_FUNNEL_BEACONS_KEY);
  }
}

export function writeCookieConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    analytics,
    decidedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    if (!analytics) {
      clearPendingFunnelBeacons();
    }

    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(consent),
    );
    window.dispatchEvent(new Event("position-relay-cookie-consent"));
  }

  return consent;
}

export function subscribeCookieConsent(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("position-relay-cookie-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("position-relay-cookie-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}
