import { proposed } from "./copy";

// GLOBAL COPY — edit shared strings here. New revision copy is explicitly proposed.
export type Interest =
  "Sales 360" | "Growth Marketing" | "AI Automation" | "Tech & Cloud" | "Full Ecosystem";

export const nav = [
  { label: "Home", to: "/" },
  { label: proposed("Sales 360").text, to: "/sales" },
  { label: "Marketing", to: "/marketing" },
  { label: "Automation", to: "/automation" },
  { label: "Tech & Cloud", to: "/tech-cloud" },
  { label: "Industries", to: "/industries" },
  { label: "Contact", to: "/contact" },
] as const;

export const headerCta = { label: "Book Free Demo", interest: "Full Ecosystem" as Interest };

export type BannerContent = {
  headline: string;
  sub: string;
  primary: { label: string; interest: Interest };
  secondary?: { label: string; to: string; hash?: string };
};

export const banners: Record<string, BannerContent> = {
  "/": {
    headline: proposed("See How Sales360.ai Would Work for Your Business.").text,
    sub: proposed(
      "A 15-minute conversation about where you lose revenue today and the fastest way to fix it.",
    ).text,
    primary: {
      label: proposed("Book a 15-Min Strategy Call").text,
      interest: "Full Ecosystem",
    },
    secondary: { label: proposed("Explore Sales 360").text, to: "/sales" },
  },
  "/sales": {
    headline: proposed("See Sales 360 Run on Your Own Leads.").text,
    sub: proposed("A live walkthrough using your channels, your enquiries and your sales process.")
      .text,
    primary: { label: proposed("Book Live Demo").text, interest: "Sales 360" },
    secondary: { label: proposed("View Pricing Plans").text, to: "/sales", hash: "pricing" },
  },
  "/marketing": {
    headline: proposed("Find Out Which Channels Your Buyers Actually Use.").text,
    sub: proposed("A free audit of your current marketing across all seven channels.").text,
    primary: {
      label: proposed("Get Your Free Marketing Audit").text,
      interest: "Growth Marketing",
    },
  },
  "/automation": {
    headline: proposed("Tell Us the Role. We'll Design the Agent.").text,
    sub: proposed("From one AI employee to a coordinated team.").text,
    primary: { label: proposed("Design Your AI Workforce").text, interest: "AI Automation" },
  },
  "/tech-cloud": {
    headline: proposed("Let Our Engineers Review Your Infrastructure.").text,
    sub: proposed("A technical review of your servers, security and support setup.").text,
    primary: { label: proposed("Request Infrastructure Audit").text, interest: "Tech & Cloud" },
  },
  "/industries": {
    headline: proposed("Talk to a Team That Understands Your Industry.").text,
    sub: proposed("Bring your buying cycle. We will map where revenue leaks and how to fix it.")
      .text,
    primary: {
      label: proposed("Book a 15-Min Strategy Call").text,
      interest: "Full Ecosystem",
    },
    secondary: { label: proposed("Explore Sales 360").text, to: "/sales" },
  },
};

export const sampleDataLabel = proposed("Sample data").text;

export const contact = {
  email: "info@sales360.ai",
  phone: "+91 8050700300",
  phoneHref: "tel:+918050700300",
  whatsapp: "https://wa.me/918050700300",
};

export const footer = {
  summary:
    "AI-powered sales, marketing, and cloud infrastructure built for predictable business growth.",
  platformTitle: "Platform & Services",
  platform: [
    { label: proposed("Sales 360").text, to: "/sales" },
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
  honeypot: proposed("Leave this field empty").text,
  interests: [
    proposed("Sales 360").text,
    "Growth Marketing",
    "AI Automation",
    "Tech & Cloud",
    "Full Ecosystem",
  ] as Interest[],
  submit: "Get Your Custom Growth Plan",
  micro: "No spam. Direct consultation with our strategy team within 4 business hours.",
  successTitle: "Request received",
  successBody: "We'll respond within 4 business hours.",
};

// Legacy stub copy is retained only for reference; no active route renders it.
export const stubs = {
  home: {
    title: "Sales360.ai | AI Revenue, Marketing & Cloud Partner",
    h1: "Sales360.ai",
    desc: "AI-powered sales, marketing, and cloud infrastructure built for predictable business growth.",
  },
  sales: {
    title: proposed("Sales 360 | Sales360.ai").text,
    h1: proposed("Sales 360").text,
    desc: proposed("Sales 360 by Sales360.ai.").text,
  },
  marketing: {
    title: "Marketing | Sales360.ai",
    h1: "Marketing",
    desc: "Growth marketing by Sales360.ai.",
  },
  automation: {
    title: "Automation | Sales360.ai",
    h1: "AI Automation",
    desc: "AI Automation by Sales360.ai.",
  },
  techCloud: {
    title: "Tech & Cloud | Sales360.ai",
    h1: "Tech & Cloud",
    desc: "Tech & Cloud infrastructure by Sales360.ai.",
  },
  industries: {
    title: "Industries | Sales360.ai",
    h1: "Industries",
    desc: "Industries served by Sales360.ai.",
  },
  contact: {
    title: "Contact | Sales360.ai",
    h1: "Contact",
    desc: "Contact Sales360.ai — info@sales360.ai | +91 8050700300.",
  },
};
