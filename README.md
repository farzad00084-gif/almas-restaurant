# ALMAS Restaurant — Website

Website project for **ALMAS Restaurant**, Bahnhofstrasse 92, 5000 Aarau,
Switzerland. The approved “Facets” design pairs a Porcelain light theme with
an Obsidian dark theme, editorial menus and diamond geometry.

> **Status: Stage 5, preview only.** The site contains unverified menu prices,
> licensed stock placeholders, missing contact details and draft legal copy.
> It must not be publicly launched until the strict content gate passes and the
> client supplies verified content. See `site/README.md`.

## Repository layout

| Path | Contents |
|---|---|
| `site/` | Next.js 16 production application (App Router, TypeScript) |
| `prototypes/` | Approved Stage 3 hybrid/menu prototypes and archived directions |
| `docs/` | Research, transcribed menu source, prototype screenshots and production plan |
| `assets/` | Client source media and licensed stock placeholders |
| `PROJECT-NOTES.md` | Project status, confirmed facts, decision log and stage record |

Large reference material — the client source video/photos, research screenshots
and prototype screenshots — is intentionally excluded from Git because of its
size. It remains in the local workspace and is not needed to build the site.
The stock images used by the prototypes and the production app are included.

## Run locally

```bash
cd site
npm install
npm run dev
```

Open <http://localhost:3000> (redirects to `/de`). Full setup, routes, content
workflow and deployment rules are in [`site/README.md`](site/README.md).

## Quality and content gate

```bash
cd site
npm run lint
npm run typecheck
npm run build
npm run validate:content
npm run validate:content:strict
```

The preview build passes. The strict production gate intentionally fails on
eight launch blockers: unverified prices, stock images, missing email and
hours, draft legal copy, missing production domain, preview content mode and
disabled indexing. Nothing may be published until those are resolved.

## Production references

- [`docs/production/STAGE-4-PRODUCTION-PLAN.md`](docs/production/STAGE-4-PRODUCTION-PLAN.md)
- [`docs/production/IMPLEMENTATION-BACKLOG.md`](docs/production/IMPLEMENTATION-BACKLOG.md)
- [`docs/production/LAUNCH-CHECKLIST.md`](docs/production/LAUNCH-CHECKLIST.md)
- [`docs/production/CLIENT-CONTENT-REQUEST.md`](docs/production/CLIENT-CONTENT-REQUEST.md)

The visual direction is fixed. Production changes go through change control and
must not redesign the approved hybrid.
