import type { MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { footer, contact } from "@/content/global";
import { Logo } from "./Logo";
import { LegalPanel } from "./LegalPanel";
import { SunburstRing } from "@/components/motifs/SunburstRing";

export function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const syncIndustryHash = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.pathname !== "/industries") return;
    event.preventDefault();
    event.stopPropagation();
    window.history.replaceState(null, "", `#${id}`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };
  return (
    <footer className="relative overflow-hidden border-t border-line bg-raised">
      <div className="container-site grid gap-12 pt-20 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[40ch] text-muted-foreground">{footer.summary}</p>
          <ul className="mt-6 space-y-2 text-[15px]">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center gap-2.5 link-draw text-muted-foreground"
              >
                <Mail className="size-4 text-orange" strokeWidth={1.5} aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-11 items-center gap-2.5 link-draw text-muted-foreground"
              >
                <Phone className="size-4 text-orange" strokeWidth={1.5} aria-hidden />
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-labelledby="f-plat">
          <h2 id="f-plat" className="type-mono text-dim">
            {footer.platformTitle}
          </h2>
          <ul className="mt-5 space-y-1">
            {footer.platform.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-11 items-center link-draw text-muted-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-labelledby="f-ind">
          <h2 id="f-ind" className="type-mono text-dim">
            {footer.companyTitle}
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
            {footer.industries.map((l) => (
              <li key={l.hash}>
                <Link
                  to="/industries"
                  hash={l.hash}
                  onClick={(event) => syncIndustryHash(event, l.hash)}
                  className="inline-flex min-h-11 items-center link-draw text-muted-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center link-draw text-muted-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-site flex flex-col items-start justify-between gap-4 border-t border-line py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>{footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-x-2">
          {footer.legal.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-dim">
                  •
                </span>
              )}
              <LegalPanel title={t} trigger={<button className="min-h-11 link-draw">{t}</button>} />
            </span>
          ))}
          <button
            onClick={toTop}
            aria-label="Scroll to top"
            className="ml-3 grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-orange"
          >
            <SunburstRing size={20} segments={12} />
          </button>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[3vw] text-center font-display text-[15vw] font-extrabold leading-none tracking-tight text-foreground/[.04] [font-variation-settings:'wdth'_125] [mask-image:linear-gradient(to_bottom,#000_20%,transparent)]">
          SALES360
        </p>
      </div>
    </footer>
  );
}
