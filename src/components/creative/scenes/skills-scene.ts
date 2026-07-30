import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createSkillsScene(
  getElements: () => {
    root: HTMLElement | null;
    clusters: HTMLElement[];
    connectors: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "skills",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 36], [0.3, 0, easeOutCubic], [1, -28]),
      },
    ],
  });

  return {
    id: "skills",
    range: { start: 0.24, end: 0.4, normalized: true },
    label: "Craft",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, clusters, connectors } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";

      if (root) {
        setTransform(root, {
          y: (values.get("y") ?? 0) * (mobile ? 0.4 : 1),
        });
      }

      clusters.forEach((el, i) => {
        const start = 0.08 + i * 0.12;
        const local = Math.min(Math.max((ctx.progress - start) / 0.28, 0), 1);
        const t = easeInOutCubic(local);
        setOpacity(el, Math.max(0.5, t));
        setTransform(el, {
          y: (1 - t) * 24,
          scale: 0.97 + t * 0.03,
        });
      });

      connectors.forEach((el, i) => {
        const start = 0.2 + i * 0.12;
        const local = Math.min(Math.max((ctx.progress - start) / 0.3, 0), 1);
        setTransform(el, { scaleX: easeOutCubic(local), scaleY: 1 });
        setOpacity(el, Math.max(0.15, local));
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
