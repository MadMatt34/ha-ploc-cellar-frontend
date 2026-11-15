# Développement frontend et CI

Ce document s'adresse aux contributeurs. Les instructions d'installation destinées aux utilisateurs figurent dans le [README](../README.md) et le [README français](../README.fr.md). La [version anglaise](DEVELOPMENT.md) contient les mêmes procédures.

## Environnement technique

- Node.js `^20.19.0` ou `>=22.12.0`, conformément aux versions prises en charge par Vite 8.
- npm avec le fichier lock versionné.
- Playwright 1.65.0 et Chromium pour les tests d'interaction navigateur.

Installer les dépendances :

```sh
npm ci
```

## Validation locale

Exécuter les mêmes contrôles ciblés que pendant le développement :

```sh
npm run check
npm test
npx playwright install chromium
npm run test:e2e
npm run build
```

L'installation du navigateur Playwright est nécessaire une fois par environnement local. `npm run check` effectue la vérification TypeScript stricte ; `npm test` lance les tests unitaires ; `npm run test:e2e` lance les tests d'interaction navigateur.

## Artefacts de build

Le build de production est généré dans `dist/ploc-cellar-card.js`, puis copié à la racine du dépôt sous le nom `ploc-cellar-card.js`, nom de ressource attendu par les métadonnées HACS. Les deux fichiers générés sont versionnés. Les dépendances sont intégrées au module JavaScript autonome.

Ne pas modifier manuellement les bundles générés. Modifier les sources, lancer le build et examiner les artefacts produits.

## Responsabilités de la CI

Le workflow Frontend CI exécute la vérification TypeScript stricte, les tests unitaires et le build de production sur les push et pull requests. Un job Chromium distinct exécute les tests d'interaction navigateur sur les push et pull requests. Sur `main`, le workflow committe les bundles générés lorsqu'ils changent.

La CI impose une limite de 800 000 octets pour la taille non compressée du bundle JavaScript afin de détecter une croissance inattendue.

La validation HACS est effectuée par le workflow de validation du dépôt. Les fichiers de workflow sont la source de vérité si ce document et la configuration CI divergent.

## Organisation des tests

- `tests/*.test.mjs` contient les tests unitaires ciblés et les contrôles documentaires.
- `tests/browser/` contient les tests d'interaction navigateur et leur fixture.
- `tests/documentation.test.mjs` vérifie certains invariants documentaires.

Lorsqu'un comportement visible par l'utilisateur change, mettre à jour les tests unitaires/navigateur concernés et les deux README linguistiques. Lorsqu'une réponse backend ou le protocole de notification change, suivre la procédure coordonnée de [BACKEND_CONTRACT.md](BACKEND_CONTRACT.md) et mettre à jour la politique de compatibilité si une paire de versions prises en charge change.

## Limites de validation

Une CI frontend réussie valide le build frontend, le contrat TypeScript déclaré et les comportements navigateur testés. Elle n'exécute pas un backend réel, ne prouve pas la disponibilité de PLOUD et ne remplace pas un test de bout en bout sur une instance Home Assistant installée.