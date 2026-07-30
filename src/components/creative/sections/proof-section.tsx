"use client";

import { forwardRef } from "react";
import { PROOF } from "@/constants";
import { cn } from "@/utils/cn";
import { getScrollManager } from "@/engine/scroll";

interface ProofSectionProps {
  className?: string;
  statsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  comparisonsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  evidenceRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Act IV Proof strip — site budgets + Orbit before/after evidence.
 * Wipe / counters driven by createProofScene (no React on scroll).
 */
export const ProofSection = forwardRef<HTMLDivElement, ProofSectionProps>(
  function ProofSection(
    { className, statsRef, comparisonsRef, evidenceRef },
    ref,
  ) {
    const orbit = PROOF.evidence[0];

    return (
      <div ref={ref} className={cn("w-full will-change-transform", className)}>
        <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)] uppercase">
          Act IV · Proof
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] tracking-[-0.035em]">
          {PROOF.headline}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
          {PROOF.support}
        </p>

        <ul className="mt-16 grid gap-10 sm:grid-cols-3">
          {PROOF.siteMetrics.map((item, i) => (
            <li
              key={item.id}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="border-t border-[var(--border)] pt-6 will-change-transform"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                {item.label}
              </p>
              <p
                className="font-display mt-3 text-5xl tracking-[-0.04em] text-[var(--accent)] md:text-6xl"
                data-proof-value
                data-proof-target={item.target}
                data-proof-display={item.display}
                data-proof-prefix={item.prefix ?? ""}
                data-proof-suffix={item.suffix ?? ""}
                data-proof-static={item.target === 0 || item.display.includes("–") || item.display.includes("≤") ? "true" : "false"}
              >
                {item.display}
              </p>
              {item.note ? (
                <p className="mt-3 text-sm text-[var(--muted)]">{item.note}</p>
              ) : null}
            </li>
          ))}
        </ul>

        {orbit ? (
          <div
            ref={evidenceRef}
            data-proof-evidence
            className="mt-24 will-change-transform"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border)] pt-10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--accent)] uppercase">
                  Case · {orbit.projectId}
                </p>
                <h3 className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.03em]">
                  {orbit.title}
                </h3>
                <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
                  {orbit.summary}
                </p>
              </div>
              <button
                type="button"
                className="font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] uppercase underline-offset-4 hover:text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                onClick={() => getScrollManager().scrollTo("#orbit")}
              >
                Revisit Orbit →
              </button>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {orbit.comparisons.map((cmp, i) => (
                <div
                  key={cmp.id}
                  ref={(el) => {
                    comparisonsRef.current[i] = el;
                  }}
                  data-proof-compare
                  className="relative overflow-hidden border border-[var(--border)] will-change-transform"
                >
                  <p className="border-b border-[var(--border)] px-5 py-3 font-mono text-[10px] tracking-[0.22em] text-[var(--muted)] uppercase">
                    {cmp.label}
                  </p>
                  <div className="relative grid min-h-[140px] grid-cols-2">
                    <div className="flex flex-col justify-end px-5 py-6">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                        {cmp.beforeLabel}
                      </span>
                      <span className="font-display mt-2 text-2xl tracking-[-0.02em] text-[var(--muted)] md:text-3xl">
                        {cmp.beforeValue}
                      </span>
                    </div>
                    <div className="flex flex-col justify-end border-l border-[var(--border)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] px-5 py-6">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase">
                        {cmp.afterLabel}
                      </span>
                      <span className="font-display mt-2 text-2xl tracking-[-0.02em] text-[var(--foreground)] md:text-3xl">
                        {cmp.afterValue}
                      </span>
                    </div>
                    {/* Wipe reveal — scaleX from left via scene */}
                    <div
                      data-proof-wipe
                      className="pointer-events-none absolute inset-y-0 left-1/2 w-px origin-left bg-[var(--accent)] will-change-transform"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="border-t border-[var(--border)] px-5 py-3 text-sm text-[var(--muted)]">
                    {cmp.detail}
                  </p>
                </div>
              ))}
            </div>

            <dl className="mt-12 flex flex-wrap gap-10 md:gap-14">
              {orbit.metrics.map((metric) => (
                <div key={metric.id}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                    {metric.label}
                  </dt>
                  <dd
                    className="font-display mt-2 text-4xl tracking-[-0.03em] text-[var(--accent)] md:text-5xl"
                    data-proof-case-metric
                    data-proof-target={metric.target}
                    data-proof-prefix={metric.prefix ?? ""}
                    data-proof-suffix={metric.suffix ?? ""}
                    data-proof-display={metric.display}
                  >
                    {metric.display}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        <p
          data-proof-closing
          className="mt-20 max-w-2xl border-t border-[var(--border)] pt-10 text-xl text-[var(--muted)] will-change-transform md:text-2xl"
        >
          {PROOF.closing}
        </p>
      </div>
    );
  },
);
