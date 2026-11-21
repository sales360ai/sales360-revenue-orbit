import { Database, MousePointerClick, RefreshCw, ShoppingCart } from "lucide-react";
import { sales, type SalesScenario } from "@/content/sales";
import { HashTabs, type TabItem } from "@/components/system/HashTabs";
import { cn } from "@/lib/utils";

const scenarioIcons = [MousePointerClick, ShoppingCart, Database, RefreshCw];

function Connector({ index }: { index: number }) {
  return (
    <>
      <div
        className="relative hidden h-px min-w-4 flex-1 self-center bg-orange/30 sm:block"
        aria-hidden
      >
        <span
          className="flow-pulse-x absolute -top-1 size-2 rounded-full bg-amber shadow-glow-sm"
          style={{ animationDelay: `${index * 0.65}s` }}
        />
      </div>
      <div className="relative mx-auto h-7 w-px bg-orange/30 sm:hidden" aria-hidden>
        <span
          className="flow-pulse-y absolute -left-1 size-2 rounded-full bg-amber shadow-glow-sm"
          style={{ animationDelay: `${index * 0.65}s` }}
        />
      </div>
    </>
  );
}

function ScenarioPanel({ scenario }: { scenario: SalesScenario }) {
  return (
    <div className="grid overflow-hidden rounded-[28px] border border-line bg-surface shadow-inset-top lg:grid-cols-[0.8fr_1.2fr]">
      <div className="relative border-b border-line p-6 sm:p-9 lg:border-b-0 lg:border-r">
        <div
          className="absolute inset-0 dotted-grid opacity-20 [mask-image:linear-gradient(135deg,#000,transparent_70%)]"
          aria-hidden
        />
        <div className="relative">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber">
            {scenario.label}
          </span>
          <p className="mt-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
            {scenario.body}
          </p>
        </div>
      </div>
      <div className="flex items-center bg-background/45 p-6 sm:p-8">
        <div className="flex w-full flex-col sm:flex-row sm:items-stretch">
          {scenario.nodes.map((node, index) => (
            <div key={node} className="contents">
              <div
                className={cn(
                  "flex min-h-24 flex-1 items-center justify-center rounded-2xl border bg-surface px-3 py-4 text-center shadow-inset-top",
                  index === scenario.nodes.length - 1
                    ? "border-orange/50 bg-orange/[.08]"
                    : "border-line-strong",
                )}
              >
                <span className="text-[11px] font-semibold leading-snug text-foreground/90">
                  {node}
                </span>
              </div>
              {index < scenario.nodes.length - 1 && <Connector index={index} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UseCases() {
  const items: TabItem[] = sales.useCases.items.map((scenario, index) => {
    const Icon = scenarioIcons[index] ?? MousePointerClick;
    return {
      id: scenario.id,
      label: scenario.label,
      icon: <Icon className="size-4 shrink-0" strokeWidth={1.7} aria-hidden />,
      content: <ScenarioPanel scenario={scenario} />,
    };
  });

  return (
    <section className="container-site section-y" aria-label="Real-world use cases">
      <HashTabs items={items} label={sales.useCases.label} />
    </section>
  );
}
