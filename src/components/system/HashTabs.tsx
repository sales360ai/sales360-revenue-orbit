import * as T from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./motion";

export type TabItem = { id: string; label: string; icon?: ReactNode; content: ReactNode };

/** Pill tabs with sliding indicator, arrow keys (Radix), URL-hash sync and cross-fading panels. */
export function HashTabs({
  items,
  label,
  className,
  stickyList = false,
}: {
  items: TabItem[];
  label: string;
  className?: string;
  stickyList?: boolean;
}) {
  const [value, setValue] = useState(items[0]?.id ?? "");
  const lid = useId();
  const listViewport = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const sync = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (items.some((i) => i.id === h)) setValue(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items]);
  useEffect(() => {
    const viewport = listViewport.current;
    const selected = viewport?.querySelector<HTMLElement>('[data-state="active"]');
    if (!viewport || !selected || viewport.scrollWidth <= viewport.clientWidth) return;
    const viewportRect = viewport.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();
    viewport.scrollTo({
      left:
        viewport.scrollLeft +
        selectedRect.left -
        viewportRect.left -
        (viewport.clientWidth - selected.clientWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [value, reduce]);
  const change = (v: string) => {
    setValue(v);
    history.replaceState(null, "", `#${v}`);
  };
  const active = items.find((i) => i.id === value);
  return (
    <T.Root value={value} onValueChange={change} className={className}>
      <div
        ref={listViewport}
        className={cn(
          "edge-fade -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:[mask-image:none]",
          stickyList &&
            "sticky top-[72px] z-40 bg-background/95 py-3 backdrop-blur-xl sm:static sm:bg-transparent sm:py-0 sm:backdrop-blur-none",
        )}
      >
        <T.List
          aria-label={label}
          className="inline-flex snap-x gap-1 rounded-full border border-line bg-surface p-1.5"
        >
          {items.map((i) => (
            <T.Trigger
              key={i.id}
              value={i.id}
              id={`tab-${i.id}`}
              className="relative flex min-h-11 snap-start items-center gap-2 rounded-full px-5 text-sm font-semibold text-muted-foreground transition-colors data-[state=active]:text-ink hover:text-foreground data-[state=active]:hover:text-ink"
            >
              {value === i.id && (
                <motion.span
                  layoutId={`ind-${lid}`}
                  className="absolute inset-0 rounded-full bg-grad"
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  aria-hidden
                />
              )}
              <span className="relative flex items-center gap-2 whitespace-nowrap">
                {i.icon}
                {i.label}
              </span>
            </T.Trigger>
          ))}
        </T.List>
      </div>
      <motion.div
        layout={!reduce}
        transition={{ duration: 0.4, ease: EASE }}
        className="mt-8 overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {active && (
            <T.Content key={active.id} value={active.id} forceMount asChild>
              <motion.div
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -4 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
                className={cn("outline-none")}
              >
                {active.content}
              </motion.div>
            </T.Content>
          )}
        </AnimatePresence>
      </motion.div>
    </T.Root>
  );
}
