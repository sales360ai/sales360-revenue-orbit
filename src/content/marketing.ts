import type { Interest } from "./global";

export const marketing = {
  meta: {
    title: "Full-Funnel Growth Marketing | Sales360.ai",
    description:
      "Unify paid ads, SEO/AEO, social media, WhatsApp, email, telecalling, and video marketing into one measurable growth strategy with Sales360.ai.",
  },
  hero: {
    eyebrow: "FULL-FUNNEL PERFORMANCE & BRAND MARKETING",
    titleLead: "7 High-Converting Marketing Engines.",
    accent: "One Unified Growth Strategy.",
    sub: "We don’t chase vanity likes. Sales360.ai combines precision paid ads, AI-era search optimization, video storytelling, and direct WhatsApp, email, and telecalling outreach to fill your sales pipeline.",
    primary: "Get Your Free Marketing Audit",
    interest: "Growth Marketing" as Interest,
  },
  channels: [
    {
      id: "google-meta-ads",
      label: "Google & Meta Ads",
      short: "Google & Meta Ads",
      headline: "Precision Paid Acquisition That Maximizes ROAS.",
      deliverables: [
        "High-Intent Google Search & Performance Max",
        "Meta (Facebook & Instagram) Lead & Catalog Ads",
        "Dynamic Retargeting Funnels",
        "Real-Time Cost-Per-Acquisition Optimization",
      ],
      outcome: "Immediate, scalable flow of sales-qualified leads.",
    },
    {
      id: "seo-aeo",
      label: "SEO & AEO (Answer Engine Optimization)",
      short: "SEO & AEO",
      headline: "Rank #1 on Google Search and AI Answer Engines.",
      deliverables: [
        "High-Intent Commercial Keyword Ranking",
        "AEO Optimization for ChatGPT, Gemini & Perplexity Citations",
        "Technical Site Speed & Schema Architecture",
        "Local Google Business Profile Dominance",
      ],
      outcome: "Compounding organic traffic that lowers blended acquisition cost.",
    },
    {
      id: "social-media",
      label: "Social Media Marketing",
      short: "Social Media",
      headline: "Build Category Authority That Turns Followers Into Buyers.",
      deliverables: [
        "Executive LinkedIn & Instagram Brand Positioning",
        "High-Retention Carousel & Reel Calendars",
        "Community Engagement & Social Proof Campaigns",
        "Consistent Brand Storytelling",
      ],
      outcome: "Stronger brand trust and warmer inbound prospects.",
    },
    {
      id: "whatsapp",
      label: "WhatsApp Marketing",
      short: "WhatsApp",
      headline: "98% Open-Rate Direct Campaigns That Drive Instant Action.",
      deliverables: [
        "Official WhatsApp Business API Setup",
        "Segmented Broadcast Offers & Product Catalogs",
        "Interactive Click-to-WhatsApp Ad Funnels",
        "Automated Drip Nurture Sequences",
      ],
      outcome: "Fastest direct-to-customer conversion channel.",
    },
    {
      id: "email",
      label: "Email Marketing",
      short: "Email",
      headline: "Automated Lifecycle & B2B Outreach That Nurtures Every Lead.",
      deliverables: [
        "High-Deliverability Domain Warmup & Setup",
        "Automated Welcome, Nurture & Win-Back Flows",
        "B2B Cold Outbound Campaigns",
        "Monthly Revenue-Focused Newsletters",
      ],
      outcome: "Predictable repeat purchases and high-ticket B2B meetings.",
    },
    {
      id: "telecalling",
      label: "Telecalling & Voice Outreach",
      short: "Telecalling",
      headline: "Human + AI-Assisted Calling That Qualifies and Books Faster.",
      deliverables: [
        "Instant Inbound Lead Verification Calls",
        "Outbound Appointment Setting & Event Invitations",
        "Customer Feedback & Renewal Calling",
        "Full Call Recording & CRM Disposition Logging",
      ],
      outcome: "High-touch personal connection that accelerates deal velocity.",
    },
    {
      id: "video",
      label: "Video Marketing",
      short: "Video",
      headline: "Scroll-Stopping Video Ads & Brand Films Built to Convert.",
      deliverables: [
        "Direct-Response Performance Video Ads",
        "Product Explainers & 3D Visuals",
        "Founder Thought-Leadership & Podcast Clips",
        "YouTube & Short-Form Social Edits",
      ],
      outcome: "Higher ad click-through rates and stronger buyer conviction.",
    },
  ],
  funnel: {
    headline: "How Our 7 Channels Work Together",
    commandCenter: "AI Command Center",
    steps: [
      {
        number: "01",
        title: "Attract",
        body: "Google/Meta Ads, SEO/AEO, Social Media & Video capture buyer attention.",
        channels: ["Ads", "Search", "Social", "Video"],
      },
      {
        number: "02",
        title: "Engage",
        body: "WhatsApp, Email & Telecalling connect instantly and build trust.",
        channels: ["WhatsApp", "Email", "Telecalling"],
      },
      {
        number: "03",
        title: "Convert",
        body: "Every warm lead routes straight into your AI Command Center to close.",
        channels: ["Command Center"],
      },
    ],
  },
  mocks: {
    ads: {
      title: "Acquisition performance",
      period: "Last 30 days",
      roas: "ROAS 4.8X",
      cpaChip: "CPA ▼ 18%",
      chartLabels: ["Spend", "Revenue"],
      headers: ["Campaign", "Spend", "Leads", "CPA", "ROAS"],
      campaigns: [
        { name: "Search · High intent", spend: "₹84,500", leads: "186", cpa: "₹454", roas: "5.2X" },
        { name: "Meta · Retargeting", spend: "₹52,000", leads: "142", cpa: "₹366", roas: "4.9X" },
        { name: "PMax · Catalog", spend: "₹68,500", leads: "154", cpa: "₹445", roas: "4.3X" },
      ],
    },
    seo: {
      query: "AI sales automation partner India",
      resultBadge: "#1",
      resultTitle: "Sales360.ai | AI Revenue & Growth Ecosystem",
      resultUrl: "sales360.ai",
      resultBody:
        "Unify lead capture, instant follow-ups, and revenue visibility in one AI Command Center.",
      secondResult: "AI Command Center for growing sales teams",
      aiLabel: "AI answer",
      answer:
        "Sales360.ai is a unified option for businesses seeking automated lead response and pipeline visibility.",
      source: "1",
      sourceLabel: "Sales360.ai",
    },
    social: {
      title: "October content calendar",
      scheduled: "Scheduled",
      types: [
        "Carousel",
        "Reel",
        "Story",
        "Carousel",
        "Reel",
        "Carousel",
        "Story",
        "Reel",
        "Carousel",
        "Reel",
        "Story",
        "Carousel",
      ],
      days: ["01", "03", "05", "08", "10", "12", "15", "17", "19", "22", "24", "26"],
    },
    whatsapp: {
      title: "Growth broadcast",
      status: "Online",
      offer: "Your custom growth plan is ready.",
      message: "Explore the AI Command Center catalog and choose a time for your strategy call.",
      catalog: "AI Command Center",
      catalogMeta: "Sales, follow-ups & pipeline visibility",
      view: "View catalog",
      reply: "Book a call",
      funnel: [
        { label: "Delivered", value: "2,400", width: "100%" },
        { label: "Read", value: "2,352", width: "98%" },
        { label: "Replied", value: "428", width: "42%" },
      ],
    },
    email: {
      title: "Lifecycle automation",
      live: "Active",
      steps: ["Welcome", "Nurture", "Win-back"],
      stats: [
        { label: "Open rate", value: "52%" },
        { label: "Click rate", value: "12.8%" },
      ],
      reputation: "Sending reputation",
      reputationValue: "96 / 100",
    },
    calling: {
      title: "Live call log",
      agents: "4 agents active",
      headers: ["Prospect", "Duration", "Disposition"],
      calls: [
        { initials: "AS", name: "Ananya Shah", duration: "06:42", status: "Interested" },
        { initials: "RM", name: "Rohit Mehta", duration: "04:18", status: "Booked" },
        { initials: "VK", name: "Vikram Rao", duration: "02:56", status: "Callback" },
      ],
      waveformLabel: "AI-assisted call summary ready",
    },
    video: {
      title: "Founder story · Final cut",
      duration: "00:24 / 00:45",
      play: "Play video",
      engagement: "Engagement lift",
      bars: [
        { label: "W1", value: "24%", height: "35%" },
        { label: "W2", value: "38%", height: "52%" },
        { label: "W3", value: "52%", height: "72%" },
        { label: "W4", value: "68%", height: "94%" },
      ],
    },
  },
} as const;

export type MarketingChannel = (typeof marketing.channels)[number];
export type MarketingChannelId = MarketingChannel["id"];
