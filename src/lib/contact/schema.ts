import { z } from "zod";

export const contactFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(120, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more")
    .max(5000, "Message is too long"),
});

/** Includes honeypot — bots filling `website` are silently accepted. */
export const contactFormSchema = contactFieldsSchema.extend({
  website: z.string().max(200).optional().default(""),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ContactFieldName = keyof ContactFields;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export function fieldErrorsFromZod(
  error: z.ZodError,
): ContactFieldErrors {
  const next: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key === "name" || key === "email" || key === "message") {
      if (!next[key]) next[key] = issue.message;
    }
  }
  return next;
}
