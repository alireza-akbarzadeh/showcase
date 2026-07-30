"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { ensureGsap } from "@/engine/animation";
import {
  getScrollManager,
  resetScrollManager,
  type ScrollManager,
} from "@/engine/scroll";
import {
  getSceneManager,
  resetSceneManager,
  type SceneManager,
} from "@/engine/animation";
import { getRafScheduler } from "@/engine/scheduler";

interface ScrollContextValue {
  getScroll: () => ScrollManager;
  getScenes: () => SceneManager;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

/**
 * Owns Lenis lifecycle. Re-fetches singletons inside the effect so React
 * Strict Mode remounts do not hold a destroyed ScrollManager instance.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureGsap();
    const scroll = getScrollManager();
    scroll.start();
    getRafScheduler().resume();

    // Force a layout pass so section bounds are correct after paint.
    const raf = requestAnimationFrame(() => {
      scroll.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      resetSceneManager();
      resetScrollManager();
    };
  }, []);

  const value = useMemo<ScrollContextValue>(
    () => ({
      getScroll: () => getScrollManager(),
      getScenes: () => getSceneManager(),
    }),
    [],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollEngine(): ScrollContextValue {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollEngine must be used within ScrollProvider");
  }
  return ctx;
}
