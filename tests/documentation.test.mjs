import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("English and French backend contracts document the same critical inventory fields", async () => {
  const [english, french] = await Promise.all([
    read("docs/BACKEND_CONTRACT.md"),
    read("docs/CONTRAT_BACKEND.fr.md"),
  ]);

  for (const field of ["stale", "last_sync", "stocked_wines", "wine_references"]) {
    assert.ok(english.includes(`\`${field}\``), `English contract is missing ${field}`);
    assert.ok(french.includes(`\`${field}\``), `French contract is missing ${field}`);
  }
});

test("both frontend READMEs link the compatibility and release policy", async () => {
  const [english, french, policy] = await Promise.all([
    read("README.md"),
    read("README.fr.md"),
    read("docs/COMPATIBILITY_AND_RELEASES.md"),
  ]);

  assert.ok(english.includes("docs/COMPATIBILITY_AND_RELEASES.md"));
  assert.ok(policy.includes("| 0.8.0 development baseline | 0.1.0 development baseline |"));
  assert.ok(policy.includes("not a claim that corresponding GitHub Releases have been published"));
});

test("both backend contracts document the non-admin scoped sync command", async () => {
  const [english, french, readmeEnglish, readmeFrench] = await Promise.all([
    read("docs/BACKEND_CONTRACT.md"),
    read("docs/CONTRAT_BACKEND.fr.md"),
    read("README.md"),
    read("README.fr.md"),
  ]);

  for (const document of [english, french, readmeEnglish, readmeFrench]) {
    assert.ok(document.includes("ploc_cellar/subscribe_sync"));
    assert.ok(document.includes("non-admin") || document.includes("non administrateurs"));
  }
  assert.ok(english.includes("empty (`{}).")) === false;
  assert.ok(english.includes("empty (`{}).")) === false;
});
