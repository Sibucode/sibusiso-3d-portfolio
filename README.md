# Sibusiso Nxumalo — 3D Portfolio

A responsive software engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and React Three Fiber.

## Features

- Motion-aware 3D system core as a site-wide animated background
- Skippable 3D treasure-room introduction with an animated guide
- Animated technology constellation with categorized engineering skills
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
