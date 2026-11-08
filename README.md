# Ploc Cellar Cards

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Independent Home Assistant Lovelace frontend for the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).

[Version française](README.fr.md)

This repository contains three custom cards:

- **Ploc Cellar overview** (`custom:ploc-cellar-card`): cellar overview and statistics, including physical and reconstructed stock, rack occupancy, stock diagnostics, and donut charts for distributions by color, region, appellation, vintage and bottle format. Chart breakdowns cover known wine references; unresolved wine positions remain included in global physical totals and are reported separately.
- **Ploc Cellar inventory** (`custom:ploc-cellar-inventory-card`): searchable wine list with collapsible color, region, appellation, vintage and food-pairing filters, sorting and quantities. Color, region, appellation and vintage filters also offer an **Unknown** option to find wines whose property is missing or blank. Wine details remain available by selecting a wine name.
- **Ploc Cellar rack** (`custom:ploc-cellar-rack-card`): rack selector and a position map based on the actual PLOUD row/column coordinates. Occupied positions are represented individually and use the wine color when available.
  The editor lets you hide the rack occupancy bar; it is shown by default and matches the width of the position map.

The former **Ploc Cellar Statistics** card type remains registered as a compatibility alias: existing dashboards using `custom:ploc-cellar-statistics-card` continue to display the unified overview. New dashboards should use `custom:ploc-cellar-card`.

Each card uses the native configuration-entry selector in its editor and stores its own `config_entry_id`. The cards communicate only with Home Assistant through the integration's `ploc_cellar.get_inventory` WebSocket response service. They do not connect to PLOUD directly. The backend integration must be installed and configured before the cards can display data.

The cards request the inventory when they are initialized and expose a manual refresh action. They do not poll for backend synchronization events, so use **Refresh** after a PLOUD synchronization when a dashboard has remained open.

## Installation

1. Install and configure the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).
2. In HACS, open **Custom repositories**, add `MadMatt34/ha-ploc-cellar-frontend`, and select the **Dashboard** category. This manual step is needed until the repository is included in the default HACS catalog.
3. Install **Ploc Cellar Cards** from HACS.
4. HACS normally registers the dashboard resource automatically. If you manage dashboard resources manually (for example, in YAML), add this module resource:

   ```yaml
   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js
   type: module
   ```
5. Add one of the three cards from the dashboard card picker and select the Ploc Cellar configuration entry in its editor.

The existing card types and their configuration keys are retained. Existing card configurations do not need to be recreated when migrating from the integration-served resource.

### Migrating from the integration-served resource

If you previously added `/ploc_cellar_static/ploc-cellar-card.js` manually, install this HACS Dashboard package first, then replace the old Lovelace resource with the one installed by HACS. Do not load both JavaScript modules at the same time: they register the same custom card types.

In a **Sections** view, the overview card uses a default width of 12 columns without forcing a row height. You can enable **Fit height to content** in the **Layout** tab if you want its height to follow its content.

## Development

Requires Node.js `^20.19.0` or `>=22.12.0` (the versions supported by Vite 7).

```sh
npm ci
npm run check
npm test
npm run build
```

The production bundle is generated at `dist/ploc-cellar-card.js`, then copied to the repository root as `ploc-cellar-card.js`, the filename expected by HACS (`hacs.json`). Both files are versioned. Dependencies are bundled into the standalone JavaScript module. The frontend CI workflow runs the strict TypeScript check, unit tests and production build on pushes and pull requests; on `main`, it commits both generated bundles when they change.

## Backend contract

See the [backend contract](docs/BACKEND_CONTRACT.md) for the WebSocket request, response fields, inventory semantics and compatibility rules.

The frontend depends on the `ploc_cellar.get_inventory` Home Assistant WebSocket response service exposed by the integration. The service contract and inventory model are maintained in the [backend repository](https://github.com/MadMatt34/ha-ploc-cellar). Changes to the backend response must remain compatible with the TypeScript interfaces in `src/types.ts`.

The optional `Wine.meals` field contains PLOUD food-pairing flags as a raw bitmask. The complete flag-to-category mapping, bitwise combination rules and handling of unknown flags are documented in the [backend contract](docs/BACKEND_CONTRACT.md).

## Languages

English and French are supported.

## Wine characteristics

The wine detail dialog presents wine characteristics as icon-led rows. Grape varieties are displayed in a separate composition panel; explicit percentages in the source text are represented by proportional bars. When PLOUD provides grape names without percentages, the card displays the names without inventing proportions.

## Wine photos

The wine detail dialog displays the cached PLOUD wine image when the backend provides a non-null `image_url`. The backend selects the primary image first and falls back to the cover image when the primary image is unavailable locally.

Images are served by an authenticated Home Assistant endpoint. The card retrieves them with `hass.fetchWithAuth()`; it does not contact PLOUD directly and does not store PLOUD credentials. The returned blob is displayed through a browser object URL. Object URLs are revoked when replaced or when the dialog element is disconnected. If the backend changes `image_url` (including its version query when the same PLOUD document is updated), the card fetches the new image and releases the previous object URL.

The field is optional for compatibility with older backend responses. When it is absent or null, the wine dialog remains usable and simply displays no photo.

## Wine-name typography

Wine names use the locally bundled Cormorant Garamond typeface (SIL Open Font License) in inventory rows, diagnostic wine links and the wine-detail dialog title. Rack-position labels and wine tooltips use Home Assistant's standard typography. Other interface text retains Home Assistant's normal typography. The font is bundled with the card, so no external font service or network request is needed at runtime.


## Numeric typography

Cellar overview values, rack counts and diagnostic quantities use the locally bundled DJB Get Digital typeface. Bottle-position coordinates use Home Assistant's standard typography. Donut chart center totals use DJB Get Digital; chart legends and distribution values retain the standard interface typography. DJB Get Digital is proprietary font software and is included with permission from the rights holder; it is not covered by this repository's software license.
