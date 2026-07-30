"use client";

import { useEffect, useId, useRef } from "react";
import { ensureGsap } from "@/engine/animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/utils/cn";

interface SignatureMotifProps {
  className?: string;
  /** Play stroke draw on mount. */
  animate?: boolean;
  /** Compact mark for chrome. */
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "h-5 w-5",
  md: "h-10 w-10",
  lg: "h-16 w-16 md:h-20 md:w-20",
} as const;

/**
 * Signal Lab monogram — SVG stroke draw, reusable as favicon motif language.
 */
export function SignatureMotif({
  className,
  animate = true,
  size = "md",
}: SignatureMotifProps) {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const path = pathRef.current;
    const ring = ringRef.current;
    if (!path || !ring) return;

    const pathLen = path.getTotalLength();
    const ringLen = 2 * Math.PI * 18;

    if (reduced || !animate) {
      path.style.strokeDasharray = `${pathLen}`;
      path.style.strokeDashoffset = "0";
      ring.style.strokeDasharray = `${ringLen}`;
      ring.style.strokeDashoffset = "0";
      return;
    }

    const gsap = ensureGsap();
    gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    gsap.set(ring, { strokeDasharray: ringLen, strokeDashoffset: ringLen });

    const tl = gsap.timeline();
    tl.to(ring, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: "power2.out",
    }).to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.85,
        ease: "power3.out",
      },
      "-=0.35",
    );

    return () => {
      tl.kill();
    };
  }, [animate, reduced]);

  return (
    <svg
      className={cn(SIZES[size], className)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sig-${uid}`} x1="8" y1="6" x2="40" y2="42">
          <stop stopColor="var(--signal)" />
          <stop offset="0.55" stopColor="oklch(0.86 0.16 168)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <circle
        ref={ringRef}
        cx="24"
        cy="24"
        r="18"
        stroke={`url(#sig-${uid})`}
        strokeWidth="1.5"
        opacity="0.85"
      />
      <path
        ref={pathRef}
        d="M16 30.5C16 24 20.5 21 24 18.5C27.5 16 32 14.5 32 19.5C32 24.5 27 26 24 28C21 30 16 31.5 16 36.5"
        stroke={`url(#sig-${uid})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="2.25" fill="var(--signal)" className="pulse-dot" />
    </svg>
  );
}
