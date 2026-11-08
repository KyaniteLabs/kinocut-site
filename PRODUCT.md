# Product — Kinocut site

This repository is the public documentation and product-discovery website for
Kinocut, not its Python package, CLI, editor, or local media-processing server.
Those implementations and releases belong to `KyaniteLabs/kinocut` (see
`README.md`). The site helps creators and agent operators understand the product,
find installation instructions, and inspect workflow/safety documentation.

## Core experience and existing surfaces

Visitors start at the bilingual edit-bay homepage (`index.html`, `css/site.css`,
`css/tokens.css`), inspect the showcase (`img/showcase/`), and follow `install.html`,
`tutorial.html`, `integrations.html`, `prompts.html`, `receipt.html`, and `faq.html`.
`js/site.js` provides language selection, saved locally, and a scroll ruler;
`es.html` and `es-content.html` are additional Spanish content surfaces.
`compare.html`, `bench.html`, and `failures.html` contain product-facing comparison,
benchmark, and failure material; their presence does not independently validate
performance claims. `changelog.html` records site release descriptions.

Agents can discover guide links through `llms.txt`, `.well-known/`, and
`openapi.json`. The Pages Function (`functions/[[path]].js`) serves health,
homepage Markdown, a two-tool public-guide MCP interface (`read_product_guide`,
`find_workflow`), and text-question A2A routing. These are documentation helpers:
they do not edit video, access local files, execute commands or publish media.
The browser discovery integration lives in `js/agent-discovery-webmcp.js`.

## Evidence and limits

Committed HTML, images, fonts and showcase media are the site's content/assets;
this repository is not an evaluation/reference dataset distribution. `LICENSE`
and `img/brand/CHAKRA-PETCH-OFL.txt` carry licensing material; do not infer rights
for arbitrary visitor media. Website source includes a Cloudflare beacon, so the
editing product's local-media claims must not be read as a blanket website
no-analytics guarantee.

Published versus development/human-gated product descriptions appear in the
homepage roadmap. They are descriptions, not proof that this website implements
those editing features. Source tests do not verify the product release itself.
See `qa/FOUNDATION-GAPS.md` for verification limits. Private Forgejo is canonical,
GitHub is a public collaboration mirror, and Cloudflare Pages deployment is a
separate authorized operator action (`README.md`, `AGENTS.md`, `wrangler.toml`).
This document describes inspected public source, not a newly verified live deploy.
