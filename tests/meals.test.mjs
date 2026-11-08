import assert from "node:assert/strict";
import test from "node:test";

import { getMealIcon, getMealTranslationKeys } from "../.test-dist/meals.js";

test("decodes one PLOUD food pairing flag", () => {
  assert.deepEqual(getMealTranslationKeys(2048), ["meal_cheese"]);
});

test("decodes combined food pairing flags in enum order", () => {
  assert.deepEqual(getMealTranslationKeys(2080), ["meal_fish", "meal_cheese"]);
});

test("decodes the PLOUD spicy-food flag", () => {
  assert.deepEqual(getMealTranslationKeys(8192), ["meal_spicy"]);
  assert.deepEqual(getMealTranslationKeys(10341), [
    "meal_aperitif",
    "meal_entry",
    "meal_fish",
    "meal_white_meat",
    "meal_cheese",
    "meal_spicy",
  ]);
});

test("ignores unknown flags without hiding known associations", () => {
  assert.deepEqual(getMealTranslationKeys(16384 | 2048 | 32), ["meal_fish", "meal_cheese"]);
});

test("associates a specific Material Design icon with every known food pairing", () => {
  const expectedIcons = {
    meal_aperitif: "mdi:glass-cocktail",
    meal_soup: "mdi:soup",
    meal_entry: "mdi:food-apple",
    meal_pork_butchery: "mdi:pig",
    meal_seafood: "mdi:waves",
    meal_fish: "mdi:fish",
    meal_white_meat: "mdi:food-drumstick",
    meal_game: "mdi:cow",
    meal_poultry: "mdi:turkey",
    meal_red_meat: "mdi:food-steak",
    meal_dish_vegetable: "mdi:carrot",
    meal_cheese: "mdi:cheese",
    meal_dessert: "mdi:cupcake",
    meal_spicy: "mdi:chili-hot",
  };

  for (const [key, icon] of Object.entries(expectedIcons)) {
    assert.equal(getMealIcon(key), icon);
  }
});

test("returns no labels for absent, empty or invalid masks", () => {
  for (const value of [null, undefined, 0, -1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(getMealTranslationKeys(value), []);
  }
});
