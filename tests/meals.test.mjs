import assert from "node:assert/strict";
import test from "node:test";

import { getMealTranslationKeys } from "../.test-dist/meals.js";

test("decodes one PLOUD food pairing flag", () => {
  assert.deepEqual(getMealTranslationKeys(2048), ["meal_cheese"]);
});

test("decodes combined food pairing flags in enum order", () => {
  assert.deepEqual(getMealTranslationKeys(2080), ["meal_fish", "meal_cheese"]);
});

test("ignores unknown flags without hiding known associations", () => {
  assert.deepEqual(getMealTranslationKeys(8192 | 2048 | 32), ["meal_fish", "meal_cheese"]);
});

test("returns no labels for absent, empty or invalid masks", () => {
  for (const value of [null, undefined, 0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(getMealTranslationKeys(value), []);
  }
});
