import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createProjectsScene(
  getElements: () => { root: HTMLElement | null },
): SceneDefinition {
  const timeline = createTimeline({
    id: "projects",
    tracks: [
      {
        id: "scale",
        keyframes: keyframes(
          [0, 0.92],
          [0.35, 1, easeInOutCubic],
          [1, 0.96],
        ),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.2, 1], [0.85, 1], [1, 0.4]),
      },
    ],
  });

  return {
    id: "projects",
    range: { start: 0.28, end: 0.52, normalized: true },
    label: "Projects",
    prefetch: () => {
      // Prefetch project textures / models when approaching.
    },
    unload: () => {
      // Unload heavy project assets when leaving.
    },
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root } = getElements();
      if (!root) return;
      const scale = values.get("scale") ?? 1;
      setTransform(root, { scale });
      setOpacity(root, values.get("fade") ?? 1);
    },
    onDestroy: () => timeline.destroy(),
  };
}
