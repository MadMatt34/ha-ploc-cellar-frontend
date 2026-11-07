import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  InventoryResponse,
  PlocCellarCardConfig,
  RackItem,
  Wine,
} from "./types";
import { translate, translatePicker, type TranslationKey } from "./translations";
import "./ploc-cellar-wine-detail";

@customElement("ploc-cellar-rack-card")
export class PlocCellarRackCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: PlocCellarCardConfig;
  @state() private inventory?: InventoryResponse;
  @state() private selectedRackId?: string;
  @state() private loading = false;
  @state() private error?: string;
  @state() private activeTooltip?: { wine?: Wine; left: number; top: number; color: string };
  @state() private selectedWine?: Wine;
  private requestGeneration = 0;

  static styles = css`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[aria-pressed="true"] { border-color: var(--primary-color); background: var(--secondary-background-color); }
    button[disabled] { opacity: .5; cursor: default; }
    .rack-picker { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 14px 0; }
    .rack-picker-select { width: 100%; max-width: 360px; min-height: 40px; padding: 8px 12px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: 8px; font: inherit; }
    .grid-wrap { display: flex; justify-content: safe center; overflow-x: auto; padding: 4px 0 12px; }
    .rack-grid { display: grid; flex: 0 0 auto; gap: 6px; width: max-content; min-width: min-content; }
    .rack-summary { color: var(--secondary-text-color); font-size: .85rem; line-height: 1.2; text-align: center; margin: 8px 0; }
    .color-counts { text-align: center; margin-top: -2px; }
    .color-count { white-space: nowrap; }
    .slot { width: 98px; height: 98px; min-width: 98px; min-height: 98px; display: flex; overflow: hidden; flex-direction: column; justify-content: flex-start; align-items: center; gap: 3px; text-align: center; padding: 5px 4px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); box-sizing: border-box; }
    .slot.occupied { border-color: var(--primary-color); background: var(--card-background-color); cursor: help; }
    .slot.occupied[role="button"] { cursor: pointer; }
    .slot.occupied:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-tooltip { position: fixed; z-index: 1000; max-width: min(360px, calc(100vw - 24px)); padding: 5px 8px; border: 2px solid var(--wine-tooltip-border-color, var(--secondary-text-color)); border-radius: 4px; background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 2px 8px rgb(0 0 0 / 25%); font-size: .82rem; line-height: 1.45; pointer-events: none; overflow-wrap: anywhere; }
    .wine-tooltip-name { margin: 0 0 4px; font-weight: 600; }
    .wine-tooltip-details { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px 8px; margin: 0; }
    .wine-tooltip-details dt { color: var(--secondary-text-color); }
    .wine-tooltip-details dd { margin: 0; }
    .slot.missing { border-style: dashed; color: var(--secondary-text-color); background: transparent; }
    .slot.empty { position: relative; }
    .empty-shelf { display: block; position: relative; flex: 0 0 28px; width: 28px; height: 28px; margin: 0; box-sizing: border-box; }
    .empty-shelf::after { content: ""; position: absolute; right: 0; bottom: 0; left: 0; height: 14px; border: 2px solid var(--secondary-text-color); border-top: 0; border-radius: 0 0 14px 14px; box-sizing: border-box; opacity: .75; }
    .slot strong { display: -webkit-box; width: 100%; min-height: 3.45em; max-height: 3.45em; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 3; font-size: .76rem; line-height: 1.15; overflow-wrap: anywhere; }
    .slot small { color: var(--secondary-text-color); font-size: .68rem; margin-top: auto; }
    .bottle-marker { display: block; flex: 0 0 24px; width: 24px; height: 24px; border-radius: 50%; background: var(--bottle-color, var(--secondary-text-color)); border: 2px solid var(--divider-color); box-shadow: inset 0 1px 3px rgb(0 0 0 / 25%), 0 1px 2px rgb(0 0 0 / 15%); box-sizing: border-box; }
    .legend, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .unplaced { border-top: 1px solid var(--divider-color); padding-top: 10px; margin-top: 10px; }
    .unplaced-item { padding: 5px 0; }
  `;

  static getConfigElement(): HTMLElement {
    return document.createElement("ploc-cellar-card-editor");
  }

  static getStubConfig(): Partial<PlocCellarCardConfig> {
    return {};
  }

  setConfig(config: PlocCellarCardConfig): void {
    this.requestGeneration += 1;
    this.loading = false;
    this.config = config;
    this.inventory = undefined;
    this.error = undefined;
    if (this.config.config_entry_id) void this.refresh();
  }

  protected updated(): void {
    if (this.hass && this.config && !this.inventory && !this.loading && !this.error) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    const hass = this.hass;
    const config = this.config;
    if (!hass || !config?.config_entry_id || this.loading) return;
    const configEntryId = config.config_entry_id;
    const generation = ++this.requestGeneration;
    this.loading = true;
    this.error = undefined;
    try {
      const result = await hass.callWS<{ response: InventoryResponse }>({
        type: "call_service",
        domain: "ploc_cellar",
        service: "get_inventory",
        service_data: { config_entry_id: configEntryId },
        return_response: true,
      });
      if (generation === this.requestGeneration) {
        this.inventory = result.response;
        if (!this.selectedRackId || !this.inventory.racks.some((rack) => rack.id === this.selectedRackId)) {
          this.selectedRackId = this.inventory.racks[0]?.id;
        }
      }
    } catch (error) {
      if (generation === this.requestGeneration) {
        this.error = error instanceof Error ? error.message : String(error);
      }
    } finally {
      if (generation === this.requestGeneration) this.loading = false;
    }
  }

  private get selectedItems(): RackItem[] {
    return (this.inventory?.rack_items ?? []).filter((item) => item.rack_id === this.selectedRackId);
  }

  private get positionedItems(): RackItem[] {
    return this.selectedItems.filter(
      (item) => item.row !== null && item.column !== null,
    );
  }

  private get rowValues(): number[] {
    return this.positionedItems.map((item) => item.row as number);
  }

  private get columnValues(): number[] {
    return this.positionedItems.map((item) => item.column as number);
  }

  private get firstRow(): number {
    return Math.min(...this.rowValues);
  }

  private get firstColumn(): number {
    return Math.min(...this.columnValues);
  }

  private get rowCount(): number {
    return Math.max(...this.rowValues) - this.firstRow + 1;
  }

  private get columnCount(): number {
    return Math.max(...this.columnValues) - this.firstColumn + 1;
  }

  private get missingCoordinates(): Array<{ row: number; column: number }> {
    if (!this.positionedItems.length) return [];
    const known = new Set(
      this.positionedItems.map((item) => `${item.row}:${item.column}`),
    );
    const missing: Array<{ row: number; column: number }> = [];
    for (let row = this.firstRow; row <= Math.max(...this.rowValues); row += 1) {
      for (
        let column = this.firstColumn;
        column <= Math.max(...this.columnValues);
        column += 1
      ) {
        if (!known.has(`${row}:${column}`)) missing.push({ row, column });
      }
    }
    return missing;
  }

  private get wineById(): Map<string, Wine> {
    return new Map((this.inventory?.wines ?? []).map((wine) => [wine.id, wine]));
  }

  private get selectedRackColorCounts(): Array<[string, number]> {
    const counts = new Map<string, number>();
    for (const item of this.selectedItems) {
      if (!item.wine_id) continue;
      const color = this.wineById.get(item.wine_id)?.color?.trim();
      if (!color) continue;
      counts.set(color, (counts.get(color) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([left], [right]) => left.localeCompare(right, this.hass?.language));
  }

  private selectRack(event: Event): void {
    if (event.currentTarget instanceof HTMLSelectElement) {
      this.selectedRackId = event.currentTarget.value;
    }
  }

  private wineLabel(item: RackItem): string {
    if (!item.wine_id) return "";
    const wine = this.wineById.get(item.wine_id);
    return wine ? wine.name : translate(this.hass?.language ?? "en", "unknown_wine");
  }

  private displayWineLabel(item: RackItem): string {
    return this.wineLabel(item);
  }

  private wineColor(wine: Wine | undefined): string {
    const rgb = wine?.color_rgb;
    if (
      !rgb ||
      rgb.length !== 3 ||
      !rgb.every((component) => Number.isInteger(component) && component >= 0 && component <= 255)
    ) {
      return "var(--secondary-text-color)";
    }
    return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
  }

  private wineTooltipFields(wine: Wine): Array<[string, string]> {
    const language = this.hass?.language ?? "en";
    const t = (key: TranslationKey): string => translate(language, key);
    const fields: Array<[string, string]> = [];
    if (wine.vintage !== null) fields.push([t("tooltip_vintage"), String(wine.vintage)]);
    if (wine.appellation) fields.push([t("tooltip_appellation"), wine.appellation]);
    const regionAndCountry = [wine.region, wine.country].filter(Boolean).join(" / ");
    if (regionAndCountry) {
      fields.push([t("tooltip_region_country"), regionAndCountry]);
    }
    return fields;
  }

  private showWineTooltip(event: PointerEvent | FocusEvent, wine?: Wine): void {
    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    const isPointer = "clientX" in event;
    this.activeTooltip = {
      wine,
      left: isPointer ? event.clientX + 12 : rect.right + 8,
      top: isPointer ? event.clientY + 12 : rect.top,
      color: this.wineColor(wine),
    };
  }

  private hideWineTooltip(): void {
    this.activeTooltip = undefined;
  }

  protected render() {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const data = this.inventory;
    const rack = data?.racks.find((item) => item.id === this.selectedRackId);
    const rows = this.rowValues;
    const columns = this.columnValues;
    const items = this.positionedItems;
    const unplaced = this.selectedItems.filter((item) => item.row === null || item.column === null);
    const rackItemsWithUnknownRack = (data?.rack_items ?? []).filter(
      (item) => !data?.racks.some((candidate) => candidate.id === item.rack_id),
    );

    return html`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? (t("rack_title"))}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>${this.loading ? "…" : (t("refresh"))}</button>
        </header>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        ${!this.config?.config_entry_id ? html`<div class="muted">${t("select_config")}</div>` : nothing}
        ${data?.stale ? html`<div class="warning">${t("stale")}</div>` : nothing}
        ${data?.racks.length ? html`
          ${data.racks.length > 1
            ? this.config?.rack_picker_mode === "dropdown"
              ? html`
                <div class="rack-picker">
                  <select class="rack-picker-select"
                    aria-label=${t("rack_selection")}
                    .value=${this.selectedRackId ?? ""}
                    @change=${this.selectRack}>
                    ${data.racks.map((item) => html`
                      <option value=${item.id}>${item.name}</option>
                    `)}
                  </select>
                </div>
              `
              : html`
                <nav class="rack-picker" aria-label=${t("rack_selection")}>
                  ${data.racks.map((item) => html`
                    <button aria-pressed=${item.id === this.selectedRackId}
                      @click=${() => { this.selectedRackId = item.id; }}>${item.name}</button>
                  `)}
                </nav>
              `
            : nothing}
          <div class="rack-summary">
            <div><strong>${rack?.name ?? ""}</strong> · ${this.selectedItems.filter((item) => item.wine_id).length} ${t("occupied")} · ${this.selectedItems.filter((item) => !item.wine_id).length} ${t("free")}</div>
            ${this.selectedRackColorCounts.length ? html`<div class="color-counts">${this.selectedRackColorCounts.map(([color, count], index) => html`${index ? " · " : nothing}<span class="color-count">${color}: ${count}</span>`)}</div>` : nothing}
          </div>
          ${rows.length && columns.length ? html`
            <div class="grid-wrap">
              <div class="rack-grid" style=${`grid-template-columns: repeat(${this.columnCount}, 98px); grid-template-rows: repeat(${this.rowCount}, 98px);`}>
                ${items.map((item) => {
                  const row = (item.row as number) - this.firstRow + 1;
                  const column = (item.column as number) - this.firstColumn + 1;
                  const occupied = Boolean(item.wine_id);
                  const wine = item.wine_id ? this.wineById.get(item.wine_id) : undefined;
                  const label = occupied ? this.wineLabel(item) : t("empty_position");
                  return html`
                    <div class=${occupied ? "slot occupied" : "slot empty"}
                      style=${`grid-row: ${row}; grid-column: ${column};`}
                      aria-label=${label}
                      role=${wine ? "button" : nothing}
                      aria-haspopup=${wine ? "dialog" : nothing}
                      tabindex=${occupied ? "0" : nothing}
                      @click=${wine ? () => { this.selectedWine = wine; } : nothing}
                      @keydown=${wine ? (event: KeyboardEvent) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          this.selectedWine = wine;
                        }
                      } : nothing}
                      @pointerenter=${occupied ? (event: PointerEvent) => this.showWineTooltip(event, wine) : nothing}
                      @pointermove=${occupied ? (event: PointerEvent) => this.showWineTooltip(event, wine) : nothing}
                      @pointerleave=${occupied ? () => this.hideWineTooltip() : nothing}
                      @focus=${occupied ? (event: FocusEvent) => this.showWineTooltip(event, wine) : nothing}
                      @blur=${occupied ? () => this.hideWineTooltip() : nothing}>
                      ${occupied ? html`<span class="bottle-marker" style=${`--bottle-color: ${this.wineColor(wine)};`} aria-hidden="true"></span>` : nothing}
                      ${occupied ? html`<strong>${this.displayWineLabel(item)}</strong>` : html`<span class="empty-shelf" aria-hidden="true"></span>`}
                      <small>r${(item.row as number) + 1};c${(item.column as number) + 1}</small>
                    </div>
                  `;
                })}
                ${this.missingCoordinates.map((position) => html`
                  <div class="slot missing"
                    style=${`grid-row: ${position.row - this.firstRow + 1}; grid-column: ${position.column - this.firstColumn + 1};`}>
                    <strong>—</strong>
                    <small>${t("not_mapped")}</small>
                  </div>
                `)}
              </div>
            </div>
          ` : html`<div class="warning">${t("no_coordinates")}</div>`}
          ${unplaced.length ? html`
            <div class="unplaced">
              <strong>${t("positions_without_coordinates")}</strong>
              ${unplaced.map((item) => html`<div class="unplaced-item">${this.wineLabel(item) || (t("empty_position"))}</div>`)}
            </div>
          ` : nothing}
        ` : html`<p class="muted">${t("no_racks")}</p>`}
        ${rackItemsWithUnknownRack.length ? html`
          <div class="warning">${rackItemsWithUnknownRack.length} ${t("missing_rack")}</div>
        ` : nothing}
        ${this.activeTooltip ? html`
          <div class="wine-tooltip"
            role="tooltip"
            style=${`left: ${this.activeTooltip.left}px; top: ${this.activeTooltip.top}px; --wine-tooltip-border-color: ${this.activeTooltip.color};`}>
            ${this.activeTooltip.wine ? html`
              <div class="wine-tooltip-name">${this.activeTooltip.wine.name}</div>
              <dl class="wine-tooltip-details">
                ${this.wineTooltipFields(this.activeTooltip.wine).map(([name, value]) => html`
                  <dt>${name}</dt><dd>${value}</dd>
                `)}
              </dl>
            ` : t("unknown_wine")}
          </div>
        ` : nothing}
        ${this.selectedWine ? html`
          <ploc-cellar-wine-detail
            .hass=${this.hass}
            .wine=${this.selectedWine}
            @wine-detail-closed=${() => { this.selectedWine = undefined; }}>
          </ploc-cellar-wine-detail>
        ` : nothing}
      </ha-card>
    `;
  }

  getCardSize(): number {
    return 5;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
    };
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, string>>;
  }

  interface HTMLElementTagNameMap {
    "ploc-cellar-rack-card": PlocCellarRackCard;
  }
}

window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-rack-card",
  name: translatePicker("picker_rack_name"),
  description: translatePicker("picker_rack_description"),
});
