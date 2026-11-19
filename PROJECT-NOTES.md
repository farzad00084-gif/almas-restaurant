# ALMAS — Project Notes

**Project:** Premium restaurant website for ALMAS, Aarau, Switzerland
**Current stage:** Stage 5 in progress — production app built locally; not deployable yet
**Last updated:** 2026-11-19
**Code status:** Next.js production app in `site/` builds and runs locally. Preview mode works in DE/EN and light/dark. The strict production content gate fails on known launch blockers. No CMS, Git repository, deployment or public URL yet.

---

## 1. Confirmed project facts (from client brief)

| Item | Confirmed information |
|---|---|
| Restaurant name | ALMAS |
| Address | Bahnhofstrasse 92, 5000 Aarau, Switzerland |
| Concept | Client brief describes an Afghan restaurant combining Afghan, Turkish and other offerings, including pizza and Turkish pide. The supplied menu has no separate Afghan dishes, so the prototype avoids Afghan positioning until confirmed (D-015). |
| Currency | CHF (Swiss francs) |
| Initial languages | Brief requested Swedish and English. Approved Stage 2 prototype languages: German and English. Swedish deferred to a later translation pass. |
| Creative direction | Contemporary Gastronomic Luxury |
| Primary layout principle | Full-bleed photography |
| Secondary layout principle | Editorial menu presentation |
| Brand meaning | ALMAS means "diamond" in Persian |
| Phone (from menu cover) | 062 797 50 00 |
| Existing identity | Gold serif ALMAS wordmark, red diamond inside an A, ornamental linework. No vector file supplied. |
| Menu source | Client-provided photographs of the printed menu, transcribed in `docs/content/menu-source.md` |
| Photography | No professional food or interior photography supplied. Client authorises licensed browser-sourced photography for the prototype. Real interior photography to be requested at Stage 5. No team photos required. |
| Ingredient photography | To be sourced by the agency |
| Logo direction | Client has no vector and gives the agency freedom to recreate/refine the identity |
| Preferred typefaces | Instrument Serif (headlines), DM Sans (body/UI), IBM Plex Mono (labels/metadata) |
| Light theme foundation | Mineral plum #30232F, Porcelain #EAE5DC, Pomegranate #9D454B, Oxidized silver #9CA5A3, Smoked limestone #D4B99A |
| Dark theme foundation | Obsidian #191719, Dark plum #30232F, Warm porcelain #EAE5DC, Pomegranate #9D454B, Muted silver #9CA5A3 |

The menu has been transcribed from the supplied photographs (see `docs/content/menu-source.md`). Prices and availability still require final verification. Opening hours, email, social links and ordering arrangements are **not confirmed** and must not be invented.

**Critical finding:** the supplied menu contains no separate Afghan dishes section. It is primarily a Turkish/Italian grill, kebab, pide and pizza menu. Afghan dishes must be confirmed separately; they will not be invented.

---

## 2. Pending client confirmation

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Existing logo / brand files | Resolved | No vector file. Client gives agency freedom to recreate/refine. Menu cover is the visual reference. |
| 2 | Real food photography | Resolved for prototype | None supplied. Licensed stock authorised for prototype; real menu photography required pre-launch. |
| 3 | Real interior / team / preparation photography | Partly resolved | No professional photos. Client-provided interior video exists. Professional interior photos to be requested at Stage 5. Team photos not required. |
| 4 | Accurate menu with categories, descriptions, prices | Transcribed | Source in `docs/content/menu-source.md`; client to verify before launch |
| 5 | Allergens / dietary labels | Pending | Only publish if verified |
| 6 | Phone, email, WhatsApp | Phone confirmed; rest pending | Phone: 062 797 50 00 |
| 7 | Instagram, Facebook, TikTok links | Partly resolved | Disabled placeholder buttons exist on the hybrid, menu and archive pages; real URLs still needed (D-023) |
| 8 | Opening hours, including holidays | Pending | Hours removed everywhere until the client supplies verified times (D-020) |
| 9 | Takeaway / delivery / reservations / online ordering | Pending | Must not build fake ordering |
| 10 | Existing website, domain, hosting, Google Business Profile | Pending | Need access/ownership details |
| 11 | Required languages beyond Swedish and English | Resolved for prototypes | German + English approved for the Stage 2 and Stage 3 prototypes; Swedish deferred to a proper translation pass |
| 12 | Verified restaurant story / history / owner details | Partly resolved | Generic brand copy approved for the prototype (D-022); verified history still pending |
| 13 | Signature dishes to feature on homepage | Confirmed for prototype | Grill Lamm Teller, Pizza Margherita and Baklava, all from the transcribed menu |
| 14 | Afghan dishes | Pending | Not on supplied menu; must be confirmed before any Afghan dish or positioning is added |
| 15 | Impressum / privacy policy details | Pending | Swiss legal requirements; needs legal name and responsible person |
| 16 | Approval contact and launch target | Pending | — |

