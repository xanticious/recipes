# Family Recipes

A static family cookbook: what we actually cook, order, and keep in the kitchen. Vite, TypeScript, React, xState, CSS modules. The product scope lives in `design/DESIGN_DOCUMENT.md`.

This is a **catalog**, not a weekly planner. Household diet notes use **HA** (House Approved): we can serve it without interfering with our food allergies, and it does not taste bad to all of us.

## Main features

- **Meal Ideas** — “What should we have for dinner?” Everyday plates with simple names, not chef tasting menus. A plate is the whole sitting (protein, sides, drink), tagged by occasion and by the world regions where people actually eat it.
- **Restaurants** — “What restaurants are in Davis County, Utah?” A local directory for trying a place we did not already know about.
- **Ingredients** — “A comprehensive list of ingredients that recipes can be made from.” Gluten, lactose, and FODMAP notes help us notice when a recipe uses something we cannot eat, and they sometimes suggest something new to try.
- **Recipes** — “A list of recipes for common foods and meals.” When a dish normally uses an allergy ingredient, we keep two recipes instead of one recipe with swap notes — for example **Taco Soup** and **Taco Soup (HA)**.
- **Eat Out** — “What are our favorite restaurant orders?” After spending so long hunting for menu items that fit allergies and diet, this is also “what can I actually order there?”
- **Guide** — “A simple guide for what allergies we have and common substitutions.”

## Meal Style Guide

Meal Ideas are **named plates**, not ingredient lists. “Eggs, butter, bread” is shopping. The catalog wants the meal someone would actually say out loud.

**Split when the cooking method changes the meal.** Same groceries can be several plates:

| Ingredients         | Separate Meal Ideas                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Eggs, butter, bread | Scrambled eggs and toast; fried eggs and toast; omelette and toast; toad in the hole; breakfast sandwich |

**Do not split tiny variations.** “Hard-boiled egg crumbles on bread” is the same groceries, but it is not a meal people plan. Leave it out. Garnish, brand, and mild doneness (over easy vs over medium) stay on one card unless the household would use a different name.

**Rule of thumb**

1. Would we list this as its own dinner on a normal weeknight? If yes, it can be its own idea.
2. Is the other version just a topping, a side swap, or a leftover of the same plate? Keep one idea and put the swap under substitutions or related meals.
3. Regional names count when they are how people order or cook at home (chicken parma in Australia vs chicken parmesan with pasta; beans on toast; congee; feijoada).
4. A plate may be common in more than one region. Tag all of them. The region filter keeps plates tagged for that place.

Starter lists come from national diet surveys under `design/*-analysis/` (NHANES and others). Those files are inspiration. The live catalog in `src/data/mealIdeas.ts` is curated by hand.

## Scripts

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Vite dev server                          |
| `npm run build`    | Typecheck and emit a static `dist/` site |
| `npm run preview`  | Serve the production build locally       |
| `npm run test`     | Run Vitest once                          |
| `npm run lint`     | Oxlint                                   |
| `npm run format`   | Oxfmt                                    |
| `npm run validate` | Format, lint, typecheck, and test        |

## GitHub Pages

1. Push to `main`.
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The deploy workflow builds with `BASE_URL=/<repo>/` so asset paths work on project Pages (`https://<user>.github.io/<repo>/`).
