# Architecture — Kinocut site

Scope: public site source inspected at `2c24830`, not the Kinocut editing engine.
Read [PRODUCT.md](PRODUCT.md) for the visitor experience.

## Parts and owners

- Product owns root HTML copy, `llms.txt`, `docs/agent-api.md`, and public claims.
  `index.html` is the primary edit-bay surface; `es.html` and `es-content.html`
  provide Spanish surfaces. Engineering owns their rendering implementation.
- Engineering owns `css/` design tokens/styles, `js/site.js` language preference
  and scroll ruler, and `js/agent-discovery-webmcp.js` browser discovery.
- Engineering owns `functions/[[path]].js`: Cloudflare Pages request routing,
  Markdown negotiation, health, public-guide MCP and A2A responses.
  `.well-known/` and `openapi.json` advertise those public interfaces.
- Engineering owns `wrangler.toml`, `_headers`, `CNAME`, `netlify.toml`, and
  `netlify/edge-functions/agent-discovery.js` hosting configuration/legacy port.
  Deployment authorization belongs to the operator, not the website visitor.
- Engineering owns `tests/`, `scripts/`, and `qa/` verification and change maps.
  The exact ownership patterns are in `qa/architecture-paths.json`.

## One request end to end

A visitor requests `/`. The Pages Function calls `context.next()` for committed
`index.html`, adds discovery Link headers, and returns HTML. An Accept header
containing `text/markdown` instead selects `htmlToMarkdown()` and `Vary: Accept`.
The browser loads committed CSS/assets and `js/site.js`, which chooses language
from the URL, saved preference, or browser language and updates the scroll ruler.
An agent can follow discovery metadata to `/mcp`: JSON-RPC tool calls return
public guide links, not video edits. `/a2a/v1` routes text questions to those links.

## Trust and persistence boundaries

The guide is public and unauthenticated. User-supplied JSON/text crosses the
Function boundary; its responses must not acquire filesystem, shell, media,
upload, purchase or publishing powers. It has no application database or durable
server-side session writes. Browser `localStorage` stores `kinocut-lang`.
Committed assets persist through source/deployment; hosting logs are outside this
repository's implementation. `index.html` includes an external Cloudflare beacon:
product-local media privacy claims are not proof of website analytics privacy.

## Risk, failure and verification

Changing Function routing, Markdown conversion, discovery contracts or headers can
break content negotiation/agent clients. Copy/version changes can contradict
published artifacts; CSS/JS changes can break the primary surface or language
selection. `npm test` exercises source contracts and Function handlers; run
`bash scripts/verify-primary-surface.sh` for homepage markers. These checks are not
rendered-browser, hosted-runtime or deployment evidence. Known baseline test
failure and missing foundations are recorded in `qa/FOUNDATION-GAPS.md`.

`README.md` and `AGENTS.md` require private Forgejo-first source merges; GitHub is
a public collaboration mirror. Neither GitHub PR acceptance nor source parity
proves deployment to `kinocut.dev`. Platform must reconcile authorized canonical
revision/visibility before merge; operator-approved deployment and live checks
remain separate. No private canonical content was used for this document.
