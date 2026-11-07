# Cartes Ploc Cellar

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Frontend Lovelace indépendant pour l'intégration Home Assistant [Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).

[English version](README.md)

Ce dépôt fournit trois cartes personnalisées :

- **Vue d'ensemble Ploc Cellar** (`custom:ploc-cellar-card`) : synthèse et statistiques de la cave : stock physique et reconstitué, occupation des casiers, diagnostics du stock et graphiques en anneau par couleur, région, appellation, millésime et format de bouteille. Les répartitions des graphiques concernent les références de vins connues ; les emplacements occupés dont le vin n'est pas résolu restent inclus dans les totaux physiques globaux et sont signalés séparément.
- **Inventaire Ploc Cellar** (`custom:ploc-cellar-inventory-card`) : liste des vins avec recherche, filtres par couleur, région, appellation et millésime, tri, quantités et détails dépliables.
- **Casiers Ploc Cellar** (`custom:ploc-cellar-rack-card`) : sélection du casier et représentation des emplacements selon les coordonnées réelles ligne/colonne de PLOUD. Chaque emplacement occupé est représenté individuellement et reprend la couleur du vin lorsqu'elle est disponible.

L'ancien type de carte **Ploc Cellar Statistics** reste enregistré comme alias de compatibilité : les tableaux de bord utilisant `custom:ploc-cellar-statistics-card` continuent d'afficher la vue d'ensemble unifiée. Pour les nouveaux tableaux de bord, utilisez `custom:ploc-cellar-card`.

Chaque carte utilise le sélecteur natif d'entrée de configuration dans son éditeur et conserve son propre `config_entry_id`. Les cartes communiquent uniquement avec Home Assistant via le service WebSocket de réponse `ploc_cellar.get_inventory` fourni par l'intégration. Elles ne communiquent jamais directement avec PLOUD. L'intégration backend doit être installée et configurée au préalable.

## Installation

1. Installez et configurez l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).
2. Dans HACS, ouvrez **Dépôts personnalisés**, ajoutez `MadMatt34/ha-ploc-cellar-frontend` et sélectionnez la catégorie **Dashboard**. Cette étape manuelle est nécessaire tant que le dépôt ne figure pas dans le catalogue HACS par défaut.
3. Installez **Ploc Cellar Cards** depuis HACS.
4. HACS enregistre normalement automatiquement la ressource du tableau de bord. Si vous gérez les ressources manuellement (par exemple en YAML), ajoutez cette ressource :\n\n   ```yaml\n   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js\n   type: module\n   ```
5. Ajoutez l'une des trois cartes depuis le sélecteur de cartes et sélectionnez l'entrée de configuration Ploc Cellar dans son éditeur.

Les types de cartes et leurs clés de configuration existants sont conservés. Il n'est pas nécessaire de recréer les configurations de cartes lors de la migration depuis la ressource servie par l'intégration.

### Migration depuis la ressource servie par l'intégration

Si vous aviez ajouté manuellement la ressource `/ploc_cellar_static/ploc-cellar-card.js`, installez d'abord ce paquet Dashboard HACS, puis remplacez l'ancienne ressource Lovelace par celle installée par HACS. Ne chargez pas les deux modules JavaScript simultanément : ils enregistrent les mêmes types de cartes.

Dans une vue **Sections**, la carte de vue d'ensemble utilise par défaut une largeur de 12 colonnes sans imposer de hauteur de ligne. Vous pouvez activer **Adapter la hauteur au contenu** dans l'onglet **Disposition** si vous souhaitez que sa hauteur suive son contenu.

## Développement

Node.js 22 ou supérieur est requis.

```sh
npm ci
npm run check
npm run build
```

Le bundle de production est généré dans `dist/ploc-cellar-card.js`. Les dépendances sont intégrées au module JavaScript autonome. Le workflow CI du frontend exécute la vérification TypeScript stricte et la compilation de production lors des push et des pull requests ; sur `main`, il commit le bundle généré lorsqu'il change.

## Contrat backend

Consultez le [contrat backend](docs/CONTRAT_BACKEND.fr.md) pour la requête WebSocket, les champs de réponse, la sémantique de l'inventaire et les règles de compatibilité.

Le frontend dépend du service WebSocket Home Assistant `ploc_cellar.get_inventory` fourni par l'intégration. Le contrat du service et le modèle d'inventaire sont maintenus dans le [dépôt backend](https://github.com/MadMatt34/ha-ploc-cellar). Toute évolution de la réponse doit rester compatible avec les interfaces TypeScript de `src/types.ts`.

## Langues

Le français et l'anglais sont pris en charge.
