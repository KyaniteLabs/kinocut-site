(function () {
  if (!navigator.modelContext || typeof navigator.modelContext.registerTool !== "function") return;

  const controller = new AbortController();
  const options = { signal: controller.signal };

  navigator.modelContext.registerTool({
    name: "read_kinocut_product_guide",
    description: "Read canonical public Kinocut facts, setup links, workflows, and safety boundaries.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    execute: async function () {
      const response = await fetch("/llms.txt");
      return { content: [{ type: "text", text: await response.text() }] };
    }
  }, options);

  navigator.modelContext.registerTool({
    name: "find_kinocut_workflow",
    description: "Route a stated video goal to public Kinocut documentation without reading files, editing media, or running commands.",
    inputSchema: {
      type: "object",
      properties: { goal: { type: "string", minLength: 1, maxLength: 500 } },
      required: ["goal"],
      additionalProperties: false
    },
    execute: function (input) {
      return { content: [{ type: "text", text: "Goal: " + input.goal + "\nReview https://kinocut.dev/integrations.html and https://kinocut.dev/tutorial.html. No file was read, command run, or media changed." }] };
    }
  }, options);

  addEventListener("pagehide", function () { controller.abort(); }, { once: true });
}());
