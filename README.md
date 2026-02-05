---
title: Diaryx Site Template
author: adammharris
audience:
  - public
  - diaryx contributors on Github
  - technical markdown users
created: 10-16-25T18:59:29-06:00
updated: 10-16-25T18:59:55-06:00
format: Diaryx v0.8.0
contents: []
---

# Diaryx Site Template

This is a template for publishing [Diaryx](https://diaryx.org) workspaces as beautiful static websites using [Astro](https://astro.build/).

## Quick Start

### Option 1: Use as a Template

1. Click **"Use this template"** on GitHub to create your own site
2. Clone your new repository
3. Replace content in `src/content/diaryx/` with your Diaryx files
4. Run `bun install && bun dev`

### Option 2: Content-Only Repo with CI

Keep your markdown files in their own repo and use our reusable workflow to build and deploy:

**Your repo structure:**
```
my-diaryx-content/
├── .github/workflows/deploy.yml   # 👈 Add this file
├── index.md                       # Homepage
├── about.md
└── posts/
    └── my-post.md
```

**Deploy to Cloudflare Workers** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to Cloudflare
on:
  push:
    branches: [main]

jobs:
  deploy:
    uses: diaryx-org/diaryx-site-template/.github/workflows/build.yml@main
    with:
      deploy-target: cloudflare-workers
      cloudflare-project-name: my-diaryx-site
    secrets:
      CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
      CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

**Deploy to GitHub Pages** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

permissions:
  pages: write
  id-token: write

jobs:
  deploy:
    uses: diaryx-org/diaryx-site-template/.github/workflows/build.yml@main
    with:
      deploy-target: github-pages
```

### Option 3: Local Development

Point to any folder using an environment variable:

```bash
DIARYX_CONTENT_PATH=~/Documents/my-diary bun dev
```

## Development

```bash
bun install     # Install dependencies
bun dev         # Start dev server at localhost:4321
bun build       # Build for production
bun preview     # Preview production build
```

## Project Structure

```
src/
├── content/diaryx/     # Your Diaryx markdown files
├── layouts/            # DiaryxLayout.astro
├── pages/              # index.astro, [...path].astro
└── plugins/            # remarkTransformLinks.ts
```