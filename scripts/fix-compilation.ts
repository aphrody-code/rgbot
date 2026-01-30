

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src');

function fixFile(filePath: string, replacements: { pattern: RegExp | string, replacement: string }[]) {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let originalContent = content;

  for (const { pattern, replacement } of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`No changes needed for: ${filePath}`);
  }
}

// Fix: src/plugin-sdk/index.ts
fixFile('plugin-sdk/index.ts', [
  { pattern: /export \* from "..\/imessage\/accounts.js";/g, replacement: '// export * from "../imessage/accounts.js";' },
  { pattern: /export \{ imessageOnboardingAdapter \} from "..\/channels\/plugins\/onboarding\/imessage.js";/g, replacement: '// export { imessageOnboardingAdapter } from "../channels/plugins/onboarding/imessage.js";' },
  { pattern: /export \* from "..\/slack\/accounts.js";/g, replacement: '// export * from "../slack/accounts.js";' },
  { pattern: /export \{ slackOnboardingAdapter \} from "..\/channels\/plugins\/onboarding\/slack.js";/g, replacement: '// export { slackOnboardingAdapter } from "../channels/plugins/onboarding/slack.js";' },
  { pattern: /export \{ buildSlackThreadingToolContext \} from "..\/slack\/threading-tool-context.js";/g, replacement: '// export { buildSlackThreadingToolContext } from "../slack/threading-tool-context.js";' },
  { pattern: /export \* from "..\/telegram\/accounts.js";/g, replacement: '// export * from "../telegram/accounts.js";' },
  { pattern: /export \{ telegramOnboardingAdapter \} from "..\/channels\/plugins\/onboarding\/telegram.js";/g, replacement: '// export { telegramOnboardingAdapter } from "../channels/plugins/onboarding/telegram.js";' },
  { pattern: /export \* from "..\/signal\/accounts.js";/g, replacement: '// export * from "../signal/accounts.js";' },
  { pattern: /export \{ signalOnboardingAdapter \} from "..\/channels\/plugins\/onboarding\/signal.js";/g, replacement: '// export { signalOnboardingAdapter } from "../channels/plugins/onboarding/signal.js";' },
  { pattern: /export \{ isWhatsAppGroupJid, normalizeWhatsAppTarget \} from "..\/whatsapp\/normalize.js";/g, replacement: '// export { isWhatsAppGroupJid, normalizeWhatsAppTarget } from "../whatsapp/normalize.js";' },
  { pattern: /export \{ whatsappOnboardingAdapter \} from "..\/channels\/plugins\/onboarding\/whatsapp.js";/g, replacement: '// export { whatsappOnboardingAdapter } from "../channels/plugins/onboarding/whatsapp.js";' },
  { pattern: /export \* from "..\/line\/accounts.js";/g, replacement: '// export * from "../line/accounts.js";' },
  { pattern: /export \{ LineConfigSchema \} from "..\/line\/config-schema.js";/g, replacement: '// export { LineConfigSchema } from "../line/config-schema.js";' },
  { pattern: /export \* from "..\/line\/types.js";/g, replacement: '// export * from "../line/types.js";' },
  { pattern: /export \* from "..\/line\/flex-templates.js";/g, replacement: '// export * from "../line/flex-templates.js";' },
  { pattern: /export \* from "..\/line\/markdown-to-line.js";/g, replacement: '// export * from "../line/markdown-to-line.js";' },
  { pattern: /export type \{ ProcessedLineMessage \} from "..\/line\/markdown-to-line.js";/g, replacement: '// export type { ProcessedLineMessage } from "../line/markdown-to-line.js";' },
]);

