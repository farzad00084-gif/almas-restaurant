# Production — Stages 4–5

This folder contains the production plan for the ALMAS Restaurant website. The Stage 5 application itself lives in [`../../site/`](../../site/); see its [`README.md`](../../site/README.md) for setup and the content gate.

**Status:** Stage 4 complete 18 November 2026. Stage 5 implementation in progress locally since 19 November 2026. No deployment.
**Date:** 19 November 2026

---

## Documents

| Document | Purpose |
|---|---|
| [`STAGE-4-PRODUCTION-PLAN.md`](./STAGE-4-PRODUCTION-PLAN.md) | Stack, architecture, content workflow, deployment, QA, timeline and risks |
| [`CONTENT-MODEL.md`](./CONTENT-MODEL.md) | CMS schema, validation rules and migration from the prototype |
| [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md) | Go/no-go checklist for launch |
| [`IMPLEMENTATION-BACKLOG.md`](./IMPLEMENTATION-BACKLOG.md) | Epic-by-epic Stage 5 backlog with estimates and acceptance criteria |
| [`CLIENT-CONTENT-REQUEST.md`](./CLIENT-CONTENT-REQUEST.md) | The facts, files and access still needed from ALMAS |

---

## Recommended stack at a glance

- **Framework:** Next.js (App Router) + TypeScript
- **Design:** the approved CSS system ported directly; no redesign, no Tailwind rewrite
- **CMS:** Sanity, with a small bilingual schema
- **Hosting:** Vercel, EU region (Infomaniak as the Swiss-residency fallback)
- **Repository:** private GitHub, protected `main`, preview deployments
- **Analytics:** Vercel Analytics or Plausible; no Google Analytics or ad pixels
- **Fonts:** self-hosted Instrument Serif, DM Sans and IBM Plex Mono
- **Map:** click-to-load OpenStreetMap; no third-party tracking or map request before consent
- **Languages:** German default, English secondary, localized URLs
- **Theme:** light default, dark optional, persisted

The client can veto or change any recommendation before launch. No vendor account, domain change, repository or deployment has been created.

---

## What Stage 4 covers

1. Production stack and hosting.
2. Page, route and component architecture.
3. Bilingual content model and CMS workflow.
4. Image, font and map strategy.
5. Accessibility, performance, SEO, security and privacy requirements.
6. Test strategy and launch checklist.
7. Delivery sequence, responsibilities, timeline and budget ranges.
8. Remaining client content and access.

---

## What is still blocking public launch

- Client approval of the stack, CMS and hosting.
- A named content owner and target launch date.
- Domain/DNS and hosting access.
- Verified menu prices and descriptions.
- Opening hours (or a decision to omit them).
- Email, social URLs and legal details.
- Real photography for launch.
- A decision on Afghan positioning.
- Pending account access for Sanity, Git, Vercel and analytics.

See [`CLIENT-CONTENT-REQUEST.md`](./CLIENT-CONTENT-REQUEST.md) for the complete list and [`IMPLEMENTATION-BACKLOG.md`](./IMPLEMENTATION-BACKLOG.md) for current status.

---

## What Stage 5 builds

- Production home page, menu, Impressum, privacy policy and 404.
- German and English routes with localized slugs.
- Light and dark themes with a single persisted preference.
- Sanity Studio, schemas, roles, preview and content import.
- Self-hosted fonts, responsive images and a consent-gated map.
- SEO metadata, structured data, sitemap and robots.
- Automated accessibility, performance and end-to-end tests.
- Deployment, monitoring, backups and handover.

Implemented locally in preview mode: home, menu, legal routes, 404,
localized routing, themes, self-hosted fonts, consent-gated map, SEO routes
and the content gate. Sanity, CI, automated test suites, monitoring and
deployment remain open.

Local implementation proceeds under D-033. No public deployment happens until
the strict production content check passes and the launch checklist is signed
off.
