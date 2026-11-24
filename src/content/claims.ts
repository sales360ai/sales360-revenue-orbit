import { sales } from "./sales";

export type ClaimStatus = "founder-stated" | "unverified" | "illustrative" | "verified";

export type ClaimRecord = {
  id: string;
  text: string;
  pages: string[];
  status: ClaimStatus;
  note: string;
};

const pricingAmountClaims: ClaimRecord[] = sales.pricing.tiers.map((tier) => ({
  id: `price-${tier.id}`,
  text: tier.price,
  pages: ["/sales"],
  status: "unverified",
  note:
    tier.id === "enterprise"
      ? "Confirm the Enterprise pricing approach and sales qualification process."
      : `Confirm the ${tier.name} monthly amount, taxes and billing terms.`,
}));

const pricingInclusionClaims: ClaimRecord[] = sales.pricing.tiers.flatMap((tier) =>
  tier.features.map((text, index) => ({
    id: `pricing-${tier.id}-feature-${index + 1}`,
    text,
    pages: ["/sales"],
    status: "unverified",
    note: `Confirm that the ${tier.id} plan includes this exact feature and limit.`,
  })),
);

/** Claims remain visible as supplied, but are explicitly tracked for client verification. */
export const claims: ClaimRecord[] = [
  {
    id: "years-experience",
    text: "20+ Years",
    pages: ["/"],
    status: "founder-stated",
    note: "Founder-stated sales and growth leadership experience.",
  },
  {
    id: "founder-years",
    text: "20+",
    pages: ["/"],
    status: "founder-stated",
    note: "Founder-stated years of B2B and enterprise sales experience.",
  },
  {
    id: "growth-projects",
    text: "1,000+",
    pages: ["/"],
    status: "founder-stated",
    note: "Founder-stated number of growth projects delivered.",
  },
  {
    id: "trusted-founders",
    text: "Trusted by 100+ founders",
    pages: ["/"],
    status: "founder-stated",
    note: "Confirm the founder count and approval to use this trust statement.",
  },
  {
    id: "trusted-advisors",
    text: "100+",
    pages: ["/"],
    status: "founder-stated",
    note: "Founder-stated number of founders advised.",
  },
  {
    id: "response-time",
    text: "< 60 Sec",
    pages: ["/"],
    status: "unverified",
    note: "Confirm the measured automated lead response time and conditions.",
  },
  {
    id: "pipeline-lift",
    text: "3.4X",
    pages: ["/"],
    status: "unverified",
    note: "Confirm the pipeline conversion baseline, cohort and measurement period.",
  },
  {
    id: "cloud-uptime",
    text: "99.9%",
    pages: ["/", "/tech-cloud"],
    status: "unverified",
    note: "Confirm the uptime SLA, exclusions and reporting period.",
  },
  {
    id: "paid-leads-lost",
    text: "up to 50%",
    pages: ["/"],
    status: "unverified",
    note: "Supply a source for the paid-lead loss estimate or revise the statement.",
  },
  {
    id: "faster-response",
    text: "10X",
    pages: ["/sales"],
    status: "unverified",
    note: "Claim wording: 10X faster response. Confirm the comparison baseline.",
  },
  {
    id: "close-rate",
    text: "+35%",
    pages: ["/sales"],
    status: "unverified",
    note: "Claim wording: +35% close rate. Confirm cohort, baseline and period.",
  },
  {
    id: "admin-work",
    text: "70%",
    pages: ["/sales"],
    status: "unverified",
    note: "Claim wording: 70% less admin work. Confirm the measured workflow and baseline.",
  },
  {
    id: "pipeline-visibility",
    text: "100%",
    pages: ["/sales"],
    status: "unverified",
    note: "Confirm the intended meaning of 100% pipeline visibility.",
  },
  {
    id: "whatsapp-open-rate",
    text: "98%",
    pages: ["/marketing"],
    status: "unverified",
    note: "Confirm the WhatsApp open-rate source, audience and campaign conditions.",
  },
  {
    id: "revenue-in-30-days",
    text: "within 30 days",
    pages: [],
    status: "unverified",
    note: "Retired from the closing banner; do not restore without evidence and approval.",
  },
  {
    id: "launch-timeline",
    text: "within 7 to 14 days",
    pages: ["/contact"],
    status: "unverified",
    note: "Confirm the typical Sales 360 launch range and any prerequisites.",
  },
  ...pricingAmountClaims,
  ...pricingInclusionClaims,
];

export function getClaim(id: string) {
  const claim = claims.find((item) => item.id === id);
  if (!claim) throw new Error(`Unknown claim: ${id}`);
  return claim;
}