---

## 3. Technical environment assessment

| Item | Finding |
|---|---|
| Project folder | `C:\Users\farza\Desktop\almas` |
| Folder contents | Research docs, transcribed menu, client source assets, licensed stock placeholders, Stage 3 prototypes, the Stage 4 production plan and the Stage 5 Next.js app in `site/` |
| Existing work at risk | None found at start |
| Operating system | Windows |
| Node.js | v24.13.0 — suitable |
| npm | 11.6.2 — suitable |
| Git | 2.43.0 — available |
| pnpm | Not installed — not required; npm is sufficient |
| Git repository | Not initialized yet — will be initialized at development stage |
| Internet access | Available for approved research and asset sourcing |

**Assessment:** The environment is ready for a modern Next.js project. The Stage 2 prototypes are plain HTML/CSS/JS and do not prescribe the production stack. Stage 4 recommends Next.js + TypeScript with the approved CSS system ported directly (D-028). The Stage 5 app now exists in `site/`, but it runs in preview mode only and must not be deployed until the content gates pass.

---

## 4. Decision log

| ID | Decision | Status |
|---|---|---|
| D-001 | Work strictly stage by stage; Stage 0 only for now | Active |
| D-002 | Never invent restaurant facts, prices, reviews, awards or claims | Active |
| D-003 | Use clearly marked temporary content only where necessary, and replace before launch | Active |
| D-004 | Inspect existing folder before writing anything | Complete — folder was empty |
| D-005 | Final technology stack to be proposed and approved in Stage 4 | Next.js stack implemented locally; CMS and hosting still pending client access/sign-off |
| D-006 | Use supplied menu items and prices; do not invent missing dishes | Active |
| D-007 | Recreate the existing ALMAS logo as a refined vector mark, preserving the A + diamond idea but removing gold gradients and ornate flourishes | Active |
| D-008 | Use licensed stock food and ingredient photography for the prototype; seek real photography before launch | Active |
| D-009 | Request professional interior photography from the client at Stage 5; use client video as temporary reference | Active |
| D-010 | No team photography required | Active |
| D-011 | Stage 1 research complete: 17 restaurant sites and 8 platforms documented in `docs/research/STAGE-1-RESEARCH.md` | Complete |
| D-012 | Approved "Facets" creative direction: dual Porcelain/Obsidian themes, diamond geometry, editorial menus, quiet premium | Approved 2026-11-16 |
| D-013 | Prototype languages are German + English; Swedish deferred to a proper translation pass | Active |
| D-014 | Placeholder story copy is generic brand writing only — no invented founding year, family history, Afghan claims or awards | Active |
| D-015 | Do not add Afghan dishes or "Afghan restaurant" positioning until confirmed | Active |
| D-016 | Each prototype stores its own light/dark preference; the shared menu follows the last homepage mode | Complete |
| D-017 | Menu page header linked to Porcelain, Obsidian and the shared menu while the direction was open | Superseded by D-019 |
| D-018 | Stage 2 prototypes built as plain HTML/CSS/JS for clickable review; no production stack or deployment | Complete |
| D-019 | Client chose a hybrid: Porcelain's editorial structure with Obsidian's full-bleed hero and diamond craft section; both modes retained | Approved 2026-11-17 |
| D-020 | Remove opening hours everywhere until the client supplies verified times; do not show provisional hours | Active |
| D-021 | Use only the 60 verified items from the transcribed printed menu; do not add or change items | Active |
| D-022 | Use approved generic story copy about "ALMAS Restaurant" and good food; no invented history or dates; use "ALMAS Restaurant" in titles and legal text | Active |
| D-023 | Add Instagram, Facebook and TikTok buttons now as clearly disabled placeholders; real URLs to follow | Active |
| D-024 | Keep the approved palette but add more light colour: porcelain hero info ribbon in both themes, always-light smoked-limestone origin section, and a porcelain footer for the hybrid and menu in light mode; dark mode keeps its obsidian footer | Implemented 2026-11-17 |
| D-025 | Light mode of the hybrid and menu approved by the client | Approved 2026-11-18 |
| D-026 | Add a full-bleed three-image gallery to the menu using the existing licensed placeholder stock (kebab/plate, pizza, baklava), clearly marked "Symbolbild"; keep the existing pide band and all 60 verified items | Implemented 2026-11-18 |
| D-027 | Treat Stage 4 as production planning, not production code; Stage 5 implementation begins only after plan, stack and content gates are signed off | Active 2026-11-18 |
| D-028 | Recommended production stack: Next.js App Router + TypeScript, with the approved CSS design system ported directly; no Tailwind rewrite | Implemented locally 2026-11-19 |
| D-029 | Recommended CMS: Sanity, with a small bilingual schema and hard production gates for verified prices and real photography | Proposed — blocked until Sanity account/project access |
| D-030 | Recommended hosting: Vercel EU region; Infomaniak as the fallback only if Swiss-only data residency is required | Proposed — no hosting account or deployment yet |
| D-031 | Privacy-first production posture: self-hosted fonts, click-to-load OpenStreetMap, cookie-free analytics and no advertising pixels | Self-hosted fonts and consent-gated map implemented locally; analytics not added |
| D-032 | Production routes: German default and English secondary, with localized slugs for the menu and legal pages | Implemented locally 2026-11-19 |
| D-033 | Build and review the Stage 5 production site locally, without a public deployment, until the strict content gate passes | Active 2026-11-19 |
| D-034 | Use the typed local JSON adapter in `site/src/content/` as the staging content source until a Sanity project exists; it remains the import format for the CMS | Active 2026-11-19 |
| D-035 | Preview builds must show unverified prices, stock images, draft legal copy and missing contact details exactly as marked; production builds must fail while any of these remain | Implemented 2026-11-19 |

