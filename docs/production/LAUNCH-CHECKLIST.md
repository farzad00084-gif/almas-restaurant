# Production Launch Checklist

**Project:** ALMAS Restaurant, Aarau
**Stage:** 4 — Production planning
**Use:** Stage 5, immediately before launch
**Rule:** Any unchecked **Must** item is a launch blocker.

---

## 1. Content and facts

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 1.1 | All 60 menu items verified against the printed menu | Must | ALMAS | Signed checklist or email |
| 1.2 | Every price confirmed; no unverified `priceVerified: false` | Must | ALMAS | CMS publish report |
| 1.3 | Descriptions confirmed; no invented ingredients | Must | ALMAS | Signed menu |
| 1.4 | Pizza sizes and family prices confirmed | Must | ALMAS | Signed menu |
| 1.5 | Ambiguous prices (e.g. `12.00 / 10.00`) explained or shown as printed | Must | ALMAS | Note in CMS |
| 1.6 | Opening hours either fully verified or absent | Must | ALMAS | CMS hours record |
| 1.7 | Holiday closures and special hours confirmed, if hours are shown | Should | ALMAS | CMS note |
| 1.8 | Phone number correct and dialable | Must | ALMAS | Click test |
| 1.9 | Email address correct and monitored | Must | ALMAS | Test email |
| 1.10 | Instagram, Facebook and TikTok URLs verified | Must | ALMAS | Link check |
| 1.11 | Story/history verified; no invented dates, awards or claims | Must | ALMAS | Approved copy |
| 1.12 | Afghan positioning and dishes confirmed or absent | Must | ALMAS | Written decision |
| 1.13 | Allergens/dietary labels either verified or absent | Must | ALMAS | CMS audit |
| 1.14 | Legal name and responsible person confirmed | Must | ALMAS | Impressum draft |
| 1.15 | No “best”, “award-winning”, rating or review claims without evidence | Must | Agency | Copy audit |
| 1.16 | German and English both complete and reviewed | Must | ALMAS / translator | Preview review |
| 1.17 | No placeholder text, “TODO”, lorem ipsum or dummy links | Must | Agency | Automated scan |

---

## 2. Design and UX

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 2.1 | Production matches the approved Stage 3 design | Must | Agency | Side-by-side review |
| 2.2 | Light mode is the default; dark mode works | Must | Agency | Screenshots |
| 2.3 | Theme persists across pages and reloads | Must | Agency | E2E test |
| 2.4 | No theme flash on first paint | Must | Agency | Throttled load check |
| 2.5 | DE/EN switch preserves the current page | Must | Agency | E2E test |
| 2.6 | Menu gallery displays three images with captions | Must | Agency | Visual check |
| 2.7 | Sticky menu navigation works on desktop and mobile | Must | Agency | E2E test |
| 2.8 | Active category scrolls horizontally within the nav | Must | Agency | Mobile test |
| 2.9 | Page does not auto-scroll past the hero on load | Must | Agency | Mobile test |
| 2.10 | Mobile menu opens, closes, traps focus and returns focus | Must | Agency | Keyboard test |
| 2.11 | No horizontal overflow at 320, 390, 768, 1024, 1440 and 1920 px | Must | Agency | Automated check |
| 2.12 | 200% zoom remains usable | Must | Agency | Manual check |
| 2.13 | All images are real ALMAS photography, correctly cropped | Must | ALMAS / photographer | CMS audit |
| 2.14 | No stock placeholder remains | Must | Agency | Build gate |
| 2.15 | Social buttons are real links or absent | Must | Agency | Link check |
| 2.16 | No team photography unless approved | Must | Agency | Asset audit |
| 2.17 | Map loads only after consent and remains usable without it | Must | Agency | Manual test |
| 2.18 | Phone links work on iOS and Android | Must | Agency | Device test |
| 2.19 | 404 page is branded and useful | Should | Agency | Manual check |
| 2.20 | Print stylesheet is acceptable (menu may be printed) | Should | Agency | Print preview |

---

## 3. Accessibility

