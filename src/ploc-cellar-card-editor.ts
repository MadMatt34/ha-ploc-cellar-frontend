import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant, PlocCellarCardConfig } from "./types";
import { translate, type TranslationKey } from "./translations";

type EditorField =
  | "config_entry_id" | "title" | "default_sort" | "page_size"
  | "rack_picker_mode" | "show_rack_header" | "show_rack_occupancy"
  | "show_occupancy" | "show_diagnostics" | "show_diagnostics_expanded"
  | "show_statistics" | "show_statistics_legends";

@customElement("ploc-cellar-card-editor")
export class PlocCellarCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: PlocCellarCardConfig;

  private get isOverviewCard(): boolean { return this.config?.type === "custom:ploc-cellar-card"; }
  private get isInventoryCard(): boolean { return this.config?.type === "custom:ploc-cellar-inventory-card"; }
  private get isRackCard(): boolean { return this.config?.type === "custom:ploc-cellar-rack-card"; }

  private get schema(): Array<Record<string, unknown>> {
    const language = this.hass?.language ?? "en";
    const section = (titleKey: TranslationKey, schema: Array<Record<string, unknown>>): Record<string, unknown> => ({
      type: "expandable", name: "", title: translate(language, titleKey),
      expanded: true, flatten: true, schema,
    });
    const fields: Array<Record<string, unknown>> = [{
      name: "config_entry_id", required: true,
      selector: { config_entry: { integration: "ploc_cellar" } },
    }];

    if (this.isOverviewCard) {
      fields.push(
        section("editor_section_general", [{ name: "title", selector: { text: {} } }]),
        section("editor_section_occupancy", [{ name: "show_occupancy", selector: { boolean: {} } }]),
        section("editor_section_diagnostics", [
          { name: "show_diagnostics", selector: { boolean: {} } },
          { name: "show_diagnostics_expanded", visible: { field: "show_diagnostics", value: true }, selector: { boolean: {} } },
        ]),
        section("editor_section_statistics", [
          { name: "show_statistics", selector: { boolean: {} } },
          { name: "show_statistics_legends", visible: { field: "show_statistics", value: true }, selector: { boolean: {} } },
        ]),
      );
    } else if (this.isInventoryCard) {
      fields.push(
        section("editor_section_general", [{ name: "title", selector: { text: {} } }]),
        section("editor_section_inventory", [
          { name: "page_size", selector: { number: { min: 10, max: 200, step: 10, mode: "box" } } },
          { name: "default_sort", selector: { select: { mode: "dropdown", options: [
            { label: translate(language, "sort_name_asc"), value: "name-asc" },
            { label: translate(language, "sort_name_desc"), value: "name-desc" },
            { label: translate(language, "sort_bottles_asc"), value: "bottles-asc" },
            { label: translate(language, "sort_bottles_desc"), value: "bottles-desc" },
            { label: translate(language, "sort_vintage_asc"), value: "vintage-asc" },
            { label: translate(language, "sort_vintage_desc"), value: "vintage-desc" },
          ] } } },
        ]),
      );
    } else if (this.isRackCard) {
      fields.push(
        section("editor_section_general", [{ name: "title", selector: { text: {} } }]),
        section("editor_section_rack_selection", [{
          name: "rack_picker_mode", selector: { select: { mode: "dropdown", options: [
            { label: translate(language, "editor_rack_picker_buttons"), value: "buttons" },
            { label: translate(language, "editor_rack_picker_dropdown"), value: "dropdown" },
          ] } },
        }]),
        section("editor_section_rack_header", [
          { name: "show_rack_header", selector: { boolean: {} } },
          { name: "show_rack_occupancy", visible: { field: "show_rack_header", value: true }, selector: { boolean: {} } },
        ]),
      );
    }
    return fields;
  }

  setConfig(config: PlocCellarCardConfig): void {
    const nextConfig = { ...config };
    if (this.isOverviewType(config.type)) {
      nextConfig.show_occupancy = config.show_occupancy !== false;
      nextConfig.show_diagnostics = config.show_diagnostics !== false;
      nextConfig.show_diagnostics_expanded = config.show_diagnostics_expanded === true;
      nextConfig.show_statistics = config.show_statistics !== false;
      nextConfig.show_statistics_legends = config.show_statistics_legends !== false;
    } else if (config.type === "custom:ploc-cellar-inventory-card") {
      nextConfig.default_sort = config.default_sort ?? "name-asc";
      nextConfig.page_size = config.page_size ?? 10;
    } else if (config.type === "custom:ploc-cellar-rack-card") {
      nextConfig.rack_picker_mode = config.rack_picker_mode ?? "buttons";
      nextConfig.show_rack_header = config.show_rack_header !== false;
      nextConfig.show_rack_occupancy = config.show_rack_occupancy !== false;
    }
    this.config = nextConfig;
  }

  private isOverviewType(type: string): boolean { return type === "custom:ploc-cellar-card"; }

  private computeLabel = (schema: { name: string }): string => {
    const labels: Record<EditorField, TranslationKey> = {
      config_entry_id: "editor_configuration", title: "editor_title",
      default_sort: "editor_default_sort", page_size: "editor_page_size",
      rack_picker_mode: "editor_rack_picker_mode", show_rack_header: "editor_show_rack_header",
      show_rack_occupancy: "editor_show_rack_occupancy", show_occupancy: "editor_show_occupancy",
      show_diagnostics: "editor_show_diagnostics", show_diagnostics_expanded: "editor_show_diagnostics_expanded",
      show_statistics: "editor_show_statistics", show_statistics_legends: "editor_show_statistics_legends",
    };
    return translate(this.hass?.language ?? "en", labels[schema.name as EditorField]);
  };

  private computeHelper = (schema: { name: string }): string | undefined => {
    const helpers: Partial<Record<EditorField, TranslationKey>> = {
      config_entry_id: "editor_configuration_helper", title: "editor_title_helper",
      page_size: "editor_page_size_helper", show_diagnostics_expanded: "editor_diagnostics_expanded_helper",
      show_statistics_legends: "editor_statistics_legends_helper", show_rack_occupancy: "editor_rack_occupancy_helper",
    };
    const key = helpers[schema.name as EditorField];
    return key ? translate(this.hass?.language ?? "en", key) : undefined;
  };

  private valueChanged(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    event.stopPropagation();
    const config = { ...this.config, ...event.detail.value } as PlocCellarCardConfig;
    this.config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  protected render() {
    return html`<ha-form .hass=${this.hass} .data=${this.config ?? {}} .schema=${this.schema}
      .computeLabel=${this.computeLabel} .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}></ha-form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "ploc-cellar-card-editor": PlocCellarCardEditor; }
}
