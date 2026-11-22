# Compatibilité backend/frontend et politique de publication

Ce document est la référence de compatibilité des deux dépôts Ploc Cellar. La [version anglaise](COMPATIBILITY_AND_RELEASES.md) contient le même référentiel.

## Base de versions actuelle

Les versions actuellement déclarées dans les dépôts sont :

| Composant | Dépôt | Version déclarée | Signification |
|---|---|---:|---|
| Intégration Home Assistant (backend) | [ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar) | 0.8.0 | Version de `custom_components/ploc_cellar/manifest.json` |
| Cartes Lovelace (frontend) | [ha-ploc-cellar-frontend](https://github.com/MadMatt34/ha-ploc-cellar-frontend) | 0.1.0 | Version de `package.json` |

Ces valeurs constituent une **base de développement** ; elles ne signifient pas que les GitHub Releases correspondantes ont été publiées. Les dépôts ne disposent actuellement d'aucune paire de versions publiée. Les deux versions sont gérées indépendamment et ne doivent pas être considérées comme compatibles au seul motif que leurs numéros semblent liés.

Les branches de développement actuelles sont validées contre le même contrat d'inventaire déclaré :
- Structure et sémantique de la réponse backend : `tests/test_service_contract.py`.
- Structure miroir frontend : `src/backend-inventory-contract.ts` et `src/types.ts`.
- Contrat lisible : `docs/BACKEND_CONTRACT.md` et `docs/BACKEND_CONTRACT.fr.md`.

Ces contrôles établissent une cohérence structurelle. Ils ne remplacent pas un test de bout en bout avec les deux versions installées dans une instance Home Assistant active.

## Matrice de compatibilité

Une paire est marquée **validée** uniquement lorsque la CI des deux dépôts réussit pour les commits correspondants et que les assertions de contrat concordent. Un test d'installation réel dans Home Assistant doit être consigné séparément lorsqu'il a été effectué.

| Version backend | Version frontend | Statut | Notes |
|---|---|---|---|
| Base de développement 0.8.0 | Base de développement 0.1.0 | Contrat aligné ; paire non publiée | Les clés exactes et la nullabilité déclarée sont reflétées. Aucun test d'installation inter-dépôts réel n'est implicite. |

Ne pas déduire la compatibilité d'autres versions à partir de cette ligne. Ajouter une ligne pour chaque paire publiée et consigner les tags exacts du backend et du frontend.

## Règles de compatibilité des changements

1. **Publication corrective backend :** peut corriger le comportement interne sans modifier le contrat public de requête/réponse `get_inventory` ni la sémantique des événements. Les frontends déjà compatibles doivent continuer à fonctionner.
2. **Ajout d'un champ :** mettre d'abord à jour l'implémentation backend et les tests exacts du contrat. Le frontend doit traiter le nouveau champ comme facultatif jusqu'à ce que la version minimale du backend soit relevée. Mettre à jour les types TypeScript, les assertions miroir, les deux contrats et les tests dans le même changement coordonné.
3. **Changement comportemental ou événementiel :** documenter dans les deux dépôts le nom de l'événement, sa charge utile, ses règles de filtrage et son calendrier. Ajouter des tests d'événements backend et des tests d'abonnement/navigateur frontend.
4. **Rupture de contrat :** ne pas publier un backend qui supprime ou modifie un champ encore utilisé par un frontend publié. Coordonner les publications backend et frontend et consigner la première paire compatible dans la matrice.
5. **Numéros de version :** les versions backend et frontend sont indépendantes. C'est une ligne de la matrice, et non la similitude des numéros, qui définit une paire prise en charge.

## Procédure de publication

1. Terminer le changement du contrat backend et ses tests ; exécuter la CI backend.
2. Mettre à jour les types frontend, assertions de contrat, consommateurs, traductions et documentation ; exécuter vérification TypeScript, tests unitaires, tests navigateur et build.
3. Relire ensemble les deux contrats. Vérifier que chaque champ, règle de nullabilité et événement est décrit de manière cohérente.
4. Mettre à jour la version du manifeste backend et les métadonnées package frontend selon l'historique propre à chaque dépôt. Ne pas incrémenter une version pour un changement documentaire ou une branche de développement non publiée, sauf préparation explicite d'une publication.
5. Créer des GitHub Releases coordonnées et clairement liées. Chaque note de version doit préciser la version minimale compatible de l'autre composant et renvoyer vers la matrice.
6. Publier/installer le backend avant le frontend si ce dernier commence à utiliser une nouvelle capacité backend. Pour une rupture de contrat, publier la paire coordonnée et ne pas présenter l'un des composants comme compatible indépendamment.
7. Ajouter la paire exacte à la matrice uniquement lorsque les tags correspondants existent et que la CI a réussi. Consigner séparément la validation sur installation réelle ; ne jamais la déduire des seuls contrôles de types.

## Limites de validation

La CI vérifie chaque dépôt indépendamment. Les assertions de contrat miroir détectent les divergences de structure déclarée, mais ne prouvent ni le comportement réel du service privé PLOUD, ni la disponibilité réseau, ni le fonctionnement d'une installation Home Assistant réelle. Les notes de version et la matrice doivent distinguer la validation automatisée du contrat des tests d'intégration en conditions réelles.
