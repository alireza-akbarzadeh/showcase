"use client";

import { useCallback, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ExperienceLoader } from "@/components/layout/experience-loader";
import { ErrorBoundary } from "@/components/layout/error-boundary";
import { PerfOverlay } from "@/components/layout/perf-overlay";
import { ScrollRoot, ActIndicators } from "@/components/scroll";
import { CanvasRoot } from "@/components/canvas";
import { HeroField } from "@/components/canvas/hero-field";
import { SceneHost } from "@/components/creative/scene-host";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

export function Experience() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  useKeyboardNavigation(ready);

  return (
    <>
      <ExperienceLoader onComplete={onComplete} />
      <ScrollRoot>
        <ErrorBoundary name="canvas" fallback={null}>
          <CanvasRoot>
            <HeroField />
          </CanvasRoot>
        </ErrorBoundary>
        <AppShell>
          {/* Content is always mounted and visible — loader only overlays */}
          <SceneHost ready={ready} />
        </AppShell>
        <ActIndicators />
        <PerfOverlay />
      </ScrollRoot>
    </>
  );
}
