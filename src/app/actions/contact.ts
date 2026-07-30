"use server";

import { headers } from "next/headers";
import {
  contactFormSchema,
  fieldErrorsFromZod,
  type ContactFieldErrors,
} from "@/lib/contact/schema";

export type ContactActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };

/** Simple in-memory rate limit (per server instance). */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function clientKey(headerList: Headers): string {
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "anonymous"
  );
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

/**
 * Contact intake — honeypot + rate limit.
 * Swap the console path for email/CRM when credentials exist.
 */
export async function submitContact(
  input: unknown,
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  // Honeypot tripped — fake success, do not process.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const headerList = await headers();
  const key = clientKey(headerList);
  if (rateLimited(key)) {
    return {
      ok: false,
      error: "Too many messages. Try again in a minute, or email me directly.",
    };
  }

  const { name, email, message } = parsed.data;

  // Production hook: send via Resend / SES / etc.
  console.warn("[contact]", {
    name,
    email,
    messageLength: message.length,
    at: new Date().toISOString(),
  });

  return { ok: true };
}
