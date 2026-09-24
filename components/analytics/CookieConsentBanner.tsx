"use client";

import { useCallback, useRef, useState } from "react";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import { useCookieConsent } from "@/lib/analytics/cookie-consent-context";
import { useFocusTrap } from "@/lib/a11y/use-focus-trap";
import { LEGAL_PRIVACY_PATH } from "@/lib/legal/constants";

type CookiePreferencesPanelProps = {
  initialAnalytics: boolean;
  onSave: (analytics: boolean) => void;
  onClose: () => void;
};

function CookiePreferencesPanel({
  initialAnalytics,
  onSave,
  onClose,
}: CookiePreferencesPanelProps) {
  const t = useT();
  const [draftAnalytics, setDraftAnalytics] = useState(initialAnalytics);

  return (
    <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
      <label className="flex items-start gap-3 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked
          disabled
          readOnly
          className="mt-0.5 rounded border-zinc-600 bg-zinc-900"
        />
        <span>
          <span className="font-medium text-zinc-100">
            {t("cookie.essentialTitle")}
          </span>
          <span className="mt-0.5 block text-zinc-500">
            {t("cookie.essentialDescription")}
          </span>
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={draftAnalytics}
          onChange={(event) => setDraftAnalytics(event.target.checked)}
          data-testid={DataTestId.CookieConsentAnalyticsToggle}
          className="mt-0.5 rounded border-zinc-600 bg-zinc-900"
        />
        <span>
          <span className="font-medium text-zinc-100">
            {t("cookie.analyticsTitle")}
          </span>
          <span className="mt-0.5 block text-zinc-500">
            {t("cookie.analyticsDescription")}
          </span>
        </span>
      </label>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={() => onSave(draftAnalytics)}
          data-testid={DataTestId.CookieConsentSaveButton}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
        >
          {t("cookie.savePreferences")}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500"
        >
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}

export function CookieConsentBanner() {
  const t = useT();
  const {
    consent,
    showBanner,
    showPreferences,
    preferencesSessionId,
    acceptAll,
    acceptEssentialOnly,
    openPreferences,
    closePreferences,
    savePreferences,
  } = useCookieConsent();
  const bannerRef = useRef<HTMLDivElement>(null);
  const isOpen = showBanner || showPreferences;

  const handleEscape = useCallback(() => {
    if (showPreferences) {
      closePreferences();
      return;
    }
    acceptEssentialOnly();
  }, [acceptEssentialOnly, closePreferences, showPreferences]);

  useFocusTrap({
    containerRef: bannerRef,
    active: isOpen,
    onEscape: handleEscape,
    focusKey: showPreferences ? preferencesSessionId : 0,
  });

  if (!showBanner && !showPreferences) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      data-testid={DataTestId.CookieConsentBanner}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-700 bg-zinc-900/95 p-4 shadow-lg backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <div className="space-y-2">
          <h2
            id="cookie-consent-title"
            className="text-sm font-semibold text-zinc-100"
          >
            {t("cookie.title")}
          </h2>
          <p id="cookie-consent-description" className="text-sm text-zinc-400">
            {t("cookie.descriptionPrefix")}{" "}
            <LocalizedLink
              href={LEGAL_PRIVACY_PATH}
              className="text-emerald-400 hover:underline"
            >
              {t("footer.privacy")}
            </LocalizedLink>
            .
          </p>
        </div>

        {showPreferences ? (
          <CookiePreferencesPanel
            key={preferencesSessionId}
            initialAnalytics={consent?.analytics ?? false}
            onSave={savePreferences}
            onClose={closePreferences}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={acceptAll}
              data-testid={DataTestId.CookieConsentAcceptAllButton}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              {t("cookie.acceptAll")}
            </button>
            <button
              type="button"
              onClick={acceptEssentialOnly}
              data-testid={DataTestId.CookieConsentEssentialOnlyButton}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500"
            >
              {t("cookie.essentialOnly")}
            </button>
            <button
              type="button"
              onClick={openPreferences}
              data-testid={DataTestId.CookieConsentManageButton}
              className="rounded-lg px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200"
            >
              {t("cookie.manage")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
