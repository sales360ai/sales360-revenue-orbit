import { describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { automation } from "@/content/automation";
import { industries } from "@/content/industries";
import { marketing } from "@/content/marketing";
import { sales } from "@/content/sales";
import { techCloud } from "@/content/tech-cloud";

describe("Home page refinement", () => {
  it("provides an overview and three concrete solutions for every industry tab", () => {
    expect(home.industries.items).toHaveLength(6);
    for (const industry of home.industries.items) {
      expect(industry.overview.length).toBeGreaterThan(80);
      expect(industry.points).toHaveLength(3);
    }
  });

  it("uses the founder's requested honorific", () => {
    expect(home.founder.name).toBe("Mr. Viswa Korapala");
  });

  it("does not end page or section headlines with a full stop", () => {
    const headlines = [
      home.hero.line2,
      home.pillars.headline,
      home.difference.headline,
      home.founder.headline,
      sales.hero.accent,
      sales.features.headline,
      marketing.hero.titleLead,
      marketing.hero.accent,
      ...marketing.channels.map((channel) => channel.headline),
      automation.hero.titleLead,
      automation.hero.accent,
      ...automation.useCases.map((useCase) => useCase.headline),
      techCloud.hero.accent,
      techCloud.hosting.headline,
      techCloud.security.headline,
      techCloud.support.headline,
      industries.hero.accent,
      industries.solutionsHeading,
    ];
    expect(headlines.every((headline) => !headline.endsWith("."))).toBe(true);
  });
});
