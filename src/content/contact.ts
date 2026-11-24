import { contact, type Interest } from "./global";
import { proposed } from "./copy";

export const contactPage = {
  meta: {
    title: "Contact Sales360.ai | Book Your Growth Strategy Call",
    description:
      "Book a 15-minute strategy session with Sales360.ai to review your sales, marketing, or cloud setup and find the fastest path to measurable ROI.",
  },
  hero: {
    eyebrow: "LET'S BUILD YOUR GROWTH ENGINE",
    titleLead: "Ready to",
    accent: "Turn More Leads Into Revenue?",
    sub: "Book a 15-minute strategy session with our team. We will review your current sales, marketing, or cloud setup and show you the fastest path to measurable ROI.",
    interest: "Full Ecosystem" as Interest,
    channels: [
      {
        id: "email",
        label: "Email Us:",
        value: contact.email,
        href: `mailto:${contact.email}`,
        copyValue: contact.email,
      },
      {
        id: "phone",
        label: "Call / WhatsApp:",
        value: contact.phone,
        href: contact.whatsapp,
        secondaryHref: contact.phoneHref,
        copyValue: contact.phone,
      },
      {
        id: "response",
        label: "Response Guarantee:",
        value: "Within 4 Business Hours",
      },
    ],
  },
  next: {
    title: "What Happens Next?",
    steps: [
      {
        number: "01",
        lead: "Rapid Review:",
        body: "Our specialists audit your current website, funnel, or infrastructure before our call.",
      },
      {
        number: "02",
        lead: "15-Min Strategy Call:",
        body: "Zero hard selling—just a clear walkthrough of bottlenecks and quick wins.",
      },
      {
        number: "03",
        lead: "Custom Action Roadmap:",
        body: "Receive a tailored implementation plan with transparent timelines and pricing.",
      },
    ],
  },
  faq: {
    title: "Quick FAQ",
    items: [
      {
        q: proposed("How quickly can we launch Sales 360?").text,
        a: "Most clients go live with unified lead capture and automated WhatsApp/email follow-ups within 7 to 14 days.",
      },
      {
        q: "Can we start with just one service (e.g., Marketing or Cloud) before adopting the full ecosystem?",
        a: "Yes. Every pillar—Sales AI, Marketing, Automation, and Tech & Cloud—can be deployed standalone or integrated together.",
      },
      {
        q: "Do you integrate with our existing CRM or e-commerce store?",
        a: "Yes. We connect seamlessly with WooCommerce, Shopify, HubSpot, Zoho, Salesforce, and custom APIs.",
      },
      {
        q: "Who will we work with during onboarding?",
        a: "You get a dedicated Sales360 strategy and technical onboarding specialist from day one.",
      },
    ],
  },
} as const;
