import "/src/ploc-cellar-card.ts";

const wine = (overrides = {}) => ({
  id: "wine-a",
  name: "Château A",
  domain: "Domaine A",
  bottles: 2,
  effective_stock: 2,
  ploud_bottles: 2,
  bottles_in_cellar: 2,
  unlocated_bottles: 0,
  purchased: 0,
  consumed: 0,
  movement_balance: 0,
  calculated_stock: 2,
  negative_movement_bottles: 0,
  physical_surplus_bottles: 0,
  vintage: 2018,
  appellation: "Pauillac",
  color: "Rouge",
  color_rgb: [150, 20, 30],
  classification: "Grand cru",
  region: "Bordeaux",
  country: "France",
  grapes: "Cabernet Sauvignon",
  cuvee: null,
  comment: null,
  alcohol_percent: 13,
  service_temperature_min: 16,
  service_temperature_max: 18,
  bottle_format: "Bouteille",
  bottle_volume_l: 0.75,
  ploud_pid: "pid-a",
  meals: 8192,
  image_url: null,
  locations: [{ rack: "Cave principale", rack_id: "rack-a", row: 0, column: 0 }],
  ...overrides,
});

const inventory = {
  stale: false,
  last_sync: "2026-11-08T10:00:00+01:00",
  stock_reconstruction_complete: true,
  total_bottles: 6,
  total_stock_bottles: 6,
  stocked_wines: 3,
  wine_references: 3,
  total_positions: 4,
  empty_positions: 1,
  occupied_positions: 3,
  unlocated_wines: 0,
  unlocated_bottles: 0,
  negative_movement_wines: 0,
  negative_movement_bottles: 0,
  physical_surplus_wines: 0,
  physical_surplus_bottles: 0,
  wine_diagnostics: [],
  matching_wines: 3,
  rack_count: 2,
  positions_without_rack: 0,
  positions_with_unknown_wine: 0,
  orders_without_wine: 0,
  racks: [
    { id: "rack-a", name: "Cave principale" },
    { id: "rack-b", name: "Cave secondaire" },
  ],
  rack_items: [
    { id: "slot-a1", rack_id: "rack-a", wine_id: "wine-a", row: 0, column: 0 },
    { id: "slot-a2", rack_id: "rack-a", wine_id: "wine-b", row: 0, column: 1 },
    { id: "slot-a3", rack_id: "rack-a", wine_id: null, row: 1, column: 0 },
    { id: "slot-b1", rack_id: "rack-b", wine_id: "wine-c", row: 0, column: 0 },
  ],
  wines: [
    wine(),
    wine({
      id: "wine-b",
      name: "Domaine B",
      domain: "Domaine B",
      bottles: 3,
      effective_stock: 3,
      ploud_bottles: 3,
      bottles_in_cellar: 3,
      vintage: null,
      appellation: "Chablis",
      color: "Blanc",
      color_rgb: [230, 220, 170],
      region: "Bourgogne",
      grapes: "Chardonnay",
      meals: 1,
      locations: [{ rack: "Cave principale", rack_id: "rack-a", row: 0, column: 1 }],
    }),
    wine({
      id: "wine-c",
      name: "Vin inconnu",
      domain: null,
      bottles: 1,
      effective_stock: 1,
      ploud_bottles: 1,
      bottles_in_cellar: 1,
      vintage: null,
      appellation: null,
      color: null,
      color_rgb: null,
      region: null,
      country: null,
      grapes: null,
      meals: null,
      locations: [{ rack: "Cave secondaire", rack_id: "rack-b", row: 0, column: 0 }],
    }),
  ],
};

window.__plocFixture = {
  inventory,
  fail: false,
  calls: 0,
  imageFetches: 0,
};

window.testHass = {
  language: "en",
  callWS: async () => {
    window.__plocFixture.calls += 1;
    if (window.__plocFixture.fail) {
      throw new Error("Fixture WebSocket failure");
    }
    return { response: window.__plocFixture.inventory };
  },
  fetchWithAuth: async () => {
    window.__plocFixture.imageFetches += 1;
    return new Response(new Blob([
      '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="red"/></svg>',
    ], { type: "image/svg+xml" }));
  },
};

window.mountPlocCard = async (tag, config) => {
  const host = document.querySelector("#app");
  host.replaceChildren();
  const card = document.createElement(tag);
  card.hass = window.testHass;
  card.setConfig({ config_entry_id: "fixture-entry", ...config });
  host.append(card);
  await card.updateComplete;
  return card;
};

window.__plocFixtureReady = true;
