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
- Tag a recipe **HA** (House Approved) when we can serve it without interfering with our food allergies and it does not taste bad to all of us. Do not hide conversions behind in-page ingredient swaps.
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
- Recipe-level allergy chips, eating-pattern tags (vegan, keto, paleo, carnivore), and FODMAP filters on Recipes / Eat Out / Random

## 4. Users and access

The audience is this household. The site is a public static site (GitHub Pages is already wired in this repo). There is no authentication. Household preferences that matter in the browser — theme and font size — are stored locally on that device.

Do not put household first names in the product, the copy, or the code. The diet tag is **HA** (House Approved).

## 5. Product principles

1. **Practical first.** If it takes a specialty store, a long marinade, or restaurant technique, it is not a core recipe.
2. **HA means House Approved.** A recipe is HA if we can serve it without interfering with our food allergies and it does not taste bad to all of us. Not “could fit after you pick swaps.”
3. **Two recipes, not one recipe with chips.** A regular Fettuccine Alfredo and an HA Fettuccine Alfredo are siblings, linked as related recipes.
4. **Readable over clever.** The recipe page should feel like a good markdown viewer: clear hierarchy, generous spacing, nothing cramped.
5. **Honest eat-out entries.** A restaurant order is a description of what we actually get, not a fake ingredient list.

## 6. Site map and navigation

Every page shares a top bar.

| Control          | Placement          | Behavior                                        |
| ---------------- | ------------------ | ----------------------------------------------- |
| Site name / Home | Left               | Goes to the landing page                        |
| Recipes          | Center / nav links | Home-cooking recipe index                       |
| Eat Out          | Center / nav links | Restaurant and takeout orders                   |
| Restaurants      | Center / nav links | Davis County restaurant catalog                 |
| Ingredients      | Center / nav links | Ingredient catalog                              |
| Guide            | Center / nav links | Single kitchen guide                            |
| Random           | Center / nav links | Opens the random picker, then a matching recipe |
| Font size        | Menu bar           | Small / Medium / Large                          |
| Theme            | Top right          | Light / Dark toggle                             |

### 6.1 Landing — “Family Recipes”

- Short welcome: this is our family cookbook for weeknight cooking, special occasions, and a few takeout orders.
- **HA** means House Approved: we can serve it without interfering with our food allergies, and it does not taste bad to all of us.
- Links to **browse by meal** (Breakfast, Lunch, Dinner, Snack, Dessert) — these open Recipes (home cooking).
- A link to **Eat Out**.
- A link to **Restaurants** (Davis County places to eat).
- A link to **Ingredients**.
- A link to the **Guide**.
- Do not explain FODMAP science or categories on the landing page.

### 6.2 Recipes

A list of home-cooking recipe names, grouped so the catalog stays coherent as it grows. Eat-out orders are not listed here; they have their own page.

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
- **House approval:** all / HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed (exclusive)
- Cuisine (multi-select)
- Name search

Special-occasion recipes stay in the same lists. They are marked with an asterisk beside the name. House approval is marked with a small chip (HA, HA assumed, Unknown, Not-HA assumed, or Not-HA). Health rating is a color-coded thermometer (see §9).

No favorites in v1.

### 6.3 Eat Out

A list of restaurant and takeout orders (`#/eat-out`). Same grouping and House Approval / cuisine / meal / search filters as Recipes. No ingredient lists; each entry is what we actually order.

### 6.4 Restaurants

A card catalog of places to eat in Davis County (`#/restaurants`). This is separate from Eat Out: Eat Out is household orders; Restaurants is a local directory.

Cities in the catalog: Bountiful, Centerville, Farmington, Kaysville, Layton, North Salt Lake, Woods Cross.

**City (exclusive):** All, or one of those cities.

**Grouping:** cuisine, in this order: American, Mexican, Italian, Asian, Mediterranean, Indian, BBQ, Breakfast & Cafe, Other. Cards are alphabetical by name inside each cuisine, then by city when names match. A restaurant may list extra cuisine types; grouping uses the first (primary) cuisine. When the same restaurant has more than one city in the catalog, the card and details title show the city in parentheses, e.g. Texas Roadhouse (Bountiful).

Each card is a placeholder or Street View storefront photo with the restaurant name below. Click a card for:

- City
- Cuisine type(s)
- Brief description
- Photo sized for the details panel (or a placeholder with the name fitted to that box)
- **5 most popular menu items** (five slots; empty until filled in the catalog)
- **Favorite** (`isFavorite`) — a catalog field for later household tagging. Not a login or device-saved favorites system.

Photos are Google Street View stills of the storefront, fetched with `scripts/fetch-restaurant-photos.ts`. If Street View has no nearby coverage, keep the placeholder. Callers request width and height; placeholders fill that same image box with a colored background and wrap the name so it stays visible on thin cards.

