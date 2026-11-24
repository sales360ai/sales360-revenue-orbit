// Pricing amounts and inclusions await client approval. Edit this single register.
export const pricing = {
  status: "unapproved",
  headline: "Simple, Scalable Plans Built for ROI",
  popular: "Most Popular",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: "₹14,999",
      cadence: "/ month",
      subtitle: "For Small Teams & Growing Brands",
      features: [
        "Unified Lead Inbox (Web, Meta, Google)",
        "Automated WhatsApp & Email Follow-Ups",
        "Up to 2,500 Active Contacts",
        "Standard Pipeline Dashboard",
      ],
      cta: "Get Started",
    },
    {
      id: "growth",
      name: "Growth",
      price: "₹29,999",
      cadence: "/ month",
      subtitle: "For Scaling Sales Engines",
      features: [
        "Everything in Starter + AI Lead Qualification Agent",
        "Automated Quotation & Cart Recovery Flows",
        "Revenue Leakage Alerts & Custom Workflows",
        "Up to 15,000 Active Contacts + CRM Sync",
        "Priority Onboarding & Support",
      ],
      cta: "Book Growth Demo",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom Pricing",
      cadence: "",
      subtitle: "For High-Volume & Multi-Branch Organizations",
      features: [
        "Unlimited Contacts & Custom AI Voice/Chat Agents",
        "Dedicated Cloud Infrastructure & Custom API Integrations",
        "Multi-Branch Management & Role Permissions",
        "Dedicated Account Architect & 24/7 SLA",
      ],
      cta: "Talk to Sales",
    },
  ],
} as const;
