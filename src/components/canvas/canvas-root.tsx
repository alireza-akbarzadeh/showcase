"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCanvas } from "@/providers/canvas-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { createRendererConfig } from "@/engine/render";

const R3FCanvas = dynamic(
  () => import("@/components/canvas/r3f-canvas").then((m) => m.R3FCanvas),
  { ssr: false, loading: () => null },
);

/**
 * Soft-fades the WebGL layer when adaptive DPR changes so the respec
 * doesn’t flash a hard pixel jump.
 */
export function CanvasRoot({ children }: { children?: ReactNode }) {
  const { enabled, setReady, quality } = useCanvas();
  const reduced = useReducedMotion();
  const [veil, setVeil] = useState(false);
  const prevDpr = useRef(quality.dprMax);

  useEffect(() => {
    if (reduced) setReady(false);
  }, [reduced, setReady]);

  useEffect(() => {
    if (prevDpr.current === quality.dprMax) return;
    prevDpr.current = quality.dprMax;
    setVeil(true);
    const id = window.setTimeout(() => setVeil(false), 320);
    return () => window.clearTimeout(id);
  }, [quality.dprMax]);

  if (!enabled || reduced) return null;

  const config = createRendererConfig({
    antialias: quality.antialias,
    dpr: [1, quality.dprMax],
  });

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 ease-out"
      style={{ opacity: veil ? 0.35 : 1 }}
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
