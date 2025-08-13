# SHEMA Web

Static site built with [Eleventy (11ty)] using build-time includes.

## Prerequisites

* Node.js 18+

## Setup

```bash
npm install
```

## Local development

```bash
npm run dev
```

This serves the site and watches for changes. Output is written to `_site/`.

## Production build

```bash
npm run build
```

## Structure

* `_includes/` — shared templates/partials (header, footer, head, layouts)
* `site/` — page content, assets, css/js
* `_site/` — generated output (ignored by git)

## Project Docs

- [PRD](docs/PRD.md)
- [Developer Handoff](docs/Developer-Handoff.md)

## Notes

* `nav.js` is loaded once from the shared footer include. Do not add page-level `<script src="./js/nav.js">` tags.
