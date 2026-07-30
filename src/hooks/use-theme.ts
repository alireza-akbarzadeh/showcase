"use client";

import { useCallback, useContext } from "react";
import { ThemeContext } from "@/providers/theme-context";
import type { ThemeMode } from "@/types/assets";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function useAccentColor(): {
  accent: string;
  setAccent: (value: string) => void;
} {
  const { accent, setAccent } = useTheme();
  return { accent, setAccent };
}

export function useSetThemeMode(): (mode: ThemeMode) => void {
  const { setMode } = useTheme();
  return useCallback((mode: ThemeMode) => setMode(mode), [setMode]);
}
