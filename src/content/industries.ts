import { proposed } from "./copy";

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
    sub: proposed(
      "Every sector has unique buying cycles and operational bottlenecks. Explore how Sales360.ai adapts Sales 360, marketing, and cloud stack to your exact vertical.",
    ).text,
  },
  nav: [
    { id: "e-commerce", label: "E-Commerce", icon: "shopping" },
    { id: "healthcare", label: "Healthcare", icon: "health" },
    { id: "real-estate", label: "Real Estate", icon: "building" },
    { id: "manufacturing", label: "Manufacturing", icon: "factory" },
    { id: "b2b-services", label: "B2B Services", icon: "briefcase" },
    { id: "education", label: "Education", icon: "education" },
  ] as const,
  solutionsHeading: "Explore Industry-Specific Features & Use Cases",
  featuresLabel: "Features",
  useCasesLabel: "Use Cases",
  solutions: [
    {
      id: "e-commerce" as IndustryId,
      icon: "shopping",
      label: "E-Commerce & D2C",
      features: [
        {
          title: "Commerce Acquisition System",
          description:
            "Connect high-intent Google and Meta campaigns with your product catalog and online store.",
        },
        {
          title: "WhatsApp Revenue Automation",
          description:
            "Automate cart recovery, COD verification, product recommendations, and payment-link conversations.",
        },
        {
          title: "Retention & Commerce Cloud",
          description:
            "Run review, loyalty, and reorder journeys on fast cloud hosting built for traffic surges.",
        },
      ],
      useCases: [
        {
          title: "Recover an Abandoned Checkout",
          description:
            "Send a timely WhatsApp reminder with the saved cart and a direct payment link.",
        },
        {
          title: "Verify COD Before Dispatch",
          description:
            "Confirm customer intent automatically before the order moves to fulfilment.",
        },
        {
          title: "Bring Customers Back to Reorder",
          description:
            "Trigger replenishment reminders, loyalty drops, and review requests after purchase.",
        },
      ],
      visual: { title: "Commerce Journey", status: "Store connected" },
    },
    {
      id: "healthcare" as IndustryId,
      icon: "health",
      label: "Healthcare & Clinics",
      features: [
        {
          title: "Patient Inquiry & Booking System",
          description:
            "Answer inquiries and book appointments around the clock through web and WhatsApp.",
        },
        {
          title: "Reminder & Follow-Up Automation",
          description:
            "Coordinate appointment reminders, preparation instructions, and patient follow-ups.",
        },
        {
          title: "Local Search & Secure Infrastructure",
          description:
            "Strengthen local Google visibility with HIPAA-conscious, securely managed hosting.",
        },
      ],
      useCases: [
        {
          title: "Book an Appointment After Hours",
          description:
            "Let a patient choose a suitable slot without waiting for the front desk to open.",
        },
        {
          title: "Reduce Missed Appointments",
          description: "Send automated reminders and make rescheduling simple before the visit.",
        },
        {
          title: "Continue Post-Visit Care",
          description:
            "Share approved follow-up instructions and review requests through a structured journey.",
        },
      ],
      visual: { title: "Patient Journey", status: "Booking assistant online" },
    },
    {
      id: "real-estate" as IndustryId,
      icon: "building",
      label: "Real Estate & Developers",
      features: [
        {
          title: "Property Lead Qualification",
          description:
            "Capture budget, location, configuration, and buying timeline as inquiries arrive.",
        },
        {
          title: "Project Information Delivery",
          description:
            "Share the relevant brochure, floor plan, and project details instantly on WhatsApp.",
        },
        {
          title: "Site-Visit Automation",
          description:
            "Coordinate visit scheduling, confirmations, reminders, and sales-team routing.",
        },
      ],
      useCases: [
        {
          title: "Qualify a New Property Inquiry",
          description:
            "Identify buyer requirements before assigning the opportunity to a sales advisor.",
        },
        {
          title: "Share the Right Project Assets",
          description:
            "Deliver property-specific information without manual searching or repeated calls.",
        },
        {
          title: "Confirm a Site Visit",
          description:
            "Keep buyers and advisors aligned with automated scheduling and visit reminders.",
        },
      ],
      visual: { title: "Property Inquiry", status: "Advisor routing ready" },
    },
    {
      id: "manufacturing" as IndustryId,
      icon: "factory",
      label: "Manufacturing & Industrial",
      features: [
        {
          title: "RFQ Capture & Qualification",
          description:
            "Structure product, quantity, delivery, and specification details from every inquiry.",
        },
        {
          title: "Digital Quotation Workflow",
          description:
            "Route requirements for faster quote preparation and automate follow-up sequences.",
        },
        {
          title: "Distributor & B2B Growth System",
          description:
            "Connect targeted acquisition, dealer communication, and reliable portal hosting.",
        },
      ],
      useCases: [
        {
          title: "Turn an RFQ Into a Structured Lead",
          description:
            "Capture technical buying requirements and route them to the right internal team.",
        },
        {
          title: "Follow Up on a Pending Quote",
          description:
            "Keep quotations moving with timely reminders and a visible opportunity status.",
        },
        {
          title: "Nurture a Distributor Inquiry",
          description:
            "Share the right information and maintain consistent follow-up across a longer cycle.",
        },
      ],
      visual: { title: "RFQ Workspace", status: "Quote workflow ready" },
    },
    {
      id: "b2b-services" as IndustryId,
      icon: "briefcase",
      label: "B2B & Professional Services",
      features: [
        {
          title: "Outbound Prospecting Engine",
          description:
            "Coordinate targeted LinkedIn and email outreach with structured follow-up sequences.",
        },
        {
          title: "Authority & Discovery System",
          description:
            "Combine AEO, SEO, and thought leadership with automated discovery-call booking.",
        },
        {
          title: "Unified Pipeline & Routing",
          description: proposed(
            "Bring every conversation into Sales 360 for qualification and next steps.",
          ).text,
        },
      ],
      useCases: [
        {
          title: "Nurture a High-Value Prospect",
          description:
            "Build familiarity through relevant outreach instead of inconsistent manual follow-ups.",
        },
        {
          title: "Convert Search Intent Into a Call",
          description:
            "Guide a qualified visitor from useful expertise to a booked discovery session.",
        },
        {
          title: "Reduce Founder-Led Bottlenecks",
          description:
            "Give the team a repeatable qualification and handoff process for every opportunity.",
        },
      ],
      visual: { title: "B2B Pipeline", status: "Discovery workflow active" },
    },
    {
      id: "education" as IndustryId,
      icon: "education",
      label: "Education & EdTech",
      features: [
        {
          title: "AI Admission Counselor",
          description:
            "Answer course, eligibility, fee, and admission questions instantly on web and WhatsApp.",
        },
        {
          title: "Admission Journey Automation",
          description:
            "Coordinate inquiries, webinars, campus tours, applications, and counselor handoffs.",
        },
        {
          title: "Student Acquisition & Tracking",
          description:
            "Connect high-converting campaigns with a clear view of every admission opportunity.",
        },
      ],
      useCases: [
        {
          title: "Handle a Seasonal Inquiry Rush",
          description:
            "Give every prospective student an immediate response without overwhelming counselors.",
        },
        {
          title: "Increase Webinar or Tour Attendance",
          description: "Send timely confirmations and reminders before the scheduled session.",
        },
        {
          title: "Follow Up on an Application",
          description:
            "Nudge interested students toward the next admission step with relevant guidance.",
        },
      ],
      visual: { title: "Admission Journey", status: "Counselor assistant online" },
    },
  ],
  homeSnapshots: {
    "e-commerce": {
      name: proposed("E-Commerce & D2C").text,
      howTheyBuy: proposed("Fast, offer-led shoppers").text,
      stages: [proposed("Discover").text, proposed("Checkout").text, proposed("Reorder").text],
      linkLabel: proposed("See the E-Commerce & D2C system").text,
    },
    healthcare: {
      name: proposed("Healthcare").text,
      howTheyBuy: proposed("Trust and consultation-led patients").text,
      stages: [proposed("Enquiry").text, proposed("Consultation").text, proposed("Follow-up").text],
      linkLabel: proposed("See the Healthcare system").text,
    },
    "real-estate": {
      name: proposed("Real Estate").text,
      howTheyBuy: proposed("High-value, visit-led buyers").text,
      stages: [proposed("Enquiry").text, proposed("Site visit").text, proposed("Booking").text],
      linkLabel: proposed("See the Real Estate system").text,
    },
    manufacturing: {
      name: proposed("Manufacturing").text,
      howTheyBuy: proposed("Dealer and RFQ-led B2B").text,
      stages: [proposed("RFQ").text, proposed("Quote").text, proposed("Dealer network").text],
      linkLabel: proposed("See the Manufacturing system").text,
    },
    "b2b-services": {
      name: proposed("B2B Services").text,
      howTheyBuy: proposed("Relationship and referral-led clients").text,
      stages: [proposed("Introduction").text, proposed("Proposal").text, proposed("Renewal").text],
      linkLabel: proposed("See the B2B Services system").text,
    },
    education: {
      name: proposed("Education").text,
      howTheyBuy: proposed("Student-and-parent decisions").text,
      stages: [proposed("Enquiry").text, proposed("Counselling").text, proposed("Enrolment").text],
      linkLabel: proposed("See the Education system").text,
    },
  },
} as const;

export type IndustrySolution = (typeof industries.solutions)[number];
