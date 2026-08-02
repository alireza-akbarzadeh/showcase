import type { SceneDefinition } from "@/types/scene";
import { createTimeline, keyframes } from "@/engine/animation";
import { easeOutCubic, easeInOutCubic } from "@/engine/animation/easings";
import { setOpacity, setTransform } from "@/utils/performance";
import {
  chapterLocal,
  morphAmount,
  shouldUpdateMetric,
} from "@/components/creative/scenes/project-progress";

export function createProjectsScene(
  getElements: () => {
    root: HTMLElement | null;
    heading: HTMLElement | null;
    immersives: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "projects",
    tracks: [
      {
        id: "headingY",
        keyframes: keyframes([0, 40], [0.08, 0, easeOutCubic]),
      },
      {
        id: "headingOpacity",
        keyframes: keyframes([0, 1], [0.1, 1], [0.22, 0.55]),
      },
    ],
  });

  let frameCounter = 0;

  return {
    id: "projects",
    range: { start: 0.4, end: 0.78, normalized: true },
    label: "Projects",
    onProgress: (ctx) => {
      frameCounter += 1;
      const values = timeline.setProgress(ctx.progress);
      const { heading, immersives } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";

      if (heading) {
        setTransform(heading, { y: values.get("headingY") ?? 0 });
        setOpacity(heading, values.get("headingOpacity") ?? 1);
      }

      const count = Math.max(immersives.length, 1);
      immersives.forEach((root, i) => {
        const start = 0.06 + (i / count) * 0.88;
        const end = start + 0.88 / count;
        const local = chapterLocal(ctx.progress, start, end);
        driveImmersive(root, local, mobile, frameCounter);
      });
    },
    prefetch: () => {
      // Reserved for project media / KTX2 when case-study assets land.
    },
    unload: () => {
      frameCounter = 0;
      const { immersives } = getElements();
      for (const root of immersives) {
        root.querySelectorAll<SVGPathElement>("[data-ip-edge]").forEach((path) => {
          path.style.strokeDashoffset = path.getTotalLength().toString();
        });
      }
    },
    onDestroy: () => timeline.destroy(),
  };
}

function driveImmersive(
  root: HTMLElement,
  local: number,
  mobile: boolean,
  frame: number,
): void {
  const morph = morphAmount(local);
  const yMul = mobile ? 0.55 : 1;

  const stage = root.querySelector<HTMLElement>("[data-ip-stage]");
  const title = root.querySelector<HTMLElement>("[data-ip-title]");
  const tagline = root.querySelector<HTMLElement>("[data-ip-tagline]");
  const meta = root.querySelector<HTMLElement>("[data-ip-meta]");
  const rule = root.querySelector<HTMLElement>("[data-ip-rule]");
  const device = root.querySelector<HTMLElement>("[data-ip-device]");

  if (stage) {
    const scale = 0.92 + (1 - morph) * 0.08;
    setTransform(stage, { scale, y: morph * 24 * yMul });
  }
  if (title) {
    setTransform(title, {
      y: morph * 18 * yMul,
      scale: 0.96 + (1 - morph) * 0.04,
    });
  }
  if (tagline) {
    setOpacity(tagline, 0.85 + (1 - morph) * 0.15);
    setTransform(tagline, { y: morph * 12 });
  }
  if (meta) setOpacity(meta, 0.85 + (1 - morph) * 0.15);
  if (rule) {
    setTransform(rule, { scaleX: 0.35 + (1 - morph) * 0.65, scaleY: 1 });
  }
  if (device) {
    setTransform(device, {
      x: morph * (mobile ? 0 : 40),
      y: morph * 20,
      scale: 0.88 + (1 - morph) * 0.12,
      rotateY: morph * (mobile ? 0 : -8),
    });
    setOpacity(device, 0.75 + (1 - morph) * 0.25);
  }

  const chapters = root.querySelectorAll<HTMLElement>("[data-ip-chapter]");
  chapters.forEach((chapter, i) => {
    const start = 0.18 + i * 0.08;
    const end = start + 0.14;
    const c = chapterLocal(local, start, end);
    const enter = easeOutCubic(Math.min(c / 0.4, 1));
    const exit = c > 0.75 ? easeInOutCubic((c - 0.75) / 0.25) : 0;
    setTransform(chapter, {
      y: (1 - enter) * 28 * yMul + exit * -12,
    });
    // Keep case-study copy readable — never ghost portfolio details.
    setOpacity(chapter, Math.max(0.88, enter * (1 - exit * 0.12)));
  });

  const arch = root.querySelector<HTMLElement>("[data-ip-arch]");
  if (arch) {
    const a = chapterLocal(local, 0.52, 0.68);
    setOpacity(arch, Math.max(0.85, a));
    setTransform(arch, { y: (1 - easeOutCubic(a)) * 20 });
    arch.querySelectorAll<SVGLineElement>("[data-ip-edge]").forEach((edge, i) => {
      const len = Number(edge.getAttribute("stroke-dasharray") ?? 100);
      const e = chapterLocal(a, i * 0.12, 0.45 + i * 0.12);
      edge.style.strokeDashoffset = String(len * (1 - easeOutCubic(e)));
    });
    arch.querySelectorAll<SVGGElement>("[data-ip-node]").forEach((node, i) => {
      const n = chapterLocal(a, 0.05 + i * 0.08, 0.5 + i * 0.08);
      node.style.opacity = String(0.55 + easeOutCubic(n) * 0.45);
    });
  }

  root.querySelectorAll<HTMLElement>("[data-ip-stack-node]").forEach((node, i) => {
    const start = 0.6 + i * 0.035;
    const s = chapterLocal(local, start, start + 0.1);
    const enter = easeOutCubic(s);
    setTransform(node, { y: (1 - enter) * 16, scale: 0.98 + enter * 0.02 });
    setOpacity(node, 0.85 + enter * 0.15);
  });

  const impact = root.querySelector<HTMLElement>("[data-ip-impact]");
  if (impact) {
    const m = chapterLocal(local, 0.78, 0.95);
    setOpacity(impact, Math.max(0.88, m));
    setTransform(impact, { y: (1 - easeOutCubic(m)) * 18 });
    if (shouldUpdateMetric(frame, 2)) {
      impact.querySelectorAll<HTMLElement>("[data-metric-value]").forEach((el) => {
        writeMetric(el, m);
      });
    }
  }
}

function writeMetric(metric: HTMLElement, local: number): void {
  const target = Number(metric.dataset.metricTarget ?? 0);
  const suffix = metric.dataset.metricSuffix ?? "";
  const prefix = metric.dataset.metricPrefix ?? "";
  const isFloat = metric.dataset.metricFloat === "true";
  const current = target * Math.min(Math.max((local - 0.1) / 0.7, 0), 1);
  metric.textContent = isFloat
    ? `${prefix}${current.toFixed(1)}${suffix}`
    : `${prefix}${Math.round(current)}${suffix}`;
}