---

## 5. Public information findings (unverified by client)

Collected from public sources on 2026-11-16. Treat as provisional until the client confirms.

| Item | Finding | Status |
|---|---|---|
| Google Maps listing | "Almas Restaurant", 5.0 (33 reviews), CHF 10–20 per person | Public, not client-confirmed |
| Phone | +41 62 797 50 00 | Matches menu |
| Address | Bahnhofstrasse 92, 5000 Aarau | Matches menu |
| Website field | `almasrestaurant.ch` | Domain unreachable: `ERR_CERT_COMMON_NAME_INVALID`; HTTP also failed |
| Opening status | "Open · Closes 10 PM" at time of research | Full weekly hours not captured |
| Service modes | Dine-in, drive-through, no-contact delivery | Public listing; needs confirmation |
| Ordering | Just Eat listing visible in search results | Page behind Cloudflare; not inspected |
| Legal name | "Almas Restaurant Inh. Jaddi" | Public commercial listing |
| Registered purpose | Snack/takeaway, on-site consumption, catering, delivery | Public commercial listing |

**Implication:** a coherent website is an immediate differentiator. Do not display the Google rating without permission and a verifiable source link.

---

## 6. Stage 1 research summary

Full document: `docs/research/STAGE-1-RESEARCH.md`

- 17 restaurant references inspected with screenshots and specific takeaways.
- 8 design platforms reviewed; Siteinspire blocked (403).
- Cross-cutting patterns: photography as the primary asset, sparse navigation, editorial menus, restrained motion, honest copy, art-directed mobile crops.
- Strategic tension identified: the brief says "gastronomic luxury", but the verified menu is a casual CHF 10–20 grill/takeaway offer. The site must be premium in craft, not deceptive in claims.
- Recommended and now approved direction: **Facets** — diamond geometry, Porcelain/Obsidian dual themes, Instrument Serif/DM Sans/IBM Plex Mono, full-bleed photography plus editorial menu (D-012).
- Alternatives considered: Obsidian Ember (too heavy), Porcelain Editorial (too light/café), Cultural Heritage (cliché and content risk). Facets chosen as the balance.

