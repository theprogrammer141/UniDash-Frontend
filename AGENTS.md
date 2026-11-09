# AGENTS.md

## Stack
React 19 + TypeScript + Vite, built on Refine v5 with React Router 7 (import from `react-router`, not `react-router-dom`). UI is Tailwind v4 + shadcn/ui.

## Commands
- `npm run dev` — Vite dev server (also starts Refine Devtools on port 5001).
- `npm run build` — runs `tsc` then `refine build` (Vite). Type errors block the build.
- `npm run start` — preview the production build.
- `npx tsc --noEmit` — typecheck only.
- `npx eslint src` — lint. There is no `lint` script, no test runner, no CI, and no Prettier config.

## Wiring
- `src/index.tsx` mounts `src/App.tsx`; `App.tsx` is the single place Refine providers, resources, and routes are declared. A new page needs an entry in **both** the `resources` array and the `<Routes>` block.
- Data provider: `@refinedev/rest/simple-rest` in `src/providers/data.ts`. The API URL is hardcoded in `src/providers/constants.ts`; `.env`'s `VITE_API_URL` is not read anywhere.
- No `authProvider` is wired. Sign-in/sign-up pages are unused Refine templates.
- `src/components/refine-ui/` is a local Refine UI kit (views, layout, data-table, forms) layered over `src/components/ui/` shadcn primitives.

## Styling
- Tailwind v4 is CSS-first: there is no `tailwind.config.js`. Theme tokens and custom classes live in `src/App.css`.
- shadcn config in `components.json`; `@/*` maps to `src/*` in both `tsconfig.json` and `vite.config.ts`.

## Gotchas
- Import UI primitives from `@/components/ui/*`, never from library packages (e.g. a stray `Input` from `postcss` breaks `tsc`).
- `strict` and `noUnusedParameters` are on; unused function params fail the build.
- No formatter is configured — do not reformat files wholesale; match existing style.
- Use npm (`package-lock.json`); `.npmrc` sets `legacy-peer-deps=true`.
