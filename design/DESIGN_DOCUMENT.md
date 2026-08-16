# Family Recipes — Design Document

A static, family-only catalog for everyday meals and a few restaurant orders. This document is the source of truth for v1 scope and information architecture.

## 1. Purpose

Build a simple website this household can use to browse practical recipes and pick something to cook or order. We already have a separate system for writing the weekly meal plan. This site does not replace that. It is the recipe book: curated, readable on a phone or a laptop, and honest about which recipes fit our usual diet constraints.

v1 already has a large catalog. It can keep growing without changing the page model.

## 2. Goals

- Keep the first version a **catalog**, not a planner.
- Show recipes a family can actually make: grocery-store ingredients, no chef technique, reasonable prep.
- Mix **core rotation** staples with a smaller set of **special occasion** meals.
- Include a few **eat-out** orders (fast food and restaurants) as catalog entries, not as recipes with ingredients.
- Tag a recipe **HA** when it already fits this household as written. Do not hide conversions behind in-page ingredient swaps.
- When both a regular version and an HA version exist, keep them as **separate recipes** and link them under Related recipes.
- Make recipe instructions pleasant to read: well-spaced typography, light and dark themes, and a readable markdown-style layout.
- Work well on desktop and mobile.

## 3. Non-goals (v1)

The following are out of scope for the first release. Several are desirable later.

- Weekly or daily meal planner
- Importing recipes from files, URLs, or other apps
- Exporting the catalog
- User accounts, logins, or per-person profiles
- Favorites / “we made this”
- Recipe photos
- Shopping lists
- Scaling servings up or down
- Browser editing of recipes (the catalog is curated in the repo)
- Dynamic ingredient substitution on a recipe page
- Allergy-type tags, FODMAP subgroup tags, and eating-pattern tags (vegan, keto, paleo, carnivore)

## 4. Users and access

The audience is this household. The site is a public static site (GitHub Pages is already wired in this repo). There is no authentication. Household preferences that matter in the browser — theme and font size — are stored locally on that device.

Do not put household first names in the product, the copy, or the code. The diet tag is **HA**.

## 5. Product principles

1. **Practical first.** If it takes a specialty store, a long marinade, or restaurant technique, it is not a core recipe.
2. **HA means “fits as written.”** Not “could fit after you pick swaps.”
3. **Two recipes, not one recipe with chips.** A regular Fettuccine Alfredo and an HA Fettuccine Alfredo are siblings, linked as related recipes.
4. **Readable over clever.** The recipe page should feel like a good markdown viewer: clear hierarchy, generous spacing, nothing cramped.
5. **Honest eat-out entries.** A restaurant order is a description of what we actually get, not a fake ingredient list.

## 6. Site map and navigation

Every page shares a top bar.

| Control          | Placement          | Behavior                                        |
| ---------------- | ------------------ | ----------------------------------------------- |
| Site name / Home | Left               | Goes to the landing page                        |
| Explore Recipes  | Center / nav links | Recipe index                                    |
| Ingredients      | Center / nav links | Ingredient catalog                              |
| Guide            | Center / nav links | Single kitchen guide                            |
| Random           | Center / nav links | Opens the random picker, then a matching recipe |
| Font size        | Menu bar           | Small / Medium / Large                          |
| Theme            | Top right          | Light / Dark toggle                             |

### 6.1 Landing — “Family Recipes”

- Short welcome: this is our family cookbook for weeknight cooking, special occasions, and a few takeout orders.
- Links to **browse by meal** (Breakfast, Lunch, Dinner, Snack, Dessert).
- A link to **Ingredients**.
- A link to the **Guide**.
- Do not explain tagging, FODMAP science, or categories on the landing page.

### 6.2 Explore Recipes

A list of recipe names, grouped so the catalog stays coherent as it grows.

**Primary grouping:** meal type

- Breakfast
- Lunch
- Dinner
- Snack
- Dessert

**Secondary grouping inside each meal type:** cuisine

- American
- Mexican
- Italian
- Asian
- Mediterranean
- Indian
- Other

**Filters:**

- Meal type (multi-select, for jumping in from the landing page)
- **Where:** all / eat out / home cooking (exclusive)
- **HA:** all / HA / not HA (exclusive)
- Cuisine (multi-select)
- Name search

Special-occasion recipes stay in the same lists. They are marked with an asterisk beside the name. Eat-out entries and HA are marked with small chips. Health rating is a color cue (see §9).

