# Frontend documentation

This directory contains technical and maintenance documentation for Ploc Cellar Cards. The root README files focus on card capabilities, installation and user troubleshooting.

## Runtime contract

| Document | Scope |
|---|---|
| [Backend contract (English)](BACKEND_CONTRACT.md) | WebSocket requests, response schema semantics, synchronization notifications, image handling and coordinated contract changes |
| [Contrat backend (français)](CONTRAT_BACKEND.fr.md) | Version française du contrat backend |
| [Compatibility and releases](COMPATIBILITY_AND_RELEASES.md) | Supported backend/frontend pairs, versioning and coordinated publication |

## Development

The frontend source is TypeScript and is built as a standalone Home Assistant dashboard module. Development prerequisites, scripts, CI jobs, generated artifacts and browser test setup are documented in [DEVELOPMENT.md](DEVELOPMENT.md).

## Documentation ownership

- Keep card installation and user-visible behavior in the root README files.
- Keep WebSocket details, response field semantics and cross-repository change rules in the backend contract documents.
- Keep local development commands and CI implementation details in DEVELOPMENT.md.
- Keep supported version pairs and release sequencing only in COMPATIBILITY_AND_RELEASES.md.
- Avoid copying the full inventory schema into README files or repeating release rules in the backend contract.

## Documentation en français

Le [README français](../README.fr.md) décrit les cartes et leur installation. Les documents ci-dessous sont destinés à la maintenance technique.

| Document | Sujet |
|---|---|
| [Contrat backend](CONTRAT_BACKEND.fr.md) | Requête/réponse, notifications de synchronisation, images et évolution coordonnée |
| [Compatibilité et publications](COMPATIBILITY_AND_RELEASES.md) | Couples de versions, règles de compatibilité et procédure de publication |
| [Développement frontend](DEVELOPMENT.md) | Prérequis, commandes locales, artefacts générés, CI et tests navigateur |

Le contrat backend est la référence partagée avec le dépôt de l'intégration.