### 6.5 Ingredients

A grocery-style card catalog of every ingredient in the book (`#/ingredients`). This is not a recipe filter. `#/fodmap-ingredients` still opens this page so old links do not 404.

**Grouping:** Fruit first, Vegetables second, then the remaining grocery sections in alphabetical order. Cards are alphabetical by name inside each section.

**Filters:**

- **Category:** all, or one grocery section (Meat, Seafood, Eggs, Dairy, Vegetables, Fruit, Herbs, Grains, Beans and plant proteins, Fats and oils, Sweeteners, Spices, Pantry). Exclusive combobox.
- **House approval:** all / HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed (exclusive). Confirmed tags are hand-tagged. When `ha` is omitted, status is assumed from diet metadata (lactose, gluten, cheese, FODMAP) or left Unknown. Assumed is not the same as a household yes/no.
- Name search
- **FODMAP level (exclusive):** All, Low Fodmap, Medium Fodmap (watch serving size), High Fodmap. When Medium or High is selected, a second exclusive chip row filters by FODMAP type: All, Fructose, Fructans, GOS, Lactose, Sorbitol, Mannitol. All and Low have no type row.

Each card is the ingredient photo (or placeholder) with the name below. Click a card for the HA tag, description, FODMAP serving notes, lactose / gluten / per-type ratings, and the home recipes that use it. Eat-out entries have no ingredient list, so they do not appear here. If nothing in the book uses that ingredient yet, show “No recipes yet.”

### 6.6 Recipe detail

Shown when a recipe is chosen from Recipes, Eat Out, or Random.

**Home recipes**, in order:

1. Title
2. Special-occasion mark, if any
3. HA chip (HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed) and health rating
4. Meal type and cuisine
5. Prep time, cook time, total time
6. Servings
7. Ingredients with amounts (from structured data)
8. Instructions: a numbered list of steps
9. Notes, if any
10. Related recipes, if any

**Eat-out entries**, in order:

1. Title
2. HA chip (HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed) and health rating
3. Meal type and cuisine
4. The order: a short description of what to ask for
5. Notes, if any
6. Related recipes, if any

No photos in v1. No in-page ingredient substitution.

Instructions and eat-out descriptions are rendered as formatted markdown: headings if needed, lists, emphasis, and enough vertical rhythm that the page is comfortable to cook (or order) from.

### 6.7 Random

Available from the top bar on every page.

The reader may:

- Leave meal type and cuisine **unfiltered**, or pick one of each
- Choose all / eat out / home cooking
- Choose all / HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed
- Click Random to open one matching recipe
- Click Random again to get another match from the same filters (avoid showing the same recipe twice in a row when others exist)

If nothing matches, say so and leave the filters in place so they can loosen them.

### 6.8 Guide

One page (`#/guide`). Household cooking notes, not medical advice. Keep the disclaimer that this is not a diagnosis or treatment plan. The page itself stays impersonal:

- **HA** means House Approved. A recipe is HA if we can serve it without interfering with our food allergies and it does not taste bad to all of us.
- Sourdough bread is an okay alternative to wheat bread.
- Substitutions as separate points (almond milk or whole milk; sourdough for wheat/white bread; and the other household swaps)

Old per-tag allergy and eating-pattern guides are out of scope.

## 7. Recipe information model

Recipes are a **hardcoded, curated collection** in the repo. The display layer should not be “one blob of markdown” for the facts we need to query.

### 7.1 Shared fields

| Field              | Type               | Notes                                                                                                                                                                       |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | string             | Stable slug, used in the URL                                                                                                                                                |
| `title`            | string             | Display name. HA versions may include `(HA)` in the title                                                                                                                   |
| `mealType`         | enum               | `breakfast` \| `lunch` \| `dinner` \| `snack` \| `dessert`                                                                                                                  |
| `cuisine`          | enum               | See §8.2                                                                                                                                                                    |
| `specialOccasion`  | boolean            | Shows asterisk / icon                                                                                                                                                       |
| `ha`               | enum               | `ha-confirmed` \| `ha-assumed` \| `unknown` \| `not-ha-assumed` \| `not-ha-confirmed`. Confirmed is household yes/no. Otherwise assumed from ingredients (eat-out: unknown) |
| `healthRating`     | enum               | `healthy` \| `moderate` \| `unhealthy`. `moderate` displays as Moderately healthy                                                                                           |
| `eatOut`           | boolean            | Discriminant for home vs restaurant                                                                                                                                         |
| `relatedRecipeIds` | list, optional     | Sibling recipes (classic ↔ HA, or a related order)                                                                                                                          |
| `notes`            | markdown, optional | Extra prose                                                                                                                                                                 |

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

