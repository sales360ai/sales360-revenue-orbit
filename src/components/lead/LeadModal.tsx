import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Interest } from "@/content/global";
import { LeadForm } from "./LeadForm";
import { SunburstRing } from "@/components/motifs/SunburstRing";

type Ctx = { open: (interest?: Interest) => void };
const LeadCtx = createContext<Ctx>({ open: () => {} });
export const useLeadModal = () => useContext(LeadCtx);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; interest: Interest; key: number }>({
    open: false,
    interest: "Full Ecosystem",
    key: 0,
  });
  const open = useCallback(
    (interest: Interest = "Full Ecosystem") =>
      setState((s) => ({ open: true, interest, key: s.key + 1 })),
    [],
  );
  return (
    <LeadCtx.Provider value={{ open }}>
      {children}
      <D.Root open={state.open} onOpenChange={(o) => setState((s) => ({ ...s, open: o }))}>
        <D.Portal>
          <D.Overlay className="fixed inset-0 z-[90] bg-scrim backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
          <D.Content
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 z-[95] max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-2xl border border-line-strong bg-raised p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-glow-lg outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom
              sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(640px,calc(100vw-48px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-10 sm:data-[state=open]:slide-in-from-bottom-4 sm:data-[state=closed]:slide-out-to-bottom-4"
          >
            <div
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-line-strong sm:hidden"
              aria-hidden
            />
            <div className="mb-7 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <SunburstRing size={32} />
                <D.Title className="type-h3">Book Free Demo</D.Title>
              </div>
              <D.Close
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-orange"
              >
                <X className="size-4" strokeWidth={1.5} />
              </D.Close>
            </div>
            <D.Description className="sr-only">Lead capture form</D.Description>
            <LeadForm key={state.key} defaultInterest={state.interest} idPrefix="modal" />
          </D.Content>
        </D.Portal>
      </D.Root>
    </LeadCtx.Provider>
  );
}
