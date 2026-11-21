import { MessageCircle, Radio } from "lucide-react";
import { marketing } from "@/content/marketing";
import whatsappChat from "@/assets/whatsapp-lead-generation-banner.png.asset.json";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.whatsapp;

export default function WhatsAppMock() {
  return (
    <MockWindow title={m.title} status={m.status}>
      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-3">
        <div className="relative aspect-square w-full sm:aspect-[3/2] sm:min-h-[420px]">
          <div
            className="absolute inset-0 dotted-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_72%)]"
            aria-hidden
          />
          <div className="absolute inset-[18%] rounded-full bg-orange/10 blur-3xl" aria-hidden />
          <img
            src={whatsappChat.url}
            alt={m.captureAlt}
            width={542}
            height={531}
            loading="eager"
            decoding="sync"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-orange/30 bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-amber shadow-glow-sm">
            <Radio className="size-3.5 text-orange" aria-hidden />
            {m.visualBadges[0]}
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-foreground shadow-xl">
            <MessageCircle className="size-3.5 text-orange" aria-hidden />
            {m.visualBadges[1]}
          </span>
        </div>
      </div>
    </MockWindow>
  );
}
