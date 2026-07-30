"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/engine/animation";
import { getMotionIntensity } from "@/lib/motion-intensity";

/**
 * Direction-aware act veil — transform/opacity only, one-shot per act change.
 */
export function ActTransitionVeil() {
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onAct = (event: Event) => {
      if (getMotionIntensity() === "off") return;
      const detail = (event as CustomEvent).detail as {
        direction?: number;
      };
      const veil = veilRef.current;
      if (!veil) return;

      const dir = detail.direction ?? 1;
      const gsap = ensureGsap();
      gsap.killTweensOf(veil);
      gsap.fromTo(
        veil,
        {
          opacity: 0.28,
          yPercent: dir >= 0 ? -12 : 12,
        },
        {
          opacity: 0,
          yPercent: dir >= 0 ? 8 : -8,
          duration: 0.65,
          ease: "power2.out",
        },
      );
    };

    window.addEventListener("showcase:act-change", onAct);
    return () => window.removeEventListener("showcase:act-change", onAct);
  }, []);

  return (
    <div
      ref={veilRef}
      className="pointer-events-none fixed inset-0 z-[35] opacity-0"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--signal) 12%, transparent), transparent 45%, color-mix(in oklab, var(--background) 80%, transparent))",
      }}
    />
  );
}