Target: WCAG 2.2 AA.

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 3.1 | axe reports zero critical/serious issues on all pages and themes | Must | Agency | CI report |
| 3.2 | Keyboard-only navigation reaches every control | Must | Agency | Manual pass |
| 3.3 | Visible focus indicator on every interactive element | Must | Agency | Manual pass |
| 3.4 | Skip link works | Must | Agency | Manual pass |
| 3.5 | One `h1` per page and logical heading order | Must | Agency | DOM audit |
| 3.6 | Landmarks are correct (`header`, `nav`, `main`, `footer`) | Must | Agency | DOM audit |
| 3.7 | All meaningful images have useful alt text in both languages | Must | Agency | CMS audit |
| 3.8 | Decorative images have empty alt text | Must | Agency | DOM audit |
| 3.9 | Contrast passes in light and dark mode | Must | Agency | Contrast report |
| 3.10 | Text remains readable at 200% zoom and 320 px reflow | Must | Agency | Manual check |
| 3.11 | `prefers-reduced-motion` removes non-essential motion | Must | Agency | Manual check |
| 3.12 | Language switcher updates `<html lang>` | Must | Agency | DOM check |
| 3.13 | Screen-reader spot check on home and menu | Should | Agency | VoiceOver/NVDA notes |
| 3.14 | No link opens a new tab without warning | Should | Agency | Manual audit |
| 3.15 | Error messages are announced, if a form is added | Must if form | Agency | Test |

---

## 4. Performance

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 4.1 | LCP ≤ 2.5 s on mobile 4G | Must | Agency | Lighthouse/field data |
| 4.2 | INP ≤ 200 ms | Must | Agency | Lighthouse/field data |
| 4.3 | CLS ≤ 0.1 | Must | Agency | Lighthouse/field data |
| 4.4 | Initial client JS ≤ 120 KB gzipped | Must | Agency | Build report |
| 4.5 | Hero image ≤ 250 KB, responsive AVIF/WebP | Must | Agency | Network panel |
| 4.6 | Total initial page weight ≤ 1.5 MB | Must | Agency | Network panel |
| 4.7 | Fonts subset, self-hosted and preloaded | Must | Agency | Network panel |
| 4.8 | No third-party tracking or map request before consent | Must | Agency | Network panel |
| 4.9 | Below-fold images lazy-load | Must | Agency | Network panel |
| 4.10 | No layout shift from late fonts or images | Must | Agency | CLS trace |
| 4.11 | Lighthouse performance ≥ 90 on mobile | Should | Agency | CI report |
| 4.12 | Cache headers are correct for static assets | Must | Agency | Header check |
| 4.13 | 404s and redirects do not load the full app unnecessarily | Should | Agency | Network panel |

---

## 5. SEO

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 5.1 | Unique title and meta description per page/language | Must | Agency | Crawl |
| 5.2 | Canonical URLs correct | Must | Agency | Crawl |
| 5.3 | `hreflang` pairs correct, including `x-default` | Must | Agency | Crawl |
| 5.4 | Localized slugs resolve and do not redirect loops | Must | Agency | Crawl |
| 5.5 | `sitemap.xml` includes all public pages | Must | Agency | Fetch |
| 5.6 | `robots.txt` allows production and blocks preview/staging | Must | Agency | Fetch |
| 5.7 | `Restaurant` JSON-LD validates | Must | Agency | Rich Results Test |
| 5.8 | No hours in schema until verified | Must | Agency | Schema audit |
| 5.9 | No aggregate rating or review schema | Must | Agency | Schema audit |
| 5.10 | `sameAs` contains only verified social URLs | Must | Agency | Schema audit |
| 5.11 | Open Graph and Twitter cards render correctly | Must | Agency | Preview tool |
| 5.12 | Favicon and app icons load | Must | Agency | Browser check |
| 5.13 | 404 returns HTTP 404 | Must | Agency | `curl -I` |
| 5.14 | Legacy URLs redirect with 301 where applicable | Must if legacy | Agency | Redirect map |
| 5.15 | Google Business Profile website link updated after launch | Should | ALMAS | GBP check |
| 5.16 | Search Console / Bing verification set up | Should | Agency | Account access |

