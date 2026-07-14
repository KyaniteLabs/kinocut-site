#!/usr/bin/env bash
# Primary-surface gate for kinocut.dev redesign claims.
# Exit 0 only when the homepage (not only doc shells) carries edit-bay markers.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIVE_URL="${1:-}"
FAIL=0

need() {
  local label="$1" haystack="$2" pat="$3"
  if ! printf '%s' "$haystack" | grep -Eq "$pat"; then
    echo "FAIL: $label missing /$pat/"
    FAIL=1
  else
    echo "OK:   $label matches /$pat/"
  fi
}

echo "== local primary surface ($ROOT) =="
INDEX="$ROOT/index.html"
SITE_CSS="$ROOT/css/site.css"
TOKENS="$ROOT/css/tokens.css"

if [[ ! -f "$INDEX" || ! -f "$SITE_CSS" ]]; then
  echo "FAIL: index.html or css/site.css missing"
  exit 2
fi

INDEX_HTML="$(cat "$INDEX")"
SITE_CSS_BODY="$(cat "$SITE_CSS")"

need "index.html bay chrome" "$INDEX_HTML" 'bay-top'
need "index.html gate strip" "$INDEX_HTML" 'gate-strip'
need "index.html receipt monitor" "$INDEX_HTML" 'receipt-monitor'
need "site.css edit-bay identity" "$SITE_CSS_BODY" 'agent edit bay|edit bay|BAY TOP|receipt-monitor'
need "tokens not org-homepage-only" "$(cat "$TOKENS")" 'Kinocut product|edit bay|NLE|inspector'

# Doc-shell-only trap: pages.css must not be the only design work when claiming redesign.
# If index still lacks bay markers we already failed; extra note:
if ! printf '%s' "$INDEX_HTML" | grep -Eq 'bay-top'; then
  echo "HINT: css/pages.css doc-shell work does not count as homepage redesign."
fi

if [[ -n "$LIVE_URL" ]]; then
  echo "== live primary surface ($LIVE_URL) =="
  LIVE_HTML="$(curl -fsSL --max-time 25 "$LIVE_URL")"
  need "live bay-top" "$LIVE_HTML" 'bay-top'
  need "live gate-strip" "$LIVE_HTML" 'gate-strip'
  need "live receipt-monitor" "$LIVE_HTML" 'receipt-monitor'
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo
  echo "PRIMARY SURFACE GATE FAILED."
  echo "Do not claim redesign shipped. Change index.html + css/site.css first."
  exit 1
fi

echo
echo "PRIMARY SURFACE GATE PASSED."
exit 0
