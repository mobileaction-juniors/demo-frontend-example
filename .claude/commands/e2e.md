---
description: Run the Cypress e2e suite (starts the dev server first if needed)
---

Run the Cypress end-to-end tests for this project.

Cypress does NOT start the app — the dev server must be running at http://localhost:5173 first.

1. Check whether the dev server is already up (something listening on port 5173).
2. If it is NOT running, start `pnpm dev` in the background and wait until port 5173 responds before continuing.
3. Run the tests:
   - Directly run `pnpm test:e2e`
   - If `$ARGUMENTS` is provided, run only that spec: `pnpm exec cypress run --spec "$ARGUMENTS"`
   - Otherwise run the whole suite: `pnpm test:e2e`
4. Summarize the result: how many specs/tests passed vs failed, and for any failure show the failing assertion and the selector involved (remember: ActionKit uses `antd-*` classes, AG Grid uses `ag-*`).
5. If you started the dev server in step 2, leave it running (do not kill it) unless asked.
