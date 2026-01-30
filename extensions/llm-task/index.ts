import type { Rose Griffon BotPluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: Rose Griffon BotPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
