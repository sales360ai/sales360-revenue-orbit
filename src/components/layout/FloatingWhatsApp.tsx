import { siWhatsapp } from "simple-icons";
import { contact } from "@/content/global";

export function FloatingWhatsApp() {
  return (
    <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Sales360.ai on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2.5 rounded-full border border-orange/50 glass pl-3 pr-4 text-sm font-semibold shadow-glow-sm ring-2 ring-orange/20 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-orange">
      <span className="grid size-8 place-items-center rounded-full bg-surface-3">
        <svg viewBox="0 0 24 24" className="size-4 fill-current text-orange" aria-hidden><path d={siWhatsapp.path} /></svg>
      </span>
      WhatsApp
    </a>
  );
}
