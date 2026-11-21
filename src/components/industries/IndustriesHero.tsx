import { motion, useReducedMotion } from "framer-motion";
import { industries } from "@/content/industries";
import { DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";
import { EASE } from "@/components/system/motion";

const h = industries.hero;

export function IndustriesHero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
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
  );
}
