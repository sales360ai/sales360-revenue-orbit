import { describe, expect, it } from "vitest";
import { industries } from "@/content/industries";

describe("Industries page rules", () => {
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

  it("provides three features and three use cases for every industry", () => {
    expect(industries.solutions).toHaveLength(6);
    for (const industry of industries.solutions) {
      expect(industry.features).toHaveLength(3);
      expect(industry.useCases).toHaveLength(3);
      expect(industry.features.every((feature) => feature.description.length > 40)).toBe(true);
      expect(industry.useCases.every((useCase) => useCase.description.length > 40)).toBe(true);
    }
  });

  it("keeps every solution connected to its matching deep link", () => {
    const navIds = new Set(industries.nav.map((item) => item.id));
    for (const industry of industries.solutions) expect(navIds.has(industry.id)).toBe(true);
  });

  it("shows features before use cases", () => {
    expect(industries.featuresLabel).toBe("Features");
    expect(industries.useCasesLabel).toBe("Use Cases");
  });
});
