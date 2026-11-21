import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { industries, type IndustryId } from "@/content/industries";
import { cn } from "@/lib/utils";
import { DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";
import { EASE } from "@/components/system/motion";
import { industryIcons } from "./industry-icons";

const h = industries.hero;
const industryIds = new Set<string>(industries.nav.map((item) => item.id));

function IndustryNav() {
  const routeHash = useLocation({ select: (location) => location.hash });
  const [active, setActive] = useState<IndustryId>("e-commerce");
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (industryIds.has(routeHash)) setActive(routeHash as IndustryId);

    const update = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      let lastPassed: IndustryId = "e-commerce";
      const inSpyBand: IndustryId[] = [];
      for (const item of industries.nav) {
        const rect = document.getElementById(item.id)?.getBoundingClientRect();
        if (!rect || rect.top > 190) continue;
        lastPassed = item.id;
        if (rect.bottom > 190) inSpyBand.push(item.id);
      }
      const hashed = inSpyBand.find((id) => id === hash);
      setActive(hashed ?? inSpyBand[0] ?? lastPassed);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [routeHash]);

  useEffect(() => {
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>(`[data-industry="${active}"]`);
    if (!list || !selected || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: selected.offsetLeft - list.clientWidth / 2 + selected.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: IndustryId) => {
    event.preventDefault();
    event.stopPropagation();
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <nav
      aria-label="Industry solutions"
      className="sticky top-[72px] z-40 mt-6 border-y border-line bg-background/90 backdrop-blur-xl"
    >
      <div
        ref={listRef}
        className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.nav.map((item) => {
          const Icon = industryIcons[item.icon];
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-industry={item.id}
              aria-current={active === item.id ? "location" : undefined}
              onClick={(event) => goTo(event, item.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-xs font-semibold transition-[background-color,border-color,color] sm:px-5",
                active === item.id
                  ? "border-orange bg-orange text-ink shadow-glow-sm"
                  : "border-line-strong bg-surface/60 text-muted-foreground hover:border-orange/50 hover:text-foreground",
              )}
            >
              <Icon className="size-4" strokeWidth={1.7} aria-hidden />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function IndustriesHero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <>
      <section
        className="container-site max-w-[1440px] pt-[104px] sm:pt-[120px]"
        aria-labelledby="industries-hero-title"
      >
        <DottedGridFrame className="px-5 py-12 text-center sm:px-10 sm:py-16">
          <motion.div {...rise(0.08)}>
            <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
          </motion.div>
          <motion.h1
            {...rise(0.16)}
            id="industries-hero-title"
            className="type-h1 mx-auto mt-7 max-w-[17ch] text-balance"
          >
            {h.titleLead} <span className="text-grad">{h.accent}</span>
          </motion.h1>
          <motion.p
            {...rise(0.24)}
            className="mx-auto mt-6 max-w-[66ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {h.sub}
          </motion.p>
        </DottedGridFrame>
      </section>
      <IndustryNav />
    </>
  );
}
