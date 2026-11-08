export interface WineLocation {
  rack: string;
  rack_id: string;
  row: number | null;
  column: number | null;
}

export interface GroupedWineLocations {
  rack: string;
  rackId: string;
  coordinates: Array<{ row: number | null; column: number | null }>;
}

/** Group all positions belonging to the same physical rack, preserving order. */
export function groupWineLocations(locations: readonly WineLocation[]): GroupedWineLocations[] {
  const groups = new Map<string, GroupedWineLocations>();

  for (const location of locations) {
    let group = groups.get(location.rack_id);
    if (!group) {
      group = { rack: location.rack, rackId: location.rack_id, coordinates: [] };
      groups.set(location.rack_id, group);
    }
    group.coordinates.push({ row: location.row, column: location.column });
  }

  return [...groups.values()];
}