import { motion, useReducedMotion } from "framer-motion";
import { contactPage } from "@/content/contact";
import { FaqAccordion } from "@/components/system/FaqAccordion";
import { SectionHeading } from "@/components/system/primitives";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/system/motion";
import { Claim } from "@/components/system/Claim";

export function NextSteps() {
  const reduce = useReducedMotion();
  return (
    <section className="container-site section-y" aria-labelledby="next-steps-title">
      <Reveal>
        <SectionHeading id="next-steps-title" title={contactPage.next.title} align="center" />
      </Reveal>
      <div className="relative mt-10 rounded-[28px] border border-line bg-surface/60 p-6 shadow-inset-top sm:p-8 lg:p-10">
        <motion.div
          className="absolute bottom-8 left-10 top-8 w-px origin-top border-l border-dashed border-orange/35 md:hidden"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          aria-hidden
        />
        <motion.div
          className="absolute left-[12%] right-[12%] top-[62px] hidden origin-left border-t border-dashed border-orange/35 md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          aria-hidden
        />
        <RevealGroup className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {contactPage.next.steps.map((step) => (
            <RevealItem key={step.number} className="relative pl-16 md:pl-0">
              <div className="absolute left-0 top-0 grid size-12 place-items-center rounded-full border border-orange/30 bg-background font-display text-sm font-extrabold text-grad md:relative md:mx-auto md:size-16 md:text-xl">
                {step.number}
              </div>
              <div className="md:mt-7 md:text-center">
                <h3 className="font-display text-xl font-bold">{step.lead}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function ContactFaq() {
  return (
    <section className="container-site pb-24 sm:pb-32" aria-labelledby="contact-faq-title">
      <Reveal className="mx-auto max-w-4xl">
        <SectionHeading id="contact-faq-title" title={contactPage.faq.title} align="center" />
        <div className="mt-9">
          <FaqAccordion
            items={contactPage.faq.items.map((item, index) => ({
              ...item,
              a: index === 0 ? <Claim id="launch-timeline" template={item.a} /> : item.a,
            }))}
            defaultValue="i0"
          />
        </div>
      </Reveal>
    </section>
  );
}
