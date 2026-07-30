"use client";

import type { ReactNode } from "react";
import { MonitoringBoot } from "@/components/layout/monitoring-boot";
import { ThemeProvider } from "@/providers/theme-provider";
import { ScrollProvider } from "@/providers/scroll-provider";
import { CanvasProvider } from "@/providers/canvas-provider";
import { MotionProvider } from "@/providers/motion-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <ScrollProvider>
          <CanvasProvider>
            <MonitoringBoot />
            {children}
          </CanvasProvider>
        </ScrollProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
