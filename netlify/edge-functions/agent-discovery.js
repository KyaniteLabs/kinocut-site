const BASE_URL = "https://kinocut.dev";

const DISCOVERY_LINKS = [
  '</.well-known/agent-card.json>; rel="service-desc"; type="application/json"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</llms.txt>; rel="service-doc"; type="text/plain"'
];

const MCP_TOOLS = [
  {
    name: "read_product_guide",
    description: "Return canonical public Kinocut product, setup, workflow, and safety resources.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false }
  },
  {
    name: "find_workflow",
    description: "Route a stated video goal to public Kinocut documentation without touching media or running commands.",
    inputSchema: {
      type: "object",
      properties: { goal: { type: "string", minLength: 1, maxLength: 500 } },
      required: ["goal"],
      additionalProperties: false
    }
  }
];

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers }
  });
}

function rpcResult(id, result) {
  return json({ jsonrpc: "2.0", id, result });
}

function rpcError(id, code, message, status = 200) {
  return json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } }, status);
}

export function htmlToMarkdown(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<h1\b[^>]*>/gi, "\n# ").replace(/<\/h1>/gi, "\n")
    .replace(/<h2\b[^>]*>/gi, "\n## ").replace(/<\/h2>/gi, "\n")
    .replace(/<h3\b[^>]*>/gi, "\n### ").replace(/<\/h3>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n- ").replace(/<\/(li|p|section|article)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim() + "\n";
}

function withDiscoveryHeaders(response) {
  const headers = new Headers(response.headers);
  const existing = headers.get("Link");
  const discovery = DISCOVERY_LINKS.join(", ");
  headers.set("Link", existing ? `${existing}, ${discovery}` : discovery);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function homepage(request, context) {
  const response = await context.next();
  if (!(response.headers.get("Content-Type") || "").includes("text/html")) return response;
  if (!(request.headers.get("Accept") || "").toLowerCase().includes("text/markdown")) {
    return withDiscoveryHeaders(response);
  }
  const markdown = htmlToMarkdown(await response.text());
  const headers = new Headers(response.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept");
  headers.set("x-markdown-tokens", String(Math.max(1, Math.round(markdown.split(/\s+/).length * 1.3))));
  return withDiscoveryHeaders(new Response(request.method === "HEAD" ? null : markdown, { status: response.status, headers }));
}

async function parseRpc(request) {
  try {
    const payload = await request.json();
    if (!payload || payload.jsonrpc !== "2.0" || !("id" in payload) || !payload.method) {
      return { error: rpcError(payload?.id, -32600, "Invalid Request", 400) };
    }
    return { payload };
  } catch {
    return { error: rpcError(null, -32700, "Parse error", 400) };
  }
}

async function handleMcp(request) {
  if (request.method === "GET") return json({ name: "Kinocut Public Guide", transport: "streamable-http", protocolVersion: "2025-06-18" });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "GET, POST" });
  const { payload, error } = await parseRpc(request);
  if (error) return error;
  if (payload.method === "initialize") return rpcResult(payload.id, { protocolVersion: "2025-06-18", capabilities: { tools: { listChanged: false } }, serverInfo: { name: "Kinocut Public Guide", version: "1.0.0" }, instructions: "Public documentation routing only. No files, commands, media edits, uploads, or publication." });
  if (payload.method === "ping") return rpcResult(payload.id, {});
  if (payload.method === "tools/list") return rpcResult(payload.id, { tools: MCP_TOOLS });
  if (payload.method === "tools/call") {
    const args = payload.params?.arguments || {};
    if (payload.params?.name === "read_product_guide") return rpcResult(payload.id, { content: [{ type: "text", text: `Product guide: ${BASE_URL}/llms.txt\nInstall: ${BASE_URL}/install.html\nWorkflows: ${BASE_URL}/integrations.html\nReceipts: ${BASE_URL}/receipt.html` }], isError: false });
    if (payload.params?.name === "find_workflow" && typeof args.goal === "string" && args.goal.trim()) return rpcResult(payload.id, { content: [{ type: "text", text: `Goal: ${args.goal.slice(0, 500)}\nReview ${BASE_URL}/integrations.html and ${BASE_URL}/tutorial.html. No file was read, command run, or media changed.` }], isError: false });
    return rpcError(payload.id, -32602, "Invalid tool name or arguments", 400);
  }
  return rpcError(payload.id, -32601, "Method not found");
}

function routeQuestion(text) {
  const boundary = "This public guide cannot read local files, edit or upload media, run commands, publish, or purchase. Human review remains required before publication.";
  if (/install|setup|claude|cursor|mcp/i.test(text)) return `${boundary} Start at ${BASE_URL}/install.html and ${BASE_URL}/integrations.html.`;
  if (/receipt|provenance|review|safe|guard/i.test(text)) return `${boundary} Read ${BASE_URL}/receipt.html and ${BASE_URL}/llms.txt.`;
  return `${boundary} Review ${BASE_URL}/tutorial.html, ${BASE_URL}/integrations.html, and ${BASE_URL}/faq.html.`;
}

async function handleA2A(request) {
  if (request.method !== "POST") return json({ error: "Method not allowed. Use JSON-RPC POST." }, 405, { Allow: "POST" });
  const { payload, error } = await parseRpc(request);
  if (error) return error;
  if (payload.method !== "SendMessage" && payload.method !== "message/send") return rpcError(payload.id, -32601, "Method not found");
  const message = payload.params?.message;
  const text = message?.parts?.map((part) => part?.text || "").filter(Boolean).join(" ");
  if (!text) return rpcError(payload.id, -32602, "Invalid params: message.parts text is required");
  return rpcResult(payload.id, {
    message: {
      messageId: crypto.randomUUID(),
      contextId: message.contextId || crypto.randomUUID(),
      role: "ROLE_AGENT",
      parts: [{ text: routeQuestion(text), mediaType: "text/plain" }]
    }
  });
}

export default async function agentDiscovery(request, context) {
  const { pathname } = new URL(request.url);
  if (pathname === "/" || pathname === "/index.html") return homepage(request, context);
  if (pathname === "/api/health") return json({ ok: true, service: "kinocut-public-guide", version: "1.0.0" });
  if (pathname === "/mcp") return handleMcp(request);
  if (pathname === "/a2a/v1") return handleA2A(request);
  const response = await context.next();
  if (pathname === "/.well-known/api-catalog") {
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/linkset+json; charset=utf-8");
    return new Response(response.body, { status: response.status, headers });
  }
  return response;
}
