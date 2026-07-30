import { afterEach, describe, expect, it, vi } from "vitest";
import { resetAnalyticsSession, trackActEnter } from "@/lib/analytics";

describe("analytics", () => {
  afterEach(() => {
    resetAnalyticsSession();
    vi.unstubAllGlobals();
  });

  it("fires act_enter once per act", () => {
    const events: string[] = [];
    const target = new EventTarget();
    vi.stubGlobal("window", {
      dispatchEvent: (event: Event) => target.dispatchEvent(event),
      addEventListener: (...args: Parameters<EventTarget["addEventListener"]>) =>
        target.addEventListener(...args),
      removeEventListener: (
        ...args: Parameters<EventTarget["removeEventListener"]>
      ) => target.removeEventListener(...args),
      location: { href: "http://localhost/" },
    });

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
