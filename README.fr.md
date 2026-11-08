# Cartes Ploc Cellar

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Frontend Lovelace indépendant pour l'intégration Home Assistant [Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).

[English version](README.md)

Ce dépôt fournit trois cartes personnalisées :

- **Vue d'ensemble Ploc Cellar** (`custom:ploc-cellar-card`) : synthèse et statistiques de la cave : stock physique et reconstitué, occupation des casiers, diagnostics du stock et graphiques en anneau par couleur, région, appellation, millésime et format de bouteille. Les répartitions des graphiques concernent les références de vins connues ; les emplacements occupés dont le vin n'est pas résolu restent inclus dans les totaux physiques globaux et sont signalés séparément.
- **Inventaire Ploc Cellar** (`custom:ploc-cellar-inventory-card`) : liste des vins avec recherche textuelle, filtres repliables par couleur, région, appellation, millésime et mets, tri et quantités. Les filtres couleur, région, appellation et millésime proposent aussi l’option **Inconnu** pour retrouver les vins dont la propriété est absente ou vide. La fiche détaillée reste accessible en sélectionnant le nom d'un vin.
- **Casiers Ploc Cellar** (`custom:ploc-cellar-rack-card`) : sélection du casier et représentation des emplacements selon les coordonnées réelles ligne/colonne de PLOUD. Chaque emplacement occupé est représenté individuellement et reprend la couleur du vin lorsqu'elle est disponible.
  L'éditeur permet de masquer la barre d'occupation du casier ; elle est affichée par défaut et sa largeur suit celle de la représentation des emplacements.

L'ancien type de carte **Ploc Cellar Statistics** reste enregistré comme alias de compatibilité : les tableaux de bord utilisant `custom:ploc-cellar-statistics-card` continuent d'afficher la vue d'ensemble unifiée. Pour les nouveaux tableaux de bord, utilisez `custom:ploc-cellar-card`.

Chaque carte utilise le sélecteur natif d'entrée de configuration dans son éditeur et conserve son propre `config_entry_id`. Les cartes communiquent uniquement avec Home Assistant via le service WebSocket de réponse `ploc_cellar.get_inventory` fourni par l'intégration. Elles ne communiquent jamais directement avec PLOUD. L'intégration backend doit être installée et configurée au préalable.

Les cartes récupèrent l’inventaire à leur initialisation et proposent une actualisation manuelle. Elles n’interrogent pas périodiquement les événements de synchronisation du backend : utilisez **Actualiser** après une synchronisation PLOUD si le tableau de bord est resté ouvert.

## Installation

1. Installez et configurez l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).
2. Dans HACS, ouvrez **Dépôts personnalisés**, ajoutez `MadMatt34/ha-ploc-cellar-frontend` et sélectionnez la catégorie **Dashboard**. Cette étape manuelle est nécessaire tant que le dépôt ne figure pas dans le catalogue HACS par défaut.
3. Installez **Ploc Cellar Cards** depuis HACS.
4. HACS enregistre normalement automatiquement la ressource du tableau de bord. Si vous gérez les ressources manuellement (par exemple en YAML), ajoutez cette ressource :

   ```yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ```
5. Ajoutez l'une des trois cartes depuis le sélecteur de cartes et sélectionnez l'entrée de configuration Ploc Cellar dans son éditeur.

Les types de cartes et leurs clés de configuration existants sont conservés. Il n'est pas nécessaire de recréer les configurations de cartes lors de la migration depuis la ressource servie par l'intégration.

### Migration depuis la ressource servie par l'intégration

Si vous aviez ajouté manuellement la ressource `/ploc_cellar_static/ploc-cellar-card.js`, installez d'abord ce paquet Dashboard HACS, puis remplacez l'ancienne ressource Lovelace par celle installée par HACS. Ne chargez pas les deux modules JavaScript simultanément : ils enregistrent les mêmes types de cartes.

Dans une vue **Sections**, la carte de vue d'ensemble utilise par défaut une largeur de 12 colonnes sans imposer de hauteur de ligne. Vous pouvez activer **Adapter la hauteur au contenu** dans l'onglet **Disposition** si vous souhaitez que sa hauteur suive son contenu.

## Développement

Node.js `^20.19.0` ou `>=22.12.0` est requis (versions prises en charge par Vite 8). Les tests d'interaction navigateur utilisent Playwright 1.65.0, version verrouillée, et Chromium.

```sh
npm ci
npm run check
npm test
npx playwright install chromium # une fois par environnement local
npm run test:e2e
npm run build
```

