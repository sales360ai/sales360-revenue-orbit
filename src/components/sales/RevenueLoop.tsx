import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sales, type RevenueStage, type RevenueStageId } from "@/content/sales";
import { EASE, Reveal } from "@/components/system/motion";
import { REVENUE_LOOP_EVENT } from "@/components/sales/revenueLoopNavigation";
import { cn } from "@/lib/utils";

const loopPath =
  "M400 52 C610 52 720 152 720 280 C720 418 600 508 400 508 C200 508 80 418 80 280 C80 152 190 52 400 52 Z";

function positionFor(id: RevenueStageId) {
  switch (id) {
    case "branding":
      return { left: "19%", top: "19%" };
    case "marketing":
      return { left: "50%", top: "9%" };
    case "lead-generation":
      return { left: "81%", top: "19%" };
    case "sales":
      return { left: "86%", top: "55%" };
    case "customer-relationships":
      return { left: "68%", top: "82%" };
    case "retention":
      return { left: "32%", top: "82%" };
    case "lifetime-value":
      return { left: "14%", top: "55%" };
    case "revenue-growth":
      return { left: "50%", top: "50%" };
  }
}

function phaseLabel(phase: RevenueStage["phase"]) {
  if (phase === "attract") return sales.revenueLoop.attract;
  if (phase === "convert") return sales.revenueLoop.convert;
  return sales.revenueLoop.grow;
}

function capabilityTitle(capability: (typeof sales.revenueLoop.capabilities)[number]) {
  if ("recovery" in capability && capability.recovery) return sales.revenueLoop.recoveryTitle;
  if (capability.featureId === "reactivation") return sales.revenueLoop.reactivationTitle;
  return sales.features.items.find((feature) => feature.id === capability.featureId)?.title;
}

function stageLabels(stageIds: readonly string[]) {
  return stageIds
    .map((id) => sales.revenueLoop.stages.find((stage) => stage.id === id)?.label)
    .filter(Boolean)
    .join(" + ");
}

function MarketingPill() {
  return (
    <Link
      to="/marketing"
      className="mt-2 inline-flex min-h-8 items-center gap-1 rounded-full border border-orange/30 bg-background px-2.5 font-mono text-[8px] uppercase tracking-wider text-amber transition-colors hover:border-orange hover:text-foreground"
    >
      {sales.revenueLoop.marketingPill}
      <ArrowUpRight className="size-2.5" aria-hidden />
    </Link>
  );
}

type NodeProps = {
  stage: RevenueStage;
  active: boolean;
  pinned: boolean;
  center?: boolean;
  mobile?: boolean;
  onEnter: (id: RevenueStageId) => void;
  onLeave: () => void;
  onSelect: (id: RevenueStageId) => void;
};