---

## 6. Legal and privacy

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 6.1 | Impressum published with legal name, address, contact and responsible person | Must | ALMAS / legal | Page review |
| 6.2 | Privacy policy published and covers hosting, CMS, analytics, map and email | Must | ALMAS / legal | Page review |
| 6.3 | Legal pages linked from every page footer | Must | Agency | Link check |
| 6.4 | Cookie banner only if non-essential cookies are used | Must | Agency | Cookie audit |
| 6.5 | No analytics or map request before consent, if consent is required | Must | Agency | Network panel |
| 6.6 | Font licences allow self-hosting | Must | Agency | Licence file |
| 6.7 | Every photograph has usage rights and credit where required | Must | ALMAS / agency | Asset register |
| 6.8 | No stock image presented as ALMAS food | Must | Agency | Asset audit |
| 6.9 | Data processing agreements signed with Vercel, Sanity and analytics provider | Must | Agency / ALMAS | DPA records |
| 6.10 | Privacy contact address monitored | Must | ALMAS | Test email |
| 6.11 | Terms/ordering information present only if verified | Must | ALMAS | Content audit |
| 6.12 | Accessibility statement considered (recommended, not always required) | Should | Agency | Page or note |

---

## 7. Security

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 7.1 | HTTPS works on apex and `www`; HTTP redirects | Must | Agency | `curl -I` |
| 7.2 | HSTS enabled after HTTPS verification | Must | Agency | Header check |
| 7.3 | CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` set | Must | Agency | Header check |
| 7.4 | No secrets in client bundles or repository | Must | Agency | Secret scan |
| 7.5 | Preview and revalidation endpoints protected | Must | Agency | Manual test |
| 7.6 | CMS roles follow least privilege | Must | Agency | User audit |
| 7.7 | Dependency alerts and updates enabled | Must | Agency | GitHub settings |
| 7.8 | No source maps or verbose errors in production | Must | Agency | Build check |
| 7.9 | Rate limiting on any form endpoint | Must if form | Agency | Load test |
| 7.10 | Backups tested and restorable | Must | Agency | Restore log |
| 7.11 | Uptime and error monitoring active with a named recipient | Must | Agency | Dashboard |
| 7.12 | Domain and registrar accounts use strong, unique credentials and 2FA | Must | ALMAS | Account check |

---

## 8. Deployment and operations

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 8.1 | Production deploy is green and promoted from `main` | Must | Agency | CI log |
| 8.2 | Preview deployments are `noindex` | Must | Agency | Header/meta check |
| 8.3 | DNS apex and `www` point to the correct target | Must | Agency | DNS check |
| 8.4 | TLS certificate valid and auto-renewing | Must | Agency | SSL check |
| 8.5 | Email DNS (SPF/DKIM/DMARC) correct if domain email is used | Must if email | ALMAS / IT | DNS check |
| 8.6 | Redirect map verified | Must | Agency | Crawl |
| 8.7 | Sitemap submitted | Should | Agency | Search Console |
| 8.8 | Analytics receiving data and no personal data collected | Must | Agency | Dashboard |
| 8.9 | Error tracking receiving a test event | Must | Agency | Dashboard |
| 8.10 | Uptime monitor active for home, menu and legal page | Must | Agency | Dashboard |
| 8.11 | Rollback procedure tested | Must | Agency | Dry run |
| 8.12 | CMS dataset export stored outside the CMS account | Must | Agency | Backup log |
| 8.13 | Maintenance and support contact documented | Must | Agency | Handover doc |
| 8.14 | Client owns domain, hosting, CMS and analytics accounts | Must | ALMAS | Account transfer |

---

## 9. Final content freeze and smoke test

| # | Check | Level | Owner | Evidence |
|---|---|---|---|---|
| 9.1 | Content freeze announced 24 hours before launch | Must | Agency | Email |
| 9.2 | Home DE/EN, light/dark checked on production | Must | Agency | Screenshots |
| 9.3 | Menu DE/EN, light/dark checked on production | Must | Agency | Screenshots |
| 9.4 | 60 items visible and category counts correct | Must | Agency | Automated check |
| 9.5 | Phone links tested on a real phone | Must | ALMAS / agency | Call log |
| 9.6 | Email link tested | Must | Agency | Test email |
| 9.7 | Social links open the correct profiles | Must | Agency | Manual check |
| 9.8 | Map consent works and the map loads after consent | Must | Agency | Manual check |
| 9.9 | 404 page works | Must | Agency | Manual check |
| 9.10 | All legal links work | Must | Agency | Link check |
| 9.11 | No console errors on production | Must | Agency | Browser console |
| 9.12 | No mixed-content warnings | Must | Agency | Browser console |
| 9.13 | Mobile quick-action bar does not cover content | Must | Agency | Device test |
| 9.14 | Final client sign-off recorded | Must | ALMAS | Email |

---

## 10. Handover

| # | Item | Level | Owner |
|---|---|---|---|
| 10.1 | CMS access for named editors | Must | Agency |
| 10.2 | Written editor guide (menu, prices, images, hours) | Must | Agency |
| 10.3 | 30-minute training session (recorded) | Should | Agency |
| 10.4 | Domain, hosting, CMS and analytics ownership transferred to ALMAS | Must | Agency |
| 10.5 | Credentials stored in the client's password manager | Must | ALMAS |
| 10.6 | Support and maintenance terms confirmed | Must | Both |
| 10.7 | Backup and rollback instructions | Must | Agency |
| 10.8 | Launch report: what shipped, known limitations, next steps | Must | Agency |

---

## 11. Launch day runbook

### T-7 days

- Confirm content freeze date and final approvers.
- Export the CMS dataset and store it outside the CMS account.
- Lower DNS TTL if the DNS provider allows it.
- Confirm domain, hosting and CMS account ownership.
- Confirm the rollback target (last known good deployment).
- Send the launch schedule to ALMAS and the agency team.
- Verify no open **Must** items remain.

### T-1 day

- Run the full smoke test on the release candidate.
- Re-check legal pages, menu prices, phone and email.
- Confirm monitoring and alert recipients.
- Confirm the production environment variables.
- Take a final CMS export.
- Announce the content freeze.
- Prepare the rollback command and the person who can run it.

### T-0 launch

1. Merge the approved release to `main`.
2. Wait for the production deploy to go green.
3. Point DNS to the production target (if not already done).
4. Verify HTTPS on apex and `www`.
5. Run the production smoke test: home, menu, legal, 404, DE/EN, light/dark.
6. Verify 60 items and category counts.
7. Test phone, email, social links and map consent.
8. Confirm analytics and error tracking receive data.
9. Submit the sitemap.
10. Announce launch to ALMAS.

### T+1 hour

- Check uptime, error tracking and 5xx logs.
- Spot-check the menu and both languages on a real phone.
- Confirm no mixed-content or certificate warnings.
- Confirm no unexpected redirects.

### T+1 day

- Review traffic, errors and Core Web Vitals.
- Fix any launch-blocking defect immediately.
- Collect client feedback.
- Confirm search indexing and sitemap status.

### Rollback triggers

Roll back immediately if:

- the site returns 5xx or is unreachable;
- prices or menu items are materially wrong;
- legal pages are missing or incorrect;
- a security or privacy issue is discovered;
- the mobile menu or primary navigation is broken.

Rollback is a Vercel promotion of the previous deployment plus, if needed, a CMS dataset restore. Record the incident, cause and follow-up.

---

## Go / no-go

**Launch is approved only when:**

- every **Must** item is checked or explicitly waived in writing by ALMAS;
- no placeholder image, price or social link remains;
- legal pages are published and approved;
- the final smoke test passes on production;
- ALMAS signs off in writing.

**Waivers:** any waived item must record the risk, the owner and the follow-up date. A waiver for legal, accessibility, security or unverified prices is not recommended.

---

## Sign-off

| Role | Name | Date | Signature / email |
|---|---|---|---|
| ALMAS owner | | | |
| Agency lead | | | |
| Legal reviewer | | | |
| Technical lead | | | |
