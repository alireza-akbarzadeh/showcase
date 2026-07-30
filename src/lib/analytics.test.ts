import { afterEach, describe, expect, it, vi } from "vitest";
import { resetAnalyticsSession, trackActEnter } from "@/lib/analytics";

describe("analytics", () => {
  afterEach(() => {
    resetAnalyticsSession();
  });

  it("fires act_enter once per act", () => {
    const events: string[] = [];
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as { name: string };
      events.push(detail.name);
    };
    window.addEventListener("showcase:analytics", handler);
    trackActEnter("introduction");
    trackActEnter("introduction");
    trackActEnter("craft");
    window.removeEventListener("showcase:analytics", handler);
    expect(events).toEqual(["act_enter", "act_enter"]);
  });
});
