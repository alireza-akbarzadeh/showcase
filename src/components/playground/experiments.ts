export type ExperimentId = "wave-field" | "sort-scrub";

export type FpsCost = "low" | "med" | "high";

export interface ExperimentMeta {
  readonly id: ExperimentId;
  readonly title: string;
  readonly blurb: string;
  readonly fpsCost: FpsCost;
  readonly tags: readonly string[];
}

export const EXPERIMENTS: readonly ExperimentMeta[] = [
  {
    id: "wave-field",
    title: "Wave Field",
    blurb: "Seeded generative ripples — Canvas2D, one RAF, exportable frame.",
    fpsCost: "low",
    tags: ["generative", "canvas2d"],
  },
  {
    id: "sort-scrub",
    title: "Sort Scrub",
    blurb: "Insertion sort as a scrubbable timeline — algorithms as craft.",
    fpsCost: "low",
    tags: ["algorithms", "interaction"],
  },
] as const;

export const FPS_COST_LABEL: Record<FpsCost, string> = {
  low: "~2ms",
  med: "~6ms",
  high: "~12ms+",
};
