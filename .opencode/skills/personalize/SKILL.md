---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
---

# Personalize

Take a campaign folder and write one version of each of its final campaign emails for every lead group in `leads/leads.csv`.

## Inputs

- Campaign folder, for example `campaigns/steep-club-launch`.

## Process

1. If no campaign folder is given, stop and list the campaign folders that exist under `campaigns/`. Do not write any personalized emails until a campaign folder has been provided.
2. Read `leads/leads.csv` and use the group values it contains (for this studio: `tea-curious`, `gift-buyers`, `daily-drinkers`).
3. For each email file in `<campaign>/emails/`, write a personalized version for every group into `<campaign>/groups/<group>/emails/`, keeping the same file name.
4. Each personalized version must:
   - Keep the same subject line, preview line, structure, CTA link, sign-off, and two-line footer as the base email.
   - Keep the `{{first_name}}` greeting.
   - Change the opening line so it fits the group.
   - Change one example so it fits the group.
   - Follow `brand/voice.md` and the format in `rules/emails.md`.
5. Use these personalization angles:
   - `tea-curious`: discovery and guidance. Approved phrase: "Discover your next favourite tea".
   - `gift-buyers`: thoughtful gifting. Approved phrase: "A thoughtful tea gift for someone who loves a good cup".
   - `daily-drinkers`: routine and monthly treat. Approved phrase: "Your monthly tea treat, without the guesswork".
6. When finished, reply with a short summary only: how many files were written, plus one example opening line per group.

## Commit

- Commit the new personalized files when the run is done.
