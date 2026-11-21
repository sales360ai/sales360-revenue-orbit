import { describe, expect, it } from "vitest";
import { contactPage } from "@/content/contact";

describe("Contact page rules", () => {
  it("uses the correct direct contact destinations", () => {
    expect(contactPage.hero.channels[0]?.href).toBe("mailto:info@sales360.ai");
    expect(contactPage.hero.channels[1]?.href).toBe("https://wa.me/918050700300");
    expect(contactPage.hero.channels[1]?.secondaryHref).toBe("tel:+918050700300");
  });

  it("selects Full Ecosystem for the contact form", () => {
    expect(contactPage.hero.interest).toBe("Full Ecosystem");
  });

  it("provides three next steps and four buyer questions", () => {
    expect(contactPage.next.steps).toHaveLength(3);
    expect(contactPage.faq.items).toHaveLength(4);
  });
});