No favorites in v1.

### 6.3 Ingredients

A grocery-style catalog of every ingredient in the book.

**Grouping:**

- Meat
- Seafood
- Eggs
- Dairy
- Vegetables
- Fruit
- Herbs
- Grains
- Beans and plant proteins
- Fats and oils
- Sweeteners
- Spices
- Pantry

**Filters:**

- **HA:** all / HA / not HA (exclusive). HA on an ingredient means the food itself fits the household constraints in §9.1 (derived from catalog flags and the household avoid list). It is not the same as “used in an HA recipe.”
- Name search

Click an ingredient to expand the list of **home recipes** that use it. Eat-out entries have no ingredient list, so they do not appear here. If nothing in the book uses that ingredient yet, show “No recipes yet.”

### 6.4 Recipe detail

Shown when a recipe is chosen from Explore or Random.

**Home recipes**, in order:

1. Title
2. Special-occasion mark, if any
3. HA chip (if tagged) and health rating
4. Meal type and cuisine
5. Prep time, cook time, total time
6. Servings
7. Ingredients with amounts (from structured data)
8. Instructions: a numbered list of steps
9. Notes, if any
10. Related recipes, if any

**Eat-out entries**, in order:

1. Title
2. HA chip (if tagged) and health rating
3. Meal type and cuisine
4. The order: a short description of what to ask for
5. Notes, if any
6. Related recipes, if any

No photos in v1. No in-page ingredient substitution.

Instructions and eat-out descriptions are rendered as formatted markdown: headings if needed, lists, emphasis, and enough vertical rhythm that the page is comfortable to cook (or order) from.

### 6.5 Random

Available from the top bar on every page.

The reader may:

- Leave meal type and cuisine **unfiltered**, or pick one of each
- Choose all / eat out / home cooking
- Choose all / HA / not HA
- Click Random to open one matching recipe
- Click Random again to get another match from the same filters (avoid showing the same recipe twice in a row when others exist)

If nothing matches, say so and leave the filters in place so they can loosen them.

### 6.6 Guide

One page (`#/guide`). Household cooking notes, not medical advice. It explains:

- What **HA** means
- Gluten, lactose, and high-fat meals
- The FODMAP leftover issues after reintroduction (fructose, fructans from garlic/onion/inulin, sorbitol, mannitol)
- Practical substitutions
- How to convert a regular recipe into a separate HA recipe
- Fiber, protein, calcium, and iron ideas

Old per-tag allergy and eating-pattern guides are out of scope.

## 7. Recipe information model

Recipes are a **hardcoded, curated collection** in the repo. The display layer should not be “one blob of markdown” for the facts we need to query.

### 7.1 Shared fields

| Field              | Type               | Notes                                                      |
| ------------------ | ------------------ | ---------------------------------------------------------- |
| `id`               | string             | Stable slug, used in the URL                               |
| `title`            | string             | Display name. HA versions may include `(HA)` in the title  |
| `mealType`         | enum               | `breakfast` \| `lunch` \| `dinner` \| `snack` \| `dessert` |
| `cuisine`          | enum               | See §8.2                                                   |
| `specialOccasion`  | boolean            | Shows asterisk / icon                                      |
| `ha`               | boolean            | Hand-maintained. True if the entry fits as written         |
| `healthRating`     | enum               | `healthy` \| `moderate` \| `unhealthy`                     |
| `eatOut`           | boolean            | Discriminant for home vs restaurant                        |
| `relatedRecipeIds` | list, optional     | Sibling recipes (classic ↔ HA, or a related order)         |
| `notes`            | markdown, optional | Extra prose                                                |

### 7.2 Home recipe

| Field          | Type             | Notes                             |
| -------------- | ---------------- | --------------------------------- |
| `eatOut`       | `false`          |                                   |
| `prepMinutes`  | number           | Active prep                       |
| `cookMinutes`  | number           | Oven, simmer, etc.                |
| `totalMinutes` | number, optional | Derived as prep + cook if omitted |
| `servings`     | number           | As written                        |
| `ingredients`  | list             | Structured lines; see §7.4        |
| `steps`        | list             | Markdown text                     |

### 7.3 Eat-out entry

| Field         | Type     | Notes                                                       |
| ------------- | -------- | ----------------------------------------------------------- |
| `eatOut`      | `true`   |                                                             |
| `description` | markdown | What to order. No ingredients list, no steps, no cook times |

