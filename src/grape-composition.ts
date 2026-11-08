export interface GrapeCompositionItem {
  name: string;
  percentage: number | null;
}

/**
 * Parse a display-only grape list. A grape without an explicit percentage is
 * treated as a single-variety wine (100%). Invalid explicit percentages remain
 * unknown rather than being interpreted as a full proportion.
 */
export function parseGrapeComposition(value: string): GrapeCompositionItem[] {
  return value
    .split(/[;,\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const match = /^(.*?)\s*(?:\(\s*)?(\d+(?:[.,]\d+)?)\s*%\s*\)?$/.exec(part);
      if (!match) {
        return { name: part, percentage: /%/.test(part) ? null : 100 };
      }

      const name = match[1].trim().replace(/[:\-–—]+$/, "").trim();
      const percentage = Number(match[2].replace(",", "."));
      if (!name || !Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
        return { name: part, percentage: null };
      }
      return { name, percentage };
    });
}