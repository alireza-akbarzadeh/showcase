import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createHeroScene(
  getElements: () => {
    title: HTMLElement | null;
    subtitle: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "hero",
    tracks: [
      {
        id: "titleY",
        keyframes: keyframes([0, 0], [1, -120, easeOutCubic]),
      },
      {
        id: "titleOpacity",
        keyframes: keyframes([0, 1], [0.7, 0.2, easeInOutCubic], [1, 0]),
      },
      {
        id: "subtitleY",
        keyframes: keyframes([0, 0], [1, -60, easeOutCubic]),
      },
    ],
  });

  return {
    id: "hero",
    range: { start: 0, end: 0.18, normalized: true },
    label: "Hero",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { title, subtitle } = getElements();
      if (title) {
        setTransform(title, { y: values.get("titleY") ?? 0 });
        setOpacity(title, values.get("titleOpacity") ?? 1);
      }
      if (subtitle) {
        setTransform(subtitle, { y: values.get("subtitleY") ?? 0 });
        setOpacity(subtitle, 1 - ctx.progress * 0.85);
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}
