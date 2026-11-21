import * as D from "@radix-ui/react-dialog";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, headerCta } from "@/content/global";
import { Logo } from "./Logo";
import { Button } from "@/components/system/primitives";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { EASE } from "@/components/system/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: openLead } = useLeadModal();
  const reduce = useReducedMotion();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "glass border-line" : "border-transparent",
      )}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center px-3.5 text-[15px] font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {n.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-orange shadow-glow-sm"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => openLead(headerCta.interest)}
            className="hidden sm:inline-flex"
          >
            {headerCta.label}
          </Button>
          <D.Root open={open} onOpenChange={setOpen}>
            <D.Trigger
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-foreground/[.04] lg:hidden"
            >
              <SunburstRing size={22} segments={12} />
            </D.Trigger>
            <D.Portal>
              <D.Overlay className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <D.Content className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-sm flex-col overflow-y-auto border-l border-line-strong bg-raised p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right">
                <div className="flex items-center justify-between">
                  <D.Title className="sr-only">Menu</D.Title>
                  <D.Description className="sr-only">Site navigation</D.Description>
                  <Logo />
                  <D.Close
                    aria-label="Close menu"
                    className="grid size-11 place-items-center rounded-full border border-line-strong"
                  >
                    <X className="size-4" strokeWidth={1.5} />
                  </D.Close>
                </div>
                <nav aria-label="Mobile" className="mt-10 flex-1">
                  <ul className="space-y-1">
                    {nav.map((n, i) => {
                      const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                      return (
                        <motion.li
                          key={n.to}
                          initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: reduce ? 0 : 0.05 + i * 0.05,
                            duration: reduce ? 0 : 0.5,
                            ease: EASE,
                          }}
                        >
                          <Link
                            to={n.to}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex min-h-14 items-center justify-between border-b border-line font-display text-3xl font-bold [font-variation-settings:'wdth'_115]",
                              active ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {n.label}
                            {active && (
                              <span className="size-2 rounded-full bg-orange" aria-hidden />
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                <Button
                  onClick={() => {
                    setOpen(false);
                    openLead(headerCta.interest);
                  }}
                  className="w-full"
                >
                  {headerCta.label}
                </Button>
              </D.Content>
            </D.Portal>
          </D.Root>
        </div>
      </div>
    </header>
  );
}
