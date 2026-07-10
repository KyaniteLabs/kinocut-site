# Kinocut — Design System (kinocut.dev)

**Committed direction in one line:** "Edit-suite editorial — a dark blue-black edit
room, kyanite blue precision, one warm paper receipt as the single physical object;
dense, serious, cool; Bricolage Grotesque display over Atkinson Hyperlegible; the
signature is the Video Receipt."

Confirmed with Simon 2026-07-10 (design-system interview; draft direction kept on all
four open dimensions).

## Decisions

| Dimension | Commitment |
|---|---|
| Aesthetic phrase | **Edit-suite editorial** (not brutalist-terminal, not Criterion-warm) |
| Personality poles | cool · serious · dense · refined · classic-leaning |
| Signature move | **The Video Receipt** as a physical till-receipt artifact (hero). The playhead timecode ruler is *ambient* detail — quiet, no fanfare, never grows. |
| Mode | **Dark-only**, deliberate (video tools live in dark rooms). The receipt's paper is the light relief. No light theme; revisit only with a real user signal. |
| Color anchor | Kyanite blue (`--kyanite-*`). Tungsten amber is **reserved exclusively** for receipt/verified/pending-human moments — amber outside a trust moment is a defect. |
| Type | Display: Bricolage Grotesque 800. Body: Atkinson Hyperlegible (legibility-first — accessibility is brand). Mono: IBM Plex Mono (receipts, terminals, code). All self-hosted. |
| Density & shape | Dense-leaning; corners 4px (`--radius-1`) / 8px (`--radius-2`) max; flat, borders over shadows (`--rule`). |
| Structure & rhythm | Asymmetric hero (text left, artifact right); sections as titled bands separated by 1px rules; **ledger rows, never card grids**; syncopation via the centered thesis band and the paper receipt breaking the dark field. |
| Imagery stance | (1) Baseline: **no incidental imagery** — type, the receipt, terminal transcripts, and glyph marks (✓/◉) are the imagery. (2) **Technical diagrams permitted**: one hand-of-the-engineer style, kyanite/amber palette only, documented per diagram. (3) Icon set, when glyphs stop sufficing: **Lucide at 1.5px stroke** — the only permitted set. (4) **The brand tableau** (repo hero art: stone edit-room with blue/amber timelines, `img/hero.webp`) is the one photographic-style asset — hero backdrop (ink-faded under text) + og:image; Simon-directed 2026-07-10. Never stock photos, never AI-gradient slop illustration, never emoji-as-icons. Real product video is the only future media. |
| Motion | Restrained: skip-link slide, scroll-linked playhead (position, not animation). `prefers-reduced-motion` collapses everything. No scroll-triggered reveals. |
| Language | Bilingual EN/ES as peers — native copy both sides, never translated-sounding ES. Toggle + `/es.html`. |

## Refusals (what this site never does)

- No Inter/Roboto; no purple/indigo gradients; no pill CTAs; no glassmorphism.
- No centered-hero-plus-three-cards skeleton; pillars are **ledger rows**.
- No stock photography, no AI-slop illustration, no mixed icon styles.
- No amber outside trust moments; no pure black (`#000`); no dead grays (neutrals tint toward kyanite).
- No autoplay media, no scroll-jacking, no cookie banner (nothing phones home — the site honors the product's claim).
- No light theme retrofit by accident: dark-only is a decision, not a gap.

## Tokens

Single source of truth: `css/tokens.css` (primitive + semantic in one file at this
site's scale). Contrast floor: 4.5:1 body text, measured in the tastecheck gate.
Type scale, spacing (4px base), radii, motion durations all live there — no raw
values in `site.css`.

## Signature discipline

One signature. The receipt gets the boldness budget: paper, torn edges, the stamp,
amber. Everything else stays quiet so it can speak. The playhead ruler must remain
≤3px tall and text-only — if it ever competes with the receipt, it loses.
