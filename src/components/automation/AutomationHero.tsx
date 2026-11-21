import { motion, useReducedMotion } from "framer-motion";
import { Bot, FileText, Mail, MessageCircle, MousePointerClick } from "lucide-react";
import { automation } from "@/content/automation";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { EASE } from "@/components/system/motion";
import { Button, DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";

const h = automation.hero;
const actionIcons = [MessageCircle, Mail, FileText];
const actionTops = ["19%", "50%", "81%"];
const paths = [
  "M72 180 C135 180 170 180 218 180",
  "M302 180 C350 180 366 70 430 70",
  "M302 180 C354 180 376 180 430 180",
  "M302 180 C350 180 366 290 430 290",
];

function WorkflowGraph() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[380px]"
      role="img"
      aria-label="A new lead trigger flowing through an AI agent into WhatsApp, email, and content actions"
    >
      <svg className="absolute inset-0 size-full" viewBox="0 0 520 360" fill="none" aria-hidden>
        {paths.map((path) => (
          <path
            key={path}
            d={path}
            stroke="var(--orange)"
            strokeOpacity="0.28"
            strokeWidth="1.25"
            strokeDasharray="4 7"
          />
        ))}
        {!reduce &&
          paths.map((path, index) => (
            <circle key={`pulse-${path}`} r="4" fill="var(--orange-amber)">
              <animateMotion
                dur={`${2.8 + index * 0.25}s`}
                begin={`${index * 0.4}s`}
                repeatCount="indefinite"
                path={path}
              />
            </circle>
          ))}
      </svg>

      <div className="absolute left-0 top-1/2 w-[84px] -translate-y-1/2 rounded-2xl border border-line-strong bg-surface/90 p-3 shadow-inset-top sm:w-[120px] sm:p-4">
        <span className="grid size-8 place-items-center rounded-xl bg-orange/10 text-orange sm:size-10">
          <MousePointerClick className="size-4" aria-hidden />
        </span>
        <p className="mt-3 text-[10px] font-semibold sm:text-xs">{h.graph.trigger}</p>
        <p className="mt-1 font-mono text-[7px] leading-relaxed text-muted-foreground sm:text-[8px]">
          {h.graph.triggerDetail}
        </p>
      </div>

      <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-orange/35 bg-background/90 text-center shadow-glow-sm sm:size-36">
        <SunburstRing size={52} variant="spin" className="absolute opacity-25" />
        <Bot className="relative size-5 text-orange sm:size-6" aria-hidden />
        <p className="relative mt-2 text-[10px] font-semibold sm:text-xs">{h.graph.agent}</p>
        <p className="relative mt-1 max-w-[90px] font-mono text-[6px] leading-relaxed text-muted-foreground sm:text-[7px]">
          {h.graph.agentDetail}
        </p>
      </div>

      {h.graph.actions.map((action, index) => {
        const Icon = actionIcons[index] ?? FileText;
        return (
          <div
            key={action}
            className="absolute right-0 flex w-[104px] -translate-y-1/2 items-center gap-2.5 rounded-2xl border border-line-strong bg-surface/90 p-3 shadow-inset-top sm:w-[142px] sm:gap-3 sm:p-3.5"
            style={{ top: actionTops[index] }}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange sm:size-9">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-[10px] font-semibold sm:text-xs">{action}</span>
          </div>
        );
      })}
    </div>
  );
}

export function AutomationHero() {
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
      aria-labelledby="automation-hero-title"
    >
      <DottedGridFrame className="px-5 py-10 sm:px-10 sm:py-14 lg:min-h-[620px] lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div {...rise(0.08)}>
              <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
            </motion.div>
            <motion.h1
              {...rise(0.16)}
              id="automation-hero-title"
              className="type-h1 mt-7 max-w-[14ch] text-balance"
            >
              {h.titleLead} <span className="text-grad">{h.accent}</span>
            </motion.h1>
            <motion.p
              {...rise(0.24)}
              className="mt-6 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
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
            className="min-w-0 lg:col-span-5"
          >
            <WorkflowGraph />
          </motion.div>
        </div>
      </DottedGridFrame>
    </section>
  );
}
