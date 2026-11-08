export type InventoryFilterSelection =
  | { kind: "all" }
  | { kind: "unknown" }
  | { kind: "value"; value: string };

export const ALL_FILTER_VALUES: InventoryFilterSelection = { kind: "all" };
export const UNKNOWN_FILTER_VALUE: InventoryFilterSelection = { kind: "unknown" };

export function isMissingInventoryValue(
  value: string | number | null | undefined,
): boolean {
  return value === null
    || value === undefined
    || (typeof value === "string" && value.trim() === "");
}

export function matchesInventoryFilter(
  value: string | number | null | undefined,
  selection: InventoryFilterSelection,
): boolean {
  if (selection.kind === "all") return true;
  if (selection.kind === "unknown") return isMissingInventoryValue(value);
  return !isMissingInventoryValue(value) && String(value) === selection.value;
}

export function getInventoryFilterOptionValue(
  selection: InventoryFilterSelection,
  values: readonly string[],
): string {
  if (selection.kind === "all") return "all";
  if (selection.kind === "unknown") return "unknown";
  const index = values.indexOf(selection.value);
  return index < 0 ? "all" : `value:${index}`;
}

export function parseInventoryFilterOptionValue(
  optionValue: string,
  values: readonly string[],
): InventoryFilterSelection {
  if (optionValue === "unknown") return UNKNOWN_FILTER_VALUE;
  if (optionValue.startsWith("value:")) {
    const index = Number(optionValue.slice("value:".length));
    if (Number.isInteger(index) && index >= 0 && index < values.length) {
      return { kind: "value", value: values[index] };
    }
  }
  return ALL_FILTER_VALUES;
}
