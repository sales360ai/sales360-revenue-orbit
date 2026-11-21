import { MessageCircle, Radio } from "lucide-react";
import { marketing } from "@/content/marketing";
import whatsappChat from "@/assets/whatsapp-business-chat-transparent.png.asset.json";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.whatsapp;

export default function WhatsAppMock() {
  return (
    <MockWindow title={m.title} status={m.status}>
      <div className="relative mx-auto aspect-[3/2] min-h-[370px] w-full max-w-[650px] sm:min-h-[440px]">
        <div
          className="absolute inset-0 dotted-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_72%)]"
          aria-hidden
        />
        <div className="absolute inset-[15%] rounded-full bg-orange/10 blur-3xl" aria-hidden />
        <img
          src={whatsappChat.url}
          alt={m.captureAlt}
          width={1200}
          height={800}
          loading="eager"
          decoding="sync"
          className="relative h-full w-full scale-[1.6] object-contain sm:scale-125"
        />
        <span className="absolute left-0 top-[14%] inline-flex items-center gap-2 rounded-xl border border-orange/30 bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-amber shadow-glow-sm">
          <Radio className="size-3.5 text-orange" aria-hidden />
          {m.visualBadges[0]}
        </span>
        <span className="absolute bottom-[12%] right-0 inline-flex items-center gap-2 rounded-xl border border-line-strong bg-background/90 px-3 py-2 font-mono text-[8px] uppercase tracking-wider text-foreground shadow-xl">
          <MessageCircle className="size-3.5 text-orange" aria-hidden />
          {m.visualBadges[1]}
        </span>
      </div>
    </MockWindow>
  );
}