### 7.4 Ingredient line

| Field          | Type             | Notes                           |
| -------------- | ---------------- | ------------------------------- |
| `ingredientId` | string           | Key into the ingredient catalog |
| `amount`       | number \| null   | Null when “to taste”            |
| `unit`         | string \| null   | `cup`, `tbsp`, `g`, `clove`     |
| `preparation`  | string, optional | `diced`, `softened`             |
| `optional`     | boolean          | Optional garnish                |

No substitution groups. No `{{slot}}` placeholders in steps.

### 7.5 Ingredient catalog

A separate list of known foods, not copied into every recipe.

| Field   | Type             | Notes                                                                        |
| ------- | ---------------- | ---------------------------------------------------------------------------- |
| `id`    | string           | e.g. `garlic`, `cheddar`, `honey`                                            |
| `name`  | string           | Display name                                                                 |
| `kind`  | enum             | `produce`, `dairy`, `grain`, `protein`, `fat`, `sweetener`, `spice`, `other` |
| `flags` | set              | Problem flags for authors and the Guide; see §9.3                            |
| `notes` | string, optional | Household caveats                                                            |

`ha` on a recipe is **hand-tagged**, not computed at runtime. Catalog flags help when writing or converting a recipe. They are not shown as filter chips.

## 8. How recipes are organized

### 8.1 Meal type

Five buckets:

- **Breakfast** — weekday-possible first meals
- **Lunch** — leftovers-friendly, short midday cooks, or a lunch order
- **Dinner** — the main family meal
- **Snack** — something you can make without a full cook
- **Dessert** — simple sweets; still grocery-store cooking

A recipe has one primary meal type. If something is commonly lunch _or_ dinner, pick the more likely family use and mention the other in the notes.

### 8.2 Cuisine

Keep both **Italian** and **Mediterranean**.

| Cuisine       | Use when the dish is…                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| American      | US weeknight / diner / casserole / grill / most US fast food                           |
| Mexican       | Mexican or Tex-Mex family cooking, or a burrito-shop order                             |
| Italian       | Specifically Italian                                                                   |
| Asian         | East or Southeast Asian-inspired weeknight, or a similar restaurant order              |
| Mediterranean | Eastern Med, Greek, Levantine, Spanish, North African — **not** a generic Italian dish |
| Indian        | Indian or Indian-inspired home cooking                                                 |
| Other         | No honest fit, or mixed in a way that would mislead                                    |

### 8.3 Core rotation vs special occasion

Most recipes should be **core rotation**: repeatable weeknights.

**Special occasion** is a mark, not a category. Use it for meals that are still home-cookable but are not in the weekly loop.

## 9. HA, health rating, and ingredient flags

### 9.1 HA

**HA** is the only diet tag. It means the recipe or order, as written, fits this household’s usual constraints:

- No gluten (EOE). Occasional gluten and casual cross-contamination are tolerated in real life; HA meals still avoid gluten. Sourdough is not HA.
- No lactose (IBS). Hard aged cheeses such as Parmesan are treated as lactose-clear. Butter in a cooking spoon is usually fine; cream sauces are not.
- Not a high-fat plate (IBS after gallbladder surgery). A spoon of oil is fine. Fried food, cream sauces, and extra cheese are not.
- No leftover FODMAP problems after reintroduction:
  - **Fructose:** apples, pears, honey, brown sugar, molasses
  - **Fructans:** garlic, onion, inulin (and powders / jarred sauces that contain them). Wheat is generally acceptable for fructans; gluten is the separate issue.
  - **Sorbitol:** apples, pears, avocado
  - **Mannitol:** raw cauliflower, mushrooms, celery. **Cooked mushrooms are acceptable.** Cauliflower and celery stay off HA plates.

GOS (beans) is not a household HA blocker. Eating-pattern tags are gone.

When a favorite is not HA, add a second recipe instead of swapping ingredients on the page. Link them with `relatedRecipeIds`.

### 9.2 Health rating

Every recipe has a color-coded health rating. It is a household shorthand, not a nutrient analysis.

| Rating      | Color | Typical plate                                              |
| ----------- | ----- | ---------------------------------------------------------- |
| `healthy`   | green | Lean protein, vegetables, simple starches, not fried       |
| `moderate`  | amber | Mixed — some cheese, a richer sauce, or a pasta night      |
| `unhealthy` | red   | Fried, dessert-heavy, cream bombs, typical fast-food meals |

