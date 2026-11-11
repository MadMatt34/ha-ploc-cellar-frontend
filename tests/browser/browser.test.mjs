import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { after, before, describe, it } from "node:test";
import { chromium } from "playwright";

const BASE_URL = "http://127.0.0.1:4179";
let server;
let browser;

async function waitForServer() {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${BASE_URL}/tests/browser/fixture.html`);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    if (server?.exitCode !== null && server?.exitCode !== undefined) {
      throw new Error(`Vite exited during startup with code ${server.exitCode}`);
    }
    await delay(100);
  }
  throw new Error("Vite did not become ready within 20 seconds");
}

async function openFixture() {
  const context = await browser.newContext();
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    window.__resizeObserverStats = { observed: 0, disconnected: 0 };
    window.__objectUrlStats = { revoked: [] };
    const originalRevokeObjectURL = URL.revokeObjectURL.bind(URL);
    URL.revokeObjectURL = (url) => {
      window.__objectUrlStats.revoked.push(url);
      originalRevokeObjectURL(url);
    };
    window.ResizeObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        window.__resizeObserverStats.observed += 1;
      }
      unobserve() {}
      disconnect() {
        window.__resizeObserverStats.disconnected += 1;
      }
    };
  });
  await page.goto(`${BASE_URL}/tests/browser/fixture.html`);
  await page.waitForFunction(() => window.__plocFixtureReady === true);
  return { context, page, pageErrors };
}

before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "4179", "--strictPort"],
    { stdio: "ignore" },
  );
  await waitForServer();
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
});

after(async () => {
  await browser?.close();
  server?.kill("SIGTERM");
});

describe("Ploc Cellar browser interactions", () => {
  it("filters unknown values, searches wines and sorts the visible results", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".wine").first().waitFor();

      await card.locator(".search").fill("domaine b");
      await assert.doesNotReject(() => card.getByText("Domaine B", { exact: true }).waitFor());
      assert.equal(await card.locator(".wine").count(), 1);

      await card.locator(".search").fill("");
      await card.locator(".filters > summary").click();
      const colorFilter = card.locator(".toolbar select").nth(0);
      await colorFilter.selectOption("unknown");
      assert.equal(await card.locator(".wine").count(), 1);
      await card.getByText("Vin inconnu", { exact: true }).waitFor();

      const clearFilters = card.locator(".filters-clear");
      await clearFilters.waitFor();
      assert.equal(
        await clearFilters.evaluate((button) => button.closest("summary")),
        null,
        "the clear-filters button must not be nested inside summary",
      );
      await clearFilters.click();
      assert.equal(await card.locator(".wine").count(), 3);
      assert.equal(await card.locator(".filters").getAttribute("open"), "");
      assert.equal(await card.locator(".filters-clear").count(), 0);

      await colorFilter.selectOption("all");
      await card.locator(".sort-row select").selectOption("name-desc");
      const names = await card.locator(".wine-name").allTextContents();
      assert.deepEqual(names, ["Vin inconnu", "Domaine B", "Château A"]);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });


  it("clears account-specific selections and filters when switching cellar", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.inventory.unlocated_bottles = 1;
        return window.mountPlocCard("ploc-cellar-card", {});
      });
      const overviewCard = page.locator("ploc-cellar-card");
      await overviewCard.locator(".diagnostic").filter({ hasText: "Unlocated bottles" }).click();
      await overviewCard.locator("ha-dialog").waitFor();
      await overviewCard.evaluate((element) => {
        element.setConfig({
          type: "custom:ploc-cellar-card",
          config_entry_id: "second-entry",
        });
      });
      await overviewCard.locator("ha-dialog").waitFor({ state: "detached" });

      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const inventoryCard = page.locator("ploc-cellar-inventory-card");
      await inventoryCard.locator(".wine").first().waitFor();
      await inventoryCard.locator(".search").fill("Château A");
      await inventoryCard.locator(".wine").first().click();
      await inventoryCard.locator("ploc-cellar-wine-detail").waitFor();

      await inventoryCard.evaluate((element) => {
        element.setConfig({
          type: "custom:ploc-cellar-inventory-card",
          config_entry_id: "second-entry",
        });
      });
      await inventoryCard.locator("ploc-cellar-wine-detail").waitFor({ state: "detached" });
      await page.waitForFunction(() =>
        document.querySelector("ploc-cellar-inventory-card")?.shadowRoot?.querySelector(".search")?.value === "",
      );
      await inventoryCard.locator(".wine").first().waitFor();

      await page.evaluate(() => window.mountPlocCard("ploc-cellar-rack-card", {
        rack_picker_mode: "dropdown",
      }));
      const rackCard = page.locator("ploc-cellar-rack-card");
      await rackCard.locator(".rack-name").getByText("Cave principale").waitFor();
      await rackCard.locator(".rack-picker-select").selectOption("rack-b");
      await rackCard.locator(".rack-name").getByText("Cave secondaire").waitFor();
      await rackCard.locator(".slot.occupied").first().click();
      await rackCard.locator("ploc-cellar-wine-detail").waitFor();

      await rackCard.evaluate((element) => {
        element.setConfig({
          type: "custom:ploc-cellar-rack-card",
          config_entry_id: "second-entry",
          rack_picker_mode: "dropdown",
        });
      });
      await rackCard.locator(".rack-name").getByText("Cave principale").waitFor();
      await rackCard.locator("ploc-cellar-wine-detail").waitFor({ state: "detached" });
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("shows stale inventory state beside the last successful synchronization", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.inventory.stale = true;
      });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-card", {}));
      const card = page.locator("ploc-cellar-card");
      const syncStatus = card.locator(".sync-status");
      await syncStatus.waitFor();
      await syncStatus.getByText("Data may be stale: the latest synchronization failed.").waitFor();
      assert.match(await syncStatus.innerText(), /Last successful synchronization:/);
      assert.equal(await card.locator(".summary + .warning").count(), 0);
      assert.equal(await card.locator(".sync-warning[role=" + '"status"' + "]").count(), 1);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("uses physical wine references until reconstructed stock is available", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.inventory.stock_reconstruction_complete = false;
        window.__plocFixture.inventory.wine_references = null;
        window.__plocFixture.inventory.stocked_wines = 2;
      });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-card", {}));
      const card = page.locator("ploc-cellar-card");
      await card.locator(".metric").nth(2).waitFor();
      assert.match(await card.locator(".metric").nth(2).innerText(), /2\s*Wine references in the cellar/);

      await page.evaluate(() => {
        window.__plocFixture.inventory.stock_reconstruction_complete = true;
        window.__plocFixture.inventory.wine_references = 1;
      });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-card", {}));
      await card.locator(".metric").nth(2).waitFor();
      assert.match(await card.locator(".metric").nth(2).innerText(), /1\s*Wine references in stock/);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("paginates inventory results and resets to the first page after filtering", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        const template = window.__plocFixture.inventory.wines[0];
        window.__plocFixture.inventory.wines = Array.from({ length: 45 }, (_, index) => ({
          ...template,
          id: `wine-${index + 1}`,
          name: `Wine ${String(index + 1).padStart(2, "0")}`,
        }));
      });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", { page_size: 10 }));
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".wine").first().waitFor();
      assert.equal(await card.locator(".wine").count(), 10);
      assert.equal(await card.locator(".wine-name").first().innerText(), "Wine 01");
      assert.equal(await card.locator(".pagination").innerText(), "1–10 of 45\nPage 1 of 5");

      await card.locator(".pagination button[aria-label=\"Next page\"]").click();
      assert.equal(await card.locator(".wine").count(), 10);
      assert.equal(await card.locator(".wine-name").first().innerText(), "Wine 11");

      for (let pageNumber = 3; pageNumber <= 5; pageNumber += 1) {
        await card.locator(".pagination button[aria-label=\"Next page\"]").click();
      }
      assert.equal(await card.locator(".wine").count(), 5);
      assert.equal(await card.locator(".wine-name").first().innerText(), "Wine 41");
      assert.equal(await card.locator(".pagination button[aria-label=\"Next page\"]").isDisabled(), true);

      await card.locator(".search").fill("Wine 45");
      assert.equal(await card.locator(".wine").count(), 1);
      assert.equal(await card.locator(".wine-name").first().innerText(), "Wine 45");
      assert.equal(await card.locator(".pagination").count(), 0);

      await card.locator(".search").fill("");
      await card.locator(".pagination button[aria-label=\"Next page\"]").click();
      assert.equal(await card.locator(".wine-name").first().innerText(), "Wine 11");

      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const defaultPageCard = page.locator("ploc-cellar-inventory-card");
      await defaultPageCard.locator(".wine").first().waitFor();
      assert.equal(await defaultPageCard.locator(".wine").count(), 40);
      assert.equal(await defaultPageCard.locator(".pagination").innerText(), "1–40 of 45\nPage 1 of 2");
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", { page_size: 200 }));
      const maxPageCard = page.locator("ploc-cellar-inventory-card");
      await maxPageCard.locator(".wine").first().waitFor();
      assert.equal(await maxPageCard.locator(".wine").count(), 45);
      assert.equal(await maxPageCard.locator(".pagination").count(), 0);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("exposes a 10-to-200 page-size editor setting with a default of 40", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      const editor = await page.evaluate(async () => {
        const element = document.createElement("ploc-cellar-card-editor");
        element.hass = window.testHass;
        element.setConfig({ type: "custom:ploc-cellar-inventory-card", config_entry_id: "fixture-entry" });
        document.body.append(element);
        await element.updateComplete;
        const form = element.shadowRoot.querySelector("ha-form");
        const field = form.schema.find((item) => item.name === "page_size");
        return { value: form.data.page_size, selector: field.selector.number };
      });
      assert.equal(editor.value, 40);
      assert.deepEqual(editor.selector, { min: 10, max: 200, step: 10, mode: "box" });
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("keeps inventory controls within a narrow mobile viewport", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".wine").first().waitFor();
      const dimensions = await card.evaluate((element) => {
        const surface = element.shadowRoot.querySelector("ha-card");
        return { width: surface.clientWidth, scrollWidth: surface.scrollWidth };
      });
      assert.ok(
        dimensions.scrollWidth <= dimensions.width + 1,
        `inventory card overflows on mobile: ${JSON.stringify(dimensions)}`,
      );
      await card.locator(".search").fill("Château");
      assert.equal(await card.locator(".wine").count(), 1);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("opens and closes the wine detail from the inventory card", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const card = page.locator("ploc-cellar-inventory-card");
      const wineButton = card.locator(".wine").filter({ hasText: "Château A" });
      await wineButton.click();
      const detail = card.locator("ploc-cellar-wine-detail");
      await detail.waitFor();
      await detail.locator("ha-dialog").waitFor();
      await detail.locator("ha-dialog").evaluate((dialog) => {
        dialog.dispatchEvent(new Event("closed", { bubbles: true }));
      });
      await detail.waitFor({ state: "detached" });
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("opens rack wines with mouse and keyboard and highlights the exact coordinate", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-rack-card", {
        rack_picker_mode: "buttons",
      }));
      const card = page.locator("ploc-cellar-rack-card");
      await card.locator(".slot.occupied").first().waitFor();

      await card.locator(".slot.occupied").first().click();
      let detail = card.locator("ploc-cellar-wine-detail");
      await detail.waitFor();
      const selected = detail.locator(".location-coordinate.selected");
      await selected.waitFor();
      assert.match(await selected.innerText(), /row\s*1.*col\s*1/i);
      assert.equal(await selected.locator('ha-icon[icon="mdi:target"]').count(), 1);
      await detail.locator("ha-dialog").evaluate((dialog) => {
        dialog.dispatchEvent(new Event("closed", { bubbles: true }));
      });
      await detail.waitFor({ state: "detached" });

      const secondSlot = card.locator(".slot.occupied").nth(1);
      await secondSlot.focus();
      await secondSlot.press("Space");
      detail = card.locator("ploc-cellar-wine-detail");
      await detail.waitFor();
      assert.equal(await detail.locator(".location-coordinate.selected ha-icon[icon='mdi:target']").count(), 1);
      await detail.locator("ha-dialog").evaluate((dialog) => {
        dialog.dispatchEvent(new Event("closed", { bubbles: true }));
      });
      await detail.waitFor({ state: "detached" });
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("switches racks and supports the dropdown picker", async () => {
    const { context, page } = await openFixture();
    try {
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-rack-card", {
        rack_picker_mode: "dropdown",
      }));
      const card = page.locator("ploc-cellar-rack-card");
      await card.locator(".rack-name").getByText("Cave principale").waitFor();
      await card.locator(".rack-picker-select").selectOption("rack-b");
      await card.locator(".rack-name").getByText("Cave secondaire").waitFor();
      assert.equal(await card.locator(".slot.occupied").count(), 1);
    } finally {
      await context.close();
    }
  });

  it("surfaces a WebSocket error and recovers after a successful sync event", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.fail = true;
        return window.mountPlocCard("ploc-cellar-inventory-card", {});
      });
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".error").getByText("Fixture WebSocket failure").waitFor();
      const callsBeforeSync = await page.evaluate(() => window.__plocFixture.calls);
      await page.evaluate(() => {
        window.__plocFixture.fail = false;
        window.__plocFixture.emitSync("another-entry");
      });
      await page.waitForTimeout(50);
      assert.equal(await page.evaluate(() => window.__plocFixture.calls), callsBeforeSync);

      await page.evaluate(() => window.__plocFixture.emitSync("fixture-entry"));
      await card.locator(".wine").first().waitFor();
      assert.equal(await card.locator(".error").count(), 0);
      assert.equal(
        await page.evaluate(() => window.__plocFixture.calls),
        callsBeforeSync + 1,
      );
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("emits updated configuration from the native editor form", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(async () => {
        const editor = document.createElement("ploc-cellar-card-editor");
        editor.hass = window.testHass;
        editor.setConfig({ type: "custom:ploc-cellar-rack-card", config_entry_id: "fixture-entry" });
        document.querySelector("#app").replaceChildren(editor);
        await editor.updateComplete;
        window.__editor = editor;
        window.__editorConfig = undefined;
        editor.addEventListener("config-changed", (event) => {
          window.__editorConfig = event.detail.config;
        });
      });
      const schema = await page.locator("ploc-cellar-card-editor ha-form").evaluate((form) =>
        form.schema.map((field) => field.name),
      );
      assert.ok(schema.includes("config_entry_id"));
      assert.ok(schema.includes("rack_picker_mode"));
      await page.locator("ploc-cellar-card-editor ha-form").evaluate((form) => {
        form.dispatchEvent(new CustomEvent("value-changed", {
          detail: { value: { title: "Test cellar" } },
          bubbles: true,
          composed: true,
        }));
      });
      const config = await page.evaluate(() => window.__editorConfig);
      assert.equal(config.title, "Test cellar");
      assert.equal(config.config_entry_id, "fixture-entry");
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });


  it("loads wine photos and revokes the object URL when the dialog closes", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.inventory.wines[0].image_url = "/api/ploc-cellar/image/wine-a?v=1";
        return window.mountPlocCard("ploc-cellar-inventory-card", {});
      });
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".wine").first().waitFor();
      await card.locator(".wine").filter({ hasText: "Château A" }).click();
      const detail = card.locator("ploc-cellar-wine-detail");
      const image = detail.locator("img.wine-image");
      await image.waitFor();
      const imageUrl = await image.getAttribute("src");
      assert.ok(imageUrl?.startsWith("blob:"));
      assert.equal(await page.evaluate(() => window.__plocFixture.imageFetches), 1);

      await detail.locator("ha-dialog").evaluate((dialog) => {
        dialog.dispatchEvent(new Event("closed", { bubbles: true }));
      });
      await detail.waitFor({ state: "detached" });
      await page.waitForFunction((url) => window.__objectUrlStats.revoked.includes(url), imageUrl);
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });


  it("shows wine-level inventory alerts without changing the inventory list, and labels cellar stock", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        document.documentElement.style.setProperty("--error-color", "rgb(200, 0, 0)");
        window.__plocFixture.inventory.unlocated_bottles = 2;
        window.__plocFixture.inventory.negative_movement_bottles = 1;
        window.__plocFixture.inventory.physical_surplus_bottles = 0;
        const wine = window.__plocFixture.inventory.wines[0];
        wine.bottles_in_cellar = 0;
        wine.effective_stock = 4;
        wine.unlocated_bottles = 2;
        wine.negative_movement_bottles = 1;
        return window.mountPlocCard("ploc-cellar-inventory-card", {});
      });
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-card", {}));
      await page.evaluate(() => {
        window.__plocFixture.inventory.wine_diagnostics = [{
          id: "wine-a",
          name: "Château A",
          domain: "Domaine A",
          vintage: 2018,
          purchased: 4,
          consumed: 2,
          movement_balance: 2,
          bottles_in_cellar: 0,
          effective_stock: 4,
          unlocated_bottles: 2,
          negative_movement_bottles: 1,
          physical_surplus_bottles: 0,
          wine: window.__plocFixture.inventory.wines[0],
        }];
      });
      const mainCard = page.locator("ploc-cellar-card");
      const mainDiagnostics = mainCard.locator(".diagnostic-value");
      await mainDiagnostics.first().waitFor();
      assert.equal(await mainDiagnostics.first().evaluate((element) => getComputedStyle(element).color), "rgb(200, 0, 0)");
      await mainCard.locator(".diagnostic").filter({ hasText: "Unlocated bottles" }).click();
      const diagnosticDialog = mainCard.locator("ha-dialog");
      await diagnosticDialog.waitFor();
      const diagnosticWine = diagnosticDialog.locator(".diagnostic-wine");
      await diagnosticWine.waitFor();
      assert.equal(await diagnosticWine.locator(".diagnostic-wine-name").innerText(), "Château A");
      assert.equal(await diagnosticWine.locator(".diagnostic-wine-metadata").innerText(), "Pauillac · Bordeaux · France");
      assert.deepEqual(
        (await diagnosticWine.locator(".diagnostic-wine-tags").innerText()).split("\n"),
        ["Rouge", "2018", "Bouteille"],
      );
      assert.equal(await diagnosticWine.locator(".diagnostic-quantity").innerText(), "2");
      assert.equal(await diagnosticWine.locator("ha-icon[icon='mdi:alert-circle']").count(), 1);
      assert.equal(await diagnosticWine.evaluate((element) => getComputedStyle(element).borderLeftColor), "rgb(150, 20, 30)");
      await diagnosticWine.click();
      await mainCard.locator("ploc-cellar-wine-detail").waitFor();
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-inventory-card", {}));
      const card = page.locator("ploc-cellar-inventory-card");
      const inventoryCount = await card.locator(".wine").count();
      await card.locator(".wine").filter({ hasText: "Château A" }).click();
      const detail = card.locator("ploc-cellar-wine-detail");
      await detail.waitFor();
      await detail.locator(".wine-stock-line").getByText("bottles in cellar", { exact: true }).waitFor();
      await detail.getByText("(4 in effective stock)", { exact: true }).waitFor();
      const heroAlert = detail.locator(".wine-hero-alert");
      await heroAlert.waitFor();
      assert.match(await heroAlert.getAttribute("aria-label"), /Unlocated bottles: 2.*Negative balance: 1 bottle\(s\)/);
      assert.equal(await heroAlert.locator("ha-icon[icon='mdi:alert-circle']").count(), 1);
      assert.equal(await heroAlert.evaluate((element) => getComputedStyle(element).position), "absolute");
      const hero = detail.locator(".wine-hero");
      assert.equal(await hero.evaluate((element) => getComputedStyle(element).position), "relative");
      const heroMainBefore = await detail.locator(".wine-hero-main").boundingBox();
      const scrollYBefore = await page.evaluate(() => window.scrollY);
      const stock = detail.locator(".stock-details");
      await stock.locator("summary").click();
      await stock.locator(".stock-issues[role='alert']").getByText("Unlocated bottles: 2 · Negative balance: 1 bottle(s)").waitFor();
      const errorValues = stock.locator(".characteristic-value.is-error");
      assert.equal(await errorValues.count(), 2);
      assert.deepEqual(await errorValues.allTextContents(), ["1", "2"]);
      for (const value of await errorValues.all()) {
        assert.equal(await value.evaluate((element) => getComputedStyle(element).color), "rgb(200, 0, 0)");
      }
      assert.equal(await stock.locator(".stock-issues ha-icon[icon='mdi:alert-circle']").count(), 1);
      assert.equal(await stock.evaluate((element) => element.classList.contains("has-inventory-issues")), true);
      const borderColor = await stock.evaluate((element) => getComputedStyle(element).borderTopColor);
      const alertColor = await stock.evaluate((element) => getComputedStyle(element).getPropertyValue("--error-color").trim());
      assert.equal(borderColor, alertColor);
      assert.equal(await card.locator(".wine").count(), inventoryCount);
      const heroMainAfter = await detail.locator(".wine-hero-main").boundingBox();
      const scrollYAfter = await page.evaluate(() => window.scrollY);
      assert.deepEqual(
        { ...heroMainAfter, y: heroMainAfter.y + scrollYAfter },
        { ...heroMainBefore, y: heroMainBefore.y + scrollYBefore },
      );
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });

  it("initializes charts and releases their resize observers when the card disconnects", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => window.mountPlocCard("ploc-cellar-card", {}));
      const chart = page.locator("ploc-cellar-card ploc-cellar-donut-chart").first();
      await chart.waitFor();
      await chart.locator("canvas").waitFor();
      const observed = await page.evaluate(() => window.__resizeObserverStats.observed);
      assert.ok(observed > 0, "ECharts should register a ResizeObserver");

      await page.evaluate(() => document.querySelector("#app").replaceChildren());
      await page.waitForFunction(() => window.__resizeObserverStats.disconnected > 0);
      const disconnected = await page.evaluate(() => window.__resizeObserverStats.disconnected);
      assert.ok(disconnected > 0, "chart disconnection should release its ResizeObserver");
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });
});


  it("announces loading state accessibly on all three cards", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      for (const tag of [
        "ploc-cellar-card",
        "ploc-cellar-inventory-card",
        "ploc-cellar-rack-card",
      ]) {
        await page.evaluate((cardTag) => {
          window.testHass.callWS = () => new Promise((resolve) => {
            window.__resolveInventory = resolve;
          });
          return window.mountPlocCard(cardTag, {});
        }, tag);

        const card = page.locator(tag);
        await card.locator('.loading[role="status"][aria-live="polite"]').waitFor();
        assert.equal(await card.locator("ha-card").getAttribute("aria-busy"), "true");

        await page.evaluate(() => {
          window.__resolveInventory({ response: window.__plocFixture.inventory });
        });
        await card.locator('.loading[role="status"]').waitFor({ state: "detached" });
        assert.equal(await card.locator("ha-card").getAttribute("aria-busy"), "false");
      }
      assert.deepEqual(pageErrors, []);
    } finally {
      await context.close();
    }
  });
