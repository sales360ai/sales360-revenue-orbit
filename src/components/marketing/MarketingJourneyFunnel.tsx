import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, Check, LayoutDashboard } from "lucide-react";
import { marketing } from "@/content/marketing";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { cn } from "@/lib/utils";

const content = marketing.scrollFunnel;
type FunnelStep = (typeof content.steps)[number];

const widths = ["w-full", "w-[92%] sm:w-[86%]", "w-[84%] sm:w-[72%]"];
const layerStyles = [
  "bg-grad text-ink shadow-glow",
  "border border-orange/45 bg-orange/20 text-foreground shadow-glow-sm",
  "border border-orange/30 bg-surface-2/95 text-foreground",
];

function LayerBody({ step, index }: { step: FunnelStep; index: number }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[104px] flex-col items-center justify-center overflow-hidden px-8 py-4 text-center sm:px-10",
        layerStyles[index],
      )}
      style={{ clipPath: "polygon(0 0, 100% 0, 91% 100%, 9% 100%)" }}
    >
      <span
        className={cn(
          "font-mono text-[8px] uppercase tracking-[.24em]",
          index === 0 ? "text-ink/70" : "text-amber",
        )}
      >
        {step.number} / {step.title}
      </span>
      <span className="mt-2 font-display text-xl font-extrabold uppercase [font-variation-settings:'wdth'_118] sm:text-2xl">
        {step.kicker}
      </span>
      {index === 2 && <LayoutDashboard className="mt-2 size-4 text-orange" aria-hidden />}
    </div>
  );
}

function DesktopLayer({
  step,
  index,
  progress,
  reduce,
}: {
  step: FunnelStep;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index * 0.28;
  const opacity = useTransform(progress, [start, start + 0.16], [index === 0 ? 0.3 : 0, 1]);
  const y = useTransform(progress, [start, start + 0.16], [56, 0]);
  const scale = useTransform(progress, [start, start + 0.16], [0.94, 1]);

  return (
    <motion.div
      data-funnel-layer={step.title}
      className={cn("mx-auto", widths[index])}
      style={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity, y, scale }}
    >
      <LayerBody step={step} index={index} />
    </motion.div>
  );
}

function DesktopDetail({
  step,
  index,
  progress,
  reduce,
}: {
  step: FunnelStep;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index * 0.28;
  const opacity = useTransform(progress, [start + 0.04, start + 0.18], [index === 0 ? 0.3 : 0, 1]);
  const x = useTransform(progress, [start + 0.04, start + 0.18], [28, 0]);

  return (
    <motion.article
      data-funnel-detail={step.title}
      className="relative border-l border-orange/25 pl-5"
      style={reduce ? { opacity: 1, x: 0 } : { opacity, x }}
    >
      <span className="absolute -left-[3px] top-1 size-[5px] rounded-full bg-orange shadow-glow-sm" />
      <p className="font-mono text-[9px] uppercase tracking-[.18em] text-orange">
        {step.number} · {step.title}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold [font-variation-settings:'wdth'_110]">
        {step.kicker}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {step.channels.map((channel) => (
          <span
            key={channel}
            className="rounded-full border border-line bg-background/60 px-3 py-1.5 text-[9px] text-foreground/75"
          >
            {channel}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function MarketingJourneyFunnel() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.82], [0, 1]);

  return (
    <section
      className="container-site section-y scroll-mt-28 pt-0"
      aria-labelledby="marketing-journey-heading"
      id="marketing-journey"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-orange">
          {content.eyebrow}
        </p>
        <h2
          id="marketing-journey-heading"
          className="mt-5 font-display text-[clamp(2.3rem,5vw,4.7rem)] font-extrabold leading-[1.04] tracking-[-0.03em] [font-variation-settings:'wdth'_112]"
        >
          {content.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {content.sub}
        </p>
      </Reveal>

      <RevealGroup className="mt-10 space-y-10 lg:hidden">
        {content.steps.map((step, index) => (
          <RevealItem key={step.title}>
            <article className="mx-auto max-w-xl">
              <div className={cn("mx-auto", widths[index])}>
                <LayerBody step={step} index={index} />
              </div>
              <div className="mt-5 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[.18em] text-orange">
                  {step.number} · {step.title}
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {step.channels.map((channel) => (
                    <span
                      key={channel}
                      className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[9px] text-foreground/75"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <div
        ref={sceneRef}
        data-funnel-scene
        className={cn("relative mt-12 hidden lg:block", reduce ? "h-auto" : "h-[210vh]")}
      >
        <div
          data-funnel-sticky
          className={cn(
            "top-24 flex min-h-[calc(100vh-7rem)] items-center pb-8",
            reduce ? "relative" : "sticky",
          )}
        >
          <div className="relative w-full overflow-hidden rounded-[36px] border border-line-strong bg-surface/45 px-8 py-9 shadow-inset-top xl:px-12">
            <div className="absolute inset-0 dotted-grid opacity-30" aria-hidden />
            <div
              className="absolute -bottom-40 left-1/2 h-72 w-[75%] -translate-x-1/2 rounded-full bg-orange/10 blur-3xl"
              aria-hidden
            />
            <div className="relative mb-8 flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">
                {content.progressLabel}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange/[.06] px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider text-amber">
                <ArrowDown className="size-3.5" aria-hidden />
                {content.eyebrow}
              </span>
            </div>
            <div className="relative grid items-center gap-10 xl:grid-cols-[1.15fr_.85fr] xl:gap-16">
              <div className="space-y-3">
                {content.steps.map((step, index) => (
                  <DesktopLayer
                    key={step.title}
                    step={step}
                    index={index}
                    progress={scrollYProgress}
                    reduce={reduce}
                  />
                ))}
                <div className="flex justify-center pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange/35 bg-background px-4 py-2 text-[10px] font-semibold text-amber shadow-glow-sm">
                    <Check className="size-3.5 text-orange" aria-hidden />
                    {marketing.funnel.commandCenter}
                  </span>
                </div>
              </div>
              <div className="space-y-8">
                {content.steps.map((step, index) => (
                  <DesktopDetail
                    key={step.title}
                    step={step}
                    index={index}
                    progress={scrollYProgress}
                    reduce={reduce}
                  />
                ))}
              </div>
            </div>
            <div className="relative mt-8 h-px overflow-hidden bg-line">
              <motion.div
                className="h-full origin-left bg-grad"
                style={{ scaleX: reduce ? 1 : lineScale }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
