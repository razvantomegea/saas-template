"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  canOfferInstall,
  detectInstallPlatform,
  isMobileViewport,
  isStandaloneDisplayMode,
  readInstallTutorialDismissed,
  writeInstallTutorialDismissed,
  type BeforeInstallPromptEvent,
  type InstallPlatform,
} from "@/lib/pwa/install";

type InstallTutorialContextValue = {
  open: boolean;
  dismissed: boolean;
  canInstall: boolean;
  mobile: boolean;
  platform: InstallPlatform;
  deferredPrompt: BeforeInstallPromptEvent | null;
  show: () => void;
  hide: () => void;
  dismiss: () => void;
  consumeDeferredPrompt: () => BeforeInstallPromptEvent | null;
};

const InstallTutorialContext =
  createContext<InstallTutorialContextValue | null>(null);

function readRuntimeState() {
  const matchMedia = window.matchMedia.bind(window);
  const standalone = isStandaloneDisplayMode(navigator, matchMedia);
  return {
    standalone,
    mobile: isMobileViewport(matchMedia),
    platform: detectInstallPlatform(navigator.userAgent),
    dismissed: readInstallTutorialDismissed(localStorage),
    canInstall: canOfferInstall({ standalone }),
  };
}

export function InstallTutorialProvider({ children }: { children: ReactNode }) {
  const [runtime, setRuntime] = useState(() => ({
    standalone: false,
    mobile: false,
    platform: "other" as InstallPlatform,
    dismissed: false,
    canInstall: true,
  }));
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const sync = () => setRuntime(readRuntimeState());
    sync();

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    mobileQuery.addEventListener("change", sync);
    standaloneQuery.addEventListener("change", sync);
    window.addEventListener("appinstalled", sync);

    return () => {
      mobileQuery.removeEventListener("change", sync);
      standaloneQuery.removeEventListener("change", sync);
      window.removeEventListener("appinstalled", sync);
    };
  }, []);

  useEffect(() => {
    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      deferredPromptRef.current = promptEvent;
      setDeferredPrompt(promptEvent);
    }

    function onAppInstalled() {
      deferredPromptRef.current = null;
      setDeferredPrompt(null);
      setOpen(false);
      setRuntime(readRuntimeState());
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const show = useCallback(() => {
    if (!canOfferInstall({ standalone: runtime.standalone })) {
      return;
    }
    setOpen(true);
  }, [runtime.standalone]);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const dismiss = useCallback(() => {
    writeInstallTutorialDismissed(localStorage);
    setRuntime((current) => ({ ...current, dismissed: true }));
    setOpen(false);
  }, []);

  const consumeDeferredPrompt = useCallback(() => {
    const event = deferredPromptRef.current;
    deferredPromptRef.current = null;
    setDeferredPrompt(null);
    return event;
  }, []);

  const value = useMemo(
    () => ({
      open,
      dismissed: runtime.dismissed,
      canInstall: runtime.canInstall,
      mobile: runtime.mobile,
      platform: runtime.platform,
      deferredPrompt,
      show,
      hide,
      dismiss,
      consumeDeferredPrompt,
    }),
    [
      open,
      runtime.dismissed,
      runtime.canInstall,
      runtime.mobile,
      runtime.platform,
      deferredPrompt,
      show,
      hide,
      dismiss,
      consumeDeferredPrompt,
    ],
  );

  return (
    <InstallTutorialContext.Provider value={value}>
      {children}
    </InstallTutorialContext.Provider>
  );
}

export function useInstallTutorial(): InstallTutorialContextValue {
  const context = useContext(InstallTutorialContext);
  if (!context) {
    throw new Error(
      "useInstallTutorial must be used within InstallTutorialProvider",
    );
  }
  return context;
}
