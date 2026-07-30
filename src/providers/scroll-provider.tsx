"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { ensureGsap } from "@/engine/animation";
import { getScrollManager, resetScrollManager } from "@/engine/scroll";
import { getSceneManager, resetSceneManager } from "@/engine/animation";
import { getRafScheduler } from "@/engine/scheduler";
import type { ScrollManager } from "@/engine/scroll";
import type { SceneManager } from "@/engine/animation";

interface ScrollContextValue {
  scroll: ScrollManager;
  scenes: SceneManager;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef(getScrollManager());
  const scenesRef = useRef(getSceneManager());

  useEffect(() => {
    ensureGsap();
    const scroll = scrollRef.current;
    scroll.start();
    getRafScheduler().resume();

    return () => {
      resetSceneManager();
      resetScrollManager();
    };
  }, []);

  const value = useMemo(
    () => ({
      scroll: scrollRef.current,
      scenes: scenesRef.current,
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
