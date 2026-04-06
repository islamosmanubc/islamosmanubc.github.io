# Codex Build Instructions — Islam Osman Portfolio Website

## 1) Objective
Build a polished **personal portfolio / academic-project website** for **Islam Osman** using **Astro** and deploy it to **GitHub Pages**.

This site should feel like a **modern dark-mode portfolio**, primarily inspired by:
- **Primary design reference:** https://github.com/codewithsadee/vcard-personal-portfolio
- **Secondary structure/content reference:** https://github.com/HugoBlox/hugo-theme-academic-cv

The final result should **not** look like a generic blog. It should look like a **high-end AI researcher / ML engineer portfolio** that blends:
1. the dark, elegant, card-based personal aesthetic of the first repo, and
2. the academic/professional information density of the second repo.

The website should highlight:
- who I am,
- what I work on,
- the major projects I built,
- selected publications,
- CV / resume information,
- and how to contact me.

---

## 2) High-Level Direction

### Design priority
Lean **heavily toward the first repo** (`vcard-personal-portfolio`) in visual style:
- dark theme by default
- premium look
- rounded cards
- sidebar / profile feel
- elegant hover states
- project cards with icons/tags
- soft shadows / glass-like surfaces where appropriate
- strong typography hierarchy
- smooth section transitions
- responsive layout

Use the second repo (`academic-cv`) **only as a structural/content inspiration** for:
- academic credibility
- publications section
- education section
- experience section
- clean CV-like organization

### Tone of the site
The tone should feel:
- professional
- research-driven
- technical
- modern
- clean
- credible for both academia and industry

This is **not** a playful portfolio.
It should feel suitable for:
- research engineer applications
- AI/ML industry roles
- collaborators
- grant / academic visibility
- recruiters

---

## 3) Tech Stack Requirements

Use:
- **Astro**
- **TypeScript**
- **Tailwind CSS**
- **GitHub Pages** deployment via **GitHub Actions**

Recommended extras:
- Astro Content Collections for projects/publications if useful
- MD/MDX for project pages
- minimal client-side JS
- no heavy framework unless truly needed

Prefer a mostly static site for speed and simplicity.

---

## 4) Deployment Requirements

The site must be deployable to **GitHub Pages**.
Set it up so that:
- the repo can be pushed to GitHub,
- GitHub Actions builds and deploys automatically,
- it works correctly for either:
  - `username.github.io`, or
  - a project repo such as `portfolio`, with correct `base` config.

Please include:
- working `astro.config.mjs` or `astro.config.ts`
- GitHub Actions workflow for Pages deployment
- README instructions for local run + deploy
- `.nojekyll` handling if needed by the deployment setup

---

## 5) Site Information / Personal Content
Use the following information as the content basis.
Where needed, polish wording for the website, but keep it truthful and professional.

### Name
**Islam Osman, PhD**

### Core identity
AI Developer and Researcher with a Ph.D. in Computer Science from the University of British Columbia.
Works across:
- computer vision
- vision-language models
- continual/lifelong learning
- few-shot learning
- self-supervised learning
- autonomous driving
- medical imaging
- applied AI systems

### Contact
- Email: `islam.osman.ai@gmail.com`
- GitHub: `https://github.com/islamosmanubc`
- Google Scholar: include link placeholder if not available in source files
- Phone can be omitted from public UI or placed only in CV/resume download area

### Short hero summary
Create a polished version of this idea:

> AI researcher and engineer building robust computer vision and multimodal systems for autonomous driving, medical imaging, and real-world AI products.

### Longer about summary
Create a refined about section from my CV, emphasizing:
- PhD in Computer Science from UBC
- 4+ years of AI research and engineering
- work spanning lifelong learning, few-shot learning, self-supervised learning, transformer-based vision, VLMs, and LLMs
- publications, mentoring, teaching, and applied industrial work

---

## 6) Main Pages / Navigation
Build the website with these top-level sections/pages.

### A. Home
Landing page with:
- profile photo placeholder or avatar placeholder
- name and title
- short intro
- key focus areas / tags
- CTA buttons:
  - View Projects
  - View Publications
  - Download CV
  - Contact
- selected featured projects preview
- selected publications preview

