import { describe, expect, it, afterEach } from "vitest";
import {
  getPointerState,
  retainPointerTracking,
} from "@/engine/observers/pointer";

describe("pointer tracking", () => {
  afterEach(() => {
    // Drain any retained listeners from tests
    const release = retainPointerTracking();
    release();
  });

  it("starts at origin", () => {
    const state = getPointerState();
    expect(state.x).toBe(0);
    expect(state.y).toBe(0);
    expect(state.active).toBe(false);
  });

  it("retain/release is ref-counted without throwing", () => {
    const a = retainPointerTracking();
    const b = retainPointerTracking();
    a();
    b();
    expect(getPointerState().active).toBe(false);
  });
});
