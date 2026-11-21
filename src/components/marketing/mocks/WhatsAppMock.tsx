import { CheckCheck, MessageCircle, ShoppingBag } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.whatsapp;

export default function WhatsAppMock() {
  return (
    <MockWindow title={m.title} status={m.status}>
      <div className="rounded-2xl rounded-tl-sm border border-orange/20 bg-orange/[.07] p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-foreground">{m.offer}</p>
          <MessageCircle className="size-4 shrink-0 text-orange" aria-hidden />
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{m.message}</p>
        <div className="mt-4 flex gap-3 rounded-xl border border-line bg-surface p-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-grad text-ink">
            <ShoppingBag className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold">{m.catalog}</p>
            <p className="mt-1 text-[8px] leading-relaxed text-muted-foreground">{m.catalogMeta}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="grid min-h-9 place-items-center rounded-full bg-grad text-[9px] font-semibold text-ink">
            {m.view}
          </span>
          <span className="grid min-h-9 place-items-center rounded-full border border-orange/35 text-[9px] font-semibold text-amber">
            {m.reply}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1 font-mono text-[7px] text-dim">
          10:42
          <CheckCheck className="size-3 text-orange" aria-hidden />
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {m.funnel.map((step) => (
          <div key={step.label}>
            <div className="mb-1.5 flex items-center justify-between text-[9px]">
              <span className="text-muted-foreground">{step.label}</span>
              <strong className="font-mono text-foreground">{step.value}</strong>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-grad" style={{ width: step.width }} />
            </div>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}
