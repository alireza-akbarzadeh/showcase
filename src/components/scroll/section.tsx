"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { getScrollManager } from "@/engine/scroll";
import { cn } from "@/utils/cn";
import type { SceneId } from "@/types/scene";
import type { SectionProgress } from "@/types/scroll";

export interface SectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "onProgress"> {
  id: SceneId | string;
  children: ReactNode;
  as?: "section" | "div" | "article";
  onProgress?: (section: SectionProgress) => void;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section(
    { id, children, className, as: Tag = "section", onProgress, ...rest },
    forwardedRef,
  ) {
    const localRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(forwardedRef, () => localRef.current as HTMLElement);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;

      const unregister = getScrollManager().registerSection(id, el);
      const unsubscribe = onProgress
        ? getScrollManager().subscribe((snapshot) => {
            const section = snapshot.sections.get(id);
            if (section) onProgress(section);
          })
        : undefined;

      return () => {
        unregister();
        unsubscribe?.();
      };
    }, [id, onProgress]);

    return (
      <Tag
        ref={localRef as React.RefObject<HTMLElement & HTMLDivElement>}
        id={id}
        data-scene={id}
        className={cn("relative w-full", className)}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
