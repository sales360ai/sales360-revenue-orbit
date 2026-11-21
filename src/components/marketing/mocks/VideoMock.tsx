import { AudioLines, Captions, Film, Play, Scissors, Volume2 } from "lucide-react";
import { marketing } from "@/content/marketing";
import founderPortrait from "@/assets/founder-viswa-korapala.webp.asset.json";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.video;
const trackIcons = [Film, Captions, AudioLines];

export default function VideoMock() {
  return (
    <MockWindow title={m.studio} status={m.cutLabel}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line-strong bg-background">
        <img
          src={founderPortrait.url}
          alt={m.previewAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[center_24%] opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/5 to-transparent" />
        <span
          role="img"
          aria-label={m.play}
          className="absolute left-1/2 top-[43%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange/60 bg-background/80 text-orange shadow-glow-sm backdrop-blur-md"
        >
          <Play className="ml-1 size-5 fill-current" aria-hidden />
        </span>
        <p className="absolute inset-x-5 bottom-12 text-center font-display text-sm font-bold leading-snug text-foreground sm:text-base">
          {m.caption}
        </p>
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-full bg-background/85 px-3 py-2 backdrop-blur-md">
          <span className="font-mono text-[8px] text-foreground/80">{m.duration}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
            <div className="h-full w-[53%] rounded-full bg-orange" />
          </div>
          <Volume2 className="size-3.5 text-muted-foreground" aria-hidden />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-background/55">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            <Scissors className="size-3.5 text-orange" aria-hidden />
            {m.timeline}
          </span>
          <span className="font-mono text-[8px] text-amber">{m.duration}</span>
        </div>
        <div className="space-y-2 p-3">
          {m.tracks.map((track, index) => {
            const Icon = trackIcons[index] ?? Film;
            return (
              <div key={track} className="grid grid-cols-[76px_1fr] items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[8px] text-muted-foreground">
                  <Icon className="size-3 text-orange" aria-hidden />
                  {track}
                </span>
                <div className="flex h-8 gap-1">
                  {[0, 1, 2, 3].map((clip) => (
                    <span
                      key={clip}
                      className={
                        index === 0
                          ? "relative flex-1 overflow-hidden rounded-md border border-orange/35 bg-orange/15"
                          : index === 1
                            ? "flex-1 rounded-md border border-line-strong bg-surface-2"
                            : "flex-1 rounded-md border border-orange/20 bg-orange/[.07]"
                      }
                    >
                      {index === 0 && (
                        <img
                          src={founderPortrait.url}
                          alt=""
                          className="h-full w-full object-cover object-top opacity-60"
                        />
                      )}
                      {index === 2 && (
                        <span
                          className="flex h-full items-center justify-center gap-[2px]"
                          aria-hidden
                        >
                          {[35, 70, 45, 85, 55, 75, 40, 65].map((height, bar) => (
                            <span
                              key={bar}
                              className="w-px rounded-full bg-orange"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MockWindow>
  );
}
