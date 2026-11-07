# Backend contract

This frontend is a Home Assistant dashboard plugin. It does not call PLOUD or the PLOC APIs. All cellar data is obtained from the Home Assistant integration through the `ploc_cellar.get_inventory` response service.

The backend implementation and service registration are maintained in [MadMatt34/ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar). The TypeScript interfaces in [`src/types.ts`](../src/types.ts) describe the response consumed by this frontend.

## WebSocket request

The cards call the Home Assistant `call_service` WebSocket command and request a response:

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

`config_entry_id` identifies the configured Ploc Cellar integration entry. The card editor uses Home Assistant's native config-entry selector. The frontend does not store credentials, access tokens, device identifiers or PLOUD endpoints.

The backend service also supports optional `search` and `color` filters. The cards currently request the inventory for the selected config entry and apply their presentation/filtering behavior in the frontend.

## Response

The response shape is represented by `InventoryResponse`, `Rack`, `RackItem`, `Wine` and `WineDiagnostic` in `src/types.ts`.

Top-level response fields:

| Field | Meaning |
|---|---|
| `stale` | Whether a later synchronization failed after the last successful synchronization. |
| `last_sync` | Last successful synchronization timestamp, or `null`. |
| `stock_reconstruction_complete` | Whether a complete Orders snapshot is available for stock reconstruction. |
| `total_bottles` | Number of physically occupied rack positions. |
| `total_stock_bottles` | Reconstructed total stock; `null` until reconstruction is complete. |
| `stocked_wines` | Number of known wine references represented in the inventory. |
| `wine_references` | Number of wine references, or `null` when unavailable. |
| `total_positions`, `empty_positions`, `occupied_positions` | Rack-position totals. |
| `unlocated_wines`, `unlocated_bottles` | Reconstructed stock not assigned to rack positions; `null` until reconstruction is complete. |
| `negative_movement_wines`, `negative_movement_bottles` | Negative movement-balance diagnostics; `null` until reconstruction is complete. |
| `physical_surplus_wines`, `physical_surplus_bottles` | Physical stock above non-negative movement stock; `null` until reconstruction is complete. |
| `wine_diagnostics` | Unfiltered diagnostic records, or `null` until reconstruction is complete. |
| `matching_wines` | Number of wine records matching backend filters. |
| `rack_count` | Number of racks. |
| `positions_without_rack`, `positions_with_unknown_wine` | Counts of unresolved rack/wine references. |
| `orders_without_wine` | Retained movements whose wine reference is unknown or deleted; `null` until reconstruction is complete. |
| `racks`, `rack_items`, `wines` | Rack definitions, physical positions and wine records. |

## Important inventory semantics

- A `RackItem` represents one physical rack position. It is occupied when `wine_id` is not `null`; otherwise it is empty.
- An occupied `RackItem` represents one physical bottle. Do not infer physical bottle count from `Wine.bottles`.
- `Wine.bottles` and `Wine.effective_stock` represent reconstructed stock and may be `null` until the Orders snapshot is complete.
- `Wine.ploud_bottles` is the raw PLOUD stock value and is informational only.
- Wine location coordinates (`row`, `column`) may be `null`; consumers must handle missing coordinates.
- Wine characteristics can be `null`; the frontend must not assume that appellation, color, region, vintage or bottle format is always present.
- Unresolved wine references on occupied positions remain part of physical totals even when the corresponding wine record is unavailable.
- Backend filters must not change global totals.

## Compatibility rules

Changes to the backend response must be reflected in `src/types.ts` and reviewed against all three cards. Preserve the physical-position versus reconstructed-stock distinction. New nullable fields must be handled as nullable in the UI. Do not change the service domain, service name, response mode or request shape without coordinating a frontend release.

The frontend CI type-check verifies TypeScript consistency; it does not replace an integration test against a running Home Assistant instance.
