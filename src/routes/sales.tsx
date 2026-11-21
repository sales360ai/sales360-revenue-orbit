import { createFileRoute } from "@tanstack/react-router";
import { sales } from "@/content/sales";
import { SalesHero } from "@/components/sales/SalesHero";
import { FeatureBento } from "@/components/sales/FeatureBento";
import { UseCases } from "@/components/sales/UseCases";
import { BusinessBenefits, Pricing } from "@/components/sales/SalesSections";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: sales.meta.title },
      { name: "description", content: sales.meta.description },
      { property: "og:title", content: sales.meta.title },
      { property: "og:description", content: sales.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sales" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sales" }],
  }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <>
      <SalesHero />
      <FeatureBento />
      <BusinessBenefits />
      <UseCases />
      <Pricing />
    </>
  );
}
