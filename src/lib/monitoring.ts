import type * as SentryReact from "@sentry/react";

type SentryModule = typeof SentryReact;

let sentryPromise: Promise<SentryModule | null> | null = null;

function sentryDsn(): string | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env.NEXT_PUBLIC_SENTRY_DSN;
}

function loadSentry(): Promise<SentryModule | null> {
  const dsn = sentryDsn();
  if (!dsn) return Promise.resolve(null);
  if (typeof window === "undefined") return Promise.resolve(null);

  if (!sentryPromise) {
    sentryPromise = import("@sentry/react")
      .then((Sentry) => {
        Sentry.init({
          dsn,
          environment: process.env.NODE_ENV,
          tracesSampleRate: 0.05,
          sendDefaultPii: false,
        });
        return Sentry;
      })
      .catch(() => null);
  }

  return sentryPromise;
}

/**
 * Optional error monitoring — no-ops without NEXT_PUBLIC_SENTRY_DSN.
 */
export function initMonitoring(): void {
  void loadSentry();
}

export function reportError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("showcase:error", {
      detail: { error, context },
    }),
  );

  void loadSentry().then((Sentry) => {
    if (!Sentry) return;
    Sentry.captureException(error, { extra: context });
  });
}

/** Test helper — clears the lazy Sentry promise between cases. */
export function resetMonitoring(): void {
  sentryPromise = null;
}
