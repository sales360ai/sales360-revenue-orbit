import { Link } from "@tanstack/react-router";
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
          {/* TODO: add founder portrait at /assets/founder-viswa.jpg or .png. */}
          <svg
            viewBox="0 0 360 450"
            className="absolute inset-x-0 bottom-0 h-[92%] w-full"
            role="img"
            aria-label="Viswa Korapala"
          >
            <defs>
              <linearGradient id="portrait-silhouette" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--surface-3)" />
                <stop offset=".55" stopColor="var(--bg)" />
                <stop offset="1" stopColor="var(--orange-deep)" />
              </linearGradient>
              <radialGradient id="portrait-rim" cx="85%" cy="35%">
                <stop offset="0" stopColor="var(--orange)" stopOpacity=".75" />
                <stop offset=".45" stopColor="var(--surface-2)" stopOpacity=".2" />
                <stop offset="1" stopColor="var(--bg)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M67 450 C71 351 100 309 146 293 L144 261 C119 241 108 207 111 163 C115 105 141 72 183 72 C229 72 251 110 247 169 C244 214 232 244 211 261 L209 294 C264 310 295 358 301 450 Z"
              fill="url(#portrait-silhouette)"
            />
            <path
              d="M212 91 C244 113 252 151 244 194 C239 227 226 251 211 261 L209 294 C264 310 295 358 301 450"
              fill="none"
              stroke="var(--orange)"
              strokeOpacity=".7"
              strokeWidth="3"
            />
            <path
              d="M67 450 C71 351 100 309 146 293 L180 332 L209 294 C264 310 295 358 301 450"
              fill="url(#portrait-rim)"
            />
            <path
              d="M145 294 L180 332 L210 294 L229 305 L204 365 L180 340 L157 365 L130 307 Z"
              fill="var(--bg)"
              fillOpacity=".65"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/70 to-transparent" />
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
  return (
    <section className="container-site pb-8 sm:pb-12" aria-labelledby="industries-heading">
      <Reveal>
        <SectionHeading id="industries-heading" title={home.industries.headline} align="center" />
      </Reveal>
      <Reveal delay={0.08}>
        <div className="edge-fade mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
          {home.industries.items.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <Link
                key={industry.id}
                to="/industries"
                hash={industry.id}
                className={cn(
                  "group flex min-h-14 shrink-0 snap-center items-center gap-3 rounded-full border bg-surface px-5 text-sm font-semibold transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-orange",
                  industry.flagship ? "border-orange/60" : "border-line-strong",
                )}
              >
                <Icon className="size-4 text-orange" strokeWidth={1.7} aria-hidden />
                <span>{industry.label}</span>
                {industry.flagship && (
                  <span className="rounded-full bg-orange px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-ink">
                    {home.industries.flagship}
                  </span>
                )}
                <ArrowRight
                  className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-orange"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
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
