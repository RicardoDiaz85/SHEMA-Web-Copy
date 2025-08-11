# SHEMA Web

## Requirements
- Node 18+

## Install
```sh
npm install
```

## Develop
```sh
npm run start
```
Serves Eleventy and watches files.

## Build
```sh
npm run build
```
Outputs to `_site/`.

## Folder notes
- Source lives in the repo (includes `_includes/` and `SHEMA copy/` pages).
- Built site is `_site/` (ignored by git).

## Conventions
- Use Prettier (`.prettierrc.json`) and EditorConfig
- HTML templating via Nunjucks `{% include %}` with `_includes/header.html` and `_includes/footer.html`

## Next tasks
- [ ] Provide `./icons/apple-touch-icon.png` (180×180)
- [ ] Replace placeholder canonical/og:url with real domain
- [ ] Cloudflare Pages setup (build: `npm run build`, output: `_site/`)

## License
License/attribution placeholder.
