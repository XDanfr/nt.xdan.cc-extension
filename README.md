# nt.xdan.cc New Tab

A Chrome and Firefox extension that replaces the new tab page with [nt.xdan.cc](https://nt.xdan.cc), a clean, customisable Material 3 Expressive start page.

The page is bundled into the extension from the [nt.xdan.cc repo](https://github.com/XDanfr/nt.xdan.cc) (the `site` submodule), so it opens instantly and works offline. Offline, shortcut icons fall back to letters, and anything that needs the internet (searching, suggestions, fonts other than Outfit) waits until you're back online.

It collects no data and asks for no permissions at install. Turning on search suggestions asks for access to `suggestqueries.google.com`, which receives what you type. Settings are stored by the extension, separately from nt.xdan.cc in the browser; use **Make it yours → Export / Import** to copy them across.

## Package

```bash
git clone --recurse-submodules https://github.com/XDanfr/nt.xdan.cc-extension.git
cd nt.xdan.cc-extension
npm run package
```

The script builds the page from `site/` (installing its dependencies the first time), adds the manifest and icons, and writes to `dist/`:

- `chrome/` and `nt-newtab-chrome-<version>.zip`
- `firefox/` and `nt-newtab-firefox-<version>.xpi`

To ship a newer version of the page, update the submodule and bump `version` in `src/manifest.json`:

```bash
git submodule update --remote site
```

## Install locally

**Chrome (and Chromium browsers such as Helium):** open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and choose `dist/chrome`. The `.zip` is for the Chrome Web Store.

**Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on…** and choose `dist/firefox/manifest.json`. Temporary add-ons are removed when Firefox restarts. To keep it installed, sign the `.xpi` through [addons.mozilla.org](https://addons.mozilla.org/developers/) (listed or unlisted), or use Firefox Developer Edition / Nightly with `xpinstall.signatures.required` set to `false`.

## Icons

The PNG icons come from `src/icons/icon.svg`, the nt.xdan.cc favicon. To regenerate them (needs Playwright):

```bash
npm run icons
```
