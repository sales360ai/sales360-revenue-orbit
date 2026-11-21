import { Bot, Link2, Search, Sparkles } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.seo;

export default function SeoMock() {
  return (
    <MockWindow title={m.resultUrl} status="SEO + AEO">
      <div className="flex h-11 items-center gap-3 rounded-full border border-line-strong bg-background px-4">
        <Search className="size-4 text-orange" aria-hidden />
        <span className="truncate text-[11px] text-foreground/85">{m.query}</span>
      </div>
      <div className="relative mt-5 rounded-2xl border border-orange/30 bg-orange/[.035] p-4">
        <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-grad font-display text-xs font-extrabold text-ink shadow-glow-sm">
          {m.resultBadge}
        </span>
        <div className="flex items-center gap-2 pr-10 text-[9px] text-muted-foreground">
          <span className="grid size-5 place-items-center rounded-full bg-orange/10 font-display text-[8px] font-bold text-orange">
            S
          </span>
          {m.resultUrl}
        </div>
        <h3 className="mt-2 max-w-[85%] text-sm font-semibold leading-snug text-amber">
          {m.resultTitle}
        </h3>
        <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{m.resultBody}</p>
      </div>
      <div className="mt-3 border-b border-line pb-4">
        <p className="text-xs font-medium text-foreground/75">{m.secondResult}</p>
        <p className="mt-1 font-mono text-[8px] text-dim">{m.resultUrl}/sales</p>
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-surface/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-amber">
            <Sparkles className="size-3.5" aria-hidden />
            {m.aiLabel}
          </span>
          <Bot className="size-4 text-dim" aria-hidden />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-foreground/85">{m.answer}</p>
        <div className="mt-4 flex items-center gap-2 border-t border-line pt-3">
          <span className="grid size-5 place-items-center rounded-full bg-orange font-mono text-[8px] text-ink">
            {m.source}
          </span>
          <Link2 className="size-3 text-orange" aria-hidden />
          <span className="text-[9px] font-medium text-muted-foreground">{m.sourceLabel}</span>
        </div>
      </div>
    </MockWindow>
  );
}
