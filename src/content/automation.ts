import type { Interest } from "./global";

export const automation = {
  meta: {
    title: "AI Workflow & Agent Automation | Sales360.ai",
    description:
      "Automate WhatsApp conversations, personalized email outreach, brand content creation, lead routing, and operations with Sales360.ai.",
  },
  hero: {
    eyebrow: "INTELLIGENT WORKFLOW & AGENT AUTOMATION",
    titleLead: "Automate Your Busywork",
    accent: "Scale Without Adding Headcount",
    sub: "We design and deploy custom AI workflows that handle customer conversations, personalized email outreach, and high-volume content creation around the clock.",
    primary: "Automate Your Workflow",
    interest: "AI Automation" as Interest,
    graph: {
      trigger: "New lead",
      triggerDetail: "Form submitted",
      agent: "AI agent",
      agentDetail: "Qualify & orchestrate",
      actions: ["WhatsApp", "Email", "Content"],
    },
  },
  nav: [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "email", label: "Email" },
    { id: "content", label: "Content" },
    { id: "lead-routing", label: "Lead Routing" },
  ],
  useCases: [
    {
      id: "whatsapp",
      number: "01",
      headline: "24/7 WhatsApp Sales & Support Agents",
      description:
        "Turn WhatsApp into an autonomous storefront and support desk that answers product questions, shares brochures, qualifies leads, and books appointments instantly.",
      capabilities: [
        {
          lead: "Instant FAQ & Product Discovery",
          text: "Trained on your exact business catalog and pricing.",
        },
        {
          lead: "Automated Booking & Reminders",
          text: "Syncs directly with your team calendar to eliminate no-shows.",
        },
        {
          lead: "Seamless Human Handoff",
          text: "Alerts your sales rep the moment a buyer is ready to close.",
        },
      ],
    },
    {
      id: "email",
      number: "02",
      headline: "Hyper-Personalized Email Sequences at Scale",
      description:
        "Replace generic bulk blasts with AI-driven email workflows that adapt to prospect behavior, follow up automatically, and book qualified meetings on autopilot.",
      capabilities: [
        {
          lead: "Behavior-Triggered Drips",
          text: "Sends tailored follow-ups based on clicks, downloads, or inactivity.",
        },
        {
          lead: "AI Prospect Research & Personalization",
          text: "Customizes opening lines for every B2B decision-maker.",
        },
        {
          lead: "Two-Way CRM Sync",
          text: "Automatically logs replies and updates deal stages.",
        },
      ],
    },
    {
      id: "content",
      number: "03",
      headline: "Publish High-Quality Brand Content in a Fraction of the Time",
      description:
        "Custom-trained AI content pipelines calibrated to your brand voice—producing SEO blogs, social posts, ad copy, and video scripts ready for human review.",
      capabilities: [
        {
          lead: "SEO & AEO Article Engines",
          text: "Researched, structured long-form articles built to rank.",
        },
        {
          lead: "Multi-Platform Ad & Social Copy",
          text: "Instant variations for LinkedIn, Instagram, Meta, and Google Ads.",
        },
        {
          lead: "Brand-Voice Guardrails",
          text: "Custom prompt systems ensure every output sounds authentic to your company.",
        },
      ],
    },
  ],
  routing: {
    id: "lead-routing",
    number: "04",
    headline: "Lead Routing & Operations Sync",
    cards: [
      {
        title: "Instant Lead Enrichment",
        body: "Auto-fill company size, role, and contact details the moment a lead enters.",
      },
      {
        title: "Smart Round-Robin Assignment",
        body: "Route hot leads to the right sales rep via WhatsApp alert in under 5 seconds.",
      },
      {
        title: "Automated Reporting",
        body: "Daily revenue, lead source, and team performance summaries delivered to founders.",
      },
    ],
  },
  whatsapp: {
    contact: "Ananya",
    agent: "Sales360 AI agent",
    online: "Online · replies instantly",
    brochureName: "Pro-Pack-Brochure.pdf",
    brochureSize: "1.2 MB",
    calendar: "Friday · 4:00 PM confirmed",
    handoff: "Handoff → Priya (Sales) notified",
    typing: "AI agent is typing",
    messages: [
      {
        id: "question",
        sender: "customer",
        kind: "text",
        text: "Hi, what's the price of the Pro pack?",
      },
      {
        id: "answer",
        sender: "ai",
        kind: "text",
        text: "Hi Ananya! The Pro pack is ₹4,999. Want the brochure?",
      },
      { id: "brochure", sender: "ai", kind: "brochure" },
      {
        id: "booking-request",
        sender: "customer",
        kind: "text",
        text: "Yes please. Can I book a demo on Friday?",
      },
      {
        id: "booking-answer",
        sender: "ai",
        kind: "text",
        text: "Done — Friday, 4:00 PM is booked. I'll remind you the day before.",
      },
      { id: "calendar", sender: "system", kind: "calendar" },
      { id: "handoff", sender: "system", kind: "handoff" },
    ],
  },
  email: {
    windowTitle: "Behavior-driven outbound",
    live: "Sequence active",
    sync: "Two-way CRM sync",
    reply: "Reply logged · Deal stage updated",
    nodes: [
      { label: "Trigger", detail: "Clicked pricing page" },
      { label: "Email 1", detail: "Personalized introduction" },
      { label: "Wait 2 days", detail: "Behavior window" },
      { label: "Opened?", detail: "Decision" },
      { label: "Email 2", detail: "Personalised opener" },
      { label: "Meeting booked", detail: "Calendar confirmed" },
    ],
  },
  contentEngine: {
    windowTitle: "Brand content workspace",
    status: "5 assets generated",
    blog: {
      label: "SEO & AEO article",
      title: "AI automation for growing sales teams",
      headings: [
        "Why response speed matters",
        "Building the automation layer",
        "Measuring pipeline impact",
      ],
    },
    social: {
      label: "LinkedIn post",
      author: "Viswa Korapala",
      body: "Your next lead should never wait for a follow-up. Here’s how an AI workflow keeps every conversation moving.",
      tag: "Founder insight",
    },
    ads: {
      label: "Ad copy · 3 variations",
      items: [
        "Turn every inquiry into a sales conversation.",
        "Your AI follow-up engine, always on.",
        "Less admin. More qualified meetings.",
      ],
    },
    video: {
      label: "Video script",
      title: "The 15-second follow-up",
      scenes: [
        { time: "00:00", text: "A new lead arrives" },
        { time: "00:04", text: "AI starts the conversation" },
        { time: "00:11", text: "Meeting booked" },
      ],
    },
    guardrails: {
      label: "Brand voice",
      toggles: ["Tone", "Banned words", "Approved claims"],
      ready: "Ready for human review",
    },
  },
  routingUi: {
    enrichment: {
      status: "Enriching lead",
      fields: [
        { label: "Company size", value: "51–200 employees" },
        { label: "Role", value: "Founder" },
        { label: "Phone", value: "+91 98765 43210" },
      ],
    },
    assignment: {
      lead: "Hot lead",
      alert: "WhatsApp alert · 3s",
      avatars: ["PR", "RK", "AS"],
    },
    report: {
      title: "Daily founder report",
      revenueLabel: "Revenue",
      revenue: "₹1,24,500",
      sourceLabel: "Lead source",
      sources: [
        { label: "Meta", width: "86%" },
        { label: "Google", width: "68%" },
        { label: "WhatsApp", width: "48%" },
      ],
      teamLabel: "Team performance",
      team: ["Priya · 12 follow-ups", "Rahul · 8 meetings"],
    },
  },
} as const;

export type AutomationUseCase = (typeof automation.useCases)[number];
export type AutomationSectionId = (typeof automation.nav)[number]["id"];
