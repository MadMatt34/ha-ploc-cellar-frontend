# Frontend development and CI

[Version française](DEVELOPMENT.fr.md)

This document is for contributors. User installation instructions are in the root [README](../README.md) and [French README](../README.fr.md).

## Toolchain

- Node.js `^20.19.0` or `>=22.12.0`, matching the Vite 8 supported runtime range.
- npm with the committed lockfile.
- Playwright 1.65.0 and Chromium for browser interaction tests.

Install dependencies with:

~~~sh
npm ci
~~~

## Local validation

Run the same focused checks used during development:

~~~sh
npm run check
npm test
npx playwright install chromium
npm run test:e2e
npm run build
~~~

The Playwright browser installation is required once per local environment. `npm run check` performs the strict TypeScript validation; `npm test` runs the unit tests; `npm run test:e2e` runs browser interaction tests.

## Build artifacts

The production build is generated at `dist/ploc-cellar-card.js` and copied to the repository root as `ploc-cellar-card.js`, the resource filename expected by HACS metadata. Both generated files are versioned. Dependencies are bundled into the standalone JavaScript module.

Do not hand-edit generated bundles. Change the source, run the build and review the generated output.

## CI responsibilities

The frontend CI workflow runs strict TypeScript checks, unit tests and a production build on pushes and pull requests. A separate Chromium job runs browser interaction tests on pushes and pull requests. On `main`, the workflow commits the generated bundles when they change.

The CI build enforces an 800,000-byte uncompressed JavaScript bundle limit to detect unexpected bundle growth.

HACS validation is handled by the repository's validation workflow. The exact workflow definitions are the source of truth if this document and CI configuration ever differ.

## Test organization

- `tests/*.test.mjs` contains focused unit and documentation checks.
- `tests/browser/` contains browser interaction tests and their fixture.
- `tests/documentation.test.mjs` checks selected documentation invariants.

Browser lifecycle regression tests repeatedly mount and disconnect all three cards, verify that synchronization listeners are released, and confirm that wine-detail Blob URLs are revoked. When changing a user-visible behavior, update the relevant unit/browser tests and both language README files. When changing the backend response or notification protocol, follow the coordinated procedure in [BACKEND_CONTRACT.md](BACKEND_CONTRACT.md) and update the compatibility policy if a supported version pair changes.

## Validation limits

Passing frontend CI validates the frontend build, declared TypeScript contract and tested browser behavior. It does not execute a live backend, prove PLOUD availability or replace an end-to-end installation test in a running Home Assistant instance.
