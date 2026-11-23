import { Layers3, MousePointer2, Sparkles } from "lucide-react";
import { industries, type IndustrySolution } from "@/content/industries";
import { HashTabs, type TabItem } from "@/components/system/HashTabs";
import { Reveal } from "@/components/system/motion";
import { industryIcons } from "./industry-icons";
import { IndustryVisual } from "./IndustryVisual";

function SolutionPanel({ industry }: { industry: IndustrySolution }) {
  const Icon = industryIcons[industry.icon];
  const index = industries.solutions.findIndex((item) => item.id === industry.id) + 1;

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface/55 shadow-inset-top">
      <div
        className="absolute inset-0 dotted-grid opacity-15 [mask-image:linear-gradient(120deg,transparent,#000,transparent)]"
        aria-hidden
      />
      <div className="relative p-5 sm:p-8 lg:p-10">
        <header className="flex items-center gap-4 border-b border-line pb-7">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-orange/35 bg-orange/10 text-orange shadow-glow-sm sm:size-14">
            <Icon className="size-5 sm:size-6" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber">
              Industry system {String(index).padStart(2, "0")} / 06
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.55rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] [font-variation-settings:'wdth'_108]">
              {industry.label}
            </h2>
          </div>
        </header>

        <div className="mt-4 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-10">
          <div>
            <div className="flex items-center gap-2 py-4 text-amber">
              <Sparkles className="size-4" aria-hidden />
              <h3 className="type-mono text-[10px]">{industries.featuresLabel}</h3>
            </div>
            <div>
              {industry.features.map((feature, featureIndex) => (
                <section
                  key={feature.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-5"
                >
                  <span className="pt-0.5 font-display text-sm font-bold text-orange [font-variation-settings:'wdth'_120]">
                    0{featureIndex + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </div>
          <IndustryVisual industry={industry} />
        </div>

        <section
          className="mt-5 border-t border-line pt-7"
          aria-labelledby={`use-cases-${industry.id}`}
        >
          <div className="flex items-center gap-2 text-amber">
            <MousePointer2 className="size-4" aria-hidden />
            <h3 id={`use-cases-${industry.id}`} className="type-mono text-[10px]">
              {industries.useCasesLabel}
            </h3>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {industry.useCases.map((useCase, useCaseIndex) => (
              <div
                key={useCase.title}
                className="group relative overflow-hidden rounded-2xl border border-line bg-background/60 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-orange/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-8 place-items-center rounded-full border border-orange/30 bg-orange/10 font-mono text-[9px] text-amber">
                    0{useCaseIndex + 1}
                  </span>
                  <Layers3
                    className="size-4 text-dim transition-colors group-hover:text-orange"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </div>
                <h4 className="mt-5 text-sm font-semibold leading-snug text-foreground">
                  {useCase.title}
                </h4>
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export function IndustrySolutions() {
  const items: TabItem[] = industries.solutions.map((industry) => {
    const Icon = industryIcons[industry.icon];
    const nav = industries.nav.find((item) => item.id === industry.id);
    return {
      id: industry.id,
      label: nav?.label ?? industry.label,
      icon: <Icon className="size-4 shrink-0" strokeWidth={1.7} aria-hidden />,
      content: <SolutionPanel industry={industry} />,
    };
  });

  return (
    <section
      className="container-site scroll-mt-24 py-12 sm:py-16 lg:py-20"
      aria-labelledby="industry-solutions-title"
    >
      <Reveal>
        <h2
          id="industry-solutions-title"
          className="type-h2 mx-auto max-w-[18ch] text-center text-balance"
        >
          {industries.solutionsHeading}
        </h2>
      </Reveal>
      <div className="mt-9">
        <HashTabs items={items} label="Industry features and use cases" stickyList />
      </div>
    </section>
  );
}
