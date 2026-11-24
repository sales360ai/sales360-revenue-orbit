import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { sampleDataLabel } from "@/content/global";
import { Claim } from "@/components/system/Claim";

/* ---------- Button ---------- */
export const buttonStyles = cva(
  "group inline-flex max-w-full items-center justify-center gap-3 rounded-full font-semibold whitespace-nowrap transition-[box-shadow,border-color,background-color,transform] duration-300 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-grad text-foreground font-bold btn-shine hover:shadow-glow-sm",
        secondary:
          "bg-foreground/[.04] border border-line-strong text-foreground hover:border-orange/70",
      },
      size: { md: "h-[52px] text-[15px]", sm: "h-11 text-sm" },
    },
    compoundVariants: [
      { variant: "primary", size: "md", class: "pl-6 pr-2.5" },
      { variant: "primary", size: "sm", class: "pl-5 pr-1.5" },
      { variant: "secondary", class: "px-6" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

function Capsule({
  loading,
  size,
}: {
  loading?: boolean | undefined;
  size?: "md" | "sm" | null | undefined;
}) {
  return (
    <span
      className={cn(
        "relative z-10 grid place-items-center rounded-full bg-foreground text-orange-deep",
        size === "sm" ? "size-8" : "size-8",
      )}
    >
      {loading ? (
        <SunburstRing size={18} variant="loader" />
      ) : (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.25}
          aria-hidden
        />
      )}
    </span>
  );
}

type BtnBase = VariantProps<typeof buttonStyles> & {
  arrow?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, BtnBase & ComponentPropsWithoutRef<"button">>(
  function Button({ variant, size, arrow, loading, children, className, ...rest }, ref) {
    const showCap = arrow ?? variant !== "secondary";
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        aria-busy={loading || undefined}
        {...rest}
      >
        <span className="relative z-10">{children}</span>
        {showCap && variant !== "secondary" && <Capsule loading={loading} size={size} />}
      </button>
    );
  },
);

export function ButtonLink({
  to,
  hash,
  variant,
  size,
  arrow,
  children,
  className,
}: BtnBase & { to: string; hash?: string }) {
  const showCap = arrow ?? variant !== "secondary";
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      className={cn(buttonStyles({ variant, size }), className)}
    >
      <span className="relative z-10">{children}</span>
      {showCap && variant !== "secondary" && <Capsule size={size} />}
    </Link>
  );
}

/* ---------- Eyebrow / Chip ---------- */
export function EyebrowBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-orange/30 bg-orange/[.08] px-3.5 py-1.5 type-mono text-foreground/90",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" aria-hidden />
      {children}
    </span>
  );
}

const chipStyles = cva("inline-flex items-center rounded-full border px-3 py-1 type-mono", {
  variants: {
    tone: {
      default: "border-line-strong text-muted-foreground",
      orange: "border-orange/40 text-amber bg-orange/[.06]",
      solid: "border-transparent bg-ink text-foreground",
    },
  },
  defaultVariants: { tone: "default" },
});
export function Chip({
  children,
  tone,
  className,
}: { children: ReactNode; className?: string } & VariantProps<typeof chipStyles>) {
  return <span className={cn(chipStyles({ tone }), className)}>{children}</span>;
}

export function SampleDataChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-line-strong bg-surface-2 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-muted-foreground",
        className,
      )}
    >
      {sampleDataLabel}
    </span>
  );
}

/* ---------- Card with spotlight ---------- */
export function Card({
  children,
  className,
  as: As = "div",
  ...rest
}: { children: ReactNode; className?: string; as?: "div" | "article" | "li" } & Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
>) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <As
      onPointerMove={onMove}
      className={cn("spotlight-card p-6 sm:p-8", className)}
      {...(rest as object)}
    >
      {children}
    </As>
  );
}

/* ---------- StatPod ---------- */
import { CountUp } from "./motion";
export function StatPod({
  value,
  claimId,
  label,
  className,
}: {
  value?: string;
  claimId?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface p-6 shadow-inset-top", className)}>
      <div className="type-h2 flex min-h-[1lh] items-baseline text-grad tabular-nums">
        {claimId ? <Claim id={claimId} countUp /> : value ? <CountUp value={value} /> : null}
      </div>
      <p className="mt-2 min-h-[2lh] text-balance type-mono text-muted-foreground">{label}</p>
    </div>
  );
}

/* ---------- SectionHeading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "left",
  className,
  as: H = "h2",
  id,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
      initial={{
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 24,
        clipPath: reduce ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && <EyebrowBadge className="mb-5">{eyebrow}</EyebrowBadge>}
      <H id={id} className="type-h2 text-balance">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-grad">{accent}</span>
          </>
        )}
      </H>
      {sub && (
        <p
          className={cn("mt-5 max-w-[60ch] text-muted-foreground", align === "center" && "mx-auto")}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ---------- DottedGridFrame (dotted grid + horizon glow) ---------- */
export function DottedGridFrame({
  children,
  className,
  horizon = true,
}: {
  children: ReactNode;
  className?: string;
  horizon?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-line-strong bg-raised",
        className,
      )}
    >
      <div
        className="absolute inset-0 dotted-grid [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_85%)]"
        aria-hidden
      />
      {horizon && (
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] bg-horizon animate-breathe"
          aria-hidden
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- GradientBand ---------- */
export function GradientBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden bg-grad", className)}>
      <div
        className="absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,transparent_30%,rgba(10,10,11,.55)_100%)]"
        aria-hidden
      />
      <div className="relative container-site section-y">{children}</div>
    </section>
  );
}

/* ---------- PageHero shell ---------- */
export function PageHero({
  eyebrow,
  title,
  accent,
  sub,
  actions,
  variant = "inner",
  children,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  actions?: ReactNode;
  variant?: "home" | "inner";
  children?: ReactNode;
}) {
  return (
    <section className="container-site pt-28 sm:pt-32">
      <DottedGridFrame className="px-5 py-16 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow && <EyebrowBadge className="mb-6">{eyebrow}</EyebrowBadge>}
          <h1 className={cn(variant === "home" ? "type-hero" : "type-h1", "text-balance")}>
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-grad">{accent}</span>
              </>
            )}
          </h1>
          {sub && <p className="mx-auto mt-6 max-w-[62ch] text-muted-foreground">{sub}</p>}
          {actions && (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{actions}</div>
          )}
        </div>
        {children}
      </DottedGridFrame>
    </section>
  );
}
