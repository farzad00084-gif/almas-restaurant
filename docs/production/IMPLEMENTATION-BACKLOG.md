# Stage 5 — Implementation Backlog

**Project:** ALMAS Restaurant, Aarau
**Stage:** 5 — Production implementation (in progress, local only)
**Purpose:** Execution-ready backlog for Stage 5
**Status:** Implementation started 19 November 2026; deployment blocked

Estimates are ideal developer days for one experienced developer, excluding client review time, photography and legal review. They are planning ranges, not a fixed quote.

---

## 0. Implementation status (19 November 2026)

The Next.js app in `site/` implements the preview-level scope below. Checkboxes
in this backlog remain the agreed completion criteria: “preview-complete” does
not mean done, because CI, automated accessibility/performance tests, CMS
wiring, real content, client review and deployment are still missing.

| Epic | Status | Notes |
|---|---|---|
| E0 | Partial | Private GitHub repository `farzad00084-gif/almas-restaurant` exists. Domain, hosting, CMS and client-owned accounts are still missing. |
| E1 | Preview-complete | Next.js 16 + TypeScript, approved CSS ported, self-hosted fonts, layout/header/footer, theme script, DE/EN routing, security headers and preview `noindex`. Missing: CI, formatting, Playwright, preview deployment. |
| E2 | Partial | Typed JSON adapter, 60-item import from the transcribed source and a strict production gate exist. Sanity schemas, Studio, roles, webhook and editor flow are blocked on account access. |
| E3 | Preview-complete | Approved hybrid ported: hero, info ribbon, statement, diamond craft, three-dish preview, pide band, origin, consent-gated map, footer, quick bar, DE/EN and themes. Content is not CMS-bound; stock placeholders remain. |
| E4 | Preview-complete | Server-rendered menu with 6 categories, 60 items, sticky nav, three-image gallery, pide band and CTA; works without JavaScript. Client-requested WhatsApp ordering flow is implemented: item dialog, quantity, pizza family option, cart with localStorage, note field and prefilled message. Missing: print styles, CMS binding, verified prices, verified WhatsApp target and per-dish photos. |
| E5 | Draft only | Localized Imprint, Privacy and branded 404 exist with working 404 status and footer links. Legal copy is explicitly draft; verified email/legal details are missing. |
| E6 | Mostly complete | Per-page metadata, canonical/hreflang, Restaurant JSON-LD without hours/ratings, sitemap, robots, manifest, SVG favicon and preview `noindex`. Missing: branded OG image, Search Console/Bing verification, redirect map. |
| E7 | Partial | Manual keyboard/theme/responsive QA and security headers are done. axe, Lighthouse CI, screen-reader and 200% zoom audits are pending. |
| E8 | Partial | Content structure gate and headless Chrome QA in both languages/themes pass. Full Playwright suite, link checker, cross-browser pass and client content/legal/photo reviews are pending. |
| E9 | Blocked | No hosting, DNS, TLS, monitoring or deploy owner. |
| E10 | Blocked | Starts after launch. |

**Strict gate:** fails by design on 10 launch blockers — 60 unverified prices,
60 missing per-dish photos, 7 stock placeholders, missing email, provisional
WhatsApp number, missing hours, draft legal copy, missing production URL,
preview content mode and indexing disabled. See `site/package.json`
(`validate:content:strict`) and `site/README.md`.

---

## 1. How to use this backlog

- Work in the order below unless a dependency allows parallel work.
- Each epic has an outcome, tasks, acceptance criteria and dependencies.
- A task is done only when it meets the project definition of done and the relevant launch-checklist items.
- New requests go through change control; they do not get inserted silently.
- Client reviews happen on preview deployments, not screenshots alone.

**Definition of ready**

- Approved design reference available.
- Content or a clearly marked placeholder available.
- Acceptance criteria understood.
- Dependencies resolved or explicitly waived.

**Definition of done**

- Code reviewed and merged.
- Lint, type-check, unit and E2E tests pass.
- axe and Lighthouse budgets pass.
- Both languages and both themes checked.
- No console errors or horizontal overflow.
- Preview reviewed by the client where relevant.
- Documentation updated.

---

## 2. Epic summary

