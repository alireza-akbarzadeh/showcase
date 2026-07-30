export interface ProofMetric {
  readonly id: string;
  readonly label: string;
  /** Scrub target when numeric; 0 keeps static `display`. */
  readonly target: number;
  readonly display: string;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly note?: string;
}

export interface ProofComparison {
  readonly id: string;
  readonly projectId: string;
  readonly label: string;
  readonly beforeLabel: string;
  readonly afterLabel: string;
  readonly beforeValue: string;
  readonly afterValue: string;
  readonly detail: string;
}

export interface ProofEvidence {
  readonly projectId: string;
  readonly title: string;
  readonly summary: string;
  readonly metrics: readonly ProofMetric[];
  readonly comparisons: readonly ProofComparison[];
  readonly links?: readonly { label: string; href: string }[];
}

export interface ProofStripContent {
  readonly headline: string;
  readonly support: string;
  readonly siteMetrics: readonly ProofMetric[];
  readonly evidence: readonly ProofEvidence[];
  readonly closing: string;
}
