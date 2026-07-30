"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { ThemeContext } from "@/providers/theme-context";
import type { ThemeMode } from "@/types/assets";

const SIGNAL_KEY = "showcase-signal";
const MODE_KEY = "showcase-theme";
/** Acid-lime signal — matches --signal-hex in themes.css */
const DEFAULT_SIGNAL = "#b8ff2e";
const THEME_EVENT = "showcase-theme";

function getSystemMode(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function subscribeSystemMode(onStoreChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function subscribeTheme(onStoreChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === MODE_KEY ||
      event.key === SIGNAL_KEY ||
      event.key === "showcase-accent" ||
      event.key === null
    ) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onStoreChange);
  };
}

function readMode(): ThemeMode {
  const stored = localStorage.getItem(MODE_KEY);
  if (stored === "dark" || stored === "light" || stored === "system") {
    return stored;
  }
  return "dark";
}

function readSignal(): string {
  return (
    localStorage.getItem(SIGNAL_KEY) ??
    localStorage.getItem("showcase-accent") ??
    DEFAULT_SIGNAL
  );
}

function emitThemeChange(): void {
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribeTheme,
    readMode,
    (): ThemeMode => "dark",
  );
  const accent = useSyncExternalStore(
    subscribeTheme,
    readSignal,
    (): string => DEFAULT_SIGNAL,
  );
  const system = useSyncExternalStore(
    subscribeSystemMode,
    getSystemMode,
    (): "dark" | "light" => "dark",
  );

  const resolved = mode === "system" ? system : mode;

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolved;
    root.classList.toggle("dark", resolved === "dark");
    // Custom signal override — brand lime, not amber accent
    root.style.setProperty("--signal", accent);
    root.style.setProperty("--primary", accent);
    root.style.setProperty("--ring", accent);
    root.style.setProperty("--signal-hex", accent);
  }, [resolved, accent]);

  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem(MODE_KEY, next);
    emitThemeChange();
  }, []);

  const setAccent = useCallback((next: string) => {
    localStorage.setItem(SIGNAL_KEY, next);
    emitThemeChange();
  }, []);

  const value = useMemo(
    () => ({ mode, resolved, accent, setMode, setAccent }),
    [mode, resolved, accent, setMode, setAccent],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
