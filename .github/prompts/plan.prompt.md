---
description: Create a phased implementation plan before coding. Planning only — does not implement.
---

# Plan

Produce a clear implementation plan grounded in this repository's AI-agent rules.

Use `AGENTS.md` and `.github/copilot-instructions.md` as the main context.

**Do NOT implement anything. The plan is the deliverable.**

## Step 0 — Triage Complexity

Before writing a full plan, assess whether the task actually needs one.

### Trivially small task

If the task affects only 1-2 files and has an obvious approach:

- Say the task probably does not need a full plan.
- Suggest implementing directly.
- Stop there.
- Do not implement.

### Needs planning

Proceed with the full planning workflow if:

- The change spans 3+ files.
- The change introduces a new pattern, workflow, dependency, or architecture.
- The task has unclear scope.
- There are multiple reasonable approaches.
- The user explicitly asks for a plan.

## Step 1 — Load Project Rules

Read the relevant project guidance before planning:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- related files in the area being changed

Use these rules throughout the plan.

Do not invent project conventions.

Do not use memorized assumptions when repository files are available.

## Step 2 — Define Scope and Constraints

Clarify the task before planning.

Identify:

- what is in scope
- what is out of scope
- affected pages, components, stores, utilities, tests, and config files
- whether new dependencies are needed
- what "done" means
- which verification commands are required

If there is blocking ambiguity, ask a direct question with concrete options.

If the request is clear, state the assumed scope and continue.

## Step 3 — Explore Existing Context

Inspect the relevant repository files before proposing changes.

For this project, usually check:

- Vue pages in `src/pages`
- reusable components in `src/components`
- pure logic in `src/utils`
- Pinia stores in `src/stores`
- Cypress tests in `cypress/e2e`
- package/config files when dependencies or tooling are affected

For larger tasks, separate the exploration by area:

- UI structure
- state ownership
- utility logic
- tests
- build/lint configuration

## Step 4 — Check Existing Patterns

Before proposing changes, identify the existing pattern to preserve.

Check whether the task should use:

- Vue 3 Composition API
- `<script setup>`
- Pinia setup stores
- `storeToRefs()`
- ActionKit components
- Tailwind CSS utility classes
- AG Grid community table patterns
- Cypress E2E user-flow tests

Prefer following existing patterns over introducing new ones.

## Step 5 — Consider Alternatives

For non-trivial design choices, briefly compare 2-3 approaches.

For each approach, mention:

- benefit
- drawback
- affected files
- verification cost

Choose the simplest approach that satisfies the task.

Prefer subtracting complexity before adding new abstractions.

## Step 6 — Write the Plan

Write the plan in phases.

Each phase should be small and reviewable.

Prefer phases that touch only 1-3 files when possible.

Each phase should include:

- goal
- files affected
- high-level changes
- verification

Do not include full code unless the user explicitly asks.

Do not write pseudocode that hides important design choices.

## Step 7 — Verification Strategy

Verification must prove the change works.

For normal code changes, include:

```bash
pnpm lint
pnpm build
```

For Cypress or user-flow changes, include:

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

For UI changes, also include a manual verification path:

- start the app
- open the affected page
- exercise the changed user flow
- confirm the expected visual result

## Step 8 — Output Format

Use this format:

```md
## Task Understanding

Summarize the task in one or two sentences.

## Scope

### In Scope

List what should be changed.

### Out of Scope

List what should not be changed.

## Files to Inspect

List files that should be checked before implementation.

## Existing Patterns to Preserve

List relevant project patterns.

## Alternatives Considered

Compare possible approaches if the task is non-trivial.

## Proposed Plan

### Phase 1 — Name

Goal:

Files affected:

Changes:

Verification:

### Phase 2 — Name

Goal:

Files affected:

Changes:

Verification:

## Final Verification

List the commands and manual checks.

## Questions

List only blocking questions. If there are no blocking questions, write `None`.
```

## Interaction Rules

Do not implement the task.

Do not edit files.

Do not suggest unrelated cleanup.

Do not suggest destructive git commands.

Do not suggest `npm` or `yarn`.

Stop after presenting the plan.