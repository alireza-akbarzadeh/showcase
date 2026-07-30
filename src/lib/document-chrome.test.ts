import { describe, expect, it } from "vitest";
import { titleForHash } from "@/lib/document-chrome";
import { SITE } from "@/constants";

describe("document chrome titles", () => {
  it("returns site title for empty hash", () => {
    expect(titleForHash("")).toBe(SITE.title);
  });

  it("titles projects by id", () => {
    expect(titleForHash("orbit")).toContain("Orbit");
  });

  it("titles scenes by id", () => {
    expect(titleForHash("contact")).toContain("Contact");
  });
});
