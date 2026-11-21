import * as A from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export type FaqItem = { q: string; a: string };

/** Single-open accordion, animated height, + rotates to ×. */
export function FaqAccordion({ items, defaultValue }: { items: FaqItem[]; defaultValue?: string }) {
  return (
    <A.Root
      type="single"
      collapsible
      {...(defaultValue ? { defaultValue } : {})}
      className="divide-y divide-line rounded-xl border border-line bg-surface"
    >
      {items.map((it, i) => (
        <A.Item key={i} value={`i${i}`}>
          <A.Header>
            <A.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 px-6 py-4 text-left font-semibold">
              {it.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,border-color] duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-orange">
                <Plus className="size-4" strokeWidth={1.5} aria-hidden />
              </span>
            </A.Trigger>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <p className="max-w-[60ch] px-6 pb-6 text-muted-foreground">{it.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
