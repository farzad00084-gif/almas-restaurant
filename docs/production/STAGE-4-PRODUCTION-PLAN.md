# Stage 4 — Production Plan

**Project:** ALMAS Restaurant, Bahnhofstrasse 92, 5000 Aarau, Switzerland
**Stage:** 4 — Production planning
**Status:** Complete — ready for client sign-off before Stage 5
**Date:** 18 November 2026

**Companion documents**

- [`CONTENT-MODEL.md`](./CONTENT-MODEL.md) — production content types, validation and migration from the prototype
- [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md) — go/no-go checklist for launch
- [`IMPLEMENTATION-BACKLOG.md`](./IMPLEMENTATION-BACKLOG.md) — epic-by-epic Stage 5 backlog with estimates and acceptance criteria
- [`CLIENT-CONTENT-REQUEST.md`](./CLIENT-CONTENT-REQUEST.md) — the exact inputs still needed from ALMAS

> Stage 4 is planning. It does not create production code, a repository, a CMS workspace or a deployment. Those begin in Stage 5 after this plan, the stack and the content inputs are confirmed.

---

## 1. Decision summary

| Area | Recommended decision | Why | Status |
|---|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Server-rendered menu, static generation, CMS preview, future booking/ordering options and a large hiring pool | Adopted for planning |
| Styling | Port the approved CSS design system; no Tailwind rewrite | Preserves the approved Facets design exactly and avoids a second visual system | Adopted for planning |
| CMS | Sanity | Structured bilingual content, strong image pipeline, live preview, simple editor experience, generous small-team plan | Adopted for planning |
| Hosting | Vercel, EU region | First-class Next.js support, preview deployments, instant rollback, managed TLS and CDN | Adopted for planning |
| Swiss hosting alternative | Infomaniak | Keeps data in Switzerland if the client requires it; more operational work and a more manual pipeline | Fallback only |
| Repository | Private GitHub repository with protected `main` | Reviewable changes, CI, preview deployments, history | Adopted for planning |
| Analytics | Vercel Analytics or Plausible; no Google Analytics or ad pixels | Privacy-friendly, cookie-free page statistics | Adopted for planning |
| Map | Click-to-load OpenStreetMap, with a static preview and address fallback | Avoids third-party requests and cookies before consent | Adopted for planning |
| Fonts | Self-hosted Instrument Serif, DM Sans and IBM Plex Mono | No runtime Google Fonts request; better privacy and performance | Adopted for planning |
| Images | Sanity image CDN + `next/image`, AVIF/WebP, responsive sizes | Fast delivery, art direction, enforced alt text | Adopted for planning |
| Languages | German default, English secondary, localized URLs | Approved prototype languages; clean SEO and shareable links | Adopted for planning |
| Theme | Light default, dark optional, persisted | Matches the approved light mode while retaining the approved dark mode | Adopted for planning |
| Legal | Swiss Impressum and privacy policy before launch | Required for a Swiss commercial website | Blocked on client details |

**What “adopted for planning” means:** the agency recommends these choices and has built the plan around them. The client can veto or change any of them before Stage 5. No vendor account, domain change or production repository is created yet.

---

## 2. What Stage 4 delivers

1. A production stack and hosting recommendation with alternatives and trade-offs.
2. A page, route and component architecture that carries the approved design into production.
3. A bilingual content model for the menu, homepage, legal pages and media.
4. An editorial workflow the restaurant can use without touching code.
5. A deployment, domain, email, backup and rollback plan.
6. Accessibility, performance, SEO, security and privacy requirements.
7. A test strategy and a launch checklist with go/no-go gates.
8. A delivery sequence, responsibilities, indicative timeline and budget considerations.
9. A precise list of the content and access still required from ALMAS.

---

## 3. Approved inputs and constraints

### 3.1 Approved or confirmed

