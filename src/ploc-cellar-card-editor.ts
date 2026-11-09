import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant, PlocCellarCardConfig } from "./types";
import { translate, type TranslationKey } from "./translations";

type EditorField =
  | "config_entry_id"
  | "title"
  | "default_sort"
  | "rack_picker_mode"
  | "show_rack_occupancy"
  | "show_occupancy"
  | "show_diagnostics"
  | "show_statistics"
  | "show_statistics_legends";

@customElement("ploc-cellar-card-editor")
export class PlocCellarCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: PlocCellarCardConfig;

  private get isOverviewCard(): boolean {
    return this.config?.type === "custom:ploc-cellar-card";
  }

  private get isInventoryCard(): boolean {
    return this.config?.type === "custom:ploc-cellar-inventory-card";
  }

  private get isRackCard(): boolean {
    return this.config?.type === "custom:ploc-cellar-rack-card";
  }

  private get schema(): Array<Record<string, unknown>> {
    const fields: Array<Record<string, unknown>> = [
      {
        name: "config_entry_id",
        required: true,
        selector: { config_entry: { integration: "ploc_cellar" } },
      },
    ];

    if (this.isOverviewCard) {
      fields.push(
        { name: "title", selector: { text: {} } },
        { name: "show_occupancy", selector: { boolean: {} } },
        { name: "show_diagnostics", selector: { boolean: {} } },
        { name: "show_statistics", selector: { boolean: {} } },
      );

      if (this.config?.show_statistics !== false) {
        fields.push({
          name: "show_statistics_legends",
          selector: { boolean: {} },
        });
      }
    } else if (this.isInventoryCard) {
      fields.push(
        { name: "title", selector: { text: {} } },
        {
          name: "default_sort",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { label: translate(this.hass?.language ?? "en", "sort_name_asc"), value: "name-asc" },
                { label: translate(this.hass?.language ?? "en", "sort_name_desc"), value: "name-desc" },
                { label: translate(this.hass?.language ?? "en", "sort_bottles_asc"), value: "bottles-asc" },
                { label: translate(this.hass?.language ?? "en", "sort_bottles_desc"), value: "bottles-desc" },
                { label: translate(this.hass?.language ?? "en", "sort_vintage_asc"), value: "vintage-asc" },
                { label: translate(this.hass?.language ?? "en", "sort_vintage_desc"), value: "vintage-desc" },
              ],
            },
          },
        },
      );
    } else if (this.isRackCard) {
      fields.push(
        { name: "title", selector: { text: {} } },
        { name: "show_rack_occupancy", selector: { boolean: {} } },
        {
          name: "rack_picker_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                {
                  label: translate(this.hass?.language ?? "en", "editor_rack_picker_buttons"),
                  value: "buttons",
                },
                {
                  label: translate(this.hass?.language ?? "en", "editor_rack_picker_dropdown"),
                  value: "dropdown",
                },
              ],
            },
          },
        },
      );
    }

    return fields;
  }

  setConfig(config: PlocCellarCardConfig): void {
    const nextConfig = { ...config };

    if (this.isOverviewType(config.type)) {
      nextConfig.show_occupancy = config.show_occupancy !== false;
      nextConfig.show_diagnostics = config.show_diagnostics !== false;
      nextConfig.show_statistics = config.show_statistics !== false;
      nextConfig.show_statistics_legends = config.show_statistics_legends !== false;
    } else if (config.type === "custom:ploc-cellar-inventory-card") {
      nextConfig.default_sort = config.default_sort ?? "name-asc";
    } else if (config.type === "custom:ploc-cellar-rack-card") {
      nextConfig.rack_picker_mode = config.rack_picker_mode ?? "buttons";
      nextConfig.show_rack_occupancy = config.show_rack_occupancy !== false;
    }

    this.config = nextConfig;
  }

  private isOverviewType(type: string): boolean {
    return type === "custom:ploc-cellar-card";
  }

  private computeLabel = (schema: { name: string }): string => {
    const labels: Record<EditorField, TranslationKey> = {
      config_entry_id: "editor_configuration",
      title: "editor_title",
      default_sort: "sort_by",
      rack_picker_mode: "editor_rack_picker_mode",
      show_rack_occupancy: "editor_show_rack_occupancy",
      show_occupancy: "editor_show_occupancy",
      show_diagnostics: "editor_show_diagnostics",
      show_statistics: "editor_show_statistics",
      show_statistics_legends: "editor_show_statistics_legends",
    };
    return translate(
      this.hass?.language ?? "en",
      labels[schema.name as EditorField],
    );
  };

  private computeHelper = (schema: { name: string }): string | undefined => {
    if (schema.name === "config_entry_id") {
      return translate(this.hass?.language ?? "en", "editor_configuration_helper");
    }
    if (schema.name === "title") {
      return translate(this.hass?.language ?? "en", "editor_title_helper");
    }
    return undefined;
  };

  private valueChanged(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    event.stopPropagation();
    const config = { ...this.config, ...event.detail.value } as PlocCellarCardConfig;
    this.config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config ?? {}}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ploc-cellar-card-editor": PlocCellarCardEditor;
  }
}
