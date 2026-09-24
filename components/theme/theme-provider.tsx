"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  applyDocumentTheme,
  DEFAULT_THEME_MODE,
  readStoredThemeMode,
  resolveScheme,
  THEME_STORAGE_KEY,
  type ColorScheme,
  type ThemeMode,
  writeStoredThemeMode,
} from "@/lib/theme/theme";

const THEME_CHANGE_EVENT = "saas-template-theme-change";

/** In-memory selection so mode changes even when localStorage write fails. */
let memoryThemeMode: ThemeMode | null = null;

type ThemeContextValue = {
  mode: ThemeMode;
  scheme: ColorScheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeThemeMode(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      // Another tab won — prefer storage over this tab's memory override.
      memoryThemeMode = null;
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getThemeModeSnapshot(): ThemeMode {
  return memoryThemeMode ?? readStoredThemeMode();
}

function getServerThemeModeSnapshot(): ThemeMode {
  return DEFAULT_THEME_MODE;
}

function subscribeSystemDark(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSystemDarkSnapshot(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSystemDarkSnapshot(): boolean {
  return false;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribeThemeMode,
    getThemeModeSnapshot,
    getServerThemeModeSnapshot,
  );
  const systemDark = useSyncExternalStore(
    subscribeSystemDark,
    getSystemDarkSnapshot,
    getServerSystemDarkSnapshot,
  );

  const scheme = resolveScheme(mode, systemDark);

  useEffect(() => {
    applyDocumentTheme(scheme);
  }, [scheme]);

  const setMode = useCallback((next: ThemeMode) => {
    memoryThemeMode = next;
    writeStoredThemeMode(next);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({ mode, scheme, setMode }),
    [mode, scheme, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
