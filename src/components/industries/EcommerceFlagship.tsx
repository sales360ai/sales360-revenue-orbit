import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import { industries } from "@/content/industries";
import { useLeadModal } from "@/components/lead/LeadModal";
import { Reveal } from "@/components/system/motion";

const f = industries.flagship;

function GlossyCube() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="pointer-events-none absolute right-5 top-5 hidden w-[190px] opacity-90 lg:block xl:right-10 xl:w-[220px]"
      initial={false}
      animate={{ y: reduce ? 0 : [0, -8, 0] }}
      transition={{ duration: 6, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      {/* Swap-in media slot: replace this SVG with a future glossy product render. */}
      <svg viewBox="0 0 220 230" fill="none" className="w-full drop-shadow-2xl">
        <defs>
          <linearGradient
            id="cube-top"
            x1="50"
            y1="30"
            x2="170"
            y2="105"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--text)" stopOpacity=".92" />
            <stop offset=".38" stopColor="var(--orange-amber)" />
            <stop offset="1" stopColor="var(--orange-ember)" />
          </linearGradient>
          <linearGradient
            id="cube-left"
            x1="45"
            y1="90"
            x2="112"
            y2="196"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--orange-ember)" />
            <stop offset="1" stopColor="var(--orange-deep)" />
          </linearGradient>
          <linearGradient
            id="cube-right"
            x1="118"
            y1="95"
            x2="181"
            y2="186"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--orange-amber)" />
            <stop offset="1" stopColor="var(--orange)" />
          </linearGradient>
        </defs>
        <ellipse cx="111" cy="205" rx="75" ry="14" fill="var(--ink)" fillOpacity=".22" />
        <path d="M110 20 190 65 110 112 30 65 110 20Z" fill="url(#cube-top)" />
        <path d="M30 65 110 112 110 202 30 153V65Z" fill="url(#cube-left)" />
        <path d="M110 112 190 65 190 153 110 202V112Z" fill="url(#cube-right)" />
        <path
          d="M110 20 190 65 190 153 110 202 30 153 30 65 110 20Z"
          stroke="var(--text)"
          strokeOpacity=".32"
        />
        <path d="M30 65 110 112 190 65M110 112V202" stroke="var(--text)" strokeOpacity=".28" />
        <path d="m52 65 58-33 57 33-57 32-58-32Z" fill="var(--text)" fillOpacity=".1" />
        <path
          d="m47 84 0 55 47 27"
          stroke="var(--text)"
          strokeOpacity=".22"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

function CartRecoveryMock() {
  return (
    <div className="relative mx-auto w-full max-w-[350px] lg:mx-0 lg:ml-auto lg:translate-y-10">
      <div className="overflow-hidden rounded-[26px] border border-foreground/15 bg-ink shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4">
          <span className="grid size-9 place-items-center rounded-full bg-orange/15 text-orange">
            <MessageCircle className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">{f.mock.title}</p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              {f.mock.status}
            </p>
          </div>
        </div>
        <div className="p-5">
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-sm border border-orange/20 bg-surface-2 p-4">
            <p className="text-xs font-semibold text-foreground">{f.mock.greeting}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {f.mock.message}
            </p>
            <div className="mt-4 flex min-h-10 items-center justify-center gap-2 rounded-xl bg-grad px-4 text-xs font-bold text-ink">
              {f.mock.payment}
              <ArrowRight className="size-3.5" aria-hidden />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-wider text-amber">
              <ShieldCheck className="size-3" aria-hidden />
              {f.mock.cod}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground">
              <Check className="size-3 text-orange" aria-hidden /> Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EcommerceFlagship() {
  const { open } = useLeadModal();
  const routeHash = useLocation({ select: (location) => location.hash });
  const reduce = useReducedMotion();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let timer = 0;
    const followHash = () => {
      if (window.location.hash.slice(1) !== f.id) return;
      setPulse(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPulse(false), reduce ? 0 : 1600);
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", followHash);
    };
  }, [routeHash, reduce]);

  return (
    <section
      id={f.id}
      className="container-site scroll-mt-[160px] pt-12 sm:pt-16"
      aria-labelledby="ecommerce-title"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-grad shadow-glow-lg sm:rounded-[40px]">
          {pulse && (
            <motion.span
              className="pointer-events-none absolute inset-0 z-10 rounded-[32px] border-2 border-amber sm:rounded-[40px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: reduce ? 0 : [0, 1, 1, 0] }}
              transition={{ duration: reduce ? 0 : 1.5, times: [0, 0.15, 0.55, 1] }}
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 dotted-grid opacity-20 [mask-image:linear-gradient(120deg,#000,transparent_70%)]"
            aria-hidden
          />
          <div
            className="absolute -bottom-1/3 right-0 h-[80%] w-2/3 bg-horizon opacity-40"
            aria-hidden
          />
          <GlossyCube />
          <div className="relative p-6 pb-16 sm:p-10 sm:pb-20 lg:p-12 lg:pb-10 xl:p-14">
            <div className="max-w-[850px] lg:pr-[150px]">
              <p className="type-mono text-[10px] font-semibold text-ink sm:text-xs">{f.eyebrow}</p>
              <h2 id="ecommerce-title" className="type-h2 mt-6 max-w-[16ch] text-balance text-ink">
                {f.headline}
              </h2>
              <p className="mt-5 max-w-[65ch] text-sm font-medium leading-relaxed text-ink/80 sm:text-base">
                {f.sub}
              </p>
            </div>

            <div className="mt-9 grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
                {f.useCases.map((item) => (
                  <article
                    key={item.number}
                    className="relative overflow-hidden rounded-[22px] border border-foreground/10 bg-ink/85 p-5 shadow-inset-top backdrop-blur-md sm:p-6"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-amber">
                      {item.number}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                      <strong className="mb-1.5 block font-semibold text-foreground">
                        {item.lead}
                      </strong>
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
              <div className="lg:col-span-4">
                <CartRecoveryMock />
              </div>
            </div>

            <button
              type="button"
              onClick={() => open(f.interest)}
              className="group mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-ink pl-6 pr-2.5 text-[15px] font-bold text-foreground shadow-xl transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              {f.cta}
              <span className="grid size-8 place-items-center rounded-full bg-foreground text-orange-deep">
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
