# Recipes

Static Vite + TypeScript app with xState, CSS modules, Oxlint, Oxfmt, and Vitest.

## Scripts

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Vite dev server                          |
| `npm run build`   | Typecheck and emit a static `dist/` site |
| `npm run preview` | Serve the production build locally       |
| `npm run test`    | Run Vitest once                          |
| `npm run lint`    | Oxlint                                   |
| `npm run fmt`     | Oxfmt                                    |

## GitHub Pages

1. Push to `main`.
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The deploy workflow builds with `BASE_URL=/<repo>/` so asset paths work on project Pages (`https://<user>.github.io/<repo>/`).
