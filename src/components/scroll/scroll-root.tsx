"use client";

import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/scroll/scroll-progress";

export function ScrollRoot({ children }: { children: ReactNode }) {
  return (
    <div data-scroll-root className="relative">
      <ScrollProgress className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5" />
      {children}
    </div>
  );
}