| Epic | Outcome | Estimate |
|---|---|---|
| E0 | Accounts, access and repository ready | 1–2 days |
| E1 | Next.js foundation, design tokens and CI | 3–4 days |
| E2 | Sanity schemas, Studio, preview and menu import | 4–5 days |
| E3 | Production home page | 4–5 days |
| E4 | Production menu page | 4–5 days |
| E5 | Legal pages, 404 and global footer | 2–3 days |
| E6 | SEO, metadata, structured data and sitemap | 2 days |
| E7 | Accessibility and performance hardening | 3–4 days |
| E8 | End-to-end QA and content freeze | 3–4 days |
| E9 | Deployment, domain, launch and monitoring | 2–3 days |
| E10 | Handover, training and support setup | 1–2 days |
| | **Total** | **~29–39 ideal days** |

The calendar estimate remains about four weeks with parallel content, photography and legal work. The total is higher than four weeks of one developer because several tasks run in parallel and some are review-bound.

---

## 3. E0 — Accounts, access and repository

**Outcome:** A clean, client-owned production setup with no shared passwords.

**Tasks**

- [ ] Confirm domain registrar, DNS owner and existing email setup.
- [ ] Confirm hosting choice (Vercel default; Infomaniak only if required).
- [ ] Create the GitHub organisation/repository under the agreed owner.
- [ ] Create the Vercel project and link it to the repository.
- [ ] Create the Sanity project and EU dataset.
- [ ] Create the analytics project (or record “none”).
- [ ] Create a shared password-manager vault for the client.
- [ ] Record account owners and recovery methods.
- [ ] Confirm who can approve production deploys.

**Acceptance**

- Client owns or can recover every account.
- No credentials in the repository or chat.
- Repository, hosting and CMS are linked.
- Access matrix recorded.

**Dependencies:** Stage 4 sign-off; client availability for account recovery.

---

## 4. E1 — Next.js foundation, design tokens and CI

**Outcome:** A deployable skeleton that already looks like ALMAS.

**Tasks**

- [ ] Create Next.js App Router project with TypeScript and strict mode.
- [ ] Add linting, formatting, type-check and test scripts.
- [ ] Port colour, type, spacing, radius, shadow and motion tokens from `site.css`.
- [ ] Self-host Instrument Serif, DM Sans and IBM Plex Mono; subset and preload.
- [ ] Build the base layout, skip link, header/footer shells and theme script.
- [ ] Add `data-theme` handling with no flash and one persisted key.
- [ ] Add route-based i18n foundation and translation files.
- [ ] Add GitHub Actions: install, lint, type-check, unit, build.
- [ ] Add Vercel preview deployment.
- [ ] Add a first Playwright smoke test.
- [ ] Add security headers and `noindex` for previews.

**Acceptance**

- A preview URL shows a branded shell in DE/EN and light/dark.
- Theme persists and does not flash.
- CI is green.
- No horizontal overflow at 320/390/768/1440 px.

**Dependencies:** E0.

---

## 5. E2 — Sanity schemas, Studio, preview and menu import

**Outcome:** The client can edit the real content safely.

**Tasks**

- [ ] Implement `siteSettings`, `homePage`, `menuPage`, `menuCategory`, `menuItem`, `legalPage` and `mediaAsset`.
- [ ] Add bilingual validation and price-format validation.
- [ ] Add placeholder and price-verification flags.
- [ ] Embed Sanity Studio at `/studio`; configure roles.
- [ ] Add draft preview and `noindex`.
- [ ] Add the publish webhook and revalidation endpoint with a secret.
- [ ] Write the import script from `menu-data.js` to NDJSON.
- [ ] Import 6 categories and 60 items into staging.
- [ ] Add count/duplicate/format checks.
- [ ] Add editor guidance inside the Studio.
- [ ] Test the full draft → preview → publish → revalidate flow.

**Acceptance**

- 6 categories and 60 items import without loss.
- Every item has DE/EN, price display and verification flag.
- A publish updates the preview site.
- Production build fails when a placeholder or unverified price is present.
- A non-technical editor can change a price and preview it.

**Dependencies:** E0, E1; verified menu source.

---

## 6. E3 — Production home page

**Outcome:** The approved hybrid, rebuilt in production quality.

**Tasks**

