"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/engine/animation";
import { retainPointerTracking, getPointerState } from "@/engine/observers";
import { useRaf } from "@/hooks/use-raf";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { damp } from "@/utils/math";
import { setTransform } from "@/utils/performance";
import { SITE } from "@/constants";

interface HeroSectionProps {
  ready: boolean;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  lineRef: React.RefObject<HTMLDivElement | null>;
  cueRef: React.RefObject<HTMLParagraphElement | null>;
  metaRef: React.RefObject<HTMLParagraphElement | null>;
}

/**
 * Act I Hero — brand-first first viewport.
 * Scroll timelines own inner transforms; pointer parallax owns outer layers.
 */
export function HeroSection({
  ready,
  titleRef,
  subtitleRef,
  lineRef,
  cueRef,
  metaRef,
}: HeroSectionProps) {
  const reduced = useReducedMotion();
  const revealed = useRef(false);
  const titleParallax = useRef<HTMLDivElement>(null);
  const copyParallax = useRef<HTMLDivElement>(null);
  const parallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    return retainPointerTracking();
  }, [reduced]);

  useRaf(
    (frame) => {
      if (reduced) return;
      const pointer = getPointerState();
      const targetX = pointer.active ? pointer.x : 0;
      const targetY = pointer.active ? pointer.y : 0;
      parallax.current.x = damp(
        parallax.current.x,
        targetX,
        6,
        frame.deltaSeconds,
      );
      parallax.current.y = damp(
        parallax.current.y,
        targetY,
        6,
        frame.deltaSeconds,
      );

      const { x, y } = parallax.current;
      if (titleParallax.current) {
        setTransform(titleParallax.current, {
          x: x * -18,
          y: y * -10,
        });
      }
      if (copyParallax.current) {
        setTransform(copyParallax.current, {
          x: x * -8,
          y: y * -4,
        });
      }
    },
    { priority: "high", label: "hero-parallax", enabled: !reduced },
  );

  useEffect(() => {
    if (!ready || revealed.current) return;
    revealed.current = true;

    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const line = lineRef.current;
    const cue = cueRef.current;
    const meta = metaRef.current;
    if (!title || !subtitle) return;

    if (reduced) {
      title.style.opacity = "1";
      subtitle.style.opacity = "1";
      if (line) line.style.opacity = "1";
      if (cue) cue.style.opacity = "1";
      if (meta) meta.style.opacity = "1";
      return;
    }

    const gsap = ensureGsap();
    title.style.clipPath = "inset(100% 0 0 0)";
    title.style.opacity = "1";

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (meta) {
      tl.fromTo(
        meta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
        0,
      );
    }

    tl.fromTo(
      title,
      { clipPath: "inset(110% 0 0 0)", y: 36 },
      {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        duration: 1.15,
        ease: "power4.out",
      },
      0.08,
    );

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0, opacity: 1 },
        {
          scaleX: 1,
          duration: 0.75,
          ease: "power3.out",
          transformOrigin: "left center",
        },
        0.45,
      );
    }

    tl.fromTo(
      subtitle,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.55,
    );

    if (cue) {
      tl.fromTo(
        cue,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.85,
      );
    }

    return () => {
      tl.kill();
    };
  }, [ready, reduced, titleRef, subtitleRef, lineRef, cueRef, metaRef]);

  return (
    <section
      id="hero"
      data-scene="hero"
      aria-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pb-24 lg:justify-center lg:px-20 lg:pb-28 lg:pt-32"
    >
      {/* Atmosphere — secondary to the full-bleed WebGL field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 78% 42%, color-mix(in oklab, var(--signal) 16%, transparent), transparent 68%), radial-gradient(ellipse 50% 40% at 12% 85%, color-mix(in oklab, var(--signal) 6%, transparent), transparent 70%), linear-gradient(180deg, transparent 35%, var(--background) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-[min(100%,72rem)]">
        <p
          ref={metaRef}
          className="mb-6 font-mono text-[11px] leading-relaxed tracking-[0.28em] text-[var(--signal)] uppercase opacity-0 will-change-transform md:mb-8"
        >
          {SITE.author}
        </p>

        <div ref={titleParallax} className="will-change-transform">
          <h1
            ref={titleRef}
            className="font-display max-w-[11ch] text-[clamp(4.5rem,18vw,11.5rem)] leading-[0.78] tracking-[-0.055em] text-[var(--foreground)] will-change-transform"
            style={
              reduced
                ? undefined
                : { clipPath: "inset(110% 0 0 0)" }
            }
          >
            {SITE.name}
          </h1>
        </div>

        <div
          ref={lineRef}
          className="mt-8 h-px w-28 origin-left scale-x-0 bg-[var(--signal)] will-change-transform md:mt-10 md:w-40"
          aria-hidden="true"
        />

        <div ref={copyParallax} className="will-change-transform">
          <p
            ref={subtitleRef}
            className="mt-8 max-w-md text-lg leading-snug text-[var(--muted-foreground)] opacity-0 will-change-transform md:mt-10 md:max-w-lg md:text-xl"
          >
            I build software differently.
            <span className="mt-2 block text-base text-[var(--muted-foreground)]/80 md:text-lg">
              Scroll is the story.
            </span>
          </p>
        </div>

        <p
          ref={cueRef}
          className="mt-14 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] uppercase opacity-0 will-change-transform md:mt-16"
        >
          <span
            className="inline-block h-10 w-px origin-top bg-[var(--signal)]"
            aria-hidden="true"
          />
          Scroll to begin
        </p>
      </div>
    </section>
  );
}
