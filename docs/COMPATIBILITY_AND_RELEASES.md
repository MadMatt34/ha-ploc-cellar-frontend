# Backend/frontend compatibility and release policy

This document is the compatibility reference for the two Ploc Cellar repositories.

## Current version baseline

The version fields currently declared by the repositories are:

| Component | Repository | Declared version | Meaning |
|---|---|---:|---|
| Home Assistant integration (backend) | [ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar) | 0.8.0 | Version in `custom_components/ploc_cellar/manifest.json` |
| Lovelace cards (frontend) | [ha-ploc-cellar-frontend](https://github.com/MadMatt34/ha-ploc-cellar-frontend) | 0.1.0 | Version in `package.json` |

These values are a **development baseline**, not a claim that corresponding GitHub Releases have been published. The repositories currently have no published release pair. The two versions are independently maintained and must not be assumed compatible solely because their numbers look related.

The current development branches are validated against the same declared inventory contract:
- Backend response shape and semantics: `tests/test_service_contract.py`.
- Frontend mirrored shape: `src/backend-inventory-contract.ts` and `src/types.ts`.
- Human-readable contract: `docs/BACKEND_CONTRACT.md` and `docs/CONTRAT_BACKEND.fr.md`.

These checks establish structural agreement. They do not replace an end-to-end test with both versions installed in a running Home Assistant instance.

## Compatibility matrix

A pair is marked **validated** only after both repositories' CI succeeds for the corresponding commits and the contract assertions agree. A live Home Assistant integration test should be recorded separately when performed.

| Backend version | Frontend version | Status | Notes |
|---|---|---|---|
| 0.8.0 development baseline | 0.1.0 development baseline | Contract-aligned; not a published release pair | Exact response keys and declared nullability are mirrored. No live cross-repository installation test is implied. |

Do not infer compatibility for older or newer versions from this row. Add a row for every published pair and record the exact backend and frontend tags.

## Change compatibility rules

1. **Backend patch release:** may fix internal behavior without changing the public `get_inventory` request/response contract or event semantics. Existing compatible frontends must continue to work.
2. **Additive response change:** update the backend implementation and exact contract tests first. The frontend must treat a new field as optional until the minimum backend version is raised. Update TypeScript types, mirrored assertions, both contract documents and tests in the same coordinated change.
3. **Behavioral or event change:** document the event name, payload, filtering rules and timing in both repositories. Add backend event tests and frontend subscription/browser tests.
4. **Breaking response change:** do not publish a backend that removes or changes a field while a released frontend still depends on it. Coordinate the backend and frontend releases and record the first compatible pair in the matrix.
5. **Version numbers:** backend and frontend versions are independent. A compatibility row, not matching version numbers, defines a supported pair.

## Release procedure

1. Complete the backend contract change and its tests; run backend CI.
2. Update the frontend types, contract assertions, consumers, translations and documentation; run frontend type-checking, unit tests, browser tests and build.
3. Review both repositories' contract documents together. Confirm that every response field, nullability rule and event is described consistently.
4. Update the version in the backend manifest and frontend package metadata according to each repository's own release history. Do not bump a version for a documentation-only or unreleased development branch unless preparing a release.
5. Create coordinated, clearly cross-linked GitHub Releases. Each release note must state the minimum compatible version of the other component and link to the compatibility matrix.
6. Publish/install the backend before the frontend when the frontend starts consuming a newly added backend capability. For a breaking contract, release the coordinated pair and do not advertise either side as independently compatible.
7. Add the exact released version pair to the matrix only after the corresponding tags exist and CI has passed. Record live-install validation separately; never imply it from type checks alone.

## Validation limits

CI verifies each repository independently. Mirrored compile-time contract assertions detect declared shape drift, but cannot prove runtime behavior of the private PLOUD service, network availability, or a live Home Assistant installation. Release notes and the matrix must distinguish automated contract validation from live integration testing.
