# AGENTS.md

## The studio

This folder is an email-marketing studio for a small business: we plan and write email campaigns here.

- `brand/` — the brand voice, plus the words we use and avoid.
- `leads/` — practice customers and the rules for handling them.
- `campaigns/` — campaign plans and the emails we write for each campaign.
- `notes/` — research, decisions, and scratch notes.

Studio rules:

- Write in plain English.
- Never send email to real people.
- Sending through Resend is allowed only to Resend's test addresses (ending in @resend.dev) and to my own email address (MY_EMAIL); a guard will enforce this in the next step.
- Ask before deleting anything.

### Marketing plugin

- Anthropic's marketing plugin is vendored at `.opencode/plugins/marketing/`; the exact source commit is recorded in `plugin.json`.
- Its skills load through the `skills` array in `opencode.json`; the matching slash commands live in `.opencode/command/`.
- Optional MCP servers are listed, disabled, in `.opencode/plugins/marketing/mcp.example.json`.

## Email rules

- When creating or editing any file matching `campaigns/**/emails/*.md`, read `rules/emails.md` and follow it.
- Follow those email rules only for files matching `campaigns/**/emails/*.md`.
- Do not apply those email rules to other files.
- Do not treat `rules/emails.md` as an email that must follow its own rules.

## What this repo is

- `Assignment.md` is the complete spec: a 15-step CCAR-F Claude Code lab that builds an email-marketing studio. The repo starts with **no** studio files; create the layout shown in "Your studio at the end" (Assignment.md:24-43).
- There is no package manifest, test runner, linter, or CI. Verification is the per-step **Check** prompt in `Assignment.md` run in a **fresh session** — never self-check in the session that built the work.
- Follow steps in order. Each step is BUILD, then a **fresh session** for CHECK. Start that fresh session with OpenCode, not Claude Code (`/exit` is Claude-only; use a new session or `opencode run` without `-c/-s`).

## OpenCode first, not Claude Code

- Use OpenCode's native commands, config, and agent hierarchy. Do not assume Claude Code commands, settings, hooks, skills, or agents exist here; verify against the installed version first (`opencode --version`, currently 1.19.5; `opencode --help`, `opencode run --help`).
- `Assignment.md` is written for Claude Code and its `.claude/**` / `.mcp.json` paths are graded artifacts. Keep producing them for the lab, but drive the work with OpenCode equivalents and explain any Claude-only step before substituting. Preserve every requirement and safety rule; never silently skip a step.
- Map before acting:

| Claude Code | OpenCode equivalent |
| --- | --- |
| `CLAUDE.md`, `.claude/rules/*.md` | `AGENTS.md` + `instructions` in `opencode.json` |
| `.claude/settings.json`, `settings.local.json` | `opencode.json` (project) / `~/.config/opencode/opencode.json` (global) |
| `.mcp.json` with `${VAR:-default}` | `opencode.json` → `mcp.<name>` (`type: "local"`, `command` array, `environment`; interpolation is `{env:VAR}`, not `${VAR}`) |
| `.claude/skills/<name>/SKILL.md` | `.opencode/skills/<name>/SKILL.md` (only `name` + `description`; `context: fork`, `allowed-tools`, `argument-hint` do not exist) |
| `.claude/agents/*` | `.opencode/agents/<name>.md` with `mode: primary\|subagent\|all` and `permission` |
| `.claude/hooks/*` + `PreToolUse` exit 2 | `.opencode/plugins/*.ts` (`tool.execute.before`) or `permission` rules; confirm blocking behavior in the current API before relying on it |
| `claude -n NAME`, `--resume NAME`, `--fork-session -n NAME` | `opencode run --title ...`, `-s/--session <id>` (IDs, not names), `--fork` with `-c`/`-s` |
| `claude -p ... --output-format json --json-schema ...` | `opencode run "..." --format json`; there is no `--json-schema` flag — validate in the script |
| plan mode (`Shift+Tab`) | `plan` agent (`--agent plan`) |

- If no equivalent exists, state the difference and propose an OpenCode-compatible alternative; do not invent flags or assume compatibility. Review this file and other instructions before starting, and name which Claude Code parts need adaptation.
- OpenCode does not hot-reload config, agents, skills, or plugins; restart the session after changing them.

## Safety invariants (checked at every step)

- No real recipients: every lead address ends in `@example.com`; sends allowed only to `@resend.dev` or the user's `MY_EMAIL`.
- Never commit a real Resend key. `.mcp.json` uses `${RESEND_API_KEY:-re_practice}`-style expansion; keys come from the environment.
- `.claude/settings.local.json` is personal, holds `MY_EMAIL`, and must be gitignored and never committed.

## Required formats

- Email files under `campaigns/**/emails/*.md`: `Subject: ` line ≤50 chars, `Preview: ` line ≤90, greet `{{first_name}}`, exactly one link, sign-off from `brand/voice.md`, then the exact two-line footer from `rules/emails.md` as **plain text** (not fenced).
- `rules/emails.md` uses the `paths:` front matter to scope the rule to `campaigns/**/emails/*.md` for every campaign.
- `leads/leads.csv` columns: `first_name,last_name,email,group,joined_on,consent`; 24 rows, 8 per group (`tea-curious`, `gift-buyers`, `daily-drinkers`).

## Commands and pinned versions

- Node.js 22+.
- Practice email server (separate terminal, steps 9–11): `npx emulate@0.12.3 start --service resend` → `http://localhost:4000`.
- Resend MCP is pinned: `resend-mcp@2.27.1`.
- Review: `node scripts/review.mjs <campaign-folder>`. Writes `review/findings.json`, exits `1` if any finding is `high`, else `0`.
- Findings must match `review/findings.schema.json`: `findings[]` with all of `file`, `line`, `severity`, `problem`, `fix`; severity in `high|medium|low`.
- Headless review: `claude -p "..." --output-format json --json-schema "<schema file text>" --allowedTools "Read,Glob,Grep"`. `--json-schema` takes the schema **text**, not a filename; handle both a single object and a list whose last item is the result.

## Gotchas

- In the assignment's `.claude/settings.json`, blocking is a `PreToolUse` hook exiting with code `2` (matcher `mcp__resend__.*`). `PostToolUse` cannot block — the exam wording differs from product behavior; don't "fix" the user's notes. OpenCode has no `PreToolUse`; use a plugin `tool.execute.before` or `permission` rules instead (see mapping).
- `.claude/rules/` with `paths:` is for conventions spanning folders; a subfolder `CLAUDE.md` (e.g. `leads/CLAUDE.md`) applies only inside that folder.
- Claude Code skill front matter (the graded artifact) is exact: `context: fork`, `allowed-tools`, `argument-hint`; OpenCode skills accept only `name` + `description`, so adapt before running under OpenCode. The personalize skill writes `<campaign>/groups/<group>/emails/` (4 emails × 3 groups = 12 files).
- Resume/fork: Claude Code names forks with `-n` (otherwise the original name matches two sessions); OpenCode uses `--fork` together with `-c`/`-s` and session IDs.
- Prefer official/community skills and MCP servers over custom ones (see step 1); the studio kit lives in a sibling `studio-kit/`, while brand/leads/campaigns stay per-client.