---

## 7. Stage 2 — Design prototypes (complete, archived)

**Status:** Review closed. The two Stage 2 homepages remain in the folder as reference while the hybrid becomes the primary direction.

The Stage 2 files are still present: `porcelain.html` and `obsidian.html` are the archived directions; `menu.html` remains the shared menu. The entry point `index.html` has since been replaced by the Stage 3 chooser.

### Files

| File | Purpose |
|---|---|
| `prototypes/index.html` | Stage 3 chooser (replaced the Stage 2 chooser) |
| `prototypes/porcelain.html` | Light editorial homepage (archive) |
| `prototypes/obsidian.html` | Dark cinematic homepage (archive) |
| `prototypes/menu.html` | Shared editorial menu |
| `prototypes/README.md` | Stage 3 guide: how to open, controls, content status, QA notes |
| `prototypes/assets/css/site.css` | Complete design system and responsive styles |
| `prototypes/assets/js/app.js` | Theme, language, mobile navigation, reveal, menu rendering, scroll spy |
| `prototypes/assets/js/menu-data.js` | 60 verified menu items across 6 categories, DE/EN |
| `docs/prototypes/` | 29 review screenshots with captions |
| `assets/stock/SOURCES.md` | Photographer, photo page and licence for every placeholder image |

### What is built

- Two complete homepage directions using the same brand system but different composition and mood.
- Shared menu page with sticky category navigation, editorial two-column lists and mobile single-column fallback.
- German and English throughout; light and dark mode on every page.
- Instrument Serif, DM Sans and IBM Plex Mono loaded from Google Fonts for the prototype.
- Refined A + diamond mark recreated as SVG; favicon included.
- Responsive mobile navigation, fixed quick-action bar, OpenStreetMap embed and accessible skip link.
- No team photography. No invented dishes, prices, history, awards, reviews or Afghan positioning.

### QA completed

- Checked in Chrome at 1440 × 1000 and 390 × 844.
- No console or page errors on the four pages; no horizontal overflow.
- Menu renders 6 categories and 60 items in both languages.
- Theme and language persist across pages; the shared menu follows the last homepage mode.
- Mobile overlay, keyboard Escape close and focus return work.
- OpenStreetMap embed loads; the ALMAS label no longer covers OSM attribution.
- Kebab placeholder re-cropped to remove third-party paper printing.
- Known prototype limitations are listed in `prototypes/README.md` (JS-rendered menu, external fonts/map, no legal pages).

### Open content questions before production

- Confirm every menu item, description and price.
- Confirm full weekly opening hours and holiday closures.
- Confirm takeaway/delivery/reservation/ordering arrangements.
- Confirm allergens and dietary information.
- Supply verified story/history and owner details.
- Confirm Afghan dishes, if any, and whether Afghan positioning should be used.
- Supply real food, interior and preparation photography.
- Provide email, Instagram, Facebook, TikTok, domain and hosting access.
- Provide Impressum and privacy-policy details.

---

## 8. Stage 3 — Hybrid direction (complete; light mode approved)

**Status:** Complete. The light-mode design was approved and the menu gallery was implemented on 18 November 2026. The client moved to Stage 4 production planning; nothing deployed.

