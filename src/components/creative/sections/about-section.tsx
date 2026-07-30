"use client";

import { ABOUT_CHAPTERS, CAREER_JOURNEY } from "@/constants";
import { cn } from "@/utils/cn";

interface AboutSectionProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  chaptersRef: React.MutableRefObject<(HTMLElement | null)[]>;
  careerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

/**
 * Act II Story — principles + career journey scrub rail.
 */
export function AboutSection({
  rootRef,
  chaptersRef,
  careerRef,
  className,
}: AboutSectionProps) {
  return (
    <div
      ref={rootRef}
      className={cn("w-full max-w-5xl will-change-transform", className)}
    >
      <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
        Act II · Story
      </p>
      <h2 className="font-display mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em]">
        Built for sixty frames.
      </h2>
      <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
        Origin → principles → workflow → now. A short personal film via scroll.
      </p>

      <ol className="mt-14 space-y-10">
        {ABOUT_CHAPTERS.map((chapter, i) => (
          <li
            key={chapter.year}
            ref={(el) => {
              chaptersRef.current[i] = el;
            }}
            data-about-chapter
            className="grid gap-4 border-t border-[var(--border)] pt-8 will-change-transform md:grid-cols-[80px_1fr]"
          >
            <span className="font-mono text-sm text-[var(--accent)]">
              {chapter.year}
            </span>
            <div>
              <h3 className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
                {chapter.title}
              </h3>
              <p className="mt-3 max-w-xl text-lg text-[var(--muted)]">
                {chapter.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div
        ref={careerRef}
        data-about-career
        className="mt-20 will-change-transform"
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--accent)] uppercase">
          Career journey
        </p>
        <h3 className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.03em]">
          Roles with one achievement and one lesson.
        </h3>

        <div className="mt-10 overflow-x-auto pb-4">
          <ol
            data-about-career-track
            className="flex min-w-max gap-0 border-t border-[var(--border)]"
          >
            {CAREER_JOURNEY.map((stop, i) => (
              <li
                key={stop.id}
                data-about-career-stop
                data-career-index={i}
                className="relative w-[min(78vw,320px)] border-r border-[var(--border)] px-6 py-8 will-change-transform last:border-r-0"
              >
                <span
                  className="absolute top-0 left-6 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] uppercase">
                  {stop.year}
                </p>
                <h4 className="font-display mt-3 text-2xl tracking-[-0.02em]">
                  {stop.role}
                </h4>
                <p className="mt-1 text-sm text-[var(--accent)]">{stop.place}</p>
                <p className="mt-5 text-[var(--foreground)]">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                    Win ·{" "}
                  </span>
                  {stop.achievement}
                </p>
                <p className="mt-3 text-[var(--muted)]">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                    Lesson ·{" "}
                  </span>
                  {stop.lesson}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
