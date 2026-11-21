import type { Interest } from "./global";

export const techCloud = {
  meta: {
    title: "Managed Cloud, VPS Hosting & Cybersecurity | Sales360.ai",
    description:
      "High-speed managed VPS and cloud hosting, proactive cybersecurity, and 24/7 dedicated engineering support from Sales360.ai.",
  },
  hero: {
    eyebrow: "MANAGED CLOUD, SECURITY & INFRASTRUCTURE",
    titleLead: "Fast, Fortress-Grade Cloud Infrastructure",
    accent: "Managed 24/7",
    sub: "Eliminate slow load times, server crashes, and security vulnerabilities. Sales360.ai delivers high-speed VPS/cloud hosting, proactive cybersecurity, and dedicated engineering support.",
    primary: "Request Infrastructure Audit",
    interest: "Tech & Cloud" as Interest,
  },
  console: {
    title: "Cloud operations",
    status: "All systems operational",
    uptime: "99.9%",
    uptimeLabel: "Uptime SLA",
    metrics: [
      {
        label: "CPU",
        value: "34%",
        paths: [
          "M0 42 C18 40 22 31 40 34 S70 45 90 30 S120 20 140 26 S170 36 200 22",
          "M0 38 C18 34 26 42 44 32 S72 22 92 29 S124 39 142 25 S174 18 200 28",
          "M0 40 C20 44 28 28 46 31 S74 38 94 25 S122 21 144 30 S176 34 200 20",
        ],
      },
      {
        label: "Memory",
        value: "62%",
        paths: [
          "M0 36 C20 30 30 38 48 28 S78 20 96 29 S124 38 144 26 S176 21 200 24",
          "M0 34 C18 38 30 25 48 30 S76 39 98 27 S126 18 146 24 S176 33 200 22",
          "M0 38 C20 32 32 34 50 25 S82 30 98 23 S128 35 148 27 S176 18 200 26",
        ],
      },
      {
        label: "Network",
        value: "1.2 Gbps",
        paths: [
          "M0 43 C20 42 28 32 46 36 S76 40 96 25 S126 37 146 30 S174 12 200 20",
          "M0 40 C18 30 32 39 48 31 S78 22 98 32 S126 40 146 24 S178 26 200 16",
          "M0 42 C20 36 30 28 50 34 S80 42 100 28 S128 18 148 29 S176 35 200 22",
        ],
      },
    ],
    wafLabel: "WAF: blocked requests",
    wafStart: 1284,
    backup: "Last backup 02:00 · Off-site ✓",
    region: "Mumbai · 18 ms",
  },
  hosting: {
    headline: "High-Speed Cloud & VPS Hosting Built for Zero Downtime",
    description:
      "Dedicated compute resources engineered for high-traffic websites, e-commerce stores, and mission-critical business applications.",
    specs: [
      {
        lead: "Dedicated NVMe SSD & vCPU Performance",
        text: "Ultra-fast page loads that boost SEO and checkout conversions.",
      },
      {
        lead: "99.9% Uptime SLA & Auto-Scaling",
        text: "Seamless traffic spike handling during major sales and ad campaigns.",
      },
      {
        lead: "Automated Daily Off-Site Backups",
        text: "One-click disaster recovery with zero data loss.",
      },
      {
        lead: "Zero-Downtime Migration",
        text: "Our engineers migrate your existing sites and apps safely at no extra hassle.",
      },
    ],
    panel: {
      title: "Resource allocation",
      status: "Auto-scaling ready",
      gauges: [
        { label: "vCPU", value: "42%", width: "42%" },
        { label: "NVMe storage", value: "68%", width: "68%" },
        { label: "Bandwidth", value: "54%", width: "54%" },
      ],
      scalingLabel: "Traffic absorbed automatically",
      scalingDetail: "Campaign spike · resources balanced",
      migration: "Zero-downtime migration",
      source: "Source",
      destination: "Sales360 cloud",
      complete: "100%",
      steps: ["Files copied", "Database synced", "DNS verified"],
      backup: "Daily off-site backups · 02:00",
    },
  },
  security: {
    headline: "Proactive Cybersecurity That Protects Your Data & Reputation",
    protected: "Protected ✓",
    cards: [
      {
        title: "Web Application Firewall (WAF) & DDoS Shield",
        body: "Block malicious bots, brute-force logins, and traffic attacks before they hit your server.",
      },
      {
        title: "24/7 Malware Scanning & Patching",
        body: "Continuous vulnerability monitoring and automated OS/application security updates.",
      },
      {
        title: "End-to-End SSL & Data Encryption",
        body: "Strict TLS encryption and secure access controls protecting customer and payment data.",
      },
      {
        title: "Compliance & Access Governance",
        body: "Role-based permissions, SSH hardening, and regular security posture audits.",
      },
    ],
  },
  support: {
    headline: "Real Cloud Engineers On Call Whenever You Need Them",
    presence: "Engineer on call",
    cards: [
      {
        title: "24/7 Proactive Server Monitoring",
        body: "We detect and resolve CPU, memory, or network anomalies before your customers ever notice.",
      },
      {
        title: "Rapid Incident Response",
        body: "Direct escalation to senior Linux/cloud engineers—never stuck in endless ticket queues.",
      },
      {
        title: "Ongoing Performance Tuning",
        body: "Regular database optimization, caching configuration, and speed audits.",
      },
    ],
    monitoring: {
      label: "Live infrastructure",
      anomaly: "Anomaly flagged",
      resolved: "Anomaly auto-resolved",
    },
    incident: {
      label: "Incident INC-2048",
      engineer: "Ravi · Senior cloud engineer",
      initials: "RK",
      steps: [
        { label: "Alert", time: "02:14:08" },
        { label: "Escalated", time: "02:14:31" },
        { label: "Resolved", time: "02:17:45" },
      ],
    },
    tuning: {
      label: "Optimization checklist",
      items: ["Database optimised", "Cache configured", "Speed audit"],
      status: "Performance baseline updated",
    },
  },
} as const;
