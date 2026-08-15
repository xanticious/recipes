# Family Recipes — Design Document

A static, family-only catalog for everyday meals. This document is the source of truth for v1 scope, information architecture, and how allergy tags are derived.

## 1. Purpose

Build a simple website that my family can use to browse practical recipes and pick something to cook. We already have a separate system for writing the weekly meal plan. This site does not replace that. It is the recipe book: curated, readable on a phone or a laptop, and honest about which recipes fit our household diet constraints.

v1 ships about **50** recipes. The catalog can grow toward **200** later without changing the page model.

## 2. Goals

- Keep the first version a **catalog**, not a planner.
- Show recipes that a single family can actually make: grocery-store ingredients, no chef technique, reasonable prep.
- Mix **core rotation** staples with a smaller set of **special occasion** meals.
- Tag each recipe by the diet constraints it **supports** (what it is safe for), not by every ingredient it happens to contain.
- Prefer structured recipe data so allergy tags can be derived from ingredients instead of being guessed by hand every time a recipe is added.
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

## 4. Users and access

The audience is this household. The site is a public static site (GitHub Pages is already wired in this repo). There is no authentication. Household preferences that matter in the browser — theme and font size — are stored locally on that device.

## 5. Product principles

1. **Practical first.** If it takes a specialty store, a long marinade, or restaurant technique, it is not a core recipe.
2. **Tags mean “safe for,” not “contains.”** A lactose-free tag means the recipe as written (or with its listed swaps) does not use lactose.
3. **AND filters.** If the reader asks for lactose-free **and** gluten-free, only recipes that have both tags appear.
4. **Data over guesswork.** Ingredients are structured so the app can compare them to known problem foods.
5. **Readable over clever.** The recipe page should feel like a good markdown viewer: clear hierarchy, generous spacing, nothing cramped.

## 6. Site map and navigation

Every page shares a top bar.

| Control          | Placement          | Behavior                                                                        |
| ---------------- | ------------------ | ------------------------------------------------------------------------------- |
| Site name / Home | Left               | Goes to the landing page                                                        |
| Explore Recipes  | Center / nav links | Recipe index                                                                    |
| Guides           | Center / nav links | Allergy and eating-pattern kitchen guides                                       |
| Random           | Center / nav links | Opens the random picker (meal type, cuisine, diet tags), then a matching recipe |
| Font size        | Menu bar           | Small / Medium / Large                                                          |
| Theme            | Top right          | Light / Dark toggle                                                             |

### 6.1 Landing — “Welcome to Family Recipes”

- Short welcome: this is our family cookbook for weeknight and special-occasion cooking.
- How to use the site: Explore, open a recipe, use Random, or open Guides if a tag is new.
- **Allergy and FODMAP legend** (see §9). This is the place that explains what each tag means, including the parts of the FODMAP diet and the household-specific **Low FOP** tag.
- Optional short pointers into Explore by meal type (Breakfast, Lunch, Dinner, Snack, Dessert).

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

**Filters** (combinable):

- Meal type
- Cuisine
- Diet / allergy tags, combined with **AND**
- Name search

Special-occasion recipes stay in the same lists. They are marked with an asterisk or a small icon beside the name, not hidden in a separate silo.

No favorites in v1.

### 6.3 Recipe detail

Shown when a recipe is chosen from Explore or Random.

v1 content, in order:

1. Title
2. Special-occasion mark, if any
3. Diet / allergy tags, shown as **Standard recipe** (as written) and **With alterations** (after listed swaps). If the reader has picked swaps, a **This version** row reflects the current choices.
4. Meal type and cuisine
5. Prep time, cook time, total time
6. Servings
7. Ingredients with amounts (from structured data). Lines that have swaps show short tag chips (LF, GF, VG, …). Click a chip to expand the options for that diet; click an option to replace the line and collapse, or collapse without changing.
8. Instructions: a numbered list of steps. Step text can include `{{slot}}` placeholders that fill from the selected ingredient variant.

No photo in v1.

Instructions are rendered as formatted markdown: headings if needed, lists, emphasis, and enough vertical rhythm that the page is comfortable to cook from. Dark mode should feel close to a high-quality markdown preview (clear contrast, muted chrome, readable body text). Light mode should be equally considered, not an afterthought.

### 6.4 Random

Available from the top bar on every page.

The reader may:

