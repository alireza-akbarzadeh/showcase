"use client";

import { useEffect, type ReactElement, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Applies reduced-motion class and pauses non-essential motion globally.
 */
export function MotionProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  return <>{children}</>;
}
