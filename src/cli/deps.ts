import { logWebSelfId, sendMessageWhatsApp } from "../channels/web/index.js";
import { sendMessageDiscord } from "../discord/send.js";
import type { OutboundSendDeps } from "../infra/outbound/deliver.js";

export type CliDeps = {
  sendMessageWhatsApp: typeof sendMessageWhatsApp;
  sendMessageDiscord: typeof sendMessageDiscord;
};

export function createDefaultDeps(): CliDeps {
  return {
    sendMessageWhatsApp,
    sendMessageDiscord,
  };
}

// Provider docking: extend this mapping when adding new outbound send deps.
export function createOutboundSendDeps(deps: CliDeps): OutboundSendDeps {
  return {
    sendWhatsApp: deps.sendMessageWhatsApp,
    sendDiscord: deps.sendMessageDiscord,
  };
}

export { logWebSelfId };
