import { useState } from "react";
import { BarChart3, CalendarDays } from "lucide-react";
import { marketing } from "@/content/marketing";
import googlePerformance from "@/assets/google-search-performance.jpg.asset.json";
import metaResults from "@/assets/meta-campaign-results.jpg.asset.json";
import { cn } from "@/lib/utils";
import { MockWindow } from "./MockWindow";
import { ScreenshotPreview } from "./ScreenshotPreview";

const m = marketing.mocks.ads;
const images = {
  google: { src: googlePerformance.url, width: 736, height: 491 },
  meta: { src: metaResults.url, width: 680, height: 510 },
} as const;

type SourceId = keyof typeof images;

export default function AdsMock() {
  const [activeSource, setActiveSource] = useState<SourceId>("google");
  const active = m.sources.find((source) => source.id === activeSource) ?? m.sources[0];

  return (
    <MockWindow title={m.title} status={m.period}>
      <div
        className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-background/70 p-1"
        role="tablist"
        aria-label="Advertising performance source"
      >
        {m.sources.map((source) => (
          <button
            key={source.id}
            type="button"
            role="tab"
            id={`performance-${source.id}-tab`}
            aria-selected={activeSource === source.id}
            aria-controls={`performance-${source.id}-panel`}
            onClick={() => setActiveSource(source.id)}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange",
              activeSource === source.id
                ? "bg-orange text-ink shadow-glow-sm"
                : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            )}
          >
            <BarChart3 className="size-4" aria-hidden />
            {source.label}
          </button>
        ))}
      </div>
      <div
        key={active.id}
        id={`performance-${active.id}-panel`}
        role="tabpanel"
        aria-labelledby={`performance-${active.id}-tab`}
        className="mt-4"
      >
        <ScreenshotPreview
          src={images[active.id].src}
          alt={active.alt}
          width={images[active.id].width}
          height={images[active.id].height}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-surface/60 px-3 py-2.5 text-[9px] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="size-3.5 text-orange" aria-hidden />
          {active.label}
        </span>
        <span className="font-mono uppercase tracking-wider text-amber">{m.period}</span>
      </div>
    </MockWindow>
  );
}
