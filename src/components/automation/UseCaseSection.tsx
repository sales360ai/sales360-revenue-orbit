import type { ReactNode } from "react";
import {
  BookOpen,
  CalendarCheck2,
  FileText,
  Layers3,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
  UserRoundCheck,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import type { AutomationUseCase } from "@/content/automation";
import { Reveal } from "@/components/system/motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon[]> = {
  whatsapp: [BookOpen, CalendarCheck2, UserRoundCheck],
  email: [MousePointerClick, UserSearch, RefreshCw],
  content: [FileText, Layers3, ShieldCheck],
};

export function UseCaseSection({
  useCase,
  visual,
  reversed = false,
  raised = false,
}: {
  useCase: AutomationUseCase;
  visual: ReactNode;
  reversed?: boolean;
  raised?: boolean;
}) {
  return (
    <section
      id={useCase.id}
      aria-labelledby={`${useCase.id}-heading`}
      className={cn(
        "relative scroll-mt-[136px] overflow-hidden border-b border-line/60",
        raised ? "bg-raised" : "bg-background",
      )}
    >
      <span
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(9rem,22vw,20rem)] font-extrabold leading-none text-orange/[.045] [font-variation-settings:'wdth'_125]"
        aria-hidden
      >
        {useCase.number}
      </span>
      <div className="container-site section-y relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <Reveal className={cn("relative z-10", reversed && "lg:order-2")}>
            <h2 id={`${useCase.id}-heading`} className="type-h2 max-w-[15ch] text-balance">
              {useCase.headline}
            </h2>
            <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
              {useCase.description}
            </p>
            <div className="mt-9 space-y-0">
              {useCase.capabilities.map((capability, index) => {
                const Icon = icons[useCase.id]?.[index] ?? FileText;
                return (
                  <div
                    key={capability.lead}
                    className="flex gap-4 border-t border-line py-5 last:border-b"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-orange/25 bg-orange/[.07] text-orange">
                      <Icon className="size-4.5" strokeWidth={1.7} aria-hidden />
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-foreground">{capability.lead}:</strong>{" "}
                      {capability.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.08} className={cn("relative z-10 min-w-0", reversed && "lg:order-1")}>
            {visual}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
