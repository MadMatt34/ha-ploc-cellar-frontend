import type { HomeAssistant, InventoryResponse } from "./types";

export const SYNC_SUBSCRIPTION_COMMAND = "ploc_cellar/subscribe_sync";

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

/**
 * Own the lifecycle and race protection for a card's synchronization listener.
 * Inventory fetching itself remains coalesced by fetchInventory().
 */
export class InventorySyncSubscription {
  private connection?: HomeAssistant["connection"];
  private configEntryId?: string;
  private unsubscribe?: () => void;
  private generation = 0;

  update(
    hass: HomeAssistant | undefined,
    configEntryId: string | undefined,
    connected: boolean,
    onSync: () => void,
  ): void {
    const connection = hass?.connection;
    if (connection === this.connection && configEntryId === this.configEntryId) return;

    this.generation += 1;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.connection = connection;
    this.configEntryId = configEntryId;

    if (!connected || !connection || !configEntryId) return;

    const generation = this.generation;
    void connection.subscribeMessage<Record<string, never>>(
      () => onSync(),
      {
        type: SYNC_SUBSCRIPTION_COMMAND,
        config_entry_id: configEntryId,
      },
    ).then((unsubscribe) => {
      if (
        generation === this.generation &&
        connected &&
        this.connection === connection &&
        this.configEntryId === configEntryId
      ) {
        this.unsubscribe = unsubscribe;
      } else {
        unsubscribe();
      }
    }).catch((error: unknown) => {
      console.error("Unable to subscribe to Ploc Cellar synchronization updates", error);
      if (generation === this.generation) {
        // Permit the next hass/config update to retry the failed subscription.
        this.connection = undefined;
        this.configEntryId = undefined;
      }
    });
  }

  disconnect(): void {
    this.generation += 1;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.connection = undefined;
    this.configEntryId = undefined;
  }
}
