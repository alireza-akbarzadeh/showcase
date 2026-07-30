"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
} from "react";
import { submitContact } from "@/app/actions/contact";
import { ThankYouBurst } from "@/components/creative/thank-you-burst";
import { Button } from "@/components/ui/button";
import { ensureGsap } from "@/engine/animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  contactFieldsSchema,
  contactFormSchema,
  fieldErrorsFromZod,
  type ContactFieldErrors,
  type ContactFieldName,
} from "@/lib/contact/schema";
import { SITE, SOCIALS } from "@/constants";
import { cn } from "@/utils/cn";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Act V contact ritual — progressive form + thank-you beat.
 * Works without motion polish; GSAP enhances reveal/send.
 */
export function ContactForm() {
  const formId = useId();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);
  const submitting = useRef(false);

  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (revealed.current || reduced) return;
    const root = rootRef.current;
    if (!root) return;
    revealed.current = true;

    const gsap = ensureGsap();
    const targets = root.querySelectorAll("[data-contact-reveal]");
    gsap.fromTo(
      targets,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, [reduced]);

  useEffect(() => {
    if (status !== "sent" || reduced) return;
    const panel = thankYouRef.current;
    if (!panel) return;
    const gsap = ensureGsap();
    const tl = gsap.timeline();
    tl.fromTo(
      panel,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
    );
    const mark = panel.querySelector("[data-thank-mark]");
    if (mark) {
      tl.fromTo(
        mark,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.55,
          ease: "power3.out",
          transformOrigin: "left center",
        },
        "-=0.35",
      );
    }
    return () => {
      tl.kill();
    };
  }, [status, reduced]);

  const validateField = useCallback(
    (name: ContactFieldName, value: string) => {
      const shape = contactFieldsSchema.shape[name];
      const result = shape.safeParse(value);
      setErrors((prev) => {
        const next = { ...prev };
        if (result.success) delete next[name];
        else next[name] = result.error.issues[0]?.message ?? "Invalid";
        return next;
      });
    },
    [],
  );

  const onBlurField = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = event.currentTarget.name as ContactFieldName;
      if (name !== "name" && name !== "email" && name !== "message") return;
      validateField(name, event.currentTarget.value);
    },
    [validateField],
  );

  const playSendPulse = useCallback(() => {
    if (reduced) return;
    const btn = submitRef.current;
    if (!btn) return;
    const gsap = ensureGsap();
    gsap.fromTo(
      btn,
      { scale: 1 },
      {
        scale: 1.04,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
    );
  }, [reduced]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || status === "sending" || status === "sent") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrorsFromZod(parsed.error));
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setFormError(null);
    submitting.current = true;
    setStatus("sending");
    playSendPulse();

    try {
      const result = await submitContact(parsed.data);
      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.error);
        setStatus("error");
        submitting.current = false;
        return;
      }

      setStatus("sent");
    } catch {
      setFormError("Something went wrong. Email me directly instead.");
      setStatus("error");
      submitting.current = false;
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={thankYouRef}
        className="relative max-w-lg"
        role="status"
        aria-live="polite"
      >
        <ThankYouBurst active />
        <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          Sent
        </p>
        <h3 className="font-display mt-4 text-4xl tracking-[-0.03em] md:text-5xl">
          Journey complete.
        </h3>
        <div
          data-thank-mark
          className="mt-6 h-px w-24 origin-left bg-[var(--accent)]"
          aria-hidden="true"
        />
        <p className="mt-6 text-lg text-[var(--muted)]">
          Thanks — I&apos;ll reply soon. Press{" "}
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-xs">
            1
          </kbd>{" "}
          to return to the start, or{" "}
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-xs">
            G
          </kbd>{" "}
          later for the playground.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {SITE.email}
          </a>
          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Book a call
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="grid w-full max-w-4xl gap-12 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
        noValidate
      >
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <Field
            id={`${formId}-name`}
            name="name"
            label="Name"
            error={errors.name}
            autoComplete="name"
            onBlur={onBlurField}
          />
        </div>
        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <Field
            id={`${formId}-email`}
            name="email"
            label="Email"
            type="email"
            error={errors.email}
            autoComplete="email"
            onBlur={onBlurField}
          />
        </div>
        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <Field
            id={`${formId}-message`}
            name="message"
            label="Message"
            as="textarea"
            error={errors.message}
            onBlur={onBlurField}
          />
        </div>

        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(
            "flex flex-wrap items-center gap-4",
            !reduced && "opacity-0",
          )}
        >
          <Button
            ref={submitRef}
            type="submit"
            disabled={status === "sending"}
            className="w-fit will-change-transform"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </Button>
          {formError ? (
            <p className="text-sm text-red-400" role="alert">
              {formError}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="flex flex-col gap-8">
        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <AvailabilityBadge />
          <EmailLockup email={SITE.email} copied={copied} onCopy={copyEmail} />
        </div>

        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <p className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted)] uppercase">
            Elsewhere
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {SOCIALS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-3 text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase opacity-70 group-hover:opacity-100">
                    {social.id}
                  </span>
                  <span className="text-lg">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-contact-reveal={reduced ? undefined : true}
          className={cn(!reduced && "opacity-0")}
        >
          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--border)] px-4 py-3 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Book a call
            <span aria-hidden="true" className="text-[var(--accent)]">
              →
            </span>
          </a>
          <p className="mt-3 max-w-[20rem] text-sm text-[var(--muted)]">
            Prefer a live conversation? Grab a slot — no embed until you ask.
          </p>
        </div>
      </aside>
    </div>
  );
}

function AvailabilityBadge() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase">
      <span
        className="relative flex h-1.5 w-1.5"
        aria-hidden="true"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-40" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      {SITE.availability}
    </p>
  );
}

function EmailLockup({
  email,
  copied,
  onCopy,
}: {
  email: string;
  copied: boolean;
  onCopy: () => void;
}) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(email);
  const animating = useRef(false);

  const scramble = useCallback(() => {
    if (reduced || animating.current) return;
    animating.current = true;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@._";
    let frame = 0;
    const total = 14;
    const id = window.setInterval(() => {
      frame += 1;
      if (frame >= total) {
        window.clearInterval(id);
        setDisplay(email);
        animating.current = false;
        return;
      }
      setDisplay(
        email
          .split("")
          .map((ch, i) => {
            if (i / email.length < frame / total) return ch;
            return glyphs[Math.floor(Math.random() * glyphs.length)] ?? ch;
          })
          .join(""),
      );
    }, 28);
  }, [email, reduced]);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={onCopy}
        onMouseEnter={scramble}
        onFocus={scramble}
        className="text-left font-display text-2xl tracking-[-0.02em] text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:text-3xl"
        aria-label={`Copy email ${email}`}
      >
        {display}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {copied ? "Copied." : "Click to copy"}
      </p>
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
  onBlur,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const className = cn(
    "mt-2 w-full border border-[var(--border)] bg-transparent px-4 py-3 text-[var(--foreground)] transition-[border-color] duration-200",
    "placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none",
    error && "border-red-400/70",
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
          onBlur={onBlur}
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
          onBlur={onBlur}
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
