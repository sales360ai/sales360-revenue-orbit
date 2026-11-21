import { Bug, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { techCloud } from "@/content/tech-cloud";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card, SectionHeading } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const security = techCloud.security;
const icons = [ShieldCheck, Bug, LockKeyhole, KeyRound];

export function SecuritySection() {
  return (
    <section
      className="relative overflow-hidden border-b border-line/60 bg-raised"
      aria-labelledby="security-heading"
    >
      <SunburstRing
        size={640}
        segments={32}
        variant="spin"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[.025]"
      />
      <div className="container-site section-y relative">
        <Reveal>
          <SectionHeading
            id="security-heading"
            title={security.headline}
            align="center"
            className="max-w-4xl"
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {security.cards.map((card, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <RevealItem key={card.title} className="h-full">
                <Card
                  as="article"
                  className={cn(
                    "security-card group relative flex h-full min-h-[330px] flex-col overflow-hidden p-6",
                    index === 0 && "border-orange/65",
                  )}
                >
                  <span
                    className="security-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-orange/15 to-transparent"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl border border-orange/25 bg-orange/[.07] text-orange">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="translate-y-2 rounded-full border border-orange/35 bg-orange/10 px-2.5 py-1 font-mono text-[7px] uppercase tracking-wider text-amber opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {security.protected}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-[1.35rem] font-bold leading-tight [font-variation-settings:'wdth'_108]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                  <div className="mt-auto pt-7">
                    <div className="h-px bg-line">
                      <div className="h-px w-1/3 bg-grad transition-transform duration-500 group-hover:translate-x-[200%]" />
                    </div>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
