---
description: Reflect on an AI-assisted development session and suggest reusable repository learnings.
---

# Reflect

Review the recent AI-assisted development session and extract reusable learnings.

Use `AGENTS.md` and `.github/copilot-instructions.md` as the main project context.

This prompt supports lightweight repository learning without automatically modifying files.

**Do NOT modify files. The reflection is the deliverable unless the user explicitly asks to apply changes.**

## Step 1 — Load Project Context

Read the relevant project guidance first:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- existing `.github/prompts/` files
- existing `.github/agents/` files

Use these files to understand what is already documented.

Do not suggest duplicate guidance.

Do not rely only on memory if repository files are available.

## Step 2 — Scan the Session

Look for reusable lessons from the conversation or development session.

Focus on:

- mistakes made and corrections received
- project conventions that became clearer
- codebase knowledge gained
- library or tooling quirks discovered
- decisions made and their rationale
- AI prompt patterns that worked well
- AI prompt patterns that caused confusion
- repeated manual steps that could be encoded
- verification steps that proved useful
- places where AI guidance should be safer or more precise

Skip:

- trivial details
- one-time local issues
- temporary task-specific facts
- personal preferences that do not affect the repository
- anything already captured clearly in existing files

## Step 3 — Route Each Learning

Not every lesson belongs in the same place.

Route each learning to where it has the most value.

### Repository Instructions

Use this route when the lesson should guide all future AI agents.

Possible destinations:

- `AGENTS.md`
- `.github/copilot-instructions.md`

Examples:

- project-wide coding convention
- branch or PR rule
- AI safety rule
- recurring verification rule
- reusable architecture convention

### Prompt Improvements

Use this route when the lesson improves a reusable skill.

Possible destinations:

- `.github/prompts/plan.prompt.md`
- `.github/prompts/review.prompt.md`
- `.github/prompts/reflect.prompt.md`
- `.github/prompts/e2e-test.prompt.md`

Examples:

- better planning checklist
- better review checklist
- better Cypress testing guidance
- clearer output format
- missing edge-case instruction

### Agent Improvements

Use this route when the lesson improves a specialized AI role.

Possible destination:

- `.github/agents/onboarding-reviewer.agent.md`

Examples:

- reviewer should check a new category
- reviewer should avoid a repeated false positive
- reviewer should use a stricter output format
- reviewer should better enforce onboarding scope

### Structural Enforcement

Use this route when the lesson should be encoded as tooling instead of documentation.

Examples:

- ESLint rule
- Cypress test
- package script
- build check
- CI check
- configuration validation

Prefer structural enforcement over documentation when it would reliably prevent the same issue.

### No Action

Use this route when the lesson is not durable.

Examples:

- one-time command output
- temporary confusion
- local setup issue that is already solved
- information that will become stale quickly

## Step 4 — Check for Contradictions

Before suggesting updates, check whether the new learning conflicts with existing guidance.

Look for contradictions in:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- existing prompt files
- existing agent files
- current project code

If there is a conflict:

- explain the conflict
- recommend which rule should win
- explain why

## Step 5 — Suggest Updates

Suggest exact updates only when they are useful.

For each suggested update, include:

- target file
- section
- reason
- exact Markdown to add or replace

Keep updates small.

Do not create large new documents.

Do not add a permanent rule just because something happened once.

## Step 6 — Output Format

Use this format:

```md
## Reflect Summary

Briefly summarize what was learned.

## Durable Lessons

List reusable lessons from the session.

## Suggested Updates

### 1. Target: file path

Section:

Reason:

Change:

Use this format:

    Exact Markdown to add or replace goes here.

## Structural Improvements

List lint, test, script, or config ideas that would enforce lessons better than documentation.

## No-Action Items

List things noticed but intentionally not persisted.

## Questions

List only blocking questions. If there are no blocking questions, write `None`.
```

## Interaction Rules

- Do not edit files unless the user explicitly asks.
- Do not store trivial notes.
- Do not add stale task-specific information to permanent instructions.
- Do not expose secrets, credentials, tokens, `.env` values, or private configuration.
- Prefer fewer, higher-quality updates.
- Explain why each suggested update is worth keeping.