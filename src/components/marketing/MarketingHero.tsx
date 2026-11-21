import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MousePointerClick,
  PhoneCall,
  Search,
  Share2,
  Video,
} from "lucide-react";
import { marketing, type MarketingChannelId } from "@/content/marketing";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { EASE } from "@/components/system/motion";
import { Button, DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";

const h = marketing.hero;
const nodes: { id: MarketingChannelId; icon: typeof Search; left: string; top: string }[] = [
  { id: "google-meta-ads", icon: MousePointerClick, left: "50%", top: "0%" },
  { id: "seo-aeo", icon: Search, left: "50%", top: "23%" },
  { id: "social-media", icon: Share2, left: "100%", top: "50%" },
  { id: "whatsapp", icon: MessageCircle, left: "74%", top: "72%" },
  { id: "email", icon: Mail, left: "50%", top: "100%" },
  { id: "telecalling", icon: PhoneCall, left: "0%", top: "50%" },
  { id: "video", icon: Video, left: "26%", top: "72%" },
];

function ChannelOrbit() {
  const selectChannel = (event: MouseEvent<HTMLAnchorElement>, id: MarketingChannelId) => {
    event.preventDefault();
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById("channel-deck")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div
      className="relative mx-auto size-[280px] sm:size-[360px] lg:size-[420px]"
      aria-label="Seven connected marketing channels"
    >
      <div className="orbit-spin absolute inset-0">
        <div className="absolute inset-0 rounded-full border border-dashed border-orange/25" />
        <div className="absolute inset-[23%] rounded-full border border-dashed border-orange/20" />
        {nodes.map((node) => {
          const channel = marketing.channels.find((item) => item.id === node.id)!;
          const Icon = node.icon;
          return (
            <a
              key={node.id}
              href={`#${node.id}`}
              aria-label={`View ${channel.label}`}
              onClick={(event) => selectChannel(event, node.id)}
              className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-line-strong bg-raised text-muted-foreground shadow-inset-top transition-[border-color,color,background-color] hover:border-orange hover:bg-orange/10 hover:text-orange"
              style={{ left: node.left, top: node.top }}
            >
              <span className="orbit-counter grid place-items-center">
                <Icon className="size-4" strokeWidth={1.7} aria-hidden />
              </span>
            </a>
          );
        })}
      </div>
      <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-orange/25 bg-background/85 shadow-glow-sm backdrop-blur-md sm:size-36">
        <SunburstRing size={94} variant="spin" className="opacity-80" />
      </div>
    </div>
  );
}

export function MarketingHero() {
  const { open } = useLeadModal();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section
      className="container-site max-w-[1440px] pt-[104px] sm:pt-[120px]"
      aria-labelledby="marketing-hero-title"
    >
      <DottedGridFrame className="px-5 py-10 sm:px-10 sm:py-14 lg:min-h-[620px] lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.div {...rise(0.08)}>
              <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
            </motion.div>
            <motion.h1
              {...rise(0.16)}
              id="marketing-hero-title"
              className="type-h1 mt-7 max-w-[15ch] text-balance"
            >
              {h.titleLead} <span className="text-grad">{h.accent}</span>
            </motion.h1>
            <motion.p
              {...rise(0.24)}
              className="mt-6 max-w-[62ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {h.sub}
            </motion.p>
            <motion.div {...rise(0.32)} className="mt-8">
              <Button onClick={() => open(h.interest)} className="w-full text-ink sm:w-auto">
                {h.primary}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <ChannelOrbit />
          </motion.div>
        </div>
      </DottedGridFrame>
    </section>
  );
}
