# Ploc Cellar Cards

Independent Home Assistant Lovelace frontend for the [Ploc Cellar integration](https://github.com/MadMatt34/ha-ploc-cellar).

This repository contains three custom cards:

- **Overview** (`custom:ploc-cellar-card`): cellar overview, stock indicators and statistics.
- **Inventory** (`custom:ploc-cellar-inventory-card`): searchable and filterable wine inventory.
- **Rack layout** (`custom:ploc-cellar-rack-card`): visualizes rack positions and stored wines.

The cards communicate only with the Home Assistant integration through its `ploc_cellar.get_inventory` WebSocket response service. They do not connect to PLOUD directly. The backend integration must be installed and configured before the cards can display data.

## Installation

1. Install **Ploc Cellar** from [MadMatt34/ha-ploc-cellar](https://github.com/MadMatt34/ha-ploc-cellar) and complete its configuration.
2. In HACS, add this repository as a custom repository of category **Dashboard** (until it is available in the default HACS catalog).
3. Install **Ploc Cellar Cards** from HACS.
4. Add the resource provided by HACS to your dashboard if it is not added automatically. The JavaScript module is `ploc-cellar-card.js`.
5. Add one of the three cards to a dashboard and select the Ploc Cellar configuration in its card editor.

Existing card types and their configuration keys are retained:
- `custom:ploc-cellar-card`
- `custom:ploc-cellar-inventory-card`
- `custom:ploc-cellar-rack-card`

### Migrating from the integration-served resource

If you previously added `/ploc_cellar_static/ploc-cellar-card.js` manually, install this Dashboard package first, then replace that old Lovelace resource with the resource installed by HACS. Do not load both JavaScript modules at the same time: they register the same custom card types. Your existing card configurations do not need to be recreated.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run check
npm run build
```

The production bundle is generated at `dist/ploc-cellar-card.js`. Dependencies are bundled into the standalone JavaScript module.

## Backend contract

The frontend depends on the `ploc_cellar.get_inventory` Home Assistant WebSocket response service exposed by the integration. The service contract is maintained in the backend repository. Changes to the backend response must remain compatible with the TypeScript interfaces in `src/types.ts`.

## Languages

English and French are supported.
