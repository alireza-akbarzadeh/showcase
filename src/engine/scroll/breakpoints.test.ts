import { describe, expect, it } from "vitest";
import { getBreakpoint } from "@/engine/scroll/breakpoints";

describe("getBreakpoint", () => {
  it("maps widths to named breakpoints", () => {
    expect(getBreakpoint(320)).toBe("mobile");
    expect(getBreakpoint(768)).toBe("tablet");
    expect(getBreakpoint(1024)).toBe("desktop");
    expect(getBreakpoint(1440)).toBe("wide");
    expect(getBreakpoint(2000)).toBe("wide");
  });
});
