# Production Content Model

**Project:** ALMAS Restaurant, Aarau
**Stage:** 4 — Production planning
**Status:** Proposed schema for Stage 5
**Companion:** [`STAGE-4-PRODUCTION-PLAN.md`](./STAGE-4-PRODUCTION-PLAN.md)

This document defines the production content model, validation rules and migration path from the Stage 3 prototype. It is deliberately small: the client edits facts, menu items and images, not layout.

---

## 1. Principles

1. **One source of truth.** Menu items, prices, hours, contact details and social links live in the CMS, not in page code.
2. **Both languages are content.** German and English are stored together on the same document so they cannot drift apart.
3. **Facts are explicit.** A price can be marked “verified” only after ALMAS confirms it. Unverified prices cannot reach production.
4. **Placeholders are visible.** Every temporary image carries a flag, a credit and a licence. The production build refuses to include them.
5. **Layout is not content.** Editors cannot add arbitrary sections, colours or fonts. The approved design is fixed in code.
6. **The printed menu is the audit trail.** `docs/content/menu-source.md` remains the reference for every item, description and price.
7. **No inferred data.** If the source does not say it, the field stays empty. This applies to allergens, dietary labels, sizes, hours, history, ratings and awards.

---

## 2. Localization model

- Locales: `de` (default) and `en`.
- Every user-visible string is a localized object: `{ "de": "…", "en": "…" }`.
- Both fields are required at publish time.
- Dish names follow the printed menu. English names follow the existing English transcription unless ALMAS approves a change.
- Prices, phone numbers, addresses and URLs are language-neutral and stored once.
- UI labels live in translation files, not in the CMS.
- `hreflang` pairs: `de-CH` and `en`; `x-default` points to German.
- Swedish is out of scope for launch; the model can add `sv` later without restructuring.

---

## 3. Content types

### 3.1 `siteSettings` — singleton

Global identity, contact and configuration.

| Field | Type | Required | Notes |
|---|---|---|---|
| `restaurantName` | string | yes | `ALMAS` for the wordmark |
| `legalName` | string | launch | Exact legal entity; do not guess |
| `phone` | string | yes | `062 797 50 00` |
| `phoneHref` | string | yes | `+41627975000` |
| `email` | string | launch | Must be supplied and verified |
| `address.street` | string | yes | `Bahnhofstrasse 92` |
| `address.postalCode` | string | yes | `5000` |
| `address.city` | string | yes | `Aarau` |
| `address.country` | string | yes | `CH` |
| `geo.lat` / `geo.lng` | number | yes | `47.3924916`, `8.0532436` |
| `social.instagram` | url or null | launch | Only when verified |
| `social.facebook` | url or null | launch | Only when verified |
| `social.tiktok` | url or null | launch | Only when verified |
| `hours` | array or null | no | `null` until verified; then seven days plus holiday notes |
| `defaultLocale` | `de` | yes | Fixed |
| `locales` | array | yes | `["de", "en"]` |
| `defaultTheme` | `light` | yes | Approved default |
| `seo.title` | localized string | yes | Default title template |
| `seo.description` | localized text | yes | Default description |
| `seo.ogImage` | image | yes | Approved social image |
| `analytics.provider` | `vercel` / `plausible` / `null` | launch | No ad trackers |
| `legal.imprint` | reference | launch | Link to the Impressum document |
| `legal.privacy` | reference | launch | Link to the privacy document |
| `map.consentRequired` | boolean | yes | `true` |
| `map.label` | localized string | yes | “Karte laden” / “Load map” |

`hours` shape when it exists:

```json
[
  { "day": "monday", "opens": "11:00", "closes": "22:00", "note": null },
  { "day": "tuesday", "opens": "11:00", "closes": "22:00", "note": null }
]
```

Do not populate this until ALMAS supplies the full week and holiday closures. A partial week is not publishable.

### 3.2 `homePage` — singleton

Fixed fields for the approved hybrid. Editors change copy and images, not the section order.

