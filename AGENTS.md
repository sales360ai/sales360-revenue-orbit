<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- All site copy lives in `src/content/` typed objects; components never hardcode brief copy. Why: client edits text in one place.
- Exactly 7 routes (/, /sales, /marketing, /automation, /tech-cloud, /industries, /contact); legal pages are slide-over panels, never routes. Why: brief forbids subpages.
- Shared shell (Header, Footer, ConversionBanner, WhatsApp, LeadModalProvider) lives in `__root.tsx`; non-navigational CTAs call `useLeadModal().open(interest)`. Why: one global modal with pre-selected interest.
- Design tokens are CSS variables + `@utility` classes in `src/styles.css`; reusable primitives in `src/components/system/`. Why: single design system.
- Lead forms submit through a validated server function to private `lead_submissions` storage; never replace this with client-only success state or public read access. Why: every inquiry must reach the owner without exposing customer data.