- Hybrid design: Porcelain editorial structure, Obsidian full-bleed hero and diamond craft section (D-019).
- Light mode approved by the client on 18 November 2026 (D-025).
- Menu gallery added on 18 November 2026 (D-026).
- German and English for the production site (D-013).
- Palette, typography and diamond/facet geometry from the approved prototypes.
- Address: Bahnhofstrasse 92, 5000 Aarau.
- Phone: 062 797 50 00 / `tel:+41627975000`.
- 60 verified menu items across 6 categories, transcribed from the printed menu (D-021).
- No team photography (D-010).
- Generic story copy only; no invented history (D-022).

### 3.2 Hard constraints

- **No invented restaurant facts.** Prices, descriptions, hours, allergens, history, reviews, awards and social links must be supplied or confirmed before publication.
- **No opening hours** until the client supplies verified weekly times and holiday closures (D-020).
- **No live social links** until URLs are supplied; the production build must not ship disabled buttons.
- **No stock photography at launch.** Licensed placeholders are acceptable in preview only and must be replaced by ALMAS food, interior and preparation photography (D-008).
- **No Afghan positioning or dishes** until confirmed (D-015).
- **No fake ordering, delivery or reservation flow.**
- **No legal launch** without Impressum and privacy-policy details.
- **No production build** that contains placeholder flags, unverified prices or missing translations.

### 3.3 Content that still blocks launch

See [`CLIENT-CONTENT-REQUEST.md`](./CLIENT-CONTENT-REQUEST.md). The short version:

- verified menu prices, descriptions and availability;
- opening hours and holiday closures;
- email address and contact preferences;
- Instagram, Facebook and TikTok URLs;
- domain, hosting and DNS access;
- legal name, responsible person, Impressum and privacy details;
- verified story/history and the Afghan-positioning decision;
- real food, interior and preparation photography with usage rights;
- final approval contact and launch date.

---

## 4. Recommended production stack

### 4.1 Framework: Next.js App Router + TypeScript

**Why Next.js**

- The menu can be rendered on the server, so it works without JavaScript and avoids the prototype's main limitation.
- Static generation plus on-demand revalidation gives fast pages and simple content updates.
- Draft mode supports a proper CMS preview before publishing.
- Server components keep client JavaScript small; only the theme toggle, language switcher and mobile navigation need client code.
- The same foundation can later support reservations, ordering links or a small admin area without a rebuild.
- It is widely supported, well documented and easy to hand over to another agency.

**Alternatives considered**

| Option | Strengths | Why it is not the primary recommendation |
|---|---|---|
| Astro | Excellent static performance and very little JavaScript; strong content collections and i18n | Less familiar to most restaurant clients and agencies; CMS live preview and future app features need more custom work |
| Plain HTML/CSS/JS | Simplest possible hosting; already exists as the prototype | The client cannot edit the menu or prices; every change needs a developer and a manual deploy |
| WordPress | Familiar editor; large plugin ecosystem | Harder to preserve the exact design; plugin/security/maintenance overhead; slower by default |
| Webflow / Wix | Fast visual editing | Recurring cost, design-system drift, limited content modelling and weaker control over performance and markup |

**Decision:** Next.js, with the approved CSS kept as the visual source of truth.

### 4.2 Styling: port the approved system, do not redesign

- Move the existing tokens, typography, spacing, rules and diamond geometry into the production project.
- Keep the same six brand colours and the same light/dark surfaces.
- Use CSS Modules or a small set of global stylesheets with tokens; do not introduce Tailwind and re-implement the design.
- Keep the existing class names where practical so the prototype and production can be compared side by side.
- Treat the prototype as the visual acceptance baseline.

### 4.3 CMS: Sanity

**Why Sanity**

- Structured content fits a menu: categories, items, prices, optional descriptions, family sizes and footnotes.
- Bilingual fields are first-class, with validation that both languages are present.
- The image pipeline supports cropping, hotspots, responsive derivatives and alt text.
- Editors can preview the real page before publishing.
- The Studio is embeddable at `/studio`, so the client has one admin URL.
- Roles, drafts and publish history are built in.
- The small-team plan is sufficient for one restaurant; confirm current pricing before purchase.

**Alternatives considered**

