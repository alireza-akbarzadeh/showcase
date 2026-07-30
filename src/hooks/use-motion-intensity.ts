"use client";

import { useSyncExternalStore } from "react";
import {
  getMotionIntensity,
  subscribeMotionIntensity,
  type MotionIntensity,
} from "@/lib/motion-intensity";

export function useMotionIntensity(): MotionIntensity {
  return useSyncExternalStore(
    subscribeMotionIntensity,
    getMotionIntensity,
    () => "full",
  );
}

/** Convenience: true when intensity is not `full`. */
export function useMotionRestricted(): boolean {
  return useMotionIntensity() !== "full";
}
