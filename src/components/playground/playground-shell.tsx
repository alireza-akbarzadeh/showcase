"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  EXPERIMENTS,
  FPS_COST_LABEL,
  type ExperimentId,
} from "@/components/playground/experiments";
import { AchievementToasts } from "@/components/layout/achievement-toasts";
import { SoundToggle } from "@/components/layout/sound-toggle";
import { SITE } from "@/constants";
import { unlockAchievement } from "@/lib/achievements";
import { cn } from "@/utils/cn";

const WaveFieldExperiment = dynamic(
  () =>
    import("@/components/playground/experiments/wave-field").then(
      (m) => m.WaveFieldExperiment,
    ),
  { ssr: false, loading: () => <ExperimentFallback /> },
);

const SortScrubExperiment = dynamic(
  () =>
    import("@/components/playground/experiments/sort-scrub").then(
      (m) => m.SortScrubExperiment,
    ),
  { ssr: false, loading: () => <ExperimentFallback /> },
);

function ExperimentFallback() {
  return (
    <div className="flex min-h-[420px] items-center justify-center border border-[var(--border)] font-mono text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
      Loading experiment…
    </div>
  );
}

export function PlaygroundShell() {
  const [active, setActive] = useState<ExperimentId>("wave-field");
  const meta = useMemo(
    () => EXPERIMENTS.find((e) => e.id === active) ?? EXPERIMENTS[0]!,
    [active],
  );

  useEffect(() => {
    unlockAchievement("playground");
  }, []);

  return (
    <div className="relative min-h-svh">
      <header className="border-b border-[var(--border)] px-6 py-5 md:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-sm tracking-[0.25em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {SITE.name}
          </Link>
          <div className="flex items-center gap-6">
            <SoundToggle />
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              Lab · Playground
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[240px_1fr] md:px-12 md:py-16">
        <aside>
          <h1 className="font-display text-3xl tracking-[-0.03em] md:text-4xl">
            Playground
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Side quests. Code-split. Never on the main scroll path.
          </p>

          <ul className="mt-10 space-y-1" role="list">
            {EXPERIMENTS.map((exp) => {
              const selected = exp.id === active;
              return (
                <li key={exp.id}>
                  <button
                    type="button"
                    onClick={() => setActive(exp.id)}
                    className={cn(
                      "w-full border-l-2 px-3 py-3 text-left transition-colors",
                      selected
                        ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]"
                        : "border-transparent hover:border-[var(--border)]",
                    )}
                    aria-current={selected ? "true" : undefined}
                  >
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">
                      {FPS_COST_LABEL[exp.fpsCost]} · {exp.fpsCost}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--foreground)]">
                      {exp.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section aria-labelledby="experiment-title">
          <div className="mb-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] uppercase">
              {meta.tags.join(" · ")}
            </p>
            <h2
              id="experiment-title"
              className="font-display mt-2 text-2xl tracking-[-0.03em] md:text-3xl"
            >
              {meta.title}
            </h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">{meta.blurb}</p>
          </div>

          {active === "wave-field" ? <WaveFieldExperiment /> : null}
          {active === "sort-scrub" ? <SortScrubExperiment /> : null}
        </section>
      </div>
      <AchievementToasts />
    </div>
  );
}
