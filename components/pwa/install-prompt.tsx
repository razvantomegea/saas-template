"use client";

import { useEffect, useRef } from "react";

import { useInstallTutorial } from "@/components/pwa/install-tutorial-context";
import {
  isMobileViewport,
  isStandaloneDisplayMode,
  readInstallTutorialDismissed,
  shouldAutoShowInstallTutorial,
} from "@/lib/pwa/install";

export function InstallPrompt() {
  const { show } = useInstallTutorial();
  const autoShownRef = useRef(false);

  useEffect(() => {
    if (autoShownRef.current) {
      return;
    }
    const matchMedia = window.matchMedia.bind(window);
    const shouldShow = shouldAutoShowInstallTutorial({
      mobile: isMobileViewport(matchMedia),
      standalone: isStandaloneDisplayMode(navigator, matchMedia),
      dismissed: readInstallTutorialDismissed(localStorage),
    });
    if (!shouldShow) {
      return;
    }
    autoShownRef.current = true;
    show();
  }, [show]);

  return null;
}
