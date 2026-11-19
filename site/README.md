# ALMAS Restaurant — Production Site (Stage 5)

Next.js implementation of the approved ALMAS “Facets” design for
Bahnhofstrasse 92, 5000 Aarau. This is the Stage 5 production port, built
locally from the approved hybrid prototype, plus the client-requested
WhatsApp ordering flow.

> **Not deployable yet.** The site intentionally contains unverified prices,
> stock photography, missing contact details and draft legal copy. The strict
> production content gate fails until the client supplies verified content.
> Do not deploy or make this site public.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4.6 (App Router, Turbopack) |
| UI | React 19.3.0 + TypeScript |
| Styling | The approved CSS design system, ported directly into `src/app/globals.css` (no Tailwind rewrite) |
| Fonts | Instrument Serif, DM Sans and IBM Plex Mono via `next/font/google`; Next.js downloads and self-hosts the files at build time, so visitors make no Google request |
| Images | Local files in `src/media/`, served through `next/image` |
| Content | Typed local JSON adapter in `src/content/` (Sanity is planned, not connected) |
| Routing | German default, English secondary, localized slugs via `src/proxy.ts` |

Node.js 24 and npm 11 were used during development.

---

## 2. Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>; it redirects to `/de`.

To run a production-mode preview:

```bash
npm run build
npm run start
```

The default build is a **preview** build: indexing is disabled, the preview
ribbon is shown, and the content validator permits known launch blockers with
warnings.

### Routes

| Page | German | English |
|---|---|---|
| Home | `/de` | `/en` |
| Menu | `/de/speisekarte` | `/en/menu` |
| Imprint | `/de/impressum` | `/en/imprint` |
| Privacy | `/de/datenschutz` | `/en/privacy` |

Non-canonical language slugs (for example `/en/speisekarte`) are permanently
redirected to their canonical counterpart by `src/proxy.ts`; unknown paths
render the branded 404 with HTTP status 404.

---

## 3. Content workflow

All content lives in `src/content/` and is typed in `src/content/types.ts`:

| File | Purpose |
|---|---|
| `menu.json` | 6 categories, exactly 60 items, each with DE/EN copy, price data, `priceVerified` and an optional `image` |
| `site.json` | Address, phone, provisional WhatsApp target, email, hours and social links; unverified fields are empty or flagged |
| `media.json` | Seven images with alt text, credits and `isPlaceholder` flags |
| `copy.ts` | Bilingual UI, home, menu, ordering and legal copy; legal text contains draft markers |
| `index.ts` | Typed accessors, localized routes, preview/indexing flags |

`menu.json` was generated from `scripts/menu-data.source.js` by
`npm run import:menu`; do not hand-edit items in a way that diverges from the
transcribed source. Imported values must keep the exact 60 items and 6
categories.

Editing rules:

- Never invent restaurant facts, items, prices, hours, email addresses, social
  URLs or legal details.
- Keep `priceVerified: false` until ALMAS confirms every price.
- Keep `isPlaceholder: true` until real photography replaces stock.
- Legal pages must lose their draft markers only after legal review.
- The footer hides social links that are not verified; do not add disabled
  social buttons to a production build.

When Sanity is connected (pending client account access), `src/content/`
becomes the seed/import format. The content model is documented in
`../docs/production/CONTENT-MODEL.md`.

### WhatsApp ordering

- Every menu row opens an item dialog with description, price, quantity and the
  family option where the printed menu shows one.
- `menu.json` → `image` must reference a `media.json` entry. When it is `null`,
  the dialog uses a category stock photo with a visible “placeholder image”
  badge. Real per-dish photos are required before production.
- The order lives in `localStorage` under `almas-order-v1`: up to 60 lines,
  quantities 1–20 and a note of up to 500 characters. There is no server,
  account or database.
- `src/components/ordering/order-message.ts` builds the message;
  `site.json` → `whatsapp` supplies the target number. The guest opens WhatsApp
  and sends the prepared message manually.
- The site does not receive, accept, pay for or confirm an order. Do not add
  claims or UI that suggest otherwise.
- The strict gate requires `whatsapp.verified: true`. Until ALMAS confirms the
  number is on WhatsApp, it remains provisional (D-036).
- The DE/EN privacy drafts describe the local cart and WhatsApp transmission;
  they still need legal review.

---

## 4. Content gate

Two levels of validation run against the same content:

```bash
npm run validate:content          # preview: structure is checked, blockers are warnings
npm run validate:content:strict   # production: any launch blocker fails the gate
```

The structural checks verify the bilingual menu, unique IDs, category counts,
price formatting, image references and required fields.

The strict gate currently fails on these expected blockers:

