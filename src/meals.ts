import type { TranslationKey } from "./translations";

/** Known values from the public PLOUD Meals flags enum. */
const MEAL_FLAGS = [
  [1, "meal_aperitif"],
  [2, "meal_soup"],
  [4, "meal_entry"],
  [8, "meal_pork_butchery"],
  [16, "meal_seafood"],
  [32, "meal_fish"],
  [64, "meal_white_meat"],
  [128, "meal_game"],
  [256, "meal_poultry"],
  [512, "meal_red_meat"],
  [1024, "meal_dish_vegetable"],
  [2048, "meal_cheese"],
  [4096, "meal_dessert"],
  [8192, "meal_spicy"],
] as const satisfies ReadonlyArray<readonly [number, TranslationKey]>;

export type MealTranslationKey = (typeof MEAL_FLAGS)[number][1];

/** Home Assistant Material Design Icons associated with each food pairing. */
const MEAL_ICONS: Record<MealTranslationKey, string> = {
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

/** Return the icon associated with a known food-pairing translation key. */
export function getMealIcon(key: MealTranslationKey): string {
  return MEAL_ICONS[key];
}

/**
 * Return translated-label keys for the known flags in a PLOUD meal bitmask.
 *
 * Unknown bits are intentionally ignored by the presentation layer. The
 * backend retains the complete raw mask so a future enum extension is lossless.
 */
export function getMealTranslationKeys(
  mask: number | null | undefined,
): MealTranslationKey[] {
  if (mask === null || mask === undefined || !Number.isSafeInteger(mask) || mask < 0) {
    return [];
  }

  return MEAL_FLAGS
    .filter(([flag]) => Math.floor(mask / flag) % 2 === 1)
    .map(([, key]) => key);
}
