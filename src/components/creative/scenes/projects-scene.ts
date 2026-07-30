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
    orbit: HTMLElement | null;
    panels: HTMLElement[];
  },
): SceneDefinition {
  const timeline = createTimeline({
    id: "projects",
    tracks: [
      {
        id: "headingY",
        keyframes: keyframes([0, 40], [0.12, 0, easeOutCubic]),
      },
      {
        id: "headingOpacity",
        keyframes: keyframes([0, 1], [0.18, 1], [0.28, 0.15]),
      },
    ],
  });

  let frameCounter = 0;

  return {
    id: "projects",
    range: { start: 0.42, end: 0.8, normalized: true },
    label: "Projects",
    onProgress: (ctx) => {
      frameCounter += 1;
      const values = timeline.setProgress(ctx.progress);
      const { heading, orbit, panels } = getElements();
      const mobile = ctx.scroll.breakpoint === "mobile";

      if (heading) {
        setTransform(heading, { y: values.get("headingY") ?? 0 });
        setOpacity(heading, values.get("headingOpacity") ?? 1);
      }

      if (orbit) {
        driveOrbit(orbit, ctx.progress, mobile, frameCounter);
      }

      // Secondary projects (Pulse / Lattice) — lighter enter
      const count = Math.max(panels.length, 1);
      panels.forEach((panel, i) => {
        const start = 0.72 + (i / count) * 0.12;
        const end = Math.min(start + 0.18, 1);
        const local = chapterLocal(ctx.progress, start, end);
        const enter = easeOutCubic(Math.min(local / 0.45, 1));
        setTransform(panel, {
          y: (1 - enter) * (mobile ? 28 : 48),
          scale: 0.97 + enter * 0.03,
        });
        setOpacity(panel, 0.25 + enter * 0.75);

        if (!shouldUpdateMetric(frameCounter, 3)) return;
        const metrics = panel.querySelectorAll<HTMLElement>("[data-metric-value]");
        metrics.forEach((metric) => writeMetric(metric, local));
      });
    },
    onDestroy: () => timeline.destroy(),
  };
}

function driveOrbit(
  root: HTMLElement,
  sectionProgress: number,
  mobile: boolean,
  frame: number,
): void {
  // Orbit occupies most of the projects range after the heading.
  const local = chapterLocal(sectionProgress, 0.08, 0.78);
  const morph = morphAmount(local);
  const yMul = mobile ? 0.55 : 1;

  const stage = root.querySelector<HTMLElement>("[data-orbit-stage]");
  const title = root.querySelector<HTMLElement>("[data-orbit-title]");
  const tagline = root.querySelector<HTMLElement>("[data-orbit-tagline]");
  const meta = root.querySelector<HTMLElement>("[data-orbit-meta]");
  const rule = root.querySelector<HTMLElement>("[data-orbit-rule]");
  const device = root.querySelector<HTMLElement>("[data-orbit-device]");

  if (stage) {
    // Peek → full: scale up from slight inset feel via scale only
    const scale = 0.92 + (1 - morph) * 0.08;
    setTransform(stage, {
      scale,
      y: morph * 24 * yMul,
    });
  }

  if (title) {
    setTransform(title, {
      y: morph * 18 * yMul,
      scale: 0.96 + (1 - morph) * 0.04,
    });
  }
  if (tagline) {
    setOpacity(tagline, 0.35 + (1 - morph) * 0.65);
    setTransform(tagline, { y: morph * 12 });
  }
  if (meta) {
    setOpacity(meta, 0.4 + (1 - morph) * 0.6);
  }
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
    setOpacity(device, 0.45 + (1 - morph) * 0.55);
  }

  // Chapters stagger through the middle of the runway
  const chapters = root.querySelectorAll<HTMLElement>("[data-orbit-chapter]");
  chapters.forEach((chapter, i) => {
    const start = 0.18 + i * 0.08;
    const end = start + 0.14;
    const c = chapterLocal(local, start, end);
    const enter = easeOutCubic(Math.min(c / 0.4, 1));
    const exit = c > 0.75 ? easeInOutCubic((c - 0.75) / 0.25) : 0;
    setTransform(chapter, {
      y: (1 - enter) * 36 * yMul + exit * -20,
    });
    setOpacity(chapter, Math.max(0.15, enter * (1 - exit * 0.35)));
  });

  // Architecture edges draw
  const arch = root.querySelector<HTMLElement>("[data-orbit-arch]");
  if (arch) {
    const a = chapterLocal(local, 0.52, 0.68);
    setOpacity(arch, Math.max(0.2, a));
    setTransform(arch, { y: (1 - easeOutCubic(a)) * 28 });
    const edges = arch.querySelectorAll<SVGLineElement>("[data-orbit-edge]");
    edges.forEach((edge, i) => {
      const len = Number(edge.getAttribute("stroke-dasharray") ?? 100);
      const e = chapterLocal(a, i * 0.12, 0.45 + i * 0.12);
      edge.style.strokeDashoffset = String(len * (1 - easeOutCubic(e)));
    });
    const nodes = arch.querySelectorAll<SVGGElement>("[data-orbit-node]");
    nodes.forEach((node, i) => {
      const n = chapterLocal(a, 0.05 + i * 0.08, 0.5 + i * 0.08);
      node.style.opacity = String(0.25 + easeOutCubic(n) * 0.75);
    });
  }

  // Stack lights up in order
  const stackNodes = root.querySelectorAll<HTMLElement>("[data-orbit-stack-node]");
  stackNodes.forEach((node, i) => {
    const start = 0.6 + i * 0.035;
    const s = chapterLocal(local, start, start + 0.1);
    const enter = easeOutCubic(s);
    setTransform(node, { y: (1 - enter) * 20, scale: 0.96 + enter * 0.04 });
    setOpacity(node, 0.2 + enter * 0.8);
  });

  // Impact metrics scrub
  const impact = root.querySelector<HTMLElement>("[data-orbit-impact]");
  if (impact) {
    const m = chapterLocal(local, 0.78, 0.95);
    setOpacity(impact, Math.max(0.2, m));
    setTransform(impact, { y: (1 - easeOutCubic(m)) * 24 });
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
