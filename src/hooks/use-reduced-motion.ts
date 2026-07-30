"use client";

import { useEffect, useState } from "react";
import {
  isMotionRestricted,
  subscribeMotionIntensity,
} from "@/lib/motion-intensity";
import { prefersReducedMotion } from "@/engine/scroll";

/**
 * True when motion should be minimized (user intensity ≠ full, or OS reduce
 * before hydration sync).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const update = () => {
      setReduced(isMotionRestricted() || prefersReducedMotion());
    };
    update();
    const unsub = subscribeMotionIntensity(update);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => {
      unsub();
      mq.removeEventListener("change", update);
    };
  }, []);

  return reduced;
}
