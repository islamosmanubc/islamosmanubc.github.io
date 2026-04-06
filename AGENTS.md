# AGENTS.md

This file gives project-specific guidance to coding agents working in this repository.

## Mission

Build and maintain a **dark, project-first personal portfolio website** for **Islam Osman, PhD** using **Astro** and **GitHub Pages**.

The site should feel like a premium technical portfolio:
- visually inspired by `codewithsadee/vcard-personal-portfolio`
- structurally informed by `HugoBlox Academic CV`
- optimized for project storytelling, not resume dumping

## Before making changes

1. Read `PLAN.md`.
2. Check whether the task changes scope, design direction, or content structure.
3. If the task is non-trivial, update `PLAN.md` before or during implementation.
4. Prefer small, coherent commits/patches.

## Repository overview

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
.github/workflows/
```

## Core architecture

- **Astro** for the site shell and routing
- **Astro content collections** for projects and publications
- **Tailwind CSS** for utility styling
- **Custom CSS** in `src/styles/global.css` for shared visual language
- **GitHub Pages** deployment via `.github/workflows/deploy.yml`

## Primary design rules

### Visual rules
- Dark theme by default
- Premium, rounded, glass-like cards
- Clean typography and strong spacing
- Accent color should stay in the cyan / blue family unless explicitly changed
- Motion should be subtle only
- Mobile experience must remain elegant and readable

### Product rules
- Projects are the most important content on the site
- Publications should be readable and credible, but not visually overwhelm projects
- Experience and education should support the story, not dominate it
- The homepage should quickly communicate who Islam is, what he works on, and where to go next

### Content rules
- Keep copy concise, professional, and truthful
- Prefer strong summaries over long CV bullet dumps
- For projects, always emphasize:
  - problem
  - role
  - approach
  - tools
  - outcome / impact
- Avoid filler text and generic corporate phrasing

## Editing rules

### When adding a new project
- Add a markdown file under `src/content/projects/`
- Make sure frontmatter matches the collection schema
- Add or replace a cover image in `public/images/projects/`
- If the project is important, consider making it `featured: true`

### When adding a new publication
- Add a markdown file under `src/content/publications/`
- Keep author list and venue accurate
- Use categories consistently:
  - `Journal`
  - `Conference`
  - `Accepted`
  - `Submitted`

### When updating skills / experience / education
- Update `src/data/site.ts`
- Keep entries portfolio-friendly; do not convert it into an unfiltered CV dump

## Commands

Use these commands when working locally:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## GitHub Pages notes

- Deployment is handled by `.github/workflows/deploy.yml`
- `astro.config.mjs` computes `base` dynamically for project repos
- Do not hardcode root-relative links that ignore `import.meta.env.BASE_URL`

## Linking rules

When adding internal links:
- respect `import.meta.env.BASE_URL`
- avoid plain `/about`-style hardcoded links in components or pages unless they are base-aware

## Done criteria for most tasks

A task is not done until:
1. the implementation matches the visual direction,
2. the structure stays project-first,
3. the code remains readable,
4. the site should plausibly build without breaking Astro conventions,
5. any new content is consistent with the current tone and schema.

## Safe simplifications

If a request is ambiguous, prefer:
- simpler static solutions over unnecessary interactivity
- Astro-native patterns over adding frameworks
- content collections or plain data files over ad hoc duplication

## Avoid

- heavy client-side frameworks unless explicitly justified
- server-only features that GitHub Pages cannot host
- flashy animations
- crowded layouts
- overengineering contact or CMS systems
- introducing design elements that clash with the dark premium style

## Preferred workflow for larger tasks

For larger tasks:
1. inspect the relevant page/component/content files
2. update `PLAN.md` if the work changes direction or scope
3. implement the smallest clean version first
4. refine visuals second
5. keep the result easy for a human to maintain

## Review checklist

Before finishing, verify:
- Is the result dark-theme-first?
- Are projects still visually central?
- Are mobile layouts still clean?
- Are internal links base-aware?
- Is content concise and believable?
- Did we preserve a premium vCard-like feel?
