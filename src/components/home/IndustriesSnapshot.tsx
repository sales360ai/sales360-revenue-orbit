import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
} from "lucide-react";
import { home } from "@/content/home";
import { industries, type IndustryId } from "@/content/industries";
import { Reveal } from "@/components/system/motion";
import { SectionHeading } from "@/components/system/primitives";
import { SystemRail } from "@/components/home/SystemRail";
import { cn } from "@/lib/utils";

const industryIcons = {
  shopping: ShoppingBag,
  health: HeartPulse,
  building: Building2,
  factory: Factory,
  briefcase: BriefcaseBusiness,
  education: GraduationCap,
};

function IndustryName({ name, className }: { name: string; className?: string }) {
  const [firstWord, ...rest] = name.split(" ");
  return (
    <span className={cn("text-balance", className)}>
      <span className="whitespace-nowrap">{firstWord}</span>
      {rest.length > 0 ? ` ${rest.join(" ")}` : ""}
    </span>
  );
}

export function IndustriesSnapshot() {
  const [activeId, setActiveId] = useState<IndustryId>("e-commerce");
  const reduce = useReducedMotion();
  const tabListRef = useRef<HTMLDivElement>(null);
  const active =
    industries.solutions.find((industry) => industry.id === activeId) ?? industries.solutions[0];

  useEffect(() => {
    const list = tabListRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !selected || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: selected.offsetLeft - list.clientWidth / 2 + selected.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeId, reduce]);

  if (!active) return null;
  const snapshot = industries.homeSnapshots[active.id];
  const ActiveIcon = industryIcons[active.icon];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % industries.solutions.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + industries.solutions.length) % industries.solutions.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = industries.solutions.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    const next = industries.solutions[nextIndex];
    if (!next) return;
    setActiveId(next.id);
    document.getElementById(`industry-tab-${next.id}`)?.focus();
  };

  return (
    <section className="container-site pb-8 sm:pb-12" aria-labelledby="industries-heading">
      <Reveal>
        <SectionHeading id="industries-heading" title={home.industries.headline} align="center" />
      </Reveal>
      <Reveal delay={0.08}>
        <div
          ref={tabListRef}
          className="edge-fade mt-9 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0"
          role="tablist"
          aria-label="Industry overviews"
        >
          {industries.solutions.map((industry, index) => {
            const Icon = industryIcons[industry.icon];
            const item = industries.homeSnapshots[industry.id];
            const selected = industry.id === active.id;
            return (
              <button
                key={industry.id}
                id={`industry-tab-${industry.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="industry-overview-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(industry.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cn(
                  "group flex min-h-14 shrink-0 snap-center items-center gap-2.5 rounded-full border px-4 text-sm font-semibold transition-[border-color,background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-orange",
                  selected
                    ? "border-orange bg-orange text-ink shadow-glow-sm"
                    : "border-line-strong bg-surface text-foreground",
                )}
              >
                <Icon
                  className={cn("size-4 shrink-0", selected ? "text-ink" : "text-orange")}
                  strokeWidth={1.7}
                  aria-hidden
                />
                <IndustryName name={item.name} />
                {industry.id === "e-commerce" && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 font-mono text-[8px] uppercase tracking-wider",
                      selected ? "bg-ink text-foreground" : "bg-orange text-ink",
                    )}
                  >
                    {home.industries.flagship}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>
      <Reveal delay={0.12} className="mt-5">
        <motion.div
          key={active.id}
          id="industry-overview-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active.id}`}
          className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface p-3 shadow-inset-top sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        >
          <div
            className="absolute inset-0 dotted-grid opacity-20 [mask-image:linear-gradient(90deg,transparent,#000)]"
            aria-hidden
          />
          <div className="relative grid lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative flex flex-col p-5 sm:p-9 lg:p-11">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,var(--glow-spot),transparent_58%)] opacity-15"
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-[20px] border border-orange/40 bg-orange/10 text-orange shadow-glow-sm">
                  <ActiveIcon className="size-6" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-dim">
                  {String(
                    industries.solutions.findIndex((item) => item.id === active.id) + 1,
                  ).padStart(2, "0")}
                  <span className="mx-2 text-line-strong">/</span>06
                </span>
              </div>
              <h3 className="type-h2 relative mt-8 max-w-[15ch]">
                <IndustryName name={snapshot.name} />
              </h3>
              <div className="relative mt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
                  {home.industries.howTheyBuy}
                </p>
                <p className="mt-2 max-w-[42ch] text-balance text-lg font-medium leading-snug text-foreground/90">
                  {snapshot.howTheyBuy}
                </p>
              </div>
              <Link
                to="/industries"
                hash={active.id}
                className="group relative mt-8 inline-flex min-h-12 w-fit max-w-full items-center gap-3 rounded-full border border-line-strong bg-background/50 pl-5 pr-1.5 text-sm font-semibold text-foreground transition-colors hover:border-orange"
              >
                <span className="text-balance">{snapshot.linkLabel}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange text-ink">
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </div>
            <div className="relative border-t border-line bg-background/55 p-4 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
              <div className="rounded-[24px] border border-line-strong bg-raised p-3 shadow-inset-top sm:p-5">
                <SystemRail compact active="sales" />
                <ol className="mt-4 grid gap-2 sm:grid-cols-3">
                  {snapshot.stages.map((stage) => (
                    <li
                      key={stage}
                      className="flex min-h-11 items-center justify-center rounded-xl border border-orange/25 bg-orange/[.06] px-2 py-2 text-center text-[11px] font-semibold leading-tight text-foreground/90"
                    >
                      {stage}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
