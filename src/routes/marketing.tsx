import { createFileRoute } from "@tanstack/react-router";
import { marketing } from "@/content/marketing";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import { ChannelDeck } from "@/components/marketing/ChannelDeck";
import { MarketingFunnel } from "@/components/marketing/MarketingFunnel";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: marketing.meta.title },
      { name: "description", content: marketing.meta.description },
      { property: "og:title", content: marketing.meta.title },
      { property: "og:description", content: marketing.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/marketing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/marketing" }],
  }),
  component: MarketingPage,
});

function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <ChannelDeck />
      <MarketingFunnel />
    </>
  );
}
