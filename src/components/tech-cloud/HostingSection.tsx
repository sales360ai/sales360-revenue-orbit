import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  CloudUpload,
  Cpu,
  DatabaseBackup,
  Scaling,
} from "lucide-react";
import { techCloud } from "@/content/tech-cloud";
import { AutomationWindow } from "@/components/automation/AutomationWindow";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/system/motion";

const hosting = techCloud.hosting;
const ui = hosting.panel;
const icons = [Cpu, Scaling, DatabaseBackup, ArrowRightLeft];

export function HostingSection() {
  const reduce = useReducedMotion();
  return (
    <section className="border-b border-line/60 bg-background" aria-labelledby="hosting-heading">
      <div className="container-site section-y">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <Reveal>
            <h2 id="hosting-heading" className="type-h2 max-w-[15ch] text-balance">
              {hosting.headline}
            </h2>
            <p className="mt-6 max-w-[56ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
              {hosting.description}
            </p>
            <RevealGroup className="mt-9 grid gap-3 sm:grid-cols-2">
              {hosting.specs.map((spec, index) => {
                const Icon = icons[index] ?? Cpu;
                return (
                  <RevealItem key={spec.lead} className="h-full">
                    <article className="h-full rounded-2xl border border-line bg-surface/60 p-4 shadow-inset-top">
                      <Icon className="size-4.5 text-orange" strokeWidth={1.7} aria-hidden />
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        <strong className="block font-semibold text-foreground">
                          {spec.lead}:
                        </strong>
                        <span className="mt-1.5 block">{spec.text}</span>
                      </p>
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Reveal>

          <Reveal delay={0.08}>
            <AutomationWindow title={ui.title} status={ui.status}>
              <div className="space-y-4">
                {ui.gauges.map((gauge, index) => (
                  <div key={gauge.label}>
                    <div className="mb-2 flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{gauge.label}</span>
                      <span className="font-mono text-amber">{gauge.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                      <motion.div
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, delay: index * 0.08, ease: EASE }}
                        className="h-full origin-left rounded-full bg-grad"
                        style={{ width: gauge.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-line bg-background/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold">{ui.scalingLabel}</p>
                    <p className="mt-1 text-[8px] text-muted-foreground">{ui.scalingDetail}</p>
                  </div>
                  <CloudUpload className="size-4 shrink-0 text-orange" aria-hidden />
                </div>
                <svg className="mt-4 h-28 w-full" viewBox="0 0 360 112" fill="none" aria-hidden>
                  <path
                    d="M0 92H360M0 60H360M0 28H360"
                    stroke="var(--line)"
                    strokeDasharray="3 6"
                  />
                  <path
                    d="M0 88 C40 86 58 90 86 82 S126 76 148 70 S164 12 190 18 S216 76 242 64 S280 56 300 48 S334 52 360 42 L360 112 L0 112 Z"
                    fill="var(--orange)"
                    fillOpacity="0.08"
                  />
                  <path
                    d="M0 88 C40 86 58 90 86 82 S126 76 148 70 S164 12 190 18 S216 76 242 64 S280 56 300 48 S334 52 360 42"
                    stroke="var(--orange)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="190"
                    cy="18"
                    r="5"
                    fill="var(--orange-amber)"
                    className="animate-pulse-dot"
                  />
                </svg>
              </div>

              <div className="mt-4 rounded-2xl border border-orange/30 bg-orange/[.055] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-semibold">{ui.migration}</p>
                  <span className="font-mono text-[10px] text-amber">{ui.complete}</span>
                </div>
                <div className="mt-4 flex items-center gap-3 text-[9px] text-muted-foreground">
                  <span>{ui.source}</span>
                  <span className="relative h-px flex-1 bg-orange/30">
                    <ArrowRight
                      className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 text-orange"
                      aria-hidden
                    />
                  </span>
                  <span className="font-medium text-foreground">{ui.destination}</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-3">
                  <motion.div
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="h-full w-full origin-left rounded-full bg-grad"
                  />
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {ui.steps.map((step) => (
                    <span
                      key={step}
                      className="flex items-center gap-1.5 text-[8px] text-foreground/80"
                    >
                      <Check className="size-3 shrink-0 text-orange" aria-hidden />
                      {step}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
                <DatabaseBackup className="size-3.5 text-orange" aria-hidden />
                {ui.backup}
              </p>
            </AutomationWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
