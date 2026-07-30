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
        keyframes: keyframes([0, 40], [0.35, 0, easeOutCubic], [1, -36]),
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
      }
      if (accent) {
        setOpacity(accent, 0.55 + Math.min(1, ctx.progress * 2) * 0.45);
      }
      lines.forEach((line, i) => {
        const start = 0.1 + i * 0.18;
        const local = Math.min(Math.max((ctx.progress - start) / 0.28, 0), 1);
        const eased = easeInOutCubic(local);
        // Keep readable: floor opacity at 0.35 once section is near
        const floor = ctx.scroll.sections.get("intro")?.inView ? 0.45 : 0.25;
        setOpacity(line, Math.max(floor, 0.35 + eased * 0.65));
        setTransform(line, { y: (1 - eased) * 18, x: (1 - eased) * -8 });
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
