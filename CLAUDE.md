# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is MobileAction's frontend onboarding project for junior engineers. It's a small Vue app (a
"keyword generator" tool) built incrementally across tasks ONB-201 through ONB-207, each tracked
in [ONBOARDING.md](ONBOARDING.md). The task list there documents the intended scope/definition-of-done
for each feature area — check it before assuming a "missing" feature is unintentional.

## Commands

```sh
pnpm install         # install dependencies
pnpm dev             # start Vite dev server with hot reload (http://localhost:5173)
pnpm build           # production build
pnpm preview         # preview the production build
pnpm lint            # ESLint over .vue/.js/.jsx/.cjs/.mjs, with --fix
pnpm test:e2e        # run Cypress headless (requires the dev server running separately — Cypress does not start it)
pnpm test:e2e:open   # open the Cypress interactive runner
```

To run a single Cypress spec headless: `pnpm exec cypress run --spec cypress/e2e/keyword-generator.cy.js`.

Package manager is **pnpm** (see `packageManager` in package.json) — never commit `package-lock.json` or
`yarn.lock`.

## Architecture

**Stack:** Vue 3 (Composition API, `<script setup>`), Vite, Vue Router, Pinia, TailwindCSS v4,
[ActionKit](https://mobileaction.github.io/action-kit/) (MobileAction's component library, prefixed
`Ma*`, e.g. `MaTextInput`, `MaSelect`, `MaButton`, `MaBadge`, `MaTextarea`), AG Grid Community
(`ag-grid-vue3`), Cypress for e2e.

Plugins are registered globally in `src/main.js` in this order: Pinia → ActionKit → Router.
`@` resolves to `./src` (configured in both `vite.config.js` and `jsconfig.json`).

**State lives in Pinia stores, not components.** Each store in `src/stores/` uses the setup-function
(Composition API) form of `defineStore` and owns one slice of state:
- `UserInput` — the raw text the user typed/pasted
- `NGramLimit` — the max n-gram size supported (currently fixed at 10)
- `SelectedNGrams` — which n-gram sizes are shown, plus derived `nGramSelectOptions` /
  `formattedSelectedNGrams` getters
- `GeneratedKeywords` — holds the last-generated keyword map and exposes a `generate()` action that
  pulls from `UserInput`/`NGramLimit`, cleans the input, and calls the `utils/` generation functions

Stores compose each other directly (e.g. `SelectedNGrams` reads `NGramLimit`; `GeneratedKeywords`
reads `UserInput` and `NGramLimit`) rather than components wiring stores together. Generation is
explicit/on-demand — a button click calls a store action; nothing regenerates automatically on
keystroke.

**Pure logic lives in `src/utils/` as small, independently testable functions**, kept out of
components: `CleanInput.js` (normalize text), `GenerateNGram.js` (n-gram generation for a single n,
stop-word filtered, deduped via `Set`), `GenerateKeywords.js` (builds the full n=1..limit map),
`StopWords.js` (the stop-word list, kept isolated so it's easy to extend), `ComputeKeywordCounts.js`
and `ComputeDensity.js` (word frequency / percentage for the density table).

**Pages** (`src/pages/`, routed via `src/router/index.js`, lazy-loaded):
- `index.vue` — onboarding landing page
- `keyword-generator/KeywordGenerator.vue` — the main flow: text input → n-gram multi-select →
  generated keyword tags, and embeds the `KeywordDensity` component below it

`src/components/KeywordDensity.vue` takes text from the shared `UserInput` store, computes counts/density
on submit, and renders results in an AG Grid table (`ag-theme-quartz`). It's designed mobile-first with
Tailwind responsive classes (table stacks below the input on small screens; nothing exceeds viewport width).

**Styling:** TailwindCSS only — `src/main.css` is just `@import "tailwindcss"`, loaded via the
`@tailwindcss/vite` plugin. Avoid adding custom CSS/`<style>` blocks; use Tailwind utility classes.
`browserslist` in package.json is pinned to `last 2 years`.

**Testing:** Cypress e2e specs live in `cypress/e2e/`. Tests select elements via `data-cy` attributes
(not CSS classes or text), so any new interactive element should get a `data-cy` attribute if it needs
to be covered by a test. `cypress.config.js` sets `baseUrl: 'http://localhost:5173'` and disables the
support file.

## Conventions

- Branch model: personal umbrella branch off `dev` (`name_surname_onboarding`), then a task branch off
  the umbrella branch per task (`ONB-<number>-YOUR_NAME`). PRs target the **umbrella branch**, not `dev`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/), scoped to the
  feature area, e.g. `feat(keyword-generator): add n-gram generation`, `fix(keyword-generator): ...`.
- ESLint config (`.eslintrc.cjs`) extends `plugin:vue/vue3-essential` + `eslint:recommended`, with
  `vue/multi-word-component-names` turned off (single-word component/page names like `App.vue`,
  `index.vue` are allowed).

## AI usage rules (from ONBOARDING.md, ONB-207)

- The developer owns every line of AI-generated code — review and understand it before committing; it
  is held to the same review bar as hand-written code.
- Never paste secrets, tokens, or private credentials into any AI tool.
- Commit messages generated by AI must still follow the Conventional Commits format above.