### Client decisions applied

- Hybrid direction: Porcelain editorial structure, Obsidian full-bleed hero and diamond craft section (D-019).
- Opening hours removed from every page; no provisional times anywhere (D-020).
- Only the 60 verified menu items are used, unchanged (D-021).
- Approved generic story copy describes "ALMAS Restaurant" and good food; no invented history or dates (D-022).
- Instagram, Facebook and TikTok buttons added as clearly disabled placeholders; real URLs to follow (D-023).
- Light-colour refinement added without changing the palette: a porcelain hero info ribbon in both themes, a smoked-limestone origin section that stays light in dark mode, and a porcelain footer for the hybrid and menu in light mode (D-024). The client approved the light mode on 18 November 2026 (D-025).
- The menu opens with a full-bleed three-image gallery — kebab/plate, pizza and baklava — using existing stock placeholders, each marked "Symbolbild" / "Placeholder"; the pide band remains and no menu items were changed (D-026).

### Files

| File | Purpose |
|---|---|
| `prototypes/hybrid.html` | Primary homepage: fire hero, porcelain info bar, statement, diamond craft, three-dish preview, pide band, limestone origin, visit/map, porcelain footer in light mode |
| `prototypes/index.html` | Stage 3 chooser: hybrid light / hybrid dark, plus archive and menu links |
| `prototypes/menu.html` | Shared 60-item menu with hybrid navigation, three-image opening gallery, matching porcelain footer in light mode, and no hours |
| `prototypes/porcelain.html` | Archived Stage 2 light direction, hours removed, social footer added |
| `prototypes/obsidian.html` | Archived Stage 2 dark direction, hours removed, social footer added |
| `prototypes/assets/css/site.css` | Design system plus Stage 3 hybrid and social styles |
| `prototypes/assets/js/app.js` | Theme/language/menu behaviour, hybrid theme sync, pending-link guard |
| `docs/prototypes/stage-3/` | 23 final review screenshots and captions |

### What changed from Stage 2

- New full-bleed hybrid hero with the approved German/English headline "Grill. Teig. Gastfreundschaft." / "Grill. Dough. Hospitality."
- Info bar reduced to address and phone; opening hours removed everywhere.
- Generic statement copy and signature line replace the provisional history.
- Diamond craft section retained from Obsidian; editorial statements and menu preview follow Porcelain.
- Social placeholders use `data-pending-link` and `aria-disabled="true"` so they cannot navigate; a visible "Links folgen in Kürze." note marks them.
- Menu header now links to the hybrid and the menu; archive links live on the Stage 3 chooser.
- Sticky section labels are disabled inside the craft and visit copy columns and on mobile so they no longer slide over headings or buttons.
- Local asset references carry a `?v=` suffix for review-time caching (`site.css` is at `v=8`; `app.js` is at `v=4`; menu data at `v=3`).
- Stage markers and document titles now read "ALMAS Restaurant"; legal/footer copyright uses the same name.
- The light-colour refinement keeps the same six brand colours but adds light surfaces: the hero info ribbon is always porcelain, the origin section is always smoked limestone, and the hybrid/menu footer is porcelain in light mode (D-024).
- The menu now opens with a full-bleed triptych of placeholder food images (kebab/plate, pizza, baklava), followed by the existing pide band (D-026).
- The menu scroll-spy now scrolls the category bar horizontally instead of calling `scrollIntoView`, so the page no longer jumps past the menu hero on load.

### QA completed

