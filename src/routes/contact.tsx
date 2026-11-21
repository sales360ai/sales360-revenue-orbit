import { createFileRoute } from "@tanstack/react-router";
import { contactPage } from "@/content/contact";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFaq, NextSteps } from "@/components/contact/ContactSections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: contactPage.meta.title },
      { name: "description", content: contactPage.meta.description },
      { property: "og:title", content: contactPage.meta.title },
      { property: "og:description", content: contactPage.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: contactPage.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ContactHero />
      <NextSteps />
      <ContactFaq />
    </>
  );
}
