/** @vitest-environment happy-dom */
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  applyDocumentTheme,
  DEFAULT_THEME_MODE,
  isThemeMode,
  readStoredThemeMode,
  resolveScheme,
  THEME_COLOR_DARK,
  THEME_COLOR_LIGHT,
  THEME_STORAGE_KEY,
  THEME_BOOTSTRAP_SCRIPT,
  themeColorForScheme,
  writeStoredThemeMode,
} from "./theme";

describe("isThemeMode", () => {
  it("accepts system, light, and dark", () => {
    expect(isThemeMode("system")).toBe(true);
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("dark")).toBe(true);
  });

  it("rejects invalid values", () => {
    expect(isThemeMode("auto")).toBe(false);
    expect(isThemeMode("")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
    expect(isThemeMode(undefined)).toBe(false);
  });
});

describe("resolveScheme", () => {
  it("forces light and dark regardless of system", () => {
    expect(resolveScheme("light", true)).toBe("light");
    expect(resolveScheme("light", false)).toBe("light");
    expect(resolveScheme("dark", true)).toBe("dark");
    expect(resolveScheme("dark", false)).toBe("dark");
  });

  it("follows system preference when mode is system", () => {
    expect(resolveScheme("system", true)).toBe("dark");
    expect(resolveScheme("system", false)).toBe("light");
  });
});

describe("readStoredThemeMode / writeStoredThemeMode", () => {
  const memory = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return memory.size;
    },
    clear() {
      memory.clear();
    },
    getItem(key) {
      return memory.get(key) ?? null;
    },
    key() {
      return null;
    },
    removeItem(key) {
      memory.delete(key);
    },
    setItem(key, value) {
      memory.set(key, value);
    },
  };

  beforeEach(() => {
    memory.clear();
  });

  it("defaults to system when nothing is stored", () => {
    expect(readStoredThemeMode(storage)).toBe(DEFAULT_THEME_MODE);
  });

  it("ignores invalid stored values", () => {
    memory.set(THEME_STORAGE_KEY, "neon");
    expect(readStoredThemeMode(storage)).toBe(DEFAULT_THEME_MODE);
  });

  it("round-trips a valid mode", () => {
    writeStoredThemeMode("dark", storage);
    expect(memory.get(THEME_STORAGE_KEY)).toBe("dark");
    expect(readStoredThemeMode(storage)).toBe("dark");
  });

  it("returns default when storage is unavailable", () => {
    expect(readStoredThemeMode(null)).toBe(DEFAULT_THEME_MODE);
  });

  it("returns default when storage.getItem throws", () => {
    const throwingStorage: Pick<Storage, "getItem"> = {
      getItem: () => {
        throw new Error("blocked");
      },
    };
    expect(readStoredThemeMode(throwingStorage)).toBe(DEFAULT_THEME_MODE);
  });
});

describe("themeColorForScheme", () => {
  it("maps scheme to page background colors", () => {
    expect(themeColorForScheme("light")).toBe(THEME_COLOR_LIGHT);
    expect(themeColorForScheme("dark")).toBe(THEME_COLOR_DARK);
  });
});

describe("THEME_BOOTSTRAP_SCRIPT", () => {
  it("defaults preference to system and isolates localStorage reads", () => {
    expect(THEME_BOOTSTRAP_SCRIPT).toContain('var m="system"');
    expect(THEME_BOOTSTRAP_SCRIPT).toContain(
      "try{var stored=localStorage.getItem(k);",
    );
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("catch(storageErr){}");
    expect(THEME_BOOTSTRAP_SCRIPT).toContain("r.style.colorScheme=s");
  });
});

describe("applyDocumentTheme", () => {
  afterEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.remove();
    }
  });

  it("adds dark class and updates theme-color for dark scheme", () => {
    applyDocumentTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute("content")).toBe(THEME_COLOR_DARK);
  });

  it("removes dark class for light scheme", () => {
    document.documentElement.classList.add("dark");
    applyDocumentTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute("content")).toBe(THEME_COLOR_LIGHT);
  });
});
