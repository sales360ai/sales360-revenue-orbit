import { siWhatsapp } from "simple-icons";
import { contact } from "@/content/global";

export function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sales360.ai on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 inline-flex size-12 items-center justify-center gap-2.5 rounded-full border border-orange/50 glass shadow-lift text-sm font-semibold shadow-glow-sm ring-2 ring-orange/20 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-orange sm:bottom-5 sm:right-5 sm:h-12 sm:w-auto sm:pl-3 sm:pr-4"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-3">
        <svg viewBox="0 0 24 24" className="size-4 fill-current text-orange" aria-hidden>
          <path d={siWhatsapp.path} />
        </svg>
      </span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
