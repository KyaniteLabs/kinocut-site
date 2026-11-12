# Foundation gaps and reconciliation

Baseline inspected: public GitHub master `2c24830`. No private canonical files
were accessed or copied. No deployment, settings or credentials changed.

## Executed and remediated

- Baseline `npm test`: 8 pass, 1 fail. Public-claim expectations still pinned
  1.16.0/203 despite committed 1.16.5/205 content. Updated explicit version,
  counts, date, shim and development-tip expectations to inspected source;
  retained stale-claim rejection, release chips, safety and markup checks.
  This checks agreement, not independent package publication evidence.
- Added inventory validation and negative tests for empty inventories, incorrect
  literal identity and unmatched globs. All inventory patterns match real paths.
- Final `npm test` on Node v22.23.4: 11 pass, 0 fail.
- `bash scripts/verify-primary-surface.sh`: PASS (local markers).
- `git diff --check`: PASS. No runtime implementation was changed.

## Outstanding, explicitly not waived

- Engineering/Platform: no tracked PR test workflow (`.github/` contains only
  FUNDING.yml); GitHub API reports one workflow, which is not proof of exact-head
  test CI. Add fail-closed npm tests and primary-surface gate via authorized
  workflows-capable publication. This task does not modify settings or bypass
  the known App workflows permission limitation. Security must inspect exact-head
  hosted checks; local success is not hosted CI success.
- Engineering: no rendered-browser E2E suite or hosted Pages runtime smoke proved.
  Existing handler tests exercise imported functions, not hosting headers/routing,
  visual layout, accessibility or browser language storage. Add browser tests and
  Pages preview integration under approved automation before adoption.
- Product/Security: homepage embeds Cloudflare analytics while some product copy
  mentions zero analytics. Review website-versus-product privacy scope; these
  documents distinguish it rather than asserting a website privacy guarantee.
- Platform: `README.md`/`AGENTS.md` identify private Forgejo canonical and GitHub
  public mirror, requiring Forgejo-first merge. Authorized canonical URL/base/head,
  visibility, parity and mirror CI receipts remain UNKNOWN. Requested on gate card
  t_0a3d68a5. Do not infer canonical parity from GitHub HEAD, reverse mirror
  direction, publish private architecture, or merge this proposal ahead of that
  reconciliation. Product approval routes to Security; builder never merges.
- Operator: source merge is not deployment. Live Pages project/domain/revision
  and changed-route checks require separate approval; none was attempted here.

Open PR #21 changes llms.txt. No edits to that file were made here; its merge may
require updating public-claim expectations. All-estate adoption stays ineligible
until root t_2210091a reconciles every surface and these gaps.
