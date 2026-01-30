import type { RgBotConfig } from "../../config/types.js";
import type { ChannelDirectoryEntry } from "./types.js";
import { resolveDiscordAccount } from "../../discord/accounts.js";
import { resolveWhatsAppAccount } from "../../web/accounts.js";
// // // import { /* isWhatsAppGroupJid */ ((_s:string)=>false), /* normalizeWhatsAppTarget */ ((s:string)=>s) } from "../../whatsapp/normalize.js";

export type DirectoryConfigParams = {
  cfg: RgBotConfig;
  accountId?: string | null;
  query?: string | null;
  limit?: number | null;
};

export async function listDiscordDirectoryPeersFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = resolveDiscordAccount({ cfg: params.cfg, accountId: params.accountId });
  const q = params.query?.trim().toLowerCase() || "";
  const ids = new Set<string>();

  for (const entry of account.config.dm?.allowFrom ?? []) {
    const raw = String(entry).trim();
    if (!raw || raw === "*") continue;
    ids.add(raw);
  }
  for (const id of Object.keys(account.config.dms ?? {})) {
    const trimmed = id.trim();
    if (trimmed) ids.add(trimmed);
  }
  for (const guild of Object.values(account.config.guilds ?? {})) {
    for (const entry of guild.users ?? []) {
      const raw = String(entry).trim();
      if (raw) ids.add(raw);
    }
    for (const channel of Object.values(guild.channels ?? {})) {
      for (const user of channel.users ?? []) {
        const raw = String(user).trim();
        if (raw) ids.add(raw);
      }
    }
  }

  return Array.from(ids)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const mention = raw.match(/^<@!?(\d+)>$/);
      const cleaned = (mention?.[1] ?? raw).replace(/^(discord|user):/i, "").trim();
      if (!/^\d+$/.test(cleaned)) return null;
      return `user:${cleaned}`;
    })
    .filter((id): id is string => Boolean(id))
    .filter((id) => (q ? id.toLowerCase().includes(q) : true))
    .slice(0, params.limit && params.limit > 0 ? params.limit : undefined)
    .map((id) => ({ kind: "user", id }) as const);
}

export async function listDiscordDirectoryGroupsFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = resolveDiscordAccount({ cfg: params.cfg, accountId: params.accountId });
  const q = params.query?.trim().toLowerCase() || "";
  const ids = new Set<string>();
  for (const guild of Object.values(account.config.guilds ?? {})) {
    for (const channelId of Object.keys(guild.channels ?? {})) {
      const trimmed = channelId.trim();
      if (trimmed) ids.add(trimmed);
    }
  }

  return Array.from(ids)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const mention = raw.match(/^<#(\d+)>$/);
      const cleaned = (mention?.[1] ?? raw).replace(/^(discord|channel|group):/i, "").trim();
      if (!/^\d+$/.test(cleaned)) return null;
      return `channel:${cleaned}`;
    })
    .filter((id): id is string => Boolean(id))
    .filter((id) => (q ? id.toLowerCase().includes(q) : true))
    .slice(0, params.limit && params.limit > 0 ? params.limit : undefined)
    .map((id) => ({ kind: "group", id }) as const);
}

export async function listWhatsAppDirectoryPeersFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = resolveWhatsAppAccount({ cfg: params.cfg, accountId: params.accountId });
  const q = params.query?.trim().toLowerCase() || "";
  return (account.allowFrom ?? [])
    .map((entry) => String(entry).trim())
    .filter((entry) => Boolean(entry) && entry !== "*")
    .map((entry) => /* normalizeWhatsAppTarget */ ((s:string)=>s)(entry) ?? "")
    .filter(Boolean)
    .filter((id) => !/* isWhatsAppGroupJid */ ((_s:string)=>false)(id))
    .filter((id) => (q ? id.toLowerCase().includes(q) : true))
    .slice(0, params.limit && params.limit > 0 ? params.limit : undefined)
    .map((id) => ({ kind: "user", id }) as const);
}

export async function listWhatsAppDirectoryGroupsFromConfig(
  params: DirectoryConfigParams,
): Promise<ChannelDirectoryEntry[]> {
  const account = resolveWhatsAppAccount({ cfg: params.cfg, accountId: params.accountId });
  const q = params.query?.trim().toLowerCase() || "";
  return Object.keys(account.groups ?? {})
    .map((id) => id.trim())
    .filter((id) => Boolean(id) && id !== "*")
    .filter((id) => (q ? id.toLowerCase().includes(q) : true))
    .slice(0, params.limit && params.limit > 0 ? params.limit : undefined)
    .map((id) => ({ kind: "group", id }) as const);
}
