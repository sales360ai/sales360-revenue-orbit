import { useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bell,
  FileText,
  Globe2,
  Inbox,
  LayoutGrid,
  MessageSquareText,
  Search,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { sales } from "@/content/sales";
import { BrandIcon } from "@/components/home/BrandIcon";
import { useLeadModal } from "@/components/lead/LeadModal";
import { EASE, ParallaxAccent } from "@/components/system/motion";
import {
  Button,
  DottedGridFrame,
  EyebrowBadge,
  SampleDataChip,
} from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const h = sales.hero;
const ui = sales.showcase;
const navIcons = [Inbox, Workflow, FileText, BarChart3, Bell];

function SourceIcon({ source, className = "size-3" }: { source: string; className?: string }) {
  if (source === "Web") return <Globe2 className={className} aria-hidden />;
  return <BrandIcon name={source} className={className} />;
}

function RevenueView() {
  const reduce = useReducedMotion();
  return (
    <section className="rounded-2xl border border-orange/25 bg-orange/[.045] p-3.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-3.5 text-orange" aria-hidden />
            <h3 className="text-[11px] font-semibold">{ui.revenueView}</h3>
          </div>
          <p className="mt-1 font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
            {ui.revenueContext}
          </p>
          <p className="mt-3 font-display text-2xl font-extrabold text-grad">
            {sales.mocks.forecastValue}
          </p>
          <p className="font-mono text-[7px] text-dim">
            {sales.mocks.forecast} · {sales.mocks.forecastPeriod}
          </p>
        </div>
        <svg viewBox="0 0 150 62" className="h-16 w-2/5 max-w-40" aria-hidden>
          <path
            d="M2 55 C24 50 29 35 48 41 S75 46 88 26 S119 30 148 6 L148 62 L2 62 Z"
            fill="var(--orange)"
            opacity=".08"
          />
          <motion.path
            d="M2 55 C24 50 29 35 48 41 S75 46 88 26 S119 30 148 6"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
          />
          <circle cx="148" cy="6" r="3.5" fill="var(--orange-amber)" />
        </svg>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-orange/15 pt-3">
        {sales.mocks.kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0">
            <p className="truncate font-mono text-[6px] uppercase tracking-wider text-dim">
              {kpi.label}
            </p>
            <p className="mt-1 font-display text-xs font-bold text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LifecycleStrip() {
  return (
    <div
      className="grid grid-cols-8 overflow-hidden rounded-xl border border-line bg-surface/60"
      aria-label={sales.revenueLoop.stagesLabel}
    >
      {sales.revenueLoop.stages.map((stage, index) => (
        <div
          key={stage.id}
          title={stage.label}
          className={cn(
            "relative flex min-w-0 flex-col items-center justify-center border-r border-line/70 px-0.5 py-2 text-center last:border-0",
            stage.id === "revenue-growth" && "bg-orange/10",
          )}
        >
          <span className="font-mono text-[6px] text-orange">0{index + 1}</span>
          <span className="mt-0.5 hidden w-full text-[6px] font-semibold leading-[1.25] text-muted-foreground sm:block">
            {stage.label}
          </span>
          <span className="sr-only sm:hidden">{stage.label}</span>
        </div>
      ))}
    </div>
  );
}

function LeadInbox() {
  return (
    <section className="rounded-2xl border border-line bg-background/55 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-semibold">{ui.inbox}</h3>
          <p className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
            {ui.active}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2 py-1 text-[7px] text-amber">
          <MessageSquareText className="size-2.5" aria-hidden />
          {ui.qualification}
        </span>
      </div>
      <div className="space-y-1.5">
        {ui.leads.slice(0, 2).map((lead, index) => (
          <div
            key={lead.name}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-surface/55 px-2 py-2"
          >
            <span className="grid size-7 place-items-center rounded-full border border-orange/25 bg-orange/10 font-mono text-[8px] text-amber">
              {lead.initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[9px] font-semibold">{lead.name}</span>
                <SourceIcon source={lead.source} className="size-2.5 shrink-0 text-dim" />
              </div>
              <p className="truncate text-[7px] text-muted-foreground">{lead.detail}</p>
            </div>
            <div className="text-right">
              <span className="rounded-full bg-orange/10 px-1.5 py-0.5 font-mono text-[7px] text-amber">
                {lead.intent}
              </span>
              <p className="mt-1 whitespace-nowrap font-mono text-[6px] text-dim">
                {index === 0 ? ui.response : lead.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FollowUpTimeline() {
  return (
    <section className="hidden rounded-2xl border border-line bg-background/55 p-3 sm:block">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-semibold">{ui.followUp}</h3>
        <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" aria-hidden />
      </div>
      <p className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
        {ui.followUpStatus}
      </p>
      <div className="mt-3 space-y-2.5">
        {ui.timeline.slice(0, 2).map((event) => (
          <div key={event.time} className="flex items-center gap-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-orange/30 bg-orange/10 text-orange">
              <BrandIcon name={event.channel} className="size-3" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[8px] font-medium text-foreground/90">{event.title}</p>
              <p className="font-mono text-[6px] text-dim">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportingRevenuePanels() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <LeadInbox />
      <FollowUpTimeline />
      <section className="hidden rounded-2xl border border-line bg-background/55 p-3 sm:col-span-2 sm:block">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[10px] font-semibold">{ui.quotations}</h3>
          <span className="font-mono text-[7px] text-amber">{ui.quotationTotal}</span>
        </div>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {ui.quotes.slice(0, 2).map((quote) => (
            <div
              key={quote.number}
              className="flex min-w-0 items-center gap-2 rounded-lg bg-surface/50 px-2 py-1.5 text-[7px]"
            >
              <span className="font-mono text-dim">{quote.number}</span>
              <span className="min-w-0 flex-1 truncate font-medium">{quote.client}</span>
              <span className="whitespace-nowrap font-mono">{quote.value}</span>
              <span className="rounded-full border border-orange/25 px-1.5 py-0.5 text-[6px] text-amber">
                {quote.status}
              </span>
            </div>
          ))}
        </div>
      </section>
      <div className="flex items-center gap-2.5 rounded-xl border border-orange/35 bg-orange/[.055] p-2.5 sm:col-span-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-orange text-ink">
          <Bell className="size-3" aria-hidden />
        </span>
        <div>
          <p className="font-mono text-[6px] uppercase tracking-wider text-amber">
            {ui.alertEyebrow}
          </p>
          <p className="text-[8px] font-semibold text-foreground">{ui.alert}</p>
        </div>
      </div>
    </div>
  );
}

function ProductShowcase() {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      reduce ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 6,
    });
  };

  return (
    <div className="[perspective:1400px]">
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative [transform-style:preserve-3d]"
        role="img"
        aria-label={ui.previewAlt}
      >
        <div className="overflow-hidden rounded-[20px] border border-line-strong bg-raised shadow-2xl">
          <div className="flex h-11 items-center justify-between border-b border-line bg-surface px-3.5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-orange" />
                <span className="size-2 rounded-full bg-surface-3" />
                <span className="size-2 rounded-full bg-surface-3" />
              </div>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <span className="hidden text-[9px] font-semibold sm:block">{ui.product}</span>
            </div>
            <div className="flex items-center gap-2">
              <SampleDataChip />
              <Search className="size-3 text-dim" aria-hidden />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/25 bg-orange/[.07] px-2 py-1 font-mono text-[7px] uppercase tracking-wider text-amber">
                <span className="size-1 rounded-full bg-orange animate-pulse-dot" aria-hidden />
                {ui.live}
              </span>
            </div>
          </div>
          <div className="flex">
            <aside className="hidden w-11 shrink-0 flex-col items-center gap-2 border-r border-line bg-surface/45 py-3 sm:flex">
              <span className="mb-2 grid size-7 place-items-center rounded-lg bg-grad text-ink">
                <LayoutGrid className="size-3.5" aria-hidden />
              </span>
              {navIcons.map((Icon, index) => (
                <span
                  key={ui.nav[index]}
                  title={ui.nav[index]}
                  className={cn(
                    "grid size-7 place-items-center rounded-lg border",
                    index === 3
                      ? "border-orange/30 bg-orange/10 text-orange"
                      : "border-transparent text-dim",
                  )}
                >
                  <Icon className="size-3" aria-hidden />
                </span>
              ))}
            </aside>
            <div className="min-w-0 flex-1 space-y-2 p-2.5 sm:p-3">
              <RevenueView />
              <LifecycleStrip />
              <SupportingRevenuePanels />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SalesHero() {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });
  const viewRevenueLoop = () => {
    window.history.replaceState(null, "", "#revenue-loop");
    document
      .getElementById("revenue-loop")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      className="container-site max-w-[1440px] pt-[104px] sm:pt-[120px]"
      aria-labelledby="sales-hero-title"
    >
      <DottedGridFrame className="px-5 py-12 sm:px-10 sm:py-16 lg:min-h-[720px] lg:px-12 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-20 lg:col-span-5">
            <motion.div {...rise(0.08)}>
              <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
            </motion.div>
            <motion.h1
              {...rise(0.16)}
              id="sales-hero-title"
              className="type-h1 mt-7 max-w-[15ch] text-balance lg:text-[clamp(2.5rem,3.8vw,3.5rem)]"
            >
              {h.titleLead} <span className="text-grad">{h.accent}</span>
            </motion.h1>
            <motion.p
              {...rise(0.24)}
              className="mt-6 max-w-[56ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {h.sub}
            </motion.p>
            <motion.div
              {...rise(0.32)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button onClick={() => open(h.interest)} className="w-full text-ink sm:w-auto">
                {h.primary}
              </Button>
              <Button
                variant="secondary"
                onClick={viewRevenueLoop}
                className="w-full bg-background/35 sm:w-auto"
              >
                {h.secondary}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="relative z-10 min-w-0 lg:col-span-7 lg:-mr-6 xl:-mr-10"
          >
            <ParallaxAccent>
              <ProductShowcase />
            </ParallaxAccent>
          </motion.div>
        </div>
      </DottedGridFrame>
    </section>
  );
}
