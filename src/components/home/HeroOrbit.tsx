import { SunburstRing } from "@/components/motifs/SunburstRing";

/** Layered 360 accent: 10s primary ring, 7s counter-ring and independent node orbits. */
export function HeroOrbit() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2 sm:size-[250px]"
      aria-hidden
    >
      <svg className="hero-ring-main absolute inset-0 size-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="91"
          fill="none"
          stroke="var(--orange)"
          strokeOpacity=".42"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
        <circle cx="100" cy="9" r="3" fill="var(--orange-amber)" />
      </svg>
      <svg className="hero-ring-counter absolute inset-0 size-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="61"
          fill="none"
          stroke="var(--orange-amber)"
          strokeOpacity=".5"
          strokeWidth="1"
          strokeDasharray="1 6"
        />
        <circle cx="100" cy="39" r="2.5" fill="var(--orange)" />
      </svg>
      <span className="hero-node-orbit hero-node-orbit-a absolute inset-0">
        <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-orange shadow-glow-sm" />
      </span>
      <span className="hero-node-orbit hero-node-orbit-b absolute inset-5">
        <span className="absolute bottom-[12%] right-[12%] size-1 rounded-full bg-amber" />
      </span>
      <span className="hero-node-orbit hero-node-orbit-c absolute inset-9">
        <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-orange" />
      </span>
      <span className="absolute inset-0 grid place-items-center">
        <SunburstRing size={44} variant="spin" tone="ink" className="hero-ring-main" />
      </span>
    </div>
  );
}
