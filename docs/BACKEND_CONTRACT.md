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

## Successful synchronization event

After a PLOUD synchronization has been fully validated, persisted and committed to the coordinator, the integration fires the Home Assistant event `ploc_cellar_sync_completed`. Its event data contains:

```ts
{
  config_entry_id: string;
  last_sync: string;
}
```

The frontend subscribes to this event through the active Home Assistant WebSocket connection and refreshes only cards whose configured `config_entry_id` matches the event. The event is not fired for failed or uncommitted synchronizations. The frontend does not depend on the generated entity ID of the diagnostic last-sync sensor and does not poll.

## Response

The response shape is represented by `InventoryResponse`, `Rack`, `RackItem`, `Wine` and `WineDiagnostic` in `src/types.ts`.

The backend repository contains the authoritative structural test in [`tests/test_service_contract.py`](https://github.com/MadMatt34/ha-ploc-cellar/blob/main/tests/test_service_contract.py). The frontend mirrors its public key sets and important nullability guarantees in [`src/backend-inventory-contract.ts`](../src/backend-inventory-contract.ts). This file contains compile-time assertions only; it is included automatically by the strict TypeScript check and adds no runtime code to the dashboard bundle.

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
- `Wine.meals` is the raw nullable PLOUD `ml` integer bitmask for food-pairing associations. The backend always provides this field; its value may be `null`. The frontend decodes known flags and ignores unknown bits for display.
- Unresolved wine references on occupied positions remain part of physical totals even when the corresponding wine record is unavailable.
- Backend filters must not change global totals.

## Procedure for changing a response field

Treat a change to the service response as a coordinated backend/frontend contract change, even when it is additive.

1. **Backend first:** change the response implementation and update the exact key sets, representative values and nullable semantics in `tests/test_service_contract.py` in the same backend PR. Run the backend test suite and CI. The backend contract test must not be weakened just to make an incompatible change pass.
2. **Frontend types:** update the corresponding interface in `src/types.ts` and the mirrored assertions in `src/backend-inventory-contract.ts`. Keep the key sets exact; update nullability and primitive-type assertions when those semantics change.
3. **Review consumers:** search all three cards and their editors for the affected field. Handle `null` explicitly where applicable; preserve the distinction between physical rack positions and reconstructed stock.
4. **Documentation:** update this contract document and its French counterpart, including field meaning and any changed semantics.
5. **Validation and release:** run `npm ci`, `npm run check` and `npm run build`. Merge/release the backend and frontend in a coordinated order so users do not receive a frontend expecting fields that an installed backend does not yet provide. For any contract change, publish the corresponding backend and frontend versions in a coordinated manner.

An additive response field is still added to both the backend's exact contract test and the frontend's exact key assertion. This deliberate strictness makes the two repositories' declared shapes move together.

## Strict contract

Preserve the physical-position versus reconstructed-stock distinction. New nullable fields must be handled as nullable in the UI. Do not change the service domain, service name, response mode or request shape without coordinating a frontend release.

The compile-time contract assertions and frontend CI type-check verify the declared TypeScript shape; they do not execute the backend or replace an integration test against a running Home Assistant instance.

### Food pairings

The PLOUD `ml` field is exposed as the optional raw integer `Wine.meals`. It is a bitmask: each category has its own power-of-two flag, and multiple categories are combined with bitwise OR. The known public `Meals` flags are:

| Bit value | Food category |
|---:|---|
| `1` | Aperitif |
| `2` | Soup |
| `4` | Starter |
| `8` | Pork and charcuterie |
| `16` | Seafood |
| `32` | Fish |
| `64` | White meat |
| `128` | Game |
| `256` | Poultry |
| `512` | Red meat |
| `1024` | Dishes with vegetables |
| `2048` | Cheese |
| `4096` | Dessert |
| `8192` | Spicy dishes |

The frontend decodes and displays the known categories in the wine detail dialog using the Home Assistant language (English or French). The backend always provides `meals`, which may be `null`, and preserves unknown bits; the frontend ignores them for display.

The `8192` flag is confirmed by the PLOUD application as the spicy-food pairing category. For example, the value `10341` combines `1 + 4 + 32 + 64 + 2048 + 8192`, corresponding to aperitif, starter, fish, white meat, cheese and spicy dishes.
### Wine image

The `Wine` response always includes the field `image_url: string | null`.

- A non-null value is a local Home Assistant endpoint for the cached primary wine image, or the cached cover image when the primary image is unavailable.
- The endpoint requires Home Assistant authentication. Consumers must fetch it with `hass.fetchWithAuth(image_url)`; assigning the endpoint directly to an unauthenticated remote image request is not supported.
- The URL may include a version query component. A changed URL signals that the cached document version changed and the image should be fetched again, even if the PLOUD document identifier did not change.
- The field is `null` when an image is unavailable for a wine, when its document has not yet been downloaded, or when the wine has no image reference. The wine detail view remains usable without an image.

The card displays the fetched blob through an object URL. It revokes the previous object URL when the image is replaced and releases the active URL when the component disconnects. A failed image request must not prevent the inventory or wine details from being displayed.
