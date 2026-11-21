import { createFileRoute } from "@tanstack/react-router";
import { industries } from "@/content/industries";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { EcommerceFlagship } from "@/components/industries/EcommerceFlagship";
import { IndustryGrid } from "@/components/industries/IndustryGrid";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: industries.meta.title },
      { name: "description", content: industries.meta.description },
      { property: "og:title", content: industries.meta.title },
      { property: "og:description", content: industries.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <EcommerceFlagship />
      <IndustryGrid />
    </>
  );
}