### B. About
A dedicated page or section that expands on:
- background
- research themes
- industry + academic overlap
- teaching/mentoring leadership
- current role(s)

### C. Projects
This is one of the most important pages.
It should present projects as beautiful cards in the dark theme.
Each project card should show:
- title
- year / duration
- short subtitle
- category tags
- tech stack chips
- short impact/result sentence
- image/illustration placeholder
- click-through to a dedicated project page

### D. Project Detail Pages
Each major project should have its own page.
Each page should support:
- overview
- problem statement
- my role
- method / system design
- tools / stack
- outcomes / impact
- optional figures, architecture diagram, screenshots, video/demo links
- related publication link if available

### E. Publications
Present selected publications in a clean academic format.
Support:
- featured publications near top
- full list grouped by category if practical:
  - journal papers
  - conference papers
  - accepted / submitted (optional, if included)

It is okay to show a curated subset on the main UI and optionally a fuller list on a dedicated page.

### F. Experience
Clean timeline or card layout for:
- Machine Learning Engineer — Matt3r.AI
- Postdoctoral Fellow — UBC Okanagan
- AI Researcher — Interior Health / UBC
- Data Scientist Intern — Scotiabank
- Machine Learning Engineer — Irwin’s Safety & Industrial Labor Services

### G. Education
Include:
- PhD, UBC
- MSc, Ain Shams University
- BSc, Ain Shams University

### H. CV / Resume
Provide:
- a download button for PDF CV
- optional inline embed section if elegant
- concise summary of skills and highlights

### I. Contact
Simple, elegant contact page/section with:
- email
- GitHub
- Google Scholar
- optional LinkedIn placeholder if later added

---

## 7) Content Prioritization
This is a **project-first website**, not just a resume page.
The most important emphasis should be:
1. **Projects**
2. **Research/publications credibility**
3. **Professional story / expertise**
4. **Experience timeline**

Do not let experience or education visually overpower the projects page.

---

## 8) Featured Projects to Include
Create polished entries for the following projects based on my CV. Improve phrasing for web presentation.

### 1. Road Occupancy-Grid Generation Toolkit (Matt3r.AI) — 2026–Present
Key points to reflect:
- GUI for generating and editing road occupancy-grid outputs
- controls for run/pause/resume/stop
- large-scale JSON visualizer/editor
- ROADSv2 occupancy-grid generation from lanes, masks, depth, tracking
- post-processing for propagation and refinement
- auxiliary pipelines like relative-speed labeling and lane-counting

Possible framing:
A production-oriented tooling system for generating and editing structured bird’s-eye-view road scene representations from driving perception outputs and telemetry.

### 2. Video Retrieval App (Matt3r.AI) — 2025
Key points:
- semantic search over driving videos
- query by natural language, tags, or reference video
- sentence-transformer embeddings + weighted tag similarity
- Gemini-assisted tag extraction from free text
- Postgres metadata, telemetry enrichment, S3 side-camera loading
- GUI-based workflow

Possible framing:
A multimodal retrieval system for driving video archives that enables engineers to find relevant footage quickly using semantic search and metadata-aware ranking.

### 3. Driving Scenario Detection Pipeline (Matt3r.AI) — 2024
Key points:
- front-camera scenario detection
- fused lane marks, detections, lane semantics, depth, optical flow
- FSM-based reasoning + multi-object tracking
- output event windows, scenario bitmasks, weighted confidence
- multiple run modes + optional visualization/video writing

Possible framing:
An end-to-end scenario detection pipeline for driving videos, combining perception signals and rule-based temporal reasoning to detect interpretable traffic events.

### 4. Video Annotation Tool (Matt3r.AI) — 2024
Key points:
- manual scenario annotation into event intervals
- Tkinter tool with Excel output
- timeline scrubbing, label selection, warnings for already-annotated videos
- v2 improvements: delete support, checkpointing, keyboard shortcuts

Possible framing:
An annotation interface designed to accelerate scenario labeling workflows for driving video datasets.

### 5. CT Scanner Quality Control (Interior Health / UBC) — 2023
Key points:
- medical imaging QC
- curated public medical imaging data
- self-supervised pretraining with ViT
- improved domain generalization
- model achieved 12% improvement over standard baselines
- resulted in abstracts and paper output

