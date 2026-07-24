# GitHub Copilot Instructions

For ONB-207, this repository uses GitHub Copilot as the AI coding agent.

For provider-agnostic project rules, also follow `AGENTS.md`.

## Project Context

This is a Vue 3 frontend onboarding project built with Vite and pnpm.

Main stack:

- Vue 3
- Vite
- pnpm
- Pinia
- Tailwind CSS
- ActionKit
- AG Grid
- Cypress
- ESLint

## Commands

Use `pnpm` only.

Common commands:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test:e2e
pnpm test:e2e:open
```

Do not suggest `npm install`, `npm run`, `yarn`, `package-lock.json`, or `yarn.lock`.

## Code Style

Use Vue 3 Composition API.

Use `<script setup>` for Vue components.

Use Pinia for shared mutable state.

Use `storeToRefs()` for destructured store state and getters.

Keep reusable pure logic in `src/utils`.

Keep UI-only configuration inside components.

Use Tailwind CSS utility classes for styling.

Use ActionKit components where possible.

Prefer clear code over clever abstractions.

## Testing Style

Use Cypress for E2E user-flow tests.

Keep each E2E test focused on one behavior.

Prefer selectors based on visible user-facing behavior:

- page text
- labels
- placeholders
- buttons
- table content

Avoid brittle DOM selectors unless there is no better option.

For Cypress changes, run:

```bash
pnpm test:e2e
```

## Git and PR Rules

Branch format:

```text
ONB-<task-number>-YUNUS_GUNAY
```

Open onboarding PRs into:

```text
yunus_gunay_onboarding
```

Do not open onboarding PRs directly into `dev`.

Use conventional commits.

Examples:

```text
feat(keyword-generator): add n-gram generation
fix(keyword-generator): improve keyword selection UX
```

## AI Safety Rules

Do not ask for or expose secrets, tokens, credentials, `.env` files, private config, or private company data.

Do not suggest destructive git commands.

Do not make large rewrites without a clear reason.

AI output is only a suggestion. The developer must review, understand, and verify every change.

Human review is still mandatory.