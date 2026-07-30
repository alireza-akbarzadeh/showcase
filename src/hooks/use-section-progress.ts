"use client";

import { useEffect, useRef } from "react";
import { getScrollManager } from "@/engine/scroll";
import type { SectionProgress } from "@/types/scroll";

/**
 * Bind a DOM section to the scroll manager.
 * Progress updates stay outside React via the callback ref.
 */
export function useSectionProgress(
  id: string,
  onProgress?: (section: SectionProgress, y: number) => void,
): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const unregister = getScrollManager().registerSection(id, el);
    const unsubscribe = getScrollManager().subscribe((snapshot) => {
      const section = snapshot.sections.get(id);
      if (section && onProgressRef.current) {
        onProgressRef.current(section, snapshot.y);
      }
    });

    return () => {
      unregister();
      unsubscribe();
    };
  }, [id]);

  return ref;
}
