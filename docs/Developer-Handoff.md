# SHEMA-Web — Developer Handoff & Learning Notes

## Changelog
- 2025-08-16 — **docs**: updated changes in docs (38f005f)

- 2025-08-16 — **feat**: add support page (aba64b1)

*(Newest entries first)*
### 2025-08-15 — Merge pull request #28 from RicardoDiaz85/codex/repair-git-hooks-in-husky
- Commit: 2ec1dd6df4665ff9e754d3b1428d948922fdc77f
- Files changed:
  - A	.husky/_/husky.sh
  - A	.husky/commit-msg
  - M	.husky/post-commit
  - A	.husky/pre-commit
  - M	package.json
  - A	scripts/fix-husky.mjs
- Notes:
  chore: repair husky git hooks


## Repo Structure
```

/_includes/               # shared templates (head, seo, header, footer, layouts)
/site/                    # source pages & assets (Eleventy input)
├─ css/
│   ├─ styles.css
│   ├─ components/nav.css
│   ├─ components/footer.css
│   └─ _pages/ (explore.css, faq.css, why.css)
├─ js/nav.js
├─ images/...
├─ icons/...
├─ favicon.ico
├─ shin-favicon.svg
├─ manifest.webmanifest
├─ _data/site.json      # site-level data (url, themeColor, etc.)
├─ sitemap.xml.njk
├─ 404.html
├─ index.html           # + other pages (about, blog, explore, faq, etc.)
/_site/                   # build output (gitignored)
.eleventy.js
package.json
README.md

````

## How Eleventy Works Here
- **Input:** `site/` (configured in `.eleventy.js`)
- **Includes:** `_includes/` for shared Nunjucks/Liquid templates
- **Layouts:** `layout: layouts/base.njk` in page front matter wraps content
- **Shared Head/SEO:** centralized in `_includes/head.njk` (and `_includes/seo.njk` if present)
- **Header/Footer:** `{% include "header.html" %}` and `{% include "footer.html" %}` in the base layout
- **Per-page CSS:** add in front matter:
  ```yaml
  pageCss:
    - "/css/_pages/explore.css"
  ```

(Use **root-relative** paths like `/css/...`.)

## CSS Load Order (enforced in head include)

1. `/css/styles.css`
2. `/css/components/nav.css`
3. any `pageCss` from front matter
4. `/css/components/footer.css`

## Nav Script

* Loaded **once** from the shared footer include:

  ```html
  <script defer src="/js/nav.js"></script>
  ```
* Remove page-level duplicates if any appear in content files.

## Favicons, Manifest & Canonical

* Root-relative references in head include:

  * `/favicon.ico`, `/shin-favicon.svg`, `/icons/apple-touch-icon.png`
  * `/manifest.webmanifest`
  * `<meta name="theme-color" content="{{ site.themeColor }}">`
  * `<link rel="canonical" href="{{ site.url | trimEnd('/') }}{{ page.url }}">`
  * `<meta property="og:url" content="{{ site.url | trimEnd('/') }}{{ page.url }}">`

## Local Development

```bash
# install deps
npm install

# run dev server (watches files)
npm run dev
# or: npm start

# production build
npm run build
# output to _site/
```

## Cloudflare Pages

* **Build command:** `npm run build`
* **Output directory:** `_site/`
* Add analytics snippet in footer (deferred) when ready.

## Common Tasks

* **Create a new page:** add `site/new-page/index.html` with front matter:

  ```yaml
  ---
  layout: layouts/base.njk
  title: "New Page | SHEMA"
  description: "Short description."
  pageCss:
    - "/css/_pages/new-page.css"   # optional
  ---
  ```
* **Add page-specific CSS:** create `/site/css/_pages/your-page.css` and reference via `pageCss` (root-relative).
* **Add images:** put under `/site/images/...` (Eleventy passthrough copies to `/images/...`).

## Glossary

* **Eleventy (11ty):** static site generator.
* **Nunjucks:** templating language (used in `_includes/` and layouts).
* **Front matter:** YAML block at top of a file configuring page data.
* **Passthrough copy:** Eleventy feature copying assets as-is to `_site/`.
* **Canonical URL:** the preferred URL for a page.
* **OG (Open Graph) tags:** metadata for rich previews on social networks.

## Known Gaps / Next Iteration

* Replace icon placeholders with final artwork.
* Add `/robots.txt` and tune sitemap if needed.
* Fill out remaining blog posts and add `og:image` assets.
* (Optional) Add QA scripts (`linkinator`, `html-validate`) and CI.

---
