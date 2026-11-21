import { Play, Volume2 } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.video;

export default function VideoMock() {
  return (
    <MockWindow title={m.title} status="4K">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-background">
        <div className="absolute inset-0 dotted-grid opacity-40" />
        <div className="absolute -bottom-1/2 left-1/2 h-full w-[120%] -translate-x-1/2 rounded-full bg-horizon opacity-75" />
        <div className="absolute left-[12%] top-[16%] h-[60%] w-[32%] rotate-6 rounded-2xl border border-orange/30 bg-surface/80 shadow-glow-sm" />
        <div className="absolute right-[10%] top-[8%] h-[70%] w-[38%] -rotate-6 rounded-2xl border border-line-strong bg-raised/85" />
        <span
          role="img"
          aria-label={m.play}
          className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-grad text-ink shadow-glow-sm"
        >
          <Play className="ml-1 size-5 fill-current" aria-hidden />
        </span>
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-full bg-background/75 px-3 py-2 backdrop-blur-md">
          <span className="font-mono text-[8px] text-foreground/80">{m.duration}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
            <div className="h-full w-[53%] rounded-full bg-orange" />
          </div>
          <Volume2 className="size-3.5 text-muted-foreground" aria-hidden />
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-surface/55 p-4">
        <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          {m.engagement}
        </p>
        <div className="mt-4 flex h-28 items-end justify-around gap-4 border-b border-line-strong px-3">
          {m.bars.map((bar) => (
            <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1.5 font-mono text-[8px] text-amber">{bar.value}</span>
              <div
                className="w-full max-w-10 rounded-t-lg bg-grad"
                style={{ height: bar.height }}
              />
              <span className="mt-2 font-mono text-[8px] text-dim">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </MockWindow>
  );
}
