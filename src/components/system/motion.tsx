import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal on scroll: y 24→0, fade, once at 15% in view. Wrap groups with stagger. */
export function Reveal({ children, delay = 0, className, as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
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

export function RevealGroup({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}>
      {children}
    </motion.div>
  );
}
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: reduce ? 0 : 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
      {children}
    </motion.div>
  );
}

/** Count-up: animates only the numeric part of e.g. "<5 Sec", "3X", "200+". */
export function CountUp({ value, duration = 1.6, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*?)([\d,.]+)(.*)$/);
  const prefix = m?.[1] ?? "";
  const numStr = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const target = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;
  const [display, setDisplay] = useState(m ? (reduce ? numStr : (0).toFixed(decimals)) : value);
  useEffect(() => {
    if (!m || !inView || reduce || Number.isNaN(target)) { if (m) setDisplay(numStr); return; }
    const c = animate(0, target, { duration, ease: EASE, onUpdate: (v) => setDisplay(v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{prefix}{display}{suffix}</span>
    </span>
  );
}
