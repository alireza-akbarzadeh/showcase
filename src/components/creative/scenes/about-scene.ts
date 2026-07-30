import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { setOpacity, setTransform } from "@/utils/performance";

export function createAboutScene(
  getElements: () => { root: HTMLElement | null },
): SceneDefinition {
  const timeline = createTimeline({
    id: "about",
    tracks: [
      {
        id: "x",
        keyframes: keyframes([0, -40], [0.4, 0], [1, 20]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.25, 1], [0.85, 1], [1, 0]),
      },
    ],
  });

  return {
    id: "about",
    range: { start: 0.48, end: 0.68, normalized: true },
    label: "About",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root } = getElements();
      if (!root) return;
      setTransform(root, { x: values.get("x") ?? 0 });
      setOpacity(root, values.get("fade") ?? 1);
    },
    onDestroy: () => timeline.destroy(),
  };
}
