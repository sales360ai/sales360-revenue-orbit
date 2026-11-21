import { describe, expect, it } from "vitest";
import { techCloud } from "@/content/tech-cloud";

describe("Tech & Cloud page rules", () => {
  it("selects Tech & Cloud for the infrastructure audit CTA", () => {
    expect(techCloud.hero.interest).toBe("Tech & Cloud");
  });

  it("keeps the hosting promise at 99.9% uptime with daily off-site backups", () => {
    expect(techCloud.console.uptime).toBe("99.9%");
    expect(techCloud.hosting.specs[1]?.lead).toContain("99.9% Uptime SLA");
    expect(techCloud.hosting.specs[2]?.lead).toBe("Automated Daily Off-Site Backups");
  });

  it("provides four hosting specs and four protection cards", () => {
    expect(techCloud.hosting.specs).toHaveLength(4);
    expect(techCloud.security.cards).toHaveLength(4);
  });

  it("provides the complete three-card support matrix", () => {
    expect(techCloud.support.cards).toHaveLength(3);
    expect(techCloud.support.incident.steps.map((step) => step.label)).toEqual([
      "Alert",
      "Escalated",
      "Resolved",
    ]);
  });
});
