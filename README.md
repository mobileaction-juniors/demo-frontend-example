# demo-frontend-example

Onboarding project for MobileAction frontend juniors. The goal is to learn component-based Vue development, our code review process, and how we use AI tooling — by building a keyword generator step by step.

The full task list and workflow live in [ONBOARDING.md](ONBOARDING.md).

## Tech Stack

- [Vue 3](https://vuejs.org/) (Composition API preferred)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [ActionKit](https://mobileaction.github.io/action-kit/) — MobileAction's component library (added during the tasks)
- Package manager: **pnpm** (do not commit a `package-lock.json` or `yarn.lock`)

## Getting Started

```sh
pnpm install   # install dependencies
pnpm dev       # start dev server with hot reload
pnpm build     # production build
pnpm lint      # lint and auto-fix with ESLint
```

## Project Structure

```
src/
├── App.vue
├── main.js
├── components/        # shared components
├── pages/
│   ├── index.vue
│   └── keyword-generator/   # ONB-201+ work happens here
├── router/
└── utils/             # cleaning / n-gram utility functions
```

## Branching & Workflow

1. Create a personal umbrella branch from `dev`: `name_surname_onboarding`
2. For each task, branch off your umbrella branch: `ONB-<number>-YOUR_NAME`
3. Open PRs from the task branch **into your umbrella branch** (not `dev`)
4. Pull your umbrella branch before starting each new task
5. Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format, e.g. `feat(keyword-generator): add n-gram generation`

## Tasks Overview

| Task | Summary |
|------|---------|
| ONB-201 | Keyword generator — core n-gram generation (1–3 grams, deduplicated) |
| ONB-202 | UX improvements — n-gram multi-select (1–10), stop-word removal, ActionKit text area & tags |
| ONB-203 | CSS improvement — browserslist, TailwindCSS migration, ActionKit button with icon |
| ONB-204 | Keyword count & density component — props-driven, responsive AG Grid table |
| ONB-205 | State management — move shared state into a Pinia store |
| ONB-206 | E2E testing — cover the main flows with Cypress |
| ONB-207 | AI-assisted development — configure Claude Code / agents, `CLAUDE.md`, usage rules |

See [ONBOARDING.md](ONBOARDING.md) for the detailed steps and definition of done for each task.
