---
description: Create or review Cypress E2E tests for user-visible flows.
---

# E2E Test

Create or review Cypress E2E tests for this Vue 3 onboarding project.

Use `AGENTS.md` and `.github/copilot-instructions.md` as the main project context.

**Focus on user behavior. Do not test implementation details unless there is no practical alternative.**

## Step 1 — Determine the User Flow

Identify the flow being tested.

Examples:

- keyword generation after clicking the generate button
- n-gram filtering through the multi-select
- stop-word removal in generated keywords
- keyword count and density table submission
- page navigation
- form interaction
- visible error or empty-state behavior

If the flow is unclear, ask one direct clarification question.

## Step 2 — Inspect Existing Tests

Before writing a new test, inspect existing Cypress specs:

- `cypress/e2e/keyword-generator.cy.js`
- `cypress/e2e/keyword-density.cy.js`

Preserve existing style and naming patterns.

Do not duplicate coverage unless the new test checks a distinct behavior.

## Step 3 — Choose Stable Selectors

Prefer user-facing selectors:

- page headings
- labels
- placeholders
- button text
- visible result text
- table content

Use commands such as:

```js
cy.visit();
cy.get();
cy.contains();
cy.type();
cy.click();
cy.should();
```

Avoid brittle selectors based on generated classes, deep DOM structure, or library internals.

Do not add `data-cy` attributes unless the existing UI is too hard to target reliably.

## Step 4 — Write Focused Tests

Each test should cover one user behavior.

A good E2E test should clearly show:

- where the user starts
- what the user does
- what visible result proves the feature works

Avoid testing too many behaviors in one `it` block.

Avoid assertions that pass accidentally.

## Step 5 — Assertion Quality

Use exact matching when substring matching could be misleading.

Good:

```js
cy.contains(/^quick$/).should('exist');
```

Risky when exact text matters:

```js
cy.contains('quick').should('exist');
```

The second version can also match `quick brown`, `quick fox`, or longer text.

For table tests, scope assertions when useful:

```js
cy.get('.ag-root-wrapper').within(() => {
    cy.contains(/^fox$/).should('exist');
    cy.contains(/^2$/).should('exist');
    cy.contains(/^50%$/).should('exist');
});
```

## Step 6 — Edge Cases

Consider whether the flow needs coverage for:

- duplicate words
- punctuation cleanup
- uppercase/lowercase normalization
- Turkish `İ` normalization
- stop-word removal
- empty input
- repeated button clicks
- selected vs unselected n-gram groups
- exact keyword matching

Only add edge-case tests that are relevant to the task.

## Step 7 — Verification

For Cypress changes, run:

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

For debugging, use:

```bash
pnpm test:e2e:open
```

## Step 8 — Output Format

Use this format:

```md
## Flow Covered

Explain the user flow being tested.

## Existing Coverage

Mention whether existing tests already cover related behavior.

## Proposed Test

Provide the Cypress test.

## Why These Assertions Work

Explain what the assertions prove.

## Selector Risk

Mention any selector that may be fragile.

## Verification

List commands to run.
```

## Interaction Rules

- Do not change application behavior unless explicitly asked.
- Do not add unnecessary dependencies.
- Do not suggest `npm` or `yarn`.
- Do not rely on implementation details when a user-visible selector works.
- Do not claim the test passes unless it has actually been run.