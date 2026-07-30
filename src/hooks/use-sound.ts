"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getSoundSystem } from "@/engine/audio";

function subscribe(onStoreChange: () => void): () => void {
  return getSoundSystem().subscribe(() => onStoreChange());
}

function getSnapshot(): boolean {
  return getSoundSystem().isEnabled();
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSoundEnabled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Toggle sound; returns next enabled state. */
export async function toggleSound(): Promise<boolean> {
  return getSoundSystem().toggle();
}

export function playSound(
  cue: "tick" | "whoosh" | "success" | "unlock",
): void {
  getSoundSystem().play(cue);
}

/** Wire mute hotkey `m` once. */
export function useSoundHotkey(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "m" || event.key === "M") {
        event.preventDefault();
        void toggleSound().then((on) => {
          if (on) {
            void import("@/lib/achievements").then((m) =>
              m.unlockAchievement("sound-on"),
            );
          }
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
}
