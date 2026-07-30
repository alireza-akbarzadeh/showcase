"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { setTransform } from "@/utils/performance";

/**
 * Visual scroll progress bar — mutates DOM via transforms, no React re-renders.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useScroll((snapshot) => {
    const el = barRef.current;
    if (!el) return;
    setTransform(el, { scaleX: snapshot.progress, scaleY: 1 });
  });

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    el.style.transformOrigin = "left center";
    setTransform(el, { scaleX: 0, scaleY: 1 });
  }, []);

  return (
    <div
      className={className}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
      />
    </div>
  );
}
