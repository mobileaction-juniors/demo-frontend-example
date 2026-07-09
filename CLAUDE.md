# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Vue 3 (Composition API) + Vite, plain JS (no TypeScript), pnpm as the package manager, Pinia for state management, TailwindCSS for styling, `@mobileaction/action-kit` (ActionKit) as the UI component library, AG Grid (`ag-grid-community` + `ag-grid-vue3`) for tabular data, and Cypress for e2e tests.

## Commands

Package manager is pnpm (see `packageManager` in package.json).

- `pnpm install` — install dependencies
- `pnpm dev` — start Vite dev server
- `pnpm build` — production build
- `pnpm preview` — preview a production build locally
- `pnpm lint` — ESLint (`.vue`, `.js`, `.jsx`, `.cjs`, `.mjs`) with `--fix`
- `pnpm test:e2e` — run the Cypress e2e suite headlessly against a production-like server (starts the server, waits for it, then runs `cypress run`)
- `pnpm test:e2e:open` — run the Cypress e2e suite interactively against the dev server (`cypress open`)

Cypress is fully configured: see `cypress.config.js` and the specs under `cypress/e2e/` (`keyword-generator.cy.js`, `keyword-density.cy.js`). There is no unit test framework/`test` script — e2e coverage lives entirely in Cypress.

## Architecture

Vue 3 + Vite SPA, plain JS (no TypeScript), styled with Tailwind, using `@mobileaction/action-kit` as the UI component library.

- **Entry**: `src/main.js` creates the app, installs `ActionKit` (MobileAction's component library, registered globally via `app.use(ActionKit)`) and `vue-router`, then mounts `App.vue`.
- **Routing**: `src/router/index.js` defines routes as lazy-loaded page components under `src/pages/`. Current routes: `/` (home), `/keyword-generator`, `/keyword-density`.
- **Page structure convention**: pages that need to seed initial/sample state live as a thin wrapper (`index.vue`) around the real feature component (e.g. `pages/keyword-density/index.vue` passes a sample `initialText` prop into `KeywordDensity.vue`). The wrapper owns first-load data; the child component owns all subsequent local edits/state — don't lift state back up unnecessarily when extending a feature.
- **Path alias**: `@` maps to `src/` (configured in both `vite.config.js` and `jsconfig.json`). Prefer `@/...` imports in new code; existing files use relative imports.
- **UI components**: import ActionKit components by name from `@mobileaction/action-kit` (e.g. `MaButton`, `MaInput`, `MaSelect2`, `MaTagInput`, `MaTextarea`). These are prefixed `Ma*` and are the standard building blocks — don't hand-roll form controls that ActionKit already provides.
- **Data grids**: `ag-grid-community` + `ag-grid-vue3` (`AgGridVue`) are used for tabular results (see `KeywordDensity.vue`). Register only `AllCommunityModule` via `ModuleRegistry.registerModules(...)` — this is a Community-only setup, don't pull in Enterprise modules.
- **Text processing utilities**: `src/utils/keywordUtils.js` (`cleanInput`, `generateUniqueNGrams`) is the shared normalization/tokenization logic used by both the keyword generator and keyword density features — extend this rather than duplicating text-cleaning logic per page. Note `cleanInput` specifically strips the Turkish dotted-İ combining mark (U+0307) after NFC lowercasing, which is a deliberate i18n fix, not incidental.
- There's a second, older/unrelated text-cleaning utility pair — `src/utils/CleanDescription.js` + `src/cleanupResources.js` — with its own regexes and stop-word list (`filterArr`). This is separate from `keywordUtils.js`/`stopWords.js` and appears to predate it; don't assume the two are interchangeable or try to merge them without checking call sites first.
- **Constants**: `src/constants/stopWords.js` holds `DEFAULT_STOP_WORDS`, consumed by the keyword generator page.
- Styling is Tailwind utility classes directly in templates; `tailwind.config.cjs` adds a couple of custom utilities (`.max-h-none`, `.break-anywhere`). Component-scoped `<style scoped>` blocks with `:deep()` are used sparingly to override ActionKit's internal markup (see `KeywordGenerator.vue`).

## Branch & PR Conventions

- Task branches are named `ONB-<number>-YOUR_NAME`, created from your personal umbrella branch.
- Open PRs from a task branch into `emir_aydin_onboarding` (the umbrella branch) — not into `dev` or `master`.
- Pull the latest changes from the umbrella branch before starting a new task.

## Conventional Commits

Every commit message must follow the conventional format, e.g.:

- `feat(scope): message` — new functionality
- `fix(scope): message` — bug fix
- `test(scope): message` — test-only changes
- `docs: message` — documentation-only changes
- `chore(scope): message` — tooling/maintenance changes

## AI Usage Reminders

- You own every line. Review and understand AI-generated code before committing — it is reviewed exactly like hand-written code.
- Never paste secrets, tokens, or private credentials into any AI tool.
- Human review is still required, even when AI is used for a first-pass review.
