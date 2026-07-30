import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import {
  easeOutCubic,
  easeInOutCubic,
  easeOutExpo,
} from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createHeroScene(
  getElements: () => {
    title: HTMLElement | null;
    subtitle: HTMLElement | null;
    line: HTMLElement | null;
    cue: HTMLElement | null;
    meta: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "hero",
    tracks: [
      {
        id: "titleY",
        keyframes: keyframes(
          [0, 0],
          [0.4, -18, easeOutCubic],
          [1, -140, easeOutExpo],
        ),
      },
      {
        id: "titleScale",
        keyframes: keyframes([0, 1], [0.55, 0.98], [1, 0.9, easeInOutCubic]),
      },
      {
        id: "titleOpacity",
        keyframes: keyframes([0, 1], [0.65, 0.85], [1, 0.12]),
      },
      {
        id: "subtitleY",
        keyframes: keyframes([0, 0], [1, -72, easeOutCubic]),
      },
      {
        id: "subtitleOpacity",
        keyframes: keyframes([0, 1], [0.55, 0.7], [1, 0.1]),
      },
      {
        id: "lineScale",
        keyframes: keyframes([0, 1], [0.7, 0.55], [1, 0.15, easeInOutCubic]),
      },
      {
        id: "cueOpacity",
        keyframes: keyframes([0, 1], [0.35, 0.55], [0.65, 0]),
      },
      {
        id: "metaOpacity",
        keyframes: keyframes([0, 1], [0.5, 0.55], [0.85, 0]),
      },
    ],
  });

  return {
    id: "hero",
    range: { start: 0, end: 0.16, normalized: true },
    label: "Hero",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { title, subtitle, line, cue, meta } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";
      const yMul = mobile ? 0.5 : 1;

      if (title) {
        setTransform(title, {
          y: (values.get("titleY") ?? 0) * yMul,
          scale: values.get("titleScale") ?? 1,
        });
        setOpacity(title, Math.max(0.08, values.get("titleOpacity") ?? 1));
      }
      if (subtitle) {
        setTransform(subtitle, {
          y: (values.get("subtitleY") ?? 0) * yMul,
        });
        setOpacity(
          subtitle,
          Math.max(0.08, values.get("subtitleOpacity") ?? 1),
        );
      }
      if (line) {
        setTransform(line, {
          scaleX: values.get("lineScale") ?? 1,
          scaleY: 1,
        });
        setOpacity(line, Math.max(0.1, 1 - ctx.progress * 1.1));
      }
      if (cue) {
        setOpacity(cue, values.get("cueOpacity") ?? 1);
        setTransform(cue, { y: ctx.progress * 28 });
      }
      if (meta) {
        setOpacity(meta, values.get("metaOpacity") ?? 1);
        setTransform(meta, { y: ctx.progress * -12 });
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}