| Option | Strengths | Why it is not the primary recommendation |
|---|---|---|
| Storyblok | Strong visual editing and component-based content | Higher cost for this scope; more configuration for a two-page site |
| Contentful | Enterprise-grade modelling and governance | Overkill and more expensive for a single restaurant |
| Git-based JSON/Markdown | No CMS cost; full version history | The client cannot safely edit prices or photos without developer help |
| WordPress as CMS | Familiar | Adds a second runtime, plugin surface and security burden to a Next.js front end |

**Decision:** Sanity, with a deliberately small schema. The client edits content, not layout.

### 4.4 Hosting: Vercel, EU region

**Why Vercel**

- Native Next.js support, including image optimisation and preview deployments.
- Every pull request gets a review URL; production is promoted deliberately.
- Instant rollback to a previous deployment.
- Managed TLS, CDN and DDoS protection.
- Low operational burden for a small restaurant site.

**Data residency:** use an EU region for server functions. Sanity datasets can be created in the EU. If ALMAS requires all data to remain in Switzerland, Infomaniak is the fallback; it supports Node.js hosting but requires a more manual CI/CD and image pipeline.

**Decision:** Vercel for launch. Revisit only if Swiss data residency becomes a hard requirement.

### 4.5 Repository and delivery pipeline

- Private GitHub repository: `almas-restaurant` (name to confirm).
- Branches: `main` (production), short-lived feature branches, pull requests required.
- CI on every pull request: install, lint, type-check, unit tests, Playwright, axe, Lighthouse budget check, production build.
- Preview deployment per pull request.
- Production deploy only from a reviewed, green `main`.
- Protect `main`; require review and passing checks.
- Never commit secrets; use Vercel and Sanity environment variables.

### 4.6 Third-party services and privacy posture

| Service | Purpose | Privacy note |
|---|---|---|
| Vercel | Hosting, CDN, previews | Processor; EU region for functions; DPA required |
| Sanity | Content and images | EU dataset; DPA required; access limited to named editors |
| Vercel Analytics or Plausible | Page statistics | Cookie-free, no cross-site tracking, no ad tech |
| OpenStreetMap | Map | Loaded only after an explicit click; no request before consent |
| Resend (only if a contact form is added) | Transactional email | Not in launch scope; DPA and privacy notice required |

No Google Analytics, Meta Pixel, TikTok Pixel, heatmaps or advertising trackers.

---

## 5. Architecture

### 5.1 Route map

| Route | Purpose | Rendering |
|---|---|---|
| `/` | Redirect to `/de` | 307 redirect |
| `/de` | German homepage | Static generation + revalidation |
| `/en` | English homepage | Static generation + revalidation |
| `/de/speisekarte` | German menu | Static generation + revalidation |
| `/en/menu` | English menu | Static generation + revalidation |
| `/de/impressum` | German Impressum | Static |
| `/en/imprint` | English Impressum | Static |
| `/de/datenschutz` | German privacy policy | Static |
| `/en/privacy` | English privacy policy | Static |
| `/studio` | Sanity Studio | Client app, authenticated |
| `/api/preview` | Enable draft preview | Server, protected |
| `/api/revalidate` | Sanity publish webhook | Server, signed secret |
| `/sitemap.xml` | Localized sitemap | Generated |
| `/robots.txt` | Crawl rules | Generated |
| `/manifest.webmanifest` | Install metadata | Static |
| `/icon.svg` | Favicon / app icon | Static |
| `not-found` | Branded 404 | Static |

**Localized slugs** are used for SEO and readability. A small route map keeps German and English paths aligned without duplicating page code.

**Redirects**

- `www.almasrestaurant.ch` → `almasrestaurant.ch`.
- Any legacy URLs found on the existing domain → the closest new page.
- Optional compatibility: `?lang=en` and `?theme=dark` from prototype review links redirect to the equivalent production URL.
- 404s are real 404s, never soft redirects to the homepage.

### 5.2 Page composition

**Home** — the approved hybrid order:

1. Site header and mobile navigation.
2. Full-bleed hero with headline, subhead, primary/secondary actions and porcelain info ribbon.
3. Statement section.
4. Diamond craft section.
5. Three-dish menu preview.
6. Pide band.
7. Limestone origin section.
8. Visit section with address, phone and consent-gated map.
9. Footer with navigation, contact, legal links and social links only when verified.
10. Mobile quick-action bar.