- Checked in Chrome at 1440 × 1000 and 390 × 844.
- No console errors; no horizontal overflow on hybrid, menu or chooser.
- Hybrid renders 7 main sections; DE/EN switch updates the visible headline; theme toggle works.
- Mobile menu opens and closes with Escape; quick-action bar remains available.
- Menu renders 6 categories and 60 items; no hours text; theme follows the hybrid and persists.
- Menu gallery renders three images in light and dark mode, with all captions marked as placeholders; no horizontal overflow at 1440 or 390 px.
- Menu page opens at the true top on mobile; category links stay sticky, and the active category scrolls horizontally within the nav.
- Review links with `?theme=dark` or `?theme=light` now prime the shared menu too, so the menu header link opens in the same mode.
- Social placeholders are present (3 per page) and inert when clicked.
- Footer bottom row and social buttons visible at the true bottom of the page; no label overlap after the sticky-label fix.
- Light-footer matrix checked after CSS v7 and rechecked at v8: hybrid light and menu light use the porcelain footer; hybrid dark and menu dark keep the obsidian footer; the mobile light footer and quick bar remain legible.
- Light surfaces checked in both themes: porcelain hero info ribbon, limestone origin band, and no horizontal overflow.
- Local assets resolve; HTML tag balance, JS syntax and CSS braces checked.
- Screenshots: `docs/prototypes/stage-3/`.

### Open content still required before production

Detailed request with owners, priorities and an email template: `docs/production/CLIENT-CONTENT-REQUEST.md`.

- Confirm every menu item, description and price.
- Confirm full weekly opening hours and holiday closures.
- Confirm takeaway/delivery/reservation/ordering arrangements.
- Confirm allergens and dietary information.
- Supply verified story/history and owner details.
- Confirm Afghan positioning and any Afghan dishes.
- Supply real food, interior and preparation photography.
- Provide email, Instagram, Facebook, TikTok, domain and hosting access.
- Provide Impressum and privacy-policy details.
- Confirm the launch date, approval contact and account ownership.

---

## 9. Stage 4 — Production planning (complete, awaiting sign-off)

**Status:** Complete 18 November 2026. Planning only at that time. Local Stage 5 implementation began 19 November 2026 under D-033; no CMS workspace, repository or deployment has been created.

**Deliverables**

| File | Purpose |
|---|---|
| `docs/production/README.md` | Index and summary of the Stage 4 package |
| `docs/production/STAGE-4-PRODUCTION-PLAN.md` | Stack, architecture, content workflow, deployment, QA, timeline, budget and risks |
| `docs/production/CONTENT-MODEL.md` | CMS schema, validation rules and migration from the 60-item prototype data |
| `docs/production/LAUNCH-CHECKLIST.md` | Go/no-go checklist across content, design, accessibility, performance, SEO, legal, security and deployment |
| `docs/production/IMPLEMENTATION-BACKLOG.md` | Epic-by-epic Stage 5 backlog with estimates, acceptance criteria and critical path |
| `docs/production/CLIENT-CONTENT-REQUEST.md` | Prioritised client inputs, access requests and DE/EN email templates |

**Recommended production decisions**

- **Stack:** Next.js App Router + TypeScript; the approved CSS system is ported directly rather than rewritten (D-028).
- **CMS:** Sanity, with a small bilingual schema and hard gates for verified prices and real photography (D-029).
- **Hosting:** Vercel EU region; Infomaniak only if Swiss-only data residency becomes mandatory (D-030).
- **Privacy:** self-hosted fonts, click-to-load OpenStreetMap, cookie-free analytics and no advertising pixels (D-031).
- **Routes:** German default and English secondary, with localized slugs for the menu and legal pages (D-032).
- **No production code was written in Stage 4.** Local Stage 5 implementation began 19 November 2026 under D-033; client sign-off remains required for accounts and public launch.

**Stage 4 acceptance**

- [x] Stack, architecture, content model, deployment, QA and launch plan documented.
- [x] Remaining client inputs listed with priorities and blockers.
- [x] No production code, account, repository or deployment created.
- [ ] Client sign-off on the recommended stack/CMS/hosting and the content request. *(Local implementation proceeds under D-033; this remains required before accounts and public launch.)*

**Remaining gates before Stage 5**

1. Client approves the stack, CMS and hosting (or requests changes).
2. Client confirms a content owner and target launch date.
3. Domain/DNS access is available.
4. Verified menu and photography work has started.
5. Legal/privacy owner is named.

