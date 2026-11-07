# Cartes Ploc Cellar

Frontend Lovelace indépendant pour l'intégration Home Assistant [Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).

Ce dépôt fournit trois cartes personnalisées :

- **Vue d'ensemble** (`custom:ploc-cellar-card`) : synthèse de la cave, indicateurs de stock et statistiques.
- **Inventaire** (`custom:ploc-cellar-inventory-card`) : inventaire des vins avec recherche et filtres.
- **Casiers** (`custom:ploc-cellar-rack-card`) : visualisation des emplacements et des bouteilles rangées.

Les cartes communiquent uniquement avec Home Assistant via le service WebSocket de réponse `ploc_cellar.get_inventory` fourni par l'intégration. Elles ne communiquent jamais directement avec PLOUD. L'intégration backend doit être installée et configurée au préalable.

## Installation

1. Installez **Ploc Cellar** depuis [MadMatt34/ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar) et terminez sa configuration.
2. Dans HACS, ajoutez ce dépôt comme dépôt personnalisé de catégorie **Dashboard** (tant qu'il n'est pas encore disponible dans le catalogue HACS).
3. Installez **Ploc Cellar Cards** depuis HACS.
4. HACS ajoute normalement automatiquement la ressource au tableau de bord. Si vous gérez les ressources du tableau de bord en YAML, ajoutez manuellement le module `ploc-cellar-card.js`.
5. Ajoutez l'une des trois cartes et sélectionnez la configuration Ploc Cellar dans son éditeur.

Les types de cartes et leurs clés de configuration existants sont conservés :
- `custom:ploc-cellar-card`
- `custom:ploc-cellar-inventory-card`
- `custom:ploc-cellar-rack-card`

### Migration depuis la ressource servie par l'intégration

Si vous aviez ajouté manuellement la ressource `/ploc_cellar_static/ploc-cellar-card.js`, installez d'abord ce paquet Dashboard, puis remplacez l'ancienne ressource Lovelace par celle installée par HACS. Ne chargez pas les deux modules JavaScript simultanément : ils enregistrent les mêmes types de cartes. Il n'est pas nécessaire de recréer les configurations de cartes existantes.

## Développement

Node.js 22 ou supérieur est requis.

```sh
npm ci
npm run check
npm run build
```

Le bundle de production est généré dans `dist/ploc-cellar-card.js`. Les dépendances sont intégrées au module JavaScript autonome.

## Contrat backend

Le frontend dépend du service WebSocket Home Assistant `ploc_cellar.get_inventory` fourni par l'intégration. Le contrat de ce service est maintenu dans le dépôt backend. Toute évolution de la réponse doit rester compatible avec les interfaces TypeScript de `src/types.ts`.

## Langues

Le français et l'anglais sont pris en charge.
