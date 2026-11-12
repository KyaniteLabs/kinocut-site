# Kinocut site architecture

## Parts and flow

There is no frontend build step: HTML, CSS, browser scripts, media and discovery documents are committed directly. [wrangler.toml](wrangler.toml) declares Pages output `.` and project `kinocut-dev`; deployment authority is separate from source review.

```text
browser -> static HTML/CSS/assets -> language preference + scroll ruler
agent -> well-known/OpenAPI/llms.txt -> documentation links
Pages Function -> homepage Accept negotiation / discovery headers
               -> /mcp documentation RPC / /a2a/v1 link routing / /api/health
               -> context.next() for other static assets
```

[functions/[[path]].js](functions/%5B%5Bpath%5D%5D.js) implements the Cloudflare handler. It adds discovery Link headers, optionally converts homepage HTML to Markdown with regex transformations, and dispatches small JSON-RPC handlers. MCP returns links, not media capabilities. A2A uses keyword routing and random message IDs, not model inference or stored conversations. [netlify/edge-functions/agent-discovery.js](netlify/edge-functions/agent-discovery.js) is the legacy equivalent; tests currently exercise that implementation.

[js/site.js](js/site.js) stores `kinocut-lang` in localStorage, chooses language from URL/saved preference/browser, and updates page-scroll timecode. [js/agent-discovery-webmcp.js](js/agent-discovery-webmcp.js) conditionally registers two browser guide tools and aborts registration on pagehide. Static [well-known metadata](.well-known/) and [openapi.json](openapi.json) must stay consistent with runtime routing. `_headers` supplies deployment-specific static rules; Python's simple server does not emulate them or Pages Functions.

## Risky paths and visible failures

- **Mirror/deployment drift:** GitHub source, canonical Forgejo and production can differ. A merge or local page render is not a deployment receipt. Preserve Forgejo-first landing and owner-approved deployment.
- **Claim drift:** version/count strings are repeated across HTML, structured data, guides and cards. A baseline test currently fails expecting 1.16.0 against homepage 1.16.5; docs do not repair that or establish which package is published.
- **Function parity/protocol:** tests of legacy Netlify are not proof of Cloudflare routing, full MCP-client compatibility or production headers. Error JSON-RPC responses may use HTTP 200; inspect protocol payloads. Health is a static guide response, not editor readiness.
- **Content negotiation:** regex HTML stripping is a convenience representation, not a semantic DOM renderer; verify language, links, cache variation and output after HTML changes.
- **Browser assumptions:** the shared scroll script assumes `playheadFill`/`playheadTc` exist; absent markup can throw. Unsupported WebMCP silently registers nothing; its fetch path does not check HTTP status before returning text.
- **Privacy/scope:** language storage is browser-local, but source homepage also contains a Cloudflare Insights beacon. Do not extend the editing product's “no telemetry” claim to all website requests. The guide has no media-processing backend.

## Verification

`npm test` checks guide behavior/public claims; the inspected baseline returned eight passes and one failure. `scripts/verify-primary-surface.sh` passed its source markers, which is not visual acceptance. Render the actual pages and inspect live discovery separately. These documentation files change no handlers, deployment or data; rollback is reverting the docs commit after canonical-source reconciliation.
