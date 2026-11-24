import { Check } from "lucide-react";
import { sales } from "@/content/sales";
import { useLeadModal } from "@/components/lead/LeadModal";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Claim } from "@/components/system/Claim";
import { Button, Card, SectionHeading } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

export function BusinessBenefits() {
  return (
    <section className="container-site" aria-labelledby="sales-outcomes-heading">
      <Reveal className="mb-8">
        <h2 id="sales-outcomes-heading" className="type-h2 text-balance">
          {sales.outcomesLabel}
        </h2>
      </Reveal>
      <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {sales.benefits.map((benefit) => (
          <RevealItem key={benefit.title}>
            <Card
              as="article"
              className="relative h-full overflow-hidden border-t-orange/70 p-4 pt-6 sm:p-7"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-grad" aria-hidden />
              <p className="flex min-h-[1lh] items-baseline font-display text-[clamp(2.35rem,4vw,3.7rem)] font-extrabold leading-none tabular-nums [font-variation-settings:'wdth'_120]">
                <Claim id={benefit.claimId} countUp className="text-grad" />
              </p>
              <h3 className="mt-4 min-h-[2lh] text-balance font-display text-base font-bold leading-tight [font-variation-settings:'wdth'_110] sm:text-xl">
                {benefit.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {benefit.body}
              </p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export function Pricing() {
  const { open } = useLeadModal();
  return (
    <section
      id="pricing"
      className="container-site scroll-mt-24 section-y"
      aria-labelledby="pricing-heading"
    >
      <Reveal>
        <SectionHeading id="pricing-heading" title={sales.pricing.headline} align="center" />
      </Reveal>
      <RevealGroup className="mt-12 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
        {sales.pricing.tiers.map((tier) => {
          const popular = tier.id === "growth";
          return (
            <RevealItem key={tier.id} className={cn(popular && "order-first lg:order-none")}>
              <Card
                as="article"
                className={cn(
                  "relative flex h-full flex-col overflow-visible p-6 sm:p-8",
                  popular
                    ? "border-orange bg-grad text-ink shadow-glow-lg before:hidden lg:scale-[1.03]"
                    : "bg-surface",
                )}
              >
                {popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-orange/40 bg-ink px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground shadow-glow-sm">
                    {sales.pricing.popular}
                  </span>
                )}
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-extrabold [font-variation-settings:'wdth'_115]">
                    {tier.name}
                  </h3>
                  <span
                    className={cn("size-2 rounded-full", popular ? "bg-ink" : "bg-orange")}
                    aria-hidden
                  />
                </div>
                <p
                  className={cn(
                    "mt-3 min-h-12 text-sm leading-relaxed",
                    popular ? "text-ink/70" : "text-muted-foreground",
                  )}
                >
                  {tier.subtitle}
                </p>
                <div className="mt-7 flex min-h-16 flex-wrap items-end gap-x-2 gap-y-1">
                  <span
                    className={cn(
                      "font-display font-extrabold leading-none [font-variation-settings:'wdth'_120]",
                      popular
                        ? "text-[clamp(2.5rem,4vw,3.5rem)]"
                        : "text-[clamp(2.25rem,3.5vw,3.15rem)]",
                    )}
                  >
                    <Claim id={`price-${tier.id}`} />
                  </span>
                  {tier.cadence && (
                    <span
                      className={cn(
                        "pb-1 font-mono text-[10px]",
                        popular ? "text-ink/60" : "text-muted-foreground",
                      )}
                    >
                      {tier.cadence}
                    </span>
                  )}
                </div>
                <div className={cn("my-7 h-px", popular ? "bg-ink/15" : "bg-line")} />
                <ul className="flex-1 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-start gap-3 text-sm leading-relaxed",
                        popular ? "text-ink/85" : "text-foreground/85",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          popular ? "bg-ink text-amber" : "bg-orange/10 text-orange",
                        )}
                      >
                        <Check className="size-3" strokeWidth={2.4} aria-hidden />
                      </span>
                      <Claim id={`pricing-${tier.id}-feature-${featureIndex + 1}`} />
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => open(sales.hero.interest)}
                  className={cn(
                    "mt-9 w-full",
                    popular
                      ? "border border-ink bg-ink bg-none text-foreground hover:shadow-none"
                      : "text-ink",
                  )}
                >
                  {tier.cta}
                </Button>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
