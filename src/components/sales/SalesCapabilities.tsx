import type { ReactNode } from "react";
import { BarChart3, Bot, Check, FileText, Inbox, PhoneCall, Radar, TrendingUp } from "lucide-react";
import { sales } from "@/content/sales";
import { BrandIcon } from "@/components/home/BrandIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card, SampleDataChip } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const featureIcons = {
  inbox: Inbox,
  qualification: Bot,
  quotation: FileText,
  radar: Radar,
  voice: PhoneCall,
  dashboard: BarChart3,
};

function MockFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mt-auto rounded-2xl border border-line bg-background/65 p-3.5 shadow-inset-top",
        className,
      )}
    >
      <div className="mb-3 flex justify-end">
        <SampleDataChip />
      </div>
      {children}
    </div>
  );
}

function RecoveryVisual() {
  const blips = [
    { left: "68%", top: "23%", delay: "0s" },
    { left: "27%", top: "58%", delay: "1.1s" },
    { left: "62%", top: "70%", delay: "2.2s" },
  ];
  return (
    <MockFrame className="border-orange/20 bg-orange/[.025]">
      <div className="flex items-center justify-center gap-4">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-orange/40 bg-orange/[.035] shadow-glow-sm">
          <span className="absolute inset-[18%] rounded-full border border-orange/20" />
          <span className="absolute inset-[36%] rounded-full border border-orange/20" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-orange/15" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-orange/15" />
          <span className="radar-sweep absolute inset-0 rounded-full" />
          {blips.map((blip) => (
            <span
              key={blip.left}
              className="radar-blip absolute size-2 rounded-full bg-amber shadow-glow-sm"
              style={{ left: blip.left, top: blip.top, animationDelay: blip.delay }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[8px] uppercase tracking-wider text-amber">
            {sales.mocks.radarLabel}
          </p>
          <div className="mt-2 space-y-1.5">
            {sales.mocks.radarLegend.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 text-[9px]">
                <span className="text-muted-foreground">{item.label}</span>
                <strong className="font-mono text-foreground">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mt-5 grid grid-cols-4 gap-1 border-t border-line pt-4">
        <div className="absolute left-[10%] right-[10%] top-[21px] h-px bg-orange/30" aria-hidden />
        {sales.mocks.recoverySteps.map((step, index) => (
          <div key={step} className="relative z-10 flex min-w-0 flex-col items-center text-center">
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border border-orange bg-background",
                index === 3 && "bg-orange text-ink",
              )}
            >
              {index === 3 ? (
                <Check className="size-2.5" aria-hidden />
              ) : (
                <span className="size-1 rounded-full bg-orange" />
              )}
            </span>
            <span className="mt-2 text-[8px] leading-tight text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

function ConversationVisual() {
  return (
    <MockFrame>
      <div className="space-y-1">
        {sales.mocks.conversation.map((event, index) => (
          <div key={event.channel} className="relative flex items-center gap-3 pb-3 last:pb-0">
            {index < sales.mocks.conversation.length - 1 && (
              <span className="absolute bottom-0 left-[15px] top-8 w-px bg-orange/30" aria-hidden />
            )}
            <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-orange/30 bg-orange/[.08] text-orange">
              {event.channel === "Call" ? (
                <PhoneCall className="size-3.5" aria-hidden />
              ) : (
                <BrandIcon name={event.channel} className="size-3.5" />
              )}
            </span>
            <div className="min-w-0 flex-1 rounded-xl border border-line bg-surface/60 px-3 py-2">
              <p className="font-mono text-[7px] uppercase tracking-wider text-amber">
                {event.channel}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-foreground/90">{event.label}</p>
            </div>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

function Sparkline({ points }: { points: string }) {
  return (
    <svg viewBox="0 0 100 34" className="h-8 w-full" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke="var(--orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashboardVisual() {
  return (
    <MockFrame>
      <div className="grid grid-cols-3 gap-1.5">
        {sales.mocks.kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0 rounded-lg border border-line bg-surface/65 p-2">
            <p className="truncate font-mono text-[6px] uppercase tracking-wider text-muted-foreground">
              {kpi.label}
            </p>
            <p className="mt-1 font-display text-sm font-extrabold text-foreground">{kpi.value}</p>
            <Sparkline points={kpi.points} />
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-xl border border-line bg-surface/65 p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
              {sales.mocks.forecast}
            </p>
            <p className="mt-1 font-display text-lg font-extrabold text-amber">
              {sales.mocks.forecastValue}
            </p>
          </div>
          <TrendingUp className="size-4 text-orange" aria-hidden />
        </div>
        <svg
          viewBox="0 0 300 58"
          className="mt-1 h-12 w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 50 C38 44 50 32 77 38 S121 40 144 23 S184 33 208 18 S258 18 300 4 L300 58 L0 58 Z"
            fill="var(--orange)"
            opacity=".09"
          />
          <path
            d="M0 50 C38 44 50 32 77 38 S121 40 144 23 S184 33 208 18 S258 18 300 4"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </MockFrame>
  );
}

const differentiatorVisuals = [RecoveryVisual, ConversationVisual, DashboardVisual];

export function SalesDifferentiators() {
  return (
    <section className="container-site pb-8" aria-label={sales.differentiatorsLabel}>
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {sales.differentiators.map((item, index) => {
          const Visual = differentiatorVisuals[index] ?? RecoveryVisual;
          return (
            <RevealItem key={item.id} className="min-w-0">
              <Card
                as="article"
                className="flex h-full flex-col gap-4 p-4 sm:p-5 md:min-h-[440px] md:gap-6"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-amber">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold leading-tight [font-variation-settings:'wdth'_105]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
                <Visual />
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}

export function CapabilityStrip() {
  return (
    <section className="container-site" aria-labelledby="inside-sales-heading">
      <Reveal>
        <h2 id="inside-sales-heading" className="type-h2 text-balance">
          {sales.features.label}
        </h2>
      </Reveal>
      <RevealGroup className="mt-7 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
        {sales.features.items.map((feature) => {
          const Icon = featureIcons[feature.id];
          return (
            <RevealItem key={feature.id}>
              <Card as="article" className="h-full p-3 sm:p-5">
                <div className="flex flex-col items-start gap-3 sm:flex-row">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-orange/25 bg-orange/[.08] text-orange">
                    <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
