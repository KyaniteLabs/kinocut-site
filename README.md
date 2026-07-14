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

## Deploy

GitHub Pages serves `master` from `/` with custom domain `kinocut.dev`.

```bash
# after merge to master, Pages rebuilds automatically (legacy branch source)
git push origin master
```

## Local check

```bash
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## Related

- Product source: https://github.com/KyaniteLabs/kinocut
- Registry: `io.github.KyaniteLabs/kinocut`
