"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  parseStoredConsent,
  subscribeCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/analytics/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPreferences: boolean;
  preferencesSessionId: number;
  analyticsEnabled: boolean;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (analytics: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function readConsentRaw(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
}

function useCookieConsentStore(): {
  consent: CookieConsent | null;
  hydrated: boolean;
} {
  const raw = useSyncExternalStore(
    subscribeCookieConsent,
    readConsentRaw,
    () => null,
  );
  const hydrated = useSyncExternalStore(
    subscribeCookieConsent,
    () => true,
    () => false,
  );

  return {
    consent: parseStoredConsent(raw),
    hydrated,
  };
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const { consent, hydrated } = useCookieConsentStore();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferencesSessionId, setPreferencesSessionId] = useState(0);

  const persist = useCallback((analytics: boolean) => {
    writeCookieConsent(analytics);
    setShowPreferences(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesSessionId((id) => id + 1);
    setShowPreferences(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      showBanner: hydrated && consent === null,
      showPreferences,
      preferencesSessionId,
      analyticsEnabled: consent?.analytics === true,
      acceptAll: () => persist(true),
      acceptEssentialOnly: () => persist(false),
      openPreferences,
      closePreferences: () => setShowPreferences(false),
      savePreferences: persist,
    }),
    [
      consent,
      hydrated,
      openPreferences,
      persist,
      preferencesSessionId,
      showPreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }

  return context;
}

export function useOptionalCookieConsent(): CookieConsentContextValue | null {
  return useContext(CookieConsentContext);
}