- Leave meal type and cuisine **unfiltered**, or pick one of each
- Select any number of diet tags; selected tags are an **AND** match
- Click Random to open one matching recipe
- Click Random again to get another match from the same filters (avoid showing the same recipe twice in a row when others exist)

If nothing matches, say so and leave the filters in place so they can loosen them.

### 6.5 Guides — living with allergies and eating patterns

For people who are newly adjusting how they eat. The tone is calm and practical. These pages are household cooking notes, not medical advice.

Three levels:

1. **Hub** (`#/guides`) — two doors: food allergies and sensitivities, or eating patterns.
2. **List** (`#/guides/allergies` or `#/guides/lifestyle`) — one card per tag in that group.
3. **Guide** (`#/guides/:tag`) — what daily life looks like, the main swaps, a baseline plate, links to a few recipes in this catalog, and a button that opens Explore with that tag selected.

Every diet tag in §9 has a guide. Example recipes on a guide must actually earn that tag (with listed alterations). Recipes we still need live in `design/recipe-ideas.md`.

## 7. Recipe information model

Recipes are a **hardcoded, curated collection** in the repo. The display layer should not be “one blob of markdown” for the facts we need to query.

### 7.1 Recipe record

| Field             | Type               | Notes                                                      |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| `id`              | string             | Stable slug, used in the URL                               |
| `title`           | string             | Display name                                               |
| `mealType`        | enum               | `breakfast` \| `lunch` \| `dinner` \| `snack` \| `dessert` |
| `cuisine`         | enum               | See §8.2                                                   |
| `specialOccasion` | boolean            | Shows asterisk / icon                                      |
| `prepMinutes`     | number             | Active prep                                                |
| `cookMinutes`     | number             | Oven, simmer, etc.                                         |
| `totalMinutes`    | number             | Can be derived if not stored                               |
| `servings`        | number             | As written                                                 |
| `ingredients`     | list               | Structured lines; see §7.2                                 |
| `steps`           | list               | Markdown text; may include `{{slot}}` placeholders         |
| `notes`           | markdown, optional | Extra prose after the steps                                |
| `tagOverrides`    | optional           | Only if computed tags must be forced                       |

Computed (not hand-maintained as the source of truth):

- `totalMinutes` if omitted (`prep + cook`, or explicit when they overlap)
- Diet tags, from ingredients plus the household exception list (§9.4)

### 7.2 Ingredient line

Each ingredient is structured so it can be checked against allergy lists later without re-tagging the whole recipe by hand.

| Field           | Type             | Notes                                                                   |
| --------------- | ---------------- | ----------------------------------------------------------------------- |
| `slot`          | string, optional | Key for selections and `{{slot}}` in steps. Defaults to `ingredientId`. |
| `ingredientId`  | string           | Key into the ingredient catalog                                         |
| `amount`        | number \| null   | Null when “to taste”                                                    |
| `unit`          | string \| null   | `cup`, `tbsp`, `g`, `clove`, etc.                                       |
| `preparation`   | string, optional | `diced`, `softened`                                                     |
| `optional`      | boolean          | Optional garnish: does not block tags as written                        |
| `substitutions` | list, optional   | Groups of options, each group aimed at one or more diet tags            |

Each substitution group has `tags` (the diets it is for) and `options`. An option is either another catalog `ingredientId` or `null` (leave the line out). The reader picks one option; that choice replaces the ingredient text and fills step placeholders.

Step placeholders:

- `{{cheese}}` becomes the selected name, or nothing if the line is omitted.
- `{{cheese:Add {name} for the last minute.|Skip the cheese.}}` picks the left side when the line is present and the right side when it is omitted.

Explore and Random filters use **with alterations**: a recipe matches lactose-free if a listed swap can make it so. The recipe page is honest about what is standard vs swapped.

### 7.3 Ingredient catalog

A separate list of known foods, not copied into every recipe.

| Field   | Type             | Notes                                                                        |
| ------- | ---------------- | ---------------------------------------------------------------------------- |
| `id`    | string           | e.g. `garlic`, `cheddar`, `honey`                                            |
| `name`  | string           | Display name                                                                 |
| `kind`  | enum             | `produce`, `dairy`, `grain`, `protein`, `fat`, `sweetener`, `spice`, `other` |
| `flags` | set              | Diet problem flags; see §9.3                                                 |
| `notes` | string, optional | Household caveats (sourdough, inulin in probiotics, etc.)                    |

