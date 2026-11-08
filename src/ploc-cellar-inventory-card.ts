import { LitElement, css, html, nothing } from "lit";
import "./numeric-typography";
import { customElement, property, state } from "lit/decorators.js";

import type {
  HomeAssistant,
  InventoryResponse,
  PlocCellarCardConfig,
  Wine,
} from "./types";
import { translate, translatePicker, type TranslationKey } from "./translations";
import { fetchInventory } from "./inventory-client";
import { getMealTranslationKeys } from "./meals";
import {
  ALL_FILTER_VALUES,
  getInventoryFilterOptionValue,
  isMissingInventoryValue,
  matchesInventoryFilter,
  parseInventoryFilterOptionValue,
  type InventoryFilterSelection,
} from "./inventory-filters";
import "./ploc-cellar-wine-detail";

type SortMode = "name-asc" | "name-desc" | "bottles-asc" | "bottles-desc" | "vintage-asc" | "vintage-desc";

@customElement("ploc-cellar-inventory-card")
export class PlocCellarInventoryCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: PlocCellarCardConfig;
  @state() private inventory?: InventoryResponse;
  @state() private loading = false;
  @state() private error?: string;
  @state() private search = "";
  @state() private color: InventoryFilterSelection = ALL_FILTER_VALUES;
  @state() private region: InventoryFilterSelection = ALL_FILTER_VALUES;
  @state() private appellation: InventoryFilterSelection = ALL_FILTER_VALUES;
  @state() private vintage: InventoryFilterSelection = ALL_FILTER_VALUES;
  @state() private meal: TranslationKey | "" = "";
  @state() private sort: SortMode = "name-asc";
  @state() private selectedWine?: Wine;
  private requestGeneration = 0;

  static styles = css`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.2rem; font-weight: 500; }
    button, select, input {
      color: var(--primary-text-color);
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 9px 10px;
      min-width: 0;
    }
    button { background: var(--secondary-background-color); cursor: pointer; }
    button[disabled] { opacity: .5; cursor: default; }
    input { box-sizing: border-box; width: 100%; }
    .toolbar { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 8px; margin: 10px 0 0; }
    .search { grid-column: 1 / -1; }
    .summary { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; color: var(--secondary-text-color); font-size: .85rem; margin: 12px 0; }
    .wine-list { display: grid; gap: 8px; }
    .wine { display: block; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-left: 6px solid var(--wine-color, var(--divider-color)); border-radius: 10px; padding: 12px; min-width: 0; background: var(--card-background-color, var(--ha-card-background)); color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
    .wine:hover { background: var(--secondary-background-color); }
    .wine:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-main { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .wine-name { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
    .quantity { display: flex; flex: 0 0 auto; align-items: center; gap: 5px; white-space: nowrap; font-family: var(--ploc-numeric-font-family); font-size: 1.05rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .quantity ha-icon { --mdc-icon-size: 20px; color: var(--wine-color, var(--secondary-text-color)); }
    .metadata { color: var(--secondary-text-color); font-size: .85rem; margin-top: 5px; line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
    .tag { border-radius: 999px; background: var(--secondary-background-color); padding: 3px 8px; font-size: .75rem; }
    .filters { margin: 14px 0; }
    .filters[open] { padding: 10px; border: 1px solid var(--outline-color, var(--divider-color)); border-radius: 10px; background: var(--secondary-background-color); }
    .filters > summary { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; padding: 4px 0; list-style: none; }
    .filters[open] > summary { color: var(--primary-text-color); padding-bottom: 8px; border-bottom: 1px solid var(--divider-color); }
    .filters > summary::-webkit-details-marker { display: none; }
    .filters-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
    .filters-chevron { --mdc-icon-size: 18px; margin-left: auto; color: var(--secondary-text-color); transition: transform 120ms ease; }
    .filters[open] .filters-chevron { transform: rotate(90deg); }
    .sort-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
    .sort-row > span { flex: 0 0 auto; color: var(--secondary-text-color); font-size: .9rem; }
    .sort-row select { flex: 1; width: 100%; }
    .filters > summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 4px; border-radius: 2px; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .actions { display: flex; gap: 8px; align-items: center; }
    @media (max-width: 420px) {
      ha-card { padding: 12px; }
      .toolbar { grid-template-columns: 1fr 1fr; }
    }
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
    if (config.config_entry_id) void this.refresh();
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
      const inventory = await fetchInventory(hass, configEntryId);
      if (generation === this.requestGeneration) this.inventory = inventory;
    } catch (error) {
      if (generation === this.requestGeneration) {
        this.error = error instanceof Error ? error.message : String(error);
      }
    } finally {
      if (generation === this.requestGeneration) this.loading = false;
    }
  }

  private valuesFor(field: "color" | "region" | "appellation" | "vintage"): string[] {
    const values = (this.inventory?.wines ?? [])
      .map((wine) => wine[field])
      .filter((value): value is string | number => !isMissingInventoryValue(value));
    return [...new Set(values.map(String))].sort((a, b) =>
      a.localeCompare(b, this.hass?.language ?? undefined, { numeric: true, sensitivity: "base" }),
    );
  }

  private get filteredWines(): Wine[] {
    const query = this.search.trim().toLocaleLowerCase();
    const wines = (this.inventory?.wines ?? []).filter((wine) => {
      if (!matchesInventoryFilter(wine.color, this.color)) return false;
      if (!matchesInventoryFilter(wine.region, this.region)) return false;
      if (!matchesInventoryFilter(wine.appellation, this.appellation)) return false;
      if (!matchesInventoryFilter(wine.vintage, this.vintage)) return false;
      if (this.meal && !getMealTranslationKeys(wine.meals).includes(this.meal)) return false;
      if (!query) return true;
      return [wine.name, wine.domain]
        .filter((value): value is string => value !== null)
        .join(" ").toLocaleLowerCase().includes(query);
    });
    const collator = new Intl.Collator(this.hass?.language ?? undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return [...wines].sort((a, b) => {
      if (this.sort === "name-desc") return collator.compare(b.name, a.name);
      if (this.sort === "bottles-asc" || this.sort === "bottles-desc") {
        const difference = a.bottles_in_cellar - b.bottles_in_cellar;
        return (this.sort === "bottles-asc" ? difference : -difference)
          || collator.compare(a.name, b.name);
      }
      if (this.sort === "vintage-asc" || this.sort === "vintage-desc") {
        if (a.vintage == null && b.vintage != null) return 1;
        if (a.vintage != null && b.vintage == null) return -1;
        const difference = (a.vintage ?? 0) - (b.vintage ?? 0);
        return (this.sort === "vintage-asc" ? difference : -difference)
          || collator.compare(a.name, b.name);
      }
      return collator.compare(a.name, b.name);
    });
  }

  private clearFilters(): void {
    this.search = "";
    this.color = ALL_FILTER_VALUES;
    this.region = ALL_FILTER_VALUES;
    this.appellation = ALL_FILTER_VALUES;
    this.vintage = ALL_FILTER_VALUES;
    this.meal = "";
    this.sort = "name-asc";
  }

  private mealValues(): TranslationKey[] {
    const values = new Set<TranslationKey>();
    for (const wine of this.inventory?.wines ?? []) {
      for (const key of getMealTranslationKeys(wine.meals)) values.add(key);
    }
    return [...values].sort((a, b) =>
      translate(this.hass?.language ?? "en", a).localeCompare(
        translate(this.hass?.language ?? "en", b),
        this.hass?.language ?? undefined,
        { sensitivity: "base" },
      ),
    );
  }

  private selectMealFilter() {
    const t = (key: TranslationKey): string => translate(this.hass?.language ?? "en", key);
    return html`
      <select aria-label=${t("filter_meal")} .value=${this.meal}
        @change=${(event: Event) => {
          this.meal = (event.target as HTMLSelectElement).value as TranslationKey | "";
        }}>
        <option value="" ?selected=${!this.meal}>${t("filter_meal")}</option>
        ${this.mealValues().map((key) => html`<option value=${key} ?selected=${key === this.meal}>${t(key)}</option>`)}
      </select>
    `;
  }

  private selectFilter(
    key: "color" | "region" | "appellation" | "vintage",
    label: string,
    selection: InventoryFilterSelection,
    values: string[],
  ) {
    const optionValue = getInventoryFilterOptionValue(selection, values);
    return html`
      <select aria-label=${label} .value=${optionValue}
        @change=${(event: Event) => {
          const nextSelection = parseInventoryFilterOptionValue(
            (event.target as HTMLSelectElement).value,
            values,
          );
          if (key === "color") this.color = nextSelection;
          else if (key === "region") this.region = nextSelection;
          else if (key === "appellation") this.appellation = nextSelection;
          else this.vintage = nextSelection;
        }}>
        <option value="all" ?selected=${selection.kind === "all"}>${label}</option>
        <option value="unknown" ?selected=${selection.kind === "unknown"}>${translate(this.hass?.language ?? "en", "filter_unknown")}</option>
        ${values.map((item, index) => html`<option value=${`value:${index}`} ?selected=${selection.kind === "value" && selection.value === item}>${item}</option>`)}
      </select>
    `;
  }

  private renderWine(wine: Wine) {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const vintage = wine.vintage === null ? t("unknown_vintage") : String(wine.vintage);
    const color = wine.color_rgb?.every(Number.isFinite)
      ? wine.color_rgb.map((component) => Math.round(Math.min(255, Math.max(0, component))))
      : null;
    const wineColor = color ? `rgb(${color.join(", ")})` : "";

    return html`
      <button class="wine" type="button" aria-haspopup="dialog"
        aria-label=${`${wine.name}, ${new Intl.NumberFormat(this.hass?.language ?? undefined).format(wine.bottles_in_cellar)} ${t("bottles_short")}`}
        style=${wineColor ? "--wine-color: " + wineColor : ""}
        @click=${() => { this.selectedWine = wine; }}>
        <div class="wine-main">
          <div>
            <div class="wine-name">${wine.name}</div>
            <div class="metadata">${[
              wine.appellation,
              wine.region,
              wine.country,
            ].filter(Boolean).join(" · ")}</div>
          </div>
          <div class="quantity"><span>${new Intl.NumberFormat(this.hass?.language ?? undefined).format(wine.bottles_in_cellar)}</span><ha-icon icon="mdi:bottle-wine" aria-hidden="true"></ha-icon></div>
        </div>
        <div class="tags">
          ${wine.color ? html`<span class="tag">${wine.color}</span>` : nothing}
          <span class="tag">${vintage}</span>
          ${wine.bottle_format ? html`<span class="tag">${wine.bottle_format}</span>` : nothing}
        </div>
      </button>
    `;
  }

  protected render() {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const wines = this.filteredWines;
    const total = wines.reduce((sum, wine) => sum + wine.bottles_in_cellar, 0);
    const activeFilters = Boolean(
      this.search
      || this.color.kind !== "all"
      || this.region.kind !== "all"
      || this.appellation.kind !== "all"
      || this.vintage.kind !== "all"
      || this.meal,
    );

    return html`
      <ha-card>
        <header>
          <h2>${this.config?.title ?? t("inventory_title")}</h2>
          <div class="actions">
            <button ?disabled=${this.loading} @click=${() => this.refresh()}>
              ${this.loading ? t("loading") : t("refresh")}
            </button>
          </div>
        </header>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        ${!this.config?.config_entry_id
          ? html`<div class="muted">${t("select_config")}</div>`
          : nothing}
        ${this.inventory?.stale ? html`<div class="warning">${t("stale")}</div>` : nothing}
        ${this.inventory ? html`
          <input class="search" type="search" aria-label=${t("search_wine")}
            placeholder=${t("search_placeholder")} .value=${this.search}
            @input=${(event: Event) => { this.search = (event.target as HTMLInputElement).value; }} />
          <details class="filters">
            <summary><ha-icon class="filters-icon" icon="mdi:filter-variant" aria-hidden="true"></ha-icon><span>${t("inventory_filters")}</span><ha-icon class="filters-chevron" icon="mdi:chevron-right" aria-hidden="true"></ha-icon></summary>
            <div class="toolbar">
              ${this.selectFilter("color", t("filter_color"), this.color, this.valuesFor("color"))}
              ${this.selectFilter("region", t("filter_region"), this.region, this.valuesFor("region"))}
              ${this.selectFilter("appellation", t("filter_appellation"), this.appellation, this.valuesFor("appellation"))}
              ${this.selectFilter("vintage", t("filter_vintage"), this.vintage, this.valuesFor("vintage"))}
              ${this.selectMealFilter()}
            </div>
            <label class="sort-row">
              <span>${t("sort_by")}</span>
              <select aria-label=${t("sort_by")} .value=${this.sort}
                @change=${(event: Event) => { this.sort = (event.target as HTMLSelectElement).value as SortMode; }}>
                <option value="name-asc">${t("sort_name_asc")}</option>
                <option value="name-desc">${t("sort_name_desc")}</option>
                <option value="bottles-asc">${t("sort_bottles_asc")}</option>
                <option value="bottles-desc">${t("sort_bottles_desc")}</option>
                <option value="vintage-asc">${t("sort_vintage_asc")}</option>
                <option value="vintage-desc">${t("sort_vintage_desc")}</option>
              </select>
            </label>
          </details>
          <div class="summary">
            <span>${t("inventory_results").replace("{count}", String(wines.length))}</span>
            <span>${t("inventory_bottle_total").replace("{count}", String(total))}</span>
            ${activeFilters ? html`<button @click=${() => this.clearFilters()}>${t("clear_filters")}</button>` : nothing}
          </div>
          ${!this.inventory.stock_reconstruction_complete
            ? html`<div class="warning">${t("reconstruction_incomplete")}</div>`
            : nothing}
          <div class="wine-list">
            ${wines.map((wine) => this.renderWine(wine))}
          </div>
          ${wines.length === 0 ? html`<p class="muted">${t("no_matching_wines")}</p>` : nothing}
          ${this.selectedWine ? html`
            <ploc-cellar-wine-detail
              .hass=${this.hass}
              .wine=${this.selectedWine}
              @wine-detail-closed=${() => { this.selectedWine = undefined; }}>
            </ploc-cellar-wine-detail>
          ` : nothing}
        ` : nothing}
      </ha-card>
    `;
  }

  getCardSize(): number {
    return 6;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" as const };
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, string>>;
  }

  interface HTMLElementTagNameMap {
    "ploc-cellar-inventory-card": PlocCellarInventoryCard;
  }
}

window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-inventory-card",
  name: translatePicker("picker_inventory_name"),
  description: translatePicker("picker_inventory_description"),
});
