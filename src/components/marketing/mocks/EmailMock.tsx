import { ArrowRight, Check, Mail, MousePointerClick, Send, Zap } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.email;
const stepIcons = [Send, Mail, MousePointerClick];

export default function EmailMock() {
  return (
    <MockWindow title={m.workspace} status={m.live}>
      <div className="grid gap-4 min-[1200px]:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-2xl border border-line bg-background/55 p-4">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <span className="text-[11px] font-semibold">{m.title}</span>
            <span className="rounded-full bg-orange/10 px-2 py-1 font-mono text-[7px] uppercase tracking-wider text-amber">
              {m.live}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-orange/30 bg-orange/[.07] p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange text-ink">
              <Zap className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-semibold">{m.trigger}</p>
              <p className="mt-1 font-mono text-[7px] text-muted-foreground">{m.triggerMeta}</p>
            </div>
          </div>
          <div className="relative mt-3 space-y-2.5 before:absolute before:bottom-8 before:left-[21px] before:top-3 before:w-px before:bg-orange/25">
            {m.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Mail;
              return (
                <div
                  key={step}
                  className="relative flex items-center gap-3 rounded-xl border border-line bg-surface p-3"
                >
                  <span className="z-10 grid size-[42px] shrink-0 place-items-center rounded-lg border border-orange/25 bg-background text-orange">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold">{step}</p>
                    <p className="mt-1 font-mono text-[7px] text-muted-foreground">{m.delays[index]}</p>
                  </div>
                  <Check className="size-3.5 text-orange" aria-hidden />
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line-strong bg-foreground text-background shadow-xl">
          <div className="flex items-center justify-between border-b border-background/10 px-4 py-3">
            <span className="font-mono text-[8px] uppercase tracking-wider opacity-60">
              {m.previewLabel}
            </span>
            <Mail className="size-4 text-orange-deep" aria-hidden />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[9px] opacity-55">{m.previewFrom}</p>
            <h3 className="mt-2 font-display text-lg font-bold leading-tight [font-variation-settings:'wdth'_108]">
              {m.previewSubject}
            </h3>
            <div className="mt-5 border-t border-background/10 pt-5 text-[10px] leading-relaxed">
              <p className="font-semibold">{m.previewGreeting}</p>
              <p className="mt-3 opacity-70">{m.previewBody}</p>
              <span className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-orange px-4 font-semibold text-ink">
                {m.previewCta}
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {m.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-line bg-surface/65 px-4 py-3">
            <p className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 font-display text-xl font-extrabold text-amber">{stat.value}</p>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}
