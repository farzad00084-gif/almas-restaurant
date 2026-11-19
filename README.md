# ALMAS Restaurant — Website

Website project for **ALMAS Restaurant**, Bahnhofstrasse 92, 5000 Aarau,
Switzerland. The approved “Facets” design pairs a Porcelain light theme with
an Obsidian dark theme, editorial menus and diamond geometry.

> **Status: Stage 5, preview only.** The site contains unverified menu prices,
> licensed stock placeholders, a provisional WhatsApp ordering target, missing
> contact details and draft legal copy. It must not be publicly launched until
> the strict content gate passes and the client supplies verified content. See
> `site/README.md`.

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
workflow, the WhatsApp ordering flow and deployment rules are in
[`site/README.md`](site/README.md).

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
ten launch blockers: unverified prices, missing per-dish photos, stock images,
missing email, provisional WhatsApp number, missing hours, draft legal copy,
missing production domain, preview content mode and disabled indexing. Nothing
may be published until those are resolved.

## Deploy on Vercel

This repository keeps the Next.js app in `site/`, so the Vercel project must use
that folder as its root.

1. Import the repository into Vercel.
2. Set **Root Directory** to `site`.
3. Keep the framework preset as **Next.js**.
4. For a review/staging deployment, leave the environment variables unset. The
   build runs in preview mode with `noindex` and the preview ribbon.
5. For a public production deployment, set all variables from
   `site/.env.example` and keep the default build command `npm run build`.
   The content validator switches to strict mode whenever
   `NEXT_PUBLIC_CONTENT_MODE=production`, so the build fails until every launch
   blocker is resolved. `npm run build:production` is the equivalent local
   command.
6. Never enable `NEXT_PUBLIC_ALLOW_INDEXING` without production content mode,
   and never connect the final domain before the launch checklist is signed off.

## Production references

- [`docs/production/STAGE-4-PRODUCTION-PLAN.md`](docs/production/STAGE-4-PRODUCTION-PLAN.md)
- [`docs/production/IMPLEMENTATION-BACKLOG.md`](docs/production/IMPLEMENTATION-BACKLOG.md)
- [`docs/production/LAUNCH-CHECKLIST.md`](docs/production/LAUNCH-CHECKLIST.md)
- [`docs/production/CLIENT-CONTENT-REQUEST.md`](docs/production/CLIENT-CONTENT-REQUEST.md)

The visual direction is fixed. Production changes go through change control and
must not redesign the approved hybrid.
