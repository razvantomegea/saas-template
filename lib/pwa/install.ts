export const PWA_INSTALL_DISMISS_KEY = "saas-template:pwa-install-dismissed";

export type InstallPlatform = "ios" | "android-chromium" | "other";

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/** iOS Safari exposes `navigator.standalone`; Chromium does not. */
export type StandaloneNavigator = {
  standalone?: boolean;
};

export type MatchMediaLike = (query: string) => { matches: boolean };

export function isStandaloneDisplayMode(
  nav: Navigator | StandaloneNavigator,
  matchMedia: MatchMediaLike,
): boolean {
  if ((nav as StandaloneNavigator).standalone === true) {
    return true;
  }
  return matchMedia("(display-mode: standalone)").matches;
}

export function detectInstallPlatform(userAgent: string): InstallPlatform {
  const ua = userAgent.toLowerCase();
  const isIos =
    /iphone|ipod|ipad/.test(ua) ||
    (ua.includes("macintosh") && /\bmobile\b/.test(ua));
  if (isIos) {
    return "ios";
  }
  if (/android/.test(ua) && /chrome|crios|crmo/.test(ua)) {
    return "android-chromium";
  }
  return "other";
}

export function isMobileViewport(matchMedia: MatchMediaLike): boolean {
  return matchMedia("(max-width: 767px)").matches;
}

export function readInstallTutorialDismissed(
  storage: Pick<Storage, "getItem"> | null | undefined,
): boolean {
  if (!storage) {
    return false;
  }
  try {
    return storage.getItem(PWA_INSTALL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeInstallTutorialDismissed(
  storage: Pick<Storage, "setItem"> | null | undefined,
): void {
  if (!storage) {
    return;
  }
  try {
    storage.setItem(PWA_INSTALL_DISMISS_KEY, "1");
  } catch {
    // Ignore quota / private mode failures.
  }
}

export function shouldAutoShowInstallTutorial(input: {
  mobile: boolean;
  standalone: boolean;
  dismissed: boolean;
}): boolean {
  return input.mobile && !input.standalone && !input.dismissed;
}

export function canOfferInstall(input: { standalone: boolean }): boolean {
  return !input.standalone;
}
