import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { home } from "@/content/home";
import { Reveal } from "@/components/system/motion";
import { Card, EyebrowBadge } from "@/components/system/primitives";

const AUTO_ADVANCE_MS = 7000;
type PauseSource = "hover" | "focus" | "touch";
const initialPause = { hover: false, focus: false, touch: false };

function useCarouselReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduce;
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pauseSources, setPauseSources] = useState(initialPause);
  const reduce = useCarouselReducedMotion();
  const paused = pauseSources.hover || pauseSources.focus || pauseSources.touch;
  const active = home.testimonials[activeIndex] ?? home.testimonials[0];
  const ui = home.testimonialUi;

  const setPause = (source: PauseSource, value: boolean) => {
    setPauseSources((current) => ({ ...current, [source]: value }));
  };
  const show = (index: number) => {
    const count = home.testimonials.length;
    setActiveIndex((index + count) % count);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % home.testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, reduce]);

  if (!active) return null;

  return (
    <section
      className="container-site section-y"
      aria-labelledby="testimonials-heading"
      data-autoplay={reduce ? "off" : paused ? "paused" : "running"}
      onMouseEnter={() => setPause("hover", true)}
      onMouseLeave={() => setPause("hover", false)}
      onFocusCapture={() => setPause("focus", true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setPause("focus", false);
      }}
      onTouchStart={() => setPause("touch", true)}
      onTouchEnd={() => setPause("touch", false)}
      onTouchCancel={() => setPause("touch", false)}
    >
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <span id="testimonials-heading">
            <EyebrowBadge>{ui.heading}</EyebrowBadge>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={ui.previous}
              aria-controls="testimonial-panel"
              onClick={() => show(activeIndex - 1)}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-foreground transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-orange hover:bg-orange/10"
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} aria-hidden />
            </button>
            <button
              type="button"
              aria-label={ui.next}
              aria-controls="testimonial-panel"
              onClick={() => show(activeIndex + 1)}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-foreground transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-orange hover:bg-orange/10"
            >
              <ChevronRight className="size-5" strokeWidth={1.8} aria-hidden />
            </button>
          </div>
        </div>
        <div
          id="testimonial-panel"
          className="mt-6"
          aria-live={paused || reduce ? "polite" : "off"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.name}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -10 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                as="article"
                className="relative mx-auto flex min-h-[330px] max-w-4xl flex-col overflow-hidden p-7 text-center sm:p-10"
              >
                <div
                  className="absolute inset-0 dotted-grid opacity-20 [mask-image:radial-gradient(circle_at_center,#000,transparent_80%)]"
                  aria-hidden
                />
                <span
                  className="relative font-display text-7xl leading-[.65] text-orange"
                  aria-hidden
                >
                  “
                </span>
                <blockquote className="relative mx-auto mt-7 max-w-[58ch] flex-1 text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  {active.quote}
                </blockquote>
                <div className="relative mt-8 flex items-center justify-center gap-3 border-t border-line pt-6 text-left">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-orange/60 bg-orange/10 font-mono text-[10px] text-amber ring-4 ring-orange/5">
                    {active.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{active.name}</p>
                    <p className="mt-0.5 text-xs italic text-muted-foreground">{active.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
