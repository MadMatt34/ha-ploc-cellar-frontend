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

      await colorFilter.selectOption("all");
      await card.locator(".sort-row select").selectOption("name-desc");
      const names = await card.locator(".wine-name").allTextContents();
      assert.deepEqual(names, ["Vin inconnu", "Domaine B", "Château A"]);
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
      assert.match(await selected.innerText(), /row\s*1.*column\s*1/i);
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

  it("surfaces a WebSocket error and recovers after a manual refresh", async () => {
    const { context, page, pageErrors } = await openFixture();
    try {
      await page.evaluate(() => {
        window.__plocFixture.fail = true;
        return window.mountPlocCard("ploc-cellar-inventory-card", {});
      });
      const card = page.locator("ploc-cellar-inventory-card");
      await card.locator(".error").getByText("Fixture WebSocket failure").waitFor();
      await page.evaluate(() => { window.__plocFixture.fail = false; });
      await card.getByRole("button", { name: "Refresh" }).click();
      await card.locator(".wine").first().waitFor();
      assert.equal(await card.locator(".error").count(), 0);
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
