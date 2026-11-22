# Cartes Ploc Cellar pour Home Assistant

![Ploc Cellar for Home Assistant](docs/banner.png)

[![Latest Release](https://img.shields.io/github/v/release/MadMatt34/ha-ploc-cellar-frontend?color=green)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/releases)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Tableau%20de%20bord-blue)](https://www.home-assistant.io/dashboards/)
[![Marketplace](https://img.shields.io/badge/Marketplace-Tableau%20de%20bord-blue)](https://www.hacs.xyz/)
\
[![Frontend CI](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml)
[![Validation HACS](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml)
![Licence : MIT](https://img.shields.io/badge/Licence-MIT-green.svg)

[❗ README in ENGLISH 🇬🇧 ❗](README.md)

Frontend Lovelace indépendant pour Home Assistant, destiné à l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).\
🍷❤️

---

## 📦 Cartes fournies

### - 📊 Vue d'ensemble (`custom:ploc-cellar-card`)

Synthèse et statistiques de la cave : stock physique et reconstitué, occupation des casiers, diagnostics du stock et graphiques de répartition par couleur, région, appellation, millésime et format de bouteille.\
Les graphiques couvrent les références de vins connues ; les emplacements occupés dont le vin n'est pas résolu restent inclus dans les totaux physiques globaux et sont signalés séparément.

![Screen card](docs/screenshots/screen.png)

### - 🗃️ Inventaire (`custom:ploc-cellar-inventory-card`)

Liste de vins avec recherche, tri et pagination, filtres par couleur, région, appellation, millésime et accords mets-vins.\
Les filtres couleur, région, appellation et millésime proposent **Inconnu** pour retrouver les fiches incomplètes.\
La sélection d'un nom de vin ouvre sa fiche détaillée.

### - 🏷️ Casier (`custom:ploc-cellar-rack-card`)

Sélection du casier et plan des emplacements selon les coordonnées. Chaque emplacement occupé est représenté individuellement et reprend la couleur du vin lorsqu'elle est disponible.\
Sur les écrans de taille réduite, le plan passe automatiquement en grille compacte adaptée au tactile. Sur mobile, un premier toucher affiche l'infobulle de la bouteille ; un second toucher sur le même emplacement ouvre sa fiche détaillée.

### - 🍷 Fiche vin

La fiche détaillée du vin présente des sections pour les caractéristiques, les accords mets-vins, les notes, les emplacements, et le stock.\
Les mouvements de stock disposent d'une sous-section dédiée permettant d'identifier les anomalies.

---

## 📋 Prérequis

[x] ==L'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar) doit être installée et configurée dans Home Assistant.==

[x] Un navigateur pris en charge par l'interface Home Assistant est nécessaire.

---

## 🧩 Installation

### Option 1 : Installation via Marketplace (📌 recommandée)

1. Ouvrir le plugin de tableau de bord **Ploc Cellar Cards** dans **Marketplace** dans Home Assistant\
    [![Open your Home Assistant instance and open a repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=MadMatt34&repository=ha-ploc-cellar-frontend)
2. Cliquer sur **Installer**, puis passer aux étapes de configuration.

### Option 2 : Installation manuelle

1. Télécharger `dist/ploc-cellar-card.js` de ce dépôt.
2. Copier ce fichier dans `/config/community/ha-ploc-cellar-frontend/`.
3. Aller dans **Paramètres** → **Tableaux de bord**.\
   Cliquer sur le menu ⋮ avec trois points (en haut à droite). Puis, choisir **Ressources**.\
   [![Open your Home Assistant instance and show your dashboard resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)
4. Cliquer sur le bouton **Ajouter une ressource** (en bas à droite).
5. Saisir l'**URL** `/local/community/ha-ploc-cellar-frontend/ploc-cellar-card.js`.\
   Choisir **Module JavaScript**.\
   Puis cliquer sur **Créer**.
6. Passer aux étapes de configuration.

> [!NOTE]
> Lors d'une mise à jour, remplacer le fichiers et ajouter ou incrémenter le numéro de version dans l'URL de la ressource, par exemple `/local/community/ha-ploc-cellar-frontend/ploc-cellar-card.js?v=2.0.0`, afin que les navigateurs chargent les nouveaux fichiers.

---

## ⚙️ Configuration des cartes

Ajouter une carte Ploc Cellar depuis le sélecteur de cartes du tableau de bord.\
Choisir l'entrée d'intégration souhaitée, et éventuellement un titre de carte.

### - 📊 Edition de la carte 'Vue d'ensemble' (`custom:ploc-cellar-card`)

L'éditeur Vue d'ensemble regroupe l'occupation, les diagnostics et les statistiques dans des sections dépliables. Les diagnostics et les statistiques possèdent chacun des options dépendantes, affichées uniquement lorsque la fonctionnalité correspondante est activée.

![Main card edit](docs/screenshots/main-card-edit.fr.png)

### - 🗃️ Edition de la carte 'Inventaire' (`custom:ploc-cellar-inventory-card`)

L'éditeur Inventaire regroupe les options générales et d'affichage.

![Inventory card edit](docs/screenshots/inventory-card-edit.fr.png)

### - 🏷️ Edition de la carte 'Casier' (`custom:ploc-cellar-rack-card`)

L'éditeur Casier regroupe les réglages généraux, le format de sélection du casier et les options d'en-tête ; l'option de barre d'occupation n'apparaît que si l'en-tête est activé.

![Rack card edit](docs/screenshots/rack-card-edit.fr.png)

---

## 🔄 Actualisation automatique

Les cartes chargent l'inventaire à leur initialisation puis s'actualisent après une synchronisation backend réussie. Elles s'abonnent à la notification WebSocket `ploc_cellar/subscribe_sync`, propre à l'entrée de configuration, puis relisent l'inventaire via `ploc_cellar.get_inventory`. La notification ne contient aucune donnée de cave ; elle sert uniquement de signal d'actualisation. Aucun polling, rafraîchissement manuel ou identifiant d'entité n'est nécessaire. Chaque carte ne reçoit que les notifications de l'entrée sélectionnée.

> [!NOTE]
> Les cartes communiquent uniquement avec Home Assistant. Elles ne se connectent pas à PLOUD et ne stockent aucun identifiant PLOC.

## 🌐 Langues et présentation

Le français et l'anglais sont pris en charge, selon la langue de Home Assistant. Les noms de vins utilisent la police Cormorant Garamond intégrée ; les valeurs de la vue d'ensemble, les nombres de casiers et les diagnostics utilisent DJB Get Digital. Aucun service de polices externe ni téléchargement à l'exécution n'est nécessaire.

Les photos sont affichées lorsque le backend dispose d'une image mise en cache. La carte les récupère via une route Home Assistant authentifiée et ne contacte pas directement PLOUD. La fiche détaillée reste utilisable sans photo.

## 🛠️ Dépannage

- **Le type de carte est indisponible :** vérifier que Ploc Cellar Cards est installé via HACS et que la ressource `ploc-cellar-card.js` est enregistrée.
- **L'éditeur ne trouve aucune cave :** installer et configurer d'abord l'intégration backend, puis recharger l'éditeur du tableau de bord.
- **La carte affiche une erreur ou aucun inventaire :** vérifier l'entrée de configuration sélectionnée et consulter les journaux Home Assistant pour les erreurs de `ploc_cellar`.
- **La carte ne s'actualise pas :** vérifier la compatibilité backend/frontend et confirmer que la carte et la synchronisation utilisent la même entrée d'intégration. Les cartes s'actualisent après une synchronisation réussie, sans polling.

Pour signaler un problème, indiquer la version de Home Assistant, le navigateur, la version ou le commit frontend, le type de carte et les messages pertinents de la console du navigateur ou des journaux Home Assistant. Ne pas joindre d'identifiants ni de jetons d'accès.

## 🗑️ Désinstallation

1. Retirer les cartes Ploc Cellar des tableaux de bord.
2. Désinstaller **Ploc Cellar Cards** depuis HACS.
3. Si la ressource a été ajoutée manuellement, supprimer `/hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js` des ressources du tableau de bord.
4. Recharger le tableau de bord selon le besoin.

La désinstallation des cartes ne supprime ni l'intégration backend ni son inventaire.

## Documentation complémentaire

- [Index de la documentation](docs/README.fr.md) / [English](docs/README.md)
- [Contrat backend](docs/BACKEND_CONTRACT.fr.md) / [English](docs/BACKEND_CONTRACT.md)
- [Compatibilité backend/frontend et politique de publication](docs/COMPATIBILITY_AND_RELEASES.fr.md) / [English](docs/COMPATIBILITY_AND_RELEASES.md)

## ⚖️ Licence

Ce projet est distribué sous [licence MIT](LICENSE).

## Avertissement

Ploc Cellar Cards est un frontend indépendant pour Home Assistant. Il n'est ni affilié à PLOC ou PLOUD, ni approuvé ou pris en charge par ces services. L'intégration backend utilise des interfaces PLOUD non documentées ; les cartes elles-mêmes communiquent uniquement avec l'intégration Home Assistant.
