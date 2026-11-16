# Kinocut site

The bilingual public guide and product website for Kinocut at kinocut.dev. It helps creators and agent developers understand the editing toolkit, install it, choose a workflow, and inspect its safety/provenance story. **This repository is not the video editor:** the package, CLI, media operations and releases belong to [KyaniteLabs/kinocut](https://github.com/KyaniteLabs/kinocut).

## Core experience and existing surfaces

- The [homepage](index.html) presents an edit-bay-style product overview, English/Spanish language switching, installation links, a bundled showcase video, guardrail/receipt explanations and workflow examples.
- Static install, tutorial, integration, prompt, receipt, comparison, FAQ, contribution and other reference pages support evaluation and setup. Example terminal sessions on these pages are content, not an executing editor.
- Agent discovery includes `llms.txt`, OpenAPI, well-known cards/catalog and four downloadable agent skills. The optional Pages Function provides documentation-only MCP tools (`read_product_guide`, `find_workflow`) and A2A link routing. Browser WebMCP registration is conditional on browser support.
- Assets include fonts, design tokens, brand images and the showcase MP4/poster. There is no user/media database or reference dataset here; machine-readable files describe the guide and external product.

## Authority and limits

[README.md](README.md) and [AGENTS.md](AGENTS.md) designate private Forgejo as canonical site source, GitHub as a collaboration mirror, and Cloudflare Pages as a separately deployed production surface. A GitHub documentation PR is not a canonical merge or deployment; reconcile through the site owner before landing. Legacy Netlify configuration is retained, not evidence of the active host.

The public guide cannot read local files, render/edit/upload media, execute commands, purchase, or publish. Its health response does not certify the Kinocut package. Version/tool-count claims must be checked against published artifacts; source currently has a baseline public-claims test mismatch (test expects 1.16.0, homepage metadata says 1.16.5). Do not infer product readiness from a polished page or a marker gate.