function LoopNode({
  stage,
  active,
  pinned,
  center = false,
  mobile = false,
  onEnter,
  onLeave,
  onSelect,
}: NodeProps) {
  return (
    <div
      className={cn(
        mobile
          ? "relative w-full"
          : "absolute z-10 flex w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center",
        center && !mobile && "w-[176px]",
        active && !mobile && "z-20",
      )}
      style={mobile ? undefined : positionFor(stage.id)}
    >
      <motion.button
        type="button"
        id={`${mobile ? "loop-mobile" : "loop-desktop"}-${stage.id}`}
        aria-expanded={active}
        aria-pressed={pinned}
        onPointerEnter={() => onEnter(stage.id)}
        onPointerLeave={onLeave}
        onFocus={() => onEnter(stage.id)}
        onBlur={onLeave}
        onClick={() => onSelect(stage.id)}
        layout
        transition={{ duration: 0.3, ease: EASE }}
        className={cn(
          "relative w-full overflow-hidden border text-center shadow-inset-top transition-[border-color,background-color,opacity] duration-300",
          mobile ? "rounded-xl p-3 text-left" : "rounded-2xl px-3 py-3",
          center && !mobile && "rounded-full px-5 py-7",
          active && center && !mobile && "rounded-[28px] py-5",
          center
            ? "border-orange/60 bg-orange/[.12] shadow-glow-sm"
            : "border-line-strong bg-raised/95",
          active && "border-orange bg-surface shadow-glow-sm",
        )}
      >
        <span
          className={cn(
            "block font-mono text-[8px] uppercase tracking-[0.14em]",
            center || active ? "text-amber" : "text-dim",
          )}
        >
          {phaseLabel(stage.phase)}
        </span>
        <span
          className={cn(
            "mt-1 block font-display font-bold leading-tight",
            center ? "text-xl text-grad" : mobile ? "text-lg" : "text-sm",
          )}
        >
          {stage.label}
        </span>
        <AnimatePresence initial={false}>
          {active && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="mt-2 block text-[10px] leading-relaxed text-muted-foreground"
            >
              {stage.line}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      {stage.marketingLink && <MarketingPill />}
    </div>
  );
}

function CapabilityChips({
  active,
  onlyStage,
}: {
  active: RevenueStageId | null;
  onlyStage?: RevenueStageId;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", !onlyStage && "flex-col")}>
      {sales.revenueLoop.capabilities.map((capability, index) => {
        const stageIds: readonly string[] = capability.stageIds;
        if (onlyStage && !stageIds.includes(onlyStage)) return null;
        const title = capabilityTitle(capability);
        if (!title) return null;
        const highlighted = active ? stageIds.includes(active) : false;
        return (
          <div
            key={`${title}-${index}`}
            className={cn(
              "rounded-xl border px-3 py-2.5 transition-[border-color,background-color,opacity,transform] duration-300",
              highlighted
                ? "border-orange/60 bg-orange/[.1] shadow-glow-sm"
                : "border-line bg-background/55",
              active && !highlighted && "opacity-35",
            )}
          >
            <p className="text-[11px] font-semibold leading-snug text-foreground/90">{title}</p>
            {!onlyStage && (
              <p className="mt-1 font-mono text-[7px] uppercase tracking-wider text-amber">
                {stageLabels(stageIds)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function RevenueLoop() {
  const [hovered, setHovered] = useState<RevenueStageId | null>(null);
  const [pinned, setPinned] = useState<RevenueStageId | null>(null);
  const reduce = useReducedMotion();
  const active = hovered ?? pinned;
  const nodeProps = {
    onEnter: setHovered,
    onLeave: () => setHovered(null),
    onSelect: (id: RevenueStageId) => setPinned((current) => (current === id ? null : id)),
  };

  useEffect(() => {
    const handleStage = (event: Event) => {
      const id = (event as CustomEvent<RevenueStageId>).detail;
      if (sales.revenueLoop.stages.some((stage) => stage.id === id)) {
        setPinned(id);
        setHovered(null);
      }
    };
    window.addEventListener(REVENUE_LOOP_EVENT, handleStage);
    return () => window.removeEventListener(REVENUE_LOOP_EVENT, handleStage);
  }, []);

  return (
    <section
      id="revenue-loop"
      className="container-site scroll-mt-24 py-16 sm:py-20"
      aria-labelledby="revenue-loop-heading"
    >
      <Reveal>
        <h2 id="revenue-loop-heading" className="type-h2 max-w-5xl text-balance">
          {sales.revenueLoop.headline}
        </h2>
      </Reveal>

      <div className="mt-10 hidden grid-cols-[minmax(0,1.45fr)_minmax(260px,.75fr)] gap-6 lg:grid">
        <div className="relative min-h-[590px] overflow-hidden rounded-[28px] border border-line bg-surface/45 shadow-inset-top">
          <div className="absolute inset-0 dotted-grid opacity-25" aria-hidden />
          <span className="absolute left-[42%] top-3 font-mono text-[9px] tracking-[0.2em] text-amber">
            {sales.revenueLoop.attract}
          </span>
          <span className="absolute right-3 top-[46%] font-mono text-[9px] tracking-[0.2em] text-amber [writing-mode:vertical-rl]">
            {sales.revenueLoop.convert}
          </span>
          <span className="absolute bottom-3 left-[47%] font-mono text-[9px] tracking-[0.2em] text-amber">
            {sales.revenueLoop.grow}
          </span>
          <svg
            viewBox="0 0 800 560"
            className="absolute inset-0 size-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={loopPath} fill="none" stroke="var(--line-strong)" strokeWidth="2" />
            <path
              d={loopPath}
              fill="none"
              stroke="var(--orange)"
              strokeOpacity=".35"
              strokeWidth="2"
              strokeDasharray="4 10"
            />
            <circle r="6" fill="var(--orange-amber)" filter="drop-shadow(0 0 6px var(--orange))">
              {!reduce && <animateMotion dur="12s" repeatCount="indefinite" path={loopPath} />}
            </circle>
          </svg>
          {sales.revenueLoop.stages.map((stage) => (
            <LoopNode
              key={stage.id}
              stage={stage}
              center={stage.id === "revenue-growth"}
              active={active === stage.id}
              pinned={pinned === stage.id}
              {...nodeProps}
            />
          ))}
        </div>
        <aside className="rounded-[28px] border border-line bg-surface/45 p-5 shadow-inset-top">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-amber">
            {sales.revenueLoop.capabilitiesLabel}
          </p>
          <CapabilityChips active={active} />
        </aside>
      </div>

      <div className="relative mt-8 space-y-3 before:absolute before:bottom-8 before:left-[19px] before:top-8 before:w-px before:bg-orange/25 lg:hidden">
        {sales.revenueLoop.stages.map((stage) => (
          <div key={stage.id} className="relative pl-10">
            <span
              className={cn(
                "absolute left-[15px] top-7 size-2.5 rounded-full border border-orange bg-background",
                active === stage.id && "bg-orange shadow-glow-sm",
              )}
              aria-hidden
            />
            <LoopNode
              stage={stage}
              mobile
              center={stage.id === "revenue-growth"}
              active={active === stage.id}
              pinned={pinned === stage.id}
              {...nodeProps}
            />
            {active === stage.id && (
              <div className="mt-2">
                <CapabilityChips active={active} onlyStage={stage.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
