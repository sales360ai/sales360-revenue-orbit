import { describe, expect, it } from "vitest";
import { industries } from "@/content/industries";

describe("Industries page rules", () => {
  it("selects Full Ecosystem for the e-commerce CTA", () => {
    expect(industries.flagship.interest).toBe("Full Ecosystem");
  });

  it("provides all six deep-link destinations", () => {
    expect(industries.nav.map((item) => item.id)).toEqual([
      "e-commerce",
      "healthcare",
      "real-estate",
      "manufacturing",
      "b2b-services",
      "education",
    ]);
  });

  it("provides four e-commerce use cases and five other vertical cards", () => {
    expect(industries.flagship.useCases).toHaveLength(4);
    expect(industries.grid.cards).toHaveLength(5);
  });

  it("keeps every grid card connected to its matching deep link", () => {
    const navIds = new Set(industries.nav.map((item) => item.id));
    for (const card of industries.grid.cards) expect(navIds.has(card.id)).toBe(true);
  });
});
