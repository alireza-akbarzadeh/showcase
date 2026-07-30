import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createIntroScene(
  getElements: () => {
    root: HTMLElement | null;
    lines: HTMLElement[];
    accent: HTMLElement | null;
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "intro",
    tracks: [
      {
        id: "rise",
        keyframes: keyframes([0, 80], [0.35, 0, easeOutCubic], [1, -50]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.2, 1], [0.75, 1], [1, 0]),
      },
    ],
  });

  return {
    id: "intro",
    range: { start: 0.1, end: 0.28, normalized: true },
    label: "Intro",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, lines, accent } = getElements();
      if (root) {
        setTransform(root, { y: values.get("rise") ?? 0 });
        setOpacity(root, values.get("fade") ?? 0);
      }
      if (accent) {
        setOpacity(accent, Math.min(1, ctx.progress * 3));
      }
      // Stagger lines by progress windows
      lines.forEach((line, i) => {
        const start = 0.15 + i * 0.18;
        const local = Math.min(Math.max((ctx.progress - start) / 0.25, 0), 1);
        const eased = easeInOutCubic(local);
        setOpacity(line, eased);
        setTransform(line, { y: (1 - eased) * 28, x: (1 - eased) * -12 });
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
