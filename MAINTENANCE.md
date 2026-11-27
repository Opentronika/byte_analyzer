# 2026 Maintenance & Security Plan

This document records the 2026 security/maintenance pass for Byte Analyzer.
The goal is to remove known vulnerabilities and modernize the toolchain **without
changing the application's behavior**.

## Scope

- Fix all findings reported by `npm audit` (including transitive dependencies).
- Keep the UI/UX and byte-conversion logic unchanged.
- Keep the static GitHub Pages deployment working.
- Add guardrails so the project does not silently rot again.

## Baseline (before)

- `npm audit`: **28 vulnerabilities** (1 critical, 17 high, 8 moderate, 2 low).
- Critical/high items included Astro, Vite, Vue server renderer, `zod`,
  `sharp`, `svgo`, `postcss`, `browserslist`, `js-yaml`, `nanoid`,
  `picomatch`, `fast-uri`, `defu`, `devalue`, `h3`, `smol-toml`,
  `source-map-js`, and `astro-robots-txt`.
- Toolchain: Astro 6.0.5, `@astrojs/vue` 6.0.1, Vite 7.3.1, Vitest 4.1.0,
  Vue 3.5.30, `astro-robots-txt` 1.0.0.
- Verification baseline: 23/23 tests passing, production build passing.

## Why major upgrades were required

Several Astro advisories are only fixed in the 7.x line (for example the
spread-attribute XSS and the View Transition XSS fixes). Staying on Astro 6
cannot clear the audit, so the project moves to the latest Astro 7 release.
The migration guide for v7 was reviewed; this project does not use the removed
features (`@astrojs/db`, exposed transition internals, remark/rehype plugins)
and its templates are valid HTML, so the migration is low risk.

## Changes

### Dependencies

| Package | Before | After | Reason |
| --- | --- | --- | --- |
| `astro` | 6.0.5 | 7.4.13 | Critical XSS/SSRF advisories fixed in 7.x |
| `@astrojs/vue` | 6.0.1 | 7.1.6 | Astro 7 compatibility |
| `vue` | (transitive) 3.5.30 | 3.5.46 | `@vue/server-renderer` XSS fix |
| `vite` | 7.3.1 | 8.3.8 (via Astro 7) | Dev-server file-read / traversal fixes |
| `vitest` | 4.1.0 | 4.1.12 | `@vitest/mocker` path traversal / code injection fixes |
| `@astrojs/check` | 0.9.8 | 0.9.12 | Updates `yaml` toolchain (stack-overflow fix) |
| `tailwindcss` / `@tailwindcss/vite` | 4.1.18 | 4.3.5 | Current 4.x maintenance release |
| `primeicons` | 7.0.0 | 8.0.2 | Current icon release |
| `material-dynamic-colors` | 1.1.4 | **removed** | Unused dependency (no imports in `src/`) |
| `astro-robots-txt` | 1.0.0 | **removed** | Depends on vulnerable `zod` 3.x with no fixed release |

The generated `robots.txt` is now a static `public/robots.txt` with byte-for-byte
identical content, so SEO behavior is unchanged.

### Configuration

- `astro.config.mjs`: removed the `astro-robots-txt` integration; set
  `compressHTML: true` to preserve the Astro 6 whitespace behavior after the
  v7 default changed to `'jsx'`.
- `package.json`: added `private`, `engines` (Node >= 22.23.4), `test:watch`,
  and an `audit` script. `test` now runs once (`vitest run`) for CI use.

### CI / ongoing maintenance

- Updated GitHub Actions to current releases (`checkout` v7.0.1,
  `setup-node` v7.1.0, `withastro/action` v6.1.4, `deploy-pages` v5.0.1),
  pinned each to its full commit SHA, and pinned the build to Node 26.
- Added a dependency-audit job so new high/critical advisories fail CI.
- Added `.github/dependabot.yml` for weekly npm and GitHub Actions updates
  (including SHA-pinned actions) and monthly submodule updates.

## Verification

- `npm audit` must report 0 vulnerabilities.
- `npm test` (23 tests) must pass.
- `npm run build` must succeed and produce the same page/assets.
- `dist/robots.txt` must match the previous output.

## Follow-ups (not changed in this pass)

These are intentionally left alone to avoid touching functionality or the
`src/opentronika_tools` submodule:

- The shared submodule's `target="_blank"` links could add
  `rel="noopener noreferrer"`. Modern browsers already imply `noopener`, and the
  fix belongs in the `opentronika_tools` repository.
- `src/classes_types/getcodestring.js` is unused and imports non-existent
  `src/data/charsA0*.json` files. It can be deleted once confirmed unused.
- `src/layouts/seo.astro` has a duplicate `<meta charset>` and builds the
  `og:image` URL by concatenating an `ImageMetadata` object. Both are harmless
  today; fix them in a separate content/SEO change.
- The working tree currently has CRLF line endings while the Git index uses LF.
  Adding a `.gitattributes` and renormalizing is recommended in a dedicated
  commit to keep diffs reviewable.

## Recurring schedule

- **Weekly**: Dependabot PRs for npm and Actions.
- **Monthly**: `npm audit` + `npm outdated` review.
- **Quarterly**: re-run this upgrade pass (Astro/Vite/Vue majors, Node LTS).
- **Every release**: `npm test` and `npm run build` must be green.
