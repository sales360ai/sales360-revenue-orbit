import { createFileRoute } from "@tanstack/react-router";
import { techCloud } from "@/content/tech-cloud";
import { TechHero } from "@/components/tech-cloud/TechHero";
import { HostingSection } from "@/components/tech-cloud/HostingSection";
import { SecuritySection } from "@/components/tech-cloud/SecuritySection";
import { SupportSection } from "@/components/tech-cloud/SupportSection";

export const Route = createFileRoute("/tech-cloud")({
  head: () => ({
    meta: [
      { title: techCloud.meta.title },
      { name: "description", content: techCloud.meta.description },
      { property: "og:title", content: techCloud.meta.title },
      { property: "og:description", content: techCloud.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tech-cloud" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tech-cloud" }],
  }),
  component: TechCloudPage,
});

function TechCloudPage() {
  return (
    <>
      <TechHero />
      <HostingSection />
      <SecuritySection />
      <SupportSection />
    </>
  );
}
