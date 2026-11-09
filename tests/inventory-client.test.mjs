import assert from "node:assert/strict";
import test from "node:test";

import { fetchInventory, subscribeToInventorySync, SYNC_COMPLETED_EVENT } from "../.test-dist/inventory-client.js";

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test("coalesces simultaneous requests for the same configuration entry", async () => {
  const pending = deferred();
  const inventory = { wines: [{ id: "wine-1" }] };
  let calls = 0;
  const hass = {
    callWS: async () => {
      calls += 1;
      return pending.promise;
    },
  };

  const first = fetchInventory(hass, "entry-1");
  const second = fetchInventory(hass, "entry-1");
  assert.strictEqual(first, second);
  assert.equal(calls, 1);

  pending.resolve({ response: inventory });
  assert.strictEqual(await first, inventory);
  assert.strictEqual(await second, inventory);
  assert.equal(calls, 1);
});

test("keeps requests for different configuration entries independent", async () => {
  const pending = new Map();
  const hass = {
    callWS: (message) => {
      const entryId = message.service_data.config_entry_id;
      const request = deferred();
      pending.set(entryId, request);
      return request.promise;
    },
  };

  const first = fetchInventory(hass, "entry-1");
  const second = fetchInventory(hass, "entry-2");
  assert.notStrictEqual(first, second);

  const inventoryOne = { id: "one" };
  const inventoryTwo = { id: "two" };
  pending.get("entry-1").resolve({ response: inventoryOne });
  pending.get("entry-2").resolve({ response: inventoryTwo });

  assert.strictEqual(await first, inventoryOne);
  assert.strictEqual(await second, inventoryTwo);
});

test("removes failed requests so a later call can retry", async () => {
  let calls = 0;
  const hass = {
    callWS: async () => {
      calls += 1;
      if (calls === 1) throw new Error("temporary failure");
      return { response: { retry: true } };
    },
  };

  await assert.rejects(fetchInventory(hass, "entry-1"), /temporary failure/);
  assert.deepEqual(await fetchInventory(hass, "entry-1"), { retry: true });
  assert.equal(calls, 2);
});

test("subscribes to the successful sync event and filters by config entry", async () => {
  let registeredEvent;
  let callback;
  const unsubscribe = () => {};
  const hass = {
    connection: {
      subscribeEvents: async (listener, eventType) => {
        callback = listener;
        registeredEvent = eventType;
        return unsubscribe;
      },
    },
  };
  let syncCount = 0;

  const stop = await subscribeToInventorySync(hass, "entry-1", () => {
    syncCount += 1;
  });

  assert.equal(registeredEvent, SYNC_COMPLETED_EVENT);
  assert.strictEqual(stop, unsubscribe);
  callback({ data: { config_entry_id: "entry-2" } });
  assert.equal(syncCount, 0);
  callback({ data: { config_entry_id: "entry-1" } });
  assert.equal(syncCount, 1);
});
