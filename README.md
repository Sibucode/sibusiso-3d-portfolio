# Sibusiso Nxumalo — 3D Portfolio

A responsive software engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and React Three Fiber.

## Features

- Motion-aware 3D system core as a site-wide background, deferred until the portfolio is visible
- Skippable 3D treasure-room introduction, loaded on entry with a lightweight CSS fallback
- Animated technology constellation with categorized engineering skills
- Navi Q&A grounded in locally curated CV and project facts; no external AI service
- CV-aligned academic, project, security, and community journey
- Searchable and filterable project explorer
- Project case studies with verified project details
- Direct links to the public repositories for showcased projects
- Downloadable CV and contact links
- Reduced-motion support and keyboard-accessible controls

## Run locally

Requires Node.js 22.

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deployment

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml` and publishes the built site to GitHub Pages.

Both the source repository and the published site are public.
