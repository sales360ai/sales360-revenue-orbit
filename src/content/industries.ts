import type { Interest } from "./global";

export type IndustryId =
  "e-commerce" | "healthcare" | "real-estate" | "manufacturing" | "b2b-services" | "education";

export const industries = {
  meta: {
    title: "Industry-Specific AI & Growth Solutions | Sales360.ai",
    description:
      "Explore AI sales, marketing, automation, and cloud solutions tailored for e-commerce, healthcare, real estate, manufacturing, B2B services, and education.",
  },
  hero: {
    eyebrow: "INDUSTRY-SPECIFIC AI & GROWTH SOLUTIONS",
    titleLead: "Built for",
    accent: "How Your Industry Actually Sells",
    sub: "Every sector has unique buying cycles and operational bottlenecks. Explore how Sales360.ai adapts our AI Command Center, marketing, and cloud stack to your exact vertical.",
  },
  nav: [
    { id: "e-commerce", label: "E-Commerce", icon: "shopping" },
    { id: "healthcare", label: "Healthcare", icon: "health" },
    { id: "real-estate", label: "Real Estate", icon: "building" },
    { id: "manufacturing", label: "Manufacturing", icon: "factory" },
    { id: "b2b-services", label: "B2B Services", icon: "briefcase" },
    { id: "education", label: "Education", icon: "education" },
  ] as const,
  flagship: {
    id: "e-commerce" as IndustryId,
    eyebrow: "FLAGSHIP VERTICAL • E-COMMERCE & D2C",
    headline: "Turn Window Shoppers Into Repeat Buyers on Autopilot",
    sub: "From high-ROAS Meta/Google acquisition to instant WhatsApp cart recovery and ultra-fast cloud hosting, we power high-converting online stores.",
    useCases: [
      {
        number: "01",
        lead: "Automated Abandoned Cart & COD Verification:",
        body: "Recover lost checkouts and reduce RTO (Return to Origin) via automated WhatsApp flows.",
      },
      {
        number: "02",
        lead: "AI Shopping Assistant:",
        body: "Recommend products, answer sizing/shipping queries, and share payment links inside chat.",
      },
      {
        number: "03",
        lead: "High-Speed Commerce Cloud Hosting:",
        body: "Sub-second store load speeds built to handle flash-sale traffic surges.",
      },
      {
        number: "04",
        lead: "Post-Purchase Retention & Reorder Loops:",
        body: "Automated review requests, loyalty drops, and replenishment reminders.",
      },
    ],
    cta: "Scale Your E-Commerce Brand",
    interest: "Full Ecosystem" as Interest,
    mock: {
      title: "Cart recovery",
      status: "WhatsApp · now",
      greeting: "Hi Aarav, your cart is waiting.",
      message: "Complete your order securely and we’ll get it ready for dispatch.",
      payment: "Pay ₹12,499",
      cod: "COD verified",
    },
  },
  grid: {
    headline: "Proven Frameworks Across 5 Core Industries",
    challengeLabel: "Core Challenge",
    solutionLabel: "Sales360 Solution",
    cards: [
      {
        id: "healthcare" as IndustryId,
        icon: "health",
        title: "Healthcare & Clinics",
        challenge: "Missed patient calls, slow inquiry follow-ups, and appointment no-shows.",
        solution:
          "24/7 WhatsApp appointment booking, automated patient reminders, local Google/SEO dominance, and HIPAA-conscious secure hosting.",
      },
      {
        id: "real-estate" as IndustryId,
        icon: "building",
        title: "Real Estate & Developers",
        challenge:
          "High ad spend wasted on unverified property leads and slow site-visit scheduling.",
        solution:
          "Instant Meta/Google lead qualification via AI, automated brochure & floor-plan delivery on WhatsApp, and site-visit reminder sequences.",
      },
      {
        id: "manufacturing" as IndustryId,
        icon: "factory",
        title: "Manufacturing & Industrial",
        challenge: "Complex B2B RFQs, slow quotation turnarounds, and manual dealer follow-ups.",
        solution:
          "Automated RFQ capture, instant digital quote generation, B2B search/LinkedIn lead generation, and distributor portal hosting.",
      },
      {
        id: "b2b-services" as IndustryId,
        icon: "briefcase",
        title: "B2B & Professional Services",
        challenge:
          "Long sales cycles, inconsistent outbound prospecting, and founder-led bottlenecks.",
        solution:
          "Targeted LinkedIn/Email outbound automation, AEO/SEO thought-leadership engines, and automated discovery call booking.",
      },
      {
        id: "education" as IndustryId,
        icon: "education",
        title: "Education & EdTech",
        challenge: "Seasonal admission rushes overwhelming counselors and high inquiry drop-offs.",
        solution:
          "AI admission counselor bots on web/WhatsApp, automated webinar & campus tour reminders, and high-converting student acquisition ads.",
      },
    ],
  },
} as const;
