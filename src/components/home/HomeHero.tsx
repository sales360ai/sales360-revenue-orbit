import { type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { home } from "@/content/home";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { BrandIcon } from "./BrandIcon";
import { Button, ButtonLink, EyebrowBadge } from "@/components/system/primitives";
import { EASE } from "@/components/system/motion";
import arjunPortrait from "@/assets/founder-arjun.webp.asset.json";
import ananyaPortrait from "@/assets/founder-ananya.webp.asset.json";
import devPortrait from "@/assets/founder-dev.webp.asset.json";
import meeraPortrait from "@/assets/founder-meera.webp.asset.json";
import rahulPortrait from "@/assets/founder-rahul.webp.asset.json";

const trustPortraits = [
  { name: "Arjun", image: arjunPortrait.url },
  { name: "Ananya", image: ananyaPortrait.url },
  { name: "Dev", image: devPortrait.url },
  { name: "Meera", image: meeraPortrait.url },
  { name: "Rahul", image: rahulPortrait.url },
];

const h = home.hero;

const Y_HUB = 330;
const fanLines = Array.from({ length: 14 }, (_, i) => 20 + i * 26);

const integrations: { name: string; x: number; y: number; icon: ReactNode }[] = [
  { name: "Meta", x: 11, y: 22, icon: <BrandIcon name="Meta" className="size-full" /> },
  { name: "Google", x: 24, y: 58, icon: <BrandIcon name="Google" className="size-full" /> },
  { name: "WhatsApp", x: 9, y: 86, icon: <BrandIcon name="WhatsApp" className="size-full" /> },
  { name: "Email", x: 36, y: 86, icon: <Mail className="size-full" strokeWidth={1.7} /> },
  { name: "AI", x: 50, y: 18, icon: <Sparkles className="size-full" strokeWidth={1.7} /> },
  { name: "Instagram", x: 64, y: 86, icon: <BrandIcon name="Instagram" className="size-full" /> },
  { name: "LinkedIn", x: 76, y: 58, icon: <Linkedin className="size-full" strokeWidth={1.7} /> },
  { name: "Website", x: 89, y: 22, icon: <Globe className="size-full" strokeWidth={1.7} /> },
  { name: "Call", x: 91, y: 86, icon: <Phone className="size-full" strokeWidth={1.7} /> },
];

function IntegrationFan() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-[12/5] w-full max-w-[1200px] min-h-[220px]">
      <svg
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {fanLines.map((y, i) => (
          <g key={y}>
            {[
              `M0 ${y + 40} C 300 ${y + 40}, 430 ${Y_HUB}, 600 ${Y_HUB}`,
              `M1200 ${y + 40} C 900 ${y + 40}, 770 ${Y_HUB}, 600 ${Y_HUB}`,
            ].map((d, side) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="var(--orange)"
                strokeOpacity={0.16 + (i % 4) * 0.07}
                strokeWidth="1"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.4 + i * 0.03 + side * 0.05, ease: EASE }}
              />
            ))}
          </g>
        ))}
        {fanLines
          .filter((_, i) => i % 3 === 1)
          .map((y, i) => (
            <path
              key={`pulse-${y}`}
              d={`M0 ${y + 40} C 300 ${y + 40}, 430 ${Y_HUB}, 600 ${Y_HUB}`}
              fill="none"
              stroke="var(--orange-amber)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 120"
              className="hero-connector-pulse"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
      </svg>
      <div
        className="absolute left-1/2 top-[78%] h-40 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/20 blur-[80px]"
        aria-hidden
      />
      <motion.div
        className="absolute left-1/2 top-[78.5%] z-20 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[20px] bg-grad shadow-glow sm:size-24 sm:rounded-[28px]"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
      >
        <SunburstRing size={44} variant="spin" tone="ink" />
      </motion.div>
      <ul aria-label="Connected channels">
        {integrations.map((item, i) => (
          <motion.li
            key={item.name}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 + i * 0.08, ease: EASE }}
          >
            <div
              className="hero-channel glass grid size-10 place-items-center rounded-xl border border-line-strong p-2.5 text-foreground shadow-inset-top sm:size-14 sm:rounded-2xl sm:p-4"
              style={
                {
                  "--channel-delay": `${i * -0.7}s`,
                  "--channel-rotate": `${i % 2 === 0 ? -4 : 4}deg`,
                } as CSSProperties
              }
              title={item.name}
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function HomeHero() {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section className="container-site max-w-[1440px] pt-[88px]" aria-labelledby="home-hero-title">
      <motion.div
        className="relative overflow-hidden rounded-[28px] border border-line bg-raised sm:rounded-[36px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div
          className="absolute inset-0 dotted-grid opacity-70 [mask-image:radial-gradient(ellipse_at_50%_25%,#000_20%,transparent_78%)]"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] bg-horizon opacity-60 animate-breathe"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-orange/[.055] blur-[110px]"
          aria-hidden
        />

        <div className="relative z-30 mx-auto flex max-w-[1120px] flex-col items-center px-4 pb-8 pt-8 text-center sm:px-8 sm:pt-10 lg:pb-0">
          <motion.div
            className="glass grid size-14 place-items-center rounded-[18px] border border-line-strong shadow-glow-sm"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            <SunburstRing size={36} variant="spin" />
          </motion.div>
          <motion.div {...rise(0.28)} className="mt-5">
            <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
          </motion.div>
          <h1
            id="home-hero-title"
            className="type-hero mt-8 max-w-full text-balance text-[clamp(2.35rem,6.4vw,5.4rem)] leading-[.98] tracking-[-0.035em] [font-variation-settings:'wdth'_112] max-sm:text-[clamp(1.9rem,8.4vw,2.35rem)] lg:mt-9"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: reduce ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              >
                {h.line1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-grad block"
                initial={{ y: reduce ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
              >
                {h.line2}
              </motion.span>
            </span>
          </h1>
          <motion.p
            {...rise(0.64)}
            className="mt-5 max-w-[64ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {h.sub}
          </motion.p>
          <motion.div
            {...rise(0.72)}
            className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button onClick={() => open(h.primaryInterest)} className="w-full sm:w-auto">
              {h.primary}
            </Button>
            <ButtonLink
              to="/sales"
              variant="secondary"
              className="w-full bg-background/35 sm:w-auto"
            >
              {h.secondary}
            </ButtonLink>
          </motion.div>
          <motion.div {...rise(0.8)} className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex -space-x-2.5">
              {trustPortraits.map((portrait) => (
                <img
                  key={portrait.name}
                  src={portrait.image}
                  alt=""
                  width="36"
                  height="36"
                  loading="eager"
                  className="size-9 rounded-full border-2 border-background object-cover ring-1 ring-orange/60"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-foreground/85">{h.trust}</span>
          </motion.div>
          <motion.p
            {...rise(0.86)}
            className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]"
          >
            {h.micro}
          </motion.p>
        </div>

        <div className="relative z-20 px-2 pb-6 sm:px-6">
          <IntegrationFan />
        </div>
      </motion.div>
    </section>
  );
}
