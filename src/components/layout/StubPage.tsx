import { PageHero } from "@/components/system/primitives";

/** TEMPORARY — replaced by each page prompt. */
export function StubPage({ h1, home }: { h1: string; home?: boolean }) {
  return <PageHero title={h1} variant={home ? "home" : "inner"} />;
}
