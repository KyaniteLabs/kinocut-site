import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../scripts/verify-primary-surface.sh", import.meta.url));

test("primary-surface gate consumes large input and rejects missing markers", () => {
  const root = mkdtempSync(join(tmpdir(), "kinocut-surface-"));
  try {
    mkdirSync(join(root, "scripts"));
    mkdirSync(join(root, "css"));
    copyFileSync(script, join(root, "scripts/verify-primary-surface.sh"));
    writeFileSync(join(root, "css/site.css"), "agent edit bay");
    writeFileSync(join(root, "css/tokens.css"), "Kinocut product");
    const padding = "x".repeat(2_000_000);
    const run = () => spawnSync("bash", [join(root, "scripts/verify-primary-surface.sh")], { encoding: "utf8" });
    writeFileSync(join(root, "index.html"), `bay-top gate-strip receipt-monitor\n${padding}`);
    for (let attempt = 0; attempt < 3; attempt++) {
      const result = run();
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    writeFileSync(join(root, "index.html"), `bay-top gate-strip\n${padding}`);
    const result = run();
    assert.equal(result.status, 1);
    assert.match(result.stdout, /receipt monitor missing/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
