# Contrat backend

Ce frontend est un plugin de tableau de bord Home Assistant. Il n'appelle ni PLOUD ni les API PLOC. Toutes les données de la cave sont obtenues auprès de l'intégration Home Assistant via le service de réponse `ploc_cellar.get_inventory`.

L'implémentation backend et l'enregistrement du service sont maintenus dans [MadMatt34/ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar). Les interfaces TypeScript de [`src/types.ts`](../src/types.ts) décrivent la réponse consommée par ce frontend.

## Requête WebSocket

Les cartes utilisent la commande WebSocket Home Assistant `call_service` en demandant une réponse :

```ts
{
  type: "call_service",
  domain: "ploc_cellar",
  service: "get_inventory",
  service_data: {
    config_entry_id: config.config_entry_id,
  },
  return_response: true,
}
```

`config_entry_id` identifie l'entrée de configuration Ploc Cellar. L'éditeur de carte utilise le sélecteur natif Home Assistant des entrées de configuration. Le frontend ne stocke aucun identifiant de connexion, jeton d'accès, identifiant d'appareil ou URL PLOUD.

Le service backend accepte également les filtres facultatifs `search` et `color`. Les cartes demandent actuellement l'inventaire de l'entrée sélectionnée et appliquent leur présentation et leurs filtres dans le frontend.

## Événement de synchronisation réussie

Après validation complète, persistance et validation du nouvel état par le coordinateur, l'intégration déclenche l'événement Home Assistant `ploc_cellar_sync_completed`. Les données de l'événement contiennent :

```ts
{
  config_entry_id: string;
  last_sync: string;
  trigger: "recurring" | "forced_incremental" | "forced_full";
  sync_type: "full" | "incremental";
  changes: Record<string, { added: string[]; updated: string[]; deleted: string[] }>;
  change_counts: Record<string, { added: number; updated: number; deleted: number }>;
}
```

`trigger` indique l'action à l'origine de la synchronisation. `sync_type` distingue un instantané complet d'un delta incrémental. `changes` liste les identifiants effectivement ajoutés, modifiés ou supprimés dans chaque collection de la cave ; `change_counts` fournit les totaux correspondants. Les cartes utilisent actuellement uniquement `config_entry_id` et ignorent les autres champs. `last_sync` est informatif et n'est pas utilisé comme curseur de polling.

Le frontend s'abonne à cet événement via la connexion WebSocket Home Assistant active et actualise uniquement les cartes dont le `config_entry_id` configuré correspond à celui de l'événement. L'événement n'est pas déclenché lorsqu'une synchronisation échoue ou n'est pas validée. Le frontend ne dépend pas de l'identifiant généré de l'entité de diagnostic de dernière synchronisation et n'effectue aucun polling.

## Réponse

La structure de la réponse est décrite par `InventoryResponse`, `Rack`, `RackItem`, `Wine` et `WineDiagnostic` dans `src/types.ts`.

