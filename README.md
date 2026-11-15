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
- [Backend/frontend compatibility and release policy](docs/COMPATIBILITY_AND_RELEASES.md)

## Cards

This repository provides three custom cards:

- **Overview** (custom:ploc-cellar-card): cellar statistics, physical and reconstructed stock, rack occupancy, diagnostics and distribution charts for wine characteristics.
- **Inventory** (custom:ploc-cellar-inventory-card): searchable, sortable and paginated wine references, with filters for color, region, appellation, vintage and food pairings. Unknown values can be selected to find incomplete wine records.
- **Rack** (custom:ploc-cellar-rack-card): rack selector and a position map based on actual PLOUD row and column coordinates. Occupied positions use the wine color when available.

The inventory editor lets you choose the number of wine references per page (10–200; 40 by default). Selecting a wine name opens its detail view, with collapsible sections for stock, food pairings, characteristics, rack locations and notes.

## Requirements

- Home Assistant with the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar) installed and configured.
- A browser supported by the Home Assistant frontend.

The card editors use Home Assistant's native configuration-entry selector. Select the Ploc Cellar account whose inventory should be displayed.

## Installation

1. Install and configure the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).
2. In HACS, open **Custom repositories**, add **MadMatt34/ha-ploc-cellar-frontend**, and select the **Dashboard** category.
3. Install **Ploc Cellar Cards** from HACS.
4. HACS normally registers the dashboard resource automatically. If you manage resources manually (for example, in YAML), add:

   ~~~yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ~~~

5. Add a Ploc Cellar card from the dashboard card picker and select the desired integration entry.

In a **Sections** view, the overview card defaults to 12 columns without forcing a row height. Enable **Fit height to content** in the **Layout** tab if desired.

## Automatic updates

Cards load the selected inventory when initialized and refresh automatically after a successful backend synchronization. No polling, manual refresh or entity ID is required. Each card listens only for updates belonging to its selected configuration entry.

The cards communicate with Home Assistant only. They do not connect to PLOUD and do not store PLOC credentials.

## Languages and presentation

English and French are supported, following the Home Assistant language. Wine names and numeric values use bundled typefaces; no external font service or runtime font download is required. Wine photos are displayed when the backend has a cached image available, and the detail view remains usable without one.

## Troubleshooting

- **The card type is unavailable:** confirm that Ploc Cellar Cards is installed through HACS and that the ploc-cellar-card.js dashboard resource is registered.
- **The editor cannot find a cellar:** install and configure the backend integration first, then reload the dashboard editor.
- **The card displays an error or no inventory:** verify the selected configuration entry and check Home Assistant logs for ploc_cellar errors.
- **The card does not refresh:** check backend/frontend compatibility and confirm that the card and synchronization use the same integration entry.

When reporting an issue, include the Home Assistant version, browser, frontend version or commit, card type and relevant browser-console or Home Assistant log messages. Do not include credentials or access tokens.

## Uninstallation

1. Remove Ploc Cellar cards from dashboards.
2. Uninstall **Ploc Cellar Cards** from HACS.
3. If the resource was added manually, remove /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js from dashboard resources.
4. Reload the dashboard as appropriate.

Uninstalling the cards does not remove the backend integration or its inventory.

## License and disclaimer

This project is distributed under the [MIT License](LICENSE).

Ploc Cellar Cards is an independent Home Assistant frontend. It is not affiliated with, endorsed by or supported by PLOC or PLOUD. The backend integration uses private, undocumented PLOUD interfaces; the cards themselves communicate only with the Home Assistant integration.
