import { Search, Sparkles } from "lucide-react";
import { marketing } from "@/content/marketing";
import searchVisibility from "@/assets/search-visibility-landscape.png.asset.json";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.seo;

export default function SeoMock() {
  return (
    <MockWindow title={m.resultUrl} status="SEO + AEO">
      <div className="relative mx-auto aspect-[3/2] min-h-[370px] w-full max-w-[650px] sm:min-h-[440px]">
        <div
          className="absolute inset-0 dotted-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_72%)]"
          aria-hidden
        />
        <div className="absolute inset-[18%] rounded-full bg-orange/10 blur-3xl" aria-hidden />
        <img
          src={searchVisibility.url}
          alt={m.captureAlt}
          width={1200}
          height={800}
          loading="eager"
          decoding="sync"
          className="relative h-full w-full scale-[1.45] object-contain sm:scale-125"
        />
        <span className="absolute left-0 top-[12%] inline-flex items-center gap-2 rounded-xl border border-orange/30 bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-amber shadow-glow-sm">
          <Search className="size-3.5 text-orange" aria-hidden />
          {m.visualBadges[0]}
        </span>
        <span className="absolute bottom-[12%] right-0 inline-flex items-center gap-2 rounded-xl border border-line-strong bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-foreground shadow-xl">
          <Sparkles className="size-3.5 text-orange" aria-hidden />
          {m.visualBadges[1]}
        </span>
      </div>
    </MockWindow>
  );
}
