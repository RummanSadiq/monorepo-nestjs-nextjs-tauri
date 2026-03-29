# Monorepo Boundary Rules

This document defines what belongs where in this monorepo. It is the authoritative reference for both humans and AI agents.

## What belongs in `apps/`

Each app is an independent deployable unit. Apps own:

- All business logic (API endpoints, services, controllers)
- UI components and pages
- App-specific configuration (env vars, runtime config)
- App-specific middleware, guards, interceptors
- Database models and migrations
- State management
- Routing

**Rule: if code is used by only one app, it stays in that app.**

## What belongs in `packages/`

Shared packages are strictly limited to:

| Package                   | Contents                                   | Runtime deps        |
| ------------------------- | ------------------------------------------ | ------------------- |
| `@repo/typescript-config` | Base and framework-specific tsconfig files | None                |
| `@repo/eslint-config`     | Base and framework-specific ESLint configs | ESLint plugins only |
| `@repo/prettier-config`   | Formatting rules                           | None                |
| `@repo/shared-types`      | TypeScript interfaces and type aliases     | None (type-only)    |

### What is allowed in `@repo/shared-types`

- API response envelopes (`ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`)
- Session/auth shapes (`Session`)
- Event payloads (for future cross-app event contracts)
- Small DTOs used by multiple apps

### What is NOT allowed in `@repo/shared-types`

- Database models or Prisma types
- Business logic or validation
- Service classes
- Large domain objects
- Anything with runtime dependencies

## What must NEVER be a shared package

Do not create shared packages for:

- **UI components** — keep in `apps/web` or `apps/desktop`
- **Backend services** — keep in `apps/api`
- **Utilities or helpers** — keep app-local; no `packages/utils`
- **Environment configuration** — each app manages its own env
- **State management** — app-specific concern
- **Database layer** — belongs in `apps/api`

## Rules for adding a new shared package

1. The code must be needed by 2+ apps
2. It must not contain business logic
3. It must not have heavy runtime dependencies
4. It must be documented in `AGENTS.md`, `README.md`, and this file
5. The PR description must explain why an existing package cannot be extended instead
6. Prefer extending an existing package over creating a new one

## TypeScript configuration chain

```
@repo/typescript-config/base.json
  ├── nextjs.json  → apps/web/tsconfig.json
  ├── nestjs.json  → apps/api/tsconfig.json
  └── tauri.json   → apps/desktop/tsconfig.json
```

Base config enforces: `strict`, `noImplicitOverride`, `noUncheckedIndexedAccess`, `isolatedModules`, `skipLibCheck`, `forceConsistentCasingInFileNames`.

Framework configs add framework-specific options (target, module, libs, decorators, etc.).

App tsconfigs add only path-related overrides (`outDir`, `rootDir`, `paths`).

## ESLint configuration

```
@repo/eslint-config/index.ts  (base: eslint + typescript-eslint recommended)
  ├── next.ts   → adds @next/eslint-plugin-next
  ├── nest.ts   → adds NestJS-friendly rule overrides
  └── tauri.ts  → base config under tauri entry point
```

Each app imports its framework-specific config and adds file scoping and ignores.

## Prettier

Configured at the root via `"prettier": "@repo/prettier-config"` in the root `package.json`. No per-app prettier configs. Run `pnpm format` to format all files.

## Dependency direction

```
apps/web         → @repo/typescript-config, @repo/eslint-config
apps/api         → @repo/typescript-config, @repo/eslint-config
apps/desktop     → @repo/typescript-config, @repo/eslint-config
root             → @repo/prettier-config
@repo/shared-types → @repo/typescript-config

(apps will add @repo/shared-types when they consume its types)
```

Packages must never depend on apps. Apps must never depend on other apps.
