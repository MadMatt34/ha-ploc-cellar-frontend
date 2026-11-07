import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import type { HomeAssistant, Wine } from "./types";
import { translate, type TranslationKey } from "./translations";

@customElement("ploc-cellar-wine-detail")
export class PlocCellarWineDetail extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) wine?: Wine;

  static styles = css`
    :host {
      color: var(--primary-text-color);
      --mdc-dialog-min-width: min(560px, calc(100vw - 32px));
      --mdc-dialog-max-width: min(760px, calc(100vw - 32px));
    }
    .content { display: grid; gap: 20px; min-width: 0; }
    .identity { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
    .color-swatch {
      flex: 0 0 18px;
      width: 18px;
      height: 18px;
      margin-top: 3px;
      border: 1px solid var(--divider-color);
      border-radius: 50%;
    }
    .identity-text { min-width: 0; }
    .subtitle { margin-top: 4px; color: var(--secondary-text-color); line-height: 1.45; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .tag {
      padding: 4px 9px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-size: .82rem;
    }
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
    .field { min-width: 0; }
    dt { color: var(--secondary-text-color); font-size: .82rem; }
    dd { margin: 3px 0 0; overflow-wrap: anywhere; line-height: 1.4; }
    .stock { display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 8px; }
    .stock-item {
      min-width: 0;
      padding: 10px 12px;
      border-radius: 9px;
      background: var(--secondary-background-color);
    }
    .stock-value { display: block; font-size: 1.2rem; font-weight: 600; font-variant-numeric: tabular-nums; }
    .stock-label { display: block; margin-top: 3px; color: var(--secondary-text-color); font-size: .8rem; }
    .locations { display: grid; gap: 7px; }
    .location { padding: 8px 10px; border: 1px solid var(--divider-color); border-radius: 8px; }
    .muted { color: var(--secondary-text-color); font-size: .88rem; }
    .comment { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.5; }
    @media (max-width: 480px) {
      .content { gap: 16px; }
      dl { grid-template-columns: minmax(0, 1fr); }
    }
  `;

  private get language(): string {
    return this.hass?.language ?? "en";
  }

  private t(key: TranslationKey): string {
    return translate(this.language, key);
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.language, { maximumFractionDigits: 2 }).format(value);
  }

  private field(label: TranslationKey, value: string | number | null | undefined) {
    if (value === null || value === undefined || value === "") return nothing;
    return html`
      <div class="field">
        <dt>${this.t(label)}</dt>
        <dd>${value}</dd>
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

  private get colorStyle(): string | undefined {
    const rgb = this.wine?.color_rgb;
    if (
      !rgb ||
      rgb.length !== 3 ||
      !rgb.every((component) =>
        Number.isInteger(component) && component >= 0 && component <= 255
      )
    ) return undefined;
    return `background: rgb(${rgb[0]} ${rgb[1]} ${rgb[2]});`;
  }

  private renderIdentity(wine: Wine) {
    const metadata = [wine.domain, wine.appellation, wine.region, wine.country]
      .filter((value): value is string => Boolean(value));
    const tags = [
      wine.vintage === null ? this.t("unknown_vintage") : String(wine.vintage),
      wine.color,
      wine.bottle_format,
    ].filter((value): value is string => Boolean(value));

    return html`
      <div class="identity">
        ${this.colorStyle ? html`<span class="color-swatch" style=${this.colorStyle} aria-hidden="true"></span>` : nothing}
        <div class="identity-text">
          ${metadata.length ? html`<div class="subtitle">${metadata.join(" · ")}</div>` : nothing}
          ${tags.length ? html`<div class="tags">${tags.map((tag) => html`<span class="tag">${tag}</span>`)}</div>` : nothing}
        </div>
      </div>
    `;
  }

  private renderStock(wine: Wine) {
    const hasMovementData = wine.purchased !== null ||
      wine.consumed !== null ||
      wine.movement_balance !== null ||
      wine.calculated_stock !== null ||
      wine.negative_movement_bottles !== null ||
      wine.physical_surplus_bottles !== null ||
      wine.unlocated_bottles !== null;

    return html`
      <section>
        <h3>${this.t("wine_detail_stock")}</h3>
        <div class="stock">
          ${this.stockItem("wine_detail_physical", wine.bottles_in_cellar)}
          ${this.stockItem("wine_detail_reconstructed", wine.bottles)}
          ${this.stockItem("wine_detail_effective", wine.effective_stock)}
          ${this.stockItem("wine_detail_source_stock", wine.ploud_bottles)}
        </div>
        ${hasMovementData ? html`
          <h3 style="margin-top: 16px">${this.t("wine_detail_movements")}</h3>
          <dl>
            ${this.field("wine_detail_purchased", wine.purchased)}
            ${this.field("wine_detail_consumed", wine.consumed)}
            ${this.field("wine_detail_balance", wine.movement_balance)}
            ${this.field("wine_detail_calculated", wine.calculated_stock)}
            ${this.field("wine_detail_unlocated", wine.unlocated_bottles)}
            ${this.field("wine_detail_negative", wine.negative_movement_bottles)}
            ${this.field("wine_detail_surplus", wine.physical_surplus_bottles)}
          </dl>
        ` : nothing}
      </section>
    `;
  }

  private renderLocations(wine: Wine) {
    if (!wine.locations.length) {
      return html`<p class="muted">${this.t("wine_detail_no_locations")}</p>`;
    }
    return html`
      <div class="locations">
        ${wine.locations.map((location) => html`
          <div class="location">
            <strong>${location.rack}</strong>
            ${location.row !== null && location.column !== null
              ? html`<span class="muted"> · ${this.t("row")} ${location.row + 1}, ${this.t("column")} ${location.column + 1}</span>`
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
      <ha-dialog .open=${true} header-title=${wine.name} @closed=${() => this.onDialogClosed()}>
        <div class="content">
          ${this.renderIdentity(wine)}
          ${this.renderStock(wine)}
          <section>
            <h3>${this.t("wine_detail_characteristics")}</h3>
            <dl>
              ${this.field("tooltip_domain", wine.domain)}
              ${this.field("tooltip_vintage", wine.vintage)}
              ${this.field("tooltip_appellation", wine.appellation)}
              ${this.field("tooltip_classification", wine.classification)}
              ${this.field("tooltip_color", wine.color)}
              ${this.field("tooltip_region", wine.region)}
              ${this.field("tooltip_country", wine.country)}
              ${this.field("tooltip_grapes", wine.grapes)}
              ${this.field("tooltip_cuvee", wine.cuvee)}
              ${this.field("tooltip_format", wine.bottle_format)}
              ${this.field("tooltip_volume", wine.bottle_volume_l === null ? null : `${this.formatNumber(wine.bottle_volume_l)} L`)}
              ${this.field("wine_detail_alcohol", wine.alcohol_percent === null ? null : `${this.formatNumber(wine.alcohol_percent)} %`)}
              ${this.field("tooltip_temperature", temperature)}
            </dl>
          </section>
          <section>
            <h3>${this.t("locations")}</h3>
            ${this.renderLocations(wine)}
          </section>
          ${wine.comment ? html`
            <section>
              <h3>${this.t("wine_detail_comment")}</h3>
              <div class="comment">${wine.comment}</div>
            </section>
          ` : nothing}
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