**Menu** — the approved order:

1. Menu hero with eyebrow, title and intro.
2. Full-bleed three-image gallery with captions.
3. Sticky category navigation.
4. Six menu categories with 60 items.
5. Pide band.
6. Contact CTA.
7. Footer.

**Legal pages** — typographic long-form pages with a last-updated date, table of contents and contact block.

**404** — short branded page with links to home and menu.

### 5.3 Component map

| Prototype element | Production component |
|---|---|
| Header, desktop nav, mobile menu | `SiteHeader`, `PrimaryNav`, `MobileMenu`, `HeaderTools` |
| Theme and language controls | `ThemeToggle`, `LanguageSwitcher` |
| Hero, info ribbon | `Hero`, `InfoRibbon`, `HeroActions` |
| Statement, craft diamond | `StatementSection`, `CraftSection`, `DiamondMark` |
| Menu preview, pide band | `MenuPreview`, `PideBand` |
| Origin, visit, map | `OriginSection`, `VisitSection`, `ConsentMap` |
| Footer, social placeholders | `SiteFooter`, `SocialLinks` |
| Menu hero, gallery | `MenuHero`, `MenuGallery` |
| Sticky category nav | `MenuNav` (client component) |
| Category and item lists | `MenuSection`, `MenuItem`, `Price` |
| CTA, legal pages | `MenuCta`, `LegalPage`, `Prose` |
| Skip link, quick bar | `SkipLink`, `QuickActionBar` |

The menu itself is a server component. Only `MenuNav` needs client JavaScript for scroll-spy and horizontal tab scrolling. The theme toggle and mobile menu are small client islands.

### 5.4 Theme

- Default: light, matching the approved design.
- Optional: dark, via the header toggle.
- Persist in `localStorage` under one key for the whole site; do not keep separate preferences per page.
- Apply the theme before first paint with a small inline script to avoid a flash.
- Set `color-scheme` so form controls and scrollbars match.
- Respect `prefers-reduced-motion`.
- Theme toggle has an accessible label, `aria-pressed` and a visible focus state.
- No theme-specific content differences; both modes must show the same menu and facts.

### 5.5 Language

- German is the default and the canonical source for menu names.
- English is a full translation, not a machine-translated afterthought.
- Use `next-intl` (or an equivalent typed dictionary) with `de` and `en` messages.
- Localized routes, `<html lang>`, canonical URLs and `hreflang` pairs.
- The language switcher preserves the current page and scroll position where practical.
- Store the preference in a cookie so the next visit opens in the chosen language.
- Translate UI labels, validation messages, image alt text, metadata and legal pages.
- Dish names follow the printed menu; where the English menu uses a translated name, keep that translation.

### 5.6 Images

- Store final photography in Sanity with a hotspot and crop.
- Use `next/image` with responsive `sizes`, AVIF/WebP and a blur placeholder.
- Preload only the hero image; lazy-load everything below the fold.
- Enforce alt text in both languages; decorative images use empty alt text.
- Record photographer, licence and source on every image.
- Mark every stock image with `isPlaceholder: true`; the production build fails while any placeholder remains.
- Art direction: separate mobile crops for the hero and gallery if the subject needs it.
- Do not upscale small source images or apply heavy filters.

### 5.7 Fonts

- Instrument Serif, DM Sans and IBM Plex Mono are open-source; self-host them.
- Subset Latin plus the characters needed for German.
- Preload only the weights used above the fold.
- Use `font-display: swap` and a metric-compatible fallback to limit layout shift.
- No runtime request to Google Fonts.

### 5.8 Map and contact

- Show a static map preview or an address card first.
- Load the OpenStreetMap iframe only after the visitor clicks “Karte laden” / “Load map”.
- Explain the third-party request in the privacy policy.
- Keep the address, phone link and “Open in Maps” link usable without the map.
- No contact form at launch; phone and email are the confirmed channels.
- If a form is added later: server action, spam protection, rate limiting and a privacy notice.

### 5.9 Analytics and consent

