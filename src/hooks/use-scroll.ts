"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getScrollManager } from "@/engine/scroll";
import type { ScrollListener, ScrollSnapshot } from "@/types/scroll";

/**
 * Imperative scroll subscription — no React re-render on scroll.
 * Prefer this for animation / DOM work.
 */
export function useScroll(
  listener: ScrollListener,
  enabled = true,
): void {
  const listenerRef = useRef(listener);
  useEffect(() => {
    listenerRef.current = listener;
  });

  useEffect(() => {
    if (!enabled) return;
    return getScrollManager().subscribe((snapshot) => {
      listenerRef.current(snapshot);
    });
  }, [enabled]);
}

/**
 * Rare: read scroll snapshot into React state (e.g. UI chrome).
 * Uses useSyncExternalStore — still avoid for per-frame visual updates.
 */
export function useScrollSnapshot(): ScrollSnapshot {
  return useSyncExternalStore(
    (onStoreChange) => getScrollManager().subscribe(onStoreChange),
    () => getScrollManager().getSnapshot(),
    () => getScrollManager().getSnapshot(),
  );
}

export function useScrollProgress(): number {
  return useSyncExternalStore(
    (onStoreChange) => getScrollManager().subscribe(onStoreChange),
    () => getScrollManager().getSnapshot().progress,
    () => 0,
  );
}
