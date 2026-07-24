# AGENTS.md

## Purpose

This file provides provider-agnostic instructions for AI coding agents working in this repository.

Provider-specific files may exist, but this file contains the shared project rules that should stay useful across different AI tools.

## Project Overview

This repository is a Vue 3 frontend onboarding project.

The project teaches:

- Vue 3 component-based development
- Utility-first frontend structure
- Pinia state management
- Cypress E2E testing
- Code review and PR workflow
- Responsible AI-assisted development

## Tech Stack

- Vue 3
- Vite
- pnpm
- Pinia
- Tailwind CSS
- ActionKit
- AG Grid
- Cypress
- ESLint

Use `pnpm` only. Do not use `npm` or `yarn`.

## Essential Commands

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

Run Cypress E2E tests headlessly:

```bash
pnpm test:e2e
```

Open Cypress interactively:

```bash
pnpm test:e2e:open
```

## Repository Structure

Important folders:

- `src/pages` contains route-level Vue pages.
- `src/components` contains reusable Vue components.
- `src/utils` contains pure utility functions.
- `src/stores` contains Pinia stores.
- `cypress/e2e` contains Cypress E2E tests.
- `.github/prompts` contains reusable AI prompt workflows.
- `.github/agents` contains specialized AI agent definitions.

Important files:

- `src/utils/CleanDescription.js` normalizes input text.
- `src/utils/GenerateNGrams.js` generates n-grams and removes stop words.
- `src/stores/keyword.js` stores keyword-generator and keyword-density state.
- `src/pages/keyword-generator/KeywordGenerator.vue` contains the keyword generator UI.
- `src/components/KeywordDensity.vue` contains the keyword density UI and AG Grid table.
- `cypress/e2e/keyword-generator.cy.js` tests keyword generation flows.
- `cypress/e2e/keyword-density.cy.js` tests keyword density flows.

## Vue Guidelines

Use Vue 3 Composition API.

Use `<script setup>` in Vue components.

Use Pinia for shared mutable state.

Use `storeToRefs()` when destructuring reactive state or getters from a Pinia store.

Actions can be destructured directly from the store.

Example:

```js
const keywordStore = useKeywordStore();

const {
    generatorInputText,
    selectedNGrams,
    generatedKeywords
} = storeToRefs(keywordStore);

const { generateKeywords } = keywordStore;
```

## State Management Guidelines

Put shared mutable application state in Pinia stores.

Good store state examples:

- input text that should persist while navigating
- selected n-grams
- generated keyword results
- keyword density table rows

Keep UI-only configuration inside components.

Good component-only examples:

- AG Grid column definitions
- AG Grid modules
- static select options
- layout classes

## Utility Guidelines

Keep reusable business logic in `src/utils`.

Utility functions should be pure when possible.

A utility function should not depend on Vue component state, DOM state, or browser interaction.

Examples:

- cleaning text
- generating n-grams
- removing stop words
- calculating derived keyword data

## Cypress Guidelines

Cypress tests should cover real user flows.

Prefer testing what a user does and sees:

- visit a page
- type text
- click a button
- select options
- verify visible output

Use Cypress commands such as:

- `cy.visit()`
- `cy.get()`
- `cy.contains()`
- `.type()`
- `.click()`
- `.should()`

Keep each test focused on one behavior.

Avoid testing implementation details unless there is no practical user-facing selector.

## Styling Guidelines

Use Tailwind CSS utility classes.

Prefer ActionKit components for UI consistency.

Avoid custom CSS in Vue files unless Tailwind cannot reasonably express the style.

## Branch and PR Workflow

Create one branch per onboarding task.

Branch format:

```text
ONB-<task-number>-YUNUS_GUNAY
```

Example:

```text
ONB-207-YUNUS_GUNAY
```

Open onboarding PRs into:

```text
yunus_gunay_onboarding
```

Do not open onboarding PRs directly into `dev`.

Before pushing, run the relevant checks.

For normal code changes:

```bash
pnpm lint
pnpm build
```

For Cypress or user-flow changes:

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

## Commit Rules

Use conventional commit messages.

Examples:

```text
feat(keyword-generator): add n-gram generation
fix(keyword-generator): improve keyword selection UX
```

Keep commits small and focused.

Do not include unrelated changes in a task branch.

## AI Usage Rules

The developer owns every line of AI-assisted code.

AI suggestions must be reviewed, understood, and tested before committing.

AI may be used for:

- explaining code
- suggesting small refactors
- reviewing diffs
- drafting tests
- improving documentation
- identifying possible edge cases

AI must not be used for:

- committing code the developer cannot explain
- bypassing failing checks
- replacing human review
- pasting secrets, tokens, credentials, `.env` values, or private configuration
- making large unreviewed rewrites

If AI meaningfully changes code, tests, or repository configuration, disclose that usage in the PR description.

## Agent Operating Principles

Prefer understanding before editing.

Keep changes small and reviewable.

Ask for clarification when task scope is ambiguous.

Do not hide uncertainty.

Do not invent project conventions.

Follow the existing code style.

Explain what changed and why it is correct.