Show it on Explore (color dot) and on the recipe page (labeled chip).

### 9.3 Ingredient flags

Catalog ingredients may carry:

- `gluten`, `lactose`, `fructose`, `fructan`, `gos`, `sorbitol`, `mannitol`, `high-fat`

These are authoring hints. They are not user-facing tags.

## 10. Presentation and accessibility

### 10.1 Theme

- Light mode and dark mode.
- Toggle in the top right, on every page.
- Persist the choice on the device.
- Dark recipe text should read like a calm markdown preview.

### 10.2 Font size

- Small / Medium / Large control in the menu bar.
- Applies to the whole app, every page.
- Persist on the device.
- Medium is the default.

### 10.3 Responsive layout

- Desktop: top bar in one row; Explore can use a readable multi-column or grouped list; recipe page has a clear ingredients + steps layout (ingredients can sit beside steps when there is width).
- Mobile: stacked nav or a compact menu; ingredients above steps; filters that do not steal the whole viewport permanently.
- Touch targets on Random, filters, and toggles should be easy on a phone.

### 10.4 Recipe typography

Treat the recipe body as a markdown document:

- Title as the page heading
- Meta in a compact header block (times, servings, HA, health)
- Ingredients as a list with amounts aligned enough to scan
- Steps as an ordered list; allow short paragraphs inside a step
- Eat-out description as readable prose
- Spacing and line length chosen for cooking, not for cramming

## 11. Content plan

Keep all five meal types visible. Prefer ingredients from a normal supermarket.

- Most are core rotation.
- A minority are special occasion (asterisk).
- HA is tagged honestly. Do not force every recipe to be HA.
- Include HA conversions of household favorites as separate recipes when we actually cook them that way.
- Include a small set of eat-out orders, some HA and some not.

## 12. Technical approach

This repo is a static **Vite + TypeScript** app with **xState**, **CSS modules**, Oxlint, Oxfmt, Vitest, and GitHub Pages.

| Concern  | Approach                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------- |
| Hosting  | Static `dist/`, existing GitHub Pages workflow                                                  |
| Routing  | Client-side hash routes                                                                         |
| State    | xState for navigation, theme/font preferences, Explore filters, Ingredients browse, and Random  |
| Data     | Typed TypeScript for recipes and the ingredient catalog                                         |
| Styling  | CSS modules + theme and type-scale custom properties (`data-theme`, `data-font-size` on `html`) |
| Markdown | Render step/note/description markdown only; do not store the whole recipe as one unmanaged file |
| Tests    | Filtering (eat-out, HA, cuisine), related-recipe links, random, and catalog integrity           |

URL shapes:

- `/` — landing
- `/recipes` — Explore
- `/recipes/:id` — detail
- `/ingredients` — ingredient catalog
- `/guide` — kitchen guide
- `/random` — random picker

`#/guides` still opens the single guide so old links do not 404.

## 13. Later versions (not v1)

- Weekly planner
- Favorites
- Photos
- Export / import
- More HA conversions and eat-out orders as the household actually uses them

## 14. Decisions locked for v1

- Catalog only; planner later.
- Meal types: breakfast, lunch, dinner, snack, dessert.
- Cuisines: American, Mexican, Italian, Asian, Mediterranean, Indian, Other.
- Special occasion = icon/asterisk, not a separate list.
- Structured ingredients for home recipes; eat-out entries are descriptions.
- One diet tag: **HA**. Hand-maintained. No dynamic substitutions.
- Related recipes link classic and HA (or other siblings).
- Health rating: healthy / moderate / unhealthy, color-coded.
- Filters: eat-out vs home, HA vs not, cuisine (plus meal type and name search).
- Nav: Home, Explore Recipes, Ingredients, Guide, Random, font size, theme.
- Theme and type size apply site-wide and persist locally.
- No household first names in code or copy.

## 15. Implementation order

1. App shell: nav, routing, theme, font size, responsive layout.
2. Recipe data type (home vs eat-out), HA, health rating, related recipes.
3. Landing page (welcome + browse by meal + Guide link).
4. Single kitchen guide.
5. Explore grouping, filters, and search.
6. Random with the same filters and “roll again.”
7. Fill and convert recipes as the household cooks them.
8. Pass for typography (especially dark-mode recipe reading) and mobile layout.
