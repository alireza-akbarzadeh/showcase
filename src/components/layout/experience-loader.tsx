"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/engine/animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SITE } from "@/constants";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Brand boot experience — one-shot GSAP outro, then unmount.
 */
export function ExperienceLoader({ onComplete }: LoaderProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    if (reduced) {
      const t = window.setTimeout(() => {
        setDone(true);
        onComplete();
      }, 200);
      return () => window.clearTimeout(t);
    }

    const gsap = ensureGsap();
    const bar = barRef.current;
    const mark = markRef.current;
    const root = rootRef.current;
    if (!bar || !mark || !root) return;

    bar.style.transformOrigin = "left center";
    gsap.set(bar, { scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        onComplete();
      },
    });

    tl.to(bar, {
      scaleX: 1,
      duration: 1.1,
      ease: "power3.inOut",
    })
      .to(
        mark,
        {
          y: -24,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        },
        "-=0.15",
      )
      .to(
        root,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [reduced, onComplete, done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]"
      role="status"
      aria-live="polite"
      aria-label="Loading experience"
    >
      <p
        ref={markRef}
        className="font-display text-4xl tracking-[-0.04em] text-[var(--foreground)] md:text-6xl"
      >
        {SITE.name}
      </p>
      <div className="mt-10 h-px w-40 overflow-hidden bg-[var(--border)]">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
        />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
