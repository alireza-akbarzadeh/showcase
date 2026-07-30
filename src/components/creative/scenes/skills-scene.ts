import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { setOpacity, setTransform } from "@/utils/performance";

export function createSkillsScene(
  getElements: () => { root: HTMLElement | null },
): SceneDefinition {
  const timeline = createTimeline({
    id: "skills",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 60], [0.35, 0], [1, -30]),
      },
      {
        id: "fade",
        keyframes: keyframes([0, 0], [0.2, 1], [0.85, 1], [1, 0]),
      },
    ],
  });

  return {
    id: "skills",
    range: { start: 0.64, end: 0.82, normalized: true },
    label: "Skills",
    onProgress: (ctx) => {
      // Mobile gets a gentler vertical travel.
      const mobile = ctx.scroll.breakpoint === "mobile";
      const values = timeline.setProgress(ctx.progress);
      const { root } = getElements();
      if (!root) return;
      const y = (values.get("y") ?? 0) * (mobile ? 0.45 : 1);
      setTransform(root, { y });
      setOpacity(root, values.get("fade") ?? 1);
    },
    onDestroy: () => timeline.destroy(),
  };
}
