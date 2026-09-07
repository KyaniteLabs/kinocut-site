import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publishedVersion = "1.15.1";
const publishedMcp = "196";
const publishedCli = "167";
const developmentMcp = "200";
const developmentCli = "171";

test("current public surfaces agree on published and development claims", () => {
  const index = readFileSync(join(root, "index.html"), "utf8");
  const llms = readFileSync(join(root, "llms.txt"), "utf8");
  const changelog = readFileSync(join(root, "changelog.html"), "utf8");
  const faq = readFileSync(join(root, "faq.html"), "utf8");
  const spanish = readFileSync(join(root, "es-content.html"), "utf8");

  assert.match(index, new RegExp(`softwareVersion": "${publishedVersion.replaceAll(".", "\\.")}"`));
  assert.match(index, /"dateModified": "2026-09-06"/);
  assert.match(index, new RegExp(`<strong>${publishedMcp}</strong>.*MCP tools published`, "s"));
  assert.match(index, new RegExp(`${publishedMcp} MCP tools / ${publishedCli} CLI`));
  assert.match(index, new RegExp(`Development tip: ${developmentMcp} MCP tools / ${developmentCli} CLI`));

  assert.match(llms, new RegExp(`Latest published release:\\*\\* ${publishedVersion.replaceAll(".", "\\.")} \\(2026-08-31\\)`));
  assert.doesNotMatch(llms, /1\.15\.1 \(2026-08-19\)/);
  assert.match(llms, new RegExp(`Published surface:\\*\\* ${publishedMcp} MCP tools / ${publishedCli} CLI commands`));
  assert.match(llms, new RegExp(`Development tip:\\*\\* ${developmentMcp} MCP tools / ${developmentCli} CLI commands`));
  assert.match(llms, /1\.6\.11 shim installs kinocut 1\.15\.0/);
  assert.doesNotMatch(llms, /1\.6\.11 shim installs kinocut 1\.15\.1/);
  assert.match(changelog, new RegExp(`${publishedMcp} MCP / ${publishedCli} CLI`));
  assert.match(changelog, /Published 1\.15\.0 added first-class Windows MCP/);
  assert.match(spanish, new RegExp(`${publishedMcp} herramientas MCP y ${publishedCli} comandos CLI`));
  assert.match(spanish, new RegExp(`punta de desarrollo.*${developmentMcp} MCP / ${developmentCli} CLI`, "s"));
  assert.match(index, /1\.15\.0: first-class Windows MCP/);
  assert.match(faq, /Published 1\.15\.0 added first-class Windows MCP/);

  for (const [name, body] of [["index.html", index], ["llms.txt", llms], ["changelog.html", changelog], ["es-content.html", spanish]]) {
    assert.doesNotMatch(body, /1\.8\.0|142 MCP|142 herramientas|121 CLI/, `${name} contains a stale current claim`);
  }

  for (const name of readdirSync(root).filter((candidate) => candidate.endsWith(".html"))) {
    const body = readFileSync(join(root, name), "utf8");
    if (body.includes("chip--trust")) {
      assert.match(body, new RegExp(`chip--trust">${publishedVersion.replaceAll(".", "\\.")} published`), `${name} has a stale release chip`);
    }
    assert.doesNotMatch(body, /1\.8\.0|142 MCP|142 herramientas|121 CLI/, `${name} contains a stale release claim`);
    assert.doesNotMatch(body, /--platform shorts|--count 3|161 herramientas MCP/, `${name} contains an obsolete public claim`);
  }

  assert.match(index, /kino<\/span> repurpose ep-42\.mp4 --platforms youtube-shorts tiktok instagram-reel/);
});

test("version bump helper preserves structured count markup", () => {
  const sandbox = mkdtempSync(join(tmpdir(), "kinocut-site-bump-"));
  try {
    mkdirSync(join(sandbox, "scripts"));
    cpSync(join(root, "scripts", "bump-published-version.sh"), join(sandbox, "scripts", "bump-published-version.sh"));
    writeFileSync(
      join(sandbox, "index.html"),
      "<strong>142</strong> 142 MCP tools 142 structured MCP tools 142 herramientas + 142 tools 1.8.0\n",
    );
    writeFileSync(join(sandbox, "llms.txt"), "142 MCP tools 1.8.0\n");
    execFileSync("bash", [join(sandbox, "scripts", "bump-published-version.sh"), "1.11.1", "161", "1.8.0", "142"]);

    const result = readFileSync(join(sandbox, "index.html"), "utf8");
    assert.match(result, /<strong>161<\/strong>/);
    assert.doesNotMatch(result, /<li><\/strong>/);
    assert.match(result, /161 MCP tools/);
    assert.match(result, /161 structured MCP tools/);
    assert.match(result, /161 herramientas/);
    assert.match(result, /\+ 161 tools/);
  } finally {
    rmSync(sandbox, { recursive: true, force: true });
  }
});

test("deployment documentation names the actual production host", () => {
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const agentRules = readFileSync(join(root, "AGENTS.md"), "utf8");

  for (const body of [readme, agentRules]) {
    assert.match(body, /Netlify/);
    assert.match(body, /npx netlify deploy --prod --dir \./);
    assert.doesNotMatch(body, /GitHub Pages serves|GitHub Pages → \*\*kinocut\.dev/);
  }
});
