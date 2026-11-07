# Marketing plugin (OpenCode adaptation)

Anthropic's `marketing` plugin from
[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins),
adapted for OpenCode.

- Source: `marketing/` at commit `e050c2ec856373787143d7057663a6ebd1277df3`
- License: see `LICENSE`
- Original install method (Claude Code marketplace) is intentionally **not** used.
  This copy is vendored into the project only.

## What was adapted

| Original Claude Code component | OpenCode location |
| --- | --- |
| `.claude-plugin/plugin.json` | `plugin.json` (metadata only; OpenCode does not read it) |
| `skills/*/SKILL.md` | `skills/*/SKILL.md`, registered through `skills.paths` in `opencode.json` |
| `/campaign-plan`, `/email-sequence`, etc. | `.opencode/command/*.md` |
| `.mcp.json` | `mcp.example.json` (OpenCode `mcp` shape, all disabled by default) |

Skill front matter was reduced to `name` and `description`, the only fields
OpenCode skills support. The original `argument-hint` and `user-invocable`
fields were removed. Command argument hints now live in
`.opencode/command/*.md`.

## Skills

- `brand-review`
- `campaign-plan`
- `competitive-brief`
- `content-creation`
- `draft-content`
- `email-sequence`
- `performance-report`
- `seo-audit`

## Commands

- `/brand-review`
- `/campaign-plan`
- `/competitive-brief`
- `/draft-content`
- `/email-sequence`
- `/performance-report`
- `/seo-audit`

## Optional MCP integrations

`mcp.example.json` lists the plugin's remote MCP servers in OpenCode's shape.
They are all `"enabled": false`. To use one, merge its entry into the project
`opencode.json` and enable it. OAuth and credentials must be configured in
OpenCode; the original Claude Code `oauth` block is not part of OpenCode's
config shape.
