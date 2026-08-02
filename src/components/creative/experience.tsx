"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ExperienceLoader } from "@/components/layout/experience-loader";
import { ErrorBoundary } from "@/components/layout/error-boundary";
import { PerfOverlay } from "@/components/layout/perf-overlay";
import { ShortcutsOverlay } from "@/components/layout/shortcuts-overlay";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { AchievementToasts } from "@/components/layout/achievement-toasts";
import { DelightHooks } from "@/components/layout/delight-hooks";
import { ActTransitionVeil } from "@/components/layout/act-transition-veil";
import { ScrollRoot, ActIndicators } from "@/components/scroll";
import { CanvasRoot } from "@/components/canvas";
import { SceneHost } from "@/components/creative/scene-host";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useSoundHotkey } from "@/hooks/use-sound";

const HeroField = dynamic(
  () =>
    import("@/components/canvas/hero-field").then((m) => m.HeroField),
  { ssr: false, loading: () => null },
);

export function Experience() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  useKeyboardNavigation(ready);
  useSoundHotkey(ready);

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
          <SceneHost ready={ready} />
        </AppShell>
        <ActIndicators />
        <ActTransitionVeil />
        <CustomCursor />
        <PerfOverlay />
        <ShortcutsOverlay />
        <AchievementToasts />
        <DelightHooks ready={ready} />
      </ScrollRoot>
    </>
  );
}
