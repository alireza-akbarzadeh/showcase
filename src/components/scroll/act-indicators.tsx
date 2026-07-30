"use client";

import { useEffect, useRef } from "react";
import { ACTS } from "@/constants";
import { useScroll } from "@/hooks/use-scroll";
import { getScrollManager } from "@/engine/scroll";
import { cn } from "@/utils/cn";

/**
 * Side act wayfinding — DOM class updates, not React re-renders per frame.
 */
export function ActIndicators() {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useScroll((snapshot) => {
    const p = snapshot.progress;
    ACTS.forEach((act, index) => {
      const el = itemRefs.current[index];
      if (!el) return;
      const [start, end] = act.range;
      const active = p >= start && p < end;
      el.dataset.active = active ? "true" : "false";
      el.setAttribute("aria-current", active ? "true" : "false");
    });
  });

  useEffect(() => {
    // Seed initial state after mount.
    const p = getScrollManager().getSnapshot().progress;
    ACTS.forEach((act, index) => {
      const el = itemRefs.current[index];
      if (!el) return;
      const [start, end] = act.range;
      const active = p >= start && p < end;
      el.dataset.active = active ? "true" : "false";
    });
  }, []);

  return (
    <nav
      aria-label="Acts"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:block lg:right-8"
    >
      <ul className="flex flex-col gap-3">
        {ACTS.map((act, index) => (
          <li key={act.id}>
            <button
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              className={cn(
                "pointer-events-auto group flex items-center gap-3 text-left",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--signal)]",
              )}
              aria-label={act.label}
              onClick={() => {
                const scene = act.scenes[0];
                if (scene) getScrollManager().scrollTo(`#${scene}`);
              }}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-[var(--muted)] transition-transform duration-300",
                  "group-data-[active=true]:scale-150 group-data-[active=true]:bg-[var(--signal)]",
                )}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase opacity-0 transition-opacity group-hover:opacity-100 group-data-[active=true]:opacity-100 group-data-[active=true]:text-[var(--foreground)]">
                {act.short}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
