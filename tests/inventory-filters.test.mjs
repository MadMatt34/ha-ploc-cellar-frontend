import assert from "node:assert/strict";
import test from "node:test";

import {
  getInventoryFilterOptionValue,
  isMissingInventoryValue,
  matchesInventoryFilter,
  parseInventoryFilterOptionValue,
} from "../.test-dist/inventory-filters.js";

test("treats null, undefined and blank strings as missing values", () => {
  for (const value of [null, undefined, "", "   "]) {
    assert.equal(isMissingInventoryValue(value), true);
  }
  for (const value of [0, 2021, "Rouge"]) {
    assert.equal(isMissingInventoryValue(value), false);
  }
});

test("unknown selection matches only missing values", () => {
  const selection = { kind: "unknown" };
  assert.equal(matchesInventoryFilter(null, selection), true);
  assert.equal(matchesInventoryFilter("", selection), true);
  assert.equal(matchesInventoryFilter("  ", selection), true);
  assert.equal(matchesInventoryFilter("Rouge", selection), false);
  assert.equal(matchesInventoryFilter(2021, selection), false);
});

test("specific selections compare string and numeric values consistently", () => {
  assert.equal(matchesInventoryFilter(2021, { kind: "value", value: "2021" }), true);
  assert.equal(matchesInventoryFilter("Bordeaux", { kind: "value", value: "Bordeaux" }), true);
  assert.equal(matchesInventoryFilter(null, { kind: "value", value: "2021" }), false);
});

test("select option tokens round-trip values without reserving wine-property values", () => {
  const values = ["unknown", "Bordeaux", "2021"];
  const selection = { kind: "value", value: "unknown" };
  const token = getInventoryFilterOptionValue(selection, values);
  assert.equal(token, "value:0");
  assert.deepEqual(parseInventoryFilterOptionValue(token, values), selection);
  assert.deepEqual(parseInventoryFilterOptionValue("unknown", values), { kind: "unknown" });
  assert.deepEqual(parseInventoryFilterOptionValue("all", values), { kind: "all" });
});

test("invalid or stale option tokens safely reset to all values", () => {
  assert.deepEqual(parseInventoryFilterOptionValue("value:9", ["A"]), { kind: "all" });
  assert.deepEqual(parseInventoryFilterOptionValue("value:NaN", ["A"]), { kind: "all" });
});
