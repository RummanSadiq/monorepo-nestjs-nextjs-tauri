# Agent Guidelines

## Repo purpose

This is a Turborepo + pnpm monorepo for a B2B SaaS platform. It contains three independent apps: `web` (Next.js), `api` (NestJS), and `desktop` (Tauri).

## Key rules

1. **Keep apps isolated.** Do not import code from one app into another. Each app has its own dependencies, TypeScript config, and lint config.

2. **Keep edits scoped.** Changes should target a single app unless the PR explicitly requires cross-app coordination.

3. **Do not introduce shared packages without justification.** Sharing is intentionally minimal. If you think a shared package is needed, explain why in the PR description.

4. **TypeScript only.** All application code must be `.ts` or `.tsx`. No `.js`/`.jsx` source files.

5. **Use app-specific commands.** The primary workflow is `pnpm dev:web`, `pnpm dev:api`, `pnpm dev:desktop` — not running everything at once.

## App details

| App | Framework | Port | Build output |
|-----|-----------|------|-------------|
| `apps/web` | Next.js 15 (App Router) | 3000 | `.next/` |
| `apps/api` | NestJS 11 (SWC) | 3001 | `dist/` |
| `apps/desktop` | Tauri 2.x + Vite | 5173 (Vite) | native binary |

## Shared packages

| Package | Purpose |
|---------|---------|
| `packages/eslint-config` | Shared ESLint base config (typescript-eslint recommended rules) |

ESLint config is the only shared package. Apps import `baseConfig` from `@repo/eslint-config` in their `eslint.config.ts`. Each app still owns its file scoping and ignores.

## Turborepo

Root scripts use `turbo run <task> --filter=<app>`. Tasks defined in `turbo.json`: `dev`, `build`, `lint`, `typecheck`, `clean`.

Note: Desktop builds (`tauri build`) disable turbo caching via `apps/desktop/turbo.json` because Rust compilation is platform-specific and not safely cacheable by turbo.
