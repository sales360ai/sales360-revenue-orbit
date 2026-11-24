import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  LayoutDashboard,
  Mail,
  MessageCircle,
  MousePointerClick,
  PhoneCall,
  Search,
  Share2,
  Video,
  type LucideIcon,
} from "lucide-react";
import { marketing } from "@/content/marketing";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Card, SectionHeading } from "@/components/system/primitives";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Ads: MousePointerClick,
  Search,
  Social: Share2,
  Video,
  WhatsApp: MessageCircle,
  Email: Mail,
  Telecalling: PhoneCall,
  "Sales 360": LayoutDashboard,
};

export function MarketingFunnel() {
  return (
    <section className="container-site section-y pt-0" aria-labelledby="marketing-funnel-heading">
      <Reveal>
        <SectionHeading
          id="marketing-funnel-heading"
          title={marketing.funnel.headline}
          align="center"
        />
      </Reveal>
      <RevealGroup className="relative mt-12">
        <div
          className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px bg-orange/25 lg:block"
          aria-hidden
        >
          <span className="funnel-line-pulse absolute -top-1 h-2 w-24 rounded-full bg-grad shadow-glow-sm" />
        </div>
        <div className="relative grid gap-5 lg:grid-cols-3">
          {marketing.funnel.steps.map((step, index) => (
            <RevealItem key={step.title}>
              <Card
                as="article"
                className={cn(
                  "relative flex h-full min-h-[330px] flex-col p-6 sm:p-8",
                  index === 2 && "border-orange/45 shadow-glow-sm",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-sm font-bold text-orange [font-variation-settings:'wdth'_120]">
                    {step.number}
                  </span>
                  {index < 2 && <ArrowRight className="size-5 text-orange" aria-hidden />}
                </div>
                <h3 className="mt-6 font-display text-4xl font-extrabold [font-variation-settings:'wdth'_115]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {step.channels.map((channel) => {
                    const Icon = icons[channel] ?? LayoutDashboard;
                    return (
                      <span
                        key={channel}
                        title={channel}
                        className="grid size-11 place-items-center rounded-xl border border-line-strong bg-background/60 text-orange"
                      >
                        <Icon className="size-4" strokeWidth={1.7} aria-hidden />
                        <span className="sr-only">{channel}</span>
                      </span>
                    );
                  })}
                </div>
                {index === 2 && (
                  <Link
                    to="/sales"
                    className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-orange/50 bg-orange/10 px-4 text-xs font-semibold text-amber shadow-glow-sm transition-colors hover:bg-orange hover:text-ink"
                  >
                    {marketing.funnel.commandCenter}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                )}
              </Card>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
