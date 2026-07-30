import { PERFORMANCE } from "@/constants";

export interface RendererConfig {
  readonly antialias: boolean;
  readonly alpha: boolean;
  readonly powerPreference: WebGLPowerPreference;
  readonly dpr: [number, number];
  readonly flat: boolean;
  readonly linear: boolean;
}

export function createRendererConfig(
  overrides: Partial<RendererConfig> = {},
): RendererConfig {
  return {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    dpr: [PERFORMANCE.dprMin, PERFORMANCE.dprMax],
    flat: true,
    linear: true,
    ...overrides,
  };
}
