# SHEMA-Web — Product Requirements & Vision

## Changelog
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


## Purpose & Vision
- One-paragraph mission of SHEMA (AI-assisted, Jewish-context Bible study; fast, clean, accessible marketing site for early access/waitlist).

## Success Criteria
- Fast page loads; valid HTML; correct canonical/OG/Twitter tags; working navigation and footer; deploy cleanly on Cloudflare Pages.

## Current Scope (MVP)
- Static marketing pages built with Eleventy (11ty), shared header/footer, centralized head/SEO, and per-page CSS where needed.

## Non-Functional Goals
- Performance: lightweight CSS/JS, lazy-load non-critical images.
- Accessibility: semantic HTML, alt text, focus-visible nav.
- Maintainability: single source of truth for head/SEO in `_includes/`, DRY includes, page front matter for per-page config.

## Pages: Status Snapshot
- / (Home) — ✅ content + shared CSS; OG/Twitter/canonical centralized.
- /about/ — ✅ content scaffold.
- /blog/ — ✅ index styled; has card CSS (blog.css).
- /blog/001-why-jewish-context/ — ✅ stub.
- /contact-us/ — ✅ scaffold.
- /explore/ — ✅ includes page CSS (`/css/_pages/explore.css`).
- /faq/ — ✅ includes page CSS (`/css/_pages/faq.css`).
- /privacy/ — ✅ scaffold.
- /support/ — ✅ scaffold.
- /thank-you/ — ✅ scaffold.
- /why-jewish-context/ — ✅ includes page CSS (`/css/_pages/why.css`).
- /404.html — ✅ present.
- /sitemap.xml — ✅ generated at build from template.

## SEO Plan
- Canonical + `og:url` computed from `site.url + page.url`.
- Unique titles/descriptions per page via front matter.
- One `og:image`/`twitter:image` per page when available.
- Sitemap generated at build; robots.txt to be added.

## Assets & Icons
- Favicons referenced root-relative:
  - `/favicon.ico`
  - `/shin-favicon.svg`
  - `/icons/apple-touch-icon.png` (180×180)
- Placeholders currently in repo; replace with real assets before launch.

## Tech Stack
- Eleventy (11ty), Nunjucks templates, vanilla CSS/JS.
- Cloudflare Pages (build: `eleventy`, output: `_site/`).

## Deployment Plan
1) Connect GitHub repo to Cloudflare Pages.
2) Build command: `npm run build` (i.e., `eleventy`).
3) Output directory: `_site/`.
4) Add Cloudflare Web Analytics (defer script) in shared footer if desired.
5) Configure custom domain + HTTPS.

## Open Tasks (Pre-Launch)
- [ ] Replace icon placeholders with real files.
- [ ] Add `/robots.txt`.
- [ ] Verify unique `title`/`description` on each page.
- [ ] Image pass: width/height, `loading="lazy"` for non-critical.
- [ ] Optional QA: link check + HTML validate locally.
- [ ] Lighthouse pass in Chrome DevTools.

---
test
