# Ploc Cellar Cards

![Ploc Cellar](https://raw.githubusercontent.com/MadMatt34/ha-ploc-cellar/main/custom_components/ploc_cellar/brand/logo.png)

Independent Home Assistant Lovelace frontend for the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).

[Version française](README.fr.md)

This repository contains three custom cards:

- **Ploc Cellar overview** (`custom:ploc-cellar-card`): cellar overview and statistics, including physical and reconstructed stock, rack occupancy, stock diagnostics, and donut charts for distributions by color, region, appellation, vintage and bottle format. Chart breakdowns cover known wine references; unresolved wine positions remain included in global physical totals and are reported separately.
- **Ploc Cellar inventory** (`custom:ploc-cellar-inventory-card`): searchable wine list with color, region, appellation and vintage filters, sorting, quantities and expandable wine details.
- **Ploc Cellar rack** (`custom:ploc-cellar-rack-card`): rack selector and a position map based on the actual PLOUD row/column coordinates. Occupied positions are represented individually and use the wine color when available.

The former **Ploc Cellar Statistics** card type remains registered as a compatibility alias: existing dashboards using `custom:ploc-cellar-statistics-card` continue to display the unified overview. New dashboards should use `custom:ploc-cellar-card`.

Each card uses the native configuration-entry selector in its editor and stores its own `config_entry_id`. The cards communicate only with Home Assistant through the integration's `ploc_cellar.get_inventory` WebSocket response service. They do not connect to PLOUD directly. The backend integration must be installed and configured before the cards can display data.

## Installation

1. Install and configure the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).
2. In HACS, open **Custom repositories**, add `MadMatt34/ha-ploc-cellar-frontend`, and select the **Dashboard** category. This manual step is needed until the repository is included in the default HACS catalog.
3. Install **Ploc Cellar Cards** from HACS.
4. HACS normally registers the dashboard resource automatically. If you manage dashboard resources manually (for example, in YAML), add this module resource:\n\n   ```yaml\n   url: /hacsfiles/ha-ploc-cellar-frontend/ploc-cellar-card.js\n   type: module\n   ```
5. Add one of the three cards from the dashboard card picker and select the Ploc Cellar configuration entry in its editor.

The existing card types and their configuration keys are retained. Existing card configurations do not need to be recreated when migrating from the integration-served resource.

### Migrating from the integration-served resource

If you previously added `/ploc_cellar_static/ploc-cellar-card.js` manually, install this HACS Dashboard package first, then replace the old Lovelace resource with the one installed by HACS. Do not load both JavaScript modules at the same time: they register the same custom card types.

In a **Sections** view, the overview card uses a default width of 12 columns without forcing a row height. You can enable **Fit height to content** in the **Layout** tab if you want its height to follow its content.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run check
npm run build
```

The production bundle is generated at `dist/ploc-cellar-card.js`. Dependencies are bundled into the standalone JavaScript module. The frontend CI workflow runs the strict TypeScript check and production build on pushes and pull requests; on `main`, it commits the generated distributable when it changes.

## Backend contract

See the [backend contract](docs/BACKEND_CONTRACT.md) for the WebSocket request, response fields, inventory semantics and compatibility rules.

The frontend depends on the `ploc_cellar.get_inventory` Home Assistant WebSocket response service exposed by the integration. The service contract and inventory model are maintained in the [backend repository](https://github.com/MadMatt34/ha-ploc-cellar). Changes to the backend response must remain compatible with the TypeScript interfaces in `src/types.ts`.

## Languages

English and French are supported.
