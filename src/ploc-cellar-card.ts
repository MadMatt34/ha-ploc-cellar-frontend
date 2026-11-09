import { LitElement, css, html, nothing } from "lit";
import "./wine-typography";
import "./numeric-typography";
import { customElement, property, state } from "lit/decorators.js";
import "./ploc-cellar-rack-card";
import "./ploc-cellar-inventory-card";
import "./ploc-cellar-card-editor";
import "./ploc-cellar-wine-detail";

import type {
  HomeAssistant,
  InventoryResponse,
  PlocCellarCardConfig,
  Wine,
  WineDiagnostic,
} from "./types";
import { translate, translatePicker, type TranslationKey } from "./translations";
import { fetchInventory } from "./inventory-client";
import "./donut-chart";

interface DistributionItem {
  name: string;
  bottles: number;
  wines: number;
  color?: string;
}

type DistributionField =
  | "color"
  | "region"
  | "appellation"
  | "vintage"
  | "bottle_format";

const CHART_COLORS = [
  "#D55E00",
  "#0072B2",
  "#009E73",
  "#E69F00",
  "#CC79A7",
  "#56B4E9",
  "#F0E442",
  "#6A3D9A",
];

@customElement("ploc-cellar-card")
export class PlocCellarCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: PlocCellarCardConfig;
  @state() private inventory?: InventoryResponse;
  @state() private loading = false;
  @state() private error?: string;
  @state() private activeDiagnostic?: "unlocated" | "negative" | "surplus";
  @state() private selectedWine?: Wine;
  private requestGeneration = 0;

  static styles = css`
    :host { display: block; }
    ha-card { padding: 16px; color: var(--primary-text-color); }
    header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    h2 { margin: 0; font-size: 1.25rem; font-weight: 500; }
    button { color: var(--primary-text-color); background: var(--secondary-background-color); border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; }
    button[disabled] { opacity: .5; cursor: default; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 8px; margin: 16px 0; }
    .metric { background: var(--secondary-background-color); border-radius: 10px; padding: 12px; min-width: 0; }
    .value { display: block; font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .label, .muted { color: var(--secondary-text-color); font-size: .85rem; }
    .section { margin-top: 16px; }
    .section-title { margin: 0 0 8px; font-size: .95rem; font-weight: 500; }
    details.section > summary { display: list-item; cursor: pointer; }
    details.section > summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 4px; border-radius: 2px; }
    .occupancy-bar { position: relative; height: 20px; overflow: hidden; border-radius: 6px; background: var(--secondary-background-color); }
    .occupancy-fill { height: 100%; background: var(--primary-color); transition: width 180ms ease; }
    .occupancy-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 0 8px; color: var(--primary-text-color); font-size: .9rem; font-weight: 500; line-height: 1; text-align: center; text-shadow: 0 1px 2px var(--card-background-color), 1px 0 2px var(--card-background-color), 0 -1px 2px var(--card-background-color), -1px 0 2px var(--card-background-color); white-space: nowrap; }
    .diagnostics { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; }
    .diagnostic { display: flex; flex-direction: column; align-items: flex-start; width: 100%; height: 100%; box-sizing: border-box; text-align: left; color: inherit; border: 1px solid var(--divider-color); border-radius: 8px; padding: 10px; min-width: 0; cursor: pointer; }
    .diagnostic:hover { background: var(--secondary-background-color); }
    .diagnostic:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .diagnostic-value { display: block; color: var(--error-color); font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .diagnostic-hint { display: block; align-self: flex-end; margin-top: auto; padding-top: 8px; color: var(--secondary-text-color); font-size: .75rem; text-align: right; }
    .diagnostic-detail-list { display: grid; gap: 8px; max-height: min(60vh, 520px); overflow: auto; }
    .diagnostic-wine { display: flex; width: 100%; box-sizing: border-box; align-items: stretch; justify-content: space-between; gap: 12px; border: 1px solid var(--divider-color); border-left: 6px solid var(--wine-color, var(--divider-color)); border-radius: 10px; padding: 12px; min-width: 0; background: var(--card-background-color, var(--ha-card-background)); color: var(--primary-text-color); font: inherit; text-align: left; }
    button.diagnostic-wine { cursor: pointer; }
    button.diagnostic-wine:hover { background: var(--secondary-background-color); }
    button.diagnostic-wine:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .diagnostic-wine-main { min-width: 0; flex: 1 1 auto; }
    .diagnostic-wine-name { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
    .diagnostic-wine-metadata { color: var(--secondary-text-color); font-size: .85rem; margin-top: 5px; line-height: 1.45; }
    .diagnostic-wine-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
    .diagnostic-wine-tag { border-radius: 999px; background: var(--secondary-background-color); padding: 3px 8px; font-size: .75rem; }
    .diagnostic-quantity { display: flex; flex: 0 0 auto; align-items: center; gap: 5px; white-space: nowrap; color: var(--error-color); font-family: var(--ploc-numeric-font-family); font-size: 1.5rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .diagnostic-quantity ha-icon { --mdc-icon-size: 25px; color: var(--error-color); }
    .groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 12px; margin-top: 14px; }
    .group { min-width: 0; border: 1px solid var(--divider-color); border-radius: 10px; padding: 12px; }
    .group-title { margin: 0 0 12px; font-size: 1rem; font-weight: 500; }
    .chart-content { display: grid; grid-template-columns: minmax(112px, .85fr) minmax(0, 1.15fr); gap: 12px; align-items: center; }
    .chart-content.chart-content-no-legend { grid-template-columns: minmax(0, 1fr); }
    .donut { position: relative; display: block; width: 100%; max-width: 150px; aspect-ratio: 1; justify-self: center; }
    .donut-chart { display: block; width: 100%; height: 100%; }
    .donut-center { position: absolute; inset: 17%; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 50%; background: var(--card-background-color, var(--ha-card-background, #fff)); pointer-events: none; }
    .donut-total { color: var(--primary-text-color); font-family: var(--ploc-numeric-font-family); font-size: 1.4rem; font-weight: 400; font-variant-numeric: tabular-nums; }
    .donut-caption { color: var(--secondary-text-color); font-size: .48rem; }
    .legend { display: grid; gap: 4px; min-width: 0; }
    .legend-item { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto; align-items: center; column-gap: 7px; row-gap: 2px; font-size: .82rem; }
    .legend-swatch { width: 9px; height: 9px; border-radius: 50%; }
    .legend-name { min-width: 0; overflow-wrap: anywhere; }
    .legend-value { white-space: nowrap; font-variant-numeric: tabular-nums; font-weight: 600; }
    .legend-meta { grid-column: 2 / 4; margin-top: -2px; color: var(--secondary-text-color); font-size: .72rem; }
    .warning { color: var(--warning-color); padding: 8px 0; }
    .error { color: var(--error-color); padding: 8px 0; }
    @media (max-width: 420px) {
      ha-card { padding: 12px; }
      .chart-content { grid-template-columns: minmax(96px, .7fr) minmax(0, 1.3fr); gap: 8px; }
      .legend { gap: 6px; }
      .legend-item { font-size: .78rem; }
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
    this.config = {
      ...config,
      show_occupancy: config.show_occupancy !== false,
      show_diagnostics: config.show_diagnostics !== false,
      show_statistics: config.show_statistics !== false,
      show_statistics_legends: config.show_statistics_legends !== false,
    };
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

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.hass?.language ?? undefined).format(value);
  }

  private formatSync(value: string | null): string {
    if (!value) return translate(this.hass?.language ?? "en", "never");
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat(this.hass?.language ?? undefined, {
          dateStyle: "short",
          timeStyle: "short",
        }).format(date);
  }

  private metric(value: number | string, label: string) {
    return html`
      <div class="metric">
        <span class="value">${typeof value === "number" ? this.formatNumber(value) : value}</span>
        <span class="label">${label}</span>
      </div>
    `;
  }

  private getBottleCount(wine: Wine): number {
    if (this.inventory?.stock_reconstruction_complete) {
      return wine.bottles ?? wine.bottles_in_cellar;
    }
    return wine.bottles_in_cellar;
  }

  private distribution(field: DistributionField): DistributionItem[] {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const grouped = new Map<string, DistributionItem>();
    for (const wine of this.inventory?.wines ?? []) {
      const rawValue = wine[field];
      const name = rawValue === null || rawValue === ""
        ? t("statistics_unknown")
        : String(rawValue);
      const current = grouped.get(name) ?? { name, bottles: 0, wines: 0 };
      current.bottles += this.getBottleCount(wine);
      current.wines += 1;
      if (field === "color" && wine.color_rgb && !current.color) {
        const rgb = wine.color_rgb.map((component) =>
          Math.min(255, Math.max(0, Math.round(component))),
        );
        current.color = `rgb(${rgb.join(", ")})`;
      }
      grouped.set(name, current);
    }

    const sorted = [...grouped.values()].sort(
      (a, b) => b.bottles - a.bottles || a.name.localeCompare(b.name, this.hass?.language),
    );
    if (sorted.length <= 8) return sorted;

    const visible = sorted.slice(0, 7);
    const other = sorted.slice(7).reduce<DistributionItem>(
      (total, item) => ({
        name: t("statistics_other"),
        bottles: total.bottles + item.bottles,
        wines: total.wines + item.wines,
      }),
      { name: t("statistics_other"), bottles: 0, wines: 0 },
    );
    return [...visible, other];
  }

  private renderDistribution(field: DistributionField, titleKey: TranslationKey) {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const items = this.distribution(field);
    const total = items.reduce((sum, item) => sum + item.bottles, 0);
    const segments = items
      .filter((item) => item.bottles > 0)
      .map((item, index) => ({
        ...item,
        color: item.color ?? CHART_COLORS[index % CHART_COLORS.length],
      }));
    const chartLabel = items
      .map((item) => `${item.name}: ${this.formatNumber(item.bottles)}`)
      .join(", ");

    return html`
      <section class="group">
        <h3 class="group-title">${t(titleKey)}</h3>
        ${total > 0 ? html`
          <div class=${this.config?.show_statistics_legends === false
            ? "chart-content chart-content-no-legend"
            : "chart-content"}>
            <div class="donut" role="img"
              aria-label=${t(titleKey) + ": " + chartLabel}>
              <ploc-cellar-donut-chart
                class="donut-chart"
                .items=${segments}
                .language=${this.hass?.language ?? "en"}>
              </ploc-cellar-donut-chart>
              <div class="donut-center">
                <span class="donut-total">${this.formatNumber(total)}</span>
                <span class="donut-caption">${t("statistics_bottles")}</span>
              </div>
            </div>
            ${this.config?.show_statistics_legends === false ? nothing : html`
              <div class="legend">
                ${segments.map((item) => html`
                <div class="legend-item">
                  <span class="legend-swatch" style=${`background: ${item.color}`}></span>
                  <span class="legend-name">${item.name}</span>
                  <span class="legend-value">${this.formatNumber(item.bottles)}</span>
                  <span class="legend-meta">
                    ${new Intl.NumberFormat(this.hass?.language ?? undefined, {
                      style: "percent",
                      maximumFractionDigits: 1,
                    }).format(item.bottles / total)}
                    · ${this.formatNumber(item.wines)} ${t("statistics_references")}
                  </span>
                </div>
                `)}
              </div>
            `}
          </div>
        ` : html`<p class="muted">${t("statistics_empty")}</p>`}
      </section>
    `;
  }

  private getDiagnosticWines(kind: "unlocated" | "negative" | "surplus"): WineDiagnostic[] {
    const field = kind === "unlocated"
      ? "unlocated_bottles"
      : kind === "negative"
        ? "negative_movement_bottles"
        : "physical_surplus_bottles";
    return (this.inventory?.wine_diagnostics ?? [])
      .filter((wine) => (wine[field] ?? 0) > 0)
      .sort((a, b) => (b[field] ?? 0) - (a[field] ?? 0) || a.name.localeCompare(b.name, this.hass?.language));
  }

  private openDiagnosticWine(diagnostic: WineDiagnostic): void {
    const wine = diagnostic.wine;
    this.activeDiagnostic = undefined;
    this.selectedWine = wine;
  }

  private renderDiagnosticDialog() {
    const kind = this.activeDiagnostic;
    if (!kind) return nothing;
    const titleKey: TranslationKey = kind === "unlocated"
      ? "diagnostic_unlocated"
      : kind === "negative" ? "diagnostic_negative" : "diagnostic_surplus";
    const detailKey: TranslationKey = kind === "unlocated"
      ? "diagnostic_detail_unlocated"
      : kind === "negative" ? "diagnostic_detail_negative" : "diagnostic_detail_surplus";
    const wines = this.getDiagnosticWines(kind);
    const t = (key: TranslationKey): string => translate(this.hass?.language ?? "en", key);
    const amount = (wine: WineDiagnostic): number => kind === "unlocated"
      ? wine.unlocated_bottles ?? 0
      : kind === "negative" ? wine.negative_movement_bottles ?? 0 : wine.physical_surplus_bottles ?? 0;
    const diagnosticLabel = t("diagnostic_detail_quantity");
    return html`
      <ha-dialog .open=${true} header-title=${t(titleKey)} @closed=${() => { this.activeDiagnostic = undefined; }}>
        <div class="diagnostic-detail-list">
          <p class="muted">${t(detailKey)}</p>
          ${wines.length ? wines.map((diagnostic) => {
            const wine = diagnostic.wine;
            const color = wine.color_rgb?.every(Number.isFinite)
              ? wine.color_rgb.map((component) => Math.round(Math.min(255, Math.max(0, component))))
              : null;
            const wineColor = color ? `rgb(${color.join(", ")})` : "";
            const vintage = diagnostic.vintage === null
              ? t("unknown_vintage")
              : String(diagnostic.vintage);
            const quantity = amount(diagnostic);
            const rowContent = html`
              <div class="diagnostic-wine-main">
                <div class="diagnostic-wine-name">${diagnostic.name}</div>
                <div class="diagnostic-wine-metadata">${[
                  wine.appellation,
                  wine?.region,
                  wine?.country,
                ].filter(Boolean).join(" · ")}</div>
                <div class="diagnostic-wine-tags">
                  ${wine.color ? html`<span class="diagnostic-wine-tag">${wine.color}</span>` : nothing}
                  <span class="diagnostic-wine-tag">${vintage}</span>
                  ${wine?.bottle_format ? html`<span class="diagnostic-wine-tag">${wine.bottle_format}</span>` : nothing}
                </div>
              </div>
              <div class="diagnostic-quantity" aria-label=${`${this.formatNumber(quantity)} ${diagnosticLabel}`}
                title=${`${this.formatNumber(quantity)} ${diagnosticLabel}`}>
                <span>${this.formatNumber(quantity)}</span>
                <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
              </div>
            `;
            const style = wineColor ? `--wine-color: ${wineColor}` : "";
            return wine
              ? html`<button class="diagnostic-wine" type="button" aria-haspopup="dialog"
                  style=${style} @click=${() => this.openDiagnosticWine(diagnostic)}>${rowContent}</button>`
              : html`<div class="diagnostic-wine" style=${style}>${rowContent}</div>`;
          }) : html`<p class="muted">${t("diagnostic_detail_empty")}</p>`}
        </div>
      </ha-dialog>
    `;
  }

  protected render() {
    const t = (key: TranslationKey): string =>
      translate(this.hass?.language ?? "en", key);
    const data = this.inventory;
    const title = this.config?.title ?? t("card_title");
    const showOccupancy = this.config?.show_occupancy !== false;
    const showDiagnostics = this.config?.show_diagnostics !== false;
    const showStatistics = this.config?.show_statistics !== false;
    const occupiedPositions = data
      ? Math.min(data.total_positions, Math.max(0, data.occupied_positions))
      : 0;
    const freePositions = data
      ? Math.max(0, data.total_positions - occupiedPositions)
      : 0;
    const occupancy = data && data.total_positions > 0
      ? Math.round((occupiedPositions / data.total_positions) * 100)
      : 0;
    const diagnostics = data?.stock_reconstruction_complete
      ? [
          { key: "diagnostic_unlocated" as const, value: data.unlocated_bottles ?? 0 },
          { key: "diagnostic_negative" as const, value: data.negative_movement_bottles ?? 0 },
          { key: "diagnostic_surplus" as const, value: data.physical_surplus_bottles ?? 0 },
        ].filter((item) => item.value > 0)
      : [];
    const hasDiagnostics = Boolean(data && (
      !data.stock_reconstruction_complete ||
      diagnostics.length > 0 ||
      data.positions_with_unknown_wine > 0
    ));
    const wines = data?.wines ?? [];
    const referenceCount = data?.wine_references ?? wines.length;

    return html`
      <ha-card>
        <header>
          <h2>${title}</h2>
          <button ?disabled=${this.loading} @click=${() => this.refresh()}>
            ${this.loading ? t("loading") : t("refresh")}
          </button>
        </header>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
        ${!this.config?.config_entry_id
          ? html`<div class="muted">${t("select_config")}</div>`
          : nothing}
        ${data ? html`
          ${data.stale ? html`<div class="warning">${t("stale")}</div>` : nothing}
          <div class="summary">
            ${this.metric(data.total_bottles, t("bottles_in_cellar"))}
            ${this.metric(
              data.total_stock_bottles ?? t("unknown_value"),
              t("reconstructed_stock"),
            )}
            ${this.metric(referenceCount, t("stocked_references"))}
            ${this.metric(data.rack_count, t("racks"))}
          </div>
          ${showOccupancy ? html`
            <section class="section" aria-label=${t("rack_occupancy")}>
              <div class="occupancy-bar" role="progressbar"
                aria-label=${t("rack_occupancy")}
                aria-valuemin="0" aria-valuemax=${data.total_positions}
                aria-valuenow=${occupiedPositions}
                aria-valuetext=${`${occupiedPositions} ${t("occupied")}, ${freePositions} ${t("free")}, ${data.total_positions} ${t("positions")}`}>
                <div class="occupancy-fill" style=${`width: ${occupancy}%`}></div>
                <div class="occupancy-label">
                  <span>${t("rack_occupancy")}:</span>
                  <span class="numeric-value">${this.formatNumber(data.total_positions)} ${t("positions")}</span>
                  <span>·</span>
                  <span class="numeric-value">${this.formatNumber(occupiedPositions)} ${t("occupied")}</span>
                  <span>·</span>
                  <span class="numeric-value">${this.formatNumber(freePositions)} ${t("free")}</span>
                </div>
              </div>
            </section>
          ` : nothing}
          ${showDiagnostics && hasDiagnostics ? html`
            <details class="section" open>
              <summary class="section-title">${t("inventory_diagnostics")}</summary>
              ${!data.stock_reconstruction_complete
                ? html`<div class="warning">${t("reconstruction_incomplete")}</div>`
                : nothing}
              ${diagnostics.length ? html`
                <div class="diagnostics">
                  ${diagnostics.map((item) => {
                    const kind = item.key === "diagnostic_unlocated" ? "unlocated"
                      : item.key === "diagnostic_negative" ? "negative" : "surplus";
                    return html`
                      <button class="diagnostic" type="button" aria-haspopup="dialog"
                        @click=${() => { this.activeDiagnostic = kind; }}>
                        <span class="diagnostic-value">${this.formatNumber(item.value)}</span>
                        <span class="label">${t(item.key)}</span>
                        <span class="diagnostic-hint">${t("diagnostic_detail_open")}</span>
                      </button>
                    `;
                  })}
                </div>
              ` : nothing}
              ${data.positions_with_unknown_wine > 0
                ? html`<div class="warning">${t("statistics_unknown_wine_positions").replace("{count}", this.formatNumber(data.positions_with_unknown_wine))}</div>`
                : nothing}
            </details>
          ` : nothing}
          ${showStatistics ? html`
            <details class="section" open>
              <summary class="section-title">${t("statistics_title")}</summary>
              <p class="muted">${t("statistics_distribution_scope")}</p>
              <div class="groups">
                ${this.renderDistribution("color", "statistics_color")}
                ${this.renderDistribution("region", "statistics_region")}
                ${this.renderDistribution("appellation", "statistics_appellation")}
                ${this.renderDistribution("vintage", "statistics_vintage")}
                ${this.renderDistribution("bottle_format", "statistics_format")}
              </div>
            </details>
          ` : nothing}
          <div class="muted section">${t("last_sync")}: ${this.formatSync(data.last_sync)}</div>
          ${this.renderDiagnosticDialog()}
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
    return 12;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, string>>;
  }

  interface HTMLElementTagNameMap {
    "ploc-cellar-card": PlocCellarCard;
  }
}

window.customCards ??= [];
window.customCards.push({
  type: "ploc-cellar-card",
  name: translatePicker("picker_overview_name"),
  description: translatePicker("picker_overview_description"),
});