1. 60 of 60 menu prices are unverified.
2. 60 of 60 items have no real dish photo; the ordering dialog uses marked category stock.
3. 7 of 7 images are stock placeholders.
4. No verified email address.
5. The WhatsApp ordering number is provisional and not verified.
6. No verified opening hours.
7. Legal copy still contains draft markers.
8. `NEXT_PUBLIC_SITE_URL` is not the final production domain.
9. `NEXT_PUBLIC_CONTENT_MODE` is not `production`.
10. `NEXT_PUBLIC_ALLOW_INDEXING` is not `true`.

Unverified social links are a warning only: the footer omits them entirely, so
no dead buttons ship.

### Production build

```bash
npm run build:production
```

This script requires the production environment variables below and refuses to
build otherwise. A passing strict gate is required before any public deploy.

| Variable | Preview | Production |
|---|---|---|
| `NEXT_PUBLIC_CONTENT_MODE` | `preview` (default) | `production` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` (default) | `true` |
| `NEXT_PUBLIC_SITE_URL` | optional; falls back to `http://localhost:3000` | required final `https://` domain, not localhost |

Copy `.env.example` to `.env.local` for local overrides. Never commit real
secrets; the site currently needs no server-side secrets.

---

## 5. Scripts

| Command | Action |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Content validation + preview production build |
| `npm run build:production` | Strict content gate + production build |
| `npm run start` | Serve the last build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript with no emit |
| `npm run validate:content` | Preview content check |
| `npm run validate:content:strict` | Production content gate |
| `npm run import:menu` | Regenerate `menu.json` from the transcribed source |

---

## 6. Project structure

```
site/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Home, menu, legal routes and 404
│   │   ├── globals.css            # Approved design system + production additions
│   │   ├── icon.svg               # Brand mark favicon
│   │   ├── manifest.ts            # Web app manifest
│   │   ├── robots.ts              # Environment-aware robots.txt
│   │   └── sitemap.ts             # Localized sitemap
│   ├── components/                # Header, footer, home, menu, ordering, consent map, controls
│   ├── content/                   # Typed content adapter and copy
│   ├── media/                     # Licensed stock placeholders (7 images)
│   └── proxy.ts                   # Locale detection and slug canonicalization
├── scripts/
│   ├── validate-content.mjs       # Preview + strict production gate
│   ├── build-production.mjs       # Production build entrypoint
│   └── import-menu.cjs            # Menu source → menu.json
└── next.config.ts                 # Security headers, no powered-by header
```

---

## 7. Quality status (19 November 2026)

- `npm run lint`, `npm run typecheck` and `npm run build` pass.
- Preview validation: 3 passed, 9 expected warnings, 0 failures.
- Strict validation: fails by design on the 10 launch blockers above.
- Headless Chrome QA at 1440×1000 and 390×844 in DE/EN and light/dark:
  no horizontal overflow, no unexpected console errors, all images load.
- Verified: theme persistence, language switch, mobile menu focus handling,
  consent-gated map, localized redirects, 404 status, manifest, robots,
  sitemap, favicon and security headers.
- Ordering QA: item dialog and placeholder badge, add/view order, pizza family
  option and total, `Döner Box` ambiguous price, note text, cart persistence
  across reload and locale change, clear cart and the WhatsApp message.
- `npm audit`: 0 vulnerabilities (production and development).

Screenshots and the QA report are outside the repository in the local
`almas-qa` workspace.

---

## 8. Deployment — blocked

Public deployment is blocked until all of the following exist:

- Domain/DNS access and final `NEXT_PUBLIC_SITE_URL`.
- Vercel (EU) or Infomaniak hosting access and approved deploy owner.
- Sanity project/dataset access (or a signed-off decision to keep JSON).
- Verified menu prices and descriptions.
- Verified opening hours, email and social URLs.
- Written confirmation that the WhatsApp number is active and may receive orders, plus the order scope.
- Verified per-dish photography for every orderable item.
- Final Impressum and privacy policy approved by the client/legal advisor, including the ordering section.
- Real photography with licences and alt text, replacing every stock image.

The intended production posture is documented in
`../docs/production/STAGE-4-PRODUCTION-PLAN.md`: Vercel EU hosting,
privacy-first analytics, no advertising pixels, noindex previews and a strict
content gate before the public build.

---

## 9. Design and content references

- Approved design: `../prototypes/hybrid.html` (primary), `../prototypes/menu.html`
- Design system: `../prototypes/assets/css/site.css` → ported to `src/app/globals.css`
- Menu source: `../docs/content/menu-source.md`
- Production plan: `../docs/production/STAGE-4-PRODUCTION-PLAN.md`
- Launch checklist: `../docs/production/LAUNCH-CHECKLIST.md`
- Client inputs still needed: `../docs/production/CLIENT-CONTENT-REQUEST.md`

The visual design is fixed. Production work must not redesign the approved
hybrid; changes go through change control.
