"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import {
  getMotionIntensity,
  setMotionIntensity,
  subscribeMotionIntensity,
  syncMotionFromOs,
  type MotionIntensity,
} from "@/lib/motion-intensity";
import { getScrollManager } from "@/engine/scroll";
import { cn } from "@/utils/cn";

const OPTIONS: { id: MotionIntensity; label: string }[] = [
  { id: "off", label: "Off" },
  { id: "reduced", label: "Reduced" },
  { id: "full", label: "Full" },
];

function useIntensity(): MotionIntensity {
  return useSyncExternalStore(
    subscribeMotionIntensity,
    getMotionIntensity,
    () => "full",
  );
}

/**
 * Applies motion intensity globally — data-motion + Lenis smoothing.
 * Canvas / cursor consumers read intensity via hooks.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const intensity = useIntensity();

  useEffect(() => {
    syncMotionFromOs();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => syncMotionFromOs();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = intensity;
    getScrollManager().setSmoothEnabled(intensity === "full");
  }, [intensity]);

  return children;
}

export function MotionIntensityControl({ className }: { className?: string }) {
  const intensity = useIntensity();

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="group"
      aria-label="Motion intensity"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
        Motion
      </span>
      <div className="flex gap-1">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-pressed={intensity === opt.id}
            className={cn(
              "min-h-9 border px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors",
              intensity === opt.id
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
            )}
            onClick={() => setMotionIntensity(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
