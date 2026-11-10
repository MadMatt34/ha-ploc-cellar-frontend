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
import { fetchInventory, subscribeToInventorySync } from "./inventory-client";
import { getMealTranslationKeys, type MealTranslationKey } from "./meals";
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
  @state() private meal: MealTranslationKey | "" = "";
  @state() private sort: SortMode = "name-asc";
  @state() private currentPage = 1;
  @state() private selectedWine?: Wine;
  private requestGeneration = 0;
  private refreshPending = false;
  private syncConnection?: HomeAssistant["connection"];
  private syncEntryId?: string;
  private syncUnsubscribe?: () => void;
  private syncSubscriptionGeneration = 0;

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
    .summary { display: flex; color: var(--secondary-text-color); font-size: .85rem; }
    .summary span + span::before { content: "·"; margin: 0 8px; }
    .wine-list { display: grid; gap: 8px; }
    .wine { position: relative; display: block; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-left: 6px solid var(--wine-color, var(--divider-color)); border-radius: 10px; padding: 10px; min-width: 0; background: var(--card-background-color, var(--ha-card-background)); color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
    .wine:hover { background: var(--secondary-background-color); }
    .wine:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .wine-main { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .wine-name { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
    .quantity { display: flex; flex: 0 0 auto; align-items: center; gap: 5px; white-space: nowrap; font-family: var(--ploc-numeric-font-family); font-size: 1.5rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .quantity ha-icon { --mdc-icon-size: 25px; color: var(--wine-color, var(--secondary-text-color)); }
    .quantity-column { position: static; display: flex; justify-content: flex-end; align-items: flex-start; flex: 0 0 auto; min-width: 0; max-width: 42%; }
    .wine-alert { position: absolute; right: 8px; bottom: 8px; display: grid; place-items: center; width: 30px; height: 30px; border: 1px solid var(--error-color); border-radius: 50%; background: var(--card-background-color, var(--ha-card-background, var(--primary-background-color))); color: var(--error-color); }
    .wine-alert ha-icon { --mdc-icon-size: 20px; }
    .metadata { color: var(--secondary-text-color); font-size: .85rem; margin-top: 5px; line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .tag { border-radius: 999px; background: var(--secondary-background-color); padding: 3px 8px; font-size: .75rem; }
    .filters-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
    .filters { flex: 1 1 180px; min-width: 0; margin: 0; padding: 1px 10px 0px 10px; }
    .filters[open] { padding: 0 10px 10px 10px; border: 1px solid var(--outline-color, var(--divider-color)); border-radius: 10px; background: var(--secondary-background-color); }
    .filters > summary { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; padding: 4px 0; list-style: none; }\n    .filters-clear { flex: 0 0 auto; margin: 0; padding: 5px 8px; font-size: .8rem; white-space: nowrap; }
    .filters[open] > summary { color: var(--primary-text-color); padding-bottom: 8px; border-bottom: 1px solid var(--divider-color); }
    .filters > summary::-webkit-details-marker { display: none; }
    .filters-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
    .filters-chevron { --mdc-icon-size: 18px; margin-left: 0; color: var(--secondary-text-color); transition: transform 120ms ease; }
    .filters[open] .filters-chevron { transform: rotate(90deg); }
    .sort-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
    .sort-row > span { flex: 0 0 auto; color: var(--secondary-text-color); font-size: .9rem; }
    .sort-row select { flex: 1; width: 100%; }
    .pagination { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-top: 12px; color: var(--secondary-text-color); font-size: .85rem; }
    .pagination-controls { display: flex; align-items: center; gap: 8px; }
    .pagination-controls button { display: inline-flex; align-items: center; justify-content: center; min-width: 38px; min-height: 36px; }
    .pagination-controls ha-icon { --mdc-icon-size: 20px; }
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
    const pageSizeChanged = this.config?.page_size !== config.page_size;
    const configEntryChanged = this.config?.config_entry_id !== config.config_entry_id;
    this.requestGeneration += 1;
    this.loading = false;
    this.refreshPending = false;
    this.config = config;
    this.sort = config.default_sort ?? "name-asc";
    if (pageSizeChanged || configEntryChanged) this.currentPage = 1;
    if (configEntryChanged) {
      this.search = "";
      this.color = ALL_FILTER_VALUES;
      this.region = ALL_FILTER_VALUES;
      this.appellation = ALL_FILTER_VALUES;
      this.vintage = ALL_FILTER_VALUES;
      this.meal = "";
      this.selectedWine = undefined;
    }
    this.inventory = undefined;
    this.error = undefined;
    if (config.config_entry_id) void this.refresh();
  }

  private get pageSize(): number {
    const configured = this.config?.page_size ?? 40;
    if (!Number.isFinite(configured)) return 40;
    return Math.min(200, Math.max(10, Math.round(configured / 10) * 10));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    this.syncSubscriptionGeneration += 1;
    this.syncUnsubscribe?.();
    this.syncUnsubscribe = undefined;
    this.syncConnection = undefined;
    this.syncEntryId = undefined;
    super.disconnectedCallback();
  }

  private ensureSyncSubscription(): void {
    const connection = this.hass?.connection;
    const entryId = this.config?.config_entry_id;
    if (connection === this.syncConnection && entryId === this.syncEntryId) return;

    this.syncSubscriptionGeneration += 1;
    this.syncUnsubscribe?.();
    this.syncUnsubscribe = undefined;
    this.syncConnection = connection;
    this.syncEntryId = entryId;

    if (!this.isConnected || !this.hass || !connection || !entryId) return;

    const generation = this.syncSubscriptionGeneration;
    void subscribeToInventorySync(this.hass, entryId, () => {
      if (generation === this.syncSubscriptionGeneration) void this.refresh();
    }).then((unsubscribe) => {
      if (
        generation === this.syncSubscriptionGeneration &&
        this.isConnected &&
        this.hass?.connection === connection &&
        this.config?.config_entry_id === entryId
      ) {
        this.syncUnsubscribe = unsubscribe;
      } else {
        unsubscribe();
      }
    }).catch((error: unknown) => {
      console.error("Unable to subscribe to Ploc Cellar synchronization events", error);
    });
  }

  protected updated(): void {
    this.ensureSyncSubscription();
    if (this.hass && this.config && !this.inventory && !this.loading && !this.error) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    const hass = this.hass;
    const config = this.config;
    if (!hass || !config?.config_entry_id) return;
    if (this.loading) {
      this.refreshPending = true;
      return;
    }
    const configEntryId = config.config_entry_id;
    const generation = ++this.requestGeneration;
    this.loading = true;
    this.error = undefined;
    try {
      const inventory = await fetchInventory(hass, configEntryId);
      if (generation === this.requestGeneration) {
        this.inventory = inventory;
        if (this.selectedWine) {
          this.selectedWine =
            inventory.wines.find((wine) => wine.id === this.selectedWine?.id);
        }
      }
    } catch (error) {
      if (generation === this.requestGeneration) {
        this.error = error instanceof Error ? error.message : String(error);
      }
    } finally {
      if (generation === this.requestGeneration) {
        this.loading = false;
        if (this.refreshPending) {
          this.refreshPending = false;
          void this.refresh();
        }
      }
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
    this.sort = this.config?.default_sort ?? "name-asc";
    this.currentPage = 1;
  }

  private mealValues(): MealTranslationKey[] {
    const values = new Set<MealTranslationKey>();
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
          this.meal = (event.target as HTMLSelectElement).value as MealTranslationKey | "";
          this.currentPage = 1;
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
          this.currentPage = 1;
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
    const diagnosticIssues = [
      { key: "wine_detail_issue_unlocated" as const, count: wine.unlocated_bottles ?? 0 },
      { key: "wine_detail_issue_negative" as const, count: wine.negative_movement_bottles ?? 0 },
      { key: "wine_detail_issue_surplus" as const, count: wine.physical_surplus_bottles ?? 0 },
    ].filter((issue) => issue.count > 0);
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
          <div class="quantity-column">
            <div class="quantity"><span>${new Intl.NumberFormat(this.hass?.language ?? undefined).format(wine.bottles_in_cellar)}</span><ha-icon icon="mdi:bottle-wine" aria-hidden="true"></ha-icon></div>
            ${diagnosticIssues.length ? html`
              <span class="wine-alert" role="img"
                aria-label=${diagnosticIssues.map((issue) => t(issue.key).replace("{count}", new Intl.NumberFormat(this.hass?.language ?? undefined).format(issue.count))).join(" · ")}
                title=${diagnosticIssues.map((issue) => t(issue.key).replace("{count}", new Intl.NumberFormat(this.hass?.language ?? undefined).format(issue.count))).join(" · ")}>
                <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
              </span>
            ` : nothing}
          </div>
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
    const pageSize = this.pageSize;
    const pageCount = Math.max(1, Math.ceil(wines.length / pageSize));
    const page = Math.min(this.currentPage, pageCount);
    const pageOffset = (page - 1) * pageSize;
    const pageWines = wines.slice(pageOffset, pageOffset + pageSize);
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

        </header>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        ${!this.config?.config_entry_id
          ? html`<div class="muted">${t("select_config")}</div>`
          : nothing}
        ${this.inventory?.stale ? html`<div class="warning">${t("stale")}</div>` : nothing}
        ${this.inventory ? html`
          <input class="search" type="search" aria-label=${t("search_wine")}
            placeholder=${t("search_placeholder")} .value=${this.search}
            @input=${(event: Event) => { this.search = (event.target as HTMLInputElement).value; this.currentPage = 1; }} />
          <div class="filters-row">
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
                @change=${(event: Event) => { this.sort = (event.target as HTMLSelectElement).value as SortMode; this.currentPage = 1; }}>
                <option value="name-asc">${t("sort_name_asc")}</option>
                <option value="name-desc">${t("sort_name_desc")}</option>
                <option value="bottles-asc">${t("sort_bottles_asc")}</option>
                <option value="bottles-desc">${t("sort_bottles_desc")}</option>
                <option value="vintage-asc">${t("sort_vintage_asc")}</option>
                <option value="vintage-desc">${t("sort_vintage_desc")}</option>
              </select>
              </label>
            </details>
            ${activeFilters ? html`<button class="filters-clear" type="button" @click=${() => this.clearFilters()}>${t("clear_filters")}</button>` : nothing}
          </div>
          <div class="summary">
            <span>${t("inventory_results").replace("{count}", String(wines.length))}</span>
            <span>${t("inventory_bottle_total").replace("{count}", String(total))}</span>
          </div>
          ${!this.inventory.stock_reconstruction_complete
            ? html`<div class="warning">${t("reconstruction_incomplete")}</div>`
            : nothing}
          <div class="wine-list">
            ${pageWines.map((wine) => this.renderWine(wine))}
          </div>
          ${wines.length > pageSize ? html`
            <nav class="pagination" aria-label=${t("inventory_pagination")}>
              <span aria-live="polite">${t("inventory_pagination_range")
                .replace("{start}", String(pageOffset + 1))
                .replace("{end}", String(Math.min(pageOffset + pageSize, wines.length)))
                .replace("{total}", String(wines.length))}</span>
              <div class="pagination-controls">
                <button type="button" aria-label=${t("pagination_previous")} ?disabled=${page <= 1}
                  @click=${() => { this.currentPage = Math.max(1, page - 1); }}>
                  <ha-icon icon="mdi:chevron-left" aria-hidden="true"></ha-icon>
                </button>
                <span>${t("inventory_pagination_page")
                  .replace("{page}", String(page))
                  .replace("{pages}", String(pageCount))}</span>
                <button type="button" aria-label=${t("pagination_next")} ?disabled=${page >= pageCount}
                  @click=${() => { this.currentPage = Math.min(pageCount, page + 1); }}>
                  <ha-icon icon="mdi:chevron-right" aria-hidden="true"></ha-icon>
                </button>
              </div>
            </nav>
          ` : nothing}
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
