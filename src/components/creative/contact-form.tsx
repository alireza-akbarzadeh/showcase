"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import { z } from "zod";
import { ensureGsap } from "@/engine/animation";
import { Button } from "@/components/ui/button";
import { SITE, SOCIALS } from "@/constants";
import { cn } from "@/utils/cn";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Tell me a bit more"),
  website: z.string().max(0).optional(), // honeypot
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const formId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      website: data.get("website") || "",
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    if (parsed.data.website) {
      // Honeypot filled — pretend success.
      setStatus("sent");
      return;
    }

    setErrors({});
    setStatus("sending");

    // Client demo path — swap for server action later.
    await new Promise((r) => setTimeout(r, 700));

    const gsap = ensureGsap();
    const panel = form.querySelector("[data-thank-you]");
    if (panel) {
      gsap.fromTo(
        panel,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
      );
    }

    setStatus("sent");
    form.reset();
  };

  if (status === "sent") {
    return (
      <div
        data-thank-you
        className="max-w-lg"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
          Sent
        </p>
        <h3 className="font-display mt-4 text-4xl tracking-[-0.03em]">
          Journey complete.
        </h3>
        <p className="mt-4 text-[var(--muted)]">
          Thanks — I&apos;ll reply soon. Press{" "}
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-xs">
            1
          </kbd>{" "}
          to return to the start.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-3xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
        noValidate
      >
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Field
          id={`${formId}-name`}
          name="name"
          label="Name"
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id={`${formId}-email`}
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id={`${formId}-message`}
          name="message"
          label="Message"
          as="textarea"
          error={errors.message}
        />

        <Button type="submit" disabled={status === "sending"} className="w-fit">
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-red-400" role="alert">
            Something went wrong. Email me directly instead.
          </p>
        ) : null}
      </form>

      <aside className="flex flex-col gap-6">
        <div>
          <p className="text-sm text-[var(--muted)]">{SITE.availability}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 text-left text-lg text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {SITE.email}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email copied" : ""}
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {SOCIALS.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] transition-opacity hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  as = "input",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const className = cn(
    "mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)]",
    "placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none",
  );

  return (
    <div>
      <label htmlFor={id} className="text-sm text-[var(--muted)]">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          className={className}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          required
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={className}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          required
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
