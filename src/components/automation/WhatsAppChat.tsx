import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, CalendarCheck2, Check, FileText, MessageCircle, UserRoundCheck } from "lucide-react";
import { automation } from "@/content/automation";
import { EASE } from "@/components/system/motion";
import { cn } from "@/lib/utils";

const chat = automation.whatsapp;
type Message = (typeof chat.messages)[number];

function ChatMessage({ message }: { message: Message }) {
  if (message.kind === "brochure") {
    return (
      <div className="ml-auto flex w-[88%] items-center gap-3 rounded-2xl rounded-tr-sm border border-orange/25 bg-orange/[.08] p-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-grad text-ink">
          <FileText className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold">{chat.brochureName}</p>
          <p className="mt-1 font-mono text-[8px] text-muted-foreground">
            PDF · {chat.brochureSize}
          </p>
        </div>
      </div>
    );
  }

  if (message.kind === "calendar" || message.kind === "handoff") {
    const calendar = message.kind === "calendar";
    const Icon = calendar ? CalendarCheck2 : UserRoundCheck;
    return (
      <div className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-orange/30 bg-surface px-3 py-2 text-center text-[8px] font-medium text-amber">
        <Icon className="size-3.5 shrink-0" aria-hidden />
        <span>{calendar ? chat.calendar : chat.handoff}</span>
      </div>
    );
  }

  const customer = message.sender === "customer";
  return (
    <div
      className={cn(
        "max-w-[86%] rounded-2xl border px-3.5 py-2.5 text-[10px] leading-relaxed shadow-inset-top",
        customer
          ? "mr-auto rounded-tl-sm border-line bg-surface-2 text-foreground/90"
          : "ml-auto rounded-tr-sm border-orange/25 bg-orange/[.09] text-foreground",
      )}
    >
      {message.text}
      <span className="mt-1 flex items-center justify-end gap-1 font-mono text-[7px] text-muted-foreground">
        {customer ? "10:41" : "10:42"}
        {!customer && <Check className="size-2.5 text-orange" aria-hidden />}
      </span>
    </div>
  );
}

export function WhatsAppChat() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? chat.messages.length - 1 : 0);
  const [typing, setTyping] = useState(!reduce);

  useEffect(() => {
    if (reduce) {
      setStep(chat.messages.length - 1);
      setTyping(false);
      return;
    }
    setTyping(true);
    const typingTimer = window.setTimeout(() => setTyping(false), 1050);
    const nextTimer = window.setTimeout(
      () => setStep((current) => (current + 1) % chat.messages.length),
      2000,
    );
    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(nextTimer);
    };
  }, [step, reduce]);

  const visible = reduce ? chat.messages : chat.messages.slice(0, step + 1);

  return (
    <div className="mx-auto w-full max-w-[380px] rounded-[42px] border border-line-strong bg-surface p-2 shadow-2xl shadow-orange/5">
      <div className="overflow-hidden rounded-[34px] border border-line bg-background">
        <div className="flex items-center gap-3 border-b border-line bg-surface/80 px-4 py-4">
          <span className="relative grid size-10 place-items-center rounded-full bg-grad text-ink">
            <MessageCircle className="size-4" aria-hidden />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-surface bg-orange" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold">{chat.contact}</p>
            <p className="mt-0.5 truncate font-mono text-[7px] text-muted-foreground">
              {chat.online}
            </p>
          </div>
          <Bot className="size-4 text-orange" aria-label={chat.agent} />
        </div>

        <div
          className="flex min-h-[530px] flex-col justify-end gap-2.5 dotted-grid p-3.5 sm:min-h-[540px]"
          aria-label="Scripted AI sales conversation with Ananya"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((message) => (
              <motion.div
                layout
                key={message.id}
                initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && !reduce && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-auto flex w-fit items-center gap-1 rounded-full border border-orange/20 bg-orange/[.07] px-3 py-2"
              aria-label={chat.typing}
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1 rounded-full bg-orange animate-pulse-dot"
                  style={{ animationDelay: `${dot * 160}ms` }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
