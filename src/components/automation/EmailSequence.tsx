import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck2,
  Clock3,
  GitBranch,
  Mail,
  MailCheck,
  MousePointerClick,
  RefreshCw,
  Reply,
} from "lucide-react";
import { automation } from "@/content/automation";
import { AutomationWindow } from "./AutomationWindow";
import { EASE } from "@/components/system/motion";
import { cn } from "@/lib/utils";

const email = automation.email;
const icons = [MousePointerClick, Mail, Clock3, GitBranch, MailCheck, CalendarCheck2];

export function EmailSequence() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? email.nodes.length - 1 : 0);

  useEffect(() => {
    if (reduce) {
      setActive(email.nodes.length - 1);
      return;
    }
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % email.nodes.length),
      1400,
    );
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <div className="relative pb-8">
      <AutomationWindow title={email.windowTitle} status={email.live}>
        <div className="mb-4 flex justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/[.07] px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider text-amber">
            <RefreshCw className="size-3" aria-hidden />
            {email.sync}
          </span>
        </div>
        <div role="img" aria-label="Email automation from pricing-page trigger to meeting booked">
          {email.nodes.map((node, index) => {
            const Icon = icons[index] ?? Mail;
            const selected = active === index;
            return (
              <div key={node.label}>
                <motion.div
                  animate={{ scale: !reduce && selected ? 1.015 : 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className={cn(
                    "relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-[background-color,border-color]",
                    selected
                      ? "border-orange/60 bg-orange/[.09] shadow-glow-sm"
                      : "border-line bg-surface/65",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-xl border",
                      selected
                        ? "border-orange bg-orange text-ink"
                        : "border-line-strong bg-background text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold">{node.label}</p>
                    <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                      {node.detail}
                    </p>
                  </div>
                  <span
                    className={cn("font-mono text-[8px]", selected ? "text-amber" : "text-muted-foreground")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                {index < email.nodes.length - 1 && (
                  <div className="relative ml-[31px] h-5 w-px border-l border-dashed border-orange/35">
                    {!reduce && index === active && (
                      <span className="flow-pulse-y absolute -left-[3px] top-0 size-1.5 rounded-full bg-orange shadow-glow-sm" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AutomationWindow>
      <AnimatePresence>
        {(active >= 4 || reduce) && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute bottom-0 right-3 flex items-center gap-2.5 rounded-xl border border-orange/50 bg-raised/95 px-3.5 py-3 shadow-glow-sm backdrop-blur-xl"
          >
            <span className="grid size-8 place-items-center rounded-full bg-orange text-ink">
              <Reply className="size-3.5" aria-hidden />
            </span>
            <span className="text-[9px] font-semibold">{email.reply}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