- Use cookie-free, aggregate analytics only.
- No advertising, remarketing, heatmaps or cross-site tracking.
- No cookie banner is needed if no non-essential cookies are set.
- If a provider sets cookies or processes personal data beyond aggregate statistics, add a consent banner and update the privacy policy.
- Document the analytics choice in the privacy policy.

### 5.10 SEO

- Unique title and meta description per page and language.
- Canonical URL and `hreflang` for every localized page.
- Localized slugs; stable URLs; no query-string dependence.
- Open Graph and Twitter card images generated from approved photography and the wordmark.
- `Restaurant` JSON-LD with name, address, phone, URL, menu URL and image.
- Add `sameAs` only for verified social profiles.
- Add `openingHoursSpecification` only after verified hours are supplied.
- Never add `aggregateRating` without a verifiable source and permission.
- `sitemap.xml`, `robots.txt`, XML sitemap submission and Google Business Profile link check.
- Branded 404; no indexable staging or preview deployments.
- Preview deployments send `noindex`.

### 5.11 Accessibility

Target: **WCAG 2.2 AA**.

- Semantic landmarks, one `h1` per page, logical heading order.
- Visible focus states on every interactive element.
- Keyboard-operable mobile menu, theme toggle, language switcher and menu tabs.
- Skip link to main content.
- Sufficient contrast in both themes, including muted text and captions.
- Meaningful alt text; decorative images marked correctly.
- No motion that cannot be reduced; honour `prefers-reduced-motion`.
- Text resists 200% zoom and 320 px reflow without horizontal scrolling.
- Form controls and error messages are labelled if a form is added.
- Test with VoiceOver/NVDA and keyboard-only navigation before launch.

### 5.12 Performance budgets

| Metric | Budget |
|---|---|
| LCP (mobile, 4G) | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| Initial client JavaScript | ≤ 120 KB gzipped |
| Hero image | ≤ 250 KB (AVIF/WebP, responsive) |
| Total initial page weight | ≤ 1.5 MB |
| Fonts | ≤ 120 KB total, subset and preloaded |
| Third-party tracking or map requests before consent | 0 |

Lighthouse CI enforces budgets on every pull request; a regression blocks merge.

### 5.13 Security