// Fix: src/plugins/runtime/index.ts
fixFile('plugins/runtime/index.ts', [
    { pattern: /import \{ handleSlackAction \} from "..\/..\/agents\/tools\/slack-actions.js";/g, replacement: '// import { handleSlackAction } from "../../agents/tools/slack-actions.js";' },
    { pattern: /import \{ handleWhatsAppAction \} from "..\/..\/agents\/tools\/whatsapp-actions.js";/g, replacement: '// import { handleWhatsAppAction } from "../../agents/tools/whatsapp-actions.js";' },
    { pattern: /export \* from "..\/..\/slack\/directory-live.js";/g, replacement: '// export * from "../../slack/directory-live.js";' },
    { pattern: /export \* from "..\/..\/telegram\/audit.js";/g, replacement: '// export * from "../../telegram/audit.js";' },
    { pattern: /export \* from "..\/..\/line\/accounts.js";/g, replacement: '// export * from "../../line/accounts.js";' },
    { pattern: /export \* from "..\/..\/line\/send.js";/g, replacement: '// export * from "../../line/send.js";' },
    // Remove shorthand properties in return object
    { pattern: /probeSlack,/g, replacement: '// probeSlack,' },
    { pattern: /resolveChannelAllowlist: resolveSlackChannelAllowlist,/g, replacement: '// resolveChannelAllowlist: resolveSlackChannelAllowlist,' },
    { pattern: /resolveUserAllowlist: resolveSlackUserAllowlist,/g, replacement: '// resolveUserAllowlist: resolveSlackUserAllowlist,' },
    { pattern: /sendMessageSlack,/g, replacement: '// sendMessageSlack,' },
    { pattern: /monitorSlackProvider,/g, replacement: '// monitorSlackProvider,' },
    { pattern: /probeTelegram,/g, replacement: '// probeTelegram,' },
    { pattern: /resolveTelegramToken,/g, replacement: '// resolveTelegramToken,' },
    { pattern: /sendMessageTelegram,/g, replacement: '// sendMessageTelegram,' },
    { pattern: /monitorTelegramProvider,/g, replacement: '// monitorTelegramProvider,' },
    { pattern: /messageActions: telegramMessageActions,/g, replacement: '// messageActions: telegramMessageActions,' },
    { pattern: /probeSignal,/g, replacement: '// probeSignal,' },
    { pattern: /sendMessageSignal,/g, replacement: '// sendMessageSignal,' },
    { pattern: /monitorSignalProvider,/g, replacement: '// monitorSignalProvider,' },
    { pattern: /messageActions: signalMessageActions,/g, replacement: '// messageActions: signalMessageActions,' },
    { pattern: /monitorIMessageProvider,/g, replacement: '// monitorIMessageProvider,' },
    { pattern: /probeIMessage,/g, replacement: '// probeIMessage,' },
    { pattern: /sendMessageIMessage,/g, replacement: '// sendMessageIMessage,' },
    { pattern: /probeLineBot,/g, replacement: '// probeLineBot,' },
    { pattern: /buildTemplateMessageFromPayload,/g, replacement: '// buildTemplateMessageFromPayload,' },
    { pattern: /monitorLineProvider,/g, replacement: '// monitorLineProvider,' },
    { pattern: /handleSlackAction,/g, replacement: '// handleSlackAction,' },
    { pattern: /handleWhatsAppAction,/g, replacement: '// handleWhatsAppAction,' },
]);

// Fix: src/channels/dock.ts
fixFile('channels/dock.ts', [
    // Comment out blocks related to missing platforms
    { pattern: /resolveTelegramAccount/g, replacement: '/* resolveTelegramAccount */ ({} as any)' },
    { pattern: /normalizeWhatsAppTarget/g, replacement: '/* normalizeWhatsAppTarget */ ((s: string) => s)' },
    { pattern: /resolveSlackAccount/g, replacement: '/* resolveSlackAccount */ ({} as any)' },
    { pattern: /resolveSlackReplyToMode/g, replacement: '/* resolveSlackReplyToMode */ ({} as any)' },
    { pattern: /buildSlackThreadingToolContext/g, replacement: '/* buildSlackThreadingToolContext */ ({} as any)' },
    { pattern: /resolveSignalAccount/g, replacement: '/* resolveSignalAccount */ ({} as any)' },
    { pattern: /resolveIMessageAccount/g, replacement: '/* resolveIMessageAccount */ ({} as any)' },
]);

