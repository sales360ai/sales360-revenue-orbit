import { createFileRoute } from "@tanstack/react-router";
import { stubs } from "@/content/global";
import { StubPage } from "@/components/layout/StubPage";

const c = stubs.techCloud;
export const Route = createFileRoute("/tech-cloud")({
  head: () => ({
    meta: [
      { title: c.title },
      { name: "description", content: c.desc },
      { property: "og:title", content: c.title },
      { property: "og:description", content: c.desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tech-cloud" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tech-cloud" }],
  }),
  component: () => <StubPage h1={c.h1} />,
});
