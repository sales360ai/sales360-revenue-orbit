import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function LegalPanel({ title, trigger }: { title: string; trigger: React.ReactNode }) {
  return (
    <D.Root>
      <D.Trigger asChild>{trigger}</D.Trigger>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-[90] bg-scrim backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <D.Content className="fixed inset-y-0 right-0 z-[95] w-full max-w-xl overflow-y-auto border-l border-line-strong bg-raised p-8 outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
          <div className="flex items-center justify-between gap-4">
            <D.Title className="type-h3">{title}</D.Title>
            <D.Close aria-label="Close" className="grid size-11 place-items-center rounded-full border border-line-strong hover:border-orange">
              <X className="size-4" strokeWidth={1.5} />
            </D.Close>
          </div>
          {/* TODO: replace with final legal copy */}
          <D.Description className="mt-6 max-w-[60ch] text-muted-foreground">
            The final {title} for Sales360.ai will be published here.
          </D.Description>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
