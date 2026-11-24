import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Cloud,
  Megaphone,
  Network,
  ShieldCheck,
} from "lucide-react";
import { home } from "@/content/home";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { SectionHeading } from "@/components/system/primitives";
import { SystemRail } from "@/components/home/SystemRail";
import { cn } from "@/lib/utils";

const pillarIcons = {
  sales: ChartNoAxesCombined,
  marketing: Megaphone,
  automation: Bot,
  "tech-cloud": Cloud,
};
type PillarId = keyof typeof pillarIcons;
type Pillar = (typeof home.pillars.cards)[number];

function SalesGraphic() {
  return (
    <svg viewBox="0 0 220 170" className="h-full max-h-40 w-full" aria-hidden>
      <defs>
        <radialGradient id="sales-sphere" cx="32%" cy="25%">
          <stop offset="0" stopColor="var(--paper)" />
          <stop offset=".28" stopColor="var(--orange-amber)" />
          <stop offset=".72" stopColor="var(--orange)" />
          <stop offset="1" stopColor="var(--orange-deep)" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="82" r="55" fill="url(#sales-sphere)" opacity=".95" />
      <ellipse cx="110" cy="139" rx="67" ry="10" fill="var(--bg)" opacity=".16" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${28 + i * 54} ${128 - i * 25})`}>
          <path
            d="M0 16 L22 0 M14 0 H22 V8"
            fill="none"
            stroke="var(--bg)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity=".8"
          />
        </g>
      ))}
    </svg>
  );
}

function MarketingGraphic() {
  return (
    <svg viewBox="0 0 220 170" className="h-full max-h-40 w-full" aria-hidden>
      <g transform="translate(110 84) rotate(-12)">
        <ellipse
          rx="82"
          ry="38"
          fill="none"
          stroke="var(--bg)"
          strokeOpacity=".15"
          strokeWidth="18"
        />
        <ellipse
          rx="60"
          ry="27"
          fill="none"
          stroke="var(--orange)"
          strokeOpacity=".8"
          strokeWidth="14"
        />
        <ellipse
          rx="36"
          ry="16"
          fill="var(--bg)"
          fillOpacity=".08"
          stroke="var(--bg)"
          strokeOpacity=".55"
          strokeWidth="2"
        />
        <circle cx="-62" cy="-20" r="10" fill="var(--bg)" />
        <circle cx="54" cy="27" r="8" fill="var(--orange-deep)" />
        <circle cx="26" cy="-32" r="6" fill="var(--bg)" fillOpacity=".6" />
      </g>
    </svg>
  );
}

function AutomationGraphic() {
  const nodes = [
    [34, 95],
    [74, 42],
    [114, 108],
    [151, 49],
    [190, 91],
    [104, 24],
  ] as const;
  return (
    <svg viewBox="0 0 220 150" className="h-full max-h-40 w-full text-orange" aria-hidden>
      <g fill="none" stroke="currentColor" strokeOpacity=".35" strokeDasharray="3 5">
        <path d="M34 95 L74 42 L114 108 L151 49 L190 91 M74 42 L104 24 L151 49 M34 95 L114 108 L190 91" />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={i === 2 ? 15 : 8} fill="var(--surface)" stroke="currentColor" />
          <circle
            cx={x}
            cy={y}
            r={i === 2 ? 5 : 2.5}
            fill="currentColor"
            className={i === 2 ? "animate-pulse-dot" : undefined}
          />
        </g>
      ))}
    </svg>
  );
}

function CloudGraphic() {
  return (
    <svg viewBox="0 0 220 170" className="h-full max-h-40 w-full" aria-hidden>
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--text-dim)" />
          <stop offset=".24" stopColor="var(--text)" />
          <stop offset=".48" stopColor="var(--surface-3)" />
          <stop offset=".72" stopColor="var(--paper)" />
          <stop offset="1" stopColor="var(--surface-2)" />
        </linearGradient>
      </defs>
      <g transform="translate(110 82) rotate(-18)">
        <ellipse rx="76" ry="40" fill="none" stroke="url(#chrome)" strokeWidth="22" />
        <ellipse
          rx="76"
          ry="40"
          fill="none"
          stroke="var(--text)"
          strokeOpacity=".26"
          strokeWidth="1"
        />
        <path
          d="M-67 -24 C-20 -61 54 -47 72 -11"
          fill="none"
          stroke="var(--text)"
          strokeOpacity=".55"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const graphics = {
  sales: SalesGraphic,
  marketing: MarketingGraphic,
  automation: AutomationGraphic,
  "tech-cloud": CloudGraphic,
};

function PillarLink({
  card,
  dark,
  inactive = false,
}: {
  card: Pillar;
  dark: boolean;
  inactive?: boolean;
}) {
  return (
    <Link
      to={card.to}
      tabIndex={inactive ? -1 : 0}
      className={cn(
        "group/link absolute bottom-6 left-6 z-20 inline-flex min-h-11 items-center gap-3 rounded-full pr-1 text-sm font-bold transition-opacity",
        inactive && "pointer-events-none opacity-0",
        dark ? "text-ink" : "text-foreground",
      )}
    >
      <span>{card.link}</span>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-full",
          dark ? "bg-ink text-foreground" : "bg-foreground text-ink",
        )}
      >
        <ArrowRight
          className="size-4 transition-transform group-hover/link:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

function PillarGraphic({ card }: { card: Pillar }) {
  const Graphic = graphics[card.id as PillarId];
  return (
    <div className="pointer-events-none relative flex min-h-32 flex-1 items-center justify-center py-4">
      <Graphic />
    </div>
  );
}

export function Pillars() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const reduce = useReducedMotion();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    if (interacted || reduce) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % home.pillars.cards.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [interacted, reduce]);
  const activate = (index: number) => {
    setInteracted(true);
    setActive(index);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % home.pillars.cards.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + home.pillars.cards.length) % home.pillars.cards.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = home.pillars.cards.length - 1;
    else return;
    event.preventDefault();
    activate(next);
    refs.current[next]?.focus();
  };

  return (
    <section className="container-site section-y" aria-labelledby="pillars-heading">
      <Reveal>
        <SectionHeading
          id="pillars-heading"
          title={home.pillars.headline}
          sub={home.pillars.sub}
          align="center"
          className="max-w-4xl"
        />
      </Reveal>
      <Reveal delay={0.08} className="mt-9">
        <SystemRail active={home.pillars.cards[active]?.id ?? "sales"} />
      </Reveal>
      <RevealGroup className="mt-8 hidden min-h-[480px] gap-3 lg:flex">
        {home.pillars.cards.map((card, index) => {
          const Icon = pillarIcons[card.id as PillarId];
          const selected = active === index;
          const darkText = card.tone === "orange" || card.tone === "paper";
          return (
            <RevealItem
              key={card.id}
              className={cn(
                "min-w-0 transition-[flex] duration-500",
                selected ? "flex-[2]" : "flex-1",
              )}
            >
              <article
                className={cn(
                  "relative h-[480px] overflow-hidden rounded-[28px] border transition-[flex] duration-500",
                  card.tone === "orange" && "bg-grad text-ink",
                  card.tone === "paper" && "bg-paper text-ink",
                  card.tone === "charcoal" && "border-line bg-surface-2 text-foreground",
                  card.tone === "black" && "border-line-strong bg-background text-foreground",
                )}
              >
                <button
                  ref={(element) => {
                    refs.current[index] = element;
                  }}
                  type="button"
                  aria-expanded={selected}
                  aria-controls={`pillar-panel-${card.id}`}
                  onMouseEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className="flex h-full w-full min-w-0 flex-col p-6 pb-20 text-left"
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-xs tracking-widest",
                        darkText ? "text-ink/65" : "text-muted-foreground",
                      )}
                    >
                      {card.number}
                    </span>
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-full border",
                        darkText ? "border-ink/15 bg-ink/5" : "border-line bg-foreground/5",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                  </span>
                  <PillarGraphic card={card} />
                  <span
                    className={cn(
                      "mb-2 block font-mono text-[9px] uppercase tracking-[0.13em]",
                      darkText ? "text-ink/65" : "text-amber",
                    )}
                  >
                    {card.role}
                  </span>
                  <span className="block max-w-[330px] font-display text-[clamp(1.45rem,2vw,2rem)] font-bold leading-[1.05] [font-variation-settings:'wdth'_108]">
                    {card.title}
                  </span>
                  <span
                    id={`pillar-panel-${card.id}`}
                    className={cn(
                      "mt-4 block max-w-[390px] text-sm leading-relaxed",
                      darkText ? "text-ink/75" : "text-muted-foreground",
                      selected ? "" : "line-clamp-2",
                    )}
                  >
                    {card.body}
                  </span>
                </button>
                <PillarLink card={card} dark={darkText} inactive={!selected} />
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {home.pillars.cards.map((card) => {
          const Icon = pillarIcons[card.id as PillarId];
          const darkText = card.tone === "orange" || card.tone === "paper";
          return (
            <RevealItem key={card.id}>
              <article
                className={cn(
                  "relative flex min-h-[420px] overflow-hidden rounded-[28px] border p-6 pb-24",
                  card.tone === "orange" && "bg-grad text-ink",
                  card.tone === "paper" && "bg-paper text-ink",
                  card.tone === "charcoal" && "border-line bg-surface-2 text-foreground",
                  card.tone === "black" && "border-line-strong bg-background text-foreground",
                )}
              >
                <div className="flex w-full flex-col">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-xs",
                        darkText ? "text-ink/65" : "text-muted-foreground",
                      )}
                    >
                      {card.number}
                    </span>
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <PillarGraphic card={card} />
                  <p
                    className={cn(
                      "mb-2 font-mono text-[9px] uppercase tracking-[0.13em]",
                      darkText ? "text-ink/65" : "text-amber",
                    )}
                  >
                    {card.role}
                  </p>
                  <h3 className="font-display text-2xl font-bold leading-tight">{card.title}</h3>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-relaxed",
                      darkText ? "text-ink/75" : "text-muted-foreground",
                    )}
                  >
                    {card.body}
                  </p>
                </div>
                <PillarLink card={card} dark={darkText} />
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <div
        className="mt-6 hidden items-center justify-center gap-2 text-muted-foreground lg:flex"
        aria-hidden
      >
        <Network className="size-3.5" />
        <span className="size-1 rounded-full bg-orange" />
        <ShieldCheck className="size-3.5" />
      </div>
    </section>
  );
}
