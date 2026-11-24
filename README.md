# nt.xdan.cc New Tab

A Chrome and Firefox extension that replaces the new tab page with [nt.xdan.cc](https://nt.xdan.cc), a clean, customisable Material 3 Expressive start page.

The extension's new tab page shows the live site in a full-size frame, so it always matches nt.xdan.cc. It requests no permissions and collects no data. The site keeps your settings in its own storage. Inside the extension, the browser may store them separately from settings saved when you visit nt.xdan.cc directly; use **Make it yours → Export / Import** to copy them across.

## Package

```bash
npm run package
```

This writes to `dist/`:

- `chrome/` and `nt-newtab-chrome-<version>.zip`
- `firefox/` and `nt-newtab-firefox-<version>.xpi`

Bump `version` in `src/manifest.json` before packaging a release.

## Install locally

**Chrome (and Chromium browsers such as Helium):** open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and choose `dist/chrome`. The `.zip` is for the Chrome Web Store.

**Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on…** and choose `dist/firefox/manifest.json`. Temporary add-ons are removed when Firefox restarts. To keep it installed, sign the `.xpi` through [addons.mozilla.org](https://addons.mozilla.org/developers/) (listed or unlisted), or use Firefox Developer Edition / Nightly with `xpinstall.signatures.required` set to `false`.

## Icons

The PNG icons come from `src/icons/icon.svg`, the nt.xdan.cc favicon. To regenerate them (needs Playwright):

```bash
npm run icons
```

## Notes

- nt.xdan.cc opens shortcuts and searches in the whole tab when it detects it's framed.
- The frame allows the microphone so the site's optional voice search works.
