# Agent instructions

Static family recipe catalog: Vite, TypeScript, React, xState, CSS modules. Product scope and information architecture live in `design/DESIGN_DOCUMENT.md` — follow that for features and non-goals. This file is how to work in the repo.

## Repo structure

```
src/
  main.tsx                 # app entry
  components/              # React views: render actor state, send events
  machines/                # xState machines and actors (all app state)
  data/                    # recipes, ingredient catalog, tag derivation
  *.module.css             # styles colocated with the UI they style
design/
  DESIGN_DOCUMENT.md       # product source of truth
```

- Colocate tests next to the code they cover (`*.test.ts`).
- Keep recipe and ingredient data typed and structured. Do not store a whole recipe as one unmanaged markdown blob.
- The current placeholder counter machine is not part of the product; replace it when building the real app.

## Commands

| Command             | Purpose                                |
| ------------------- | -------------------------------------- |
| `npm install`       | Install dependencies                   |
| `npm run format`    | Format with Oxfmt                      |
| `npm run lint`      | Lint with Oxlint                       |
| `npm run typecheck` | Typecheck (`tsc --noEmit`)             |
| `npm run test`      | Run Vitest once                        |
| `npm run validate`  | format, then lint, typecheck, and test |

Run `npm run validate` before considering work done.

Also available: `npm run dev` (Vite), `npm run build` (typecheck + static `dist/`). CI uses `npm run fmt:check` instead of writing formatted files.

## Code conventions

- **Comments:** use them sparingly. Prefer clear names and structure. Comment only when the _why_ is not obvious from the code.
- **DRY:** extract shared logic. Do not duplicate tag derivation, filter rules, or machine behavior.
- **State:** all app state lives in xState machines / actors. Do not use `useState()` (or other React state hooks) for app state. React is for rendering and displaying actor snapshots and for sending events. Navigation, filters, theme, font size, and Random belong in machines.
- **Styling:** CSS modules only (`*.module.css`), colocated with the component. Theme and type-scale tokens go on `:root` / `html` (`data-theme`, `data-font-size`).
- **Dependencies:** add open-source packages only when needed. License must be MIT or similarly permissive. No proprietary or copyleft-restrictive packages.
