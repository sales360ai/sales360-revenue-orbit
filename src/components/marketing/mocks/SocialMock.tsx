import { CalendarDays, Images, Play } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";
import { cn } from "@/lib/utils";

const m = marketing.mocks.social;

export default function SocialMock() {
  return (
    <MockWindow title={m.title} status={m.scheduled}>
      <div className="mx-auto grid w-full max-w-[440px] grid-cols-4 gap-2.5">
        {m.days.map((day, index) => {
          const type = m.types[index] ?? "Carousel";
          return (
            <article key={day} className="min-w-0">
              <div className="relative h-24 w-full overflow-hidden rounded-xl border border-line bg-surface-2 sm:h-28">
                <div
                  className={cn(
                    "absolute inset-0",
                    index % 3 === 0 ? "bg-grad opacity-70" : "dotted-grid opacity-60",
                  )}
                />
                <div
                  className={cn(
                    "absolute rounded-full border border-orange/50 bg-background/35",
                    index % 2 === 0 ? "-bottom-3 -right-3 size-16" : "-left-4 -top-3 size-20",
                  )}
                />
                <div className="absolute inset-x-2 bottom-2 h-1/3 rounded-lg bg-background/65 backdrop-blur-sm" />
                <span className="absolute left-2 top-2 font-mono text-[8px] text-foreground/80">
                  {day}
                </span>
                <span className="absolute bottom-3 right-2 grid size-6 place-items-center rounded-full bg-foreground text-orange-deep">
                  {type === "Reel" ? (
                    <Play className="size-3 fill-current" aria-hidden />
                  ) : (
                    <Images className="size-3" aria-hidden />
                  )}
                </span>
              </div>
              <p className="mt-1.5 truncate text-center text-[8px] text-muted-foreground">{type}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-surface/60 px-3 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
          <CalendarDays className="size-3.5 text-orange" aria-hidden />
          {m.scheduled}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-1.5 rounded-full bg-orange" />
          <span className="size-1.5 rounded-full bg-orange/50" />
          <span className="size-1.5 rounded-full bg-orange/25" />
        </div>
      </div>
    </MockWindow>
  );
}