| Field     | Type             | Notes                                                                                     |
| --------- | ---------------- | ----------------------------------------------------------------------------------------- |
| `id`      | string           | e.g. `garlic`, `cheddar`, `honey`                                                         |
| `name`    | string           | Display name                                                                              |
| `kind`    | enum             | `produce`, `dairy`, `grain`, `protein`, `fat`, `sweetener`, `spice`, `other`              |
| `flags`   | set              | Authoring hints; see §9.3                                                                 |
| `ha`      | enum, optional   | `ha-confirmed` \| `not-ha-confirmed`. When omitted, assumed or unknown from diet metadata |
| `lactose` | enum, optional   | `free` \| `low` \| `high`. Override; otherwise derived                                    |
| `gluten`  | enum, optional   | `free` \| `low` \| `high`. Override; otherwise derived                                    |
| `notes`   | string, optional | Household caveats                                                                         |

Diet metadata (lactose, gluten, FODMAP overall and per type) is derived from the catalog flags, names, and the FODMAP study. Recipe House Approval uses the same five tags as ingredients. Confirmed recipe tags are household yes/no. Unconfirmed home recipes are classified from their ingredient list (worst ingredient wins) with `scripts/classify-recipe-ha.ts`. Eat-out entries have no ingredient list, so they stay Unknown until confirmed. Ingredient House Approval is confirmed when `ha` is set; otherwise it is assumed:

- **HA - Assumed** if lactose-free, gluten-free, and low or watch-serving-size FODMAP
- **Not-HA Assumed** if high lactose, the ingredient is cheese, or FODMAP is high
- **Unknown** otherwise

LF, GF, HA, and FODMAP notes are shown in the Ingredients details dialog.

### 7.6 Restaurant catalog

A typed list of Davis County restaurants, separate from eat-out recipe entries.

| Field              | Type           | Notes                                                                               |
| ------------------ | -------------- | ----------------------------------------------------------------------------------- |
| `id`               | string         | Stable slug, unique across cities                                                   |
| `name`             | string         | Display name                                                                        |
| `city`             | enum           | Bountiful, Centerville, Farmington, Kaysville, Layton, North Salt Lake, Woods Cross |
| `description`      | string         | Short prose about the place                                                         |
| `cuisines`         | list           | At least one. First value is the grouping category                                  |
| `popularMenuItems` | list of string | Up to five. Empty strings are omitted; unused slots show as blank in the UI         |
| `isFavorite`       | boolean        | Catalog placeholder for later household tagging. Defaults to false                  |

Restaurant cuisine buckets: American, Mexican, Italian, Asian, Mediterranean, Indian, BBQ, Breakfast & Cafe, Other.

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

**HA** means **House Approved**. Recipes and ingredients use the same five-way House Approval status.

A recipe or order is HA if we can serve it without interfering with our food allergies and it does not taste bad to all of us.

Sourdough bread is an okay alternative to wheat bread.

Show one of five tags:

- **HA - Confirmed** — household yes
- **HA - Assumed** — not confirmed; classified as likely HA
- **Unknown** — not confirmed and not assumed either way
- **Not-HA Assumed** — not confirmed; classified as likely not HA
- **Not-HA Confirmed** — household no

Confirmed tags are a household yes or no stored on the catalog entry.

Unconfirmed **ingredients** are classified from diet metadata:

- **HA - Assumed** if lactose-free, gluten-free, and low or watch-serving-size FODMAP
- **Not-HA Assumed** if high lactose, the ingredient is cheese, or FODMAP is high
- **Unknown** otherwise

Unconfirmed **home recipes** are classified from the ingredient list as written (optional lines count). The worst ingredient wins:

- **Not-HA Assumed** if any ingredient is Not-HA Confirmed or Not-HA Assumed
- **Unknown** if any ingredient is Unknown (or missing from the catalog)
- **HA - Assumed** if every ingredient is HA Confirmed or HA Assumed

The classifier never writes Confirmed. Use `scripts/classify-recipe-ha.ts` with an ingredient list, or `--write` to tag the catalog. Eat-out entries have no ingredient list, so they stay **Unknown** until confirmed.

When a favorite recipe is not HA, add a second recipe instead of swapping ingredients on the page. Link them with `relatedRecipeIds`.

### 9.2 Health rating

Every recipe has a color-coded health rating. It is a household shorthand, not a nutrient analysis.

| Rating                                   | Color | Thermometer  | Typical plate                                              |
| ---------------------------------------- | ----- | ------------ | ---------------------------------------------------------- |
| `healthy`                                | green | full         | Lean protein, vegetables, simple starches, not fried       |
| `moderate` (shown as Moderately healthy) | amber | half filled  | Mixed — some cheese, a richer sauce, or a pasta night      |
| `unhealthy`                              | red   | nearly empty | Fried, dessert-heavy, cream bombs, typical fast-food meals |

