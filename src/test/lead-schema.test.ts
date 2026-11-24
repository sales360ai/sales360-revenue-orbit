import { describe, expect, it } from "vitest";
import { leadSchema } from "@/lib/lead-schema";

const ok = {
  name: "Priya Sharma",
  email: "priya@acme.in",
  phone: "8050700300",
  interest: "Full Ecosystem" as const,
};

describe("lead form rules", () => {
  it("accepts the three required fields alone", () =>
    expect(leadSchema.safeParse(ok).success).toBe(true));
  it("requires full name", () =>
    expect(leadSchema.safeParse({ ...ok, name: "" }).success).toBe(false));
  it("requires a valid work email", () =>
    expect(leadSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false));
  it("requires phone / WhatsApp", () =>
    expect(leadSchema.safeParse({ ...ok, phone: "" }).success).toBe(false));
  it("rejects a filled honeypot", () =>
    expect(leadSchema.safeParse({ ...ok, website: "spam" }).success).toBe(false));
  it("accepts Sales 360 as the product interest", () =>
    expect(leadSchema.safeParse({ ...ok, interest: "Sales 360" }).success).toBe(true));
  it("rejects the retired product interest", () =>
    expect(leadSchema.safeParse({ ...ok, interest: "AI Command Center" }).success).toBe(false));
});
