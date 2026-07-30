"use client";

import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { getRafScheduler } from "@/engine/scheduler";
import { getPointerClient, retainPointerTracking } from "@/engine/observers";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { damp } from "@/utils/math";
import { cn } from "@/utils/cn";

interface MagneticProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Max pull in px. */
  strength?: number;
  radius?: number;
}

/**
 * Magnetic pull on hover — transform only, desktop + motion allowed.
 */
export function Magnetic({
  children,
  className,
  strength = 18,
  radius = 120,
  ...rest
}: MagneticProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rafKey = useId().replace(/:/g, "");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = rootRef.current;
    if (!el) return;

    const release = retainPointerTracking();
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let hovering = false;

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    const id = getRafScheduler().register(
      (frame) => {
        if (hovering) {
          const rect = el.getBoundingClientRect();
          const mx = rect.left + rect.width / 2;
          const my = rect.top + rect.height / 2;
          const pointer = getPointerClient();
          const dx = pointer.clientX - mx;
          const dy = pointer.clientY - my;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const t = 1 - dist / radius;
            tx = dx * t * (strength / 8);
            ty = dy * t * (strength / 8);
          } else {
            tx = 0;
            ty = 0;
          }
        } else {
          tx = 0;
          ty = 0;
        }

        cx = damp(cx, tx, 12, frame.deltaSeconds);
        cy = damp(cy, ty, 12, frame.deltaSeconds);
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      },
      { priority: "normal", label: "magnetic", id: `magnetic-${rafKey}` },
    );

    return () => {
      getRafScheduler().unregister(id);
      release();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [reduced, radius, strength, rafKey]);

  return (
    <div
      ref={rootRef}
      data-magnetic
      className={cn("will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
