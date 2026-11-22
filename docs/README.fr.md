# Documentation frontend

Ce répertoire contient la documentation technique et de maintenance de Ploc Cellar Cards. Les README à la racine présentent les fonctionnalités des cartes, leur installation et le dépannage utilisateur.

## Contrat d'exécution

| Document | Contenu |
|---|---|
| [Contrat backend en français](BACKEND_CONTRACT.fr.md) | Requêtes WebSocket, sémantique des réponses, notifications de synchronisation, images et évolution coordonnée |
| [Backend contract in English](BACKEND_CONTRACT.md) | English version |
| [Compatibilité et publications](COMPATIBILITY_AND_RELEASES.fr.md) | Couples backend/frontend pris en charge, versionnement et publication coordonnée |
| [Compatibility and releases](COMPATIBILITY_AND_RELEASES.md) | English version |

## Développement

Le frontend est écrit en TypeScript et construit comme un module autonome pour les tableaux de bord Home Assistant. Les prérequis, commandes, tâches CI, artefacts générés et tests navigateur sont décrits dans [DEVELOPMENT.fr.md](DEVELOPMENT.fr.md) (version française) et [DEVELOPMENT.md](DEVELOPMENT.md) (English).

## Règles éditoriales

- Les README racine décrivent l'installation des cartes et les comportements visibles par l'utilisateur.
- Les détails WebSocket, la sémantique des champs de réponse et les règles de changement inter-dépôts restent dans les contrats backend.
- Les commandes locales et détails de CI restent dans les documents de développement.
- Les couples de versions pris en charge et la séquence de publication sont décrits uniquement dans les documents de compatibilité.
- Ne pas recopier le schéma complet de l'inventaire dans les README ni répéter les règles de publication dans le contrat backend.
- Chaque document d'information possède une version anglaise et une version française, maintenues en cohérence.
