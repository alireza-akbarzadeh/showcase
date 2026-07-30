import { describe, expect, it } from "vitest";
import {
  contactFieldsSchema,
  contactFormSchema,
  fieldErrorsFromZod,
} from "@/lib/contact/schema";

describe("contactFieldsSchema", () => {
  it("accepts a valid payload", () => {
    const result = contactFieldsSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "Let's build something alive together.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages and bad emails", () => {
    const result = contactFieldsSchema.safeParse({
      name: "A",
      email: "not-an-email",
      message: "Hi",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = fieldErrorsFromZod(result.error);
      expect(errors.name).toBeTruthy();
      expect(errors.email).toBeTruthy();
      expect(errors.message).toBeTruthy();
    }
  });
});

describe("contactFormSchema", () => {
  it("defaults empty honeypot", () => {
    const result = contactFormSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Interested in a creative engineering collaboration.",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("");
    }
  });

  it("allows honeypot string for server-side discard", () => {
    const result = contactFormSchema.safeParse({
      name: "Bot",
      email: "bot@spam.test",
      message: "Buy followers now please!!!",
      website: "https://spam.test",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("https://spam.test");
    }
  });
});
