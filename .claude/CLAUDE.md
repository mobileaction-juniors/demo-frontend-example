# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An onboarding project for MobileAction frontend juniors — a "keyword generator" built incrementally across tasks ONB-201…ONB-207 (see [README.md](README.md) and ONBOARDING.md). Each task is a branch; work is organized around that task list, so the app is deliberately small and evolving rather than feature-complete.

## Commands

```sh
pnpm install          # install dependencies (pnpm only — do not create package-lock.json / yarn.lock)
pnpm dev              # dev server + HMR at http://localhost:5173
pnpm build            # production build (see AG Grid note below — build behaves differently from dev)
pnpm lint             # ESLint with --fix

pnpm test:e2e         # Cypress headless — REQUIRES `pnpm dev` already running in another terminal
pnpm test:e2e:open    # Cypress interactive runner (use for writing/debugging specs)
```

Run a single spec: `pnpm exec cypress run --spec "cypress/e2e/keyword-generator.cy.js"`.
Cypress does **not** start the app — `pnpm dev` must be running first, or every test fails connecting to `localhost:5173` (the configured `baseUrl`).

## Architecture

The app is two routed pages sharing one Pinia store. There are no API calls — everything is computed in-browser from the user's textarea input.

- **`src/stores/KeywordStore.js`** is the single source of truth and owns the business logic. It holds state (`description`, `selectedNGrams`), derives everything via getters (`cleanedAndFilteredDescription`, `sections`), and imports the pure functions in `src/utils/`. Components are thin: they bind to the store via `storeToRefs` and render — they do **not** call the util functions directly.
- **Data pipeline:** textarea → store `description` → `cleanDescription` (regex clean + lowercase) → `filterDescription` (stop-word removal via `src/cleanupResources.js`) → `nGramGenerater` / `calculateKeywordDensity`. The util layer (`src/utils/`, `src/cleanupResources.js`) is pure and framework-free; keep new algorithms there, not in the store or components.
- **Cross-page state:** `KeywordGenerator` and `KeywordCountDensity` are separate routes, so they share data only through the store (not props/query params). Because a Pinia store is a singleton, state survives in-app navigation but **resets on a hard browser refresh** (it is in-memory only).
- **Derived data is always a getter (`computed`), never a manually-synced `ref`.** `sections` recomputes from `selectedNGrams` + `description`; don't store-and-set it.

## Conventions

- Composition API with `<script setup>` throughout. Setup-store syntax for Pinia (function returning members), not options syntax.
- `@/` aliases `src/` (configured in `jsconfig.json` and `vite.config.js`).
- Styling is TailwindCSS (v4, via `@tailwindcss/vite`; no `tailwind.config.js` — config is CSS-first in `src/style.css`). Prefer Tailwind utility classes over inline `style`.

## Commit messages (Conventional Commits)

Every commit uses the [Conventional Commits](https://www.conventionalcommits.org/) format, scoped by feature area:

```
type(scope): summary
```

- **type** — `feat` (new user-facing capability), `fix` (bug fix), `chore` (tooling/config/deps), `docs`, `test`, `refactor`, `style`, `perf`.
- **scope** — the feature or area touched, e.g. `keyword-generator`, `keyword-count-density`, `e2e`, `claude`. Omit only when a change is genuinely repo-wide.
- **summary** — imperative mood, lower-case, no trailing period (`add grid`, not `Added grid.`).

Examples:

```
feat(keyword-count-density): add density grid
fix(keyword-generator): reset selectedNGrams on clear
chore(claude): tighten Bash permission allowlist
test(e2e): add multi n-gram display spec
```

Keep the subject line ≤ ~72 chars; put rationale in the body when the change isn't self-explanatory.

## AG Grid (ag-grid-vue3 / ag-grid-community v36)

- `CommunityCoreModule` auto-registers on grid creation (the shell), but it does **not** include the row model. Rendering rows from an array requires registering `ClientSideRowModelModule` via `ModuleRegistry.registerModules([...])`. The dev server is lenient and may render rows without it — **a production build (`pnpm build && pnpm preview`) is the source of truth** for what's actually required. Register the minimal set of modules, not `AllCommunityModule`.
- The grid needs an explicit height on the `<AgGridVue>` element itself (e.g. `class="h-[500px]"`), not just on an ancestor, or it renders 0px tall.

## Testing selectors (important gotcha)

ActionKit wraps **ant-design-vue** but renames its CSS prefix from `ant-` to **`antd-`** (e.g. `.antd-select-item-option`, not `.ant-select-item-option`). Selecting by `.ant-*` silently matches nothing. Prefer stable hooks in this order: visible text (`cy.contains`), ARIA attributes (`[role="..."]`), then `antd-`-prefixed classes. `MaButton`/`MaTextarea` render plain `<button>`/`<textarea>`. AG Grid uses its own `ag-*` classes (`.ag-root-wrapper`, `.ag-header-cell`, `.ag-row`, `.ag-cell-value`). Vue component names (`<AgGridVue>`, `<MaSelect>`) never appear in the DOM — never select by them.
