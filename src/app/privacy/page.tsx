import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE.name} handles analytics and contact data.`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 md:px-12">
      <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--signal)] uppercase">
        Legal
      </p>
      <h1 className="font-display mt-4 text-4xl tracking-[-0.03em] md:text-5xl">
        Privacy
      </h1>
      <div className="mt-10 space-y-6 text-[var(--muted-foreground)]">
        <p>
          {SITE.name} is a portfolio. Contact submissions are used only to reply
          to your message. A honeypot and rate limit protect the form from bots.
        </p>
        <p>
          Analytics are optional and privacy-first. If configured (
          <code className="font-mono text-xs text-[var(--foreground)]">
            NEXT_PUBLIC_PLAUSIBLE_DOMAIN
          </code>
          ), page and act-enter events are sent to Plausible without cookies or
          personal identifiers. Without that env var, nothing is transmitted —
          events stay local as{" "}
          <code className="font-mono text-xs text-[var(--foreground)]">
            showcase:analytics
          </code>{" "}
          CustomEvents.
        </p>
        <p>
          Error monitoring is optional. If configured (
          <code className="font-mono text-xs text-[var(--foreground)]">
            NEXT_PUBLIC_SENTRY_DSN
          </code>
          ), unexpected render failures may be reported to Sentry without
          intentionally collecting personal data. Without that env var, errors
          stay in the console and as local{" "}
          <code className="font-mono text-xs text-[var(--foreground)]">
            showcase:error
          </code>{" "}
          CustomEvents.
        </p>
        <p>
          Preferences for sound and motion intensity are stored in your browser
          localStorage only.
        </p>
        <p>
          Questions:{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-[var(--signal)] underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
        </p>
      </div>
      <Link
        href="/"
        className="mt-12 inline-block font-mono text-xs tracking-[0.2em] text-[var(--signal)] uppercase underline-offset-4 hover:underline"
      >
        ← Back to the story
      </Link>
    </main>
  );
}
