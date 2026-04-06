# Islam Osman Portfolio

A dark, project-first personal portfolio for **Islam Osman, PhD**, built with **Astro** and designed for **GitHub Pages** deployment.

Visual direction is based primarily on `codewithsadee/vcard-personal-portfolio`, with information architecture influenced by `HugoBlox/hugo-theme-academic-cv`.

## What is included

- Dark vCard-style layout with sidebar profile and glass-like cards
- Homepage curated around projects, publications, experience, education, and contact
- Dedicated pages for:
  - `/about/`
  - `/projects/`
  - `/projects/[slug]/`
  - `/publications/`
  - `/experience/`
  - `/education/`
  - `/cv/`
  - `/contact/`
- Astro content collections for projects and publications
- GitHub Pages deployment workflow in `.github/workflows/deploy.yml`
- Base-aware links for both user sites and project-repo deployments

## Requirements

- Node.js `20.19+` or `22.12+`
- npm

## Install

```bash
npm install
```

This generates `package-lock.json` and installs the exact pinned dependency set used by the site.

## Run locally

```bash
npm run dev
```

Astro will print the local URL in the terminal.

## Validate

```bash
npm run check
npm run build
```

Optional preview after build:

```bash
npm run preview
```

## GitHub Pages deployment

Deployment is already configured in `.github/workflows/deploy.yml`.

### Steps

1. Push the repository to GitHub.
2. In **Settings -> Pages**, set the source to **GitHub Actions**.
3. Push to `main`.

The workflow uses `withastro/action` and deploys the generated static site automatically.

## Base URL behavior

`astro.config.mjs` computes the base path dynamically:

- If the repo is `username.github.io`, the site is served from the domain root.
- If the repo is a project repo such as `portfolio`, the site uses `/<repo>/` as `base`.

It reads:

- `GITHUB_REPOSITORY_OWNER`
- `GITHUB_REPOSITORY`
- optional `SITE_URL`

Do not hardcode root-relative internal links that bypass `import.meta.env.BASE_URL`.

## Content editing

### Profile, experience, education, skills, awards, service, and contact links

Edit:

```text
src/data/site.ts
```

### Projects

Edit or add:

```text
src/content/projects/
```

Each project entry includes structured frontmatter for:

- `title`
- `slug`
- `year`
- `period`
- `subtitle`
- `summary`
- `featured`
- `tags`
- `stack`
- `impact`
- `cover`
- `github`
- `demo`
- `paper`
- `order`

### Publications

Edit or add:

```text
src/content/publications/
```

Publication categories currently used:

- `Journal`
- `Conference`
- `Accepted`
- `Submitted`
- `Abstract`

### CV PDF

Replace the public resume at:

```text
public/resume/Islam_Osman_CV.pdf
```

## Project structure

```text
public/
  images/
  resume/
src/
  components/
  content/
    projects/
    publications/
  data/
  layouts/
  pages/
  styles/
.github/
  workflows/
astro.config.mjs
package.json
```

## Current placeholders and optional refinements

- Project artwork is currently abstract SVG placeholder art.
- The site is production-ready, but stronger project screenshots and custom Open Graph visuals would improve presentation further.
