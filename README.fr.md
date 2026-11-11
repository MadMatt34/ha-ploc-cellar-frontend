# Cartes Ploc Cellar

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Frontend Lovelace indépendant pour l'intégration Home Assistant [Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).

[English version](README.md)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Tableau%20de%20bord-blue)](https://www.home-assistant.io/dashboards/)
[![HACS](https://img.shields.io/badge/HACS-Plugin%20Dashboard-blue)](https://www.hacs.xyz/)
[![CI frontend](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml)
[![Validation HACS](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml)
[![Licence : MIT](https://img.shields.io/badge/Licence-MIT-green.svg)](LICENSE)

## 📚 Navigation

Release compatibility and version policy: [Compatibility matrix and releases](docs/COMPATIBILITY_AND_RELEASES.md).

- [Cartes et fonctionnalités](#cartes-ploc-cellar)
- [Installation](#installation)
- [Développement et CI](#développement)
- [Contrat backend](#contrat-backend)
- [Caractéristiques des vins](#caractéristiques-des-vins)
- [Photos des vins](#photos-des-vins)
- [Typographie](#typographie-des-noms-de-vins)
- [Dépannage](#dépannage)
- [Désinstallation](#désinstallation)
- [Licence et avertissement](#licence-et-avertissement)


Ce dépôt fournit trois cartes personnalisées :

- **Vue d'ensemble Ploc Cellar** (`custom:ploc-cellar-card`) : synthèse et statistiques de la cave : stock physique et reconstitué, occupation des casiers, diagnostics du stock et graphiques en anneau par couleur, région, appellation, millésime et format de bouteille. Les répartitions des graphiques concernent les références de vins connues ; les emplacements occupés dont le vin n'est pas résolu restent inclus dans les totaux physiques globaux et sont signalés séparément.
- **Inventaire Ploc Cellar** (`custom:ploc-cellar-inventory-card`) : liste des vins avec recherche textuelle, filtres repliables par couleur, région, appellation, millésime et mets, tri, quantités et pagination. Le nombre de références affichées par page est configurable dans l’éditeur, de 10 à 200 par pas de 10 (40 par défaut). Les filtres couleur, région, appellation et millésime proposent aussi l’option **Inconnu** pour retrouver les vins dont la propriété est absente ou vide. La fiche détaillée reste accessible en sélectionnant le nom d'un vin.
- **Casiers Ploc Cellar** (`custom:ploc-cellar-rack-card`) : sélection du casier et représentation des emplacements selon les coordonnées réelles ligne/colonne de PLOUD. Chaque emplacement occupé est représenté individuellement et reprend la couleur du vin lorsqu'elle est disponible.
  L'éditeur permet de masquer la barre d'occupation du casier ; elle est affichée par défaut et sa largeur suit celle de la représentation des emplacements.

 

Chaque carte utilise le sélecteur natif d'entrée de configuration dans son éditeur et conserve son propre `config_entry_id`. Les cartes communiquent uniquement avec Home Assistant via le service WebSocket de réponse `ploc_cellar.get_inventory` fourni par l'intégration. Elles ne communiquent jamais directement avec PLOUD. L'intégration backend doit être installée et configurée au préalable.

Les cartes récupèrent l’inventaire à leur initialisation et l’actualisent automatiquement lorsque l’intégration termine une synchronisation PLOUD réussie. La notification est transmise par un événement Home Assistant associé à l’entrée de configuration sélectionnée ; aucun identifiant d’entité, polling ou rafraîchissement manuel n’est nécessaire.

## 🧩 Installation

1. Installez et configurez l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).
2. Dans HACS, ouvrez **Dépôts personnalisés**, ajoutez `MadMatt34/ha-ploc-cellar-frontend` et sélectionnez la catégorie **Dashboard**. Cette étape manuelle est nécessaire tant que le dépôt ne figure pas dans le catalogue HACS par défaut.
3. Installez **Ploc Cellar Cards** depuis HACS.
4. HACS enregistre normalement automatiquement la ressource du tableau de bord. Si vous gérez les ressources manuellement (par exemple en YAML), ajoutez cette ressource :

   ```yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ```
5. Ajoutez l'une des trois cartes depuis le sélecteur de cartes et sélectionnez l'entrée de configuration Ploc Cellar dans son éditeur.

 Dans une vue **Sections**, la carte de vue d'ensemble utilise par défaut une largeur de 12 colonnes sans imposer de hauteur de ligne. Vous pouvez activer **Adapter la hauteur au contenu** dans l'onglet **Disposition** si vous souhaitez que sa hauteur suive son contenu.

## 🧑‍💻 Développement

Node.js `^20.19.0` ou `>=22.12.0` est requis (versions prises en charge par Vite 8). Les tests d'interaction navigateur utilisent Playwright 1.65.0, version verrouillée, et Chromium.

```sh
npm ci
npm run check
npm test
npx playwright install chromium # une fois par environnement local
npm run test:e2e
npm run build
```

Le bundle de production est généré dans `dist/ploc-cellar-card.js`, puis copié à la racine sous `ploc-cellar-card.js`, nom attendu par HACS (`hacs.json`). Les deux fichiers sont versionnés. Les dépendances sont intégrées au module JavaScript autonome. Le workflow CI du frontend exécute la vérification TypeScript stricte, les tests unitaires et la compilation de production lors des push et des pull requests. Un job Chromium distinct exécute les tests d'interaction navigateur à chaque push et pull request ; la publication des bundles sur `main` attend la réussite des deux jobs. La CI impose également une limite de 800 000 octets (bundle JavaScript de production non compressé) afin de détecter toute augmentation inattendue.

## 🔗 Contrat backend

Consultez le [contrat backend](docs/CONTRAT_BACKEND.fr.md) pour la requête WebSocket, les champs de réponse, la sémantique de l'inventaire et les règles du contrat.

Le frontend dépend du service WebSocket Home Assistant `ploc_cellar.get_inventory` fourni par l'intégration. Le contrat du service et le modèle d'inventaire sont maintenus dans le [dépôt backend](https://github.com/MadMatt34/ha-ploc-cellar). Toute évolution de la réponse doit respecter les interfaces TypeScript de `src/types.ts`.

Le champ nullable `Wine.meals` contient les indicateurs d'accords mets-vins PLOUD sous forme de masque de bits brut. La [documentation du contrat backend](docs/CONTRAT_BACKEND.fr.md) présente la correspondance complète entre les bits et les catégories, les règles de combinaison et le traitement des indicateurs inconnus.

### 🔄 Actualisation automatique après synchronisation

Après son initialisation, chaque carte écoute l'événement Home Assistant `ploc_cellar_sync_completed`. Elle ne s'actualise que si le champ `config_entry_id` de l'événement correspond à l'entrée sélectionnée dans cette carte. Le backend déclenche cet événement uniquement après validation et enregistrement de la synchronisation dans l'inventaire actif.

## 🌐 Langues

Le français et l'anglais sont pris en charge.

## 🍷 Caractéristiques des vins

La modale de détail utilise des sections repliables indépendantes pour le stock, les accords mets-vins, les caractéristiques, les emplacements et les notes. Les emplacements sont regroupés dans une seule tuile par casier ; la partie connue d’une coordonnée reste affichée même si la ligne ou la colonne est absente. Les mouvements de stock disposent de leur propre sous-section repliable. Les caractéristiques sont regroupées entre origine/identification et dégustation/composition, sous forme de lignes associant une icône, un libellé et sa valeur. Les cépages sont regroupés dans un encart dédié ; les pourcentages placés avant ou après le nom du cépage sont représentés par des barres proportionnelles, teintées selon la couleur du vin. Lorsqu'un cépage ne comporte pas de pourcentage explicite, il est considéré à 100 % et représenté par une barre pleine. Les pourcentages explicites invalides restent non déterminés.

## 🖼️ Photos des vins

La fenêtre de détail d'un vin affiche la photo PLOUD mise en cache lorsque le champ `image_url` est non nul. Le backend privilégie l'image principale et utilise l'image de couverture si l'image principale n'est pas disponible localement.

Les images sont servies par une route Home Assistant authentifiée. La carte les récupère avec `hass.fetchWithAuth()` ; elle ne contacte jamais directement PLOUD et ne stocke aucun identifiant PLOUD. Le contenu reçu sous forme de blob est affiché au moyen d'une URL d'objet du navigateur. Cette URL est révoquée lorsqu'elle est remplacée ou lorsque l'élément de la fenêtre modale est déconnecté. Si le backend modifie `image_url` (y compris son paramètre de version lorsque le document PLOUD conserve le même identifiant), la carte télécharge la nouvelle image et libère l'ancienne URL d'objet.

Le champ `image_url` est nullable. Lorsqu'il vaut `null`, la fenêtre de détail reste utilisable et n'affiche simplement aucune photo.

## 🔤 Typographie des noms de vins

Les noms des vins utilisent la police Cormorant Garamond, intégrée localement (licence SIL Open Font License), dans les lignes d'inventaire, les liens de vins des diagnostics et le titre de la fiche détaillée. Les libellés des emplacements de cave et les infobulles utilisent la typographie standard de Home Assistant. Les autres textes conservent la typographie habituelle de Home Assistant. La police est intégrée à la carte : aucun service de polices externe ni accès réseau n'est nécessaire à l'exécution.


## 🔢 Typographie des chiffres

Les valeurs de la vue d’ensemble, les nombres de bouteilles par casier et les valeurs des diagnostics utilisent la police DJB Get Digital intégrée localement. Les coordonnées des emplacements de bouteilles utilisent la typographie standard de Home Assistant. Les totaux au centre des graphiques en anneau utilisent DJB Get Digital ; les légendes et les valeurs de répartition conservent la typographie standard de l’interface. DJB Get Digital est une police propriétaire intégrée avec l’autorisation du titulaire des droits ; elle n’est pas couverte par la licence logicielle de ce dépôt.


## 🛠️ Dépannage

- **Le type de carte n'est pas proposé :** vérifier que le plugin Dashboard est installé dans HACS et que la ressource `ploc-cellar-card.js` est enregistrée dans Home Assistant.
- **L'éditeur ne trouve aucune cave :** installer et configurer d'abord l'[intégration backend Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar), puis recharger l'éditeur du tableau de bord.
- **La carte affiche une erreur ou aucun inventaire :** vérifier l'entrée de configuration sélectionnée et consulter les journaux Home Assistant pour les erreurs de `ploc_cellar`.
- **La carte ne s'actualise pas après une synchronisation :** vérifier la compatibilité des versions backend et frontend et s'assurer que la carte utilise l'entrée qui vient d'être synchronisée. Les cartes n'effectuent aucun polling et ne nécessitent aucune actualisation manuelle.

Pour signaler un problème frontend, [ouvrir un ticket sur GitHub](https://github.com/MadMatt34/ha-ploc-cellar-frontend/issues/new) en précisant la version de Home Assistant, le navigateur, la version/le commit du dépôt frontend, le type de carte et les messages pertinents de la console du navigateur ou des journaux Home Assistant. Ne pas joindre d'identifiants ni de jetons d'accès.

## 🗑️ Désinstallation

1. Retirer des tableaux de bord les cartes Ploc Cellar qui y sont utilisées.
2. Dans HACS, désinstaller **Ploc Cellar Cards**.
3. Si la ressource du tableau de bord a été ajoutée manuellement, supprimer la ressource `/hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js` de la configuration des ressources.
4. Redémarrer ou recharger le tableau de bord selon le besoin.

L'intégration backend et son inventaire sont indépendants : la désinstallation des cartes ne supprime ni l'intégration Ploc Cellar ni ses données.

## ⚖️ Licence et avertissement

Ce projet est distribué sous [licence MIT](LICENSE).

Ploc Cellar Cards est un frontend indépendant pour Home Assistant. Il n'est ni affilié à PLOC ou PLOUD, ni approuvé ou pris en charge par ces services.

Le projet Ploc Cellar dans son ensemble s'appuie sur des interfaces PLOUD qui **ne constituent pas une API publique et documentée**. Le backend a été développé à partir d'un travail d'analyse technique indépendant : étude des dépôts liés à PLOUD, comparaison de fichiers de sauvegarde, analyse du comportement de l'application mobile officielle, ainsi que d'autres observations et expérimentations. Le frontend communique uniquement avec le backend Home Assistant en respectant son contrat local documenté ; il n'accède pas directement à PLOUD. Ce travail relève de la rétro-ingénierie et ne constitue pas une spécification officielle d'API ; les interfaces privées utilisées par le backend peuvent évoluer ou devenir incompatibles à tout moment et sans préavis. Le propriétaire de PLOC a été contacté afin d'échanger sur ce travail et sur l'existence éventuelle d'une interface officielle, mais aucune réponse n'avait été reçue au moment de la rédaction de cette documentation.
L'intégration backend communique avec PLOUD au moyen d'interfaces privées et non documentées. Leur fonctionnement a été reconstitué à partir de recherches techniques indépendantes et de rétro-ingénierie ; il ne s'agit pas d'un contrat d'API public ou pris en charge, et ces interfaces peuvent changer sans préavis. PLOC a été contacté au sujet de la documentation ou de la prise en charge de cet accès ; aucune réponse n'avait été reçue à la date de rédaction de cet avertissement. Les cartes elles-mêmes ne contactent pas PLOUD : elles communiquent uniquement avec l'intégration backend Home Assistant.
