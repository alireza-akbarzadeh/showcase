"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/engine/animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
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
 * Act I Hero — always readable; GSAP enhances entrance when ready.
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

  useEffect(() => {
    if (!ready || revealed.current) return;
    revealed.current = true;

    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const line = lineRef.current;
    const cue = cueRef.current;
    const meta = metaRef.current;
    if (!title || !subtitle) return;

    if (reduced) return;

    const gsap = ensureGsap();
    const targets = [meta, title, line, subtitle, cue].filter(Boolean);

    gsap.fromTo(
      targets,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      },
    );

    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          transformOrigin: "left center",
        },
      );
    }
  }, [ready, reduced, titleRef, subtitleRef, lineRef, cueRef, metaRef]);

  return (
    <section
      id="hero"
      data-scene="hero"
      aria-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pb-24 lg:px-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 70% 40%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%), linear-gradient(180deg, transparent 40%, var(--background) 100%)",
        }}
      />

      <p
        ref={metaRef}
        className="mb-8 max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.28em] text-[var(--accent)] uppercase will-change-transform md:mb-10"
      >
        Creative engineer · {SITE.author}
      </p>

      <h1
        ref={titleRef}
        className="font-display max-w-[12ch] text-[clamp(4rem,16vw,10rem)] leading-[0.82] tracking-[-0.05em] text-[var(--foreground)] will-change-transform"
      >
        {SITE.name}
      </h1>

      <div
        ref={lineRef}
        className="mt-8 h-px w-24 origin-left bg-[var(--accent)] will-change-transform md:w-32"
        aria-hidden="true"
      />

      <p
        ref={subtitleRef}
        className="mt-8 max-w-md text-lg leading-snug text-[var(--muted)] will-change-transform md:max-w-lg md:text-xl"
      >
        I build software differently.
        <br />
        Scroll is the story.
      </p>

      <p
        ref={cueRef}
        className="mt-14 flex items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-[var(--muted)] uppercase will-change-transform"
      >
        <span
          className="inline-block h-8 w-px bg-[var(--accent)]"
          aria-hidden="true"
        />
        Scroll to begin
      </p>
    </section>
  );
}
