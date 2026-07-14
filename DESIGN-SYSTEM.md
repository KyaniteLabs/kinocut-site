# Kinocut — Design System (kinocut.dev)

**Status:** **approved** (Simon, 2026-07-14) — Kinocut-specific interview in
`kinocut` repo `docs/DESIGN-SYSTEM-INTERVIEW-KINOCUT.md`. Implementation may proceed.

**Committed direction in one line:** "Agent edit bay on basalt — dense cool instrument
hierarchy, cyan system / amber verified / magenta human-pending, Space Grotesk + Plus
Jakarta + elevated mono, flat hairline ledger structure, signature = Video Receipt panel,
imagery = one tableau + product chrome only, motion = transport-level only."

## Canonical source (read this first)

**Product authority (2026-07-14):** Kinocut-only interview
`docs/DESIGN-SYSTEM-INTERVIEW-KINOCUT.md` in the kinocut product repo.
This site is an **agent edit bay / NLE inspector** product surface — not the
KyaniteLabs org homepage and not a generic labs portfolio.

**Local tokens:** `css/tokens.css` (product surface). Palette primitives may
share the lab family (void/basalt, cyan/amber/magenta, Space Grotesk / Plus
Jakarta / JetBrains Mono) but hierarchy, density, chrome, and signature are
Kinocut-specific:

| Layer | Kinocut rule |
| --- | --- |
| Chrome | Bay top bar · gate transport strip · left BAY rail |
| Signature | Video Receipt as **instrument monitor** (not paper till) |
| Density | Dense instrument (48px etch, compact type) |
| Roles | cyan = system live · amber = verified · magenta = human hold |
| Imagery | One tableau under hero + product chrome only |

> **Correction log:** 2026-07-10 — first palette invented off-brand (rejected).
> 2026-07-14 — doc-shell polish shipped without homepage redesign (looked the same;
> Simon correctly rejected). Homepage rebuilt same day to edit-bay chrome.

## Interview record (answered by judgment, per Simon's direction 2026-07-10)

Simon directed: answer the forcing questions with best judgment from everything known
about him, rather than deferring them back. The reasoning, per question:

1. **Reference:** the mcp-video tableau (editing as stonecraft on a workbench) + the
   Bloomberg-terminal instinct — he builds kiosks and dashboards, reads at speed,
   states "density first, max meaning per token."
2. **Poles:** cool · serious · **dense** · technical-refined. Cool field, *designated*
   warm objects (amber signals) — matching a voice that is precise with warmth in the
   human moments. Dense was the decisive judgment call: airy marketing whitespace is
   not his taste.
3. **Aesthetic phrase:** "an editor's instrument bench on black stone — cyan
   schematics, amber signals, engraved proof."
4. **Type:** brand faces; mono does more work than usual (terminal-native operator).
5. **Color/mode:** cyan anchor on void; amber=trust, magenta=pending-human,
   blue=structural-only; dark-only (his TUI default is amber-night; his rooms are dark).
6. **Density/shape:** sections 48px rhythm (was 64), 4-8px corners, hairlines, flat.
7. **Structure:** **engineering-sheet rhythm** — left annotation rail; each section
   indexed by a cyan timecode (00:01…) because the page IS a timeline (the playhead
   already says so; the numbering encodes real order, per the structure-is-information
   rule). Replaced the metronomic template bands.
8. **Signature:** the Video Receipt as an engraved manifest panel — the product thesis as an instrument readout. (v1 paper/till-receipt treatment rejected by Simon as "arts and crafts"; v2 cool-paper certificate also rejected — no paper at all; cohesion with the stone/instrument world won.)
9. **Imagery:** tableau once (hero) + og; etched blueprint gridlines as void texture
   (the tableau's engraved marks, abstracted, sub-contrast at 0.035 alpha); Lucide-only
   if ever; never stock.
10. **Motion:** restrained, scroll-linked position only — he would resent decoration.

## Decisions

| Dimension | Commitment |
|---|---|
| Aesthetic phrase | **Edit-suite over kyanite stone** — the brand's void/basalt field, precision cyan, the manifest panel as the one bold object |
| Personality poles | cool · serious · dense · refined |
| Signature move | **The Video Receipt** as an engraved manifest panel (hero) — translucent basalt over the tableau, amber edge, digest barcode. The playhead timecode ruler is *ambient* — ≤3px, text-only, never competes. |
| Mode | **Dark-only**, deliberate (edit rooms; the brand system is dark-native). Light relief comes from type contrast and the amber/cyan signals, not from any light surface. |
| Color roles | Cyan = links/accents/hot lines. **Amber = trust/verified moments only.** **Magenta = pending-human/edit markers only.** Blue `#087dcc` = structural shapes/borders only — measured 4.5:1 as text, never copy. Mint `#52d3aa` (design-system success) = pass marks. |
| Type | Display: Space Grotesk 700. Body: Plus Jakarta Sans 400/700. Mono: JetBrains Mono 400/600. All self-hosted, brand faces. |
| Density & shape | Dense-leaning; 4/8px corners; flat; hairline rules (`--line-color`, the brand's line token). |
| Structure & rhythm | Asymmetric hero (text left, receipt right over the tableau); titled bands with hairline rules; **ledger rows, never card grids**; syncopation via the centered thesis band and the manifest panel floating over the tableau. |
| Imagery stance | (1) Baseline: type, the manifest panel, terminals, glyph marks. (2) **The brand tableau** is the one photographic asset — hero backdrop (void-faded under text) + og:image. (3) Technical diagrams permitted: one style, cyan/amber on basalt. (4) Icons when needed: **Lucide 1.5px** only. Never stock, never AI-gradient slop, never emoji-as-icons. |
| Motion | Restrained: skip-link slide, hover transitions, scroll-linked playhead position. `prefers-reduced-motion` collapses all. No reveals. |
| Language | Bilingual EN/ES as peers; native copy both sides. Toggle + `/es.html`. |

## Refusals

- Nothing off `kyanite-system.css`: no invented hues, no off-brand faces.
- No Inter/Roboto; no purple gradients; no pill CTAs; no glassmorphism; no card grids.
- No amber outside trust moments; no magenta outside pending/marker moments; no blue as text.
- No stock photography; no mixed icon styles; no pure black `#000`.
- No autoplay, no scroll-jacking, no cookie banner, no analytics (the site honors the product's local-first claim).
- No light theme by accident — dark-only is a decision.

## Signature discipline

One signature: the receipt manifest gets the boldness budget (panel over art, amber edge + chip, barcode).
The playhead stays ambient. The tableau backdrop must always fade to `--void` under
text — measured contrast outranks art visibility.