Show it on Recipes and Eat Out (thermometer icon) and on the recipe page (thermometer plus labeled chip).

### 9.3 Ingredient diet metadata

Catalog ingredients may still carry authoring flags:

- `gluten`, `lactose`, `fructose`, `fructan`, `gos`, `sorbitol`, `mannitol`, `high-fat`

The Ingredients page shows derived diet notes, not the raw flags:

- **Lactose:** None / Low / High (Lactose Free, Low Lactose, High Lactose)
- **Gluten:** None / Low / High
- **FODMAP:** overall High, Watch serving size (with the low serving when known), or Low, plus per-type ratings for fructose, fructans, GOS, lactose, sorbitol, and mannitol

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

- Desktop: top bar in one row; Recipes and Eat Out can use a readable multi-column or grouped list; recipe page has a clear ingredients + steps layout (ingredients can sit beside steps when there is width).
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
- HA is tagged honestly. Do not force every recipe to be HA. Unconfirmed home recipes are assumed from their ingredients; eat-out stays Unknown until confirmed.
- Include HA conversions of household favorites as separate recipes when we actually cook them that way.
- Include a small set of eat-out orders, some HA and some not.

## 12. Technical approach

This repo is a static **Vite + TypeScript** app with **xState**, **CSS modules**, Oxlint, Oxfmt, Vitest, and GitHub Pages.

| Concern  | Approach                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Hosting  | Static `dist/`, existing GitHub Pages workflow                                                                                              |
| Routing  | Client-side hash routes                                                                                                                     |
| State    | xState for navigation, theme/font preferences, Recipes/Eat Out filters, Ingredients browse, Restaurants city filter and details, and Random |
| Data     | Typed TypeScript for recipes, the ingredient catalog, and the restaurant catalog                                                            |
| Styling  | CSS modules + theme and type-scale custom properties (`data-theme`, `data-font-size` on `html`)                                             |
| Markdown | Render step/note/description markdown only; do not store the whole recipe as one unmanaged file                                             |
| Tests    | Filtering (eat-out, HA, cuisine), related-recipe links, random, restaurant grouping, and catalog integrity                                  |

URL shapes:

- `/` — landing
- `/recipes` — Recipes (home cooking)
- `/recipes/:id` — detail (home or eat-out)
- `/eat-out` — Eat Out
- `/restaurants` — Davis County restaurant catalog
- `/ingredients` — ingredient catalog (`#/fodmap-ingredients` still opens this page)
- `/guide` — kitchen guide
- `/random` — random picker

`#/guides` still opens the single guide so old links do not 404.

## 13. Later versions (not v1)

- Weekly planner
- Device-saved favorites / “we made this”
- Fill restaurant popular menu items and `isFavorite` as the household actually uses places
- Photos
- Export / import
- More HA conversions and eat-out orders as the household actually uses them

## 14. Decisions locked for v1

- Catalog only; planner later.
- Meal types: breakfast, lunch, dinner, snack, dessert.
- Cuisines: American, Mexican, Italian, Asian, Mediterranean, Indian, Other.
- Special occasion = icon/asterisk, not a separate list.
- Structured ingredients for home recipes; eat-out entries are descriptions.
- One diet tag: **HA** (House Approved). Recipes and ingredients use HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed. Confirmed tags are household yes/no. Unconfirmed ingredients are assumed from lactose, gluten, cheese, and FODMAP metadata. Unconfirmed home recipes are assumed from that ingredient list (worst ingredient wins); eat-out stays Unknown until confirmed. No dynamic substitutions.
- Related recipes link classic and HA (or other siblings).
- Health rating: healthy / moderately healthy / unhealthy, color-coded thermometer.
- Filters: HA - Confirmed / HA - Assumed / Unknown / Not-HA Assumed / Not-HA Confirmed (Recipes, Eat Out, Random, and Ingredients); category, name search, and FODMAP level / type (Ingredients); cuisine (plus meal type and name search).
- Nav: Home, Recipes, Eat Out, Restaurants, Ingredients, Guide, Random, font size, theme.
- Theme and type size apply site-wide and persist locally.
- No household first names in code or copy.

## 15. Implementation order

1. App shell: nav, routing, theme, font size, responsive layout.
2. Recipe data type (home vs eat-out), HA, health rating, related recipes.
3. Landing page (welcome + browse by meal + Guide link).
4. Single kitchen guide.
5. Recipes grouping, filters, and search (home cooking only).
6. Eat Out page for restaurant orders.
7. Random with the same filters and “roll again.”
8. Fill and convert recipes as the household cooks them.
9. Pass for typography (especially dark-mode recipe reading) and mobile layout.
