import assert from "node:assert/strict";
import test from "node:test";

import { WineImageLoader } from "../.test-dist/wine-image.js";

function response(blob = new Blob(["image"]), ok = true) {
  return { ok, blob: async () => blob };
}

function deferred() {
  let resolve;
  const promise = new Promise((res) => { resolve = res; });
  return { promise, resolve };
}

test("loads an authenticated image once and reuses the same path", async () => {
  const created = [];
  const changes = [];
  let requests = 0;
  const loader = new WineImageLoader(
    (blob) => { created.push(blob); return "blob:wine-1"; },
    () => assert.fail("unexpected URL revocation"),
  );
  const fetchImage = async (path) => {
    requests += 1;
    assert.equal(path, "/api/ploc_cellar/entry/images/document?v=one.jpg");
    return response();
  };

  await loader.load("/api/ploc_cellar/entry/images/document?v=one.jpg", fetchImage, (url) => changes.push(url));
  await loader.load("/api/ploc_cellar/entry/images/document?v=one.jpg", fetchImage, (url) => changes.push(url));

  assert.equal(requests, 1);
  assert.equal(created.length, 1);
  assert.deepEqual(changes, [null, "blob:wine-1"]);
});

test("missing paths and absent fetchers do not create object URLs", async () => {
  const changes = [];
  const loader = new WineImageLoader(() => "unexpected", () => {});

  await loader.load(null, async () => assert.fail("no path must not fetch"), (url) => changes.push(url));
  await loader.load("/image.jpg", undefined, (url) => changes.push(url));

  assert.deepEqual(changes, [null]);
});

test("HTTP errors are not retried on every host update", async () => {
  const revoked = [];
  const loader = new WineImageLoader(() => "blob:retry", (url) => revoked.push(url));
  const changes = [];
  let attempts = 0;
  const fetchImage = async () => {
    attempts += 1;
    return response(new Blob(), false);
  };

  await loader.load("/image.jpg", fetchImage, (url) => changes.push(url));
  await loader.load("/image.jpg", fetchImage, (url) => changes.push(url));
  await loader.load("/image.jpg", fetchImage, (url) => changes.push(url));

  assert.equal(attempts, 1);
  assert.deepEqual(changes, [null]);
  assert.deepEqual(revoked, []);
});

test("network errors are not retried on every host update", async () => {
  const loader = new WineImageLoader(() => "blob:network", () => {});
  let attempts = 0;

  const firstHostFetcher = async () => {
    attempts += 1;
    throw new Error("network unavailable");
  };
  const replacementHostFetcher = async () => {
    attempts += 1;
    return response();
  };

  await loader.load("/image.jpg", firstHostFetcher, () => {});
  await loader.load("/image.jpg", replacementHostFetcher, () => {});

  assert.equal(attempts, 1);
});

test("a path is fetched when Home Assistant becomes available after the detail mounts", async () => {
  const loader = new WineImageLoader(() => "blob:late-hass", () => {});
  const changes = [];

  await loader.load("/image.jpg", undefined, (url) => changes.push(url));
  await loader.load("/image.jpg", async () => response(), (url) => changes.push(url));

  assert.deepEqual(changes, [null, null, "blob:late-hass"]);
});

test("a failed request is not repeated when the Home Assistant object changes", async () => {
  const loader = new WineImageLoader(() => "blob:once", () => {});
  let requests = 0;
  const fetchImage = async () => {
    requests += 1;
    return response(new Blob(), false);
  };

  await loader.load("/image.jpg", fetchImage, () => {});
  await loader.load("/image.jpg", fetchImage, () => {});

  assert.equal(requests, 1);
});

test("replacing an image revokes the previous object URL", async () => {
  const revoked = [];
  let nextUrl = 0;
  const loader = new WineImageLoader(
    () => "blob:" + (++nextUrl),
    (url) => revoked.push(url),
  );
  const changes = [];
  const fetchImage = async () => response();

  await loader.load("/first.jpg", fetchImage, (url) => changes.push(url));
  await loader.load("/second.jpg", fetchImage, (url) => changes.push(url));

  assert.deepEqual(revoked, ["blob:1"]);
  assert.deepEqual(changes, [null, "blob:1", null, "blob:2"]);
});

test("a late response from an older wine cannot replace the current image", async () => {
  const first = deferred();
  const revoked = [];
  let created = 0;
  const loader = new WineImageLoader(
    () => "blob:" + (++created),
    (url) => revoked.push(url),
  );
  const changes = [];
  const firstRequest = loader.load("/wine-one.jpg", () => first.promise, (url) => changes.push(url));
  await loader.load("/wine-two.jpg", async () => response(), (url) => changes.push(url));
  first.resolve(response());
  await firstRequest;

  assert.equal(created, 1);
  assert.deepEqual(changes, [null, null, "blob:1"]);
  assert.deepEqual(revoked, []);
});

test("disconnect disposes the object URL and invalidates pending requests", async () => {
  const pending = deferred();
  const revoked = [];
  let created = 0;
  const loader = new WineImageLoader(
    () => "blob:" + (++created),
    (url) => revoked.push(url),
  );
  const changes = [];
  await loader.load("/loaded.jpg", async () => response(), (url) => changes.push(url));
  const pendingRequest = loader.load("/pending.jpg", () => pending.promise, (url) => changes.push(url));

  loader.dispose((url) => changes.push(url));
  pending.resolve(response());
  await pendingRequest;

  assert.deepEqual(revoked, ["blob:1"]);
  assert.equal(created, 1);
  assert.deepEqual(changes, [null, "blob:1", null, null]);
});

test("uses the browser object-URL APIs by default", async () => {
  const loader = new WineImageLoader();
  let objectUrl = null;

  await loader.load("/image.jpg", async () => response(), (url) => {
    objectUrl = url;
  });

  assert.equal(typeof objectUrl, "string");
  assert.match(objectUrl, /^blob:/);
  loader.dispose();
});
