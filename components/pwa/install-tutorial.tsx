"use client";

import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useT } from "@/components/i18n/LocaleProvider";
import { useInstallTutorial } from "@/components/pwa/install-tutorial-context";
import { APP_NAME } from "@/lib/pwa/config";

function IosSteps({ appName }: { appName: string }) {
  const t = useT();
  return (
    <ol className="space-y-2 text-sm text-zinc-300">
      <li>{t("pwa.iosStep1")}</li>
      <li>{t("pwa.iosStep2")}</li>
      <li>{t("pwa.iosStep3", { appName })}</li>
    </ol>
  );
}

function AndroidFallbackSteps({ appName }: { appName: string }) {
  const t = useT();
  return (
    <ol className="space-y-2 text-sm text-zinc-300">
      <li>{t("pwa.androidStep1")}</li>
      <li>{t("pwa.androidStep2")}</li>
      <li>{t("pwa.androidStep3", { appName })}</li>
    </ol>
  );
}

export function InstallTutorial() {
  const t = useT();
  const {
    open,
    canInstall,
    mobile,
    platform,
    deferredPrompt,
    hide,
    dismiss,
    consumeDeferredPrompt,
  } = useInstallTutorial();
  const dialogRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }
    dialogRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        hide();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, hide]);

  if (!open || !canInstall || !mobile) {
    return null;
  }

  async function onNativeInstall() {
    const promptEvent = consumeDeferredPrompt();
    if (!promptEvent) {
      return;
    }
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") {
      dismiss();
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center">
      <button
        aria-label={t("common.close")}
        className="absolute inset-0 bg-black/60"
        onClick={hide}
        type="button"
      />
      <div
        aria-labelledby="pwa-install-title"
        aria-modal="true"
        className="relative w-full max-w-md rounded-t-2xl border border-zinc-800 bg-zinc-950 p-5 pb-8"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2
              id="pwa-install-title"
              className="text-lg font-semibold text-zinc-50"
            >
              {t("pwa.installTitle", { appName: APP_NAME })}
            </h2>
            <p className="text-sm text-zinc-400">{t("pwa.installSubtitle")}</p>
          </div>
          <button
            aria-label={t("common.close")}
            className="text-zinc-500 hover:text-zinc-300"
            onClick={hide}
            type="button"
          >
            ×
          </button>
        </div>

        <div>
          {platform === "ios" ? <IosSteps appName={APP_NAME} /> : null}
          {platform === "android-chromium" && deferredPrompt ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                {t("pwa.nativeInstallBody")}
              </p>
              <button
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
                onClick={() => void onNativeInstall()}
                type="button"
              >
                {t("pwa.installButton")}
              </button>
            </div>
          ) : null}
          {platform === "android-chromium" && !deferredPrompt ? (
            <AndroidFallbackSteps appName={APP_NAME} />
          ) : null}
          {platform === "other" ? (
            <AndroidFallbackSteps appName={APP_NAME} />
          ) : null}
        </div>

        <div className="mt-5 text-center">
          <button
            className="text-sm text-zinc-500 hover:text-zinc-300"
            onClick={dismiss}
            type="button"
          >
            {t("pwa.notNow")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