Le dépôt backend contient le test structurel de référence dans [`tests/test_service_contract.py`](https://github.com/MadMatt34/ha-ploc-cellar/blob/main/tests/test_service_contract.py). Le frontend en reprend les ensembles exacts de clés publiques et les principales garanties de nullabilité dans [`src/backend-inventory-contract.ts`](../src/backend-inventory-contract.ts). Ce fichier ne contient que des assertions vérifiées à la compilation ; il est automatiquement inclus dans la vérification TypeScript stricte et n'ajoute aucun code à l'exécution du dashboard.

Principaux champs de la réponse :

| Champ | Signification |
|---|---|
| `stale` | Indique qu'une synchronisation ultérieure a échoué après la dernière synchronisation réussie. |
| `last_sync` | Date et heure de la dernière synchronisation réussie, ou `null`. |
| `stock_reconstruction_complete` | Indique si un instantané complet des mouvements Orders est disponible. |
| `total_bottles` | Nombre d'emplacements physiquement occupés. |
| `total_stock_bottles` | Stock total reconstitué ; `null` tant que la reconstitution n'est pas complète. |
| `stocked_wines` | Nombre de références de vins ayant au moins une bouteille physiquement affectée à un emplacement de casier. Ce compteur reste disponible avant la fin de la reconstitution du stock. |
| `wine_references` | Nombre de références de vins dont le stock reconstitué est positif ; `null` tant que la reconstitution du stock n'est pas terminée. |
| `total_positions`, `empty_positions`, `occupied_positions` | Totaux des emplacements des casiers. |
| `unlocated_wines`, `unlocated_bottles` | Stock reconstitué non affecté à un emplacement ; `null` tant que la reconstitution n'est pas complète. |
| `negative_movement_wines`, `negative_movement_bottles` | Diagnostics de soldes de mouvements négatifs ; `null` tant que la reconstitution n'est pas complète. |
| `physical_surplus_wines`, `physical_surplus_bottles` | Stock physique supérieur au stock issu des mouvements non négatif ; `null` tant que la reconstitution n'est pas complète. |
| `wine_diagnostics` | Liste non filtrée des diagnostics, ou `null` tant que la reconstitution n'est pas complète. |
| `matching_wines` | Nombre de fiches vin correspondant aux filtres backend. |
| `rack_count` | Nombre de casiers. |
| `positions_without_rack`, `positions_with_unknown_wine` | Nombre de références de casier/vin non résolues. |
| `orders_without_wine` | Mouvements conservés dont la référence vin est inconnue ou supprimée ; `null` tant que la reconstitution n'est pas complète. |
| `racks`, `rack_items`, `wines` | Définitions des casiers, emplacements physiques et fiches vin. |

## Sémantique importante de l'inventaire

- Un `RackItem` représente un emplacement physique. Il est occupé si `wine_id` n'est pas `null`, sinon il est vide.
- Un `RackItem` occupé représente une bouteille physique. Ne pas déduire le nombre de bouteilles physiques à partir de `Wine.bottles`.
- `Wine.bottles` et `Wine.effective_stock` représentent le stock reconstitué et peuvent être à `null` tant que l'instantané Orders n'est pas complet.
- `Wine.ploud_bottles` est la valeur brute du stock PLOUD et n'est fournie qu'à titre informatif.
- Les coordonnées d'un emplacement (`row`, `column`) peuvent être à `null` ; l'interface doit gérer leur absence.
- Les caractéristiques d'un vin peuvent être à `null` ; l'interface ne doit pas supposer que l'appellation, la couleur, la région, le millésime ou le format est toujours renseigné.
- `Wine.meals` est le masque de bits entier brut nullable du champ PLOUD `ml`, qui représente les accords mets-vins. Le backend fournit toujours ce champ ; sa valeur peut être `null`. Le frontend décode les indicateurs connus, conserve la valeur brute et ignore les bits inconnus à l'affichage.
- Les emplacements occupés dont la référence vin n'est pas résolue restent inclus dans les totaux physiques, même si la fiche vin correspondante est indisponible.
- Les filtres backend ne doivent pas modifier les totaux globaux.

## Procédure de modification d'un champ de réponse

Toute évolution de la réponse du service doit être traitée comme une modification coordonnée du contrat backend/frontend, même lorsqu'elle est additive.

1. **Backend en premier :** modifier l'implémentation de la réponse et mettre à jour dans la même PR backend les ensembles exacts de clés, les valeurs représentatives et les règles de nullabilité dans `tests/test_service_contract.py`. Exécuter les tests backend et la CI. Ne pas affaiblir le test de contrat pour faire passer une modification incompatible.
2. **Types frontend :** mettre à jour l'interface correspondante dans `src/types.ts` ainsi que les assertions miroir dans `src/backend-inventory-contract.ts`. Conserver les ensembles exacts de clés ; adapter les assertions de nullabilité et de types primitifs si ces propriétés changent.
3. **Vérifier les consommateurs :** rechercher le champ concerné dans les trois cartes et leurs éditeurs. Gérer explicitement les valeurs `null` lorsque nécessaire et préserver la distinction entre emplacements physiques et stock reconstitué.
4. **Documentation :** mettre à jour ce document et son équivalent anglais, avec la signification du champ et toute évolution de sémantique.
5. **Validation et publication :** exécuter `npm ci`, `npm run check` et `npm run build`. Fusionner/publier le backend et le frontend de manière coordonnée afin que les utilisateurs ne reçoivent pas un frontend qui attend des champs absents de leur version backend. Pour toute modification du contrat, publier les versions backend et frontend correspondantes de manière coordonnée.

Même un nouveau champ additif doit être ajouté au test de contrat exact du backend et à l'assertion exacte des clés côté frontend. Cette stricte synchronisation est volontaire : elle force les deux dépôts à faire évoluer ensemble leurs structures déclarées.

## Contrat strict

Préserver la distinction entre emplacements physiques et stock reconstitué. Les nouveaux champs nullable doivent être traités comme tels dans l'interface. Ne pas modifier le domaine du service, son nom, son mode de réponse ou la forme de la requête sans coordonner une version du frontend.

Les assertions de contrat à la compilation et la vérification TypeScript de la CI contrôlent la structure TypeScript déclarée ; elles n'exécutent pas le backend et ne remplacent pas un test d'intégration sur une instance Home Assistant en fonctionnement.

### Accords mets et vins

Le champ PLOUD `ml` est exposé sous la forme de l'entier brut facultatif `Wine.meals`. Il s'agit d'un masque de bits : chaque catégorie possède un indicateur correspondant à une puissance de deux, et plusieurs catégories sont combinées par OU binaire. Les indicateurs connus de l'énumération publique `Meals` sont :

| Valeur du bit | Catégorie de mets |
|---:|---|
| `1` | Apéritif |
| `2` | Soupe |
| `4` | Entrée |
| `8` | Porc et charcuterie |
| `16` | Fruits de mer |
| `32` | Poisson |
| `64` | Viande blanche |
| `128` | Gibier |
| `256` | Volaille |
| `512` | Viande rouge |
| `1024` | Plats et légumes |
| `2048` | Fromage |
| `4096` | Dessert |
| `8192` | Épicés |

Le frontend décode et affiche les catégories connues dans la fenêtre de détail du vin, dans la langue de Home Assistant (français ou anglais). Le backend fournit toujours `meals`, qui peut être `null`, et conserve les bits inconnus ; le frontend les ignore à l'affichage.

L'indicateur `8192` est confirmé par l'application PLOUD comme la catégorie des plats épicés. Par exemple, la valeur `10341` combine `1 + 4 + 32 + 64 + 2048 + 8192`, soit apéritif, entrée, poissons, viandes blanches, fromages et plats épicés.
### Image du vin

La réponse `Wine` contient toujours le champ `image_url: string | null`.

- Une valeur non nulle désigne une route locale Home Assistant vers l'image principale mise en cache, ou vers l'image de couverture si l'image principale n'est pas disponible. Le téléchargement du cache d'images est facultatif et dispose d'un budget total de 10 secondes par synchronisation : un lot lent ne retarde pas la publication de l'inventaire déjà enregistré. Les images non téléchargées dans ce délai seront réessayées lors d'une synchronisation ultérieure.
- La route exige une authentification Home Assistant. Le consommateur doit récupérer l'image avec `hass.fetchWithAuth(image_url)` ; une requête d'image distante non authentifiée n'est pas prise en charge.
- L'URL peut contenir un paramètre de version. Une URL modifiée indique que la version du document mis en cache a changé : l'image doit être téléchargée à nouveau, même si l'identifiant du document PLOUD est identique.
- Le champ vaut `null` lorsqu'aucune image n'est disponible pour un vin, lorsque le document n'a pas encore été téléchargé ou lorsque le vin ne possède pas de référence d'image. La fiche vin reste utilisable sans image.

La carte affiche le blob reçu au moyen d'une URL d'objet. Elle révoque l'ancienne URL lorsqu'une image est remplacée et libère l'URL active lorsque le composant est déconnecté. L'échec d'une requête d'image ne doit pas empêcher l'affichage de l'inventaire ou des détails du vin.