This is what makes adding recipe 51 cheaper: pick catalog ingredients, and tags follow.

## 8. How recipes are organized

### 8.1 Meal type

Five buckets, all present in the first 50:

- **Breakfast** — weekday-possible first meals
- **Lunch** — leftovers-friendly or short midday cooks
- **Dinner** — the main family meal
- **Snack** — something you can make without a full cook
- **Dessert** — simple sweets; still grocery-store cooking

A recipe has one primary meal type. If something is commonly lunch _or_ dinner, pick the more likely family use and mention the other in the notes.

### 8.2 Cuisine, including Italian vs Mediterranean

Keep both **Italian** and **Mediterranean**. They overlap on olive oil, tomato, and herbs, but they are not the same shelf in a family cookbook.

| Cuisine       | Use when the dish is…                                                                  | Examples                                                                             |
| ------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| American      | US weeknight / diner / casserole / grill                                               | roasted chicken, chili, pancakes, burgers                                            |
| Mexican       | Mexican or Tex-Mex family cooking                                                      | tacos, rice and beans, salsa chicken                                                 |
| Italian       | Specifically Italian                                                                   | pasta, pizza, risotto, cacciatore                                                    |
| Asian         | East or Southeast Asian-inspired weeknight                                             | stir-fry, rice bowls, simple noodle soups                                            |
| Mediterranean | Eastern Med, Greek, Levantine, Spanish, North African — **not** a generic Italian dish | hummus plates, Greek salad, shawarma-spiced chicken, baked fish with lemon and herbs |
| Indian        | Indian or Indian-inspired home cooking                                                 | dal, simple curry, yogurt-marinated chicken                                          |
| Other         | No honest fit, or mixed in a way that would mislead                                    | a fusion bowl, a one-off family recipe                                               |

Rule of thumb: if you would file it next to pasta and Parm, it is Italian. If you would file it next to lemon, olive oil, chickpeas, and grilled fish — and it is not Italian — it is Mediterranean.

### 8.3 Core rotation vs special occasion

Most of the 50 should be **core rotation**: repeatable weeknights.

**Special occasion** is a mark, not a category. Use it for meals that are still home-cookable but are not in the weekly loop (longer cook, more dishes, holiday, guests). Show an asterisk or icon beside the name on Explore and on the recipe page.

## 9. Diet and allergy tags

Tags describe **what the recipe supports**. Filters use **AND**.

### 9.1 Tags in v1

**Always available (not FODMAP):**

| Tag           | Means                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `gluten-free` | No gluten-containing ingredients as written. Gluten-free flours are allowed. Household exception: sourdough bread is treated as acceptable (see §9.4). |

**Eating-pattern tags** (derived from the same catalog flags; household-practical, not medical advice):

| Tag         | Means                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `vegan`     | No animal products: meat, fish, dairy, eggs, honey, fish sauce, or typical chicken broth.      |
| `keto`      | No grains, sugars, starchy vegetables, most fruit, or legumes.                                 |
| `paleo`     | No grains, dairy, legumes, corn products, soy sauce, or refined sugar. Honey and maple are ok. |
| `carnivore` | Only animal foods plus salt, pepper, and water.                                                |

**FODMAP subgroup tags** (the scientific parts people actually react to). FODMAP is four groups; Monash splits those into six types. v1 lists all six so the legend and filters stay specific:

| Tag            | FODMAP part                       | Typical problem foods for this household                                                                                       |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `lactose-free` | Disaccharides — lactose           | Milk, soft cheeses, ice cream. A recipe that is still good **without the cheese** may earn this tag via a listed substitution. |
| `low-fructose` | Monosaccharides — excess fructose | Apples, pears, honey, brown sugar, molasses, other high-fructose sweeteners                                                    |
| `low-fructan`  | Oligosaccharides — fructans       | Garlic, onion, inulin, many wheat products (sourdough exception below)                                                         |
| `low-gos`      | Oligosaccharides — GOS            | Beans and some legumes, depending on the catalog entry                                                                         |
| `low-sorbitol` | Polyols — sorbitol                | Apples, pears, avocado, many stone fruits, sugar alcohols                                                                      |
| `low-mannitol` | Polyols — mannitol                | Cauliflower, mushrooms, celery (as flagged in the catalog)                                                                     |

**Roll-up tags** (derived, still filterable):

