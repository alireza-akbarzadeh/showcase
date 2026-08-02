export type ProjectChapterId =
  | "hook"
  | "problem"
  | "approach"
  | "architecture"
  | "stack"
  | "impact";

export interface ProjectMetric {
  readonly label: string;
  readonly display: string;
  readonly target: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly float?: boolean;
  readonly divisor?: number;
}

export interface ProjectChapter {
  readonly id: ProjectChapterId;
  readonly label: string;
  readonly title: string;
  readonly body: string;
}

export interface ProjectStackNode {
  readonly id: string;
  readonly label: string;
  readonly layer: "edge" | "app" | "data" | "infra";
}

export interface ProjectArchEdge {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
}

export interface ProjectCaseStudy {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly problem: string;
  readonly approach: string;
  /** One-line outcome for the sticky stage summary. */
  readonly outcome: string;
  readonly year: string;
  readonly links: {
    readonly live?: string;
    readonly repo?: string;
    readonly caseStudy?: string;
  };
  readonly metrics: readonly ProjectMetric[];
  readonly chapters: readonly ProjectChapter[];
  readonly stack: readonly ProjectStackNode[];
  readonly architecture: {
    readonly nodes: readonly { id: string; label: string; x: number; y: number }[];
    readonly edges: readonly ProjectArchEdge[];
  };
  readonly immersive?: boolean;
}
