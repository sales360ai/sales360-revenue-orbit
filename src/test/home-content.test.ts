import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { home } from "@/content/home";
import { automation } from "@/content/automation";
import { getClaim } from "@/content/claims";
import { proposedCopy } from "@/content/copy";
import { industries } from "@/content/industries";
import { marketing } from "@/content/marketing";
import { sales } from "@/content/sales";
import { techCloud } from "@/content/tech-cloud";
import { SystemRail } from "@/components/home/SystemRail";

describe("Home page refinement", () => {
  it("connects capabilities in the required order with Tech & Cloud as the base", () => {
    expect(home.pillars.rail.nodes.map((node) => node.label)).toEqual([
      "Marketing",
      "AI Automation",
      "Sales & Revenue",
    ]);
    expect(home.pillars.rail.base).toBe("Tech & Cloud: secure infrastructure underneath");
    const html = renderToString(createElement(SystemRail, { active: "sales" }));
    expect(html.indexOf("Marketing")).toBeLessThan(html.indexOf("AI Automation"));
    expect(html.indexOf("AI Automation")).toBeLessThan(html.indexOf("Sales &amp; Revenue"));
    expect(html.indexOf("Sales &amp; Revenue")).toBeLessThan(
      html.indexOf("Tech &amp; Cloud: secure infrastructure underneath"),
    );
    expect(html).toContain('data-system-node="sales" data-active="true"');
  });

  it("gives Sales 360 the lead role and distinct roles to the other pillars", () => {
    expect(home.pillars.cards.map((card) => card.id)).toEqual([
      "sales",
      "marketing",
      "automation",
      "tech-cloud",
    ]);
    expect(home.pillars.cards.map((card) => card.role)).toEqual([
      "The revenue engine",
      "Creates demand",
      "Scales the work",
      "Keeps it running",
    ]);
    expect(home.pillars.cards[0]?.tone).toBe("orange");
  });

  it("provides a proposed buying line, three journey stages and a deep link for every industry", () => {
    expect(industries.solutions).toHaveLength(6);
    for (const industry of industries.solutions) {
      const snapshot = industries.homeSnapshots[industry.id];
      expect(snapshot.name.length).toBeGreaterThan(0);
      expect(snapshot.howTheyBuy.length).toBeGreaterThan(0);
      expect(snapshot.stages).toHaveLength(3);
      expect(snapshot.linkLabel).toBe(`See the ${snapshot.name} system`);
      for (const text of [
        snapshot.name,
        snapshot.howTheyBuy,
        ...snapshot.stages,
        snapshot.linkLabel,
      ]) {
        expect(proposedCopy.get(text)?.status).toBe("proposed");
      }
    }
    expect(industries.homeSnapshots["e-commerce"].stages).toEqual([
      "Discover",
      "Checkout",
      "Reorder",
    ]);
  });

  it("keeps founder credentials and founder counts explicitly unverified", () => {
    for (const id of ["founder-years", "growth-projects", "trusted-advisors", "trusted-founders"]) {
      expect(getClaim(id).status).toBe("unverified");
    }
  });

  it("uses the founder's requested honorific", () => {
    expect(home.founder.name).toBe("Mr. Viswa Korapala");
  });

  it("registers the new hero, pillar and testimonial copy as proposed", () => {
    const revised = [
      home.hero.sub,
      home.pillars.headline,
      home.pillars.sub,
      home.pillars.rail.accessibilityLabel,
      home.pillars.rail.base,
      ...home.pillars.rail.nodes.map((node) => node.label),
      ...home.pillars.cards.map((card) => card.role),
      home.industries.howTheyBuy,
      home.testimonialUi.heading,
      home.testimonialUi.previous,
      home.testimonialUi.next,
    ];
    for (const text of revised) expect(proposedCopy.get(text)?.status).toBe("proposed");
  });

  it("does not end existing page or section headlines with a full stop", () => {
    const headlines = [
      home.hero.line2,
      home.difference.headline,
      home.founder.headline,
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
    expect(home.pillars.headline).toBe("Four Capabilities. One Revenue System.");
  });
});
