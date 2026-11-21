// GLOBAL COPY — verbatim from the Sales360.ai brief. Edit text here only.
export type Interest = "AI Command Center" | "Growth Marketing" | "AI Automation" | "Tech & Cloud" | "Full Ecosystem";

export const nav = [
  { label: "Home", to: "/" },
  { label: "Sales", to: "/sales" },
  { label: "Marketing", to: "/marketing" },
  { label: "Automation", to: "/automation" },
  { label: "Tech & Cloud", to: "/tech-cloud" },
  { label: "Industries", to: "/industries" },
  { label: "Contact", to: "/contact" },
] as const;

export const headerCta = { label: "Book Free Demo", interest: "Full Ecosystem" as Interest };

export const banner = {
  headline: "Stop Losing Leads to Slow Follow-Ups.",
  sub: "See how Sales360.ai can automate your pipeline and scale your revenue in 30 days.",
  primary: { label: "Book a 15-Min Strategy Call", interest: "Full Ecosystem" as Interest },
  secondary: { label: "Explore AI Command Center", to: "/sales" },
};

export const contact = {
  email: "info@sales360.ai",
  phone: "+91 8050700300",
  phoneHref: "tel:+918050700300",
  whatsapp: "https://wa.me/918050700300",
};

export const footer = {
  summary: "AI-powered sales, marketing, and cloud infrastructure built for predictable business growth.",
  platformTitle: "Platform & Services",
  platform: [
    { label: "Sales — AI Command Center", to: "/sales" },
    { label: "Marketing", to: "/marketing" },
    { label: "AI Automation", to: "/automation" },
    { label: "Tech & Cloud", to: "/tech-cloud" },
  ],
  companyTitle: "Industries & Company",
  industries: [
    { label: "E-Commerce", hash: "e-commerce" },
    { label: "Healthcare", hash: "healthcare" },
    { label: "Real Estate", hash: "real-estate" },
    { label: "Manufacturing", hash: "manufacturing" },
    { label: "B2B Services", hash: "b2b-services" },
    { label: "Education", hash: "education" },
  ],
  copyright: "© 2026 Sales360.ai. All Rights Reserved.",
  legal: ["Privacy Policy", "Terms & Conditions", "Refund Policy"] as const,
};

export const leadForm = {
  fields: {
    name: "Full Name",
    email: "Work Email",
    phone: "Phone / WhatsApp Number",
    company: "Company / Website URL",
    interest: "Primary Interest",
    goal: "Brief Goal or Challenge",
  },
  interests: ["AI Command Center", "Growth Marketing", "AI Automation", "Tech & Cloud", "Full Ecosystem"] as Interest[],
  submit: "Get Your Custom Growth Plan",
  micro: "No spam. Direct consultation with our strategy team within 4 business hours.",
  successTitle: "Request received",
  successBody: "We'll respond within 4 business hours.",
};

// TEMPORARY stub page copy — replaced by page prompts 1–7.
export const stubs = {
  home: { title: "Sales360.ai | AI Revenue, Marketing & Cloud Partner", h1: "Sales360.ai", desc: "AI-powered sales, marketing, and cloud infrastructure built for predictable business growth." },
  sales: { title: "Sales | Sales360.ai", h1: "Sales — AI Command Center", desc: "Sales — AI Command Center by Sales360.ai." },
  marketing: { title: "Marketing | Sales360.ai", h1: "Marketing", desc: "Growth marketing by Sales360.ai." },
  automation: { title: "Automation | Sales360.ai", h1: "AI Automation", desc: "AI Automation by Sales360.ai." },
  techCloud: { title: "Tech & Cloud | Sales360.ai", h1: "Tech & Cloud", desc: "Tech & Cloud infrastructure by Sales360.ai." },
  industries: { title: "Industries | Sales360.ai", h1: "Industries", desc: "Industries served by Sales360.ai." },
  contact: { title: "Contact | Sales360.ai", h1: "Contact", desc: "Contact Sales360.ai — info@sales360.ai | +91 8050700300." },
};
