"use client";

import { useEffect, useRef } from "react";
import { getRafScheduler } from "@/engine/scheduler";
import type { RafCallback, RafPriority } from "@/types/raf";

/**
 * Subscribe to the shared RAF loop without causing React re-renders.
 * Keep all mutation logic inside the callback (refs / DOM / Three).
 */
export function useRaf(
  callback: RafCallback,
  options: { priority?: RafPriority; label?: string; enabled?: boolean } = {},
): void {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const { priority = "normal", label, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const id = getRafScheduler().register(
      (frame) => {
        callbackRef.current(frame);
      },
      { priority, label },
    );

    return () => {
      getRafScheduler().unregister(id);
    };
  }, [priority, label, enabled]);
}
