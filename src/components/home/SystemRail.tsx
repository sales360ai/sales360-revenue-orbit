import { motion, useReducedMotion } from "framer-motion";
import { Bot, ChartNoAxesCombined, Cloud, Megaphone } from "lucide-react";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

export type SystemRailId = "sales" | "marketing" | "automation" | "tech-cloud";

const nodeIcons = {
  marketing: Megaphone,
  automation: Bot,
  sales: ChartNoAxesCombined,
} as const;

export function SystemRail({
  active = "sales",
  compact = false,
}: {
  active?: SystemRailId;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const rail = home.pillars.rail;

  return (
    <div
      className={cn(
        "relative mx-auto w-full rounded-[24px] border border-line bg-background/55",
        compact ? "p-3" : "max-w-5xl p-4 sm:p-6",
      )}
      aria-label={rail.accessibilityLabel}
    >
      <div className="relative">
        <div
          className={cn(
            "absolute left-[14%] right-[14%] h-px overflow-hidden bg-line-strong",
            compact ? "top-7" : "top-8 sm:top-9",
          )}
          aria-hidden
        >
          <motion.span
            className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-orange to-transparent"
            initial={reduce ? { opacity: 0.65, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            animate={
              reduce ? { opacity: 0.65, scaleX: 1 } : { opacity: [0, 0.9, 0], scaleX: [0, 1, 1] }
            }
            transition={{
              duration: reduce ? 0 : 2.8,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="relative grid grid-cols-3 gap-2 sm:gap-4">
          {rail.nodes.map((node) => {
            const Icon = nodeIcons[node.id];
            const selected = active === node.id;
            return (
              <div
                key={node.id}
                data-system-node={node.id}
                data-active={selected || undefined}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-center rounded-2xl border text-center transition-[border-color,background-color,box-shadow,transform] duration-300",
                  compact ? "min-h-[76px] px-1.5 py-2" : "min-h-[104px] px-2 py-3 sm:min-h-[116px]",
                  selected
                    ? "-translate-y-0.5 border-orange bg-orange/15 shadow-glow-sm"
                    : "border-line-strong bg-surface",
                )}
              >
                <span
                  className={cn(
                    "grid place-items-center rounded-xl border",
                    compact ? "size-7" : "size-8 sm:size-9",
                    selected
                      ? "border-orange/50 bg-orange text-ink"
                      : "border-line bg-orange/10 text-orange",
                  )}
                >
                  <Icon className={compact ? "size-3.5" : "size-4"} strokeWidth={1.8} aria-hidden />
                </span>
                <span
                  className={cn(
                    "mt-2 max-w-full text-balance font-semibold leading-tight",
                    compact ? "text-[9px] sm:text-[10px]" : "text-[11px] sm:text-sm",
                    selected ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        data-system-node="tech-cloud"
        data-active={active === "tech-cloud" || undefined}
        className={cn(
          "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border text-center font-medium transition-[border-color,background-color,box-shadow] duration-300",
          compact
            ? "min-h-9 px-2 py-2 text-[9px] sm:text-[10px]"
            : "min-h-11 px-3 py-2.5 text-[10px] sm:text-xs",
          active === "tech-cloud"
            ? "border-orange bg-orange/15 text-foreground shadow-glow-sm"
            : "border-line bg-surface/75 text-muted-foreground",
        )}
      >
        <Cloud className="size-3.5 shrink-0 text-orange" strokeWidth={1.8} aria-hidden />
        <span className="text-balance">{rail.base}</span>
      </div>
    </div>
  );
}
