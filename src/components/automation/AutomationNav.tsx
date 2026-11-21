import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { automation, type AutomationSectionId } from "@/content/automation";
import { cn } from "@/lib/utils";

export function AutomationNav() {
  const [active, setActive] = useState<AutomationSectionId>("whatsapp");
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (automation.nav.some((item) => item.id === hash)) {
      setActive(hash as AutomationSectionId);
    }

    const update = () => {
      let current: AutomationSectionId = "whatsapp";
      for (const item of automation.nav) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 180) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!list || !selected || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: selected.offsetLeft - list.clientWidth / 2 + selected.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: AutomationSectionId) => {
    event.preventDefault();
    event.stopPropagation();
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Automation use cases"
      className="sticky top-[72px] z-40 mt-8 border-y border-line bg-background/90 backdrop-blur-xl"
    >
      <div
        ref={listRef}
        className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {automation.nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-section={item.id}
            aria-current={active === item.id ? "location" : undefined}
            onClick={(event) => goTo(event, item.id)}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-5 text-xs font-semibold transition-[background-color,border-color,color]",
              active === item.id
                ? "border-orange bg-orange text-ink shadow-glow-sm"
                : "border-line-strong bg-surface/60 text-muted-foreground hover:border-orange/50 hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
