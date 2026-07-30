import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createAboutScene(
  getElements: () => {
    root: HTMLElement | null;
    chapters: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "about",
    tracks: [
      {
        id: "x",
        keyframes: keyframes([0, -48], [0.35, 0, easeOutCubic], [1, 24]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.2, 1], [0.85, 1], [1, 0]),
      },
    ],
  });

  return {
    id: "about",
    range: { start: 0.36, end: 0.48, normalized: true },
    label: "About",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, chapters } = getElements();
      if (root) {
        setTransform(root, { x: values.get("x") ?? 0 });
        setOpacity(root, values.get("fade") ?? 1);
      }
      chapters.forEach((el, i) => {
        const start = 0.15 + i * 0.2;
        const local = Math.min(Math.max((ctx.progress - start) / 0.3, 0), 1);
        const t = easeInOutCubic(local);
        setOpacity(el, t);
        setTransform(el, { y: (1 - t) * 32 });
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
