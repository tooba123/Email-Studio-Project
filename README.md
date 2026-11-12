# Email Studio Project

A small, friendly email-marketing studio for **Kettlebird Tea**, built as a practice project with **OpenCode**.

The studio plans a launch campaign for **The Steep Club** (Kettlebird Tea's monthly tea box), writes the emails, makes a version for each customer group, and can send test emails safely. **No real customer is ever emailed.**

This README is the plain-English guide: what is here, how it works, how to use it, and how to stay safe.

---

## 1. The short story

Kettlebird Tea has a waitlist of about 2,000 people. The goal is to turn 300 of them into Steep Club subscribers in four weeks.

The studio has three customer groups:

| Group | Who they are | What they care about |
| --- | --- | --- |
| `tea-curious` | People new to loose-leaf tea | Guidance, variety, and trying new teas without risk |
| `gift-buyers` | People buying tea for someone else | A thoughtful, easy gift that feels personal |
| `daily-drinkers` | People who drink tea most days | Convenience, freshness, and a reliable monthly treat |

The campaign runs from **7 December 2026 to 3 January 2027**. It uses email only, with no paid ads.

---

## 2. Safety first

Please read this before you use the studio.

- **Never send email to real people.**
- Every lead address ends in `@example.com`. That domain is reserved for examples and can never receive real mail.
- Sending through Resend is allowed **only** to:
  - addresses ending in `@resend.dev`, and
  - your own email address (`MY_EMAIL`).
- Practice sends go to a pretend email server on your own computer (`http://localhost:4000`). Nothing leaves your machine.
- The safety guard blocks any send to any other address, even by mistake.
- The guard also blocks actions that could email a whole list at once.
- **Never put a real Resend API key in this repo.** The config uses the practice value `re_practice`.
- Your personal email is kept outside the repo, in `~/.config/opencode/secrets/my-email`. It is never committed.
- **Ask before deleting anything.**

If you are ever unsure: stop, check the guard message, and do not try to get around a block.

---

## 3. What is inside

```text
Email-Studio-Project/
├── AGENTS.md                    The studio's rules and OpenCode notes
├── Assignment.md                The full 15-step lab this studio is based on
├── opencode.json                Project config: brand voice, skills, Resend connection
├── README.md                    This guide
├── brand/
│   └── voice.md                 How Kettlebird Tea sounds, and what we never say
├── leads/
│   ├── leads.csv                24 practice customers (8 per group)
│   └── AGENTS.md                Rules for the leads folder only
├── campaigns/
│   └── steep-club-launch/
│       ├── plan.md              The full campaign plan
│       ├── emails/              4 base launch emails
│       └── groups/              12 personalized emails (4 emails × 3 groups)
├── rules/
│   └── emails.md                Format rules for every campaign email
├── notes/
│   └── skills-i-chose.md        Notes on which skills were trusted, and why
└── .opencode/
    ├── command/                 Slash commands for the marketing skills
    ├── plugins/
    │   ├── marketing/           Anthropic's marketing plugin (vendored)
    │   └── send-guard.js        The safety guard for Resend sends
    └── skills/
        └── personalize/         The studio's own personalize skill
```

There is no package manager or test runner for the studio itself. The only Node package is the OpenCode plugin library inside `.opencode/`.

---

## 4. The campaign plan

`campaigns/steep-club-launch/plan.md` is the campaign brief. It covers:

- the goal and audience
- key messages for each group
- channel strategy (email only)
- a week-by-week content calendar
- success metrics and weekly checkpoints
- budget
- risks and mitigations
- next steps and approvals

The plan is a draft. Prices, links, shipping costs, and segment counts still need real confirmation before anything is sent for real.

---

## 5. The four launch emails

| File | Purpose |
| --- | --- |
| `01-launch.md` | Welcome readers and introduce The Steep Club |
| `02-value.md` | Show what each group gets from the box |
| `03-proof-and-faq.md` | Answer doubts and explain what is in a box |
| `04-final-call.md` | Calmly summarise the offer before the window closes |

Each email also has a personalized copy under:

```text
campaigns/steep-club-launch/groups/<group>/emails/
```

That gives **12 group versions**: 4 emails for each of the 3 groups.

The personalized versions keep the same subject, preview, link, sign-off, and footer. They only change the opening line and one example so the email fits that group.

---

## 6. The email rules

`rules/emails.md` applies to every file matching `campaigns/**/emails/*.md`. It does not apply to other files, and the rule file itself is not an email.

Every email must:

- start with a `Subject:` line of **50 characters or fewer**
- then a `Preview:` line of **90 characters or fewer**
- greet the reader with `{{first_name}}`
- have **exactly one main link**
- end with the sign-off from `brand/voice.md`
- end with this exact two-line footer, as **plain text** (shown here in a box only so it is easy to read):

```text
You're getting this because you joined the Kettlebird Tea waitlist.
Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
```

In the email file itself, those two lines must be plain text, not a code block.

The sign-off is:

- The Kettlebird Tea Team
- The Steep Club
- Bringing you fresh tea discoveries and happy moments, one sip at a time.

### Brand voice

`brand/voice.md` is loaded into every session through `opencode.json`.

Kettlebird Tea sounds **warm, curious, and approachable**. The studio avoids pushy or exaggerated language such as "Buy now!", "Hurry, limited offer!", or "Best tea in the world".

It also never claims that tea cures disease, improves health, guarantees weight loss, or is 100% organic without proof.

---

## 7. The practice leads

`leads/leads.csv` has **24 made-up people**, 8 in each group.

Columns:

```text
first_name,last_name,email,group,joined_on,consent
```

Rules for the leads folder:

- These are practice people only.
- Never add real people or real email addresses.
- Every row needs a consent value.
- Never change the `@example.com` addresses.

---

## 8. The safety guard

The guard is at `.opencode/plugins/send-guard.js`. It runs before a Resend tool is used and checks the recipient addresses.

It allows sends only when **every** address in `to`, `cc`, and `bcc` is either:

- an `@resend.dev` address, or
- your own email (`MY_EMAIL`).

It always blocks tools that can reach a whole list:

- `send-broadcast`
- `create-automation`
- `send-inbox-draft`
- `send-new-inbox-email`

If an address is not allowed, the guard stops the call and names the address in the error. This is a hard block: the model cannot talk its way past it.

Your `MY_EMAIL` is read from the `MY_EMAIL` environment variable first, then from `~/.config/opencode/secrets/my-email`. It is never stored in git.

---

## 9. Resend in practice mode

The Resend connection is in `opencode.json` under `mcp.servers.resend`.

It uses:

| Setting | Practice value |
| --- | --- |
| Package | `resend-mcp@2.27.1` (pinned) |
| API key | `re_practice` |
| Base URL | `http://localhost:4000` |
| Sender | `onboarding@resend.dev` |

Start the practice email server in a **separate terminal**:

```bash
npx emulate@0.12.3 start --service resend
```

Wait for **Ready** and `http://localhost:4000`. Leave that terminal open while you test sends.

This means the studio talks to a pretend post office on your computer. It is not the real Resend service.

### Try a safe test send

1. Make sure the practice server is running.
2. Ask OpenCode: *"Send email 01 from `campaigns/steep-club-launch/emails/` to `delivered@resend.dev`."*
3. Ask OpenCode to list the sent email and show its delivery status.
4. Try sending to a lead address such as Ayesha's. The guard should block it and name the address.

Sending to your own `MY_EMAIL` is also allowed. Everything else is blocked.

### If you want to send for real later

To send for real, you would need a real Resend account, a verified sending domain, and a real API key set in your environment. You would also change the base URL to `https://api.resend.com`.

Even then, the guard would still block anyone except `@resend.dev` addresses and your own `MY_EMAIL`. That is on purpose.

Never paste a real key into a file, a chat, or a commit.

---

## 10. Getting started

You need:

- **Node.js 22 or newer**
- **OpenCode 1.19.5** (the version this studio was adapted for)
- Git

Steps:

1. Open this folder in OpenCode.
2. Start the practice server in a second terminal:

   ```bash
   npx emulate@0.12.3 start --service resend
   ```

3. Make sure your email is available at `~/.config/opencode/secrets/my-email`, or set `MY_EMAIL` in your environment.
4. Restart OpenCode if you changed `opencode.json`, a skill, a plugin, or a command. **OpenCode does not hot-reload these.**
5. Ask OpenCode to list the loaded skills or commands if something seems missing.

### Claude Code vs OpenCode

The original lab in `Assignment.md` was written for Claude Code. This repo runs the same ideas through OpenCode:

- `AGENTS.md` and `opencode.json` replace `CLAUDE.md` and `.claude/settings.json`.
- `.opencode/skills/` replaces `.claude/skills/`.
- `.opencode/plugins/` replaces `.claude/hooks/`.
- `opencode.json` replaces `.mcp.json`.

Every safety rule still applies.

---

## 11. Common things you can ask

The marketing plugin is vendored from Anthropic at `.opencode/plugins/marketing/`. The exact source commit is recorded in `.opencode/plugins/marketing/plugin.json`.

Available commands include:

| Command | What it helps with |
| --- | --- |
| `/campaign-plan` | Turn a goal into a full campaign plan |
| `/email-sequence` | Draft a multi-email sequence |
| `/brand-review` | Check copy against the brand voice |
| `/draft-content` | Draft marketing content for a channel |
| `/performance-report` | Summarise campaign performance |
| `/competitive-brief` | Compare competitors and positioning |
| `/seo-audit` | Audit a site's SEO |

You can also ask in normal words, for example:

- "Plan a campaign for The Steep Club."
- "Write four launch emails for the waitlist."
- "Review these emails against `brand/voice.md` and `rules/emails.md`."
- "Send email 01 to `delivered@resend.dev`."
- "Why did the guard block that send?"

---

## 12. Personalizing emails

The personalize skill lives at `.opencode/skills/personalize/SKILL.md`.

To use it, the campaign emails should already be final. Then ask OpenCode to run `personalize` on a campaign folder, for example:

```text
Use the personalize skill on campaigns/steep-club-launch.
```

The skill:

1. reads the groups in `leads/leads.csv`
2. reads each email in `<campaign>/emails/`
3. writes one version per group to `<campaign>/groups/<group>/emails/`
4. keeps the same file name
5. changes only the opening line and one example
6. replies with a short summary

The group versions must still follow `rules/emails.md`.

---

## 13. Notes on skills

`notes/skills-i-chose.md` explains which outside skills were trusted and which were avoided.

The short version: check **who published it**, check the **GitHub stars and recent activity**, and read **what the skill actually does**. Install counts alone are not enough.

---

## 14. What is not built yet

The full lab in `Assignment.md` has three later parts that are not in this repo:

- **Automatic review**: a headless `scripts/review.mjs` that writes `review/findings.json` and exits with code 1 when it finds a high-severity problem.
- **Studio kit**: a reusable plugin for a second client, with the personalize skill, send guard, reviewer agent, and review script.
- **Big-context exercise**: 120 practice reviews, a scratchpad, a subagent, and `/compact`.

The current studio covers planning, brand voice, leads, emails, personalization, the Resend practice connection, and the send guard.

---

## 15. Troubleshooting

| Problem | What to try |
| --- | --- |
| Connection refused from Resend | The practice server is not running. Start `npx emulate@0.12.3 start --service resend` again. |
| The guard blocks a send | Check every `to`, `cc`, and `bcc` address. Only `@resend.dev` and your `MY_EMAIL` are allowed. |
| A skill or command is missing | Restart OpenCode. Config, skills, plugins, and commands do not hot-reload. |
| The guard blocks a whole-list tool | That is expected. Broadcasts, automations, and inbox sends are blocked on purpose. |
| You changed `opencode.json` | Restart OpenCode, then check the Resend connection again. |

---

## 16. Versions used

| Tool | Version |
| --- | --- |
| Node.js | 22 or newer |
| OpenCode | 1.19.5 |
| Practice email server | `emulate@0.12.3` |
| Resend MCP | `resend-mcp@2.27.1` |
| Marketing plugin | `1.2.0`, commit `e050c2ec856373787143d7057663a6ebd1277df3` |

---

## 17. One-line summary

This is a safe, practice-only email studio: plan a tea campaign, write warm emails, personalize them for three groups, and send test emails to practice addresses, with a guard that makes sure no real person is ever emailed.
