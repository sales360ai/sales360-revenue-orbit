import { createFileRoute } from "@tanstack/react-router";
import { stubs } from "@/content/global";
import { StubPage } from "@/components/layout/StubPage";

const c = stubs.automation;
export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: c.title },
      { name: "description", content: c.desc },
      { property: "og:title", content: c.title },
      { property: "og:description", content: c.desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/automation" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/automation" }],
  }),
  component: () => <StubPage h1={c.h1} />,
});
