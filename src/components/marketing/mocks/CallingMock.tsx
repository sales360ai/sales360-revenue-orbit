import { AudioLines, Grid3X3, Mic, Pause, PhoneCall, PhoneOff, Sparkles } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.calling;
const bars = [
  30, 55, 78, 42, 88, 62, 38, 72, 94, 52, 68, 45, 82, 58, 34, 66, 86, 48, 74, 40, 62, 80, 44, 70,
  50, 84, 36, 64,
];
const controlIcons = [Mic, Grid3X3, Pause, PhoneOff];

export default function CallingMock() {
  const activeCaller = m.calls[0];

  return (
    <MockWindow title={m.console} status={m.agents}>
      <div className="overflow-hidden rounded-2xl border border-orange/25 bg-orange/[.045]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange/20 px-4 py-3">
          <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-amber">
            <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" />
            {m.liveCall}
          </span>
          <span className="rounded-full border border-orange/25 px-2.5 py-1 text-[8px] text-amber">
            {m.callSentiment}
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-grad font-display text-sm font-bold text-ink">
              {activeCaller.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{activeCaller.name}</p>
              <p className="mt-1 text-[9px] text-muted-foreground">{m.callPurpose}</p>
            </div>
            <PhoneCall className="ml-auto size-5 shrink-0 text-orange" aria-hidden />
          </div>
          <div className="mt-5 flex h-16 items-center gap-1" aria-hidden>
            {bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="wave-bar h-full flex-1 origin-center rounded-full bg-grad"
                style={{ height: `${height}%`, animationDelay: `${index * -0.05}s` }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2.5">
            {m.controls.map((control, index) => {
              const Icon = controlIcons[index] ?? Mic;
              return (
                <span
                  key={control}
                  title={control}
                  className={
                    index === m.controls.length - 1
                      ? "grid size-11 place-items-center rounded-full bg-orange text-ink"
                      : "grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-muted-foreground"
                  }
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="sr-only">{control}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-background/55 p-4">
        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          <AudioLines className="size-3.5 text-orange" aria-hidden />
          {m.transcriptLabel}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-foreground/85">“{m.transcript}”</p>
      </div>
      <div className="mt-3 rounded-2xl border border-orange/25 bg-surface/60 p-4">
        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-amber">
          <Sparkles className="size-3.5" aria-hidden />
          {m.summaryLabel}
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{m.summary}</p>
      </div>
    </MockWindow>
  );
}
