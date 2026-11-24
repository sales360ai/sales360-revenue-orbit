import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import {
  Mail,
  MessageCircle,
  MousePointerClick,
  PhoneCall,
  Search,
  Share2,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";
import { marketing, type MarketingChannel, type MarketingChannelId } from "@/content/marketing";
import { HashTabs, type TabItem } from "@/components/system/HashTabs";
import { Claim } from "@/components/system/Claim";

const channelIcons: Record<MarketingChannelId, LucideIcon> = {
  "google-meta-ads": MousePointerClick,
  "seo-aeo": Search,
  "social-media": Share2,
  whatsapp: MessageCircle,
  email: Mail,
  telecalling: PhoneCall,
  video: Video,
};

const mockComponents: Record<MarketingChannelId, LazyExoticComponent<ComponentType>> = {
  "google-meta-ads": lazy(() => import("./mocks/AdsMock")),
  "seo-aeo": lazy(() => import("./mocks/SeoMock")),
  "social-media": lazy(() => import("./mocks/SocialMock")),
  whatsapp: lazy(() => import("./mocks/WhatsAppMock")),
  email: lazy(() => import("./mocks/EmailMock")),
  telecalling: lazy(() => import("./mocks/CallingMock")),
  video: lazy(() => import("./mocks/VideoMock")),
};

function MockFallback() {
  return (
    <div
      className="min-h-[420px] animate-pulse rounded-[22px] border border-line bg-surface/50"
      aria-label="Loading channel preview"
    />
  );
}

function ChannelPanel({ channel }: { channel: MarketingChannel }) {
  const Mock = mockComponents[channel.id];
  return (
    <section
      aria-label={channel.label}
      className="grid min-h-[1180px] gap-8 rounded-[28px] border border-line bg-surface/55 p-5 shadow-inset-top sm:min-h-[1020px] sm:p-8 lg:min-h-[700px] lg:grid-cols-12 lg:gap-10 lg:p-10"
    >
      <div className="lg:col-span-5">
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-amber">
          {channel.label}
        </p>
        <h2 className="mt-5 font-display text-[clamp(2rem,3.2vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.02em] [font-variation-settings:'wdth'_108]">
          {channel.id === "whatsapp" ? (
            <Claim id="whatsapp-open-rate" template={channel.headline} />
          ) : (
            channel.headline
          )}
        </h2>
        <ol className="mt-7">
          {channel.deliverables.map((deliverable, index) => (
            <li
              key={deliverable}
              className="grid grid-cols-[auto_1fr] gap-4 border-t border-line py-4 last:border-b"
            >
              <span className="font-display text-sm font-bold text-orange [font-variation-settings:'wdth'_120]">
                0{index + 1}
              </span>
              <span className="text-sm leading-relaxed text-foreground/85">{deliverable}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-orange/30 bg-orange/[.075] p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange text-ink">
            <Target className="size-4" aria-hidden />
          </span>
          <p className="pt-1 text-sm font-semibold leading-relaxed text-amber">{channel.outcome}</p>
        </div>
      </div>
      <div className="min-w-0 lg:col-span-7">
        <Suspense fallback={<MockFallback />}>
          <Mock />
        </Suspense>
      </div>
    </section>
  );
}

export function ChannelDeck() {
  const items: TabItem[] = marketing.channels.map((channel) => {
    const Icon = channelIcons[channel.id];
    return {
      id: channel.id,
      label: channel.short,
      icon: <Icon className="size-4 shrink-0" strokeWidth={1.7} aria-hidden />,
      content: <ChannelPanel channel={channel} />,
    };
  });

  return (
    <section
      id="channel-deck"
      className="container-site scroll-mt-24 section-y"
      aria-label="Interactive seven-channel marketing deck"
    >
      <HashTabs items={items} label="Seven core marketing services" stickyList />
    </section>
  );
}