- [ ] Hero with full-bleed image, headline, subhead and actions.
- [ ] Porcelain info ribbon with address and phone.
- [ ] Statement section.
- [ ] Diamond craft section.
- [ ] Three-dish menu preview from CMS references.
- [ ] Pide band.
- [ ] Limestone origin section.
- [ ] Visit section with address, phone and consent-gated map.
- [ ] Footer with legal, contact and verified social links.
- [ ] Mobile quick-action bar.
- [ ] Responsive and art-directed crops.
- [ ] Both languages and themes.

**Acceptance**

- Matches the approved Stage 3 design side by side.
- All content comes from the CMS; no hard-coded facts.
- Map makes no request before consent.
- No placeholder image or link in production mode.
- Both themes pass contrast and visual review.

**Dependencies:** E1, E2; real photography for launch.

---

## 7. E4 — Production menu page

**Outcome:** A fast, server-rendered, editor-managed menu with a truthful WhatsApp ordering handoff.

**Tasks**

- [x] Menu hero and intro.
- [x] Three-image gallery from the local content adapter.
- [x] Sticky category nav with horizontal active-tab scrolling.
- [x] Six category sections rendered from the local adapter.
- [x] 60 items with prices, descriptions and family prices.
- [x] Pide band.
- [x] Contact CTA.
- [x] Footer.
- [x] Both languages and themes.
- [x] No-JavaScript rendering for all menu content.
- [x] Item detail dialog with photo, description, quantity and pizza family option.
- [x] Cart with localStorage persistence, quantity editing, optional note and running total.
- [x] Prefilled WhatsApp message to the configured number; the guest sends it manually.
- [x] Visible placeholder badge wherever a category stock image stands in for a dish.
- [ ] Print-friendly styles.
- [ ] Bind menu and item photos to Sanity once the project exists.
- [ ] Confirm the WhatsApp number and order scope in writing.
- [ ] Replace every category fallback with a real per-dish photo.

**Acceptance**

- 6 categories and 60 items render from the content source.
- Menu works with JavaScript disabled; ordering is an enhancement.
- Sticky nav works; page does not jump on load.
- Prices match the verified source exactly.
- No horizontal overflow at 320/390/768/1440 px.
- Ordering works in DE/EN and both themes; the cart survives reload and language change.
- The WhatsApp link opens the verified number with every line, option and note.
- The site never claims to receive, accept, pay for or confirm an order.
- Every stock image is visibly marked; real dish photos replace it before launch.

**Dependencies:** E1, E2; verified menu.

---

## 8. E5 — Legal pages, 404 and global footer

**Outcome:** A launch-ready legal and error experience.

**Tasks**

- [ ] Impressum page (DE/EN) from CMS.
- [ ] Privacy policy page (DE/EN) from CMS.
- [ ] Last-updated date and table of contents.
- [ ] Legal links in the footer on every page.
- [ ] Branded 404.
- [ ] Contact block with verified email/phone.
- [ ] Noindex on preview/staging.

**Acceptance**

- Legal pages are approved by the client/advisor.
- Links work from every page.
- 404 returns HTTP 404.
- No placeholder legal text.

**Dependencies:** E1, E2; legal details.

---

## 9. E6 — SEO, metadata, structured data and sitemap

**Outcome:** Correct indexing and sharing.

**Tasks**

- [ ] Per-page/language titles and descriptions.
- [ ] Canonical and `hreflang` including `x-default`.
- [ ] Open Graph and Twitter images.
- [ ] `Restaurant` JSON-LD without unverified hours or ratings.
- [ ] `sameAs` only for verified social profiles.
- [ ] `sitemap.xml` and `robots.txt`.
- [ ] Favicon and app icons.
- [ ] Redirect map for legacy URLs.
- [ ] Search Console/Bing verification.

**Acceptance**

- Rich Results Test passes.
- Canonical/hreflang audit passes.
- Sitemap contains all public pages.
- Preview deployments are `noindex`.
- No rating, award or hours claims without evidence.

**Dependencies:** E3, E4, E5.

---

## 10. E7 — Accessibility and performance hardening

**Outcome:** WCAG 2.2 AA and Core Web Vitals within budget.

**Tasks**

