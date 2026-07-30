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

const ACCENT_KEY = "showcase-accent";
const MODE_KEY = "showcase-theme";
const DEFAULT_ACCENT = "#3dff9a";
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
    if (event.key === MODE_KEY || event.key === ACCENT_KEY || event.key === null) {
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

function readAccent(): string {
  return localStorage.getItem(ACCENT_KEY) ?? DEFAULT_ACCENT;
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
    readAccent,
    (): string => DEFAULT_ACCENT,
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
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-foreground", "#04110a");
  }, [resolved, accent]);

  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem(MODE_KEY, next);
    emitThemeChange();
  }, []);

  const setAccent = useCallback((next: string) => {
    localStorage.setItem(ACCENT_KEY, next);
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
