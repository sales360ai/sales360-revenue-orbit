import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { industries, type IndustryId } from "@/content/industries";
import { Card, SectionHeading } from "@/components/system/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { cn } from "@/lib/utils";
import { industryIcons } from "./industry-icons";

const validIds = new Set<string>(industries.nav.map((item) => item.id));

export function IndustryGrid() {
  const routeHash = useLocation({ select: (location) => location.hash });
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState<{ id: IndustryId; key: number } | null>(null);

  useEffect(() => {
    let timer = 0;
    const followHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!validIds.has(id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setPulse({ id: id as IndustryId, key: Date.now() });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPulse(null), reduce ? 0 : 1600);
    };
    const frame = window.requestAnimationFrame(followHash);
    window.addEventListener("hashchange", followHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", followHash);
    };
  }, [routeHash, reduce]);

  return (
    <section className="container-site section-y" aria-labelledby="industry-grid-title">
      <Reveal>
        <SectionHeading id="industry-grid-title" title={industries.grid.headline} align="center" />
      </Reveal>
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6" stagger={0.08}>
        {industries.grid.cards.map((card, index) => {
          const Icon = industryIcons[card.icon];
          return (
            <RevealItem
              key={card.id}
              className={cn(
                "h-full lg:col-span-2",
                index >= 3 && "lg:col-span-3",
                index === 4 && "md:col-span-2 lg:col-span-3",
              )}
            >
              <Card
                as="article"
                id={card.id}
                className="relative flex h-full scroll-mt-[160px] flex-col overflow-hidden p-6 sm:p-7"
              >
                {pulse?.id === card.id && (
                  <motion.span
                    key={pulse.key}
                    className="pointer-events-none absolute inset-0 rounded-[24px] border-2 border-orange"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: reduce ? 0 : [0, 1, 1, 0] }}
                    transition={{ duration: reduce ? 0 : 1.5, times: [0, 0.15, 0.55, 1] }}
                    aria-hidden
                  />
                )}
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-orange/25 bg-orange/10 text-orange">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="type-h3 text-balance">{card.title}</h3>
                </div>
                <div className="mt-7">
                  <p className="type-mono text-[10px] text-dim">{industries.grid.challengeLabel}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.challenge}
                  </p>
                </div>
                <div className="my-6 flex items-center gap-3" aria-hidden>
                  <span className="h-px flex-1 bg-line-strong" />
                  <ArrowDown className="size-4 text-orange" strokeWidth={1.7} />
                  <span className="h-px flex-1 bg-line-strong" />
                </div>
                <div className="mt-auto">
                  <p className="type-mono text-[10px] text-amber">
                    {industries.grid.solutionLabel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{card.solution}</p>
                </div>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
