import assert from "node:assert/strict";
import test from "node:test";

import { getIncompleteCoordinates, groupCoordinatesByRow, groupWineLocations } from "../.test-dist/wine-locations.js";

test("groups positions into one rack while preserving rack and coordinate order", () => {
  assert.deepEqual(groupWineLocations([
    { rack: "Cave principale", rack_id: "rack-1", row: 0, column: 1 },
    { rack: "Cave secondaire", rack_id: "rack-2", row: 2, column: 3 },
    { rack: "Cave principale", rack_id: "rack-1", row: 1, column: 0 },
  ]), [
    { rack: "Cave principale", rackId: "rack-1", coordinates: [{ row: 0, column: 1 }, { row: 1, column: 0 }] },
    { rack: "Cave secondaire", rackId: "rack-2", coordinates: [{ row: 2, column: 3 }] },
  ]);
});

test("keeps positions without complete coordinates in their rack group", () => {
  assert.deepEqual(groupWineLocations([
    { rack: "Cave", rack_id: "rack-1", row: null, column: 2 },
    { rack: "Cave", rack_id: "rack-1", row: null, column: null },
  ]), [{
    rack: "Cave",
    rackId: "rack-1",
    coordinates: [{ row: null, column: 2 }, { row: null, column: null }],
  }]);
});

test("returns no groups for an empty location list", () => {
  assert.deepEqual(groupWineLocations([]), []);
});

test("groups coordinate tags horizontally by physical row", () => {
  assert.deepEqual(groupCoordinatesByRow([
    { row: 0, column: 1 },
    { row: 0, column: 2 },
    { row: 1, column: 0 },
    { row: 0, column: 3 },
    { row: null, column: 4 },
    { row: 2, column: null },
  ]), [
    { row: 0, columns: [1, 2, 3] },
    { row: 1, columns: [0] },
  ]);
});


test("returns incomplete coordinates without dropping their known axis", () => {
  assert.deepEqual(getIncompleteCoordinates([
    { row: 0, column: 1 },
    { row: null, column: 2 },
    { row: 3, column: null },
    { row: null, column: null },
  ]), [
    { row: null, column: 2 },
    { row: 3, column: null },
    { row: null, column: null },
  ]);
});