| Field | Type | Required | Notes |
|---|---|---|---|
| `hero.eyebrow` | localized string | yes | Current: `ALMAS · Aarau` |
| `hero.headline` | localized rich text | yes | Approved headline; serif italic accents allowed |
| `hero.subhead` | localized text | yes | Approved generic copy |
| `hero.primaryCta` | link | yes | Menu |
| `hero.secondaryCta` | link | yes | Visit / call |
| `hero.image` | media | yes | Real photography at launch |
| `hero.credit` | localized string or null | no | Photographer credit if required |
| `infoRibbon.address` | localized string | yes | Address |
| `infoRibbon.phone` | string | yes | Phone |
| `statement.eyebrow` | localized string | yes | — |
| `statement.headline` | localized rich text | yes | — |
| `statement.body` | localized rich text | yes | Generic brand copy only |
| `statement.signature` | localized string | no | — |
| `craft.eyebrow` | localized string | yes | — |
| `craft.headline` | localized rich text | yes | — |
| `craft.body` | localized rich text | yes | — |
| `craft.image` | media | yes | Real photography at launch |
| `craft.steps` | array | yes | Three short steps, each with localized title/body |
| `menuPreview.eyebrow` | localized string | yes | — |
| `menuPreview.headline` | localized rich text | yes | — |
| `menuPreview.intro` | localized text | yes | — |
| `menuPreview.items` | array of references | yes | Exactly three available menu items |
| `menuPreview.cta` | link | yes | Menu |
| `pideBand.image` | media | yes | Real photography at launch |
| `pideBand.caption` | localized string | yes | Placeholder caption only in preview |
| `origin.eyebrow` | localized string | yes | — |
| `origin.headline` | localized rich text | yes | — |
| `origin.body` | localized rich text | yes | No invented sourcing claims |
| `origin.facts` | array | no | Only verified facts |
| `visit.eyebrow` | localized string | yes | — |
| `visit.headline` | localized rich text | yes | — |
| `visit.body` | localized rich text | no | — |
| `visit.map` | map config | yes | Consent-gated |
| `seo` | object | yes | Title, description, OG image |

### 3.3 `menuPage` — singleton

| Field | Type | Required | Notes |
|---|---|---|---|
| `hero.eyebrow` | localized string | yes | `ALMAS · Speisekarte` / `ALMAS · Menu` |
| `hero.headline` | localized rich text | yes | `Speisekarte` / `The menu` |
| `hero.intro` | localized text | yes | Current approved intro |
| `hero.note` | localized string | no | “Preise in CHF” etc., only if confirmed |
| `gallery` | array of 3 media | yes | Exactly three images |
| `gallery[].caption` | localized string | yes | “Symbolbild · …” in preview; real caption at launch |
| `gallery[].isPlaceholder` | boolean | yes | Blocks production while true |
| `cta.eyebrow` | localized string | yes | — |
| `cta.headline` | localized rich text | yes | — |
| `cta.body` | localized text | yes | — |
| `cta.primary` | link | yes | Call |
| `cta.secondary` | link | yes | Visit |
| `seo` | object | yes | Title, description, OG image |

Categories are separate documents, ordered by `order`. The menu page renders all published categories.

### 3.4 `menuCategory` — collection

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | slug | yes | `teller`, `pizza`, `pide`, `lahmacun`, `snacks`, `box` |
| `order` | number | yes | 1–6 |
| `title` | localized string | yes | e.g. `Teller` / `Plates` |
| `note` | localized text or null | no | Category-wide note, e.g. pizza dough/size |
| `footnote` | localized text or null | no | Meat-origin or supplier note |
| `items` | array of `menuItem` | yes | Ordered |

**Launch categories and counts**

| Order | Slug | German | English | Items |
|---|---|---|---|---|
| 1 | `teller` | Teller | Plates | 9 |
| 2 | `pizza` | Pizza | Pizza | 17 |
| 3 | `pide` | Pide | Pide | 4 |
| 4 | `lahmacun` | Lahmacun | Lahmacun | 2 |
| 5 | `snacks` | Snacks | Snacks | 13 |
| 6 | `box` | Box · Salat · Dessert | Box · Salad · Dessert | 15 |
| | | | **Total** | **60** |

### 3.5 `menuItem` — object inside a category

| Field | Type | Required | Notes |
|---|---|---|---|
| `_key` | string | yes | Stable key, e.g. `kebab-teller` |
| `name` | localized string | yes | As printed |
| `description` | localized text or null | no | As printed; do not add ingredients |
| `priceDisplay` | string | yes | Exactly as printed, e.g. `17.00` or `12.00 / 10.00` |
| `priceNumeric` | integer or null | no | Cents, only when the price is unambiguous |
| `priceVerified` | boolean | yes | `false` until ALMAS confirms |
| `familyPriceDisplay` | string or null | no | Pizza family price, e.g. `24.00` |
| `familyLabel` | localized string or null | no | e.g. `40 cm` |
| `available` | boolean | yes | Default `true`; only change on confirmed availability |
| `allergens` | array or null | no | Only verified allergens |
| `dietary` | array or null | no | Only verified labels |
| `image` | media or null | no | Real dish photo only; never a stock stand-in |
| `order` | number | yes | Position within the category |

