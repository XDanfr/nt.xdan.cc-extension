// Builds the nt.xdan.cc page from the `site` submodule, combines it with the extension
// manifest and icons into dist/chrome and dist/firefox, then zips each.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const src = resolve(root, "src");
const site = resolve(root, "site");
const dist = resolve(root, "dist");
const run = (command, args, cwd) => execFileSync(command, args, { cwd, stdio: "inherit" });

if (!existsSync(resolve(site, "package.json"))) run("git", ["submodule", "update", "--init"], root);
if (!existsSync(resolve(site, "node_modules"))) run("npm", ["ci"], site);
run("npm", ["run", "build:extension"], site);
const page = resolve(site, "dist-extension");

const manifest = JSON.parse(readFileSync(resolve(src, "manifest.json"), "utf8"));
const { version } = manifest;
rmSync(dist, { recursive: true, force: true });

const targets = {
  // Chrome warns about Firefox-only keys, so they are left out of its build.
  chrome: { ext: "zip", manifest: { ...manifest, browser_specific_settings: undefined } },
  firefox: { ext: "xpi", manifest },
};

for (const [browser, target] of Object.entries(targets)) {
  const out = resolve(dist, browser);
  mkdirSync(out, { recursive: true });
  cpSync(page, out, { recursive: true });
  cpSync(resolve(src, "icons"), resolve(out, "icons"), { recursive: true, filter: (path) => !path.endsWith(".svg") });
  writeFileSync(resolve(out, "manifest.json"), `${JSON.stringify(target.manifest, null, 2)}\n`);
  const archive = resolve(dist, `nt-newtab-${browser}-${version}.${target.ext}`);
  execFileSync("zip", ["-qrX", archive, ".", "-x", "*.DS_Store"], { cwd: out });
  console.log(`${browser}: ${archive}`);
}
