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
] as const satisfies ReadonlyArray<readonly [number, TranslationKey]>;

/**
 * Return translated-label keys for the known flags in a PLOUD meal bitmask.
 *
 * Unknown bits are intentionally ignored by the presentation layer. The
 * backend retains the complete raw mask so a future enum extension is lossless.
 */
export function getMealTranslationKeys(
  mask: number | null | undefined,
): TranslationKey[] {
  if (mask === null || mask === undefined || !Number.isSafeInteger(mask) || mask < 0) {
    return [];
  }

  return MEAL_FLAGS
    .filter(([flag]) => Math.floor(mask / flag) % 2 === 1)
    .map(([, key]) => key);
}