- HTTPS only; HSTS after launch.
- Security headers: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`.
- CSP allowlist limited to the map host after consent and to Sanity/Vercel as needed.
- Sanity tokens are server-only; no secrets in client bundles.
- Least-privilege CMS roles; remove access when staff leave.
- Preview and revalidation endpoints require secrets.
- Dependency updates and security alerts enabled.
- Rate limiting on any future form endpoint.
- No directory listing, source maps in production, or verbose errors.

---

## 6. Content architecture and workflow

### 6.1 Content types

The full schema is in [`CONTENT-MODEL.md`](./CONTENT-MODEL.md). At a glance:

- `siteSettings` — restaurant identity, contact, social links, legal links, analytics, default theme.
- `homePage` — the approved hybrid sections as named fields.
- `menuPage` — menu hero, gallery and CTA copy.
- `menuCategory` — six ordered categories, each with items.
- `legalPage` — Impressum and privacy policy.
- `mediaAsset` — image, bilingual alt text, credit, licence and placeholder flag.

### 6.2 Editorial roles

| Role | Rights |
|---|---|
| Administrator | Billing, users, datasets, publish, delete |
| Editor | Create and edit content, upload images, publish |
| Translator | Edit English fields, submit for review; no publish by default |
| Developer | Schema, code, deployment, read-only content access where possible |

Start with two administrators and one editor. Add translators only when needed.

### 6.3 Workflow

1. Editor updates a draft in Sanity Studio.
2. Preview opens the real page with draft content.
3. A second person reviews facts, prices, spelling and both languages.
4. Editor publishes.
5. Sanity webhook calls `/api/revalidate`; affected pages regenerate.
6. A smoke check confirms the live page.

For urgent price changes, the same flow applies; there is no direct database editing.

### 6.4 Validation and publishing gates

- Both German and English names are required.
- `priceDisplay` is required and must match the printed format.
- Every item belongs to exactly one category.
- Category order is explicit.
- Menu count is checked against the approved source; any change requires a note.
- Social links require a valid URL and `verified: true`.
- Hours are either `null` or a complete, verified weekly schedule.
- Legal pages require a legal name, responsible person, contact email and last-updated date.
- Placeholder images block a production build.
- Unverified prices block a production build.
- Missing translations block a production build.

### 6.5 Placeholder policy

- Every stock image has `isPlaceholder: true`, a photographer credit, a licence and a source link.
- Placeholder captions remain visible in preview builds.
- The production build reads `REQUIRE_VERIFIED_CONTENT=true` and fails if any placeholder remains.
- Replacing an image means uploading the real photograph, updating alt text and credit, and clearing the flag.
- No stock image may be presented as an ALMAS dish in the final site.

### 6.6 Migration from Stage 3

- Keep `docs/content/menu-source.md` as the audit trail.
- Write a one-off import script that reads `prototypes/assets/js/menu-data.js` and produces Sanity NDJSON.
- Preserve the exact 60 items, names, descriptions, prices and category order.
- Do not “correct” or translate during import; verification is a separate client step.
- After import, render the production menu and compare it item by item with the source.
- Keep a checksum or count assertion: 6 categories, 60 items, no duplicates.
- Keep the Stage 3 prototypes untouched for visual comparison.

### 6.7 Translation workflow

- German is written first and approved by ALMAS.
- English is translated by a professional or reviewed by a fluent editor.
- Keep a glossary for dish names, “Symbolbild”, “Speisekarte”, “Impressum” and “Datenschutz”.
- Do not machine-translate prices, allergens or legal text without review.
- Both languages must be complete before launch.

---

## 7. Deployment and operations

### 7.1 Environments

| Environment | Purpose | Indexing |
|---|---|---|
| Local | Development and content modelling | No |
| Preview | Every pull request, client review | No (`noindex`) |
| Staging (optional) | Final content and legal review | No (`noindex`) |
| Production | Public site | Yes |

### 7.2 CI/CD

On every pull request:

1. Install with a locked dependency tree.
2. Lint and type-check.
3. Unit tests for price formatting, translations and schema validation.
4. Playwright tests for home, menu, legal, theme, language and navigation.
5. axe accessibility scan.
6. Lighthouse CI budget check.
7. Production build.
8. Deploy a preview URL and comment it on the pull request.

On merge to `main`: deploy to production after a green build. Promote the same artifact that was tested; do not rebuild from a different commit.

### 7.3 Domain, DNS and email

- Confirm who owns `almasrestaurant.ch`; the public check showed an invalid certificate and no reachable site.
- Confirm the registrar and DNS access before launch week.
- Point the apex domain to Vercel; redirect `www` to the apex.
- Enable automatic TLS and HSTS after the first successful HTTPS check.
- If ALMAS sends email from the domain, configure SPF, DKIM and DMARC with the email provider.
- Do not change MX records without the client's email administrator.
- Keep a DNS change log and a rollback record.

### 7.4 Backups and rollback

- Sanity dataset export before launch and weekly thereafter; store outside the CMS account.
- GitHub history is the code backup.
- Vercel keeps immutable deployments; roll back by promoting the previous one.
- Test a restore into a separate dataset once before launch.
- Document who can restore and how long it takes.

### 7.5 Monitoring

- Uptime check on the homepage, menu and a legal page.
- Error tracking (for example Sentry) with a named alert recipient.
- Analytics dashboard for page views and referrers.
- Monthly Lighthouse spot check.
- Broken-link check after content changes.
- Certificate expiry alert (managed by Vercel, but verify).

### 7.6 Maintenance

- Monthly dependency and security updates.
- Quarterly content review with ALMAS (prices, hours, photos, social links).
- Annual legal/privacy review.
- A named support contact and response window in the handover document.
- Change requests outside the agreed scope are quoted separately.

---

## 8. QA and launch

### 8.1 Test strategy

**Automated**

- Playwright: home, menu, legal, 404; DE/EN; light/dark; mobile menu; theme persistence; language switch; sticky menu nav; 60 items; gallery; social links; map consent; no horizontal overflow.
- axe: zero critical or serious violations on every page and theme.
- Lighthouse CI: performance, accessibility, best practices and SEO budgets.
- Link checker for internal and external links.
- HTML validation and structured-data validation.

**Manual**

- Content accuracy against the approved source.
- Keyboard-only pass and screen-reader spot check.
- Contrast check in both themes.
- 200% zoom and 320 px reflow.
- Slow-network and reduced-motion checks.
- Cross-browser: Chrome, Safari, Firefox and Edge.
- Device spot check: iPhone, Android, tablet and desktop.
- Social preview cards and search-result previews.
- Legal and privacy review.
- Map consent and analytics behaviour.
- Print stylesheet? Not in launch scope; the menu remains a web page.

### 8.2 Definition of done

A page is done when:

- it matches the approved design at desktop and mobile;
- both languages are complete;
- both themes pass contrast and visual checks;
- it works without JavaScript for content;
- it has no console errors or horizontal overflow;
- it passes axe and Lighthouse budgets;
- its metadata, canonical and `hreflang` are correct;
- its content is verified and free of placeholders;
- it has been reviewed on a preview deployment by the client.

### 8.3 Launch checklist

The full go/no-go list is in [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md). Launch is blocked if any item in the “must” column is open.

### 8.4 Post-launch

- 24-hour smoke check: all pages, both languages, both themes, phone links, map consent, analytics.
- 7-day monitoring: errors, uptime, Core Web Vitals, 404s.
- 30-day review: content accuracy, search indexing, client feedback.
- Fix defects found in the agreed warranty period.

---

## 9. Delivery plan

### 9.1 Workstreams

| Workstream | Output |
|---|---|
| Content | Verified menu, hours, contact, social, legal, story, photography |
| Design port | Approved tokens, components and responsive behaviour in the production codebase |
| CMS | Schemas, Studio, roles, preview, validation, import |
| Build | Home, menu, legal, 404, i18n, theme, map, SEO |
| QA | Automated and manual test passes, accessibility, performance |
| Launch | DNS, TLS, email, analytics, monitoring, handover |

### 9.2 Indicative timeline

Assuming content, photography and access arrive on time:

| Week | Work |
|---|---|
| 1 | Repository, Next.js foundation, design tokens, CMS schemas, content import, preview |
| 2 | Home and menu in both languages and themes; responsive QA |
| 3 | Legal pages, SEO, analytics, map consent, accessibility and performance passes |
| 4 | Content freeze, final QA, DNS, launch, monitoring, handover |

**Elapsed time:** about 4 weeks after the Stage 5 start. Content, photography and legal review run in parallel and are the usual critical path.

### 9.3 Responsibilities

| Task | ALMAS | Agency | Legal advisor | Photographer |
|---|---|---|---|---|
| Approve stack and plan | A | R | — | — |
| Verify menu and prices | A/R | C | — | — |
| Supply hours and contact details | A/R | C | — | — |
| Supply social URLs and domain access | A/R | C | — | — |
| Legal name, Impressum, privacy | A | C | R | — |
| Food/interior photography | A (approve) | C | — | R |
| Design port and build | C | R/A | — | — |
| CMS setup and training | C | R/A | — | — |
| Accessibility and performance QA | C | R/A | — | — |
| Launch sign-off | A | R | C | — |

`R` = responsible, `A` = accountable, `C` = consulted.

### 9.4 Budget considerations

These are planning ranges, not quotes. Confirm current vendor pricing before purchase.

| Item | Likely range | Note |
|---|---|---|
| Domain | ~CHF 15–25 / year | Depends on registrar and TLD |
| Hosting | Free tier to ~CHF 30 / month | Vercel Pro may be needed for team/preview features |
| CMS | Free tier to ~CHF 100 / month | Sanity small-team plan; confirm current limits |
| Email | ~CHF 5–10 / mailbox / month | Only if ALMAS wants domain email |
| Analytics | Free to ~CHF 10 / month | Vercel Analytics or Plausible |
| Photography | ~CHF 1,500–4,000 | Market-dependent; half-day to full-day shoot plus editing |
| Legal review | ~CHF 500–1,500 | Swiss Impressum/privacy review |
| Build | Fixed project fee | Scope in this plan; change requests separate |

The client should also budget for menu updates, seasonal photography and ongoing maintenance.

---

## 10. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Menu prices or descriptions are not verified | Wrong information published; legal/reputational risk | Client sign-off on every item; `priceVerified` gate; no launch without it |
| Hours still missing | Incomplete visit information | Keep hours absent; add only when verified; do not guess |
| No real photography | Stock placeholders cannot launch | Schedule a shoot early; use placeholders only in preview |
| Domain ownership unclear | Launch delay | Confirm registrar and DNS access in week 1 |
| Legal details missing | Cannot launch a Swiss commercial site | Assign a legal owner; use a checklist; review before content freeze |
| Social URLs missing | Disabled buttons look unfinished | Hide social links until verified; do not ship fake links |
| CMS too complex for staff | Content stagnates | Small schema, named fields, training, written guide |
| Scope creep (ordering, bookings) | Budget/time overrun | Keep launch scope; quote new features separately |
| Third-party privacy issues | Legal exposure | Self-host fonts; click-to-load map; no ad trackers; privacy policy |
| Performance regression | Weak mobile experience | Budgets in CI; image discipline; minimal client JS |
| Accessibility regression | Excludes users; legal risk | axe + manual audits; component-level checks |
| SEO migration issues | Lost visibility | Redirect map, canonical/hreflang checks, Search Console monitoring |
| Single-person dependency | Maintenance risk | Document everything; client owns accounts; agency handover |

---

## 11. Open decisions and client inputs

| # | Decision / input | Owner | Needed by | Blocks |
|---|---|---|---|---|
| 1 | Approve stack, CMS and hosting recommendation | ALMAS | Before Stage 5 | Build start |
| 2 | Confirm whether Swiss-only data residency is required | ALMAS | Before accounts are created | Hosting choice |
| 3 | Verify all 60 menu items, descriptions and prices | ALMAS | Week 1 of Stage 5 | Content import sign-off |
| 4 | Supply opening hours and holiday closures | ALMAS | Before content freeze | Launch |
| 5 | Supply email, social URLs and contact preferences | ALMAS | Week 1 | Footer/contact/SEO |
| 6 | Confirm domain registrar and DNS access | ALMAS | Week 1 | Launch |
| 7 | Supply legal name, responsible person, Impressum/privacy details | ALMAS + legal | Week 2 | Launch |
| 8 | Confirm Afghan positioning and any Afghan dishes | ALMAS | Week 2 | Homepage copy/menu |
| 9 | Supply real photography and usage rights | ALMAS / photographer | Week 2–3 | Launch |
| 10 | Choose analytics provider (or none) | ALMAS | Week 3 | Privacy policy/launch |
| 11 | Confirm launch date and approval contact | ALMAS | Week 1 | Schedule |
| 12 | Approve final content freeze | ALMAS | Week 4 | Launch |

---

## 12. Stage 4 acceptance

Stage 4 is complete when:

- [x] The production stack and hosting recommendation are documented with alternatives.
- [x] The page, route and component architecture is defined.
- [x] The bilingual content model is defined.
- [x] The editorial workflow and validation gates are defined.
- [x] The deployment, domain, backup and rollback plan is defined.
- [x] Accessibility, performance, SEO, security and privacy requirements are defined.
- [x] The test strategy and launch checklist are defined.
- [x] The delivery sequence, responsibilities, timeline and budget considerations are documented.
- [x] The remaining client inputs are listed with owners and blockers.
- [ ] Client signs off on the recommended stack/CMS/hosting and the content request.

The final unchecked item is the Stage 5 gate, not a Stage 4 gap.

---

## 13. Next stage

**Stage 5 — Production implementation.**

Start when:

1. the client approves the stack, CMS and hosting (or requests changes);
2. the client confirms the content owner and target launch date;
3. domain/DNS access is available;
4. the content request has been issued and the verification work has started.

Stage 5 delivers the production codebase, CMS, content import, QA and launch. No production work starts before that gate.
