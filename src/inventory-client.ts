import type { HomeAssistant, InventoryResponse } from "./types";

/**
 * Coalesce simultaneous inventory requests made by the three cards.
 *
 * The promise is removed as soon as it settles: this avoids serving stale
 * inventory after a later synchronization while still preventing duplicate
 * WebSocket work during dashboard initialization.
 */
const pendingRequests = new WeakMap<
  HomeAssistant,
  Map<string, Promise<InventoryResponse>>
>();

export function fetchInventory(
  hass: HomeAssistant,
  configEntryId: string,
): Promise<InventoryResponse> {
  let requests = pendingRequests.get(hass);
  if (!requests) {
    requests = new Map();
    pendingRequests.set(hass, requests);
  }

  const pending = requests.get(configEntryId);
  if (pending) return pending;

  const request = hass.callWS<{ response: InventoryResponse }>({
    type: "call_service",
    domain: "ploc_cellar",
    service: "get_inventory",
    service_data: { config_entry_id: configEntryId },
    return_response: true,
  }).then((result) => result.response);

  let trackedRequest: Promise<InventoryResponse>;
  trackedRequest = request.finally(() => {
    if (requests?.get(configEntryId) === trackedRequest) {
      requests.delete(configEntryId);
      if (requests.size === 0) pendingRequests.delete(hass);
    }
  });
  requests.set(configEntryId, trackedRequest);
  return trackedRequest;
}
