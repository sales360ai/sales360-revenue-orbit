import { describe, expect, it } from "vitest";
import { sales } from "@/content/sales";

describe("Sales page rules", () => {
  it("keeps the three pricing points exact", () => {
    expect(sales.pricing.tiers.map((tier) => tier.price)).toEqual([
      "₹14,999",
      "₹29,999",
      "Custom Pricing",
    ]);
  });

  it("opens every product CTA with AI Command Center selected", () => {
    expect(sales.hero.interest).toBe("AI Command Center");
    expect(sales.pricing.tiers).toHaveLength(3);
  });

  it("provides the four required scenario hashes", () => {
    expect(sales.useCases.items.map((item) => item.id)).toEqual([
      "ad-to-whatsapp",
      "cart-recovery",
      "reactivation",
      "upsell",
    ]);
  });
});
