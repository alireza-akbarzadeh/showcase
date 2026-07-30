import { afterEach, describe, expect, it, vi } from "vitest";
import { reportError, resetMonitoring } from "@/lib/monitoring";

describe("monitoring", () => {
  afterEach(() => {
    resetMonitoring();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("emits showcase:error without a DSN", () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
    const target = new EventTarget();
    vi.stubGlobal("window", {
      dispatchEvent: (event: Event) => target.dispatchEvent(event),
      addEventListener: (...args: Parameters<EventTarget["addEventListener"]>) =>
        target.addEventListener(...args),
      removeEventListener: (
        ...args: Parameters<EventTarget["removeEventListener"]>
      ) => target.removeEventListener(...args),
    });

    const handler = vi.fn();
    window.addEventListener("showcase:error", handler);
    const err = new Error("boom");
    reportError(err, { boundary: "canvas" });
    window.removeEventListener("showcase:error", handler);

    expect(handler).toHaveBeenCalledTimes(1);
    const detail = (handler.mock.calls[0]![0] as CustomEvent).detail as {
      error: Error;
      context?: Record<string, unknown>;
    };
    expect(detail.error).toBe(err);
    expect(detail.context?.boundary).toBe("canvas");
  });
});
