// Builds dist/chrome and dist/firefox from src/, then zips each for loading or upload.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "src");
const dist = resolve(root, "dist");
const manifest = JSON.parse(readFileSync(resolve(src, "manifest.json"), "utf8"));
const { version } = manifest;

rmSync(dist, { recursive: true, force: true });

const targets = {
  // Chrome warns about Firefox-only keys, so they are left out of its build.
  chrome: { ...manifest, browser_specific_settings: undefined, ext: "zip" },
  firefox: { ...manifest, ext: "xpi" },
};

for (const [browser, { ext, ...targetManifest }] of Object.entries(targets)) {
  const out = resolve(dist, browser);
  mkdirSync(out, { recursive: true });
  cpSync(src, out, { recursive: true, filter: (path) => !path.endsWith(".svg") && !path.endsWith(".DS_Store") });
  writeFileSync(resolve(out, "manifest.json"), `${JSON.stringify(targetManifest, null, 2)}\n`);
  const archive = resolve(dist, `nt-newtab-${browser}-${version}.${ext}`);
  execFileSync("zip", ["-qrX", archive, "."], { cwd: out });
  console.log(`${browser}: ${archive}`);
}
