import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createIntroScene(
  getElements: () => { root: HTMLElement | null },
): SceneDefinition {
  const timeline = createTimeline({
    id: "intro",
    tracks: [
      {
        id: "rise",
        keyframes: keyframes([0, 80], [0.4, 0, easeOutCubic], [1, -40]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.25, 1], [0.8, 1], [1, 0]),
      },
    ],
  });

  return {
    id: "intro",
    range: { start: 0.12, end: 0.32, normalized: true },
    label: "Intro",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root } = getElements();
      if (!root) return;
      setTransform(root, { y: values.get("rise") ?? 0 });
      setOpacity(root, values.get("fade") ?? 0);
    },
    onDestroy: () => timeline.destroy(),
  };
}
