# PLAN.md

## Goal

Maintain this repository as the canonical Astro portfolio site for **Islam Osman, PhD**: a dark, project-first website that builds cleanly, deploys to GitHub Pages, and presents academic credibility without collapsing into a resume dump.

## Current implementation state

- The Astro app now lives at the repository root and is the only active site location.
- The visual direction is aligned to the approved dark vCard-style reference: glass-like cards, sidebar profile, cyan/blue accents, strong spacing, and subtle motion only.
- The site is structured as a professional portfolio with:
  - Home
  - About
  - Projects listing
  - School projects archive
  - Individual project pages
  - Publications
  - Experience
  - Education
  - CV
  - Contact
- Content collections are configured with Astro's current `glob` loader API.
- Publications now match the CV summary: **25 papers + 2 refereed abstracts**.
- Root validation is complete:
  - `npm install`
  - `npm run check`
  - `npm run build`

## Product direction

### Primary visual reference

Keep the visual feel close to **codewithsadee/vcard-personal-portfolio**:
- dark theme by default
- premium rounded cards
- sidebar/profile presence
- elegant information density
- subtle hover and polish only

### Secondary structural reference

Use **HugoBlox Academic CV** as a structural influence only:
- publications should stay readable and credible
- projects must remain the visual priority
- experience, education, awards, and CV material should support the story, not dominate it

## Implementation status

### Phase 1 - Canonical app root
- [x] Update root docs and plan to reflect the real starting state
- [x] Promote the Astro app from `islam-portfolio-astro/` to the repository root
- [x] Preserve root instruction files as canonical documentation
- [x] Remove the nested app from the active workflow

### Phase 2 - Data and content reconciliation
- [x] Reconcile `src/data/site.ts` with the resume PDF
- [x] Fix placeholder/starter copy and mojibake across pages and components
- [x] Add missing publication entries so counts match the CV summary
- [x] Extend publication categories to include `Abstract`
- [x] Keep project pages structured around problem, role, approach, tools, and outcomes

### Phase 3 - Pages and structure
- [x] Keep existing pages for home, about, projects, project detail, publications, experience, and contact
- [x] Add dedicated `education` and `cv` pages
- [x] Add a dedicated `school-projects` archive page sourced from vetted JSON summaries
- [x] Update navigation, footer, and cross-links to include the new routes
- [x] Ensure every internal link remains base-aware

### Phase 4 - Polish and production readiness
- [x] Refine the homepage composition to match the approved brief
- [x] Improve accessibility basics: landmarks, skip link, focus states, contrast, and alt text
- [x] Add SEO basics: page metadata, Open Graph tags, sitemap continuity, and `robots.txt`
- [x] Keep the visual language dark, premium, responsive, and maintainable

### Phase 5 - Validation and documentation
- [x] Install dependencies at the repository root and generate `package-lock.json`
- [x] Run `npm run check`
- [x] Run `npm run build`
- [x] Fix build issues until the root site builds successfully
- [x] Update `README.md` with exact root-level run, build, deploy, and content-editing instructions

## Optional follow-up refinements

- Add new project case studies and supporting figures as additional industry or research work is prepared for the public portfolio.
- Replace the current SVG project artwork with real screenshots, figures, or short demo media.
- Add richer Open Graph artwork if the site will be widely shared on social platforms.
- Refine project narratives further as public-facing case studies if more detail becomes available.

## Working rule for coding agents

For any non-trivial change:
1. Read `AGENTS.md` first.
2. Keep this plan aligned with the real implementation state.
3. Implement in small, verifiable steps.
4. Preserve the project-first, dark-theme-first direction.
