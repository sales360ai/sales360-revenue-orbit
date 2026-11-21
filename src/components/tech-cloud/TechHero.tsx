import { useEffect, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cloud, DatabaseBackup, MapPin, ShieldCheck } from "lucide-react";
import { techCloud } from "@/content/tech-cloud";
import { useLeadModal } from "@/components/lead/LeadModal";
import { EASE } from "@/components/system/motion";
import { Button, DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";

const h = techCloud.hero;
const ui = techCloud.console;

function Sparkline({
  label,
  value,
  paths,
  phase,
  index,
}: {
  label: string;
  value: string;
  paths: readonly string[];
  phase: number;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-2xl border border-line bg-background/55 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-[9px] font-semibold text-amber">{value}</span>
      </div>
      <svg className="mt-2 h-12 w-full" viewBox="0 0 200 56" fill="none" aria-hidden>
        <path d="M0 48H200" stroke="var(--line)" />
        <motion.g
          key={phase}
          initial={{ opacity: reduce ? 1 : 0.65, y: reduce ? 0 : 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <path
            d={paths[phase % paths.length]}
            stroke="var(--orange)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="200" cy={22 + ((phase + index) % 3) * 3} r="3" fill="var(--orange-amber)" />
        </motion.g>
      </svg>
    </div>
  );
}

function MonitoringConsole() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [blocked, setBlocked] = useState<number>(ui.wafStart);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setPhase((current) => current + 1);
      setBlocked((current) => current + 3);
    }, 2600);
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
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -6,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };

  return (
    <div className="[perspective:1400px]">
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden rounded-[22px] border border-line-strong bg-raised shadow-2xl [transform-style:preserve-3d]"
        role="img"
        aria-label="Cloud monitoring console showing 99.9% uptime, live resources, WAF protection, and off-site backups"
      >
        <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-orange" />
              <span className="size-2 rounded-full bg-surface-3" />
              <span className="size-2 rounded-full bg-surface-3" />
            </div>
            <span className="hidden text-[10px] font-semibold sm:block">{ui.title}</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[8px] font-medium text-foreground/85 sm:text-[9px]">
            <span
              className="size-2 shrink-0 rounded-full bg-success animate-pulse-dot"
              aria-hidden
            />
            {ui.status}
          </span>
        </div>

        <div className="p-3.5 sm:p-5">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-line bg-background/55 p-4 sm:gap-6 sm:p-5">
            <div className="relative grid size-28 place-items-center sm:size-32">
              <svg
                className="absolute inset-0 size-full -rotate-90"
                viewBox="0 0 120 120"
                aria-hidden
              >
                <circle
                  cx="60"
                  cy="60"
                  r="51"
                  fill="none"
                  stroke="var(--surface-3)"
                  strokeWidth="7"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="51"
                  fill="none"
                  stroke="var(--orange)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="99.9 100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              </svg>
              <div className="text-center">
                <p className="font-display text-2xl font-extrabold text-grad sm:text-3xl">
                  {ui.uptime}
                </p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
                  {ui.uptimeLabel}
                </p>
              </div>
            </div>
            <div className="min-w-0">
              <span className="grid size-10 place-items-center rounded-xl border border-orange/25 bg-orange/[.08] text-orange">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <p className="mt-4 text-[9px] leading-relaxed text-muted-foreground">{ui.wafLabel}</p>
              <p className="mt-1 font-display text-3xl font-extrabold [font-variation-settings:'wdth'_115]">
                {blocked.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {ui.metrics.map((metric, index) => (
              <div key={metric.label} className={index === 2 ? "hidden sm:block" : undefined}>
                <Sparkline {...metric} phase={phase} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-line bg-background/55 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2.5 text-[9px] text-foreground/85">
              <DatabaseBackup className="size-4 shrink-0 text-orange" aria-hidden />
              {ui.backup}
            </span>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange/25 bg-orange/[.07] px-3 py-1.5 font-mono text-[8px] text-amber">
              <MapPin className="size-3" aria-hidden />
              {ui.region}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TechHero() {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section
      className="container-site max-w-[1440px] pt-[104px] sm:pt-[120px]"
      aria-labelledby="tech-hero-title"
    >
      <DottedGridFrame className="px-5 py-10 sm:px-10 sm:py-14 lg:min-h-[680px] lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <motion.div {...rise(0.08)}>
              <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
            </motion.div>
            <motion.h1
              {...rise(0.16)}
              id="tech-hero-title"
              className="type-h1 mt-7 max-w-[14ch] text-balance"
            >
              {h.titleLead} <span className="text-grad">{h.accent}</span>
            </motion.h1>
            <motion.p
              {...rise(0.24)}
              className="mt-6 max-w-[58ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {h.sub}
            </motion.p>
            <motion.div {...rise(0.32)} className="mt-8">
              <Button onClick={() => open(h.interest)} className="w-full text-ink sm:w-auto">
                {h.primary}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="min-w-0 lg:col-span-7"
          >
            <MonitoringConsole />
          </motion.div>
        </div>
      </DottedGridFrame>
    </section>
  );
}
