"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { useT } from "@/components/i18n/LocaleProvider";
import type { ThemeMode } from "@/lib/theme/theme";

const THEME_OPTIONS: { value: ThemeMode; labelKey: string }[] = [
  { value: "system", labelKey: "theme.system" },
  { value: "light", labelKey: "theme.light" },
  { value: "dark", labelKey: "theme.dark" },
];

export function ThemeToggle() {
  const t = useT();
  const { mode, setMode } = useTheme();

  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-400">
      <span className="font-medium text-zinc-200">{t("theme.label")}</span>
      <select
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
        data-testid="theme-toggle"
        value={mode}
        onChange={(event) => setMode(event.target.value as ThemeMode)}
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.labelKey)}
          </option>
        ))}
      </select>
    </label>
  );
}