**Price rules**

- `priceDisplay` is the source of truth and is rendered exactly.
- `priceNumeric` is used only for structured data and sorting; derive it only when `priceDisplay` is a single amount.
- Ambiguous printed prices (e.g. `12.00 / 10.00`) keep `priceNumeric: null` until ALMAS explains the size mapping.
- `priceVerified: false` blocks production.
- Do not add currency symbols in the database; the UI formats `CHF` consistently.
- Do not add delivery, takeaway or surcharge language unless confirmed.

**Example: single price**

```json
{
  "_key": "kebab-teller",
  "name": { "de": "Kebab Teller", "en": "Kebab plate" },
  "description": { "de": "Mit Pommes Frites und Salat.", "en": "With fries and salad." },
  "priceDisplay": "17.00",
  "priceNumeric": 1700,
  "priceVerified": false,
  "familyPriceDisplay": null,
  "familyLabel": null,
  "available": true,
  "allergens": null,
  "dietary": null,
  "image": null,
  "order": 1
}
```

**Example: pizza with family size**

```json
{
  "_key": "pizza-margherita",
  "name": { "de": "Pizza Margherita", "en": "Pizza Margherita" },
  "description": null,
  "priceDisplay": "14.00",
  "priceNumeric": 1400,
  "priceVerified": false,
  "familyPriceDisplay": "24.00",
  "familyLabel": { "de": "40 cm", "en": "40 cm" },
  "available": true,
  "allergens": null,
  "dietary": null,
  "image": null,
  "order": 1
}
```

**Example: ambiguous printed price**

```json
{
  "_key": "doner-box",
  "name": { "de": "Döner Box", "en": "Döner box" },
  "description": { "de": "Klein.", "en": "Small." },
  "priceDisplay": "12.00 / 10.00",
  "priceNumeric": null,
  "priceVerified": false,
  "familyPriceDisplay": null,
  "familyLabel": null,
  "available": true,
  "allergens": null,
  "dietary": null,
  "image": null,
  "order": 1
}
```

### 3.6 `legalPage` — collection

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | localized slug | yes | `impressum` / `imprint`, `datenschutz` / `privacy` |
| `title` | localized string | yes | — |
| `lastUpdated` | date | yes | Visible on the page |
| `intro` | localized rich text | no | — |
| `sections` | array of portable text blocks | yes | Headings, paragraphs, lists, links |
| `contact` | object | yes | Legal name, address, email, phone |
| `seo` | object | yes | Noindex? No — legal pages should be indexable |

Legal copy must be reviewed by a qualified Swiss advisor. The CMS stores it; it does not generate it.

### 3.7 `mediaAsset` — object

| Field | Type | Required | Notes |
|---|---|---|---|
| `image` | Sanity image | yes | Hotspot and crop enabled |
| `alt` | localized string | yes | Describe the subject, not the dish name alone |
| `credit` | string or null | no | Photographer/agency |
| `licence` | string or null | no | Required for stock |
| `sourceUrl` | url or null | no | Required for stock |
| `isPlaceholder` | boolean | yes | Blocks production while true |
| `replaceBy` | date or null | no | Internal reminder |
| `usage` | array | no | `hero`, `gallery`, `menu`, `origin`, `social` |

No image may be published without `alt` in both languages. Decorative images use `alt: { de: "", en: "" }` and are marked decorative in code.

### 3.8 `redirect` — optional collection

Only if an existing site or legacy URLs are discovered.

| Field | Type | Required |
|---|---|---|
| `from` | path | yes |
| `to` | path | yes |
| `statusCode` | 301 / 302 | yes |
| `note` | string | no |

---

## 4. Validation rules

| Rule | Enforcement |
|---|---|
| Both `de` and `en` present for every user-visible string | Sanity validation + build check |
| `priceDisplay` matches `/^\d+\.\d{2}( \/ \d+\.\d{2})?$/` | Sanity validation |
| Exactly 6 categories at launch | Build check against `menuVersion` |
| Exactly 60 items at launch | Build check against `menuVersion` |
| No duplicate `_key` or slug | Sanity + build check |
| Every item has a category and an order | Sanity validation |
| `priceVerified` true for every item | Production build gate |
| No `isPlaceholder` true | Production build gate |
| No social URL without `verified` | Sanity validation |
| Hours null or complete | Custom validation |
| Legal pages have legal name, responsible person and contact | Publish validation |
| SEO title ≤ 60 characters; description ≤ 160 | Sanity warning + build check |
| No empty links, `href="#"` or placeholder phone/email | Build check |
| No stock image presented as an ALMAS dish | Editorial review + placeholder flag |
| No invented allergens, dietary labels, awards or ratings | Editorial review |

