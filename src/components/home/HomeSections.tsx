import { Link } from "@tanstack/react-router";
import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import founderPortrait from "@/assets/founder-viswa-korapala.webp.asset.json";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Factory,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  ShoppingBag,
  Workflow,
  Zap,
} from "lucide-react";
import { home } from "@/content/home";
import { CountUp, Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card, EyebrowBadge, SectionHeading } from "@/components/system/primitives";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { cn } from "@/lib/utils";

export function ProofStrip() {
  return (
    <section className="container-site pt-6 sm:pt-10" aria-label="Key proof and impact">
      <Reveal>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-line bg-surface/60 shadow-inset-top lg:grid-cols-4">
          {home.proof.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex flex-col px-4 py-7 text-center sm:px-6 sm:py-9",
                index % 2 === 1 && "border-l border-line",
                index >= 2 && "border-t border-line lg:border-t-0",
                index === 2 && "lg:border-l",
                index === 3 && "lg:border-l",
              )}
            >
              <dt className="order-2 mt-3 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-[clamp(1.65rem,3.3vw,3rem)] font-extrabold leading-none [font-variation-settings:'wdth'_120]">
                <CountUp value={stat.value} className="text-grad" />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function FunnelGraphic() {
  return (
    <div
      className="relative mt-8 overflow-hidden rounded-[24px] border border-foreground/15 bg-ink/20 p-5"
      aria-hidden
    >
      <div className="grid grid-cols-2 gap-5">
        {home.difference.graphicLabels.map((label, index) => (
          <div key={label} className="text-center">
            <span className="type-mono text-[8px] text-foreground/75">{label}</span>
            <svg viewBox="0 0 130 116" className="mx-auto mt-2 h-24 w-full">
              <path
                d="M15 15 H115 L79 56 V88 L52 99 V56 Z"
                fill="var(--bg)"
                fillOpacity={index === 0 ? ".18" : ".4"}
                stroke="var(--text)"
                strokeOpacity=".65"
                strokeWidth="1.5"
              />
              <path d="M52 56 H79" stroke="var(--text)" strokeOpacity=".3" />
              {index === 0 ? (
                <>
                  <path
                    d="M58 99 L55 112 M69 94 L73 110"
                    stroke="var(--orange-amber)"
                    strokeWidth="2"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx="55"
                    cy="107"
                    r="3"
                    fill="var(--orange-amber)"
                    className="funnel-drop"
                  />
                  <circle
                    cx="74"
                    cy="103"
                    r="2.5"
                    fill="var(--orange-amber)"
                    className="funnel-drop funnel-drop-late"
                  />
                </>
              ) : (
                <>
                  <path
                    d="M52 99 H79"
                    stroke="var(--orange-amber)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M56 72 L62 78 L74 65"
                    fill="none"
                    stroke="var(--orange-amber)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="65"
                    cy="35"
                    r="3"
                    fill="var(--orange-amber)"
                    className="funnel-catch"
                  />
                </>
              )}
            </svg>
          </div>
        ))}
      </div>
      <ArrowRight className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink p-1 text-amber" />
    </div>
  );
}

const checkpointIcons = [Zap, Workflow, ShieldCheck];

export function DifferenceBand() {
  return (
    <section className="px-3 py-8 sm:px-6 sm:py-12" aria-labelledby="difference-heading">
      <Reveal>
        <div className="problem-band relative mx-auto max-w-[1536px] overflow-hidden rounded-[32px] sm:rounded-[48px]">
          <div
            className="absolute inset-0 dotted-grid opacity-20 [mask-image:linear-gradient(90deg,#000,transparent_75%)]"
            aria-hidden
          />
          <div
            className="absolute -bottom-1/2 left-0 h-full w-2/3 bg-horizon opacity-25"
            aria-hidden
          />
          <div className="container-site relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-24">
            <div>
              <h2 id="difference-heading" className="type-h2 max-w-[12ch] text-balance">
                {home.difference.headline}
              </h2>
              <p className="mt-6 max-w-[58ch] leading-relaxed text-foreground/85">
                {home.difference.body}
              </p>
              <FunnelGraphic />
            </div>
            <RevealGroup className="space-y-4">
              {home.difference.checkpoints.map((checkpoint, index) => {
                const Icon = checkpointIcons[index] ?? Check;
                return (
                  <RevealItem key={checkpoint.lead}>
                    <div className="glass flex min-h-32 items-start gap-4 rounded-[22px] border border-foreground/15 bg-ink/45 p-5 sm:items-center sm:p-6">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-orange-deep">
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                        <strong className="mb-1 block font-semibold text-foreground">
                          {checkpoint.lead}
                        </strong>
                        {checkpoint.text}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FounderPortrait() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[390px]">
      <span
        className="founder-outline pointer-events-none absolute -left-5 top-0 z-0 font-display text-[clamp(7rem,15vw,13rem)] font-extrabold leading-none"
        aria-hidden
      >
        20+
      </span>
      <div className="absolute inset-x-5 bottom-0 top-12 rounded-[26px] bg-gradient-to-b from-orange/25 to-transparent p-px">
        <div className="relative h-full w-full overflow-hidden rounded-[25px] border border-orange/20 bg-surface-2">
          <div className="absolute inset-0 dotted-grid opacity-25" />
          <SunburstRing
            size={230}
            className="absolute -right-16 -top-12 opacity-15"
            variant="spin"
          />
          <img
            src={founderPortrait.url}
            alt="Mr. Viswa Korapala, Founder and Chief Revenue Architect of Sales360.ai"
            width="880"
            height="1100"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-[52%_center]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/45 to-transparent" />
        </div>
      </div>
      <div className="absolute bottom-5 left-0 z-10 grid size-14 place-items-center rounded-2xl border border-orange/35 bg-background shadow-glow-sm">
        <SunburstRing size={32} />
      </div>
    </div>
  );
}

function Credential({ value, label }: { value: string; label: string }) {
  const at = label.indexOf(value);
  const before = at >= 0 ? label.slice(0, at) : "";
  const after = at >= 0 ? label.slice(at + value.length) : label;
  return (
    <div className="rounded-2xl border border-line bg-background/45 p-4 text-center sm:text-left">
      <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
        {before}
        <strong className="font-display text-xl font-extrabold text-amber">
          <CountUp value={value} />
        </strong>
        {after}
      </p>
    </div>
  );
}

export function FounderSpotlight() {
  const f = home.founder;
  return (
    <section className="container-site section-y" aria-labelledby="founder-heading">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface shadow-inset-top">
          <div
            className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_35%_40%,var(--glow-spot),transparent_65%)] opacity-30"
            aria-hidden
          />
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-14 lg:p-14">
            <div className="lg:col-span-5">
              <FounderPortrait />
            </div>
            <div className="lg:col-span-7">
              <EyebrowBadge>{f.eyebrow}</EyebrowBadge>
              <h2 id="founder-heading" className="type-h2 mt-6 max-w-[14ch] text-balance">
                {f.headline}
              </h2>
              <div className="relative mt-8 w-fit pb-3">
                <h3 className="font-display text-3xl font-bold [font-variation-settings:'wdth'_110]">
                  {f.name}
                </h3>
                <svg
                  viewBox="0 0 260 12"
                  className="absolute -bottom-1 left-0 w-full text-orange"
                  aria-hidden
                >
                  <path
                    d="M3 8 C62 1 149 12 255 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-amber">
                {f.title}
              </p>
              <p className="mt-6 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                {f.body}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {f.credentials.map((credential) => (
                  <Credential key={credential.label} {...credential} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const industryIcons = {
  shopping: ShoppingBag,
  health: HeartPulse,
  building: Building2,
  factory: Factory,
  briefcase: BriefcaseBusiness,
  education: GraduationCap,
};

export function IndustriesSnapshot() {
  const [activeId, setActiveId] =
    useState<(typeof home.industries.items)[number]["id"]>("e-commerce");
  const reduce = useReducedMotion();
  const active =
    home.industries.items.find((industry) => industry.id === activeId) ?? home.industries.items[0];
  const ActiveIcon = industryIcons[active.icon];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % home.industries.items.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + home.industries.items.length) % home.industries.items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = home.industries.items.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const next = home.industries.items[nextIndex];
    if (!next) return;
    setActiveId(next.id);
    document.getElementById(`industry-tab-${next.id}`)?.focus();
  };

  return (
    <section className="container-site pb-8 sm:pb-12" aria-labelledby="industries-heading">
      <Reveal>
        <SectionHeading id="industries-heading" title={home.industries.headline} align="center" />
      </Reveal>
      <Reveal delay={0.08}>
        <div
          className="edge-fade mt-9 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0"
          role="tablist"
          aria-label="Industry overviews"
        >
          {home.industries.items.map((industry, index) => {
            const Icon = industryIcons[industry.icon];
            const selected = industry.id === active.id;
            return (
              <button
                key={industry.id}
                id={`industry-tab-${industry.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="industry-overview-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(industry.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "group flex min-h-14 shrink-0 snap-center items-center gap-2.5 rounded-full border px-4 text-sm font-semibold transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-orange",
                  selected
                    ? "border-orange bg-orange text-ink shadow-glow-sm"
                    : "border-line-strong bg-surface text-foreground",
                )}
              >
                <Icon
                  className={cn("size-4", selected ? "text-ink" : "text-orange")}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <span>{industry.label}</span>
                {industry.flagship && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 font-mono text-[8px] uppercase tracking-wider",
                      selected ? "bg-ink text-foreground" : "bg-orange text-ink",
                    )}
                  >
                    {home.industries.flagship}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.12} className="mt-5">
        <motion.div
          key={active.id}
          id="industry-overview-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active.id}`}
          className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface p-6 shadow-inset-top sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="absolute inset-0 dotted-grid opacity-20 [mask-image:linear-gradient(90deg,transparent,#000)]"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl border border-orange/30 bg-orange/10 text-orange">
                <ActiveIcon className="size-5" aria-hidden />
              </span>
              <h3 className="type-h3 mt-5">{active.label}</h3>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                {active.overview}
              </p>
              <Link
                to="/industries"
                hash={active.id}
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber"
              >
                Explore {active.label}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
            <ul className="grid gap-3">
              {active.points.map((point, index) => (
                <li
                  key={point}
                  className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-background/60 px-4 py-3 text-sm text-foreground/90"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-orange/10 font-mono text-[9px] text-amber">
                    0{index + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container-site section-y" aria-label="Client impact stories">
      <RevealGroup className="edge-fade -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {home.testimonials.map((testimonial, index) => (
          <RevealItem
            key={testimonial.name}
            className={cn(
              "w-[85vw] max-w-[390px] shrink-0 snap-center md:w-auto md:max-w-none",
              index === 1 && "md:-translate-y-4",
            )}
          >
            <Card as="article" className="flex h-full min-h-[340px] flex-col p-6 sm:p-8">
              <span className="font-display text-7xl leading-[.65] text-orange" aria-hidden>
                “
              </span>
              <blockquote className="mt-7 flex-1 text-base leading-relaxed text-foreground/90">
                {testimonial.quote}
              </blockquote>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-orange/60 bg-orange/10 font-mono text-[10px] text-amber ring-4 ring-orange/5">
                  {testimonial.initials}
                </span>
                <div>
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs italic text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
