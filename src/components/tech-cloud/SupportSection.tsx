import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlarmClock,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Gauge,
  UserRoundCheck,
} from "lucide-react";
import { techCloud } from "@/content/tech-cloud";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card } from "@/components/system/primitives";

const support = techCloud.support;
const icons = [Activity, AlarmClock, Gauge];
const incidentIcons = [AlarmClock, ArrowUpRight, CheckCircle2];

function MonitoringVisual() {
  return (
    <div className="rounded-2xl border border-line bg-background/55 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          {support.monitoring.label}
        </span>
        <Activity className="size-3.5 text-orange" aria-hidden />
      </div>
      <div className="relative mt-4">
        <svg className="h-28 w-full" viewBox="0 0 280 100" fill="none" aria-hidden>
          <path d="M0 25H280M0 50H280M0 75H280" stroke="var(--line)" strokeDasharray="3 6" />
          <path
            d="M0 72 C24 68 34 75 52 66 S82 62 98 68 S116 70 130 62 L145 14 L158 72 C178 66 190 74 208 64 S242 68 280 56"
            stroke="var(--orange)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="145" cy="14" r="5" fill="var(--orange-amber)" className="animate-pulse-dot" />
        </svg>
        <span className="absolute right-0 top-0 rounded-md border border-orange/30 bg-raised px-2 py-1 font-mono text-[7px] text-amber">
          {support.monitoring.anomaly}
        </span>
      </div>
      <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange/10 px-3 py-1.5 text-[8px] font-semibold text-amber">
        <Check className="size-3" aria-hidden />
        {support.monitoring.resolved}
      </span>
    </div>
  );
}

function IncidentVisual() {
  return (
    <div className="rounded-2xl border border-line bg-background/55 p-4">
      <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {support.incident.label}
      </p>
      <div className="mt-4">
        {support.incident.steps.map((step, index) => {
          const Icon = incidentIcons[index] ?? AlarmClock;
          return (
            <div key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
              {index < support.incident.steps.length - 1 && (
                <span className="absolute bottom-0 left-[15px] top-8 w-px bg-orange/25" />
              )}
              <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-orange/30 bg-orange/10 text-orange">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <div className="flex flex-1 items-center justify-between gap-3 pt-1">
                <span className="text-[10px] font-semibold">{step.label}</span>
                <span className="font-mono text-[8px] text-muted-foreground">{step.time}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid size-9 place-items-center rounded-full bg-grad font-mono text-[9px] font-bold text-ink">
          {support.incident.initials}
        </span>
        <span className="text-[9px] text-muted-foreground">{support.incident.engineer}</span>
        <UserRoundCheck className="ml-auto size-4 text-orange" aria-hidden />
      </div>
    </div>
  );
}

function TuningVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-2xl border border-line bg-background/55 p-4">
      <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {support.tuning.label}
      </p>
      <div className="mt-4 space-y-3">
        {support.tuning.items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: reduce ? 0 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
            className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-surface/60 px-3"
          >
            <motion.span
              initial={{ scale: reduce ? 1 : 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: EASE }}
              className="grid size-6 place-items-center rounded-full bg-orange text-ink"
            >
              <Check className="size-3.5" strokeWidth={2.4} aria-hidden />
            </motion.span>
            <span className="text-[10px] font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-[8px] text-amber">
        <Gauge className="size-3.5" aria-hidden />
        {support.tuning.status}
      </p>
    </div>
  );
}

export function SupportSection() {
  return (
    <section className="relative bg-background" aria-labelledby="support-heading">
      <div className="container-site section-y">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Reveal>
            <h2 id="support-heading" className="type-h2 max-w-[17ch] text-balance">
              {support.headline}
            </h2>
          </Reveal>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            <span className="size-2 rounded-full bg-success animate-pulse-dot" aria-hidden />
            {support.presence}
          </span>
        </div>
        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
          {support.cards.map((card, index) => {
            const Icon = icons[index] ?? Activity;
            return (
              <RevealItem key={card.title} className="h-full">
                <Card as="article" className="flex h-full flex-col p-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-orange/25 bg-orange/[.07] text-orange">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-tight [font-variation-settings:'wdth'_108]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <div className="mt-auto pt-8">
                    {index === 0 && <MonitoringVisual />}
                    {index === 1 && <IncidentVisual />}
                    {index === 2 && <TuningVisual />}
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
