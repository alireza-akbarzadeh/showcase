export type QualityTier = "high" | "medium" | "low";

export interface QualityFlags {
  readonly tier: QualityTier;
  /** Cap device pixel ratio. */
  readonly dprMax: number;
  readonly antialias: boolean;
  readonly postFx: boolean;
  readonly particles: boolean;
  readonly simplifyShaders: boolean;
}

export type QualityListener = (flags: QualityFlags) => void;
