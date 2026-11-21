import { ArrowRight, Mail, MousePointerClick, Send } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.email;

export default function EmailMock() {
  return (
    <MockWindow title={m.title} status={m.live}>
      <div className="flex items-center gap-2 sm:gap-3">
        {m.steps.map((step, index) => (
          <div key={step} className="contents">
            <div className="flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-orange/25 bg-orange/[.055] px-2 py-5 text-center">
              <span className="grid size-9 place-items-center rounded-full bg-orange/10 text-orange">
                {index === 0 ? (
                  <Send className="size-4" aria-hidden />
                ) : index === 1 ? (
                  <Mail className="size-4" aria-hidden />
                ) : (
                  <MousePointerClick className="size-4" aria-hidden />
                )}
              </span>
              <span className="mt-3 text-[10px] font-semibold">{step}</span>
              <span className="mt-1 font-mono text-[7px] text-dim">0{index + 1}</span>
            </div>
            {index < m.steps.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-orange" aria-hidden />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {m.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-surface/65 p-4">
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl font-extrabold text-amber">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-background/50 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] text-muted-foreground">{m.reputation}</span>
          <strong className="font-mono text-[10px] text-amber">{m.reputationValue}</strong>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-3">
          <div className="h-full w-[96%] rounded-full bg-grad shadow-glow-sm" />
        </div>
        <div className="mt-3 flex justify-between" aria-hidden>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((tick) => (
            <span key={tick} className="h-3 w-px bg-line-strong" />
          ))}
        </div>
      </div>
    </MockWindow>
  );
}
