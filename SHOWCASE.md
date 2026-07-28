# Homepage showcase film

**Live:** https://kinocut.dev/#showcase  
**MP4:** https://kinocut.dev/img/showcase/kinocut-dev-showcase.mp4  
**Poster:** https://kinocut.dev/img/showcase/poster.jpg  
**Version on site:** **v16** (Simon approved 2026-07-28)

## What this is

Product film for the Kinocut homepage player — not a social short. Proves:

- Typed tools / agent video editing posture  
- Preflight stop on bad path  
- Media you can open + Video Receipt  
- Cut dogfooded with Kinocut + Hyperframes (end card: `EDITED WITH KINOCUT · kinocut.dev`)

## Asset contract (do not freestyle)

| Path | Role | Spec |
|------|------|------|
| `img/showcase/kinocut-dev-showcase.mp4` | Homepage `<video>` source | H.264 + AAC, 1280×720, `+faststart`, ~21s (v16) |
| `img/showcase/poster.jpg` | `poster` attribute | 1280×720 JPEG matching first readable frame |

HTML hook: `index.html` → `#showcase` → `#kinocut-showcase`.

## Encode recipe (when shipping a new cut)

From the approved master in content-os package `2026-07-27-kinocut-dev-showcase`:

```bash
PKG=…/content-library/packages/2026-07-27-kinocut-dev-showcase
MASTER=$PKG/assemble/kinocut-dev-showcase-i2v-master.mp4

ffmpeg -y -i "$MASTER" \
  -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p \
  -movflags +faststart \
  -c:a aac -b:a 160k -ar 48000 \
  $PKG/render/kinocut-dev-showcase-web.mp4

ffmpeg -y -ss 1.2 -i "$MASTER" -frames:v 1 -q:v 3 \
  $PKG/render/poster.jpg

cp $PKG/render/kinocut-dev-showcase-web.mp4 img/showcase/kinocut-dev-showcase.mp4
cp $PKG/render/poster.jpg img/showcase/poster.jpg
```

Then:

1. Update `index.html` figcaption duration/version if length changed.  
2. Update VideoObject `duration` / `uploadDate` in JSON-LD if needed.  
3. Commit → push Forgejo `origin` → push `github` → `npx netlify deploy --prod --dir .`  
4. Verify `curl -sI https://kinocut.dev/img/showcase/kinocut-dev-showcase.mp4` → 200.

Full production trail for v16 lives in the content-os package:

`kyanite-content-os/content-os/video-factory/content-library/packages/2026-07-27-kinocut-dev-showcase/SHIP_DOCUMENTATION_v16.md`

## Site optimizations applied for this film

- Accurate lede/caption (v16, not stale “glass Hybrid A / 23s”)  
- `id="showcase"` deep link + scroll margin  
- 16:9 `aspect-ratio` on video to prevent CLS  
- Poster preload (`rel=preload` as image)  
- Open Graph `og:video*` + schema.org `VideoObject`  
- Netlify long-cache headers for `/img/showcase/*` + correct `video/mp4` type  
- Fallback download link inside `<video>` for non-supporting browsers  

## Known next pass

Simon: VO needs another prosody/script pass. Visual cut is approved for live site. Ship VO as **v17** when ready; keep this file + package docs in sync.
