# kinocut.dev

Product site for Kinocut (formerly mcp-video). Static, self-contained, bilingual EN/ES.

## Deploy checklist (at rename cutover, issue #53 / #86)
- [ ] Verify tool count on the page vs `test_public_surface.py` (currently says 124)
- [ ] Point footer GitHub link at the renamed repo (auto-redirect covers it either way)
- [ ] Update MCP Registry link if the server id changes from io.github.KyaniteLabs/mcp-video
- [ ] Add real `llms.txt` (linked in footer)
- [ ] Point kinocut.dev DNS at the host; serve this directory

## Structure
- `index.html` — single page, EN/ES via `data-lang` (toggle, `?lang=es`, or `/es.html`)
- `css/tokens.css` — all design tokens (single source of truth)
- `css/site.css` — layout/components
- `js/site.js` — language toggle + playhead timecode ruler
- `fonts/` — self-hosted woff2 (Bricolage Grotesque, Atkinson Hyperlegible, IBM Plex Mono)

Local preview: `python3 -m http.server 8613` here.
Note: headless Chrome clamps windows to 500px min width — verify true mobile via
devtools device mode or an iframe, not `--window-size=390`.
