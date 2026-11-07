export interface RackGridItem {
  id: string;
  row: number;
  column: number;
}

export interface RackGridPosition {
  id: string;
  row: number;
  column: number;
}

export interface RackGridLayout {
  compact: boolean;
  rowCount: number;
  columnCount: number;
  positions: RackGridPosition[];
  missingCoordinates: Array<{ row: number; column: number }>;
}

export const MAX_RACK_GRID_CELLS = 400;
const COMPACT_GRID_MAX_COLUMNS = 4;

/**
 * Build a bounded rack layout.
 *
 * Small coordinate ranges retain their physical spacing and show missing
 * positions. Large or sparse ranges switch to a compact display so malformed
 * or widely separated coordinates cannot allocate an enormous CSS grid.
 */
export function buildRackGridLayout(
  items: readonly RackGridItem[],
): RackGridLayout {
  if (items.length === 0) {
    return {
      compact: false,
      rowCount: 0,
      columnCount: 0,
      positions: [],
      missingCoordinates: [],
    };
  }

  const minRow = Math.min(...items.map((item) => item.row));
  const maxRow = Math.max(...items.map((item) => item.row));
  const minColumn = Math.min(...items.map((item) => item.column));
  const maxColumn = Math.max(...items.map((item) => item.column));
  const rowSpan = maxRow - minRow + 1;
  const columnSpan = maxColumn - minColumn + 1;
  const isBounded =
    Number.isSafeInteger(rowSpan) &&
    Number.isSafeInteger(columnSpan) &&
    rowSpan > 0 &&
    columnSpan > 0 &&
    rowSpan <= MAX_RACK_GRID_CELLS / columnSpan;

  if (isBounded) {
    const known = new Set(items.map((item) => `${item.row}:${item.column}`));
    const missingCoordinates: Array<{ row: number; column: number }> = [];

    for (let row = minRow; row <= maxRow; row += 1) {
      for (let column = minColumn; column <= maxColumn; column += 1) {
        if (!known.has(`${row}:${column}`)) {
          missingCoordinates.push({ row, column });
        }
      }
    }

    return {
      compact: false,
      rowCount: rowSpan,
      columnCount: columnSpan,
      positions: items.map((item) => ({
        id: item.id,
        row: item.row - minRow + 1,
        column: item.column - minColumn + 1,
      })),
      missingCoordinates: missingCoordinates.map((position) => ({
        row: position.row - minRow + 1,
        column: position.column - minColumn + 1,
      })),
    };
  }

  const columnCount = Math.min(
    COMPACT_GRID_MAX_COLUMNS,
    Math.max(1, Math.ceil(Math.sqrt(items.length))),
  );
  const sortedItems = [...items].sort(
    (left, right) =>
      left.row - right.row ||
      left.column - right.column ||
      left.id.localeCompare(right.id),
  );

  return {
    compact: true,
    rowCount: Math.ceil(sortedItems.length / columnCount),
    columnCount,
    positions: sortedItems.map((item, index) => ({
      id: item.id,
      row: Math.floor(index / columnCount) + 1,
      column: (index % columnCount) + 1,
    })),
    missingCoordinates: [],
  };
}

export interface TooltipPosition {
  left: number;
  top: number;
}

/** Keep a fixed-position tooltip inside the visible viewport. */
export function clampTooltipPosition(
  left: number,
  top: number,
  tooltipWidth: number,
  tooltipHeight: number,
  viewportWidth: number,
  viewportHeight: number,
  margin = 12,
): TooltipPosition {
  const maxLeft = Math.max(margin, viewportWidth - tooltipWidth - margin);
  const maxTop = Math.max(margin, viewportHeight - tooltipHeight - margin);

  return {
    left: Math.min(Math.max(margin, left), maxLeft),
    top: Math.min(Math.max(margin, top), maxTop),
  };
}