Possible framing:
A vision-transformer-based quality control system for CT scanner calibration assessment, combining self-supervised learning and medical imaging domain adaptation.

### 6. PhD Thesis: Continual Foreground Segmentation with Limited Data — 2019–2023
Key points:
- continual/lifelong learning for segmentation
- limited labeled data
- robust foreground segmentation
- multiple peer-reviewed outputs and presentations

Possible framing:
A long-term research program on robust foreground segmentation under limited-data conditions, emphasizing continual learning, adaptation, and generalization.

### 7. MSc Thesis: 3D Indoor Scene Understanding in Image Sequence — 2015–2018
Key points:
- object detection, tracking, segmentation for RGB-D scene understanding
- peer-reviewed outputs

Possible framing:
Graduate research on RGB-D indoor scene understanding, integrating detection, tracking, and segmentation for structured spatial interpretation.

---

## 9) Additional Content Blocks
Include additional site blocks where suitable:

### Research Interests / Expertise
Represent as chips, pills, or compact cards:
- Computer Vision
- Vision-Language Models
- Continual / Lifelong Learning
- Few-Shot Learning
- Self-Supervised Learning
- Autonomous Driving
- Medical Imaging
- Transformer-based Vision Models
- Applied AI Systems
- MLOps / Production AI

### Technical Skills
Show elegantly, not as a giant resume dump.
Group into concise categories:
- Languages
- ML / DL
- Computer Vision
- Computer Graphics
- HPC
- MLOps / Tooling

### Awards / Recognition
Optionally include a short section with:
- Graduate Student Award, UBC
- Student of the Year Excellence Award, UBC
- Best Teaching Assistant Award, Ain Shams University

### Editorial / Service
Optional but nice:
- Reviewer for IJCV, IEEE TAI, etc.
- CVPR / ECCV / NeurIPS reviewer
- conference chair roles

---

## 10) Publications Strategy
I have many publications. Do not dump everything in a visually overwhelming way on the homepage.

Recommended approach:
- show **3–6 selected featured publications** on the homepage or publications landing page
- provide a dedicated publications page for the broader list
- visually prioritize publications that are strongest / most relevant to my current profile

Suggested featured publication themes:
- continual / lifelong learning
- medical imaging foundation/self-supervised work
- driving / video understanding
- foreground segmentation / VOS

Use elegant citation cards with:
- title
- venue / year
- authors
- link placeholders
- tag pills

---

## 11) Visual Design Requirements

### Theme
- dark theme by default
- no light-theme-first design
- optional theme toggle if easy, but not necessary

### Color direction
Use a refined dark palette, e.g.:
- deep charcoal / near-black background
- slightly lighter card surfaces
- one elegant accent color (cyan, blue, or muted gold are acceptable)
- subtle gradients allowed, but keep them professional

### Layout inspiration from first repo
Capture the feeling of:
- sidebar/profile presence
- card-based main content
- premium modern personal site
- compact but beautiful information density

### Typography
Use clean, modern typography.
Avoid overly decorative fonts.
The typography should feel premium and readable.

### Motion
Use subtle motion only:
- card hover lift
- fade-in / slide-in on sections
- smooth anchor navigation
- no flashy animations

### Responsiveness
Must look excellent on:
- desktop
- tablet
- mobile

On mobile:
- simplify layout
- maintain dark elegant feel
- ensure project cards remain readable

---

## 12) Reusable Components to Build
Please implement reusable Astro components such as:
- `Layout`
- `SidebarProfile`
- `Navbar`
- `SectionHeader`
- `Hero`
- `ProjectCard`
- `ProjectGrid`
- `PublicationCard`
- `TimelineItem`
- `SkillGroup`
- `ContactCard`
- `Footer`

Optional nice extras:
- `TagPill`
- `StatCard`
- `FeaturedWorkCarousel` (only if tasteful and lightweight)

---

## 13) Suggested Folder Structure
A structure like this is preferred:

```text
/
  public/
    resume/
    images/
    icons/
  src/
    components/
    content/
      projects/
      publications/
    layouts/
    pages/
      index.astro
      about.astro
      projects.astro
      publications.astro
      experience.astro
      contact.astro
    styles/
      global.css
  .github/
    workflows/
      deploy.yml
  astro.config.mjs
  tailwind.config.*
  package.json
  README.md
```

