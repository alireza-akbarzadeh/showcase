import { describe, expect, it } from "vitest";
import { PROOF } from "@/constants";

describe("PROOF content", () => {
  it("includes Orbit evidence with comparisons and metrics", () => {
    expect(PROOF.siteMetrics.length).toBeGreaterThanOrEqual(3);
    const orbit = PROOF.evidence.find((e) => e.projectId === "orbit");
    expect(orbit).toBeTruthy();
    expect(orbit?.comparisons.length).toBeGreaterThanOrEqual(2);
    expect(orbit?.metrics.length).toBeGreaterThanOrEqual(2);
  });

  it("keeps site metric displays readable", () => {
    for (const metric of PROOF.siteMetrics) {
      expect(metric.display.length).toBeGreaterThan(0);
      expect(metric.label.length).toBeGreaterThan(0);
    }
  });
});
