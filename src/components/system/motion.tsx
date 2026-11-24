import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal on scroll: y 24→0, fade, once at 15% in view. Wrap groups with stagger. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Count-up: animates only the numeric part of e.g. "<5 Sec", "3X", "200+". */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*?)([\d,.]+)(.*)$/);
  const prefix = m?.[1] ?? "";
  const numStr = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;
  // SSR and the first client render always contain the final value for SEO and previews.
  const [display, setDisplay] = useState(m ? numStr : value);
  useEffect(() => {
    if (!m || Number.isNaN(target) || reduce) {
      if (m) setDisplay(numStr);
      return;
    }
    if (!inView) return;
    setDisplay((0).toFixed(decimals));
    let controls: ReturnType<typeof animate> | undefined;
    const frame = window.requestAnimationFrame(() => {
      controls = animate(0, target, {
        duration,
        ease: EASE,
        onUpdate: (v) =>
          setDisplay(
            v.toLocaleString("en-IN", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }),
          ),
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      controls?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}

/** Desktop-only scroll parallax, capped at 16px in either direction. */
export function ParallaxAccent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduce || !desktop ? 0 : y }}>
      {children}
    </motion.div>
  );
}
