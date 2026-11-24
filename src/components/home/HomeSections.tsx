import { ArrowRight, Check, ShieldCheck, Workflow, Zap } from "lucide-react";
import { home } from "@/content/home";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Claim } from "@/components/system/Claim";
import { EyebrowBadge } from "@/components/system/primitives";
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
              <dt className="order-2 mt-3 min-h-[2lh] text-balance text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
                {stat.label}
              </dt>
              <dd className="order-1 flex items-baseline justify-center font-display text-[clamp(1.65rem,3.3vw,3rem)] font-extrabold leading-none tabular-nums [font-variation-settings:'wdth'_120]">
                <Claim id={stat.claimId} countUp className="text-grad" />
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
                <Claim id="paid-leads-lost" template={home.difference.body} />
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
        <Claim id="founder-years" />
      </span>
      <div className="absolute inset-x-5 bottom-0 top-12 rounded-[26px] bg-gradient-to-b from-orange/25 to-transparent p-px">
        <div className="relative h-full w-full overflow-hidden rounded-[25px] border border-orange/20 bg-surface-2 shadow-[inset_-1px_0_0_var(--orange)]">
          <div className="absolute inset-0 dotted-grid opacity-25" aria-hidden />
          <SunburstRing
            size={230}
            className="absolute -right-16 -top-12 opacity-15"
            variant="spin"
          />
          {/* TODO: add founder photo approved by Viswa */}
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-[20%] size-[26%] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange/55 via-surface-3 to-background shadow-glow-sm" />
            <div className="absolute bottom-[-9%] left-1/2 h-[61%] w-[82%] -translate-x-1/2 rounded-[50%_50%_0_0] bg-gradient-to-br from-orange/30 via-surface-3 to-background" />
            <div className="absolute bottom-[-6%] left-1/2 h-[58%] w-[78%] -translate-x-1/2 rounded-[50%_50%_0_0] border-r border-orange/45" />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/45 to-transparent"
            aria-hidden
          />
        </div>
      </div>
      <div className="absolute bottom-5 left-0 z-10 grid size-14 place-items-center rounded-2xl border border-orange/35 bg-background shadow-glow-sm">
        <SunburstRing size={32} />
      </div>
    </div>
  );
}

function Credential({ claimId, label }: { claimId: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-background/45 p-4 text-center sm:text-left">
      <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
        <Claim
          id={claimId}
          template={label}
          countUp
          claimClassName="font-display text-xl font-extrabold text-amber"
        />
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
                <Claim id="years-experience" template={f.headline} />
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
