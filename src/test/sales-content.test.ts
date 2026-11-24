import { describe, expect, it } from "vitest";
import { sales } from "@/content/sales";

describe("Sales page rules", () => {
  it("keeps the three pricing points exact and explicitly unapproved", () => {
    expect(sales.pricing.status).toBe("unapproved");
    expect(sales.pricing.tiers.map((tier) => tier.price)).toEqual([
      "₹14,999",
      "₹29,999",
      "Custom Pricing",
    ]);
  });

  it("opens every product CTA with Sales 360 selected", () => {
    expect(sales.hero.interest).toBe("Sales 360");
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

  it("orders all eight Revenue Loop stages across the customer lifecycle", () => {
    expect(sales.revenueLoop.stages.map((stage) => stage.id)).toEqual([
      "branding",
      "marketing",
      "lead-generation",
      "sales",
      "customer-relationships",
      "retention",
      "lifetime-value",
      "revenue-growth",
    ]);
  });

  it("maps all eight capability chips to their revenue stages", () => {
    expect(sales.revenueLoop.capabilities).toHaveLength(8);
    expect(sales.revenueLoop.capabilities[0]?.stageIds).toEqual(["lead-generation"]);
    expect(sales.revenueLoop.capabilities[3]?.stageIds).toEqual(["lead-generation", "sales"]);
    expect(sales.revenueLoop.capabilities[4]?.stageIds).toEqual(["sales", "retention"]);
    expect(sales.revenueLoop.capabilities[7]?.stageIds).toEqual(["revenue-growth"]);
  });

  it("keeps three differentiators and all six original capabilities", () => {
    expect(sales.differentiators).toHaveLength(3);
    expect(sales.features.items.map((feature) => feature.id)).toEqual([
      "inbox",
      "qualification",
      "quotation",
      "radar",
      "voice",
      "dashboard",
    ]);
  });

  it("links every revenue moment to its assigned Loop stage", () => {
    expect(sales.useCases.items.map((item) => item.loopStages)).toEqual([
      ["lead-generation", "sales"],
      ["sales"],
      ["retention"],
      ["lifetime-value"],
    ]);
  });
});
