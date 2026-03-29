# Monorepo

A Turborepo + pnpm monorepo containing web, API, and desktop applications for a B2B SaaS platform.

## Why this monorepo exists

- One GitHub repository for all apps
- Atomic PRs across apps when needed
- Independent deployability per app
- Low coupling, minimal sharing by default
- Predictable structure for humans and AI agents

## Structure

```
apps/
  web/       → Next.js (TypeScript, App Router)
  api/       → NestJS (TypeScript, SWC)
  desktop/   → Tauri (Rust + TypeScript + Vite)
packages/
  typescript-config/ → Shared TypeScript configs (base, nextjs, nestjs, tauri)
  eslint-config/     → Shared ESLint configs (base, next, nest, tauri)
  prettier-config/   → Shared Prettier formatting rules
  shared-types/      → Type-only API envelopes and session shapes
```

## Prerequisites

- Node.js 20+
- pnpm 10+
- Rust toolchain (for the desktop app) — [install](https://rustup.rs)

## Setup

```sh
pnpm install
```

## Development

App-specific commands are the primary workflow:

```sh
pnpm dev:web        # Next.js on port 3000
pnpm dev:api        # NestJS on port 3001
pnpm dev:desktop    # Tauri desktop app (Vite on port 5173)
```

## Build

```sh
pnpm build:web
pnpm build:api
pnpm build:desktop
```

## Lint & Typecheck

```sh
pnpm lint:web       # or pnpm lint (all apps)
pnpm lint:api
pnpm lint:desktop

pnpm typecheck:web  # or pnpm typecheck (all apps)
pnpm typecheck:api
pnpm typecheck:desktop
```

## Formatting

Prettier is configured at the root via `@repo/prettier-config`.

```sh
pnpm format         # format all files
pnpm format:check   # check formatting (CI)
```

## Monorepo philosophy

- Apps are isolated — no cross-imports between apps
- Sharing is intentionally minimal; business logic lives in the API
- Shared packages are limited to configuration and type contracts
- If code is used by only one app, it stays in that app
- See `docs/monorepo-boundaries.md` for full rules

## Branching

Trunk-based development with `main` as the only long-lived branch. Short-lived feature branches merge back to `main`. Staging and production are deployment environments, not branches.

## Deployment

- **web** → Vercel
- **api** → Docker on custom hosting (Dockerization in a later PR)
- **desktop** → Native app builds via Tauri

## What's next

Later PRs will add environment configuration, Docker for the API, CI/CD, testing, auth, and deeper platform capabilities.
