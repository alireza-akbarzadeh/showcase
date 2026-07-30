"use client";

import { useMemo, useState } from "react";

function insertionSteps(input: number[]): number[][] {
  const frames: number[][] = [input.slice()];
  const a = input.slice();
  for (let i = 1; i < a.length; i += 1) {
    const key = a[i]!;
    let j = i - 1;
    while (j >= 0 && a[j]! > key) {
      a[j + 1] = a[j]!;
      j -= 1;
      frames.push(a.slice());
    }
    a[j + 1] = key;
    frames.push(a.slice());
  }
  return frames;
}

/**
 * Insertion sort scrub — pure TS, no RAF needed.
 */
export function SortScrubExperiment() {
  const initial = useMemo(
    () => [42, 17, 88, 3, 61, 29, 75, 11, 54, 36],
    [],
  );
  const frames = useMemo(() => insertionSteps(initial), [initial]);
  const [step, setStep] = useState(0);
  const current = frames[step] ?? initial;
  const max = Math.max(...initial);

  return (
    <div className="flex h-full flex-col gap-6">
      <div>
        <label className="font-mono text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] uppercase">
          Step {step} / {frames.length - 1}
        </label>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="mt-3 w-full accent-[var(--signal)]"
          aria-label="Sort progress"
        />
      </div>

      <div
        className="flex min-h-[320px] items-end justify-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-8 md:gap-3"
        role="img"
        aria-label={`Array values: ${current.join(", ")}`}
      >
        {current.map((value, i) => (
          <div key={`${i}-${value}`} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full max-w-10 bg-[var(--signal)] transition-[height] duration-150"
              style={{ height: `${(value / max) * 240}px` }}
            />
            <span className="font-mono text-[10px] text-[var(--muted-foreground)]">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(0)}
          className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase hover:border-[var(--signal)] hover:text-[var(--signal)]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(s + 1, frames.length - 1))}
          className="border border-[var(--border)] px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[var(--signal)] uppercase hover:border-[var(--signal)]"
        >
          Step
        </button>
      </div>
    </div>
  );
}
