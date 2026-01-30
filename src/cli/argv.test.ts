import { describe, expect, it } from "vitest";

import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "rgbot", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "rgbot", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "rgbot", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "rgbot", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "rgbot", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "rgbot", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "rgbot", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "rgbot"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "rgbot", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "rgbot", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "rgbot", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "rgbot", "status", "--timeout=2500"], "--timeout")).toBe("2500");
    expect(getFlagValue(["node", "rgbot", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "rgbot", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "rgbot", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "rgbot", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "rgbot", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "rgbot", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "rgbot", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "rgbot", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "rgbot", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "rgbot", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node", "rgbot", "status"],
    });
    expect(nodeArgv).toEqual(["node", "rgbot", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node-22", "rgbot", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "rgbot", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node-22.2.0.exe", "rgbot", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "rgbot", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node-22.2", "rgbot", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "rgbot", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node-22.2.exe", "rgbot", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "rgbot", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["/usr/bin/node-22.2.0", "rgbot", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "rgbot", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["nodejs", "rgbot", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "rgbot", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["node-dev", "rgbot", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "rgbot", "node-dev", "rgbot", "status"]);

    const directArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["rgbot", "status"],
    });
    expect(directArgv).toEqual(["node", "rgbot", "status"]);

    const bunArgv = buildParseArgv({
      programName: "rgbot",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "rgbot",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "rgbot", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "rgbot", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "rgbot", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "rgbot", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "rgbot", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "rgbot", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "rgbot", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "rgbot", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
