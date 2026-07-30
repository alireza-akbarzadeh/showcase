"use client";

import { useEffect, useRef } from "react";
import { getRafScheduler } from "@/engine/scheduler";
import { retainPointerTracking, getPointerClient } from "@/engine/observers";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { damp } from "@/utils/math";

type CursorMode = "default" | "hover" | "text";

/**
 * Desktop custom cursor — RAF translate3d only, no React state per move.
 * Hidden on touch / reduced-motion (system cursor remains).
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!root || !ring || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");
    const releasePointer = retainPointerTracking();

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let mode: CursorMode = "default";
    let visible = false;

    const applyMode = (next: CursorMode) => {
      if (mode === next) return;
      mode = next;
      root.dataset.mode = next;
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest(
          "a, button, [role='button'], [data-magnetic], [data-cursor='hover']",
        )
      ) {
        applyMode("hover");
        return;
      }
      if (target.closest("input, textarea, [contenteditable='true']")) {
        applyMode("text");
        return;
      }
      applyMode("default");
    };

    const onEnter = () => {
      visible = true;
      root.style.opacity = "1";
    };
    const onLeave = () => {
      visible = false;
      root.style.opacity = "0";
    };

    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", onEnter, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", onLeave, {
      passive: true,
    });

    const id = getRafScheduler().register(
      (frame) => {
        const pointer = getPointerClient();
        if (pointer.active) {
          x = pointer.clientX;
          y = pointer.clientY;
          if (!visible) {
            visible = true;
            root.style.opacity = "1";
          }
        }

        const lag = mode === "hover" ? 14 : 18;
        rx = damp(rx, x, lag, frame.deltaSeconds);
        ry = damp(ry, y, lag, frame.deltaSeconds);

        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      },
      { priority: "high", label: "custom-cursor", id: "custom-cursor" },
    );

    return () => {
      getRafScheduler().unregister(id);
      releasePointer();
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={rootRef}
      data-mode="default"
      className="pointer-events-none fixed inset-0 z-[80] hidden opacity-0 group md:block"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-10 w-10 rounded-full border border-[var(--accent)] transition-[width,height,border-color] duration-200 group-data-[mode=hover]:h-14 group-data-[mode=hover]:w-14 group-data-[mode=text]:h-6 group-data-[mode=text]:w-6 group-data-[mode=text]:border-[var(--muted)]"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
      />
    </div>
  );
}