---

## 10. Stage 5 — Production implementation (in progress, local only)

**Status:** In progress 19 November 2026. The production app is built in `site/` and passes lint, type-check and the preview build. It runs locally only. No Git repository, CMS workspace, hosting, deployment or public URL exists.

### Implemented

| Area | Status |
|---|---|
| Stack | Next.js 16 App Router + TypeScript, React 19; approved CSS ported directly; no Tailwind |
| Fonts | Instrument Serif, DM Sans and IBM Plex Mono downloaded and self-hosted at build time via `next/font/google`; no visitor request to Google |
| Pages | Home, menu, imprint and privacy in DE/EN, branded 404 with HTTP 404 |
| Routing | `/de` default, `/en` secondary, localized menu/legal slugs, canonical redirects in `src/proxy.ts` |
| Components | Header, mobile menu with focus lock, footer, language switcher, theme toggle, quick bar, reveal, consent-gated OpenStreetMap, menu scroll-spy |
| Content | Typed JSON adapter: 6 categories, exactly 60 items, bilingual copy and legal draft copy |
| Content gate | Preview validation (warnings) and strict production gate (failures) in `scripts/validate-content.mjs` |
| Build | Preview build and `build:production`, which requires production env vars and a passing gate |
| SEO | Per-page metadata, canonical/hreflang, Restaurant JSON-LD without hours or ratings, sitemap, robots, manifest, SVG favicon |
| Privacy | Self-hosted fonts, click-to-load map, no ad pixels; preview builds are `noindex` |
| Security | `nosniff`, referrer policy, frame options, permissions policy, no `X-Powered-By` |

### QA completed

- `npm run lint`, `npm run typecheck` and `npm run build` pass.
- Preview content validation: 3 passed, 7 expected warnings, 0 failures.
- Strict validation fails by design on 8 launch blockers.
- `npm audit`: 0 vulnerabilities in production and development dependencies.
- Headless Chrome at 1440×1000 and 390×844 in DE/EN and light/dark: no horizontal overflow, no unexpected console errors, all seven images load.
- Verified interactions: theme toggle and persistence, language switching, mobile menu open/close and focus lock, consent-gated map, localized redirects, 404 status, manifest/robots/sitemap and favicon.
- Visual comparison against `prototypes/hybrid.html` confirms the approved hybrid is preserved.

QA screenshots and the report are in the local workspace at
`C:\Users\farza\AppData\Local\Temp\opencode\almas-qa\shots2` (outside the repository).

### Strict-gate launch blockers

1. All 60 menu prices are unverified.
2. All 7 images are stock placeholders.
3. No verified email address.
4. No verified opening hours.
5. Legal copy still contains draft markers.
6. No final production domain (`NEXT_PUBLIC_SITE_URL`).
7. Production content mode not set.
8. Indexing not enabled.

Unverified social links are hidden by the footer, so no disabled buttons exist in the production markup.

### Not started or blocked

- Sanity Studio and dataset (no account/project).
- Git repository, CI and hosting/DNS (no client-owned accounts).
- Real photography and final OG image.
- Verified menu, hours, email, social links and ordering details.
- Final Impressum/privacy review.
- Full axe/Lighthouse CI and screen-reader pass.
- Analytics decision and monitoring.

### Next steps

1. Client reviews the local preview (`cd site && npm run dev`) and the Stage 5 backlog.
2. Client supplies verified content, photography and legal details from `docs/production/CLIENT-CONTENT-REQUEST.md`.
3. When Sanity access exists, create the schema/Studio, import the 60 items and switch the adapter.
4. When account ownership is agreed, initialise Git, CI and a private preview deployment.
5. Re-run the strict gate; deploy only after every “Must” item in `docs/production/LAUNCH-CHECKLIST.md` passes.

---

## 11. Next stage

**Stage 5 completion and client review.** Finish the remaining backlog items that do not depend on client inputs, then pause for content, photography, legal and account access. Public launch remains blocked until the strict content gate passes. Do not deploy.
