"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import { useCanvas } from "@/providers/canvas-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { createRendererConfig } from "@/engine/render";

const R3FCanvas = dynamic(
  () => import("@/components/canvas/r3f-canvas").then((m) => m.R3FCanvas),
  { ssr: false, loading: () => null },
);

export function CanvasRoot({ children }: { children?: ReactNode }) {
  const { enabled, setReady, quality } = useCanvas();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) setReady(false);
  }, [reduced, setReady]);

  if (!enabled || reduced) return null;

  const config = createRendererConfig({
    antialias: quality.antialias,
    dpr: [1, quality.dprMax],
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <R3FCanvas
        config={config}
        postFx={quality.postFx}
        onReady={() => setReady(true)}
      >
        {children}
      </R3FCanvas>
    </div>
  );
}
