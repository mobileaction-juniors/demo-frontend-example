bun# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (see `packageManager` in package.json).

- `pnpm install` — install dependencies
- `pnpm dev` — start Vite dev server
- `pnpm build` — production build
- `pnpm preview` — preview a production build locally
- `pnpm lint` — ESLint (`.vue`, `.js`, `.jsx`, `.cjs`, `.mjs`) with `--fix`

There is no test runner configured (no unit test framework, no `test` script). A `cypress/` directory exists but is untracked/unconfigured (no `cypress.config.*`, no spec files, not a dependency) — treat it as inert unless you add real Cypress setup.

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