- [ ] Keyboard pass on all interactive components.
- [ ] Dialog focus trap, Escape close and focus return.
- [ ] Screen-reader announcement for add-to-order and cart updates.
- [ ] Screen-reader spot check (VoiceOver/NVDA).
- [ ] Contrast audit in both themes.
- [ ] 200% zoom and 320 px reflow.
- [ ] Reduced-motion audit.
- [ ] Image sizing and priority audit.
- [ ] Font subsetting and preload audit.
- [ ] Client JS audit; remove unused code.
- [ ] Lighthouse CI budgets.
- [ ] axe in CI.
- [ ] Fix all critical/serious issues.

**Acceptance**

- Zero critical/serious axe issues.
- LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Initial JS ≤ 120 KB gzip.
- No horizontal overflow at the test widths.
- Manual keyboard and screen-reader checks recorded.

**Dependencies:** E3, E4, E5.

---

## 11. E8 — End-to-end QA and content freeze

**Outcome:** A release candidate that matches the source of truth.

**Tasks**

- [ ] Full Playwright suite across pages, languages and themes.
- [ ] Mobile menu, sticky nav, theme persistence and language switch.
- [ ] Item dialog, family option, cart persistence, note and WhatsApp link.
- [ ] 60-item count and category counts.
- [ ] Link checker.
- [ ] Structured-data validation.
- [ ] Cross-browser and device pass.
- [ ] Content accuracy review with ALMAS.
- [ ] Legal review.
- [ ] Photography and alt-text review.
- [ ] Content freeze.
- [ ] Launch checklist walkthrough.

**Acceptance**

- All launch-checklist “Must” items are checked or formally waived.
- No placeholder content remains.
- Client signs off the release candidate.

**Dependencies:** E3–E7; client content and legal approval.

---

## 12. E9 — Deployment, domain, launch and monitoring

**Outcome:** The site is live, observable and recoverable.

**Tasks**

- [ ] Production environment variables and secrets.
- [ ] DNS apex/`www` configuration.
- [ ] TLS and HSTS.
- [ ] Email DNS check (SPF/DKIM/DMARC) if needed.
- [ ] Production deploy from `main`.
- [ ] Preview `noindex` verification.
- [ ] Uptime monitor.
- [ ] Error tracking.
- [ ] Analytics verification.
- [ ] Backup and restore test.
- [ ] Rollback dry run.
- [ ] Launch smoke test.
- [ ] Post-launch 24-hour check.

**Acceptance**

- HTTPS works on apex and `www`.
- Monitoring and alerts reach a named person.
- Rollback is tested.
- Client signs the launch checklist.

**Dependencies:** E8; DNS access; final sign-off.

---

## 13. E10 — Handover, training and support

**Outcome:** ALMAS can run the site without the agency.

**Tasks**

- [ ] Editor guide for menu, prices, photos and hours.
- [ ] 30-minute training, recorded.
- [ ] Account ownership transfer.
- [ ] Credentials in the client password manager.
- [ ] Support terms and response window.
- [ ] Launch report with known limitations.
- [ ] 30-day review scheduled.

**Acceptance**

- Client can edit a price and publish it.
- Client owns all accounts.
- Support contact and process documented.
- Handover signed.

**Dependencies:** E9.

---

## 14. Critical path

```
E0 → E1 → E2 → E3/E4 → E5 → E6 → E7 → E8 → E9 → E10
```

Parallel work:

- Content verification and photography start during E1/E2.
- Legal drafting starts during E2/E3.
- SEO can start as soon as page copy is stable.
- Accessibility checks run continuously, not only at E7.

**Typical critical path:** verified menu and real photography, not code. If either slips, launch slips.

---

## 15. Change control

- New page, feature or integration: scope, estimate and approval before work.
- Content changes after freeze: launch-blocking fixes only.
- Design changes after production port: change request with visual and QA impact.
- Vendor changes (CMS/hosting): re-plan E0/E2/E9.
- Anything that adds personal data collection triggers a privacy review.

---

## 16. Stage 5 start checklist

- [ ] Stage 4 plan approved.
- [ ] Stack/CMS/hosting approved.
- [ ] Content owner named.
- [ ] Launch date agreed.
- [ ] Domain/DNS access available.
- [ ] Verified menu received.
- [ ] Photography plan agreed.
- [ ] Legal owner named.
- [ ] Repository/accounts can be created under client ownership.

Local implementation started on 19 November 2026 under D-033 while the items
above remain open. This exception covers local preview work only; public
deployment still requires every checklist item and a passing strict content
gate.
