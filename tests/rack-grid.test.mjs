import assert from "node:assert/strict";
import test from "node:test";

import {
  buildRackGridLayout,
  clampTooltipPosition,
  MAX_RACK_GRID_CELLS,
} from "../.test-dist/rack-grid.js";

test("empty rack has no grid cells", () => {
  assert.deepEqual(buildRackGridLayout([]), {
    compact: false,
    rowCount: 0,
    columnCount: 0,
    positions: [],
    missingCoordinates: [],
  });
});

test("small rack preserves coordinates and identifies missing positions", () => {
  const layout = buildRackGridLayout([
    { id: "a", row: 4, column: 7 },
    { id: "b", row: 5, column: 8 },
  ]);

  assert.equal(layout.compact, false);
  assert.equal(layout.rowCount, 2);
  assert.equal(layout.columnCount, 2);
  assert.deepEqual(layout.positions, [
    { id: "a", row: 1, column: 1 },
    { id: "b", row: 2, column: 2 },
  ]);
  assert.deepEqual(layout.missingCoordinates, [
    { row: 1, column: 2 },
    { row: 2, column: 1 },
  ]);
});

test("large sparse coordinates switch to a bounded compact grid", () => {
  const layout = buildRackGridLayout([
    { id: "a", row: 0, column: 0 },
    { id: "b", row: 1_000_000, column: 1_000_000 },
  ]);

  assert.equal(layout.compact, true);
  assert.equal(layout.rowCount, 1);
  assert.equal(layout.columnCount, 2);
  assert.equal(layout.positions.length, 2);
  assert.deepEqual(layout.missingCoordinates, []);
  assert.ok(layout.rowCount * layout.columnCount <= MAX_RACK_GRID_CELLS);
});

test("dense racks retain their physical layout up to the cell limit", () => {
  const items = Array.from({ length: 20 }, (_, index) => ({
    id: String(index),
    row: Math.floor(index / 5),
    column: index % 5,
  }));
  const layout = buildRackGridLayout(items);

  assert.equal(layout.compact, false);
  assert.equal(layout.rowCount * layout.columnCount, 20);
  assert.equal(layout.missingCoordinates.length, 0);
});

test("compact layout is deterministic and does not mutate its input", () => {
  const items = [
    { id: "b", row: 900, column: 800 },
    { id: "a", row: 0, column: 0 },
  ];
  const original = structuredClone(items);
  const layout = buildRackGridLayout(items);

  assert.deepEqual(items, original);
  assert.deepEqual(layout.positions, [
    { id: "a", row: 1, column: 1 },
    { id: "b", row: 1, column: 2 },
  ]);
});

test("tooltip position is clamped to the viewport", () => {
  assert.deepEqual(
    clampTooltipPosition(980, 780, 240, 120, 1024, 768),
    { left: 772, top: 636 },
  );
  assert.deepEqual(
    clampTooltipPosition(-20, -10, 100, 80, 500, 400),
    { left: 12, top: 12 },
  );
});

test("tooltip remains usable when it is larger than the viewport", () => {
  assert.deepEqual(
    clampTooltipPosition(900, 900, 800, 700, 400, 300),
    { left: 12, top: 12 },
  );
});
