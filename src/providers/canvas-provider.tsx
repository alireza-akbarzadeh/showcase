"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getQualityGuardian } from "@/engine/performance";
import type { QualityFlags } from "@/types/quality";

interface CanvasContextValue {
  ready: boolean;
  setReady: (ready: boolean) => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  quality: QualityFlags;
}

const CanvasContext = createContext<CanvasContextValue | null>(null);

export function CanvasProvider({
  children,
  initiallyEnabled = true,
}: {
  children: ReactNode;
  initiallyEnabled?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(initiallyEnabled);
  const [quality, setQuality] = useState<QualityFlags>(() =>
    getQualityGuardian().getFlags(),
  );

  useEffect(() => {
    const guardian = getQualityGuardian();
    guardian.start();
    return guardian.subscribe(setQuality);
  }, []);

  const value = useMemo(
    () => ({ ready, setReady, enabled, setEnabled, quality }),
    [ready, enabled, quality],
  );

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

export function useCanvas(): CanvasContextValue {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error("useCanvas must be used within CanvasProvider");
  }
  return ctx;
}
