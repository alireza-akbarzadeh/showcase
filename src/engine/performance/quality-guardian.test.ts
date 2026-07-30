import { afterEach, describe, expect, it } from "vitest";
import {
  QualityGuardian,
  resetQualityGuardian,
} from "@/engine/performance/quality-guardian";
import { PERFORMANCE } from "@/constants";

afterEach(() => {
  resetQualityGuardian();
});

describe("QualityGuardian", () => {
  it("starts on high with post-fx and particles", () => {
    const g = new QualityGuardian();
    expect(g.getTier()).toBe("high");
    expect(g.getFlags().postFx).toBe(true);
    expect(g.getFlags().particles).toBe(true);
  });

  it("drops to medium after sustained low FPS", () => {
    const g = new QualityGuardian();
    const steps = Math.ceil(PERFORMANCE.qualityDegradeMs / 16) + 2;
    for (let i = 0; i < steps; i += 1) {
      g.sample(40, 16);
    }
    expect(g.getTier()).toBe("medium");
    expect(g.getFlags().postFx).toBe(false);
    expect(g.getFlags().dprMax).toBeLessThanOrEqual(1.5);
  });

  it("drops to low after sustained critical FPS", () => {
    const g = new QualityGuardian();
    const steps = Math.ceil(PERFORMANCE.qualityDegradeMs / 16) + 2;
    for (let i = 0; i < steps; i += 1) {
      g.sample(25, 16);
    }
    expect(g.getTier()).toBe("low");
    expect(g.getFlags().particles).toBe(false);
    expect(g.getFlags().simplifyShaders).toBe(true);
  });

  it("notifies listeners only on tier change", () => {
    const g = new QualityGuardian();
    const seen: string[] = [];
    g.subscribe((flags) => seen.push(flags.tier));
    g.setTier("medium");
    g.setTier("medium");
    g.setTier("low");
    expect(seen).toEqual(["high", "medium", "low"]);
  });
});
