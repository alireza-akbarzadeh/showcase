"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext } from "@/providers/theme-context";
import type { ThemeMode } from "@/types/assets";

const ACCENT_KEY = "showcase-accent";
const MODE_KEY = "showcase-theme";
const DEFAULT_ACCENT = "#3dff9a";

function getSystemMode(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);
  const [system, setSystem] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const storedAccent = localStorage.getItem(ACCENT_KEY);
    if (storedMode) setModeState(storedMode);
    if (storedAccent) setAccentState(storedAccent);
    setSystem(getSystemMode());

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => setSystem(getSystemMode());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved = mode === "system" ? system : mode;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolved;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-foreground", "#04110a");
  }, [resolved, accent]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    localStorage.setItem(MODE_KEY, next);
  }, []);

  const setAccent = useCallback((next: string) => {
    setAccentState(next);
    localStorage.setItem(ACCENT_KEY, next);
  }, []);

  const value = useMemo(
    () => ({ mode, resolved, accent, setMode, setAccent }),
    [mode, resolved, accent, setMode, setAccent],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
