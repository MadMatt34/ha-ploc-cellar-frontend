import { LitElement, css, html, nothing, type PropertyValues } from "lit";

import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant, Wine } from "./types";
import { translate, type TranslationKey } from "./translations";
import { WineImageLoader } from "./wine-image";
import { getMealIcon, getMealTranslationKeys } from "./meals";
import { parseGrapeComposition } from "./grape-composition";
import { getIncompleteCoordinates, groupCoordinatesByRow, groupWineLocations } from "./wine-locations";

@customElement("ploc-cellar-wine-detail")
export class PlocCellarWineDetail extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) wine?: Wine;
  @property({ attribute: false }) selectedLocation?: { rackId: string; row: number; column: number };
  @state() private imageUrl: string | null = null;

  private readonly imageLoader = new WineImageLoader();

  static styles = css`
    :host {
      color: var(--primary-text-color);
      --mdc-dialog-min-width: min(560px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(760px, calc(100vw - 32px));
    }
    :host { --ploc-wine-font-family: "Cormorant Garamond", Georgia, serif; }
    .content { display: grid; gap: 10px; min-width: 0; }
    .detail-section { min-width: 0; border: 1px solid var(--divider-color); border-radius: 12px; overflow: hidden; background: var(--card-background-color, var(--ha-card-background)); }
    .section-summary { display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 4px 14px; cursor: pointer; list-style: none; font-size: 1rem; font-weight: 600; }
    .section-summary::-webkit-details-marker { display: none; }
    .section-summary::after { content: ""; width: 8px; height: 8px; margin-left: auto; border-right: 2px solid var(--secondary-text-color); border-bottom: 2px solid var(--secondary-text-color); transform: rotate(45deg); transition: transform .16s ease; }
    details[open] > .section-summary::after { transform: rotate(225deg); }
    .section-summary ha-icon { color: var(--secondary-text-color); }
    .section-body { padding: 0 14px 14px; min-width: 0; }
    .section-subtitle { margin: 12px 0 5px; color: var(--secondary-text-color); font-size: .78rem; font-weight: 700; letter-spacing: .10em; text-transform: uppercase; }
    .section-subtitle:first-child { margin-top: 2px; }
    .nested-details { margin-top: 14px; border-top: 1px solid var(--divider-color); }
    .nested-details > .section-summary { min-height: 42px; padding: 9px 0; font-size: .88rem; }
    .nested-details > .section-body { padding: 0 0 4px; }
    .wine-dialog-title { font-family: var(--ploc-wine-font-family); font-size: 1.4rem; font-weight: 600; line-height: 1.2; white-space: normal; }
    .wine-hero { position: relative; display: grid; grid-template-columns: 8px minmax(0, 1fr); align-items: stretch; gap: 14px; min-width: 0; }
.wine-hero-alert { position: absolute; top: 4px; right: 4px; z-index: 1; display: grid; place-items: center; width: 30px; height: 30px; border: 1px solid var(--error-color); border-radius: 50%; background: var(--card-background-color, var(--ha-card-background, var(--primary-background-color))); color: var(--error-color); }
.wine-hero-alert ha-icon { --mdc-icon-size: 20px; }
    .wine-hero-banner { width: 8px; min-height: 120px; border-radius: 999px; }
    .wine-hero-main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(100px, 32%); align-items: center; gap: 14px; min-width: 0; }
    .wine-image-container { display: flex; justify-content: flex-end; align-items: center; min-width: 0; max-height: 160px; overflow: hidden; padding-right: 10px; border-radius: 20px; }
    .wine-image { display: block; max-width: 100%; max-height: 160px; object-fit: contain; border-radius: 10px; }
    .identity { min-width: 0; }
    .identity-text { min-width: 0; }
    .subtitle { margin-top: 4px; color: var(--secondary-text-color); line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .wine-vintage { margin: 5px 20px; font-family: var(--ploc-wine-font-family); font-size: 2.5rem; font-weight: 600; line-height: 1.2; }
    .wine-stock-line { display: flex; align-items: center; gap: 6px; margin-top: 7px; color: var(--secondary-text-color); font-size: 1rem; }
    .wine-stock-line ha-icon { --mdc-icon-size: 30px; flex: 0 0 auto; }
    .wine-stock-count { font-size: 1.4rem; color: var(--primary-text-color); }
    .tag {
      padding: 4px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-size: .82rem;
    }
    .meal-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .meal-tile { display: flex; align-items: center; gap: 9px; min-width: 0; padding: 11px 12px; border: 1px solid var(--divider-color); border-radius: 10px; background: var(--secondary-background-color); }
    .meal-tile ha-icon { flex: 0 0 auto; }
    .meal-tile span { min-width: 0; overflow-wrap: anywhere; font-size: 1rem; }
    section { min-width: 0; }
    h3 {
      margin: 0 0 10px;
      font-size: .95rem;
      font-weight: 600;
    }
    dl {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr));
      gap: 12px 20px;
      margin: 0;
    }
    .characteristics { display: grid; gap: 0; }
    .characteristic { display: grid; grid-template-columns: 28px minmax(0, 1fr); align-items: center; gap: 12px; min-width: 0; padding: 10px 2px; border-bottom: 1px solid var(--divider-color); }
    .characteristic:last-child { border-bottom: 0; }
    .characteristic ha-icon { --mdc-icon-size: 21px; color: var(--secondary-text-color); }
    .characteristic-copy { display: grid; grid-template-columns: minmax(100px, .8fr) minmax(0, 1.4fr); align-items: baseline; gap: 12px; min-width: 0; }
    .characteristic-label { color: var(--secondary-text-color); font-size: .9rem; }
    .characteristic-value { min-width: 0; overflow-wrap: anywhere; line-height: 1.4; }
    .characteristic-value.is-error { color: var(--error-color); }
    .grapes-list { display: grid; gap: 2px; margin: 0 8% 0 0; }
    .grape-row { display: grid; grid-template-columns: minmax(0px, 1fr) minmax(90px, 2fr); align-items: center; gap: 8px; }
    .grape-name { min-width: 0; overflow-wrap: anywhere; text-align: end; }
    .grape-composition { display: flex; align-items: center; gap: 10px; min-width: 0; }
    .grape-percentage { flex: 0 0 42px; text-align: right; font-variant-numeric: tabular-nums; }
    .grape-track { display: block; flex: 1 1 0; width: 100%; min-width: 0; height: 7px; overflow: hidden; border-radius: 999px; background: var(--divider-color); }
    .grape-fill { height: 100%; background: var(--wine-accent, var(--secondary-text-color)); }
    .grape-row:not(.has-percentage) { grid-template-columns: minmax(0, 1fr); }
    .grape-row:not(.has-percentage) .grape-composition { display: none; }
    .stock-details.has-inventory-issues { border-color: var(--error-color, #db4437); }
    .stock-issues { display: flex; align-items: flex-start; gap: 8px; margin: 0 0 12px; color: var(--error-color, #db4437); font-size: .88rem; line-height: 1.4; }
    .stock-issues ha-icon { --mdc-icon-size: 19px; flex: 0 0 auto; }
    .stock { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .stock-item {
      min-width: 0;
      padding: 10px 12px;
      border-radius: 9px;
      background: var(--secondary-background-color);
    }
    .stock-value { display: block; font-size: 1.4rem; }
    .stock-details .characteristic-value { }
    .stock-label { display: block; margin-top: 3px; color: var(--secondary-text-color); font-size: .8rem; }
    .locations { display: grid; gap: 9px; }
    .location { padding: 10px 12px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); }
    .location-name { display: block; }
    .location-coordinates { display: grid; gap: 6px; margin-top: 8px; }
    .location-coordinate-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .location-coordinate { display: inline-flex; align-items: center; gap: 5px; width: fit-content; max-width: 100%; padding: 4px 9px; border-radius: 999px; background: var(--primary-background-color); color: var(--primary-text-color); font-size: .82rem; line-height: 1.4; }
    .location-coordinate.incomplete { border: 1px dashed var(--divider-color); color: var(--secondary-text-color); }
    .location-coordinate.selected { background: var(--primary-color); color: var(--text-primary-color, white); box-shadow: 0 0 0 2px var(--primary-color); font-weight: 600; }
    .location-coordinate.selected ha-icon { --mdc-icon-size: 16px; color: inherit; }
    .muted { color: var(--secondary-text-color); font-size: .88rem; }
    .comment { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.5; }
    @media (max-width: 560px) {
      .content { gap: 11px; }
      .characteristic-copy { grid-template-columns: minmax(0, 1fr); gap: 2px; }
      .characteristic { padding: 10px 2px; }
      .wine-hero { gap: 9px; }
      .wine-hero-main { grid-template-columns: minmax(0, 1fr) minmax(88px, 34%); gap: 9px; }
      .wine-image-container, .wine-image { max-height: 145px; }
    }
    @media (max-width: 480px) {
      .content { gap: 16px; }
      dl { grid-template-columns: minmax(0, 1fr); }
    }
  `;

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("wine") || changedProperties.has("hass")) {
      void this.loadWineImage();
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.wine?.image_url && this.hass) void this.loadWineImage();
  }

  disconnectedCallback(): void {
    this.imageLoader.dispose((url) => { this.imageUrl = url; });
    super.disconnectedCallback();
  }

  private async loadWineImage(): Promise<void> {
    const hass = this.hass;
    await this.imageLoader.load(
      this.wine?.image_url ?? null,
      hass ? (path) => hass.fetchWithAuth(path) : undefined,
      (url) => { this.imageUrl = url; },
    );
  }

  private get language(): string {
    return this.hass?.language ?? "en";
  }

  private t(key: TranslationKey): string {
    return translate(this.language, key);
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(value);
  }

  private characteristic(icon: string, label: TranslationKey, value: string | number | null | undefined, errorWhenPositive = false) {
    if (value === null || value === undefined || value === "") return nothing;
    return html`
      <div class="characteristic">
        <ha-icon icon=${icon} aria-hidden="true"></ha-icon>
        <div class="characteristic-copy">
          <span class="characteristic-label">${this.t(label)}</span>
          <span class="characteristic-value ${errorWhenPositive && typeof value === "number" && value > 0 ? "is-error" : ""}">${value}</span>
        </div>
      </div>
    `;
  }

  private get grapeAccentStyle(): string {
    const rgb = this.wine?.color_rgb;
    if (
      !rgb ||
      rgb.length !== 3 ||
      !rgb.every((component) =>
        Number.isInteger(component) && component >= 0 && component <= 255
      )
    ) return "";
    return `--wine-accent: rgb(${rgb[0]} ${rgb[1]} ${rgb[2]});`;
  }

  private renderGrapes(value: string | null) {
    if (!value?.trim()) return nothing;
    const grapes = parseGrapeComposition(value);
    if (!grapes.length) return nothing;
    return html`
      <div class="characteristic">
        <ha-icon icon="mdi:fruit-grapes" aria-hidden="true"></ha-icon>
        <div class="characteristic-value">
          <div class="grapes-list" style=${this.grapeAccentStyle}>
            ${grapes.map((grape) => html`
              <div class="grape-row ${grape.percentage !== null ? "has-percentage" : ""}">
                <span class="grape-name">${grape.name}</span>
                <div class="grape-composition">
                  <span class="grape-percentage">${grape.percentage === null ? "" : `${this.formatNumber(grape.percentage)}%`}</span>
                  <div class="grape-track" role="img" aria-label=${grape.percentage === null ? "" : `${this.formatNumber(grape.percentage)}%`}>
                    <div class="grape-fill" style=${grape.percentage === null ? "" : `width: ${grape.percentage}%`}></div>
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  private stockItem(label: TranslationKey, value: number | null | undefined) {
    if (value === null || value === undefined) return nothing;
    return html`
      <div class="stock-item">
        <span class="stock-value">${this.formatNumber(value)}</span>
        <span class="stock-label">${this.t(label)}</span>
      </div>
    `;
  }

  private get bottleColorStyle(): string {
    const rgb = this.wine?.color_rgb;
    if (
      !rgb ||
      rgb.length !== 3 ||
      !rgb.every((component) => Number.isInteger(component) && component >= 0 && component <= 255)
    ) return "color: var(--secondary-text-color);";
    return `color: rgb(${rgb[0]} ${rgb[1]} ${rgb[2]});`;
  }

  private get colorStyle(): string {
    const rgb = this.wine?.color_rgb;
    if (
      !rgb ||
      rgb.length !== 3 ||
      !rgb.every((component) =>
        Number.isInteger(component) && component >= 0 && component <= 255
      )
    ) return "background: var(--secondary-text-color);";
    return `background: rgb(${rgb[0]} ${rgb[1]} ${rgb[2]});`;
  }

  private renderHeroAlert(wine: Wine) {
    const issues = [
      { key: "wine_detail_issue_unlocated" as const, count: wine.unlocated_bottles ?? 0 },
      { key: "wine_detail_issue_negative" as const, count: wine.negative_movement_bottles ?? 0 },
      { key: "wine_detail_issue_surplus" as const, count: wine.physical_surplus_bottles ?? 0 },
    ].filter((issue) => issue.count > 0);
    if (!issues.length) return nothing;

    const description = issues
      .map((issue) => this.t(issue.key).replace("{count}", this.formatNumber(issue.count)))
      .join(" · ");

    return html`
      <span class="wine-hero-alert" role="img" aria-label="${description}" title="${description}">
        <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
      </span>
    `;
  }

  private renderIdentity(wine: Wine) {
    const tags = [wine.color, wine.bottle_format].filter((value): value is string => Boolean(value));

    return html`
      <div class="identity">
        <div class="identity-text">
          ${wine.vintage !== null ? html`<div class="wine-vintage">${wine.vintage}</div>` : nothing}
          <div class="wine-stock-line">
            <ha-icon icon="mdi:bottle-wine" style=${this.bottleColorStyle} aria-hidden="true"></ha-icon>
            <span class="wine-stock-count">${this.formatNumber(wine.bottles_in_cellar)}</span>
            <span>${this.t("wine_detail_bottles_in_stock")}</span>
            ${wine.bottles_in_cellar === 0 && wine.effective_stock !== null
              ? html`<span>(${this.t("wine_detail_effective_stock_suffix").replace("{count}", this.formatNumber(wine.effective_stock))})</span>`
              : nothing}
          </div>
          ${tags.length ? html`<div class="tags">${tags.map((tag) => html`<span class="tag">${tag}</span>`)}</div>` : nothing}
        </div>
      </div>
    `;
  }

  private renderStock(wine: Wine) {
    const inventoryIssues = [
      { key: "wine_detail_issue_unlocated" as const, count: wine.unlocated_bottles ?? 0 },
      { key: "wine_detail_issue_negative" as const, count: wine.negative_movement_bottles ?? 0 },
      { key: "wine_detail_issue_surplus" as const, count: wine.physical_surplus_bottles ?? 0 },
    ].filter((issue) => issue.count > 0);
    const hasInventoryIssues = inventoryIssues.length > 0;
    const hasMovementData = wine.purchased !== null ||
      wine.consumed !== null ||
      wine.movement_balance !== null ||
      wine.calculated_stock !== null ||
      wine.negative_movement_bottles !== null ||
      wine.physical_surplus_bottles !== null ||
      wine.unlocated_bottles !== null;

    return html`
      <details class="detail-section stock-details ${hasInventoryIssues ? "has-inventory-issues" : ""}">
        <summary class="section-summary"><ha-icon icon="mdi:chart-box-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_stock")}</summary>
        <div class="section-body">
        ${hasInventoryIssues ? html`
          <div class="stock-issues" role="alert">
            <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
            <span>${inventoryIssues.map((issue) => this.t(issue.key).replace("{count}", this.formatNumber(issue.count))).join(" · ")}</span>
          </div>
        ` : nothing}
        <div class="stock">
          ${this.stockItem("wine_detail_physical", wine.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", wine.bottles)}
          ${this.stockItem("wine_detail_effective", wine.effective_stock)}
        </div>
        ${hasMovementData ? html`
          <div class="section-subtitle"><ha-icon icon="mdi:swap-horizontal" aria-hidden="true"></ha-icon>&nbsp;${this.t("wine_detail_movements")}</div>
          <div class="section-body"><dl>
            ${this.characteristic("mdi:cart-plus", "wine_detail_purchased", wine.purchased)}
            ${this.characteristic("mdi:glass-wine", "wine_detail_consumed", wine.consumed)}
            ${this.characteristic("mdi:swap-horizontal", "wine_detail_balance", wine.movement_balance)}
            ${this.characteristic("mdi:calculator-variant", "wine_detail_calculated", wine.calculated_stock)}
          </dl></div>
          <div class="section-subtitle"><ha-icon icon="mdi:alert-circle-outline" aria-hidden="true"></ha-icon>&nbsp;${this.t("wine_detail_diagnostics")}</div>
          <div class="section-body"><dl>
            ${this.characteristic("mdi:minus-circle-outline", "wine_detail_negative", wine.negative_movement_bottles, true)}
            ${this.characteristic("mdi:plus-circle-outline", "wine_detail_surplus", wine.physical_surplus_bottles, true)}
            ${this.characteristic("mdi:map-marker-question-outline", "wine_detail_unlocated", wine.unlocated_bottles, true)}
          </dl></div>
        ` : nothing}
        </div>
      </details>
    `;
  }

  private renderMeals(wine: Wine) {
    const mealKeys = getMealTranslationKeys(wine.meals);
    if (!mealKeys.length) return nothing;
    return html`
      <details class="detail-section" open>
        <summary class="section-summary"><ha-icon icon="mdi:silverware-variant" aria-hidden="true"></ha-icon>${this.t("wine_detail_meals")}</summary>
        <div class="section-body"><div class="meal-tiles">
          ${mealKeys.map((key) => html`<div class="meal-tile"><ha-icon icon=${getMealIcon(key)} aria-hidden="true"></ha-icon><span>${this.t(key)}</span></div>`)}
        </div></div>
      </details>
    `;
  }

  private isSelectedLocation(rackId: string, row: number, column: number): boolean {
    const selected = this.selectedLocation;
    return selected !== undefined &&
      selected.rackId === rackId &&
      selected.row === row &&
      selected.column === column;
  }

  private renderLocations(wine: Wine) {
    if (!wine.locations.length) {
      return html`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
    }
    const racks = groupWineLocations(wine.locations);
    return html`
      <div class="locations">
        ${racks.map((rack) => html`
          <div class="location">
            <strong class="location-name">${rack.rack}</strong>
            ${rack.coordinates.length
              ? html`
                <div class="location-coordinates">
                  ${groupCoordinatesByRow(rack.coordinates).map(({ row, columns }) => html`
                    <div class="location-coordinate-row">
                      ${columns.map((column) => {
                            const selected = this.isSelectedLocation(rack.rackId, row, column);
                            return html`<span class="location-coordinate ${selected ? "selected" : ""}">
                              ${selected ? html`<ha-icon icon="mdi:target" aria-hidden="true"></ha-icon>` : nothing}
                              ${this.t("row")} ${row + 1}&nbsp;·&nbsp;${this.t("column")} ${column + 1}
                            </span>`;
                          })}
                    </div>
                  `)}
                  ${getIncompleteCoordinates(rack.coordinates).map(({ row, column }) => html`
                    <div class="location-coordinate-row">
                      <span class="location-coordinate incomplete">
                        ${this.t("row")} ${row === null ? "—" : row + 1}, ${this.t("column")} ${column === null ? "—" : column + 1}
                      </span>
                    </div>
                  `)}
                </div>
              `
              : nothing}
          </div>
        `)}
      </div>
    `;
  }

  private onDialogClosed(): void {
    this.dispatchEvent(new CustomEvent("wine-detail-closed", {
      bubbles: true,
      composed: true,
    }));
  }

  protected render() {
    const wine = this.wine;
    if (!wine) return nothing;

    const temperature = wine.service_temperature_min !== null ||
      wine.service_temperature_max !== null
      ? `${wine.service_temperature_min === null ? "—" : this.formatNumber(wine.service_temperature_min)}–${wine.service_temperature_max === null ? "—" : this.formatNumber(wine.service_temperature_max)} °C`
      : null;

    return html`
      <ha-dialog .open=${true} .accessibleLabel=${wine.name} @closed=${() => this.onDialogClosed()}>
        <span slot="headerTitle" class="wine-dialog-title">${wine.name}</span>
        <div class="content">
          <div class="wine-hero">
            ${this.renderHeroAlert(wine)}
            <div class="wine-hero-banner" style=${this.colorStyle} aria-hidden="true"></div>
            <div class="wine-hero-main">
              ${this.renderIdentity(wine)}
              ${this.imageUrl ? html`
                <div class="wine-image-container">
                  <img class="wine-image" src=${this.imageUrl} alt=${wine.name} />
                </div>
              ` : nothing}
            </div>
          </div>
          <details class="detail-section" open>
            <summary class="section-summary"><ha-icon icon="mdi:clipboard-list-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_characteristics")}</summary>
            <div class="section-body">
            <div class="section-subtitle">${this.t("wine_detail_origin")}</div>
            <div class="characteristics">
              ${this.characteristic("mdi:castle", "tooltip_domain", wine.domain)}
              ${this.characteristic("mdi:map-marker-radius", "tooltip_appellation", wine.appellation)}
              ${this.characteristic("mdi:map-outline", "tooltip_region", wine.region)}
              ${this.characteristic("mdi:earth", "tooltip_country", wine.country)}
            </div>
            <div class="section-subtitle">${this.t("wine_detail_tasting")}</div>
            <div class="characteristics">
              ${this.characteristic("mdi:medal-outline", "tooltip_classification", wine.classification)}
              ${this.characteristic("mdi:tag-outline", "tooltip_cuvee", wine.cuvee)}
              ${this.characteristic("mdi:palette-outline", "tooltip_color", wine.color)}
              ${this.renderGrapes(wine.grapes)}
              ${this.characteristic("mdi:bottle-wine-outline", "tooltip_format", wine.bottle_format ? `${wine.bottle_format}${wine.bottle_volume_l === null ? "" : ` (${this.formatNumber(wine.bottle_volume_l)} L)`}` : null)}
              ${this.characteristic("mdi:percent-outline", "wine_detail_alcohol", wine.alcohol_percent === null ? null : `${this.formatNumber(wine.alcohol_percent)} %`)}
              ${this.characteristic("mdi:thermometer", "tooltip_temperature", temperature)}
            </div>
            </div>
          </details>
          ${this.renderMeals(wine)}
          ${wine.comment ? html`
            <details class="detail-section">
              <summary class="section-summary"><ha-icon icon="mdi:note-text-outline" aria-hidden="true"></ha-icon>${this.t("wine_detail_comment")}</summary>
              <div class="section-body"><div class="comment">${wine.comment}</div></div>
            </details>
          ` : nothing}
          <details class="detail-section" open>
            <summary class="section-summary"><ha-icon icon="mdi:map-marker-multiple-outline" aria-hidden="true"></ha-icon>${this.t("locations")}</summary>
            <div class="section-body">${this.renderLocations(wine)}</div>
          </details>
          ${this.renderStock(wine)}
        </div>
      </ha-dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ploc-cellar-wine-detail": PlocCellarWineDetail;
  }
}
