import { describe, expect, it } from "vitest";
import { marketing } from "@/content/marketing";

describe("Marketing page rules", () => {
  it("provides seven channels with exactly four deliverables each", () => {
    expect(marketing.channels).toHaveLength(7);
    for (const channel of marketing.channels) expect(channel.deliverables).toHaveLength(4);
  });

  it("uses the required channel hashes", () => {
    expect(marketing.channels.map((channel) => channel.id)).toEqual([
      "google-meta-ads",
      "seo-aeo",
      "social-media",
      "whatsapp",
      "email",
      "telecalling",
      "video",
    ]);
  });

  it("selects Growth Marketing for the audit CTA", () => {
    expect(marketing.hero.interest).toBe("Growth Marketing");
  });
});
