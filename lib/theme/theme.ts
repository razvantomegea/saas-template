export const THEME_STORAGE_KEY = "saas-template:theme";

const THEME_MODES = ["system", "light", "dark"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export type ColorScheme = "light" | "dark";

export const DEFAULT_THEME_MODE: ThemeMode = "system";

/** Light page background — used for theme-color when scheme is light. */
export const THEME_COLOR_LIGHT = "#f6f7f4";

/** Dark page background — used for theme-color when scheme is dark. */
export const THEME_COLOR_DARK = "#0c0f0b";

export function isThemeMode(value: unknown): value is ThemeMode {
  return (
    typeof value === "string" &&
    (THEME_MODES as readonly string[]).includes(value)
  );
}

export function resolveScheme(
  mode: ThemeMode,
  systemDark: boolean,
): ColorScheme {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  return systemDark ? "dark" : "light";
}

export function readStoredThemeMode(
  storage: Pick<Storage, "getItem"> | null | undefined = typeof localStorage ===
  "undefined"
    ? null
    : localStorage,
): ThemeMode {
  if (!storage) return DEFAULT_THEME_MODE;
  try {
    const stored = storage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
}

export function writeStoredThemeMode(
  mode: ThemeMode,
  storage: Pick<Storage, "setItem"> | null | undefined = typeof localStorage ===
  "undefined"
    ? null
    : localStorage,
): void {
  if (!storage) return;
  try {
    storage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function themeColorForScheme(scheme: ColorScheme): string {
  return scheme === "dark" ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
}

export function applyDocumentTheme(
  scheme: ColorScheme,
  root: HTMLElement = document.documentElement,
): void {
  root.classList.toggle("dark", scheme === "dark");
  root.style.colorScheme = scheme;

  const themeColor = themeColorForScheme(scheme);
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  if (metas.length === 0) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = themeColor;
    document.head.appendChild(meta);
    return;
  }
  for (const meta of metas) {
    meta.setAttribute("content", themeColor);
  }
}

/**
 * Inline FOUC bootstrap. Kept as a string so layout can inject it before paint.
 * Logic mirrors readStoredThemeMode + resolveScheme + applyDocumentTheme.
 */
export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var m="system";try{var stored=localStorage.getItem(k);if(stored==="light"||stored==="dark"||stored==="system")m=stored;}catch(storageErr){}var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var s=m==="dark"||(m!=="light"&&d)?"dark":"light";var r=document.documentElement;r.classList.toggle("dark",s==="dark");r.style.colorScheme=s;var c=s==="dark"?${JSON.stringify(THEME_COLOR_DARK)}:${JSON.stringify(THEME_COLOR_LIGHT)};var metas=document.querySelectorAll('meta[name="theme-color"]');if(metas.length===0){var meta=document.createElement("meta");meta.name="theme-color";meta.content=c;document.head.appendChild(meta);}else{for(var i=0;i<metas.length;i++)metas[i].setAttribute("content",c);}}catch(e){}})();`;
