# ALMAS — Stage 3 Hybrid Prototype

One chosen homepage direction in two modes, plus the shared editorial menu, for ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau.

**This is design work, not production code.** Nothing here is published. Prices, story copy, photography and social links still require client confirmation.

---

## Open the prototype

From the project root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

- **Stage 3 entry point:** http://127.0.0.1:4173/prototypes/index.html
- **Hybrid, light:** http://127.0.0.1:4173/prototypes/hybrid.html
- **Hybrid, dark:** http://127.0.0.1:4173/prototypes/hybrid.html?theme=dark
- **Menu:** http://127.0.0.1:4173/prototypes/menu.html
- **Menu, dark and English:** http://127.0.0.1:4173/prototypes/menu.html?lang=en&theme=dark

Opening `prototypes/index.html` directly from disk also works in most browsers, but a local server is recommended so fonts and the map behave consistently. Internet access is needed for Google Fonts and the OpenStreetMap embed; all restaurant content and images are local.

---

## What each page contains

| Page | Purpose |
|---|---|
| `index.html` | Stage 3 entry point. Opens the hybrid in light or dark mode and links the archive and menu. |
| `hybrid.html` | The chosen direction. Full-bleed fire hero, porcelain info bar, generic brand statement, diamond craft section, three-dish preview, pide band, limestone origin, visit/map, porcelain footer in light mode with social placeholders. |
| `menu.html` | Shared editorial menu. Six categories, 60 verified items, three-image opening gallery, sticky category navigation, pide band, contact CTA, matching porcelain social footer in light mode. |
| `porcelain.html` | Archived Stage 2 light direction. Kept for reference. |
| `obsidian.html` | Archived Stage 2 dark direction. Kept for reference. |

The hybrid defaults to light. It supports German/English and light/dark, and the menu follows the last homepage mode.

---

## Controls

- **DE / EN** in the header or footer switches the whole page. The preference is stored and carries across pages.
- **Sun / moon icon** switches light/dark. Each prototype remembers its own preferred mode.
- The shared menu follows the mode of the last hybrid/archive page visited. It can also be opened directly with `?theme=light` or `?theme=dark`.
- Language can be forced with `?lang=de` or `?lang=en`.
- On mobile, navigation, language and theme controls are inside the menu overlay.
- Local CSS/JS references carry a `?v=` suffix for cache-busting during review. Bump it after asset edits.

---

## Verified content vs temporary content

**From the client's printed menu photographs** (transcribed in `../docs/content/menu-source.md`):
- All 60 menu items, descriptions and prices.
- Meat-origin statements (chicken, lamb, beef/veal, charcuterie, fish/prawns).
- Address and phone number.

**Temporary, clearly marked in the page:**
- Homepage story copy is approved generic brand copy. It is not a verified history.
- All food photography is licensed Unsplash stock, not ALMAS food. See `../assets/stock/SOURCES.md`.
- The menu's three-image opening gallery uses existing stock placeholders (kebab/plate, pizza, baklava), each marked "Symbolbild" / "Placeholder". The pide band is also a placeholder.
- Social buttons are disabled placeholders until the client supplies Instagram, Facebook and TikTok URLs.
- The map shows the confirmed street address through OpenStreetMap.

**Deliberately absent:**
- Opening hours. No verified hours have been supplied, so none are shown anywhere.
- Afghan dishes or an "Afghan restaurant" positioning. None appear on the supplied menu.
- Allergens or dietary labels.
- Email address, reservations, online ordering or delivery integration.
- Reviews, awards, founding year, family history or owner claims.
- Impressum, privacy policy or cookie consent.

---

## Design system used

- **Display:** Instrument Serif
- **Body/UI:** DM Sans
- **Labels/metadata:** IBM Plex Mono
- **Light:** Porcelain `#EAE5DC`, mineral plum `#30232F`, pomegranate `#9D454B`, oxidized silver `#9CA5A3`, smoked limestone `#D4B99A`
- **Dark:** Obsidian `#191719`, warm porcelain `#EAE5DC`, dark accent `#D08388`
- **Light surfaces added in the refinement:** porcelain hero info ribbon, smoked-limestone origin band in both themes, and a porcelain hybrid/menu footer in light mode. Dark mode keeps its obsidian footer.
- Geometry: diamond / facet motif, thin rules, editorial numbering, restrained motion.
- Menu imagery: full-bleed three-image opening gallery (kebab/plate, pizza, baklava) with mono placeholder captions, plus the existing pide band.
- No gradients, glass effects, gold luxury styling, repeated card grids or team photography.

All CSS is in `assets/css/site.css` (`?v=8`); behaviour is in `assets/js/app.js` (`?v=4`); menu data is in `assets/js/menu-data.js` (`?v=3`).

---

## QA status (18 November 2026)

Checked in Chrome at 1440 × 1000 desktop and 390 × 844 mobile:

- No console or page errors on the hybrid, menu, chooser or archived pages.
- No horizontal overflow at either size.
- Hybrid: seven main sections; DE/EN switch updates the visible headline; theme toggle works; mobile menu opens/closes with Escape.
- Menu renders 6 categories and 60 items in both languages.
- Menu gallery renders three images in light and dark mode, each captioned "Symbolbild" / "Placeholder"; gallery is 3-up on desktop and stacked on mobile with no horizontal overflow.
- Menu page opens at the true top on mobile (no auto-scroll past the hero); the sticky category bar tracks the active section and scrolls the active tab horizontally within the nav rather than moving the page.
- Theme and language preferences persist across pages; the menu follows the hybrid's mode, including review links with `?theme=dark` or `?theme=light`.
- Social placeholders are inert (`data-pending-link`, `aria-disabled="true"`) and cannot navigate.
- Light-colour matrix checked after CSS v7 and rechecked at v8: hybrid light and menu light show the porcelain footer; hybrid dark and menu dark keep the obsidian footer; mobile light footer is legible above the quick bar.
- Hero info ribbon and limestone origin band stay light in both themes, with no horizontal overflow.
- The sticky section labels no longer overlap the craft or visit copy at the end of a section.
- The OpenStreetMap embed loads; the map label does not cover the attribution.
- Review screenshots: `../docs/prototypes/stage-3/`.

**Known prototype limitations:** JavaScript is required to render the menu; a production build should provide a rendered fallback. External Google Fonts and the OpenStreetMap iframe require a privacy/consent review before launch.

---

## Next step

Stage 3 is complete and the light mode is approved. Stage 4 production planning is documented in `../docs/production/` — stack, CMS, deployment, QA and launch plan. The production build (Stage 5) starts after client sign-off on that plan and on the content request. No production development or deployment has started.
