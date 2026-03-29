# Agent Guidelines

## Repo purpose

This is a Turborepo + pnpm monorepo for a B2B SaaS platform. It contains three independent apps: `web` (Next.js), `api` (NestJS), and `desktop` (Tauri).

## Key rules

1. **Keep apps isolated.** Do not import code from one app into another. Each app has its own dependencies, TypeScript config, and lint config.

2. **Keep edits scoped.** Changes should target a single app unless the PR explicitly requires cross-app coordination.

3. **Do not introduce shared packages without justification.** Sharing is intentionally minimal. If you think a shared package is needed, explain why in the PR description.

4. **TypeScript only.** All application code must be `.ts` or `.tsx`. No `.js`/`.jsx` source files.

5. **Use app-specific commands.** The primary workflow is `pnpm dev:web`, `pnpm dev:api`, `pnpm dev:desktop` — not running everything at once.

6. **Do not move business logic into shared packages.** Business logic belongs in the API. Shared packages are for configuration and type contracts only.

7. **Prefer app-local implementation.** If code is used by only one app, keep it inside that app.

8. **Update docs when adding new packages.** Any new shared package must be documented in this file, `README.md`, and `docs/monorepo-boundaries.md`.

## App details

| App            | Framework               | Port        | Build output  |
| -------------- | ----------------------- | ----------- | ------------- |
| `apps/web`     | Next.js 15 (App Router) | 3000        | `.next/`      |
| `apps/api`     | NestJS 11 (SWC)         | 3001        | `dist/`       |
| `apps/desktop` | Tauri 2.x + Vite        | 5173 (Vite) | native binary |

## Shared packages

| Package                   | Purpose                                                             |
| ------------------------- | ------------------------------------------------------------------- |
| `@repo/typescript-config` | Shared TypeScript base + framework-specific configs                 |
| `@repo/eslint-config`     | Shared ESLint base + framework-specific configs (next, nest, tauri) |
| `@repo/prettier-config`   | Shared Prettier formatting rules                                    |
| `@repo/shared-types`      | Type-only API envelopes, session shapes, and shared DTOs            |

### Package rules

- All apps extend `@repo/typescript-config` via their `tsconfig.json`
- All apps use framework-specific ESLint configs (`@repo/eslint-config/next`, `/nest`, `/tauri`)
- Prettier runs from root via `pnpm format` — no per-app prettier configs
- `@repo/shared-types` is type-only with zero runtime dependencies — no build step
- New shared packages require strong justification in the PR description
- See `docs/monorepo-boundaries.md` for full boundary rules

## Turborepo

Root scripts use `turbo run <task> --filter=<app>`. Tasks defined in `turbo.json`: `dev`, `build`, `lint`, `typecheck`, `format:check`, `clean`.

Note: Desktop builds (`tauri build`) disable turbo caching via `apps/desktop/turbo.json` because Rust compilation is platform-specific and not safely cacheable by turbo.
