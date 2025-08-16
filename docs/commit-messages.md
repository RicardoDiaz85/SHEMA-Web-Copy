# Conventional Commit Messages — Cheat Sheet

**Format**

- **type**: what kind of change (see list below)
- **scope** (optional): the area you changed (e.g., `footer`, `about`, `css`)
- **description**: present tense, concise

---

## Common Types

- **feat** — a new feature
  `feat: add support page`

- **fix** — a bug fix
  `fix(footer): correct donation link`

- **docs** — documentation only
  `docs: update README with SEO checklist`

- **style** — formatting/visual changes; no logic (spacing, colors, lint)
  `style(nav): tighten mobile padding`

- **refactor** — code change that doesn’t fix a bug or add a feature
  `refactor: simplify header markup`

- **perf** — performance improvement
  `perf: compress hero images`

- **test** — add or update tests
  `test: add unit tests for sitemap`

- **chore** — build tools, deps, housekeeping
  `chore: bump eleventy version`

- **ci** — CI/CD pipeline changes
  `ci: fix Netlify build`

- **build** — changes to build system or dependencies
  `build: update lightningcss`

- **revert** — revert a previous commit
  `revert: feat: add support page`

> Tip: Avoid `wip` on main branches. If you need it, use feature branches and squash before merging.

---

## Good Examples

- `feat: add about page`
- `fix(footer): correct link target`
- `docs: add commit message cheat sheet`
- `style: unify button border-radius`
- `refactor(nav): remove duplicate aria-label`
- `perf: lazy-load below-the-fold images`
- `chore: update prettier config`

## Bad Examples (will be rejected)

- `updated stuff`
- `Fixing things`
- `feat add page` (missing colon)
- `feat:`

---

## Extended Format (optional body/footer)

type(scope?): short description

Longer explanation if needed (what/why, not how).

BREAKING CHANGE: describe the breaking change and migration steps
Closes #123


Use `BREAKING CHANGE:` only when something will break for users or other devs.

4) (Optional) Link it from the README

Add a short section to your README.md:

### Commit Messages
We use Conventional Commits. See [docs/commit-messages.md](./docs/commit-messages.md) for examples.

5) Quick self-test

After your PR merge and the config file is present:

git add .
git commit -m "docs: add commit message cheat sheet"   # should pass


If you ever need to bypass (e.g., emergency), you can still do:

git commit -m "temp" --no-verify


…but with the cheat sheet + standard rules, you shouldn’t need to.