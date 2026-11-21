# Sales360.ai — front end

Run: `bun install && bun run dev`. Tests: `bunx vitest run`.

- `src/routes/` — the 7 pages (currently temporary stubs) + `__root.tsx` shell
- `src/content/global.ts` — **edit all global copy here** (nav, footer, banner, form)
- `src/components/system/` — Button, EyebrowBadge, Chip, Card, StatPod, SectionHeading, PageHero, DottedGridFrame, GradientBand, Reveal, CountUp, HashTabs, FaqAccordion
- `src/components/layout/` — Header, Footer, ConversionBanner, FloatingWhatsApp, LegalPanel, SmoothScroll
- `src/components/lead/` — LeadForm, LeadModal (`useLeadModal().open("AI Automation")`)
- `src/components/motifs/SunburstRing.tsx` — the 360 ring (static / spin / loader)
- `src/styles.css` — all design tokens and utilities
- Logo: `src/assets/sales360-logo.webp.asset.json` (swap by re-uploading)
