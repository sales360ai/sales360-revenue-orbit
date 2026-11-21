import { useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  Check,
  Flame,
  MessageCircle,
  MousePointer2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { home } from "@/content/home";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { BrandIcon } from "./BrandIcon";
import { Button, ButtonLink, EyebrowBadge } from "@/components/system/primitives";
import { EASE } from "@/components/system/motion";
import { cn } from "@/lib/utils";
import arjunPortrait from "@/assets/founder-arjun.webp.asset.json";
import ananyaPortrait from "@/assets/founder-ananya.webp.asset.json";
import devPortrait from "@/assets/founder-dev.webp.asset.json";
import meeraPortrait from "@/assets/founder-meera.webp.asset.json";
import rahulPortrait from "@/assets/founder-rahul.webp.asset.json";

const trustPortraits = [
  { name: "Arjun", image: arjunPortrait.url },
  { name: "Ananya", image: ananyaPortrait.url },
  { name: "Dev", image: devPortrait.url },
  { name: "Meera", image: meeraPortrait.url },
  { name: "Rahul", image: rahulPortrait.url },
];

const h = home.hero;

function LeadReplyCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={cn(
        "glass rounded-[20px] border border-line-strong p-4 shadow-inset-top",
        mobile ? "w-full" : "w-[250px]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-surface-3 type-mono text-[9px] text-foreground">
            RM
          </span>
          <span className="text-xs font-semibold">{h.leadCard.prospect}</span>
        </div>
        <MessageCircle className="size-4 text-orange" aria-hidden />
      </div>
      <p className="ml-auto mt-3 w-fit max-w-[90%] rounded-xl rounded-br-sm bg-surface-3 px-3 py-2 text-left text-[11px] leading-relaxed text-foreground/90">
        {h.leadCard.message}
      </p>
      <div className="mt-2 flex items-start gap-2 rounded-xl rounded-bl-sm border border-orange/20 bg-orange/10 px-3 py-2">
        <Bot className="mt-0.5 size-3.5 shrink-0 text-orange" aria-hidden />
        <p className="text-[11px] leading-relaxed text-foreground/90">{h.leadCard.reply}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-1 font-mono text-[9px] text-success">
          <Check className="size-3" aria-hidden />
          {h.leadCard.chip}
        </span>
        <span className="size-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
      </div>
    </div>
  );
}

function PipelineStrip() {
  return (
    <div className="glass w-[244px] rounded-[20px] border border-line-strong p-4 shadow-inset-top">
      <div className="mb-4 flex items-center justify-between">
        <span className="type-mono text-[9px] text-muted-foreground">{h.pipeline.title}</span>
        <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" />
      </div>
      <div className="relative flex justify-between gap-1">
        <div
          className="absolute left-3 right-3 top-2 border-t border-dashed border-orange/40"
          aria-hidden
        />
        {h.pipeline.stages.map((stage, index) => (
          <div
            key={stage.label}
            className="relative z-10 flex min-w-0 flex-1 flex-col items-center"
          >
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border border-orange/50 bg-surface",
                index === 3 && "bg-orange",
              )}
            >
              <span className={cn("size-1 rounded-full bg-orange", index === 3 && "bg-ink")} />
            </span>
            <span className="mt-2 font-display text-sm font-bold">{stage.value}</span>
            <span className="mt-0.5 text-[8px] text-muted-foreground">{stage.label}</span>
            <span className="mt-2 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
              <span className="block h-full rounded-full bg-grad" style={{ width: stage.width }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreCard() {
  return (
    <div className="glass w-[230px] rounded-[20px] border border-line-strong p-4 text-center shadow-inset-top">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 font-mono text-[10px] text-amber">
          <Flame className="size-3" aria-hidden />
          {h.score.label}
        </span>
        <MousePointer2 className="size-3.5 text-muted-foreground" aria-hidden />
      </div>
      <div className="relative mx-auto mt-4 h-[52px] w-[104px] overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-[7px] border-b-0 border-surface-3" />
        <div className="absolute inset-0 rounded-t-full border-[7px] border-b-0 border-orange [clip-path:inset(0_0_0_50%)]" />
        <span className="absolute inset-x-0 bottom-0 font-display text-2xl font-bold">92</span>
      </div>
      <p className="type-mono text-[8px] text-muted-foreground">{h.score.intent}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-3 px-3 py-1 text-[10px] text-foreground/80">
        <BrandIcon name="Meta" className="size-3" />
        {h.score.source}
      </div>
    </div>
  );
}

function RevenueCard() {
  return (
    <div className="glass w-[238px] rounded-[20px] border border-line-strong p-4 shadow-inset-top">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold">{h.revenue.label}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 font-mono text-[9px] text-success">
          <TrendingUp className="size-3" aria-hidden />
          {h.revenue.delta}
        </span>
      </div>
      <svg viewBox="0 0 210 82" className="mt-3 w-full" aria-hidden>
        <defs>
          <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--orange)" stopOpacity=".42" />
            <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M2 72 C22 68,27 53,44 58 S70 65,83 44 S105 47,119 31 S145 39,157 20 S183 25,208 4 L208 80 L2 80 Z"
          fill="url(#revenue-fill)"
        />
        <path
          d="M2 72 C22 68,27 53,44 58 S70 65,83 44 S105 47,119 31 S145 39,157 20 S183 25,208 4"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="208" cy="4" r="4" fill="var(--orange-amber)" />
      </svg>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay,
  duration,
  parallax,
  index,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  duration: number;
  parallax: { x: number; y: number };
  index: number;
}) {
  const reduce = useReducedMotion();
  const depth = index % 2 === 0 ? 0.7 : -0.55;
  const style = {
    "--float-delay": `${delay}s`,
    "--float-duration": `${duration}s`,
    "--parallax-x": `${reduce ? 0 : parallax.x * depth}px`,
    "--parallax-y": `${reduce ? 0 : parallax.y * depth}px`,
  } as CSSProperties;
  return (
    <motion.div
      className={cn("pointer-events-none absolute z-20", className)}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.6, ease: EASE }}
    >
      <div className="hero-float" style={style}>
        {children}
      </div>
    </motion.div>
  );
}

function ConnectorLines() {
  const reduce = useReducedMotion();
  const paths = [
    "M600 96 C470 40 330 55 170 132",
    "M600 96 C490 150 390 210 270 320",
    "M600 96 C730 40 870 55 1030 132",
    "M600 96 C710 150 810 210 930 320",
  ];
  return (
    <svg
      viewBox="0 0 1200 360"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full lg:block"
      aria-hidden
    >
      {paths.map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            stroke="var(--orange)"
            strokeOpacity=".32"
            strokeWidth="1"
            strokeDasharray="3 7"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: EASE }}
          />
          <path
            d={d}
            fill="none"
            stroke="var(--orange-amber)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 120"
            className="hero-connector-pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

function InboxWindow() {
  return (
    <div className="w-[430px] overflow-hidden rounded-2xl border border-line-strong bg-raised/95 shadow-2xl xl:w-[520px]">
      <div className="flex h-11 items-center justify-between border-b border-line bg-surface/80 px-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-orange" />
          <span className="text-xs font-semibold">{h.inbox.title}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-success">
          <Sparkles className="size-3" />
          {h.inbox.status}
        </span>
      </div>
      <div className="p-2">
        {h.inbox.leads.map((lead) => (
          <div
            key={lead.name}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface"
          >
            <span className="grid size-8 place-items-center rounded-full border border-orange/25 bg-orange/10 font-mono text-[9px] text-amber">
              {lead.initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-[11px] font-semibold">{lead.name}</span>
                <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[8px] text-muted-foreground">
                  {lead.source}
                </span>
              </div>
              <p className="truncate text-[9px] text-muted-foreground">{lead.detail}</p>
            </div>
            <span className="font-mono text-[8px] text-dim">{lead.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineWindow() {
  return (
    <div className="w-[460px] overflow-hidden rounded-2xl border border-line-strong bg-raised/95 shadow-2xl xl:w-[540px]">
      <div className="flex h-11 items-center justify-between border-b border-line bg-surface/80 px-4">
        <span className="text-xs font-semibold">{h.board.title}</span>
        <span className="font-display text-sm font-bold text-amber">{h.board.total}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {h.board.columns.map((column) => (
          <div key={column.title}>
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-[9px] font-semibold text-muted-foreground">{column.title}</span>
              <span className="grid size-4 place-items-center rounded-full bg-surface-3 font-mono text-[8px]">
                {column.count}
              </span>
            </div>
            {column.deals.map((deal) => (
              <div key={deal.name} className="mb-2 rounded-lg border border-line bg-surface p-2.5">
                <p className="truncate text-[9px] font-medium">{deal.name}</p>
                <p className="mt-1 font-mono text-[9px] text-amber">{deal.value}</p>
                <div className="mt-2 h-0.5 rounded-full bg-surface-3">
                  <div className="h-full w-2/3 rounded-full bg-orange" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelTiles() {
  return (
    <div
      className="edge-fade flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 py-3 [scrollbar-width:none] lg:snap-none lg:justify-center lg:overflow-visible lg:px-0"
      aria-label="Connected channels"
    >
      {h.channels.map((channel, i) => (
        <div
          key={channel}
          className="hero-channel glass grid size-14 shrink-0 snap-center place-items-center rounded-2xl border border-line-strong text-foreground shadow-inset-top"
          style={
            {
              "--channel-delay": `${i * -0.7}s`,
              "--channel-rotate": `${i % 2 === 0 ? -5 : 5}deg`,
            } as CSSProperties
          }
          title={channel}
        >
          <BrandIcon name={channel} className="size-5" />
          <span className="sr-only">{channel}</span>
        </div>
      ))}
    </div>
  );
}

export function HomeHero() {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !window.matchMedia("(min-width: 1024px)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setParallax({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 12,
    });
  };
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="container-site max-w-[1440px] pt-[88px]" aria-labelledby="home-hero-title">
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        className="relative overflow-hidden rounded-[28px] border border-line bg-raised sm:rounded-[36px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div
          className="absolute inset-0 dotted-grid opacity-70 [mask-image:radial-gradient(ellipse_at_50%_25%,#000_20%,transparent_78%)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] bg-horizon opacity-60 animate-breathe"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-orange/[.055] blur-[110px]"
          aria-hidden
        />

        <div className="relative z-30 mx-auto flex max-w-[1120px] flex-col items-center px-4 pb-8 pt-8 text-center sm:px-8 sm:pt-10 lg:pb-0">
          <motion.div
            className="glass grid size-14 place-items-center rounded-[18px] border border-line-strong shadow-glow-sm"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <SunburstRing size={36} variant="spin" />
          </motion.div>
          <motion.div {...rise(0.28)} className="mt-5">
            <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
          </motion.div>
          <h1
            id="home-hero-title"
            className="type-hero mt-8 max-w-full text-balance text-[clamp(2.35rem,6.4vw,5.4rem)] leading-[.98] tracking-[-0.035em] [font-variation-settings:'wdth'_112] max-sm:text-[clamp(1.9rem,8.4vw,2.35rem)] lg:mt-9"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              >
                {h.line1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-grad block"
                initial={{ y: reduce ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
              >
                {h.line2}
              </motion.span>
            </span>
          </h1>
          <motion.p
            {...rise(0.64)}
            className="mt-5 max-w-[64ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {h.sub}
          </motion.p>
          <motion.div
            {...rise(0.72)}
            className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button onClick={() => open(h.primaryInterest)} className="w-full sm:w-auto">
              {h.primary}
            </Button>
            <ButtonLink
              to="/sales"
              variant="secondary"
              className="w-full bg-background/35 sm:w-auto"
            >
              {h.secondary}
            </ButtonLink>
          </motion.div>
          <motion.div {...rise(0.8)} className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex -space-x-2.5">
              {trustPortraits.map((portrait) => (
                <img
                  key={portrait.name}
                  src={portrait.image}
                  alt=""
                  width="36"
                  height="36"
                  loading="eager"
                  className="size-9 rounded-full border-2 border-background object-cover ring-1 ring-orange/60"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground/85">{h.trust}</span>
          </motion.div>
          <motion.p
            {...rise(0.86)}
            className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]"
          >
            {h.micro}
          </motion.p>
          <motion.div {...rise(0.94)} className="mx-auto mt-8 w-full max-w-[340px] lg:hidden">
            <LeadReplyCard mobile />
          </motion.div>
        </div>

        <div className="relative z-20 mx-auto hidden h-[370px] max-w-[1200px] lg:block">
          <ConnectorLines />
          <motion.div
            className="absolute left-1/2 top-14 z-30 grid size-16 -translate-x-1/2 place-items-center rounded-[20px] border border-orange/40 bg-background shadow-glow-sm"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
          >
            <SunburstRing size={40} variant="spin" />
          </motion.div>
          <FloatingCard
            className="left-[1%] top-28"
            delay={-1}
            duration={7}
            parallax={parallax}
            index={0}
          >
            <LeadReplyCard />
          </FloatingCard>
          <FloatingCard
            className="bottom-8 left-[5%]"
            delay={-3}
            duration={8.5}
            parallax={parallax}
            index={1}
          >
            <PipelineStrip />
          </FloatingCard>
          <FloatingCard
            className="right-[1%] top-28"
            delay={-2}
            duration={7.5}
            parallax={parallax}
            index={2}
          >
            <ScoreCard />
          </FloatingCard>
          <FloatingCard
            className="bottom-8 right-[5%]"
            delay={-4}
            duration={9}
            parallax={parallax}
            index={3}
          >
            <RevenueCard />
          </FloatingCard>
          <motion.div
            {...rise(0.95)}
            className="pointer-events-none absolute -bottom-28 left-1/2 z-10 -translate-x-1/2 opacity-90"
          >
            <InboxWindow />
          </motion.div>
        </div>

        <div className="relative z-40 mx-auto mb-5 w-fit max-w-full lg:mb-4">
          <ChannelTiles />
        </div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 z-0 hidden rotate-[3deg] opacity-30 [mask-image:linear-gradient(270deg,#000_55%,transparent)] xl:block">
          <PipelineWindow />
        </div>
      </motion.div>
    </section>
  );
}
