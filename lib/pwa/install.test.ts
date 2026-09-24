import { describe, expect, it, vi } from "vitest";
import {
  canOfferInstall,
  detectInstallPlatform,
  isMobileViewport,
  isStandaloneDisplayMode,
  readInstallTutorialDismissed,
  shouldAutoShowInstallTutorial,
  writeInstallTutorialDismissed,
} from "@/lib/pwa/install";

describe("detectInstallPlatform", () => {
  it("detects iOS Safari", () => {
    expect(
      detectInstallPlatform(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit",
      ),
    ).toBe("ios");
  });

  it("detects Android Chrome", () => {
    expect(
      detectInstallPlatform("Mozilla/5.0 (Linux; Android 14) Chrome/120.0"),
    ).toBe("android-chromium");
  });

  it("falls back to other", () => {
    expect(detectInstallPlatform("Mozilla/5.0 (Windows NT 10.0)")).toBe(
      "other",
    );
  });
});

describe("isStandaloneDisplayMode", () => {
  it("respects navigator.standalone on iOS", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: false });
    expect(isStandaloneDisplayMode({ standalone: true }, matchMedia)).toBe(
      true,
    );
  });

  it("falls back to matchMedia display-mode", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(isStandaloneDisplayMode({}, matchMedia)).toBe(true);
  });
});

describe("isMobileViewport", () => {
  it("returns matchMedia result for the mobile breakpoint", () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(isMobileViewport(matchMedia)).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });
});

describe("install tutorial dismissal storage", () => {
  it("round-trips through storage", () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    };

    expect(readInstallTutorialDismissed(storage)).toBe(false);
    writeInstallTutorialDismissed(storage);
    expect(readInstallTutorialDismissed(storage)).toBe(true);
  });

  it("fails closed when storage is unavailable", () => {
    expect(readInstallTutorialDismissed(null)).toBe(false);
    expect(() => writeInstallTutorialDismissed(null)).not.toThrow();
  });
});

describe("shouldAutoShowInstallTutorial", () => {
  it("shows only on mobile, non-standalone, not dismissed", () => {
    expect(
      shouldAutoShowInstallTutorial({
        mobile: true,
        standalone: false,
        dismissed: false,
      }),
    ).toBe(true);
    expect(
      shouldAutoShowInstallTutorial({
        mobile: false,
        standalone: false,
        dismissed: false,
      }),
    ).toBe(false);
    expect(
      shouldAutoShowInstallTutorial({
        mobile: true,
        standalone: true,
        dismissed: false,
      }),
    ).toBe(false);
    expect(
      shouldAutoShowInstallTutorial({
        mobile: true,
        standalone: false,
        dismissed: true,
      }),
    ).toBe(false);
  });
});

describe("canOfferInstall", () => {
  it("is false once already standalone", () => {
    expect(canOfferInstall({ standalone: true })).toBe(false);
    expect(canOfferInstall({ standalone: false })).toBe(true);
  });
});
