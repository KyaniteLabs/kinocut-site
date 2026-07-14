#!/usr/bin/env bash
# Bump hardcoded published version (and optional MCP tool count) on kinocut.dev pages.
# Does not invent release notes. Run only when the package is actually shipping.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NEW_VER="${1:?usage: $0 <version> [mcp_tool_count] [old_version] [old_mcp_count]}"
NEW_MCP="${2:-}"
OLD_VER="${3:-1.8.0}"
OLD_MCP="${4:-142}"

cd "$ROOT"
echo "Bumping site published version $OLD_VER → $NEW_VER"

# Chip stamps and common version pins in HTML/txt
find . -maxdepth 2 \( -name '*.html' -o -name 'llms.txt' -o -name 'DESIGN-SYSTEM.md' \) -print0 \
  | xargs -0 perl -pi -e "s/\Q$OLD_VER\E/$NEW_VER/g"

# Bay brand sub on homepage if present
if [[ -f index.html ]]; then
  perl -pi -e "s/edit bay · \Q$OLD_VER\E/edit bay · $NEW_VER/g" index.html
fi

if [[ -n "$NEW_MCP" ]]; then
  echo "Bumping MCP tool display count $OLD_MCP → $NEW_MCP (careful: may hit historical copy)"
  # Prefer structured spots first
  perl -pi -e "s/(<strong>)\Q$OLD_MCP\E(<\/strong>)/\$1$NEW_MCP\$2/g" index.html 2>/dev/null || true
  perl -pi -e "s/\Q$OLD_MCP\E MCP tools/$NEW_MCP MCP tools/g" index.html llms.txt 2>/dev/null || true
  perl -pi -e "s/\Q$OLD_MCP\E structured MCP tools/$NEW_MCP structured MCP tools/g" index.html 2>/dev/null || true
  perl -pi -e "s/\Q$OLD_MCP\E herramientas/$NEW_MCP herramientas/g" index.html 2>/dev/null || true
  perl -pi -e "s/\+ \Q$OLD_MCP\E tools/+ $NEW_MCP tools/g" index.html 2>/dev/null || true
fi

echo
echo "Review git diff carefully (historical rename FAQ may need manual restore)."
echo "Then: git diff | head; ./scripts/verify-primary-surface.sh"
echo "Rewrite roadmap copy that still says 'building toward next' if this IS the release."
