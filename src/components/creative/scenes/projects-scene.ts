import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic } from "@/engine/animation/easings";
import { setTransform } from "@/utils/performance";

export function createProjectsScene(
  getElements: () => {
    root: HTMLElement | null;
    heading: HTMLElement | null;
    panels: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "projects",
    tracks: [
      {
        id: "headingY",
        keyframes: keyframes([0, 32], [0.2, 0, easeOutCubic]),
      },
    ],
  });

  return {
    id: "projects",
    range: { start: 0.45, end: 0.78, normalized: true },
    label: "Projects",
    onProgress: (ctx) => {
      const values = timeline.setProgress(ctx.progress);
      const { heading, panels } = getElements();
      if (heading) {
        setTransform(heading, { y: values.get("headingY") ?? 0 });
      }

      const count = Math.max(panels.length, 1);
      panels.forEach((panel, i) => {
        const start = 0.12 + (i / count) * 0.7;
        const end = start + 0.55 / count + 0.2;
        const local = Math.min(
          Math.max((ctx.progress - start) / Math.max(end - start, 0.001), 0),
          1,
        );
        const enter = easeOutCubic(Math.min(local / 0.35, 1));
        const y = (1 - enter) * 48 + (local > 0.75 ? (local - 0.75) * -40 : 0);
        const scale = 0.96 + enter * 0.04;
        setTransform(panel, { y, scale });

        const metrics = panel.querySelectorAll<HTMLElement>("[data-metric-value]");
        metrics.forEach((metric) => {
          const target = Number(metric.dataset.metricTarget ?? 0);
          const suffix = metric.dataset.metricSuffix ?? "";
          const prefix = metric.dataset.metricPrefix ?? "";
          const isFloat = metric.dataset.metricFloat === "true";
          const current =
            target * Math.min(Math.max((local - 0.15) / 0.5, 0), 1);
          metric.textContent = isFloat
            ? `${prefix}${current.toFixed(1)}${suffix}`
            : `${prefix}${Math.round(current)}${suffix}`;
        });
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}
