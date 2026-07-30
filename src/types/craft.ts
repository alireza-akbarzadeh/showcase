export interface SkillNode {
  readonly id: string;
  readonly label: string;
  readonly clusterId: string;
  readonly how: string;
  /** Prebaked graph position 0–1 inside viewBox. */
  readonly x: number;
  readonly y: number;
}

export interface SkillEdge {
  readonly from: string;
  readonly to: string;
}

export interface SkillCluster {
  readonly id: string;
  readonly label: string;
  readonly skills: readonly string[];
  readonly focus: string;
}

export interface StackLayer {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

export interface CareerStop {
  readonly id: string;
  readonly year: string;
  readonly role: string;
  readonly place: string;
  readonly achievement: string;
  readonly lesson: string;
}

export interface AboutChapter {
  readonly year: string;
  readonly title: string;
  readonly body: string;
}
