import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock3, Copy, Mail, Phone } from "lucide-react";
import { contactPage } from "@/content/contact";
import { LeadForm } from "@/components/lead/LeadForm";
import { Card, DottedGridFrame, EyebrowBadge } from "@/components/system/primitives";
import { EASE, RevealGroup, RevealItem } from "@/components/system/motion";

const h = contactPage.hero;
const channelIcons = { email: Mail, phone: Phone, response: Clock3 };

type Channel = (typeof h.channels)[number];

function DirectContactCard({ channel }: { channel: Channel }) {
  const [copied, setCopied] = useState(false);
  const Icon = channelIcons[channel.id];
  const copy = () => {
    if (!("copyValue" in channel)) return;
    const confirmCopy = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    };
    const textarea = document.createElement("textarea");
    textarea.value = channel.copyValue;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const copiedSynchronously = document.execCommand("copy");
    textarea.remove();
    if (copiedSynchronously) {
      confirmCopy();
      return;
    }
    void navigator.clipboard
      .writeText(channel.copyValue)
      .then(confirmCopy)
      .catch(() => setCopied(false));
  };

  return (
    <Card as="article" className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-2xl border border-orange/25 bg-orange/10 text-orange ${channel.id === "response" ? "animate-pulse-dot" : ""}`}
        >
          <Icon className="size-5" strokeWidth={1.7} aria-hidden />
        </span>
        {"copyValue" in channel && (
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line-strong px-3 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-orange hover:text-foreground"
            aria-label={`Copy ${channel.value}`}
          >
            {copied ? <Check className="size-3.5 text-orange" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
      <p className="mt-5 type-mono text-[10px] text-muted-foreground">{channel.label}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {"href" in channel ? (
          <a
            href={channel.href}
            {...(channel.id === "phone" ? { target: "_blank", rel: "noreferrer" } : {})}
            className="inline-flex min-h-11 items-center font-display text-lg font-bold link-draw sm:text-xl"
          >
            {channel.value}
          </a>
        ) : (
          <p className="font-display text-lg font-bold sm:text-xl">{channel.value}</p>
        )}
        {"secondaryHref" in channel && (
          <a
            href={channel.secondaryHref}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-amber link-draw"
          >
            Call
          </a>
        )}
      </div>
    </Card>
  );
}

export function ContactHero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section
      className="container-site max-w-[1440px] pt-[104px] sm:pt-[120px]"
      aria-labelledby="contact-hero-title"
    >
      <DottedGridFrame className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <motion.div {...rise(0.08)}>
              <EyebrowBadge>{h.eyebrow}</EyebrowBadge>
            </motion.div>
            <motion.h1
              {...rise(0.16)}
              id="contact-hero-title"
              className="type-h1 mt-7 max-w-[14ch] text-balance"
            >
              {h.titleLead} <span className="text-grad">{h.accent}</span>
            </motion.h1>
            <motion.p
              {...rise(0.24)}
              className="mt-6 max-w-[56ch] text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {h.sub}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <div className="rounded-[28px] bg-grad p-px shadow-glow-lg">
              <div className="rounded-[27px] bg-raised p-5 sm:p-7">
                <LeadForm defaultInterest={h.interest} idPrefix="contact" variant="inline" />
              </div>
            </div>
          </motion.div>

          <RevealGroup className="order-3 grid content-start gap-3 lg:col-start-1 lg:row-start-2">
            {h.channels.map((channel) => (
              <RevealItem key={channel.id}>
                <DirectContactCard channel={channel} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </DottedGridFrame>
    </section>
  );
}
