import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  Check,
  FileCheck2,
  FileText,
  Globe2,
  Inbox,
  PhoneCall,
  Radar,
  Send,
  Smile,
} from "lucide-react";
import { sales } from "@/content/sales";
import { BrandIcon } from "@/components/home/BrandIcon";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card, Chip, SectionHeading } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const featureIcons = {
  inbox: Inbox,
  qualification: Bot,
  quotation: FileText,
  radar: Radar,
  voice: PhoneCall,
  dashboard: BarChart3,
};

const gridSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "md:col-span-2 lg:col-span-12",
];

function MockFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mt-auto rounded-2xl border border-line bg-background/65 p-4 shadow-inset-top",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ChannelIcon({ name }: { name: string }) {
  if (name === "Web form") return <Globe2 className="size-3.5" aria-hidden />;
  return <BrandIcon name={name} className="size-3.5" />;
}

function InboxMock() {
  return (
    <MockFrame className="space-y-1.5">
      {sales.mocks.channels.map((channel) => (
        <div
          key={channel.name}
          className="flex items-center gap-3 rounded-xl border border-line/70 bg-surface/70 px-3 py-2"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-orange/20 bg-orange/[.07] text-orange">
            <ChannelIcon name={channel.name} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold">{channel.lead}</p>
            <p className="truncate text-[9px] text-muted-foreground">
              {channel.name} · {channel.detail}
            </p>
          </div>
          {channel.unread && (
            <span
              className="size-2 shrink-0 rounded-full bg-orange animate-pulse-dot"
              aria-label="Unread"
            />
          )}
        </div>
      ))}
    </MockFrame>
  );
}

function QualificationMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [score, setScore] = useState(reduce ? 92 : 40);

  useEffect(() => {
    if (reduce) {
      setScore(92);
      return;
    }
    if (!inView) return;
    const controls = animate(40, 92, {
      duration: 1.4,
      onUpdate: (value) => setScore(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <MockFrame>
      <div ref={ref} className="space-y-2.5">
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-orange/20 bg-orange/[.08] p-3">
          <p className="mb-1 font-mono text-[8px] uppercase tracking-wider text-amber">
            {sales.mocks.aiLabel}
          </p>
          <p className="text-[10px] leading-relaxed text-foreground/90">
            {sales.mocks.qualificationQuestion}
          </p>
        </div>
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-surface-3 p-3 text-[10px] leading-relaxed text-foreground/90">
          {sales.mocks.qualificationAnswer}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface/70 p-3">
        <div className="relative size-12 shrink-0">
          <svg viewBox="0 0 48 48" className="size-12 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="19" fill="none" stroke="var(--surface-3)" strokeWidth="4" />
            <circle
              cx="24"
              cy="24"
              r="19"
              fill="none"
              stroke="var(--orange)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="119.4"
              strokeDashoffset={119.4 - (119.4 * score) / 100}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center font-display text-xs font-bold">
            {score}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            {sales.mocks.intent}
          </p>
          <Chip tone="orange" className="mt-1.5 normal-case tracking-normal">
            <CalendarCheck className="mr-1.5 size-3" aria-hidden />
            {sales.mocks.meeting}
          </Chip>
        </div>
      </div>
    </MockFrame>
  );
}

function QuotationMock() {
  return (
    <MockFrame>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            {sales.mocks.quoteLabel}
          </p>
          <p className="mt-2 font-display text-2xl font-extrabold text-foreground">
            {sales.mocks.quoteValue}
          </p>
        </div>
        <span className="grid size-10 place-items-center rounded-xl bg-orange/10 text-orange">
          <FileCheck2 className="size-5" aria-hidden />
        </span>
      </div>
      <div className="relative mt-6 grid grid-cols-4 gap-1">
        <div className="absolute left-[10%] right-[10%] top-2 h-px bg-orange/30" aria-hidden />
        {sales.mocks.quoteSteps.map((step, index) => (
          <div key={step} className="relative z-10 flex min-w-0 flex-col items-center text-center">
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border border-orange bg-background",
                index === 0 && "bg-orange text-ink",
              )}
            >
              {index === 0 ? (
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

function RadarMock() {
  const blips = [
    { left: "68%", top: "23%", delay: "0s" },
    { left: "27%", top: "58%", delay: "1.1s" },
    { left: "62%", top: "70%", delay: "2.2s" },
  ];
  return (
    <MockFrame className="border-orange/20 bg-orange/[.025]">
      <div className="flex items-center justify-center gap-5">
        <div className="relative size-36 shrink-0 overflow-hidden rounded-full border border-orange/40 bg-orange/[.035] shadow-glow-sm">
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
        <div>
          <p className="font-mono text-[8px] uppercase tracking-wider text-amber">
            {sales.mocks.radarLabel}
          </p>
          <div className="mt-3 space-y-2">
            {sales.mocks.radarLegend.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-5 text-[9px]">
                <span className="text-muted-foreground">{item.label}</span>
                <strong className="font-mono text-foreground">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

const waveHeights = [
  32, 48, 72, 44, 88, 62, 38, 78, 96, 54, 70, 42, 84, 58, 34, 68, 90, 48, 74, 40, 60, 82, 46, 66,
];

function VoiceMock() {
  return (
    <MockFrame>
      <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {sales.mocks.callLabel}
      </p>
      <div className="mt-5 flex h-16 items-center gap-1" aria-hidden>
        {waveHeights.map((height, index) => (
          <span
            key={`${height}-${index}`}
            className="wave-bar h-full flex-1 origin-center rounded-full bg-grad"
            style={{ height: `${height}%`, animationDelay: `${index * -0.07}s` }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Chip tone="orange" className="normal-case tracking-normal">
          <Smile className="mr-1.5 size-3" aria-hidden />
          {sales.mocks.sentiment}
        </Chip>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[8px] text-muted-foreground">
          <Send className="size-3 text-orange" aria-hidden />
          {sales.mocks.recap}
        </span>
      </div>
    </MockFrame>
  );
}

function Sparkline({ points }: { points: string }) {
  return (
    <svg viewBox="0 0 100 34" className="h-9 w-full" aria-hidden>
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

function DashboardMock() {
  return (
    <MockFrame className="lg:p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <div className="grid grid-cols-3 gap-2.5">
          {sales.mocks.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="min-w-0 rounded-xl border border-line bg-surface/65 p-3"
            >
              <p className="truncate font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </p>
              <p className="mt-2 font-display text-lg font-extrabold text-foreground sm:text-xl">
                {kpi.value}
              </p>
              <Sparkline points={kpi.points} />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-line bg-surface/65 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
                {sales.mocks.forecast}
              </p>
              <p className="mt-1 font-display text-xl font-extrabold text-amber">
                {sales.mocks.forecastValue}
              </p>
            </div>
            <span className="font-mono text-[8px] text-dim">{sales.mocks.forecastPeriod}</span>
          </div>
          <svg
            viewBox="0 0 360 90"
            className="mt-2 h-20 w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="sales-forecast-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--orange)" stopOpacity=".3" />
                <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 76 C45 69 60 52 92 59 S145 62 173 39 S221 52 250 30 S310 28 360 7 L360 90 L0 90 Z"
              fill="url(#sales-forecast-fill)"
            />
            <path
              d="M0 76 C45 69 60 52 92 59 S145 62 173 39 S221 52 250 30 S310 28 360 7"
              fill="none"
              stroke="var(--orange)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="360" cy="7" r="4" fill="var(--orange-amber)" />
          </svg>
        </div>
      </div>
    </MockFrame>
  );
}

const mockComponents = {
  inbox: InboxMock,
  qualification: QualificationMock,
  quotation: QuotationMock,
  radar: RadarMock,
  voice: VoiceMock,
  dashboard: DashboardMock,
};

export function FeatureBento() {
  return (
    <section className="container-site section-y" aria-labelledby="sales-features-heading">
      <Reveal>
        <SectionHeading
          id="sales-features-heading"
          title={sales.features.headline}
          className="max-w-4xl"
        />
      </Reveal>
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {sales.features.items.map((feature, index) => {
          const Icon = featureIcons[feature.id];
          const Mock = mockComponents[feature.id];
          return (
            <RevealItem key={feature.id} className={cn("min-w-0", gridSpans[index])}>
              <Card
                as="article"
                className={cn(
                  "flex h-full min-h-[440px] flex-col gap-7 p-5 sm:p-6",
                  feature.id === "radar" && "border-orange/45 shadow-glow-sm",
                  feature.id === "dashboard" && "min-h-0",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-dim">
                      {feature.number}
                    </span>
                    <span className="grid size-11 place-items-center rounded-2xl border border-orange/25 bg-orange/[.08] text-orange">
                      <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight [font-variation-settings:'wdth'_105]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
                <Mock />
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
