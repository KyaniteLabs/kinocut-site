# kinocut.dev

Product site for Kinocut (formerly mcp-video). Static, self-contained, bilingual EN/ES.

## Try it

```bash
# after the source change is merged to canonical Forgejo and deployment is approved
git push github master
npx netlify deploy --prod --dir .
./scripts/verify-primary-surface.sh https://kinocut.dev/
```

## Docs

- [`SHOWCASE.md`](SHOWCASE.md)