// Fix: src/cli/deps.ts
fixFile('cli/deps.ts', [
    { pattern: /sendMessageTelegram: typeof sendMessageTelegram;/g, replacement: '// sendMessageTelegram: typeof sendMessageTelegram;' },
    { pattern: /sendMessageSlack: typeof sendMessageSlack;/g, replacement: '// sendMessageSlack: typeof sendMessageSlack;' },
    { pattern: /sendMessageSignal: typeof sendMessageSignal;/g, replacement: '// sendMessageSignal: typeof sendMessageSignal;' },
    { pattern: /sendMessageIMessage: typeof sendMessageIMessage;/g, replacement: '// sendMessageIMessage: typeof sendMessageIMessage;' },
    { pattern: /sendMessageTelegram,/g, replacement: '// sendMessageTelegram,' },
    { pattern: /sendMessageSlack,/g, replacement: '// sendMessageSlack,' },
    { pattern: /sendMessageSignal,/g, replacement: '// sendMessageSignal,' },
    { pattern: /sendMessageIMessage,/g, replacement: '// sendMessageIMessage,' },
    { pattern: /sendTelegram: deps.sendMessageTelegram,/g, replacement: '// sendTelegram: deps.sendMessageTelegram,' },
    { pattern: /sendSlack: deps.sendMessageSlack,/g, replacement: '// sendSlack: deps.sendMessageSlack,' },
    { pattern: /sendSignal: deps.sendMessageSignal,/g, replacement: '// sendSignal: deps.sendMessageSignal,' },
    { pattern: /sendIMessage: deps.sendMessageIMessage,/g, replacement: '// sendIMessage: deps.sendMessageIMessage,' },
    { pattern: /sendDiscord: deps.sendMessageDiscord,/g, replacement: 'sendDiscord: deps.sendMessageDiscord,' }, // Clean trailing commas if needed
]);

// Fix imports for rgbot-root.js
const fixRootImport = [
    { pattern: /from "..\/infra\/rgbot-root.js"/g, replacement: 'from "../infra/moltbot-root.js"' },
    { pattern: /from "..\/..\/infra\/rgbot-root.js"/g, replacement: 'from "../../infra/moltbot-root.js"' },
    { pattern: /from "..\/rgbot-root.js"/g, replacement: 'from "./moltbot-root.js"' },
];

fixFile('agents/docs-path.ts', fixRootImport);
fixFile('commands/doctor-ui.ts', fixRootImport);
fixFile('commands/doctor.ts', fixRootImport);
fixFile('commands/status-all.ts', fixRootImport);
fixFile('commands/status.update.ts', fixRootImport);
fixFile('gateway/server-methods/update.ts', fixRootImport);
fixFile('cli/update-cli.ts', fixRootImport);
fixFile('infra/update-startup.ts', fixRootImport);


