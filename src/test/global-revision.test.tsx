import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { claims, getClaim } from "@/content/claims";
import { proposed, proposedCopy } from "@/content/copy";
import { banners, footer, leadForm, nav } from "@/content/global";
import { home } from "@/content/home";
import { sales } from "@/content/sales";
import { marketing } from "@/content/marketing";
import { automation } from "@/content/automation";
import { techCloud } from "@/content/tech-cloud";
import { industries } from "@/content/industries";
import { contactPage } from "@/content/contact";
import { Claim } from "@/components/system/Claim";
import { CountUp } from "@/components/system/motion";

const allContent = {
  home,
  sales,
  marketing,
  automation,
  techCloud,
  industries,
  contactPage,
  banners,
  footer,
  leadForm,
  nav,
};

describe("Global revision rules", () => {
  it("uses Sales 360 in navigation, footer and the lead-form options", () => {
    expect(nav.find((item) => item.to === "/sales")?.label).toBe("Sales 360");
    expect(footer.platform[0]?.label).toBe("Sales 360");
    expect(leadForm.interests).toContain("Sales 360");
    expect(sales.hero.interest).toBe("Sales 360");
  });

  it("removes retired product names from customer-facing content", () => {
    const serialized = JSON.stringify(allContent);
    expect(serialized).not.toMatch(/AI Command Center|AI Commerce Center/i);
    expect(serialized.match(/Command Center/g) ?? []).toHaveLength(1);
    expect(serialized).toContain("the Sales 360 Command Center dashboard");
  });

  it("gives six pages their own closing banner and keeps Contact without one", () => {
    expect(Object.keys(banners)).toEqual([
      "/",
      "/sales",
      "/marketing",
      "/automation",
      "/tech-cloud",
      "/industries",
    ]);
    expect(new Set(Object.values(banners).map((banner) => banner.headline)).size).toBe(6);
    expect(banners["/contact"]).toBeUndefined();
    expect(JSON.stringify(banners)).not.toContain("scale your revenue in 30 days");
  });

  it("stores every sampled revision string with proposed status", () => {
    expect(proposed("Draft").status).toBe("proposed");
    const revisedStrings = [
      nav.find((item) => item.to === "/sales")?.label,
      leadForm.honeypot,
      ...Object.values(banners).flatMap((banner) => [
        banner.headline,
        banner.sub,
        banner.primary.label,
        banner.secondary?.label,
      ]),
    ].filter((text): text is string => typeof text === "string");
    for (const text of revisedStrings) {
      expect(proposedCopy.get(text)).toEqual({ text, status: "proposed" });
    }
  });

  it("registers every required claim and all pricing inclusions", () => {
    const requiredIds = [
      "years-experience",
      "growth-projects",
      "trusted-founders",
      "response-time",
      "pipeline-lift",
      "cloud-uptime",
      "paid-leads-lost",
      "whatsapp-open-rate",
      "faster-response",
      "close-rate",
      "admin-work",
      "revenue-in-30-days",
      "launch-timeline",
      "price-starter",
      "price-growth",
      "price-enterprise",
    ];
    expect(requiredIds.every((id) => claims.some((claim) => claim.id === id))).toBe(true);
    for (const tier of sales.pricing.tiers) {
      expect(getClaim(`price-${tier.id}`).text).toBe(tier.price);
      tier.features.forEach((feature, index) => {
        expect(getClaim(`pricing-${tier.id}-feature-${index + 1}`).text).toBe(feature);
      });
    }
    for (const stat of home.proof) {
      expect(getClaim(stat.claimId).text).toBe(stat.value);
    }
    for (const benefit of sales.benefits) {
      expect(getClaim(benefit.claimId).text).toBe(
        `${benefit.prefix}${benefit.number}${benefit.unit}`,
      );
    }
  });

  it("renders final statistic values in server HTML instead of zeroes", () => {
    expect(renderToString(<CountUp value="3.4X" />)).toContain("3.4X");
    expect(renderToString(<CountUp value="< 60 Sec" />)).toContain("60 Sec");
    expect(renderToString(<Claim id="cloud-uptime" countUp />)).toContain("99.9%");
  });
});
