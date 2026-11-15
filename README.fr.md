# Cartes Ploc Cellar

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Frontend Lovelace indépendant pour Home Assistant, destiné à l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).

[English version](README.md)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Tableau%20de%20bord-blue)](https://www.home-assistant.io/dashboards/)
[![HACS](https://img.shields.io/badge/HACS-Plugin%20de%20tableau%20de%20bord-blue)](https://www.hacs.xyz/)
[![Frontend CI](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml)
[![Validation HACS](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml)
![Licence : MIT](https://img.shields.io/badge/Licence-MIT-green.svg)

## Documentation

- [Index de la documentation](docs/README.fr.md) / [English](docs/README.md)
- [Compatibilité backend/frontend et politique de publication](docs/COMPATIBILITY_AND_RELEASES.md)

## Cartes

Ce dépôt fournit trois cartes personnalisées :

- **Vue d'ensemble** (custom:ploc-cellar-card) : statistiques de la cave, stock physique et reconstitué, occupation des casiers, diagnostics et graphiques de répartition selon les caractéristiques des vins.
- **Inventaire** (custom:ploc-cellar-inventory-card) : références de vins consultables, triables et paginées, avec filtres par couleur, région, appellation, millésime et accords mets-vins. Les valeurs inconnues peuvent être sélectionnées pour retrouver les fiches incomplètes.
- **Casier** (custom:ploc-cellar-rack-card) : sélecteur de casier et plan des emplacements fondé sur les coordonnées de ligne et de colonne PLOUD. Les emplacements occupés reprennent la couleur du vin lorsqu'elle est disponible.

L'éditeur de la carte Inventaire permet de choisir le nombre de références affichées par page (10 à 200 ; 40 par défaut). La sélection d'un nom de vin ouvre sa fiche détaillée, qui regroupe le stock, les accords mets-vins, les caractéristiques, les emplacements et les notes dans des sections repliables.

## Prérequis

- L'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar) doit être installée et configurée dans Home Assistant.
- Un navigateur pris en charge par l'interface Home Assistant est nécessaire.

Les éditeurs des cartes utilisent le sélecteur natif des entrées de configuration. Sélectionner le compte Ploc Cellar dont l'inventaire doit être affiché.

## Installation

1. Installer et configurer l'[intégration Ploc Cellar](https://github.com/MadMatt34/ha-ploc-cellar).
2. Dans HACS, ouvrir **Dépôts personnalisés**, ajouter **MadMatt34/ha-ploc-cellar-frontend** et sélectionner la catégorie **Dashboard**.
3. Installer **Ploc Cellar Cards** depuis HACS.
4. HACS enregistre normalement automatiquement la ressource du tableau de bord. Si les ressources sont gérées manuellement (par exemple en YAML), ajouter :

   ~~~yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ~~~

5. Ajouter une carte Ploc Cellar depuis le sélecteur de cartes du tableau de bord et choisir l'entrée d'intégration souhaitée.

Dans une vue **Sections**, la carte Vue d'ensemble utilise par défaut une largeur de 12 colonnes sans imposer de hauteur de ligne. L'option **Fit height to content** de l'onglet **Layout** permet d'adapter sa hauteur au contenu.

## Actualisation automatique

Les cartes chargent l'inventaire de l'entrée sélectionnée à leur initialisation et s'actualisent automatiquement après une synchronisation backend réussie. Aucun polling, rafraîchissement manuel ou identifiant d'entité n'est nécessaire. Chaque carte ne reçoit que les notifications de l'entrée de configuration sélectionnée.

Les cartes communiquent uniquement avec Home Assistant. Elles ne se connectent pas à PLOUD et ne stockent aucun identifiant PLOC.

## Langues et présentation

Le français et l'anglais sont pris en charge, selon la langue de Home Assistant. Les noms de vins et les valeurs numériques utilisent des polices intégrées ; aucun service de polices externe ni téléchargement à l'exécution n'est nécessaire. Les photos sont affichées lorsque le backend dispose d'une image mise en cache ; la fiche détaillée reste utilisable sans photo.

## Dépannage

- **Le type de carte est indisponible :** vérifier que Ploc Cellar Cards est installé via HACS et que la ressource ploc-cellar-card.js est enregistrée.
- **L'éditeur ne trouve aucune cave :** installer et configurer d'abord l'intégration backend, puis recharger l'éditeur du tableau de bord.
- **La carte affiche une erreur ou aucun inventaire :** vérifier l'entrée de configuration sélectionnée et consulter les journaux Home Assistant pour les erreurs de ploc_cellar.
- **La carte ne s'actualise pas :** vérifier la compatibilité backend/frontend et confirmer que la carte et la synchronisation utilisent la même entrée d'intégration.

Pour signaler un problème, indiquer la version de Home Assistant, le navigateur, la version ou le commit frontend, le type de carte et les messages pertinents de la console du navigateur ou des journaux Home Assistant. Ne pas joindre d'identifiants ni de jetons d'accès.

## Désinstallation

1. Retirer les cartes Ploc Cellar des tableaux de bord.
2. Désinstaller **Ploc Cellar Cards** depuis HACS.
3. Si la ressource a été ajoutée manuellement, supprimer /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js des ressources du tableau de bord.
4. Recharger le tableau de bord selon le besoin.

La désinstallation des cartes ne supprime ni l'intégration backend ni son inventaire.

## Licence et avertissement

Ce projet est distribué sous [licence MIT](LICENSE).

Ploc Cellar Cards est un frontend indépendant pour Home Assistant. Il n'est ni affilié à PLOC ou PLOUD, ni approuvé ou pris en charge par ces services. L'intégration backend utilise des interfaces PLOUD privées et non documentées ; les cartes elles-mêmes communiquent uniquement avec l'intégration Home Assistant.
