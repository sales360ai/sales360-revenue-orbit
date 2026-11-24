import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Workflow } from "lucide-react";
import type { IndustrySolution } from "@/content/industries";
import { industryIcons } from "./industry-icons";
import { SampleDataChip } from "@/components/system/primitives";

export function IndustryVisual({ industry }: { industry: IndustrySolution }) {
  const Icon = industryIcons[industry.icon];
  const reduce = useReducedMotion();

  return (
    <div
      className="relative mx-auto min-h-[380px] w-full max-w-[560px] sm:min-h-[440px]"
      aria-label={`${industry.label} system illustration`}
      role="img"
    >
      <div
        className="absolute inset-0 dotted-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_72%)]"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/15"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-orange/25"
        aria-hidden
      />
      <div
        className="absolute left-[16%] top-[18%] h-[58%] w-[68%] rounded-full bg-orange/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="absolute inset-x-[3%] top-[8%] overflow-hidden rounded-[24px] border border-line-strong bg-background/90 shadow-2xl backdrop-blur-md"
        initial={false}
        animate={{ y: reduce ? 0 : [0, -5, 0] }}
        transition={{ duration: 6, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-11 items-center justify-between gap-3 border-b border-line px-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-1.5 rounded-full bg-orange" />
            <span className="size-1.5 rounded-full bg-surface-3" />
            <span className="size-1.5 rounded-full bg-surface-3" />
          </div>
          <span className="hidden truncate font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground min-[420px]:block">
            Sales360.ai
          </span>
          <span className="flex items-center gap-2">
            <SampleDataChip />
            <Workflow className="size-3.5 text-orange" aria-hidden />
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-orange/30 bg-orange/10 text-orange">
              <Icon className="size-5" strokeWidth={1.6} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {industry.visual.title}
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-amber">
                <span className="size-1 rounded-full bg-orange" aria-hidden />
                {industry.visual.status}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-2">
            {industry.features.map((feature, index) => (
              <div
                key={feature.title}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-line bg-surface/75 px-3 py-2.5"
              >
                <span className="font-mono text-[8px] text-orange">0{index + 1}</span>
                <span className="truncate text-[10px] font-medium text-foreground/85 sm:text-xs">
                  {feature.title}
                </span>
                <Check className="size-3.5 text-orange" strokeWidth={1.8} aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[2%] left-0 max-w-[78%] rounded-2xl border border-orange/30 bg-raised/95 p-3.5 shadow-glow-sm backdrop-blur-md sm:left-[2%] sm:p-4"
        initial={false}
        animate={{ x: reduce ? 0 : [0, 5, 0] }}
        transition={{ duration: 5, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-amber">
          {industry.useCases[0].title}
        </p>
        <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
          {industry.useCases[0].description}
        </p>
      </motion.div>

      <div className="absolute right-0 top-[3%] grid size-12 place-items-center rounded-2xl border border-orange/35 bg-background text-orange shadow-glow-sm sm:size-14">
        <ArrowUpRight className="size-5" strokeWidth={1.6} aria-hidden />
      </div>
    </div>
  );
}
