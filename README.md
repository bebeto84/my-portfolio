# Miguel’s portfolio

A minimal Angular application in an Nx workspace. The home page contains draft
placeholder content.

## Setup

Use [nvm](https://github.com/nvm-sh/nvm) to select the pinned Node version:

```sh
nvm install
nvm use
npm install --global npm@12.2.0
npm ci
```

The Angular CLI is installed locally; a global Angular CLI is unnecessary.

## Commands

```sh
npm start         # Development server at http://localhost:4200
npm run build    # Production build
npm test         # Unit tests, once
npm run lint     # ESLint
npm run check    # Lint, tests, and production build
```

All scripts run through Nx. Production files are written to
`dist/apps/portfolio/browser`. This first milestone uses client rendering;
prerendered route HTML and static-host routing are the next milestone.

## Foundation

- One app: `apps/portfolio`, with standalone components, zoneless Angular,
  strict TypeScript, router configuration, and SCSS.
- Angular’s esbuild builder, Vitest with jsdom, ESLint, and Prettier.
- Local Nx task caching. GitHub Actions runs a clean install and `npm run check`.
- No extra libraries or E2E framework until there is functionality to justify them.

## Pinned toolchain

| Tool                    | Version |
| ----------------------- | ------- |
| Node                    | 22.23.3 |
| npm                     | 12.2.0  |
| Nx and Nx plugins       | 23.3.0  |
| Angular and Angular CLI | 22.2.2  |
| TypeScript              | 6.0.3   |
| RxJS                    | 7.8.2   |
| Vitest                  | 4.1.11  |

All direct dependencies have exact versions in `package.json`; transitive versions
are recorded in `package-lock.json`. `.npmrc` enables exact saves and engine checks.
The npm version avoids the dependency resolver crash encountered with npm 10.9.9.
Required dependency install scripts have version-specific approvals in `package.json`.
Nx 23.3.0 pins `undici` 7.29.0; a scoped override selects the patched 7.29.1.
Revisit that override when upgrading Nx.

Compatibility was checked against the installed package metadata and the
[Angular version requirements](https://angular.dev/reference/versions).
NgRx 22.0.1 supports Angular 22, but installation waits until the visitor-state
milestone chooses Store + Effects or SignalStore. Prerendering, company themes,
ratings, favourites, and deployment also remain future milestones.
