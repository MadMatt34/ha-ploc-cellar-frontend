/**
 * Compile-time mirror of the public get_inventory response contract.
 *
 * The backend's tests/test_service_contract.py pins the response produced by
 * the service. Keep these exact key sets and the nullability assertions in
 * sync with that test whenever the backend contract intentionally changes.
 *
 * This file is intentionally imported nowhere: the TypeScript configuration
 * includes every source file, so the regular strict check evaluates these
 * assertions in CI.
 */
import type {
  InventoryResponse,
  Rack,
  RackItem,
  Wine,
  WineDiagnostic,
} from "./types";

type Assert<T extends true> = T;
type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2)
    ? true
    : false;
type Keys<T> = keyof T;
type Nullable<T> = null extends T ? true : false;

type InventoryResponseKeys = Assert<
  Equal<
    Keys<InventoryResponse>,
    | "stale"
    | "total_bottles"
    | "stocked_wines"
    | "wine_references"
    | "total_stock_bottles"
    | "stock_reconstruction_complete"
    | "total_positions"
    | "empty_positions"
    | "unlocated_wines"
    | "unlocated_bottles"
    | "negative_movement_wines"
    | "negative_movement_bottles"
    | "physical_surplus_wines"
    | "physical_surplus_bottles"
    | "wine_diagnostics"
    | "matching_wines"
    | "rack_count"
    | "occupied_positions"
    | "positions_without_rack"
    | "positions_with_unknown_wine"
    | "orders_without_wine"
    | "racks"
    | "rack_items"
    | "wines"
    | "last_sync"
  >
>;

type RackKeys = Assert<Equal<Keys<Rack>, "id" | "name">>;

type RackItemKeys = Assert<
  Equal<Keys<RackItem>, "id" | "rack_id" | "wine_id" | "row" | "column">
>;

type WineLocation = Wine["locations"][number];
type WineLocationKeys = Assert<
  Equal<Keys<WineLocation>, "rack" | "rack_id" | "row" | "column">
>;

type WineKeys = Assert<
  Equal<
    Keys<Wine>,
    | "id"
    | "name"
    | "domain"
    | "bottles"
    | "effective_stock"
    | "ploud_bottles"
    | "bottles_in_cellar"
    | "unlocated_bottles"
    | "purchased"
    | "consumed"
    | "movement_balance"
    | "calculated_stock"
    | "negative_movement_bottles"
    | "physical_surplus_bottles"
    | "vintage"
    | "appellation"
    | "color"
    | "color_rgb"
    | "classification"
    | "region"
    | "country"
    | "grapes"
    | "cuvee"
    | "comment"
    | "alcohol_percent"
    | "service_temperature_min"
    | "service_temperature_max"
    | "bottle_format"
    | "bottle_volume_l"
    | "ploud_pid"
    | "meals"
    | "image_url"
    | "locations"
  >
>;

type WineDiagnosticKeys = Assert<
  Equal<
    Keys<WineDiagnostic>,
    | "id"
    | "name"
    | "domain"
    | "vintage"
    | "purchased"
    | "consumed"
    | "movement_balance"
    | "bottles_in_cellar"
    | "effective_stock"
    | "unlocated_bottles"
    | "negative_movement_bottles"
    | "physical_surplus_bottles" | "wine"
  >
>;

/** Pin nullability that affects how the cards must render incomplete data. */
type NullableContract = Assert<
  Equal<
    [
      Nullable<InventoryResponse["last_sync"]>,
      Nullable<InventoryResponse["total_stock_bottles"]>,
      Nullable<InventoryResponse["wine_diagnostics"]>,
      Nullable<InventoryResponse["orders_without_wine"]>,
      Nullable<Wine["bottles"]>,
      Nullable<Wine["effective_stock"]>,
      Nullable<Wine["color_rgb"]>,
      Nullable<Wine["ploud_pid"]>,
      Nullable<RackItem["wine_id"]>,
      Nullable<RackItem["row"]>,
      Nullable<RackItem["column"]>,
      Nullable<WineLocation["row"]>,
      Nullable<WineLocation["column"]>,
    ],
    [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]
  >
>;

type RequiredNumericContract = Assert<
  Equal<
    [
      InventoryResponse["total_bottles"],
      InventoryResponse["total_positions"],
      RackItem["row"] extends number | null ? number : never,
      Wine["ploud_bottles"],
      Wine["bottles_in_cellar"],
    ],
    [number, number, number, number, number]
  >
>;

// Keep the aliases referenced so editor tooling exposes all contract checks.
export type BackendInventoryContract = [
  InventoryResponseKeys,
  RackKeys,
  RackItemKeys,
  WineLocationKeys,
  WineKeys,
  WineDiagnosticKeys,
  NullableContract,
  RequiredNumericContract,
];
