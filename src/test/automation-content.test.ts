import { describe, expect, it } from "vitest";
import { automation } from "@/content/automation";

describe("Automation page rules", () => {
  it("selects AI Automation for the workflow CTA", () => {
    expect(automation.hero.interest).toBe("AI Automation");
  });

  it("provides all four anchored use cases", () => {
    expect(automation.nav.map((item) => item.id)).toEqual([
      "whatsapp",
      "email",
      "content",
      "lead-routing",
    ]);
    expect(automation.useCases.map((item) => item.id)).toEqual(["whatsapp", "email", "content"]);
    expect(automation.routing.id).toBe("lead-routing");
  });

  it("renders three capabilities for each detailed use case", () => {
    for (const useCase of automation.useCases) {
      expect(useCase.capabilities).toHaveLength(3);
      for (const capability of useCase.capabilities) {
        expect(capability.lead.length).toBeGreaterThan(0);
        expect(capability.text.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the routing alert below the five-second limit", () => {
    expect(automation.routingUi.assignment.alert).toBe("WhatsApp alert · 3s");
    expect(automation.routing.cards[1]?.body).toContain("under 5 seconds");
  });
});
