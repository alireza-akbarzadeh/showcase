import { describe, expect, it } from "vitest";
import {
  CAREER_JOURNEY,
  SKILL_CLUSTERS,
  SKILL_EDGES,
  SKILL_NODES,
  TECH_STACK_LAYERS,
} from "@/constants";

describe("craft content", () => {
  it("has four skill clusters with focus copy", () => {
    expect(SKILL_CLUSTERS).toHaveLength(4);
    for (const cluster of SKILL_CLUSTERS) {
      expect(cluster.focus.length).toBeGreaterThan(0);
      expect(cluster.skills.length).toBeGreaterThan(0);
    }
  });

  it("prebakes a connected knowledge graph", () => {
    expect(SKILL_NODES.length).toBeGreaterThanOrEqual(10);
    expect(SKILL_EDGES.length).toBeGreaterThanOrEqual(8);
    const ids = new Set(SKILL_NODES.map((n) => n.id));
    for (const edge of SKILL_EDGES) {
      expect(ids.has(edge.from)).toBe(true);
      expect(ids.has(edge.to)).toBe(true);
    }
  });

  it("defines stack layers and career stops", () => {
    expect(TECH_STACK_LAYERS).toHaveLength(4);
    expect(CAREER_JOURNEY.length).toBeGreaterThanOrEqual(3);
  });
});
