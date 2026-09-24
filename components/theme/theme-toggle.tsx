"use client";

import { useTheme } from "@/components/theme/theme-provider";
import type { ThemeMode } from "@/lib/theme/theme";

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-400">
      <span className="font-medium text-zinc-200">Theme</span>
      <select
        className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100"
        data-testid="theme-toggle"
        value={mode}
        onChange={(event) => setMode(event.target.value as ThemeMode)}
      >
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
