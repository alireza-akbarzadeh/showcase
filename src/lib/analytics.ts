type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

const firedActs = new Set<string>();

function plausibleDomain(): string | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
}

/**
 * Privacy-first analytics — no-ops without NEXT_PUBLIC_PLAUSIBLE_DOMAIN.
 * Act enters fire once per session.
 */
export function trackEvent(
  name: string,
  props?: AnalyticsPayload,
): void {
  if (typeof window === "undefined") return;
  const domain = plausibleDomain();

  // Always emit a CustomEvent for local tooling / tests.
  window.dispatchEvent(
    new CustomEvent("showcase:analytics", { detail: { name, props } }),
  );

  if (!domain) return;

  const body = JSON.stringify({
    name,
    url: window.location.href,
    domain,
    props,
  });

  const endpoint = `https://plausible.io/api/event`;
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });
}

export function trackActEnter(actId: string): void {
  if (firedActs.has(actId)) return;
  firedActs.add(actId);
  trackEvent("act_enter", { act: actId });
}

export function resetAnalyticsSession(): void {
  firedActs.clear();
}