// Fix missing modules
fixFile('web/session.ts', [
    { pattern: /import qrcode from "qrcode-terminal";/g, replacement: '// import qrcode from "qrcode-terminal";
const qrcode = { generate: (a: any, b: any) => {} };' },
    { pattern: /qrcode.generate(qr, { small: true });/g, replacement: 'qrcode.generate(qr, { small: true });' } // Ensure consistency
]);

// Fix: src/infra/outbound/deliver.ts
fixFile('infra/outbound/deliver.ts', [
    { pattern: /sendTelegramizable typeof sendMessageTelegram;/g, replacement: '// sendTelegram?: typeof sendMessageTelegram;' },
    { pattern: /sendSlackizable typeof sendMessageSlack;/g, replacement: '// sendSlack?: typeof sendMessageSlack;' },
    { pattern: /sendSignalizable typeof sendMessageSignal;/g, replacement: '// sendSignal?: typeof sendMessageSignal;' },
    { pattern: /sendIMessageizable typeof sendMessageIMessage;/g, replacement: '// sendIMessage?: typeof sendMessageIMessage;' },
    { pattern: /const sendSignal = params.deps?.sendSignal ?? sendMessageSignal;/g, replacement: '// const sendSignal = params.deps?.sendSignal ?? sendMessageSignal;' },
    { pattern: /const sendSignalText = async (text: string, styles: SignalTextStyleRange[]) => {/g, replacement: 'const sendSignalText = async (text: string, styles: any[]) => {' },
    { pattern: /markdownToSignalTextChunks/g, replacement: '/* markdownToSignalTextChunks */ ({} as any)' },
]);

// Fix: src/plugins/runtime/types.ts
fixFile('plugins/runtime/types.ts', [
    { pattern: /import.*from "..\/..\/slack\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/telegram\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/signal\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/imessage\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/line\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/agents\/tools\/.*;/g, replacement: '// $&' },
    { pattern: /import.*from "..\/..\/channels\/plugins\/actions\/.*;/g, replacement: '// $&' },
    
    // Fix broken types by replacing them with 'any'
    { pattern: /type ProbeSlack = .*/g, replacement: 'type ProbeSlack = any;' },
    { pattern: /type SendMessageSlack = .*/g, replacement: 'type SendMessageSlack = any;' },
    { pattern: /type MonitorSlackProvider = .*/g, replacement: 'type MonitorSlackProvider = any;' },
    { pattern: /type HandleSlackAction = .*/g, replacement: 'type HandleSlackAction = any;' },
    { pattern: /type ProbeTelegram = .*/g, replacement: 'type ProbeTelegram = any;' },
    { pattern: /type ResolveTelegramToken = .*/g, replacement: 'type ResolveTelegramToken = any;' },
    { pattern: /type SendMessageTelegram = .*/g, replacement: 'type SendMessageTelegram = any;' },
    { pattern: /type MonitorTelegramProvider = .*/g, replacement: 'type MonitorTelegramProvider = any;' },
    { pattern: /type ProbeSignal = .*/g, replacement: 'type ProbeSignal = any;' },
    { pattern: /type SendMessageSignal = .*/g, replacement: 'type SendMessageSignal = any;' },
    { pattern: /type MonitorSignalProvider = .*/g, replacement: 'type MonitorSignalProvider = any;' },
    { pattern: /type MonitorIMessageProvider = .*/g, replacement: 'type MonitorIMessageProvider = any;' },
    { pattern: /type ProbeIMessage = .*/g, replacement: 'type ProbeIMessage = any;' },
    { pattern: /type SendMessageIMessage = .*/g, replacement: 'type SendMessageIMessage = any;' },
    { pattern: /type ListLineAccountIds = .*/g, replacement: 'type ListLineAccountIds = any;' },
    { pattern: /type ResolveLineAccount = .*/g, replacement: 'type ResolveLineAccount = any;' },
    { pattern: /type NormalizeLineAccountId = .*/g, replacement: 'type NormalizeLineAccountId = any;' },
    { pattern: /type ProbeLineBot = .*/g, replacement: 'type ProbeLineBot = any;' },
    { pattern: /type SendMessageLine = .*/g, replacement: 'type SendMessageLine = any;' },
    { pattern: /type PushMessageLine = .*/g, replacement: 'type PushMessageLine = any;' },
    { pattern: /type PushMessagesLine = .*/g, replacement: 'type PushMessagesLine = any;' },
    { pattern: /type PushFlexMessage = .*/g, replacement: 'type PushFlexMessage = any;' },
    { pattern: /type PushTemplateMessage = .*/g, replacement: 'type PushTemplateMessage = any;' },
    { pattern: /type PushLocationMessage = .*/g, replacement: 'type PushLocationMessage = any;' },
    { pattern: /type CreateQuickReplyItems = .*/g, replacement: 'type CreateQuickReplyItems = any;' },
    { pattern: /type MonitorLineProvider = .*/g, replacement: 'type MonitorLineProvider = any;' },
]);

// Fix: src/cli/outbound-send-deps.ts
fixFile('cli/outbound-send-deps.ts', [
    { pattern: /sendMessageTelegram: NonNullable<OutboundSendDeps["sendTelegram"]>;/g, replacement: '// sendMessageTelegram: NonNullable<OutboundSendDeps["sendTelegram"]>;' },
    { pattern: /sendMessageSlack: NonNullable<OutboundSendDeps["sendSlack"]>;/g, replacement: '// sendMessageSlack: NonNullable<OutboundSendDeps["sendSlack"]>;' },
    { pattern: /sendMessageSignal: NonNullable<OutboundSendDeps["sendSignal"]>;/g, replacement: '// sendMessageSignal: NonNullable<OutboundSendDeps["sendSignal"]>;' },
    { pattern: /sendMessageIMessage: NonNullable<OutboundSendDeps["sendIMessage"]>;/g, replacement: '// sendMessageIMessage: NonNullable<OutboundSendDeps["sendIMessage"]>;' },
    { pattern: /sendTelegram: deps.sendMessageTelegram,/g, replacement: '// sendTelegram: deps.sendMessageTelegram,' },
    { pattern: /sendSlack: deps.sendMessageSlack,/g, replacement: '// sendSlack: deps.sendMessageSlack,' },
    { pattern: /sendSignal: deps.sendMessageSignal,/g, replacement: '// sendSignal: deps.sendMessageSignal,' },
    { pattern: /sendIMessage: deps.sendMessageIMessage,/g, replacement: '// sendIMessage: deps.sendMessageIMessage,' },
]);

// Fix: src/auto-reply/reply/commands-allowlist.ts
fixFile('auto-reply/reply/commands-allowlist.ts', [
    { pattern: /resolveSlackAccount/g, replacement: '/* resolveSlackAccount */ ({} as any)' },
    { pattern: /resolveSlackUserAllowlist/g, replacement: '/* resolveSlackUserAllowlist */ (async () => ({} as any))' },
    { pattern: /resolveTelegramAccount/g, replacement: '/* resolveTelegramAccount */ ({} as any)' },
    { pattern: /resolveSignalAccount/g, replacement: '/* resolveSignalAccount */ ({} as any)' },
    { pattern: /resolveIMessageAccount/g, replacement: '/* resolveIMessageAccount */ ({} as any)' },
]);

// Fix: src/agents/pi-embedded-runner/compact.ts
fixFile('agents/pi-embedded-runner/compact.ts', [
    { pattern: /resolveTelegramInlineButtonsScope/g, replacement: '/* resolveTelegramInlineButtonsScope */ ({} as any)' },
    { pattern: /resolveTelegramReactionLevel/g, replacement: '/* resolveTelegramReactionLevel */ ({} as any)' },
    { pattern: /resolveSignalReactionLevel/g, replacement: '/* resolveSignalReactionLevel */ ({} as any)' },
]);

// Fix: src/agents/pi-embedded-runner/run/attempt.ts
fixFile('agents/pi-embedded-runner/run/attempt.ts', [
    { pattern: /resolveTelegramInlineButtonsScope/g, replacement: '/* resolveTelegramInlineButtonsScope */ ({} as any)' },
    { pattern: /resolveTelegramReactionLevel/g, replacement: '/* resolveTelegramReactionLevel */ ({} as any)' },
    { pattern: /resolveSignalReactionLevel/g, replacement: '/* resolveSignalReactionLevel */ ({} as any)' },
]);

// Fix: src/agents/pi-tools.ts
fixFile('agents/pi-tools.ts', [
    { pattern: /import \{ createRgBotTools \} from "..\/rgbot-tools.js";/g, replacement: '// import { createRgBotTools } from "./rgbot-tools.js";' },
]);

// Fix: src/auto-reply/reply/get-reply-inline-actions.ts
fixFile('auto-reply/reply/get-reply-inline-actions.ts', [
    { pattern: /import \{ createRgBotTools \} from "..\/..\/agents\/rgbot-tools.js";/g, replacement: '// import { createRgBotTools } from "../../agents/rgbot-tools.js";' },
]);

// Fix: src/auto-reply/reply/line-directives.ts
fixFile('auto-reply/reply/line-directives.ts', [
    { pattern: /\} from "..\/..\/line\/flex-templates.js";/g, replacement: '} from "../../line/flex-templates.js";
type LineChannelData = any;' },
    { pattern: /import \{/g, replacement: '// import {' },
]);

// Fix: src/auto-reply/templating.ts
fixFile('auto-reply/templating.ts', [
    { pattern: /Sticker\?: StickerMetadata;/g, replacement: 'Sticker?: any; // StickerMetadata' },
]);

// Fix: src/channels/plugins/directory-config.ts
fixFile('channels/plugins/directory-config.ts', [
    { pattern: /resolveSlackAccount/g, replacement: '/* resolveSlackAccount */ ({} as any)' },
    { pattern: /normalizeSlackMessagingTarget/g, replacement: '/* normalizeSlackMessagingTarget */ ((s:string)=>s)' },
    { pattern: /resolveTelegramAccount/g, replacement: '/* resolveTelegramAccount */ ({} as any)' },
    { pattern: /normalizeWhatsAppTarget/g, replacement: '/* normalizeWhatsAppTarget */ ((s:string)=>s)' },
    { pattern: /isWhatsAppGroupJid/g, replacement: '/* isWhatsAppGroupJid */ ((s:string)=>false)' },
]);

// Fix: src/channels/plugins/group-mentions.ts
fixFile('channels/plugins/group-mentions.ts', [
    { pattern: /resolveSlackAccount/g, replacement: '/* resolveSlackAccount */ ({} as any)' },
]);

// Fix: src/channels/plugins/normalize/imessage.ts
fixFile('channels/plugins/normalize/imessage.ts', [
    { pattern: /normalizeIMessageHandle/g, replacement: '/* normalizeIMessageHandle */ ((s:string)=>s)' },
]);

// Fix: src/channels/plugins/normalize/slack.ts
fixFile('channels/plugins/normalize/slack.ts', [
    { pattern: /parseSlackTarget/g, replacement: '/* parseSlackTarget */ ({} as any)' },
]);

// Fix: src/channels/plugins/normalize/whatsapp.ts
fixFile('channels/plugins/normalize/whatsapp.ts', [
    { pattern: /normalizeWhatsAppTarget/g, replacement: '/* normalizeWhatsAppTarget */ ((s:string)=>s)' },
]);

// Fix: src/channels/plugins/outbound/imessage.ts
fixFile('channels/plugins/outbound/imessage.ts', [
    { pattern: /deps?.sendIMessage ?? sendMessageIMessage/g, replacement: '/* deps?.sendIMessage ?? */ ({} as any)' },
]);

// Fix: src/channels/plugins/outbound/signal.ts
fixFile('channels/plugins/outbound/signal.ts', [
    { pattern: /deps?.sendSignal ?? sendMessageSignal/g, replacement: '/* deps?.sendSignal ?? */ ({} as any)' },
]);

// Fix: src/channels/plugins/outbound/slack.ts
fixFile('channels/plugins/outbound/slack.ts', [
    { pattern: /deps?.sendSlack ?? sendMessageSlack/g, replacement: '/* deps?.sendSlack ?? */ ({} as any)' },
]);

// Fix: src/channels/plugins/outbound/telegram.ts
fixFile('channels/plugins/outbound/telegram.ts', [
    { pattern: /markdownToTelegramHtmlChunks/g, replacement: '/* markdownToTelegramHtmlChunks */ ({} as any)' },
    { pattern: /deps?.sendTelegram ?? sendMessageTelegram/g, replacement: '/* deps?.sendTelegram ?? */ ({} as any)' },
]);

// Fix: src/channels/plugins/outbound/whatsapp.ts
fixFile('channels/plugins/outbound/whatsapp.ts', [
    { pattern: /normalizeWhatsAppTarget/g, replacement: '/* normalizeWhatsAppTarget */ ((s:string)=>s)' },
    { pattern: /isWhatsAppGroupJid/g, replacement: '/* isWhatsAppGroupJid */ ((s:string)=>false)' },
]);

// Fix: src/channels/plugins/slack.actions.ts
fixFile('channels/plugins/slack.actions.ts', [
    { pattern: /import \{ handleSlackAction, type SlackActionContext \} from "..\/..\/agents\/tools\/slack-actions.js";/g, replacement: '// import { handleSlackAction, type SlackActionContext } from "../../agents/tools/slack-actions.js";' },
    { pattern: /listEnabledSlackAccounts/g, replacement: '/* listEnabledSlackAccounts */ ((c:any)=>[])' },
    { pattern: /resolveSlackChannelId/g, replacement: '/* resolveSlackChannelId */ ({} as any)' },
]);

// Fix: src/cli/program/message/helpers.ts
fixFile('cli/program/message/helpers.ts', [
    { pattern: /deps,/g, replacement: 'deps: deps as any,' },
]);

// Fix: src/commands/agent.ts
fixFile('commands/agent.ts', [
    { pattern: /deps,/g, replacement: 'deps: deps as any,' },
]);

// Fix: src/commands/channels/capabilities.ts
fixFile('commands/channels/capabilities.ts', [
    { pattern: /result: SlackScopesResult;/g, replacement: 'result: any; // SlackScopesResult' },
    { pattern: /fetchSlackScopes/g, replacement: '/* fetchSlackScopes */ (async () => ({} as any))' },
]);

// Fix: src/gateway/server-cron.ts
fixFile('gateway/server-cron.ts', [
    { pattern: /deps: params.deps,/g, replacement: 'deps: params.deps as any,' },
]);

// Fix: src/gateway/server-http.ts
fixFile('gateway/server-http.ts', [
    { pattern: /handleSlackHttpRequest/g, replacement: '/* handleSlackHttpRequest */ (async () => false)' },
]);

// Fix: src/gateway/server/hooks.ts
fixFile('gateway/server/hooks.ts', [
    { pattern: /deps,/g, replacement: 'deps: deps as any,' },
]);

// Fix: src/gateway/tools-invoke-http.ts
fixFile('gateway/tools-invoke-http.ts', [
    { pattern: /import \{ createRgBotTools \} from "..\/agents\/rgbot-tools.js";/g, replacement: '// import { createRgBotTools } from "../agents/rgbot-tools.js";' },
    { pattern: /!getPluginToolMeta(tool as any)/g, replacement: '!getPluginToolMeta(tool)' },
    { pattern: /const resolved = stripPluginOnlyAllowlist(policy, pluginGroups, coreToolNames);/g, replacement: 'const resolved = stripPluginOnlyAllowlist(policy, pluginGroups, coreToolNames as any);' },
]);

// Fix: src/infra/outbound/message-action-runner.ts
fixFile('infra/outbound/message-action-runner.ts', [
    { pattern: /parseSlackTarget/g, replacement: '/* parseSlackTarget */ ({} as any)' },
]);

// Fix: src/infra/outbound/outbound-session.ts
fixFile('infra/outbound/outbound-session.ts', [
    { pattern: /\} from "..\/..\/signal\/identity.js";/g, replacement: '// } from "../../signal/identity.js";' },
    { pattern: /resolveSlackAccount/g, replacement: '/* resolveSlackAccount */ ({} as any)' },
    { pattern: /normalizeAllowListLower/g, replacement: '/* normalizeAllowListLower */ ({} as any)' },
    { pattern: /createSlackWebClient/g, replacement: '/* createSlackWebClient */ ({} as any)' },
    { pattern: /parseSlackTarget/g, replacement: '/* parseSlackTarget */ ({} as any)' },
    { pattern: /parseTelegramTarget/g, replacement: '/* parseTelegramTarget */ ({} as any)' },
    { pattern: /resolveTelegramTargetChatType/g, replacement: '/* resolveTelegramTargetChatType */ ({} as any)' },
    { pattern: /buildTelegramGroupPeerId/g, replacement: '/* buildTelegramGroupPeerId */ ({} as any)' },
    { pattern: /normalizeWhatsAppTarget/g, replacement: '/* normalizeWhatsAppTarget */ ((s:string)=>s)' },
    { pattern: /isWhatsAppGroupJid/g, replacement: '/* isWhatsAppGroupJid */ ((s:string)=>false)' },
    { pattern: /parseIMessageTarget/g, replacement: '/* parseIMessageTarget */ ({} as any)' },
    { pattern: /normalizeIMessageHandle/g, replacement: '/* normalizeIMessageHandle */ ((s:string)=>s)' },
]);

// Fix: src/test-utils/channel-plugins.ts
fixFile('test-utils/channel-plugins.ts', [
    { pattern: /outbound: params?.outbound ?? imessageOutbound,/g, replacement: 'outbound: params?.outbound ?? ({} as any), // imessageOutbound' },
    { pattern: /normalizeTarget: (raw) => normalizeIMessageHandle(raw),/g, replacement: 'normalizeTarget: (raw) => raw, // normalizeIMessageHandle(raw)' },
]);

console.log("Fixes applied.");
