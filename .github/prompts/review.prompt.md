---
description: Review code changes, plans, or PRs for correctness, scope, and project-rule compliance.
---

# Review

Review code changes, plans, or PRs using this repository's AI-agent rules.

Use `AGENTS.md` and `.github/copilot-instructions.md` as the main project context.

**Do NOT make changes. The review is the deliverable.**

## Step 1 — Load Project Context

Read the relevant project guidance first:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- existing prompt files if relevant
- existing agent files if relevant

Use these files to ground review judgments.

Do not invent project conventions.

Do not approve a change only because it looks reasonable.

## Step 2 — Determine Review Scope

Infer what should be reviewed from the user request.

Possible review targets:

- current branch diff
- specific changed files
- a plan
- a PR description
- Cypress tests
- Vue component changes
- Pinia store changes
- utility function changes
- configuration changes
- AI workflow files

If the target is genuinely ambiguous, ask one direct clarification question.

Otherwise, state the assumed scope and continue.

## Step 3 — Classify Change Size

Classify the review as small or big.

### Small Change

Use this mode when:

- fewer than 3 files changed
- no new architecture was introduced
- behavior is local and easy to inspect

For small changes, keep feedback short and focus on the most important issue in each category.

### Big Change

Use this mode when:

- 3 or more files changed
- new architecture or workflow was introduced
- new dependencies were added
- state management changed
- tests or configuration changed across multiple areas

For big changes, review by category and be stricter about scope, verification, and maintainability.

## Step 4 — Gather Context

Inspect the files needed to understand the change.

Common files to check:

- changed Vue files
- changed Pinia stores
- changed utilities
- changed Cypress specs
- `package.json`
- config files changed by the branch
- `AGENTS.md`
- `.github/copilot-instructions.md`

For task branches, check whether the changes match the onboarding task scope.

Do not review files in isolation when related files are necessary to understand behavior.

## Step 5 — Assessment Pipeline

Work through these sections in order.

### 1. Scope Check

Check:

- Does the change match the onboarding task?
- Are unrelated files changed?
- Is the branch name consistent with `ONB-<task-number>-YUNUS_GUNAY`?
- Should the PR target `yunus_gunay_onboarding`?
- Are task-specific changes kept out of permanent instructions when they would become stale?

### 2. Architecture

Check:

- Are responsibilities placed in the correct layer?
- Is shared mutable state placed in Pinia when needed?
- Is UI-only configuration kept inside components?
- Are utility functions pure and reusable?
- Are new abstractions necessary?
- Is the solution simpler than the alternatives?
- Does the change preserve existing project patterns?

### 3. Vue and State Quality

Check:

- Vue 3 Composition API is used.
- `<script setup>` is used.
- `storeToRefs()` is used when destructuring store state or getters.
- Store actions are used for business actions.
- Reactive state is not accidentally destructured incorrectly.
- Component code remains readable.

### 4. UI and Styling

Check:

- ActionKit components are used where appropriate.
- Tailwind CSS utility classes are preferred.
- Custom CSS is avoided unless justified.
- Layout remains readable and responsive.
- UI behavior matches user expectations.

### 5. Cypress and Tests

Check:

- New user-visible behavior has E2E coverage.
- Tests assert outcomes, not implementation details.
- Selectors are reasonably stable.
- Exact text assertions are used when substring matches could be misleading.
- Tests are focused and readable.
- `pnpm test:e2e` should pass for Cypress or user-flow changes.

### 6. Tooling and Dependencies

Check:

- `pnpm` is used.
- No `package-lock.json` or `yarn.lock` is introduced.
- New dependencies are justified.
- Build and lint commands are updated only when needed.
- Configuration changes are scoped and explainable.

### 7. AI Safety

Check:

- No secrets, credentials, tokens, `.env` values, or private config are included.
- AI usage is disclosed when it meaningfully changed code, tests, or repository configuration.
- The developer can explain the change.
- Human review is still required.
- AI-generated suggestions are not treated as automatically correct.

## Step 6 — Issue Format

Number each issue.

For every issue, include:

- severity
- location
- problem
- why it matters
- options
- recommended fix

Use this severity guide:

### High

Blocks acceptance.

Examples:

- incorrect behavior
- missing tests for required new behavior
- unrelated risky changes
- secrets or private config included
- wrong PR target
- major scope violation

### Medium

Should be fixed if practical.

Examples:

- confusing state ownership
- avoidable duplication
- weak test assertion
- brittle selector
- unnecessary dependency
- unclear AI disclosure

### Low

Optional improvement.

Examples:

- minor wording issue
- small readability improvement
- documentation clarity
- naming consistency

## Step 7 — Options Format

When giving a fix, provide options if there is more than one reasonable path.

Use this format:

```md
Options:

A. Recommended option
- Effort:
- Risk:
- Impact:
- Maintenance:

B. Alternative option
- Effort:
- Risk:
- Impact:
- Maintenance:
```

If there is only one obvious fix, provide only the recommended fix.

## Step 8 — Verdict

End with one verdict.

Use:

- **Accept**: no blocking issues, scope is clean, verification is clear
- **Accept with notes**: only low-severity issues exist
- **Revise**: high-severity issues exist, or multiple medium issues make the change risky

## Step 9 — Output Format

Use this format:

```md
## Review Summary

Briefly explain what was reviewed.

## Scope Check

State whether the change appears focused on the task.

## Issues

### 1. Severity: high | medium | low

Location:

Problem:

Why it matters:

Options:

A. Recommended option
- Effort:
- Risk:
- Impact:
- Maintenance:

Recommended fix:

## Verification

List commands that should be run.

## AI Disclosure

Say whether AI usage should be mentioned in the PR description.

## Verdict

Accept, Accept with notes, or Revise.
```

## Interaction Rules

- Do not edit files.
- Do not suggest destructive git commands.
- Do not approve code only because tests pass.
- Do not invent project conventions.
- Do not request or expose secrets, credentials, tokens, `.env` values, or private configuration.
- When uncertain, say what needs to be checked.
- Present all findings together.
- Ask for feedback once at the end if a direction choice is needed.