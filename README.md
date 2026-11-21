# Ploc Cellar Cards

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Independent Home Assistant Lovelace frontend for the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).

[Version française](README.fr.md)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Dashboard-blue)](https://www.home-assistant.io/dashboards/)
[![HACS](https://img.shields.io/badge/HACS-Dashboard%20plugin-blue)](https://www.hacs.xyz/)
[![Frontend CI](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml)
[![HACS validation](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## Documentation

- [Documentation index](docs/README.md) / [version française](docs/README.fr.md)
- [Backend contract](docs/BACKEND_CONTRACT.md) / [français](docs/BACKEND_CONTRACT.fr.md)
- [Backend/frontend compatibility and release policy](docs/COMPATIBILITY_AND_RELEASES.md) / [français](docs/COMPATIBILITY_AND_RELEASES.fr.md)

## Cards

This repository provides three custom cards:

- **Overview** (`custom:ploc-cellar-card`): cellar overview and statistics, including physical and reconstructed stock, rack occupancy, stock diagnostics, and distribution charts for color, region, appellation, vintage and bottle format. Charts cover known wine references; unresolved occupied positions remain included in global physical totals and are reported separately.
- **Inventory** (`custom:ploc-cellar-inventory-card`): searchable, sortable and paginated wine list with collapsible filters for color, region, appellation, vintage and food pairings. Unknown values can be selected for color, region, appellation and vintage to find incomplete wine records. Page size is configurable from 10 to 200 references, in steps of 10 (40 by default). Selecting a wine name opens its detail view.
- **Rack** (`custom:ploc-cellar-rack-card`): rack selector and position map based on actual PLOUD row/column coordinates. Occupied positions are represented individually and use the wine color when available. The occupancy bar can be hidden in the editor. On cards 600 px wide or less, the map switches to a compact touch-friendly grid with fixed 44 px cells; names and coordinate labels are hidden while color markers remain. Wide racks can scroll within the map. On mobile, the first tap shows a bottle tooltip and the second tap on the same position opens the detail dialog.

The overview editor groups title, occupancy, diagnostics and statistics settings into expandable sections. Diagnostics and statistics each have dependent options that are shown only when the corresponding feature is enabled. The rack editor groups general settings, rack selection and header options; the occupancy-bar option is shown only when the rack header is enabled. The inventory editor groups general settings and inventory display options. The filter summary also provides a clear-filters action.

Wine details contain collapsible sections for stock, food pairings, characteristics, locations and notes. Stock movements have their own subsection; grape composition is displayed separately, with proportional bars for explicit percentages and a full bar when no percentage is specified.

## Requirements

- Home Assistant with the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar) installed and configured.
- A browser supported by the Home Assistant frontend.

The card editors use Home Assistant's native configuration-entry selector. Select the Ploc Cellar account whose inventory should be displayed. Each card stores its own selected integration entry.

## Installation

1. Install and configure the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).
2. In HACS, open **Custom repositories**, add **MadMatt34/ha-ploc-cellar-frontend**, and select the **Dashboard** category. This is required until the repository is included in the default HACS catalog.
3. Install **Ploc Cellar Cards** from HACS.
4. HACS normally registers the dashboard resource automatically. If you manage resources manually (for example, in YAML), add:

   ~~~yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ~~~

5. Add a Ploc Cellar card from the dashboard card picker and select the desired integration entry.

In a **Sections** view, the overview card defaults to 12 columns without forcing a row height. Enable **Fit height to content** in the **Layout** tab if desired.

## Automatic updates

Cards load the selected inventory when initialized and refresh after a successful backend synchronization. They subscribe to the entry-scoped `ploc_cellar/subscribe_sync` WebSocket notification and reload inventory using `ploc_cellar.get_inventory`. The notification contains no cellar data; it is only a refresh signal. No polling, manual refresh or entity ID is required. Each card listens only for updates belonging to its selected configuration entry.

The cards communicate with Home Assistant only. They do not connect to PLOUD and do not store PLOC credentials. The public `ploc_cellar_sync_completed` event remains available for administrator automations, but the cards do not subscribe to it.

## Languages and presentation

English and French are supported, following the Home Assistant language. Wine names use the bundled Cormorant Garamond typeface; overview values, rack counts and diagnostics use bundled DJB Get Digital. No external font service or runtime font download is required.

Wine photos are displayed when the backend has a cached image available. The card retrieves images through an authenticated Home Assistant endpoint; it does not contact PLOUD directly. The detail view remains usable when a photo is unavailable.

## Troubleshooting

- **The card type is unavailable:** confirm that Ploc Cellar Cards is installed through HACS and that the `ploc-cellar-card.js` dashboard resource is registered.
- **The editor cannot find a cellar:** install and configure the backend integration first, then reload the dashboard editor.
- **The card displays an error or no inventory:** verify the selected configuration entry and check Home Assistant logs for `ploc_cellar` errors.
- **The card does not refresh:** check backend/frontend compatibility and confirm that the card and synchronization use the same integration entry. Cards refresh after successful synchronization; they do not poll.

When reporting an issue, include the Home Assistant version, browser, frontend version or commit, card type and relevant browser-console or Home Assistant log messages. Do not include credentials or access tokens.

## Uninstallation

1. Remove Ploc Cellar cards from dashboards.
2. Uninstall **Ploc Cellar Cards** from HACS.
3. If the resource was added manually, remove `/hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js` from dashboard resources.
4. Reload the dashboard as appropriate.

Uninstalling the cards does not remove the backend integration or its inventory.

## License and disclaimer

This project is distributed under the [MIT License](LICENSE).

Ploc Cellar Cards is an independent Home Assistant frontend. It is not affiliated with, endorsed by or supported by PLOC or PLOUD. The backend integration uses private, undocumented PLOUD interfaces; the cards themselves communicate only with the Home Assistant integration.
