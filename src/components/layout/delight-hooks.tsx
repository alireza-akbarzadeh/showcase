"use client";

import { useEffect, useRef } from "react";
import { ACTS } from "@/constants";
import { trackActEnter } from "@/lib/analytics";
import { unlockAchievement } from "@/lib/achievements";
import { playSound } from "@/hooks/use-sound";
import { useScroll } from "@/hooks/use-scroll";
import { getScrollManager } from "@/engine/scroll";
import { getMotionIntensity } from "@/lib/motion-intensity";

/**
 * Scroll-driven delight + analytics + deep-link hydration.
 */
export function DelightHooks({ ready }: { ready: boolean }) {
  const actIndex = useRef(-1);
  const firstScroll = useRef(false);
  const deepLinked = useRef(false);

  useScroll((snapshot) => {
    if (!ready) return;

    if (!firstScroll.current && snapshot.progress > 0.02) {
      firstScroll.current = true;
      unlockAchievement("first-scroll");
    }

    if (snapshot.progress > 0.92) {
      unlockAchievement("full-scroll");
    }

    let next = 0;
    for (let i = 0; i < ACTS.length; i += 1) {
      const [start, end] = ACTS[i]!.range;
      if (snapshot.progress >= start && snapshot.progress < end) {
        next = i;
        break;
      }
      if (i === ACTS.length - 1) next = i;
    }

    const act = ACTS[next];
    if (act) trackActEnter(act.id);

    if (actIndex.current === -1) {
      actIndex.current = next;
      return;
    }

    if (next !== actIndex.current) {
      actIndex.current = next;
      if (getMotionIntensity() !== "off") {
        playSound("whoosh");
      }
    }
  }, ready);

  useEffect(() => {
    if (!ready || deepLinked.current) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    deepLinked.current = true;
    // Wait one frame so section bounds are registered.
    const id = window.requestAnimationFrame(() => {
      getScrollManager().refresh();
      getScrollManager().scrollTo(`#${hash}`, { immediate: true });
    });
    return () => cancelAnimationFrame(id);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let idx = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === seq[idx]) {
        idx += 1;
        if (idx === seq.length) {
          idx = 0;
          if (unlockAchievement("konami")) {
            document.documentElement.dataset.egg = "konami";
            window.setTimeout(() => {
              delete document.documentElement.dataset.egg;
            }, 2800);
          }
        }
      } else {
        idx = key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready]);

  return null;
}
