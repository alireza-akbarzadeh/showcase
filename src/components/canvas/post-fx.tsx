"use client";

import { Suspense, lazy } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Effects = lazy(() =>
  import("@/components/canvas/effects").then((m) => ({ default: m.Effects })),
);

/**
 * Lazy postprocessing — only load the shader pipeline when motion is allowed.
 */
export function PostFX() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <Suspense fallback={null}>
      <Effects />
    </Suspense>
  );
}
