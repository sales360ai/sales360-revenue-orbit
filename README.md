# Sales360.ai — front end

Run: `bun install && bun run dev`. Tests: `bunx vitest run`.

- `src/routes/` — the 7 completed pages + `__root.tsx` shell
- `src/content/global.ts` — **edit all global copy here** (nav, footer, banner, form)
- `src/components/system/` — Button, EyebrowBadge, Chip, Card, StatPod, SectionHeading, PageHero, DottedGridFrame, GradientBand, Reveal, CountUp, HashTabs, FaqAccordion
- `src/components/layout/` — Header, Footer, ConversionBanner, FloatingWhatsApp, LegalPanel, SmoothScroll
- `src/components/lead/` — LeadForm, LeadModal (`useLeadModal().open("AI Automation")`)
- `src/components/motifs/SunburstRing.tsx` — the 360 ring (static / spin / loader)
- `src/styles.css` — all design tokens and utilities
- Logo: `src/assets/sales360-logo.webp.asset.json` (swap by re-uploading)
- Claims pending client confirmation: `src/content/claims.ts` and `docs/CLAIMS_TO_VERIFY.md`
- Draft revision strings use `proposed()` in `src/content/` so their approval status is explicit

The “Edit with Lovable” badge is a project setting, not code. Hide it in the project’s publish settings before publishing if the current plan allows.
