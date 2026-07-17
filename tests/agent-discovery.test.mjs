import assert from "node:assert/strict";
import test from "node:test";

import handler, { htmlToMarkdown } from "../netlify/edge-functions/agent-discovery.js";

const htmlContext = {
  next: async () => new Response("<!doctype html><html><body><h1>Kinocut</h1><p>Local-first video editing.</p></body></html>", { headers: { "Content-Type": "text/html; charset=utf-8" } })
};

test("homepage adds discovery Link headers", async () => {
  const response = await handler(new Request("https://kinocut.dev/"), htmlContext);
  assert.match(response.headers.get("Link"), /agent-card\.json/);
  assert.match(response.headers.get("Link"), /rel="api-catalog"/);
});

test("homepage negotiates Markdown", async () => {
  const response = await handler(new Request("https://kinocut.dev/", { headers: { Accept: "text/markdown" } }), htmlContext);
  assert.equal(response.headers.get("Content-Type"), "text/markdown; charset=utf-8");
  assert.match(await response.text(), /# Kinocut/);
  assert.equal(htmlToMarkdown("<h2>Guide</h2>"), "## Guide\n");
});

test("MCP completes initialize, list, and a safe tool call", async () => {
  for (const [id, method, params] of [
    [1, "initialize", undefined],
    [2, "tools/list", undefined],
    [3, "tools/call", { name: "find_workflow", arguments: { goal: "caption a clip" } }]
  ]) {
    const response = await handler(new Request("https://kinocut.dev/mcp", { method: "POST", body: JSON.stringify({ jsonrpc: "2.0", id, method, params }) }), {});
    const body = await response.json();
    assert.equal(body.id, id);
    assert.ok(body.result);
  }
});

test("A2A routes a question without claiming media access", async () => {
  const response = await handler(new Request("https://kinocut.dev/a2a/v1", {
    method: "POST",
    body: JSON.stringify({ jsonrpc: "2.0", id: 4, method: "SendMessage", params: { message: { messageId: "m1", role: "ROLE_USER", parts: [{ text: "How do I install it?" }] } } })
  }), {});
  const body = await response.json();
  assert.match(body.result.message.parts[0].text, /cannot read local files/);
  assert.match(body.result.message.parts[0].text, /install\.html/);
});