**Build environment**

```
REQUIRE_VERIFIED_CONTENT=true
```

When true, the production build fails on:

- unverified prices;
- placeholder images;
- missing translations;
- missing legal pages;
- missing social URLs marked as required;
- missing hours if the page renders an hours block.

Preview builds set it to `false` so the team can review unfinished content.

---

## 5. Migration from the Stage 3 prototype

### 5.1 Source

`prototypes/assets/js/menu-data.js` contains 6 categories and 60 items. `docs/content/menu-source.md` is the transcribed printed menu and the audit reference.

### 5.2 Mapping

| Prototype field | Production field | Transformation |
|---|---|---|
| `id` | `menuCategory.slug` | Keep as-is |
| `title` | `menuCategory.title` | Keep both languages |
| `note` | `menuCategory.note` | Keep both languages |
| `source` | `menuCategory.footnote` | Keep both languages |
| array index | `menuCategory.order` | 1-based |
| `items[].name` | `menuItem.name` | Keep both languages |
| `items[].desc` | `menuItem.description` | Keep both languages |
| `items[].price` | `menuItem.priceDisplay` | Keep exactly; derive `priceNumeric` only for single amounts |
| `items[].family` | `menuItem.familyPriceDisplay` | Keep exactly |
| item index | `menuItem.order` | 1-based |
| — | `menuItem._key` | Slugify the English name; ensure uniqueness |
| — | `menuItem.priceVerified` | `false` |
| — | `menuItem.available` | `true` |
| — | `menuItem.image` | `null` |

### 5.3 Import steps

1. Export the Sanity dataset schema and create a `production` dataset in the EU region.
2. Run `scripts/import-menu.ts` to produce NDJSON.
3. Validate: 6 categories, 60 items, no duplicate keys, no empty names, price format valid.
4. Import into a staging dataset first.
5. Render the staging menu and compare every item with `docs/content/menu-source.md`.
6. Have ALMAS verify the rendered menu and mark each item `priceVerified`.
7. Promote the verified dataset to production.
8. Keep the import script and the source file in the repository for audit.

### 5.4 What must not change during migration

- Item count.
- Category order.
- Dish names.
- Descriptions.
- Printed prices.
- The absence of hours, allergens and dietary labels.

Any correction is a content decision by ALMAS, recorded in the CMS history, not a silent import fix.

---

## 6. Editorial workflow

```
Draft → Preview → Fact check → Publish → Revalidate → Smoke check
```

- **Draft:** editor changes content in Sanity Studio.
- **Preview:** opens the real page with draft content and `noindex`.
- **Fact check:** a second person checks prices, names, both languages and legal claims.
- **Publish:** editor publishes the document.
- **Revalidate:** webhook regenerates the affected routes.
- **Smoke check:** confirm the live page shows the change.

### Roles

- Administrator: users, billing, datasets, publish.
- Editor: content, images, publish.
- Translator: English fields, submit for review.
- Developer: schema and deployment; no routine content edits.

### Content freeze

No content changes in the final 24 hours before launch except launch-blocking fixes. After launch, changes follow the normal workflow.

---

## 7. Launch gates

A document is launch-ready only when:

- [ ] Both languages are complete.
- [ ] Prices are verified by ALMAS.
- [ ] Descriptions match the printed menu.
- [ ] No placeholder image remains.
- [ ] No placeholder social link remains.
- [ ] Hours are either verified or absent.
- [ ] Legal pages are approved.
- [ ] SEO fields are complete.
- [ ] Image alt text is complete.
- [ ] The page has been reviewed on a preview deployment.

---

## 8. Future extensions (not in launch scope)

The model can grow without a redesign:

- **Reservations:** a booking provider link or a form with server-side validation. Requires privacy review.
- **Ordering:** link to a verified provider; no custom checkout at launch.
- **Swedish:** add `sv` to locales and localized slugs; requires professional translation.
- **Events/news:** a `post` collection with dates and images; only if the client commits to maintaining it.
- **Gift cards:** provider integration; not in scope.
- **Allergen filters:** add verified allergen data first; never infer.

Each extension needs its own scope, privacy review and acceptance criteria.
