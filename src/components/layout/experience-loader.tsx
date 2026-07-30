"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/engine/animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SITE } from "@/constants";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Brand boot — always completes (failsafe), even if GSAP fails.
 */
export function ExperienceLoader({ onComplete }: LoaderProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (finished.current) return;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setDone(true);
      onComplete();
    };

    const failsafe = window.setTimeout(finish, 2200);

    if (reduced) {
      window.clearTimeout(failsafe);
      const t = window.setTimeout(finish, 150);
      return () => window.clearTimeout(t);
    }

    const gsap = ensureGsap();
    const bar = barRef.current;
    const mark = markRef.current;
    const root = rootRef.current;
    if (!bar || !mark || !root) {
      return () => window.clearTimeout(failsafe);
    }

    bar.style.transformOrigin = "left center";
    gsap.set(bar, { scaleX: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(failsafe);
        finish();
      },
    });

    tl.to(bar, {
      scaleX: 1,
      duration: 0.9,
      ease: "power3.inOut",
    })
      .to(
        mark,
        {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.1",
      )
      .to(
        root,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        },
        "-=0.05",
      );

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
    };
  }, [reduced, onComplete]);

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
          className="h-full w-full origin-left bg-[var(--signal)] will-change-transform"
        />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
