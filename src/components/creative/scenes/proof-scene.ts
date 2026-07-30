import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";

export function createProofScene(
  getElements: () => {
    root: HTMLElement | null;
    stats: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "proof",
    tracks: [
      {
        id: "y",
        keyframes: keyframes([0, 28], [0.3, 0, easeOutCubic], [1, -16]),
      },
    ],
  });

  return {
    id: "proof",
    range: { start: 0.74, end: 0.88, normalized: true },
    label: "Proof",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { root, stats } = getElements();
      if (root) {
        setTransform(root, { y: values.get("y") ?? 0 });
      }
      stats.forEach((el, i) => {
        const start = 0.08 + i * 0.15;
        const local = Math.min(Math.max((ctx.progress - start) / 0.35, 0), 1);
        const t = easeInOutCubic(local);
        setOpacity(el, Math.max(0.6, t));
        setTransform(el, { y: (1 - t) * 20, scale: 0.97 + t * 0.03 });

        const valueEl = el.querySelector<HTMLElement>("[data-proof-value]");
        if (valueEl) {
          const target = Number(valueEl.dataset.proofTarget ?? 0);
          const suffix = valueEl.dataset.proofSuffix ?? "";
          // Keep static display strings for non-numeric showcases
          if (target > 0) {
            valueEl.textContent = `${Math.round(target * Math.max(0.15, t))}${suffix}`;
          }
        }
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
