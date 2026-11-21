import type { Interest } from "./global";

export const home = {
  meta: {
    title: "Sales360.ai | AI Revenue, Marketing & Cloud Partner",
    description:
      "Sales360.ai unifies your AI Sales Command Center, multi-channel marketing, workflow automation, and secure cloud infrastructure into one predictable growth engine.",
  },
  hero: {
    eyebrow: "AI-POWERED REVENUE & CLOUD ECOSYSTEM",
    line1: "Turn Every Lead Into Revenue—",
    line2: "Automatically",
    sub: "Sales360.ai unifies your AI Sales Command Center, multi-channel marketing, workflow automation, and secure cloud infrastructure into one predictable growth engine.",
    primary: "Book Free Demo",
    primaryInterest: "Full Ecosystem" as Interest,
    secondary: "Explore AI Command Center",
    trust: "Trusted by 100+ founders",
    micro: "Free 15-min strategy call · Reply within 4 business hours",
    channels: ["WhatsApp", "Email", "Meta", "Google", "Instagram", "LinkedIn"],
    leadCard: {
      prospect: "Rohit M.",
      message: "Need a quote for 200 units",
      reply: "Hi Rohit — happy to help. Which city should we deliver to?",
      chip: "Replied in 8s",
    },
    pipeline: {
      title: "Live pipeline",
      stages: [
        { label: "New", value: "24", width: "92%" },
        { label: "Qualified", value: "11", width: "64%" },
        { label: "Quote", value: "6", width: "43%" },
        { label: "Won", value: "3", width: "28%" },
      ],
    },
    score: { label: "Hot · 92", source: "Meta Ads", intent: "High intent" },
    revenue: { label: "Pipeline ₹48.6L", delta: "+18.4%" },
    inbox: {
      title: "Lead Inbox",
      status: "AI responding",
      leads: [
        {
          initials: "RM",
          name: "Rohit Mehta",
          source: "WhatsApp",
          detail: "Quote requested · 200 units",
          time: "now",
        },
        {
          initials: "AS",
          name: "Ananya Shah",
          source: "Meta",
          detail: "Pricing page · Demo intent",
          time: "1m",
        },
        {
          initials: "VK",
          name: "Vikram Rao",
          source: "Email",
          detail: "Replied to proposal",
          time: "3m",
        },
        {
          initials: "NS",
          name: "Neha Singh",
          source: "Google",
          detail: "New qualified inquiry",
          time: "5m",
        },
      ],
    },
    board: {
      title: "Revenue Pipeline",
      total: "₹48.6L",
      columns: [
        {
          title: "Qualified",
          count: "11",
          deals: [
            { name: "Aarav Industries", value: "₹8,40,000" },
            { name: "Nivaan Retail", value: "₹4,25,000" },
          ],
        },
        {
          title: "Proposal",
          count: "6",
          deals: [
            { name: "Siya Healthcare", value: "₹12,75,000" },
            { name: "Kian Enterprises", value: "₹6,80,000" },
          ],
        },
        {
          title: "Won",
          count: "3",
          deals: [
            { name: "Riya Ventures", value: "₹9,60,000" },
            { name: "Arjun & Co.", value: "₹5,20,000" },
          ],
        },
      ],
    },
  },
  proof: [
    { value: "20+ Years", label: "Front-Line Sales & Growth Leadership" },
    { value: "< 60 Sec", label: "Automated AI Lead Response Time" },
    { value: "3.4X", label: "Average Pipeline Conversion Lift" },
    { value: "99.9%", label: "Managed Cloud Uptime & Security" },
  ],
  pillars: {
    headline: "Everything You Need to Acquire, Convert, and Scale",
    cards: [
      {
        id: "sales",
        number: "01",
        title: "Sales (AI Command Center)",
        body: "Capture every inquiry, automate instant WhatsApp and email follow-ups, prevent revenue leakage, and track every deal in real time.",
        link: "Explore Sales",
        to: "/sales",
        tone: "orange",
      },
      {
        id: "marketing",
        number: "02",
        title: "Growth Marketing",
        body: "High-intent Google & Meta ads, SEO/AEO, social media, WhatsApp, email, telecalling, and video campaigns engineered for ROI.",
        link: "Explore Marketing",
        to: "/marketing",
        tone: "paper",
      },
      {
        id: "automation",
        number: "03",
        title: "AI Automation",
        body: "Eliminate repetitive manual tasks with custom AI agents for WhatsApp conversations, email sequences, and content creation.",
        link: "Explore Automation",
        to: "/automation",
        tone: "charcoal",
      },
      {
        id: "tech-cloud",
        number: "04",
        title: "Tech & Cloud",
        body: "Enterprise VPS/cloud hosting, proactive cybersecurity, and 24/7 technical support that keeps your business running without downtime.",
        link: "Explore Tech & Cloud",
        to: "/tech-cloud",
        tone: "black",
      },
    ],
  },
  difference: {
    headline: "Great Products Fail Without a Fast Sales Engine",
    body: "Most businesses lose up to 50% of their paid leads to slow responses, disconnected tools, and missed follow-ups. Sales360.ai fixes the leaks—connecting your marketing directly to an AI-driven sales system that engages buyers the second they show interest.",
    checkpoints: [
      {
        lead: "Zero Missed Leads:",
        text: "Instant 24/7 engagement across WhatsApp, web, and phone.",
      },
      {
        lead: "One Unified System:",
        text: "Marketing, CRM, automation, and cloud managed under one roof.",
      },
      {
        lead: "Built for Business Owners:",
        text: "Clear dashboards and measurable ROI—no technical headaches.",
      },
    ],
    graphicLabels: ["Leaky funnel", "Sealed pipeline"],
  },
  founder: {
    eyebrow: "LEADERSHIP & VISION",
    headline: "Built on 20+ Years of Real-World Sales Mastery",
    name: "Mr. Viswa Korapala",
    title: "Founder & Chief Revenue Architect, Sales360.ai",
    body: "After two decades of building high-performing sales teams and scaling businesses across India and global markets, Viswa Korapala founded Sales360.ai with a clear mission: give growing businesses the exact AI systems, marketing precision, and cloud reliability once reserved for Fortune 500 enterprises.",
    credentials: [
      { value: "20+", label: "20+ Years B2B & Enterprise Sales" },
      { value: "1,000+", label: "1,000+ Growth Projects Delivered" },
      { value: "100+", label: "Trusted Advisor to 100+ Founders" },
    ],
  },
  industries: {
    headline: "Tailored for High-Growth Sectors",
    flagship: "Flagship",
    items: [
      {
        label: "E-Commerce & D2C",
        id: "e-commerce",
        icon: "shopping",
        flagship: true,
        overview:
          "Acquire high-intent shoppers, recover abandoned checkouts on WhatsApp, and build repeat purchases with fast, reliable commerce infrastructure.",
        points: [
          "Meta & Google acquisition",
          "Abandoned cart & COD verification",
          "Retention & reorder automation",
        ],
      },
      {
        label: "Healthcare",
        id: "healthcare",
        icon: "health",
        flagship: false,
        overview:
          "Respond to every patient inquiry, simplify appointment booking, and reduce no-shows with always-on communication and secure infrastructure.",
        points: [
          "24/7 WhatsApp appointment booking",
          "Automated patient reminders",
          "Local Google & SEO growth",
        ],
      },
      {
        label: "Real Estate",
        id: "real-estate",
        icon: "building",
        flagship: false,
        overview:
          "Qualify property inquiries instantly, share the right project information, and keep site visits moving without manual follow-up delays.",
        points: [
          "Instant AI lead qualification",
          "Brochure & floor-plan delivery",
          "Site-visit reminder sequences",
        ],
      },
      {
        label: "Manufacturing",
        id: "manufacturing",
        icon: "factory",
        flagship: false,
        overview:
          "Turn complex RFQs into structured opportunities with faster quotations, targeted B2B acquisition, and reliable distributor experiences.",
        points: [
          "Automated RFQ capture",
          "Instant digital quote generation",
          "B2B search & LinkedIn lead generation",
        ],
      },
      {
        label: "B2B Services",
        id: "b2b-services",
        icon: "briefcase",
        flagship: false,
        overview:
          "Create a consistent outbound engine, build category authority, and move qualified prospects into discovery calls without founder-led bottlenecks.",
        points: [
          "LinkedIn & email outbound automation",
          "AEO & SEO thought leadership",
          "Automated discovery call booking",
        ],
      },
      {
        label: "Education",
        id: "education",
        icon: "education",
        flagship: false,
        overview:
          "Handle seasonal admission demand with instant counseling, timely reminders, and student acquisition campaigns built around conversion.",
        points: [
          "AI admission counselor bots",
          "Webinar & campus tour reminders",
          "Student acquisition ads",
        ],
      },
    ],
  },
  testimonials: [
    {
      quote:
        "Viswa and the Sales360 team transformed our digital acquisition and online sales operations into a predictable revenue machine.",
      name: "Abhishek",
      role: "Director, Powerzone Pvt Ltd",
      initials: "AB",
    },
    {
      quote:
        "Sales360 streamlined our patient inquiry handling and multi-branch growth with sharp execution and speed.",
      name: "Dr. Swetha",
      role: "Managing Director, Partha Hospital",
      initials: "DS",
    },
    {
      quote:
        "A true one-stop partner for sales automation and cloud reliability. Our pipeline bottlenecks disappeared within weeks.",
      name: "Ashwin",
      role: "Founder, MSK Solutions",
      initials: "AS",
    },
  ],
} as const;
