# kinocut-site — agent rules

## Primary surface is the homepage

**Canonical product surface:** `index.html` + `css/site.css` + `css/tokens.css` at
https://kinocut.dev/

Doc pages (`install.html`, `receipt.html`, `css/pages.css`, …) are secondary.

### Design interview → redesign

When a Kinocut design-system interview is **approved** and the task is to implement
the redesign:

1. **Change the primary surface first** (homepage structure + `site.css` / tokens).
2. Doc-shell polish alone is **not** a redesign.
3. Do **not** claim “redesign shipped / looks different / design system applied”
   until the primary-surface gate passes.

### Primary-surface gate (required evidence)

Before claiming redesign done, merged, or live, run:

```bash
./scripts/verify-primary-surface.sh
# optional: ./scripts/verify-primary-surface.sh https://kinocut.dev/
```

The script must exit 0. It checks for edit-bay markers on the homepage
(local file and/or live URL): `bay-top`, `gate-strip`, `receipt-monitor`, and
that `css/site.css` describes the agent edit bay (not doc-shell-only work).

If markers are missing, the redesign is **not done** — keep working the homepage.

### Dual remotes

- **GitHub** `KyaniteLabs/kinocut-site` → GitHub Pages → **kinocut.dev** (what users see)
- **Forgejo** `KyaniteLabs/kinocut-site` → canonical product mirror; keep in sync

Ship homepage visual changes to GitHub master for live deploy; mirror to Forgejo.

### Product design authority

Kinocut-only interview (product repo): `docs/DESIGN-SYSTEM-INTERVIEW-KINOCUT.md`  
Site contract: `DESIGN-SYSTEM.md`  
This is a **product edit-bay** surface, not the KyaniteLabs org homepage.