If a cleaner Astro structure is better, use it.

---

## 14) Content Modeling
Use content files so the site is easy to maintain.

### For projects
Use structured frontmatter like:
- title
- slug
- year
- period
- subtitle
- summary
- featured (boolean)
- tags
- stack
- cover image
- links (github/demo/paper if available)
- order

### For publications
Use structured frontmatter like:
- title
- year
- venue
- authors
- category
- featured
- links
- tags
- order

This should make it easy for me to add/edit projects later without editing layout code.

---

## 15) Copywriting Guidance
Please improve wording to sound polished and concise.
Avoid resume-style bullet overload on the front page.
Convert resume content into **clean product/research portfolio language**.

Good style examples:
- “Built an end-to-end driving scenario detection pipeline that fused depth, optical flow, lane semantics, and object tracking for interpretable event inference.”
- “Developed a semantic retrieval interface for driving video archives using natural-language queries, metadata signals, and embedding-based ranking.”

Avoid weak phrasing like:
- “Responsible for…”
- “Worked on…”
- “Helped with…”

Use confident but honest wording.

---

## 16) Homepage Composition Recommendation
Recommended homepage flow:
1. Hero / intro
2. Expertise / focus chips
3. Featured projects
4. Selected publications
5. Experience snapshot
6. Education snapshot
7. Contact CTA

Keep the homepage curated and not too long.
Use “View all” links for deeper pages.

---

## 17) Project Page Composition Recommendation
Each project detail page should ideally include:
1. Title + subtitle
2. Hero image / visual placeholder
3. Overview
4. Challenge / problem
5. Approach
6. Tools / stack
7. Outcomes / impact
8. Links / related work
9. Optional gallery / figures

Where real images are unavailable, use tasteful placeholders or abstract visual blocks.

---

## 18) GitHub Pages / Astro Implementation Notes
Please ensure the implementation correctly handles:
- GitHub Pages deployment
- base path config for project repos
- static asset paths
- SEO basics (title, description, Open Graph)
- favicon
- accessible contrast in dark mode
- clean metadata per page

Also add:
- `sitemap`
- `robots.txt` if straightforward

---

## 19) README Requirements
The generated repo should include a README that explains:
- what the site is
- how to install dependencies
- how to run locally
- how to build
- how to deploy to GitHub Pages
- where to edit projects/publications/content
- how to change base URL for `username.github.io` vs project repo deployment

---

## 20) Acceptance Criteria
The work is complete when:
- the site is built in Astro
- styling strongly reflects the first repo’s dark premium feel
- content structure benefits from the second repo’s academic organization
- the site highlights my projects more than a normal CV would
- GitHub Pages deployment works through GitHub Actions
- it is responsive and polished
- project pages are easy to extend
- homepage looks impressive enough to share with recruiters, hiring managers, collaborators, and labs

---

## 21) Important Design Guardrails
Do **not**:
- make it look like a generic blog
- make it look like a plain PDF CV converted to HTML
- overload the homepage with too many publication entries
- use bright playful colors
- use excessive animation
- make the academic section dominate the portfolio feel

Do:
- make the projects visually compelling
- keep the UI elegant and modern
- make it feel custom, not template-ish
- preserve strong professional credibility

---

## 22) Optional Stretch Features
If time allows and the implementation remains clean, add:
- search/filter for projects by tags
- smooth anchor nav
- publication filters
- project tag filters
- downloadable CV button fixed in sidebar/header
- subtle scroll progress indicator

These are optional, not required.

---

## 23) Personal Positioning Summary for Design Decisions
When uncertain, optimize for this positioning:

> Islam Osman is an AI researcher and engineer with strong academic depth and hands-on industrial delivery, specializing in computer vision, multimodal AI, continual learning, autonomous driving, and medical imaging.

The site should make that identity immediately obvious.

---

## 24) Final Request to Codex
Please generate the full Astro project with:
- complete file structure
- content files
- styles
- components
- pages
- GitHub Actions deployment workflow
- README

Prefer production-quality code organization and maintainability.
