import assert from "node:assert/strict";
import test from "node:test";

import { parseGrapeComposition } from "../.test-dist/grape-composition.js";

test("parses grape names and explicit percentages", () => {
  assert.deepEqual(parseGrapeComposition("Grenache 60%, Mourvèdre (15%), Syrah 25%"), [
    { name: "Grenache", percentage: 60 },
    { name: "Mourvèdre", percentage: 15 },
    { name: "Syrah", percentage: 25 },
  ]);
});

test("keeps plain grape names without inventing percentages", () => {
  assert.deepEqual(parseGrapeComposition("Syrah; Grenache\nMourvèdre"), [
    { name: "Syrah", percentage: null },
    { name: "Grenache", percentage: null },
    { name: "Mourvèdre", percentage: null },
  ]);
});

test("preserves malformed or out-of-range percentage text as a name", () => {
  assert.deepEqual(parseGrapeComposition("Grenache 120%, Syrah 15.5%"), [
    { name: "Grenache 120%", percentage: null },
    { name: "Syrah", percentage: 15.5 },
  ]);
});

test("returns an empty list for blank input", () => {
  assert.deepEqual(parseGrapeComposition("  "), []);
});