Le bundle de production est généré dans `dist/ploc-cellar-card.js`, puis copié à la racine sous `ploc-cellar-card.js`, nom attendu par HACS (`hacs.json`). Les deux fichiers sont versionnés. Les dépendances sont intégrées au module JavaScript autonome. Le workflow CI du frontend exécute la vérification TypeScript stricte, les tests unitaires et la compilation de production lors des push et des pull requests. Un job Chromium distinct exécute les tests d'interaction navigateur à chaque push et pull request ; la publication des bundles sur `main` attend la réussite des deux jobs.

## Contrat backend

Consultez le [contrat backend](docs/CONTRAT_BACKEND.fr.md) pour la requête WebSocket, les champs de réponse, la sémantique de l'inventaire et les règles de compatibilité.

Le frontend dépend du service WebSocket Home Assistant `ploc_cellar.get_inventory` fourni par l'intégration. Le contrat du service et le modèle d'inventaire sont maintenus dans le [dépôt backend](https://github.com/MadMatt34/ha-ploc-cellar). Toute évolution de la réponse doit rester compatible avec les interfaces TypeScript de `src/types.ts`.

Le champ facultatif `Wine.meals` contient les indicateurs d'accords mets-vins PLOUD sous forme de masque de bits brut. La [documentation du contrat backend](docs/CONTRAT_BACKEND.fr.md) présente la correspondance complète entre les bits et les catégories, les règles de combinaison et le traitement des indicateurs inconnus.

## Langues

Le français et l'anglais sont pris en charge.

## Caractéristiques des vins

La modale de détail utilise des sections repliables indépendantes pour le stock, les accords mets-vins, les caractéristiques, les emplacements et les notes. Les emplacements sont regroupés dans une seule tuile par casier ; la partie connue d’une coordonnée reste affichée même si la ligne ou la colonne est absente. Les mouvements de stock disposent de leur propre sous-section repliable. Les caractéristiques sont regroupées entre origine/identification et dégustation/composition, sous forme de lignes associant une icône, un libellé et sa valeur. Les cépages sont regroupés dans un encart dédié ; les pourcentages placés avant ou après le nom du cépage sont représentés par des barres proportionnelles, teintées selon la couleur du vin. Lorsqu'un cépage ne comporte pas de pourcentage explicite, il est considéré à 100 % et représenté par une barre pleine. Les pourcentages explicites invalides restent non déterminés.

## Photos des vins

La fenêtre de détail d'un vin affiche la photo PLOUD mise en cache lorsque le backend fournit un champ `image_url` non nul. Le backend privilégie l'image principale et utilise l'image de couverture si l'image principale n'est pas disponible localement.

Les images sont servies par une route Home Assistant authentifiée. La carte les récupère avec `hass.fetchWithAuth()` ; elle ne contacte jamais directement PLOUD et ne stocke aucun identifiant PLOUD. Le contenu reçu sous forme de blob est affiché au moyen d'une URL d'objet du navigateur. Cette URL est révoquée lorsqu'elle est remplacée ou lorsque l'élément de la fenêtre modale est déconnecté. Si le backend modifie `image_url` (y compris son paramètre de version lorsque le document PLOUD conserve le même identifiant), la carte télécharge la nouvelle image et libère l'ancienne URL d'objet.

Le champ est facultatif afin de rester compatible avec les réponses d'anciennes versions du backend. S'il est absent ou nul, la fenêtre de détail reste utilisable et n'affiche simplement aucune photo.

## Typographie des noms de vins

Les noms des vins utilisent la police Cormorant Garamond, intégrée localement (licence SIL Open Font License), dans les lignes d'inventaire, les liens de vins des diagnostics et le titre de la fiche détaillée. Les libellés des emplacements de cave et les infobulles utilisent la typographie standard de Home Assistant. Les autres textes conservent la typographie habituelle de Home Assistant. La police est intégrée à la carte : aucun service de polices externe ni accès réseau n'est nécessaire à l'exécution.


## Typographie des chiffres

Les valeurs de la vue d’ensemble, les nombres de bouteilles par casier et les valeurs des diagnostics utilisent la police DJB Get Digital intégrée localement. Les coordonnées des emplacements de bouteilles utilisent la typographie standard de Home Assistant. Les totaux au centre des graphiques en anneau utilisent DJB Get Digital ; les légendes et les valeurs de répartition conservent la typographie standard de l’interface. DJB Get Digital est une police propriétaire intégrée avec l’autorisation du titulaire des droits ; elle n’est pas couverte par la licence logicielle de ce dépôt.
