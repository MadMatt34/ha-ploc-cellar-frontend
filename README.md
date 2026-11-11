# Ploc Cellar Cards

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Independent Home Assistant Lovelace frontend for the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).

[Version française](README.fr.md)

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Dashboard-blue)](https://www.home-assistant.io/dashboards/)
[![HACS](https://img.shields.io/badge/HACS-Dashboard%20plugin-blue)](https://www.hacs.xyz/)
[![Frontend CI](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/frontend-ci.yml)
[![HACS validation](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml/badge.svg)](https://github.com/MadMatt34/ha-ploc-cellar-frontend/actions/workflows/validate.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📚 Documentation

Release compatibility and version policy: [Compatibility matrix and releases](docs/COMPATIBILITY_AND_RELEASES.md).

- [Cards and capabilities](#ploc-cellar-cards)
- [Installation](#installation)
- [Development and CI](#development)
- [Backend contract](#backend-contract)
- [Wine characteristics](#wine-characteristics)
- [Wine photos](#wine-photos)
- [Typography](#wine-name-typography)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)
- [License and disclaimer](#license-and-disclaimer)


This repository contains three custom cards:

- **Ploc Cellar overview** (`custom:ploc-cellar-card`): cellar overview and statistics, including physical and reconstructed stock, rack occupancy, stock diagnostics, and donut charts for distributions by color, region, appellation, vintage and bottle format. Chart breakdowns cover known wine references; unresolved wine positions remain included in global physical totals and are reported separately.
- **Ploc Cellar inventory** (`custom:ploc-cellar-inventory-card`): searchable, paginated wine list with collapsible color, region, appellation, vintage and food-pairing filters, sorting and quantities. The number of wine references per page is configurable in the editor from 10 to 200 in steps of 10 (40 by default). Color, region, appellation and vintage filters also offer an **Unknown** option to find wines whose property is missing or blank. Wine details remain available by selecting a wine name.
- **Ploc Cellar rack** (`custom:ploc-cellar-rack-card`): rack selector and a position map based on the actual PLOUD row/column coordinates. Occupied positions are represented individually and use the wine color when available.
  The editor lets you hide the rack occupancy bar; it is shown by default and matches the width of the position map.

 

Each card uses the native configuration-entry selector in its editor and stores its own `config_entry_id`. The cards communicate only with Home Assistant through the integration's `ploc_cellar.get_inventory` WebSocket response service. They do not connect to PLOUD directly. The backend integration must be installed and configured before the cards can display data.

The cards request the inventory when they are initialized and automatically refresh when the integration completes a successful PLOUD synchronization. The update is delivered through a Home Assistant event scoped to the selected configuration entry; no entity ID, polling or manual refresh is required.

## 🧩 Installation

1. Install and configure the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).
2. In HACS, open **Custom repositories**, add `MadMatt34/ha-ploc-cellar-frontend`, and select the **Dashboard** category. This manual step is needed until the repository is included in the default HACS catalog.
3. Install **Ploc Cellar Cards** from HACS.
4. HACS normally registers the dashboard resource automatically. If you manage dashboard resources manually (for example, in YAML), add this module resource:

   ```yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ```
5. Add one of the three cards from the dashboard card picker and select the Ploc Cellar configuration entry in its editor.

 In a **Sections** view, the overview card uses a default width of 12 columns without forcing a row height. You can enable **Fit height to content** in the **Layout** tab if you want its height to follow its content.

## 🧑‍💻 Development

Requires Node.js `^20.19.0` or `>=22.12.0` (the versions supported by Vite 8). Browser interaction tests use the pinned Playwright 1.65.0 dependency and Chromium.

```sh
npm ci
npm run check
npm test
npx playwright install chromium # once per local environment
npm run test:e2e
npm run build
```

The production bundle is generated at `dist/ploc-cellar-card.js`, then copied to the repository root as `ploc-cellar-card.js`, the filename expected by HACS (`hacs.json`). Both files are versioned. Dependencies are bundled into the standalone JavaScript module. The frontend CI workflow runs the strict TypeScript check, unit tests and production build on pushes and pull requests. A separate Chromium job runs the browser interaction suite on every push and pull request; on `main`, it commits both generated bundles when they change. The CI build also enforces an 800,000-byte (uncompressed) production JavaScript bundle limit to catch unexpected growth.

## 🔗 Backend contract


See the [backend contract](docs/BACKEND_CONTRACT.md) for the WebSocket request, response fields, inventory semantics and contract rules.

The frontend depends on the `ploc_cellar.get_inventory` Home Assistant WebSocket response service exposed by the integration. The service contract and inventory model are maintained in the [backend repository](https://github.com/MadMatt34/ha-ploc-cellar). Changes to the backend response must conform to the TypeScript interfaces in `src/types.ts`.

The nullable `Wine.meals` field contains PLOUD food-pairing flags as a raw bitmask. The complete flag-to-category mapping, bitwise combination rules and handling of unknown flags are documented in the [backend contract](docs/BACKEND_CONTRACT.md).

### 🔄 Automatic synchronization updates

After initialization, each card subscribes to the `ploc_cellar/subscribe_sync` WebSocket command for its selected configuration entry. The backend uses an internal signal dedicated to that entry and sends an empty notification after each successfully committed synchronization. Non-admin users can therefore refresh the cards without subscribing to a custom Home Assistant event. The card then reads the inventory through `ploc_cellar.get_inventory`; no cellar data is included in the notification. The public `ploc_cellar_sync_completed` event remains available for administrator automations, but the cards no longer subscribe to it.

## 🌐 Languages

English and French are supported.

## 🍷 Wine characteristics

The wine detail dialog uses independently collapsible sections for stock, food pairings, characteristics, locations and notes. Rack locations are grouped into one tile per rack; known row/column components remain visible when the other coordinate is missing. Stock movements are nested in their own collapsible subsection. Characteristics are grouped into origin/identification and tasting/composition, with icon-led rows. Grape varieties are displayed in a separate composition panel; explicit percentages in the source text are represented by proportional bars. When a grape has no explicit percentage, it is treated as 100% and shown with a full bar. Invalid explicit percentages remain unknown.

## 🖼️ Wine photos

The wine detail dialog displays the cached PLOUD wine image when `image_url` is non-null. The backend selects the primary image first and falls back to the cover image when the primary image is unavailable locally.

Images are served by an authenticated Home Assistant endpoint. The card retrieves them with `hass.fetchWithAuth()`; it does not contact PLOUD directly and does not store PLOUD credentials. The returned blob is displayed through a browser object URL. Object URLs are revoked when replaced or when the dialog element is disconnected. If the backend changes `image_url` (including its version query when the same PLOUD document is updated), the card fetches the new image and releases the previous object URL.

The `image_url` field is nullable. When it is null, the wine dialog remains usable and simply displays no photo.

## 🔤 Wine-name typography

Wine names use the locally bundled Cormorant Garamond typeface (SIL Open Font License) in inventory rows, diagnostic wine links and the wine-detail dialog title. Rack-position labels and wine tooltips use Home Assistant's standard typography. Other interface text retains Home Assistant's normal typography. The font is bundled with the card, so no external font service or network request is needed at runtime.


## 🔢 Numeric typography

Cellar overview values, rack counts and diagnostic quantities use the locally bundled DJB Get Digital typeface. Bottle-position coordinates use Home Assistant's standard typography. Donut chart center totals use DJB Get Digital; chart legends and distribution values retain the standard interface typography. DJB Get Digital is proprietary font software and is included with permission from the rights holder; it is not covered by this repository's software license.


## 🛠️ Troubleshooting

- **The card type is not available:** confirm that the HACS Dashboard plugin is installed and that the `ploc-cellar-card.js` resource is registered in Home Assistant.
- **The editor cannot find a cellar:** install and configure the [Ploc Cellar backend integration](https://github.com/MadMatt34/ha-ploc-cellar) first, then reload the dashboard editor.
- **The card displays an error or no inventory:** verify the selected configuration entry and check Home Assistant logs for errors from `ploc_cellar`.
- **The card does not refresh after synchronization:** make sure the backend and frontend are compatible and that the card is configured for the same entry that was synchronized. The cards do not poll and do not require a manual refresh action.

When reporting a frontend issue, [open an issue on GitHub](https://github.com/MadMatt34/ha-ploc-cellar-frontend/issues/new) and include the Home Assistant version, browser, frontend repository version/commit, the card type and relevant browser-console or Home Assistant log messages. Do not include credentials or access tokens.

## 🗑️ Uninstallation

1. Remove the Ploc Cellar cards from the dashboards where they are used.
2. In HACS, uninstall **Ploc Cellar Cards**.
3. If the dashboard resource was added manually, remove the `/hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js` resource from the dashboard resources configuration.
4. Restart or reload the dashboard as appropriate.

The backend integration and its inventory are independent; uninstalling the cards does not remove the Ploc Cellar integration or its data.

## ⚖️ License and disclaimer

This project is distributed under the [MIT License](LICENSE).

Ploc Cellar Cards is an independent frontend for Home Assistant. It is not affiliated with, endorsed by or supported by PLOC or PLOUD.

The overall Ploc Cellar project relies on PLOUD interfaces that are **not part of a public, documented API**. The backend's implementation was developed through independent technical research, including analysis of PLOUD-related repositories, comparison of application backup files, examination of the official mobile application's behavior and other observations and tests. The frontend itself communicates only with the Home Assistant backend and follows its documented local contract; it does not access PLOUD directly. This research is reverse-engineering work, not an official API specification, and the private interfaces used by the backend may change at any time and without notice. The owner of PLOC was contacted to discuss this work and the availability of an official interface, but no response had been received when this documentation was written.
The backend integration communicates with PLOUD through private, undocumented interfaces. Their behavior was reconstructed through independent technical research and reverse engineering; they are not a public or supported API contract and may change without notice. PLOC was contacted about documenting or supporting this access; no response had been received when this notice was written. The cards themselves do not call PLOUD: they communicate only with the Home Assistant backend integration.
