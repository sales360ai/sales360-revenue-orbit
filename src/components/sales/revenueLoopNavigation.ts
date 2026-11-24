import type { RevenueStageId } from "@/content/sales";

export const REVENUE_LOOP_EVENT = "sales:revenue-stage";

export function focusRevenueLoopStage(stageId: RevenueStageId) {
  window.dispatchEvent(new CustomEvent(REVENUE_LOOP_EVENT, { detail: stageId }));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("revenue-loop")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const prefix = window.matchMedia("(min-width: 1024px)").matches ? "loop-desktop" : "loop-mobile";
  window.requestAnimationFrame(() => {
    document.getElementById(`${prefix}-${stageId}`)?.focus({ preventScroll: true });
  });
}
