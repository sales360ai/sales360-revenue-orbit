import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  BellRing,
  Building2,
  Check,
  MessageCircle,
  UserRound,
  UsersRound,
} from "lucide-react";
import { automation } from "@/content/automation";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card } from "@/components/system/primitives";

const routing = automation.routing;
const ui = automation.routingUi;
const cardIcons = [Building2, UsersRound, BarChart3];
const avatarPositions = [
  { left: "50%", top: "0%" },
  { left: "96%", top: "82%" },
  { left: "4%", top: "82%" },
];

function TypingField({ label, value, index }: { label: string; value: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [length, setLength] = useState(reduce ? value.length : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setLength(value.length);
      return;
    }
    let interval = 0;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setLength((current) => {
          if (current >= value.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, 65);
    }, index * 420);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [inView, reduce, index, value]);

  return (
    <div ref={ref} aria-label={`${label}: ${value}`}>
      <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5 flex min-h-11 items-center rounded-xl border border-line bg-background/70 px-3 text-[10px] text-foreground/90">
        <span aria-hidden>{value.slice(0, length) || "\u00A0"}</span>
        {length < value.length && !reduce && (
          <span className="ml-0.5 h-3.5 w-px bg-orange animate-pulse-dot" aria-hidden />
        )}
        {length === value.length && <Check className="ml-auto size-3.5 text-orange" aria-hidden />}
      </div>
    </div>
  );
}

function EnrichmentVisual() {
  return (
    <div className="rounded-2xl border border-line bg-surface/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-wider text-amber">
          {ui.enrichment.status}
        </span>
        <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" />
      </div>
      <div className="space-y-3">
        {ui.enrichment.fields.map((field, index) => (
          <TypingField key={field.label} {...field} index={index} />
        ))}
      </div>
    </div>
  );
}

function AssignmentVisual() {
  return (
    <div className="rounded-2xl border border-line bg-surface/50 px-4 pb-5 pt-4">
      <div
        className="relative mx-auto size-[210px]"
        role="img"
        aria-label="Three sales avatars rotating around a hot lead"
      >
        <div className="absolute inset-5 rounded-full border border-dashed border-orange/30" />
        <div className="routing-orbit absolute inset-0">
          {ui.assignment.avatars.map((avatar, index) => (
            <span
              key={avatar}
              className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange/40 bg-raised shadow-glow-sm"
              style={avatarPositions[index]}
            >
              <span className="routing-counter font-mono text-[9px] font-semibold text-amber">
                {avatar}
              </span>
            </span>
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-orange/35 bg-background text-center shadow-glow-sm">
          <UserRound className="size-5 text-orange" aria-hidden />
          <span className="mt-2 text-[9px] font-semibold">{ui.assignment.lead}</span>
        </div>
      </div>
      <span className="mx-auto mt-2 flex w-fit items-center gap-2 rounded-full border border-orange/35 bg-orange/[.08] px-3 py-2 text-[9px] font-semibold text-amber">
        <MessageCircle className="size-3.5" aria-hidden />
        {ui.assignment.alert}
      </span>
    </div>
  );
}

function ReportVisual() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: reduce ? 0 : -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-2xl border border-line bg-surface/50 p-4"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <span className="text-[10px] font-semibold">{ui.report.title}</span>
        <BellRing className="size-3.5 text-orange" aria-hidden />
      </div>
      <div className="mt-4 rounded-xl border border-orange/25 bg-orange/[.07] p-3">
        <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          {ui.report.revenueLabel}
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-grad">{ui.report.revenue}</p>
      </div>
      <p className="mt-4 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {ui.report.sourceLabel}
      </p>
      <div className="mt-3 space-y-2.5">
        {ui.report.sources.map((source) => (
          <div key={source.label} className="grid grid-cols-[64px_1fr] items-center gap-3">
            <span className="text-[9px] text-muted-foreground">{source.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="h-full origin-left rounded-full bg-grad"
                style={{ width: source.width }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
        {ui.report.teamLabel}
      </p>
      <div className="mt-2 space-y-1.5">
        {ui.report.team.map((member) => (
          <p key={member} className="flex items-center gap-2 text-[9px] text-foreground/80">
            <Check className="size-3 text-orange" aria-hidden />
            {member}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export function RoutingCards() {
  return (
    <section
      id={routing.id}
      aria-labelledby="lead-routing-heading"
      className="relative scroll-mt-[136px] overflow-hidden bg-raised"
    >
      <span
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(9rem,22vw,20rem)] font-extrabold leading-none text-orange/[.045] [font-variation-settings:'wdth'_125]"
        aria-hidden
      >
        {routing.number}
      </span>
      <div className="container-site section-y relative">
        <Reveal>
          <h2 id="lead-routing-heading" className="type-h2 relative z-10 max-w-[16ch] text-balance">
            {routing.headline}
          </h2>
        </Reveal>
        <RevealGroup className="relative z-10 mt-12 grid gap-5 lg:grid-cols-3">
          {routing.cards.map((card, index) => {
            const Icon = cardIcons[index] ?? Building2;
            return (
              <RevealItem key={card.title} className="h-full">
                <Card as="article" className="flex h-full flex-col overflow-hidden p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border border-orange/25 bg-orange/[.07] text-orange">
                      <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold leading-tight [font-variation-settings:'wdth'_108]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <div className="mt-auto pt-8">
                    {index === 0 && <EnrichmentVisual />}
                    {index === 1 && <AssignmentVisual />}
                    {index === 2 && <ReportVisual />}
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
