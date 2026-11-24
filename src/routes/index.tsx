import { createFileRoute } from "@tanstack/react-router";
import { home } from "@/content/home";
import { HomeHero } from "@/components/home/HomeHero";
import { Pillars } from "@/components/home/Pillars";
import { IndustriesSnapshot } from "@/components/home/IndustriesSnapshot";
import { Testimonials } from "@/components/home/Testimonials";
import { DifferenceBand, FounderSpotlight, ProofStrip } from "@/components/home/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: home.meta.title },
      { name: "description", content: home.meta.description },
      { property: "og:title", content: home.meta.title },
      { property: "og:description", content: home.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <Pillars />
      <DifferenceBand />
      <FounderSpotlight />
      <IndustriesSnapshot />
      <Testimonials />
    </>
  );
}
