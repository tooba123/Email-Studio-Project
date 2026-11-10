import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const SECRET_FILE = join(homedir(), ".config", "opencode", "secrets", "my-email");

const CHECK_RECIPIENTS = ["resend_send-email", "resend_send-batch-emails"];
const ALWAYS_BLOCK = [
  "resend_send-broadcast",
  "resend_create-automation",
  "resend_send-inbox-draft",
  "resend_send-new-inbox-email",
];

function normalize(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/^mcp[_.:\/]+/, "")
    .replace(/[_.:\/\-]+/g, "_");
}

const CHECK = new Set(CHECK_RECIPIENTS.map(normalize));
const BLOCK = new Set(ALWAYS_BLOCK.map(normalize));

async function resolveMyEmail() {
  const fromEnv = String(process.env.MY_EMAIL || "").trim();
  if (fromEnv) return fromEnv.toLowerCase();
  try {
    const fromFile = (await readFile(SECRET_FILE, "utf8")).trim();
    return fromFile.toLowerCase();
  } catch {
    return "";
  }
}

function plainAddress(value) {
  const raw = String(value || "").trim();
  const angled = raw.match(/<([^>]+)>/);
  return (angled ? angled[1] : raw).trim().toLowerCase();
}

function list(value) {
  if (value == null) return [];
  return (Array.isArray(value) ? value : [value]).map(plainAddress).filter(Boolean);
}

function collectRecipients(args) {
  const out = [];
  const add = (obj) => {
    for (const field of ["to", "cc", "bcc"]) {
      for (const address of list(obj?.[field])) out.push(address);
    }
  };
  if (Array.isArray(args?.emails)) {
    for (const item of args.emails) add(item);
  } else {
    add(args);
  }
  return out;
}

function allowed(address, myEmail) {
  return address.endsWith("@resend.dev") || (!!myEmail && address === myEmail);
}

export const SendGuard = async () => ({
  "tool.execute.before": async (input, output) => {
    const tool = normalize(input?.tool);
    if (!tool.startsWith("resend_")) return;

    if (BLOCK.has(tool)) {
      throw new Error(
        "send-guard blocked " + input.tool + ": it can reach a whole list of people.",
      );
    }
    if (!CHECK.has(tool)) return;

    const myEmail = await resolveMyEmail();
    for (const address of collectRecipients(output?.args)) {
      if (!allowed(address, myEmail)) {
        throw new Error(
          "send-guard blocked recipient " + address + ": only @resend.dev or MY_EMAIL are allowed.",
        );
      }
    }
  },
});

export default SendGuard;