| Tag                   | Rule                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `low-oligosaccharide` | `low-fructan` **and** `low-gos`                                                                                                        |
| `low-polyol`          | `low-sorbitol` **and** `low-mannitol`                                                                                                  |
| `low-fodmap`          | All six FODMAP subgroup tags                                                                                                           |
| `low-fop`             | The parts that trouble this household: `low-fructose` **and** `low-oligosaccharide` **and** `low-polyol`. Lactose is **not** required. |

**Low FOP** is the wife-focused composite. F / O / P here means fructose, oligosaccharides, and polyols — FODMAP without the D (lactose). Selecting Low FOP is the same as requiring those three roll-ups (which in turn require the six-way parts underneath, except lactose).

Asparagus, celery, avocado, cauliflower, apples, pears, honey, garlic, onion, and inulin belong in the ingredient catalog with the correct flags. “Perez” in the original notes meant **pears**.

### 9.2 Landing-page legend

The landing page explains, in plain language:

1. What FODMAP stands for (Fermentable Oligosaccharides, Disaccharides, Monosaccharides, And Polyols).
2. The six types we tag, with a few example foods each.
3. That **gluten-free** is tracked separately. Wheat is often a fructan issue _and_ a gluten issue; we still keep both tags.
4. That **vegan, keto, paleo, and carnivore** are household-practical eating-pattern tags from the same catalog.
5. That **Low FODMAP** means the recipe clears every FODMAP subgroup.
6. That **Low FOP** means it clears fructose, oligosaccharides, and polyols — the cluster that matters most here.
7. That filters are **AND**: lactose-free + gluten-free means both. Filters use the alteration-aware tags.
8. That a recipe page distinguishes the standard recipe from listed swaps.
9. Household exceptions (sourdough; inulin often hiding in probiotics and “fiber” additives).

Keep the legend scannable: short headings, a compact table or definition list, not a medical essay.

### 9.3 Ingredient flags

Catalog ingredients carry flags that map onto the six FODMAP types plus gluten and lactose. Examples:

- `honey` → fructose
- `apple`, `pear` → fructose and sorbitol
- `garlic`, `onion`, `inulin` → fructan
- `avocado` → sorbitol (and any other flags the catalog records)
- `cauliflower` → mannitol
- `celery` → as recorded in the catalog (household avoid)
- `asparagus` → as recorded in the catalog (household avoid)
- `milk`, `cheddar` → lactose and animal (hard aged cheeses may be flagged lighter or clear for lactose; decide per catalog entry)
- `wheat-flour` → gluten, usually fructan, and the grain lifestyle flags
- Animal proteins and dairy → `animal` (blocks vegan). Grains → `not-keto` and `not-paleo`. Most plants → `not-carnivore`.
- `gluten-free-flour-blend` → neither, unless a specific blend adds a flagged gum or fiber
- `sourdough-bread` → household-acceptable; do **not** apply gluten or fructan in a way that blocks `gluten-free` / `low-fructan` for this family

A recipe earns a “low-X”, “-free”, or eating-pattern tag when **none** of its non-optional ingredients carry that flag. **As written** looks only at the default ingredient. **With alterations** also accepts a listed swap or omit that clears the flag. The reader’s current picks are a third view on the recipe page.

### 9.4 Household exceptions

These override generic diet-app dogma:

- **Sourdough bread is acceptable.** Recipes that use it may still be tagged gluten-free for this family.
- **Gluten-free flours are acceptable.**
- **Inulin** is a problem even when it shows up as a supplement or probiotic additive, not only as a named vegetable fiber.
- Baseline v1 recipes should **not include gluten** (aside from the sourdough exception).
- The first catalog should include a useful number of recipes **without onion or garlic**.
- Fruits and vegetables to treat as household avoids when claiming Low FOP / low-fructose / low-polyol: **apples, pears, avocado, asparagus, cauliflower, celery**, plus honey / brown sugar / molasses where fructose is the issue.

More substitution rules will be filled in after the baseline 50 exist. The data model should already allow an ingredient to be optional or swapped so a recipe can qualify for lactose-free when the cheese is left off.

## 10. Presentation and accessibility

### 10.1 Theme

- Light mode and dark mode.
- Toggle in the top right, on every page.
- Persist the choice on the device.
- Dark recipe text should read like a calm markdown preview: high body contrast, restrained accents, no pure-glare whites on black.

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
- Meta in a compact header block (times, servings, tags)
- Ingredients as a list with amounts aligned enough to scan
- Steps as an ordered list; allow short paragraphs inside a step
- Spacing and line length chosen for cooking, not for cramming

