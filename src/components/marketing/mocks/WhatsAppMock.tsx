import { MessageCircle } from "lucide-react";
import { marketing } from "@/content/marketing";
import whatsappChat from "@/assets/whatsapp-business-chat.jpg.asset.json";
import { MockWindow } from "./MockWindow";
import { ScreenshotPreview } from "./ScreenshotPreview";

const m = marketing.mocks.whatsapp;

export default function WhatsAppMock() {
  return (
    <MockWindow title={m.title} status={m.status}>
      <div className="relative mx-auto w-full max-w-[430px]">
        <div className="absolute inset-10 -z-0 rounded-full bg-orange/10 blur-3xl" aria-hidden />
        <ScreenshotPreview
          src={whatsappChat.url}
          alt={m.captureAlt}
          width={420}
          height={615}
          className="relative bg-foreground"
          imageClassName="max-h-[590px]"
        />
        <span className="absolute -right-2 top-8 grid size-12 place-items-center rounded-2xl border border-orange/40 bg-background text-orange shadow-glow-sm sm:-right-5">
          <MessageCircle className="size-5" aria-hidden />
        </span>
      </div>
    </MockWindow>
  );
}
