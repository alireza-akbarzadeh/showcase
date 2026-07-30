"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { getRafScheduler } from "@/engine/scheduler";
import { getScrollManager } from "@/engine/scroll";
import { useScroll } from "@/hooks/use-scroll";

function subscribePerfFlag(onStoreChange: () => void): () => void {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getPerfFlag(): boolean {
  return new URLSearchParams(window.location.search).get("debug") === "perf";
}

/**
 * `?debug=perf` overlay — updates via DOM text, low frequency.
 */
export function PerfOverlay() {
  const enabled = useSyncExternalStore(
    subscribePerfFlag,
    getPerfFlag,
    () => false,
  );
  const fpsRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLSpanElement>(null);
  const actRef = useRef<HTMLSpanElement>(null);
  const frameAccum = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const id = getRafScheduler().register(
      (frame) => {
        frameAccum.current += 1;
        if (frameAccum.current % 6 !== 0) return;
        if (fpsRef.current) {
          fpsRef.current.textContent = frame.fps.toFixed(0);
        }
      },
      { priority: "idle", label: "perf-overlay", id: "perf-overlay" },
    );
    return () => getRafScheduler().unregister(id);
  }, [enabled]);

  useScroll((snapshot) => {
    if (!enabled) return;
    if (scrollRef.current) {
      scrollRef.current.textContent = `${(snapshot.progress * 100).toFixed(1)}%`;
    }
    if (actRef.current) {
      actRef.current.textContent = snapshot.breakpoint;
    }
  }, enabled);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 z-[90] rounded border border-[var(--border)] bg-black/70 px-3 py-2 font-mono text-xs text-[var(--accent)] backdrop-blur-sm"
      aria-hidden="true"
    >
      <div>
        FPS <span ref={fpsRef}>—</span>
      </div>
      <div>
        Scroll <span ref={scrollRef}>—</span>
      </div>
      <div>
        BP <span ref={actRef}>—</span>
      </div>
      <div>y {getScrollManager().getSnapshot().y.toFixed(0)}</div>
    </div>
  );
}
