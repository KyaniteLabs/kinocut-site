# kinocut.dev

Product site for **Kinocut** (formerly mcp-video). Static, self-contained, bilingual EN/ES.

## SEO / AI GEO surfaces

| File | Role |
| --- | --- |
| `index.html` | Canonical page: meta, OG/Twitter, hreflang, JSON-LD (`SoftwareApplication` + `FAQPage`), FAQ, entity definition |
| `llms.txt` | Machine-readable product brief for AI crawlers and answer engines |
| `robots.txt` | Explicit allow for search + common AI bots; sitemap pointer |
| `sitemap.xml` | Homepage + llms.txt + Spanish entry |
| `es.html` | Spanish landing that sets lang and redirects to `/?lang=es` |
| `CNAME` | `kinocut.dev` on GitHub Pages |

## Homepage showcase film

- Live player: https://kinocut.dev/#showcase  
- Assets: `img/showcase/kinocut-dev-showcase.mp4` + `img/showcase/poster.jpg`  
- Operator notes: [`SHOWCASE.md`](SHOWCASE.md)  
- Current ship: **v16** product film (approved 2026-07-28)

## Deploy

Netlify site `kinocut-dev` serves `kinocut.dev` from the repository root using
`netlify.toml`, including the public agent-discovery edge function. Forgejo
`origin` is canonical; GitHub is the public collaboration mirror.

```bash
# after the source change is merged to canonical Forgejo and deployment is approved
git push github master
npx netlify deploy --prod --dir .
./scripts/verify-primary-surface.sh https://kinocut.dev/
```

A successful GitHub Pages build is not proof that `kinocut.dev` changed. Verify
the Netlify production deploy and then inspect the live version/count claims.

## Local check

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## Related

- Product source: https://github.com/KyaniteLabs/kinocut
- Registry: `io.github.KyaniteLabs/kinocut`
