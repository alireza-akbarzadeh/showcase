"use client";

import { createContext } from "react";
import type { ThemeMode } from "@/types/assets";

export interface ThemeContextValue {
  mode: ThemeMode;
  resolved: "dark" | "light";
  accent: string;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
