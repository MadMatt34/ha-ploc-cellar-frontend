# Frontend documentation

[Version française](README.fr.md)

This directory contains technical and maintenance documentation for Ploc Cellar Cards. The root README files focus on card capabilities, installation and user troubleshooting.

## Runtime contract

| Document | Scope |
|---|---|
| [Backend contract](BACKEND_CONTRACT.md) / [français](CONTRAT_BACKEND.fr.md) | WebSocket requests, response schema semantics, synchronization notifications, image handling and coordinated contract changes |
| [Contrat backend (français)](CONTRAT_BACKEND.fr.md) | Version française du contrat backend |
| [Compatibility and releases](COMPATIBILITY_AND_RELEASES.md) / [français](COMPATIBILITY_AND_RELEASES.fr.md) | Supported backend/frontend pairs, versioning and coordinated publication |

## Development

The frontend source is TypeScript and is built as a standalone Home Assistant dashboard module. Development prerequisites, scripts, CI jobs, generated artifacts and browser test setup are documented in [DEVELOPMENT.md](DEVELOPMENT.md) / [version française](DEVELOPMENT.fr.md).

## Documentation ownership

- Keep card installation and user-visible behavior in the root README files.
- Keep WebSocket details, response field semantics and cross-repository change rules in the backend contract documents.
- Keep local development commands and CI implementation details in DEVELOPMENT.md.
- Keep supported version pairs and release sequencing only in COMPATIBILITY_AND_RELEASES.md.
- Avoid copying the full inventory schema into README files or repeating release rules in the backend contract.
- Every information document has English and French versions; keep both aligned.
