import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SampleDataChip } from "@/components/system/primitives";

export function MockWindow({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass h-full min-h-[420px] overflow-hidden rounded-[22px] border border-line-strong shadow-2xl",
        className,
      )}
    >
      <div className="flex h-12 items-center justify-between gap-3 border-b border-line bg-surface/80 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-orange" />
            <span className="size-2 rounded-full bg-surface-3" />
            <span className="size-2 rounded-full bg-surface-3" />
          </div>
          <span className="truncate text-[10px] font-semibold text-foreground/90">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SampleDataChip />
          {status && (
            <span className="hidden min-[420px]:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-orange/25 bg-orange/[.07] px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-amber">
              <span className="size-1 rounded-full bg-orange animate-pulse-dot" />
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="flex h-[calc(100%-3rem)] flex-col justify-center p-4 sm:p-5">{children}</div>
    </div>
  );
}
