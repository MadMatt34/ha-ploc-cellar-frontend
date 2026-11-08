import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const english = JSON.parse(
  await readFile(new URL("../src/translations/en.json", import.meta.url), "utf8"),
);
const french = JSON.parse(
  await readFile(new URL("../src/translations/fr.json", import.meta.url), "utf8"),
);

test("English and French dictionaries expose exactly the same keys", () => {
  assert.deepEqual(
    Object.keys(french).sort(),
    Object.keys(english).sort(),
  );
});

test("all translations are non-empty strings", () => {
  for (const [language, dictionary] of Object.entries({ english, french })) {
    for (const [key, value] of Object.entries(dictionary)) {
      assert.equal(typeof value, "string", `${language}.${key} must be a string`);
      assert.notEqual(value.trim(), "", `${language}.${key} must not be empty`);
    }
  }
});
