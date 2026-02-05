---
title: Diaryx Site
author: adammharris
audience:
  - public
  - diaryx contributors on Github
  - technical markdown users
created: 10-16-25T18:59:29-06:00
updated: 10-16-25T18:59:55-06:00
format: Diaryx v0.8.0
---

# Diaryx Site

This is a template for publishing [Diaryx](https://diaryx.org) workspaces as beautiful static websites using [Astro](https://astro.build/).

## Quick Start

### Use as a Template

1. Click **"Use this template"** on GitHub to create your own site
2. Clone your new repository
3. Replace content in `src/content/diaryx/` with your Diaryx files
4. Run `bun install && bun dev`

### Use Your Own Content Folder

Point to any Diaryx workspace folder using an environment variable:

```bash
# Use a local folder
DIARYX_CONTENT_PATH=~/Documents/my-diary bun dev

# Build with custom content
DIARYX_CONTENT_PATH=~/Documents/my-diary bun build
```

### Use a Git Submodule

Keep your content in a separate repository:

```bash
# Remove example content
rm -rf src/content/diaryx

# Add your content repo as a submodule
git submodule add https://github.com/YOUR/diaryx-workspace src/content/diaryx
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
├── content/
│   └── diaryx/        # Your Diaryx markdown files go here
├── layouts/
│   └── DiaryxLayout.astro  # Main layout with metadata pill
├── pages/
│   ├── index.astro    # Homepage (renders diaryx.mdx)
│   └── [...path].astro # Dynamic routes for all entries
└── plugins/
    └── remarkTransformLinks.ts  # Converts .md links to web paths
```

## Contribute

We are looking for people to contribute to the Diaryx effort! See the [contribute page](./src/content/diaryx/contribute.md) for more information.
