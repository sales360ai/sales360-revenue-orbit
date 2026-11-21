import { createFileRoute } from "@tanstack/react-router";
import { automation } from "@/content/automation";
import { AutomationHero } from "@/components/automation/AutomationHero";
import { AutomationNav } from "@/components/automation/AutomationNav";
import { UseCaseSection } from "@/components/automation/UseCaseSection";
import { WhatsAppChat } from "@/components/automation/WhatsAppChat";
import { EmailSequence } from "@/components/automation/EmailSequence";
import { ContentEngine } from "@/components/automation/ContentEngine";
import { RoutingCards } from "@/components/automation/RoutingCards";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: automation.meta.title },
      { name: "description", content: automation.meta.description },
      { property: "og:title", content: automation.meta.title },
      { property: "og:description", content: automation.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/automation" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/automation" }],
  }),
  component: AutomationPage,
});

function AutomationPage() {
  return (
    <>
      <AutomationHero />
      <AutomationNav />
      <UseCaseSection useCase={automation.useCases[0]!} visual={<WhatsAppChat />} />
      <UseCaseSection
        useCase={automation.useCases[1]!}
        visual={<EmailSequence />}
        reversed
        raised
      />
      <UseCaseSection useCase={automation.useCases[2]!} visual={<ContentEngine />} />
      <RoutingCards />
    </>
  );
}
