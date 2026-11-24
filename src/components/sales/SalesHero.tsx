import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bell,
  FileText,
  Globe2,
  Inbox,
  LayoutGrid,
  MessageSquareText,
  Search,
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
type Lead = (typeof ui.leads)[number];

const navIcons = [Inbox, Workflow, FileText, BarChart3, Bell];

function SourceIcon({ source, className = "size-3" }: { source: string; className?: string }) {
  if (source === "Web") return <Globe2 className={className} aria-hidden />;
  return <BrandIcon name={source} className={className} />;
}

function LeadRow({ lead, index }: { lead: Lead; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl border border-transparent bg-surface/45 px-2.5 py-2.5",
        index === 3 && "hidden lg:grid",
      )}
    >
      <span className="grid size-8 place-items-center rounded-full border border-orange/25 bg-orange/10 font-mono text-[9px] text-amber">
        {lead.initials}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate text-[10px] font-semibold text-foreground">{lead.name}</span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[8px] text-muted-foreground">
            <SourceIcon source={lead.source} className="size-2.5" />
            {lead.source}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[8px] text-muted-foreground">{lead.detail}</p>
      </div>
      <div className="text-right">
        <span className="rounded-full border border-orange/25 bg-orange/10 px-2 py-0.5 font-mono text-[8px] text-amber">
          {lead.intent}
        </span>
        <p className="mt-1 whitespace-nowrap font-mono text-[7px] text-muted-foreground">
          {index === 0 ? ui.response : lead.time}
        </p>
      </div>
    </motion.div>
  );
}

function FollowUpTimeline() {
  return (
    <section className="rounded-2xl border border-line bg-background/55 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-semibold">{ui.followUp}</h3>
        <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" />
      </div>
      <p className="mt-0.5 font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
        {ui.followUpStatus}
      </p>
      <div className="mt-4 space-y-0">
        {ui.timeline.map((event, index) => (
          <div key={event.time} className="relative flex gap-3 pb-4 last:pb-0">
            {index < ui.timeline.length - 1 && (
              <span className="absolute bottom-0 left-[13px] top-7 w-px bg-orange/25" />
            )}
            <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full border border-orange/30 bg-orange/10 text-orange">
              <BrandIcon name={event.channel} className="size-3" />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="truncate text-[9px] font-medium text-foreground/90">{event.title}</p>
              <p className="mt-0.5 font-mono text-[7px] text-dim">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuotationTracker() {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-background/55 lg:col-span-7">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2.5">
        <h3 className="text-[10px] font-semibold">{ui.quotations}</h3>
        <span className="font-mono text-[8px] text-amber">{ui.quotationTotal}</span>
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line font-mono text-[7px] uppercase tracking-wider text-dim">
            {ui.quoteHeaders.map((header) => (
              <th key={header} className="px-3 py-2 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ui.quotes.map((quote) => (
            <tr key={quote.number} className="border-b border-line/60 text-[8px] last:border-0">
              <td className="px-3 py-2 font-mono text-muted-foreground">{quote.number}</td>
              <td className="px-3 py-2 font-medium text-foreground/90">{quote.client}</td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-foreground/90">
                {quote.value}
              </td>
              <td className="px-3 py-2">
                <span
                  className={cn(
                    "inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[7px]",
                    quote.status === "Won"
                      ? "border-orange bg-orange text-ink"
                      : "border-orange/25 bg-orange/[.07] text-amber",
                  )}
                >
                  {quote.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function LeakageToast() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
      className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2.5 rounded-xl border border-orange/60 bg-raised/95 p-3 shadow-glow-sm backdrop-blur-xl sm:left-auto sm:right-4 sm:w-[270px]"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange text-ink">
        <Bell className="size-3.5" aria-hidden />
      </span>
      <div>
        <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-amber">
          {ui.alertEyebrow}
        </p>
        <p className="mt-0.5 text-[9px] font-semibold leading-snug text-foreground">{ui.alert}</p>
      </div>
    </motion.div>
  );
}

function ProductShowcase() {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<Lead[]>([...ui.leads.slice(0, 4)]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const nextLead = useRef(4);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setRows((current) => {
        let lead = ui.leads[nextLead.current % ui.leads.length];
        while (lead && current.some((row) => row.name === lead?.name)) {
          nextLead.current += 1;
          lead = ui.leads[nextLead.current % ui.leads.length];
        }
        if (!lead) return current;
        nextLead.current += 1;
        return [lead, ...current.slice(0, 3)];
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      reduce ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 10,
    });
  };

  return (
    <div className="[perspective:1400px]">
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative pb-8 [transform-style:preserve-3d]"
        role="img"
        aria-label={ui.previewAlt}
      >
        <div
          aria-hidden
          className="overflow-hidden rounded-[20px] border border-line-strong bg-raised shadow-2xl"
        >
          <div className="flex h-11 items-center justify-between border-b border-line bg-surface px-3.5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-orange" />
                <span className="size-2 rounded-full bg-surface-3" />
                <span className="size-2 rounded-full bg-surface-3" />
              </div>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <span className="hidden text-[9px] font-semibold sm:block">{ui.product}</span>
            </div>
            <div className="flex items-center gap-2">
              <SampleDataChip />
              <Search className="size-3 text-dim" />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/25 bg-orange/[.07] px-2 py-1 font-mono text-[7px] uppercase tracking-wider text-amber">
                <span className="size-1 rounded-full bg-orange animate-pulse-dot" />
                {ui.live}
              </span>
            </div>
          </div>
          <div className="flex">
            <aside className="hidden w-12 shrink-0 flex-col items-center gap-2 border-r border-line bg-surface/45 py-3 sm:flex">
              <span className="mb-2 grid size-7 place-items-center rounded-lg bg-grad text-ink">
                <LayoutGrid className="size-3.5" />
              </span>
              {navIcons.map((Icon, index) => (
                <span
                  key={ui.nav[index]}
                  title={ui.nav[index]}
                  className={cn(
                    "grid size-8 place-items-center rounded-lg border",
                    index === 0
                      ? "border-orange/30 bg-orange/10 text-orange"
                      : "border-transparent text-dim",
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
              ))}
            </aside>
            <div className="min-w-0 flex-1 p-2.5 sm:p-3">
              <div className="grid gap-2.5 lg:grid-cols-7">
                <section className="rounded-2xl border border-line bg-background/55 p-2.5 lg:col-span-4">
                  <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
                    <div>
                      <h3 className="text-[10px] font-semibold">{ui.inbox}</h3>
                      <p className="mt-0.5 font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
                        {ui.active}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2 py-1 text-[7px] text-amber">
                      <MessageSquareText className="size-2.5" />
                      {ui.qualification}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {rows.map((lead, index) => (
                        <LeadRow key={lead.name} lead={lead} index={index} />
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
                <div className="hidden lg:col-span-3 lg:block">
                  <FollowUpTimeline />
                </div>
                <div className="hidden lg:col-span-7 lg:block">
                  <QuotationTracker />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LeakageToast />
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
  const viewPricing = () => {
    window.history.replaceState(null, "", "#pricing");
    document
      .getElementById("pricing")
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
              className="type-h1 mt-7 max-w-[13ch] text-balance lg:text-[clamp(2.5rem,4.2vw,3.85rem)]"
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
                onClick={viewPricing}
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
