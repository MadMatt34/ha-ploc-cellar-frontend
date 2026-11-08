export interface GrapeCompositionItem {
  name: string;
  percentage: number | null;
}

/**
 * Parse a display-only grape list. PLOUD may place the percentage before or
 * after the grape name. A grape without an explicit percentage is treated as
 * a single-variety wine (100%); invalid explicit percentages remain unknown.
 */
export function parseGrapeComposition(value: string): GrapeCompositionItem[] {
  return value
    .split(/(?<!\d),(?!\d)|[;\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const prefixMatch = /^(\d+(?:[.,]\d+)?)\s*%\s*(.+)$/.exec(part);
      const suffixMatch = /^(.*?)\s*(?:\(\s*)?(\d+(?:[.,]\d+)?)\s*%\s*\)?$/.exec(part);
      const match = prefixMatch ?? suffixMatch;

      if (!match) {
        return { name: part, percentage: /%/.test(part) ? null : 100 };
      }

      const name = (prefixMatch ? match[2] : match[1])
        .trim()
        .replace(/^[:\-–—]+|[:\-–—]+$/g, "")
        .trim();
      const percentage = Number((prefixMatch ? match[1] : match[2]).replace(",", "."));

      if (!name || !Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
        return { name: part, percentage: null };
      }
      return { name, percentage };
    });
}
