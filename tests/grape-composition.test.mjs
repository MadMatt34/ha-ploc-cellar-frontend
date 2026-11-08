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

test("parses PLOUD assemblies with percentages before grape names", () => {
  assert.deepEqual(
    parseGrapeComposition("60% Grenache, 15% Mourvèdre, 15% Syrah, 5% Cinsault, 5% Terret Noir"),
    [
      { name: "Grenache", percentage: 60 },
      { name: "Mourvèdre", percentage: 15 },
      { name: "Syrah", percentage: 15 },
      { name: "Cinsault", percentage: 5 },
      { name: "Terret Noir", percentage: 5 },
    ],
  );
});

test("treats grape names without an explicit percentage as 100%", () => {
  assert.deepEqual(parseGrapeComposition("Syrah; Grenache\nMourvèdre"), [
    { name: "Syrah", percentage: 100 },
    { name: "Grenache", percentage: 100 },
    { name: "Mourvèdre", percentage: 100 },
  ]);
});

test("preserves malformed or out-of-range percentage text as an unknown proportion", () => {
  assert.deepEqual(parseGrapeComposition("Grenache 120%, Syrah 15.5%"), [
    { name: "Grenache 120%", percentage: null },
    { name: "Syrah", percentage: 15.5 },
  ]);
});

test("returns an empty list for blank input", () => {
  assert.deepEqual(parseGrapeComposition("  "), []);
});
