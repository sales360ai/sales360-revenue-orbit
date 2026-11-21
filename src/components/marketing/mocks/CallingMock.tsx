import { AudioLines, PhoneCall } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";
import { cn } from "@/lib/utils";

const m = marketing.mocks.calling;
const bars = [
  30, 55, 78, 42, 88, 62, 38, 72, 94, 52, 68, 45, 82, 58, 34, 66, 86, 48, 74, 40, 62, 80, 44, 70,
  50, 84, 36, 64,
];

export default function CallingMock() {
  return (
    <MockWindow title={m.title} status={m.agents}>
      <div className="grid grid-cols-3 gap-2 border-b border-line pb-3 font-mono text-[7px] uppercase tracking-wider text-dim">
        {m.headers.map((header) => (
          <span key={header}>{header}</span>
        ))}
      </div>
      <div>
        {m.calls.map((call) => (
          <div
            key={call.name}
            className="grid grid-cols-3 items-center gap-2 border-b border-line/70 py-3.5 last:border-0"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-orange/25 bg-orange/10 font-mono text-[8px] text-amber">
                {call.initials}
              </span>
              <span className="truncate text-[9px] font-medium">{call.name}</span>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground">{call.duration}</span>
            <span
              className={cn(
                "w-fit rounded-full border px-2 py-1 text-[8px]",
                call.status === "Booked"
                  ? "border-orange bg-orange text-ink"
                  : "border-orange/25 bg-orange/[.06] text-amber",
              )}
            >
              {call.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-surface/60 p-4">
        <div className="flex items-center gap-2">
          <PhoneCall className="size-4 text-orange" aria-hidden />
          <AudioLines className="size-4 text-dim" aria-hidden />
          <span className="ml-auto size-1.5 rounded-full bg-orange animate-pulse-dot" />
        </div>
        <div className="mt-4 flex h-16 items-center gap-1" aria-hidden>
          {bars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="wave-bar h-full flex-1 origin-center rounded-full bg-grad"
              style={{ height: `${height}%`, animationDelay: `${index * -0.05}s` }}
            />
          ))}
        </div>
        <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          {m.waveformLabel}
        </p>
      </div>
    </MockWindow>
  );
}
