import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createContactScene(
  getElements: () => { root: HTMLElement | null },
): SceneDefinition {
  const timeline = createTimeline({
    id: "contact",
    tracks: [
      {
        id: "rise",
        keyframes: keyframes([0, 80], [0.5, 0, easeOutCubic], [1, 0]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.35, 1], [1, 1]),
      },
    ],
  });

  return {
    id: "contact",
    range: { start: 0.78, end: 1, normalized: true },
    label: "Contact",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root } = getElements();
      if (!root) return;
      setTransform(root, { y: values.get("rise") ?? 0 });
      setOpacity(root, values.get("fade") ?? 1);
    },
    onDestroy: () => timeline.destroy(),
  };
}
