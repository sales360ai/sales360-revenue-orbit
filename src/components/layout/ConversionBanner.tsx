import { banner } from "@/content/global";
import { Button, ButtonLink } from "@/components/system/primitives";
import { useLeadModal } from "@/components/lead/LeadModal";
import { SunburstRing } from "@/components/motifs/SunburstRing";
import { Reveal } from "@/components/system/motion";

export function ConversionBanner() {
  const { open } = useLeadModal();
  return (
    <section aria-labelledby="banner-h" className="container-site section-y">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-surface px-6 pb-40 pt-20 text-center sm:px-12 sm:pb-52 sm:pt-28">
          <SunburstRing size={560} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[.05]" variant="spin" />
          <div className="pointer-events-none absolute top-[calc(100%-150px)] sm:top-[calc(100%-190px)] left-1/2 aspect-square w-[160%] max-w-[1400px] -translate-x-1/2 rounded-full bg-grad opacity-90 blur-[2px] animate-breathe [box-shadow:0_0_160px_40px_rgba(255,85,0,.45)]" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-horizon opacity-70" aria-hidden />
          <div className="relative mx-auto max-w-3xl">
            <h2 id="banner-h" className="type-h2 text-balance">{banner.headline}</h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-muted-foreground">{banner.sub}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button onClick={() => open(banner.primary.interest)}>{banner.primary.label}</Button>
              <ButtonLink to={banner.secondary.to} variant="secondary" className="bg-ink/40 backdrop-blur">{banner.secondary.label}</ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
