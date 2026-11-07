# Skills I chose

Checked on 7 November 2026 with `npx skills find` and the GitHub API.

## Use these

**Writing campaigns — Anthropic's `knowledge-work-plugins`.** The source is `anthropics/knowledge-work-plugins` (35,060 GitHub stars, owned by Anthropic), and its `campaign-plan` skill (3.4K installs) turns a launch goal into a structured plan, while `email-sequence` (3K installs) writes the sequence itself. I trust it because Anthropic publishes it, the descriptions are specific, and the repo is actively maintained.

**Sending email — Resend's `resend-skills`.** The source is `resend/resend-skills` (211 GitHub stars, owned by Resend), and its `resend` skill (24.3K installs) covers sending. `resend/email-best-practices` (147 stars, 8.2K installs) is the companion for deliverability advice. The star counts are small because these repos are new, but the publisher is the company that runs the email service, so its guidance should match the real API.

A credible independent runner-up is `coreyhaines31/marketingskills@emails` (85K installs; the repo has 58,981 stars). It was called `email-sequence` until the v2.0 rename in May 2026, and the old skills.sh listing still shows a stale 55.1K installs. It looks useful, but it is not official, so I would read it before relying on it.

## Avoid these

**`caffeinelabs/skills@extension-email-marketing`** — 30.4K installs but the GitHub repository has only 2 stars. That is the classic warning sign: a big install number with no real community behind it, so the count may be inflated.

**`claude-office-skills/skills@email-marketing`** — 5.1K installs and 567 stars, from an organisation I cannot identify, and the repository has not been updated since January 2026. It is neither official nor current.

Also skip lookalikes such as `resend.com@Resend` (17 installs): it uses a domain-style name, not Resend's official `resend` organisation.

## How I decided

1. **Who publishes it.** Prefer a company or organisation I recognise, such as `anthropics` or `resend`, over an unknown account with a similar-looking name.
2. **GitHub stars and recent activity.** Check the repository behind the skill, not just the install count: look for real stars and recent commits, and confirm the skill's current name in the repo because skills.sh listings can lag behind renames.
3. **What the skill actually does.** Read its `SKILL.md`, check which files and tools it asks for, and confirm it fits the job before installing anything.
