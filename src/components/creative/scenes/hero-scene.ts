import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic, easeOutExpo } from "@/engine/animation/easings";
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
        keyframes: keyframes([0, 0], [0.55, -40, easeOutCubic], [1, -160, easeOutExpo]),
      },
      {
        id: "titleScale",
        keyframes: keyframes([0, 1], [1, 0.92, easeInOutCubic]),
      },
      {
        id: "titleOpacity",
        keyframes: keyframes([0, 1], [0.65, 0.55], [1, 0]),
      },
      {
        id: "subtitleY",
        keyframes: keyframes([0, 0], [1, -80, easeOutCubic]),
      },
      {
        id: "subtitleOpacity",
        keyframes: keyframes([0, 1], [0.5, 0.7], [1, 0]),
      },
      {
        id: "lineScale",
        keyframes: keyframes([0, 1], [1, 0.2, easeInOutCubic]),
      },
      {
        id: "cueOpacity",
        keyframes: keyframes([0, 1], [0.35, 0.4], [0.7, 0]),
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
      const yMul = mobile ? 0.55 : 1;

      if (title) {
        setTransform(title, {
          y: (values.get("titleY") ?? 0) * yMul,
          scale: values.get("titleScale") ?? 1,
        });
        setOpacity(title, values.get("titleOpacity") ?? 1);
      }
      if (subtitle) {
        setTransform(subtitle, {
          y: (values.get("subtitleY") ?? 0) * yMul,
        });
        setOpacity(subtitle, values.get("subtitleOpacity") ?? 1);
      }
      if (line) {
        setTransform(line, { scaleX: values.get("lineScale") ?? 1, scaleY: 1 });
        setOpacity(line, 1 - ctx.progress * 0.9);
      }
      if (cue) {
        setOpacity(cue, values.get("cueOpacity") ?? 1);
        setTransform(cue, { y: ctx.progress * 30 });
      }
      if (meta) {
        setOpacity(meta, Math.max(0, 1 - ctx.progress * 1.4));
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}
