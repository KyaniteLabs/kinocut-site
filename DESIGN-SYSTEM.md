# Kinocut — Design System (kinocut.dev)

**Committed direction in one line:** "The KyaniteLabs system in an edit suite — void/basalt
stone darks, electric cyan precision lines, amber trust moments, magenta edit markers,
Space Grotesk over Plus Jakarta Sans; the signature is the Video Receipt; the brand
tableau (repo hero art) is the visual anchor."

## Canonical source (read this first)

**This site inherits the KyaniteLabs design system:**
`~/workspaces/kyanite-labs/kyanite-landing/static/css/kyanite-system.css`
(void/midnight/basalt darks · cyan `#5edce8` / blue `#087dcc` / magenta `#e85682` /
amber `#e9c960` · Space Grotesk / Plus Jakarta Sans / JetBrains Mono · 66ch measure).
The repo hero tableau (`img/hero.webp`, from the mcp-video README) was generated to
this system — stone blacks, cyan hairlines, amber waveforms, magenta markers — and is
the visual reference for every choice here. Local tokens: `css/tokens.css`.

> **Decision record / correction (2026-07-10):** v1 of this site was designed without
> consulting kyanite-system.css or the tableau — an invented "kyanite blue" palette and
> off-brand faces (Bricolage/Atkinson/IBM Plex). Simon rejected it. Rebuilt to the real
> system same day. Lesson recorded: interview step 0 is *find the existing system*,
> and the reference image in the repo README outranks any palette invented in-session.

## Decisions

| Dimension | Commitment |
|---|---|
| Aesthetic phrase | **Edit-suite over kyanite stone** — the brand's void/basalt field, precision cyan, one warm paper artifact |
| Personality poles | cool · serious · dense · refined |
| Signature move | **The Video Receipt** as a physical till-receipt (hero). The playhead timecode ruler is *ambient* — ≤3px, text-only, never competes. |
| Mode | **Dark-only**, deliberate (edit rooms; the brand system is dark-native). The receipt's paper is the light relief. |
| Color roles | Cyan = links/accents/hot lines. **Amber = trust/verified moments only.** **Magenta = pending-human/edit markers only.** Blue `#087dcc` = structural shapes/borders only — measured 4.5:1 as text, never copy. Mint `#52d3aa` (design-system success) = pass marks. |
| Type | Display: Space Grotesk 700. Body: Plus Jakarta Sans 400/700. Mono: JetBrains Mono 400/600. All self-hosted, brand faces. |
| Density & shape | Dense-leaning; 4/8px corners; flat; hairline rules (`--line-color`, the brand's line token). |
| Structure & rhythm | Asymmetric hero (text left, receipt right over the tableau); titled bands with hairline rules; **ledger rows, never card grids**; syncopation via the centered thesis band and the paper artifact breaking the dark field. |
| Imagery stance | (1) Baseline: type, the receipt, terminals, glyph marks. (2) **The brand tableau** is the one photographic asset — hero backdrop (void-faded under text) + og:image. (3) Technical diagrams permitted: one style, cyan/amber on basalt. (4) Icons when needed: **Lucide 1.5px** only. Never stock, never AI-gradient slop, never emoji-as-icons. |
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

One signature: the receipt gets the boldness budget (paper, torn edges, amber stamp).
The playhead stays ambient. The tableau backdrop must always fade to `--void` under
text — measured contrast outranks art visibility.
