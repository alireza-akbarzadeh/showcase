"use client";

import { useEffect } from "react";
import { ACTS, SCENE_ORDER } from "@/constants";
import { getScrollManager } from "@/engine/scroll";

/**
 * Keyboard act travel — ↑/↓ or j/k, 1–5 jump acts.
 */
export function useKeyboardNavigation(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    let last = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const now = performance.now();
      if (now - last < 180) return;

      const scroll = getScrollManager();
      const snapshot = scroll.getSnapshot();
      const currentIndex = SCENE_ORDER.findIndex((id) => {
        const section = snapshot.sections.get(id);
        return section?.inView;
      });

      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        const next = SCENE_ORDER[Math.min(currentIndex + 1, SCENE_ORDER.length - 1)];
        if (next) scroll.scrollTo(`#${next}`);
        last = now;
        return;
      }

      if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        const prev = SCENE_ORDER[Math.max(currentIndex - 1, 0)];
        if (prev) scroll.scrollTo(`#${prev}`);
        last = now;
        return;
      }

      const num = Number(event.key);
      if (num >= 1 && num <= ACTS.length) {
        event.preventDefault();
        const act = ACTS[num - 1];
        const scene = act?.scenes[0];
        if (scene) scroll.scrollTo(`#${scene}`);
        last = now;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
