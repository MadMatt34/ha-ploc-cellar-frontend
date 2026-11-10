import { statSync } from "node:fs";
import { resolve } from "node:path";

const MAX_BUNDLE_SIZE_BYTES = 800_000;
const bundlePath = resolve(process.argv[2] ?? "dist/ploc-cellar-card.js");

let bundleSize;
try {
  bundleSize = statSync(bundlePath).size;
} catch (error) {
  console.error(`Unable to read production bundle at ${bundlePath}: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

if (bundleSize !== undefined) {
  const sizeLabel = `${bundleSize.toLocaleString("en-US")} bytes`;
  const limitLabel = `${MAX_BUNDLE_SIZE_BYTES.toLocaleString("en-US")} bytes`;
  if (bundleSize > MAX_BUNDLE_SIZE_BYTES) {
    console.error(`Production bundle is too large: ${sizeLabel} (limit: ${limitLabel}).`);
    process.exitCode = 1;
  } else {
    console.log(`Production bundle size: ${sizeLabel} / ${limitLabel}.`);
  }
}
