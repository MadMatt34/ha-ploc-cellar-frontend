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

## Réponse

La structure de la réponse est décrite par `InventoryResponse`, `Rack`, `RackItem`, `Wine` et `WineDiagnostic` dans `src/types.ts`.

Champs principaux :

| Champ | Signification |
|---|---|
| `stale` | Indique qu'une synchronisation ultérieure a échoué après la dernière synchronisation réussie. |
| `last_sync` | Date et heure de la dernière synchronisation réussie, ou `null`. |
| `stock_reconstruction_complete` | Indique si un instantané complet des mouvements Orders est disponible. |
| `total_bottles` | Nombre d'emplacements physiquement occupés. |
| `total_stock_bottles` | Stock total reconstitué ; `null` tant que la reconstitution n'est pas complète. |
| `stocked_wines` | Nombre de références de vins connues représentées dans l'inventaire. |
| `wine_references` | Nombre de références de vins, ou `null` si indisponible. |
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
- Les emplacements occupés dont la référence vin n'est pas résolue restent inclus dans les totaux physiques, même si la fiche vin correspondante est indisponible.
- Les filtres backend ne doivent pas modifier les totaux globaux.

## Règles de compatibilité

Toute évolution de la réponse backend doit être répercutée dans `src/types.ts` et vérifiée dans les trois cartes. Il faut préserver la distinction entre emplacement physique et stock reconstitué. Les nouveaux champs nullable doivent être traités comme tels dans l'interface. Ne pas modifier le domaine du service, son nom, son mode de réponse ou la forme de la requête sans coordonner une version du frontend.

La vérification TypeScript de la CI contrôle la cohérence du code ; elle ne remplace pas un test d'intégration sur une instance Home Assistant en fonctionnement.