## 11. Content plan for the first 50

Aim for a usable mix, not 50 dinners.

Suggested starting balance (adjust while writing, keep all five meal types visible):

| Meal type | Approx. count | Notes                     |
| --------- | ------------- | ------------------------- |
| Breakfast | 8–10          | Fast, repeatable          |
| Lunch     | 8–10          | Leftovers and short cooks |
| Dinner    | 18–22         | Majority of the book      |
| Snack     | 5–7           | Low effort                |
| Dessert   | 5–7           | Simple                    |

Within that:

- Most are core rotation.
- A minority are special occasion (asterisk).
- All are gluten-free under household rules (GF flour and sourdough allowed).
- Include a deliberate set with **no onion and no garlic**.
- Cover several cuisines so Explore does not look like one column of American dinners.
- Prefer ingredients from a normal supermarket.

Do not try to make all 50 Low FOP. Tag honestly. Random and Explore will do the filtering.

## 12. Technical approach

This repo is already a static **Vite + TypeScript** app with **xState**, **CSS modules**, Oxlint, Oxfmt, Vitest, and GitHub Pages. v1 should stay in that shape.

| Concern  | Approach                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| Hosting  | Static `dist/`, existing GitHub Pages workflow                                                                 |
| Routing  | Client-side routes that work on project Pages (hash or a Pages-friendly history setup)                         |
| State    | xState for navigation, theme/font preferences, Explore filters, Random, and recipe substitutions               |
| Data     | Typed TypeScript (or JSON imported into TS) for recipes and the ingredient catalog                             |
| Styling  | CSS modules + a small set of theme and type-scale custom properties (`data-theme`, `data-font-size` on `html`) |
| Markdown | Render step/note markdown only; do not store the whole recipe as one unmanaged file                            |
| Tests    | Pure functions for tag derivation (as-written vs alterations), substitutions, AND filtering, and random        |

Replace the placeholder counter machine. It is not part of the product.

URL shapes (illustrative):

- `/` — landing
- `/recipes` — Explore
- `/recipes/:id` — detail
- `/guides` — allergy and eating-pattern hub
- `/guides/allergies` and `/guides/lifestyle` — guide lists
- `/guides/:tag` — one guide per diet tag
- Random is a nav action that lands on a detail URL, carrying current filters in memory or the query string so “Random again” keeps them.

## 13. Later versions (not v1)

When the catalog is in use, these are the natural follow-ons:

- Weekly planner (only if the paper/system we use now should move here)
- Favorites
- Photos
- Export
- Import, if we ever want recipes from outside the curated set
- Per-person allergen profiles, if one shared Low FOP filter is not enough

## 14. Decisions locked for v1

- Catalog only; planner later.
- About 50 curated recipes, hardcoded; no import.
- Meal types: breakfast, lunch, dinner, snack, dessert.
- Cuisines: American, Mexican, Italian, Asian, Mediterranean, Indian, Other.
- Special occasion = icon/asterisk, not a separate list.
- Structured ingredients + ingredient catalog; tags computed from flags.
- Recipe page: title, standard vs alteration tags, times, servings, ingredients with selectable swaps, stepped instructions that follow the selected variants. No photos.
- Eating-pattern tags: vegan, keto, paleo, carnivore.
- Nav: Home, Explore Recipes, Guides, Random, font size, theme.
- Random filters: meal type, cuisine, diet tags; tags are AND; unfiltered is allowed.
- Theme and type size apply site-wide and persist locally.
- “Pears” are in scope as a fructose/polyol avoid; the earlier “Perez” note was a transcription error.

## 15. Implementation order

1. App shell: nav, routing, theme, font size, responsive layout.
2. Ingredient catalog and tag-derivation rules, with tests.
3. Recipe data type and a handful of real recipes to prove Explore + detail.
4. Landing page plus the FODMAP / Low FOP legend.
   4a. Guides hub, category lists, and one page per diet tag, with links into existing recipes.
5. Explore grouping, filters, and search.
6. Random with AND filters and “roll again.”
7. Fill out the rest of the 50 recipes, tagging via the catalog, including no-onion/no-garlic options and a few special-occasion marks.
8. Pass for typography (especially dark-mode recipe reading) and mobile layout.
