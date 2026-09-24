"use client";

import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useInstallTutorial } from "@/components/pwa/install-tutorial-context";
import { APP_NAME } from "@/lib/pwa/config";

function IosSteps() {
  return (
    <ol className="space-y-2 text-sm text-zinc-300">
      <li>1. Tap the Share icon in Safari&apos;s toolbar.</li>
      <li>2. Scroll down and tap &ldquo;Add to Home Screen&rdquo;.</li>
      <li>3. Tap &ldquo;Add&rdquo; to install {APP_NAME}.</li>
    </ol>
  );
}

function AndroidFallbackSteps() {
  return (
    <ol className="space-y-2 text-sm text-zinc-300">
      <li>1. Open the browser menu.</li>
      <li>
        2. Tap &ldquo;Install app&rdquo; or &ldquo;Add to Home screen&rdquo;.
      </li>
      <li>3. Confirm to install {APP_NAME}.</li>
    </ol>
  );
}

export function InstallTutorial() {
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
        aria-label="Close"
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
              Install {APP_NAME}
            </h2>
            <p className="text-sm text-zinc-400">
              Add it to your home screen for quick access.
            </p>
          </div>
          <button
            aria-label="Close"
            className="text-zinc-500 hover:text-zinc-300"
            onClick={hide}
            type="button"
          >
            ×
          </button>
        </div>

        <div>
          {platform === "ios" ? <IosSteps /> : null}
          {platform === "android-chromium" && deferredPrompt ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-400">
                Install for a faster, full-screen experience.
              </p>
              <button
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
                onClick={() => void onNativeInstall()}
                type="button"
              >
                Install app
              </button>
            </div>
          ) : null}
          {platform === "android-chromium" && !deferredPrompt ? (
            <AndroidFallbackSteps />
          ) : null}
          {platform === "other" ? <AndroidFallbackSteps /> : null}
        </div>

        <div className="mt-5 text-center">
          <button
            className="text-sm text-zinc-500 hover:text-zinc-300"
            onClick={dismiss}
            type="button"
          >
            Not now
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
