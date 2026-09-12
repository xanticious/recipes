# Enhancement ideas

Suggestions for later, not a promise. Product scope still lives in `DESIGN_DOCUMENT.md`. This file is a backlog of **features**, **content**, and **technical debt**, written from the household questions:

- “I’m not craving anything right now. I need ideas.”
- “What’s something we haven’t tried before? Or haven’t tried in a while?”

v1 is already a large catalog. Most of the value from here is helping people **pick**, not adding more names for the sake of a bigger list.

Counts below are a snapshot of the catalog as of this writing (~728 recipes, ~229 meal ideas, ~1,031 ingredients, ~446 Davis County restaurants, 8 eat-out orders). Recheck before treating a number as a to-do.

---

## 1. What the book already does well

Use these as the baseline. New work should not fight them.

- **Meal Ideas** are the right answer to “what should we eat?” A named plate (protein + sides + drink) is stronger than a recipe title.
- **Pictures View** is already a browse-until-something-looks-good surface.
- **Random** can pick a recipe under meal / cuisine / HA / home-vs-eat-out filters, and it skips the last roll.
- **Region tags** (US, JP, KR, BR, …) already let someone try “something we don’t usually cook.”
- **HA** is honest: a separate recipe, not an in-page swap. The green check on a plate means every linked recipe family has an HA version.
- **Restaurants** is a local “try a place we didn’t know about” directory, separate from household Eat Out orders.

The gap is not “we have no food.” The gap is **decision support**: the catalog is large enough that standing in the kitchen and scrolling Recipes is work.

---

## 2. Features for “I’m not craving anything”

These help when the craving is empty, not when someone already wants tacos.

### 2.1 A “Tonight” / “Give me a plate” button

Random today opens a **recipe**. The stronger ask is a **Meal Idea**: pork chops, mashed potatoes, gravy, green beans, water.

- Random Meal Idea with the same occasion / region / HA-plate filters.
- Optional: one tap from the landing page (“Give me a dinner”) that rolls a plate, not a single recipe.
- Keep the current recipe Random; it is still useful when someone wants a specific dish, not a whole sitting.

### 2.2 Constraints that match a weeknight mood

Recipes already store prep, cook, servings, health rating, special-occasion, and cuisine. None of those except cuisine and HA are filters.

Useful chips, especially on Meal Ideas and Random:

- **Time:** under 20 minutes / about 30 / I have an hour. 257 home recipes are already ≤20 minutes; 39 are over an hour.
- **Energy:** leftover assembly vs a real cook vs a project.
- **Health:** healthy / moderately healthy / treat. The thermometer exists; it is display-only.
- **HA plate:** only plates whose linked families all have HA recipes (the green check). 55 meal ideas currently fail that test.
- **Home vs takeout vs “I don’t want to cook.”** Eat Out has only 8 orders; Restaurants has 446 places. A “just pick a restaurant” roll is closer to how a tired night actually works.

Do not add vegan / keto / FODMAP recipe filters. That is still a v1 non-goal. Time, health, and leftover-vs-cook are household logistics, not diet taxonomy.

### 2.3 Start from what is already in the house

The Ingredients page is a grocery catalog, not a pantry. A later **“what we have”** mode (device-local, no accounts) could:

- Mark a short list of proteins, starches, and vegetables on this device.
- Rank Meal Ideas and recipes that use those ids.
- Prefer leftover-friendly plates (`leftover-dinner-plate`, rice bowls, frittatas, quesadillas) when “we already cooked” is the constraint.

This is related to shopping lists (out of scope for v1) but smaller: it does not build a store list, it only filters the book.

### 2.4 Make browsing less of a list

Recipes is a grouped name list. Meal Ideas already has Pictures View. Ideas:

- Optional pictures (or a simple emoji/icon) on Recipes once recipe photos exist.
- A landing-page **handful of plates** (“dinners you could make tonight”) instead of only links to indexes.
- **Surprise region:** “show me plates common in Japan / Brazil / Korea” as a one-tap from landing, not only a filter buried on Meal Ideas.
- **Related plate chains:** Meal Ideas already has related meals. Surface “if not this, then that” more loudly after a Random miss or a rejected plate.

### 2.5 Cook-from-the-phone extras

Still catalog, not a planner:

- **Print stylesheet** and a “cook mode” (big type, keep screen awake, check off steps — step checks can stay device-local and ephemeral).
- Search Recipes by **ingredient**, not only by title. Today “Search by name” misses “what can we do with the pork chops.”
- Deep links: Meal Ideas, Restaurants, and Ingredients store the open card in xState only. You cannot text `#/meal-ideas/pork-chops-plate` the way you can `#/recipes/baked-pork-chops`. Shareable plate and restaurant URLs would make “how about this?” a real conversation.

### 2.6 Restaurant night without a craving

Restaurants filters by city only. For “I don’t want to cook and I don’t know what I want”:

- Cuisine filter (already on Recipes).
- Name search.
- **Random restaurant** in the current city (or All), biased toward places with photos and filled menus.
- Link Eat Out orders to the matching restaurant cards (Chick-fil-A grilled nuggets → the Davis County Chick-fil-A rows).
- Household **Favorite** on restaurants (`isFavorite` exists and is always false). Tagging the places we actually go is the difference between a directory and “where should we drive.”

---

## 3. Features for “haven’t tried / haven’t tried in a while”

These need a little memory. v1 explicitly deferred favorites and “we made this.” That is the feature that unlocks this whole question.

### 3.1 Device-saved history (no accounts)

On this phone / laptop only:

- **We made this** / last cooked date on a recipe or meal idea.
- **We ordered this** on an Eat Out row.
- **We’ve been here** / **want to try** on a restaurant (the `isFavorite` field is a start; a third state “not yet” is the exploration one).
- **Hidden / not for us** so Random stops offering a dish the household already rejected.

Then Random and Meal Ideas can prefer:

- Never marked made (new to us).
- Last made more than N weeks ago (rotation).
- Region or cuisine we have not cooked recently.

Without history, “haven’t tried in a while” is guesswork. The catalog cannot know.

### 3.2 “Something different” as a first-class roll

A mode on Random / Meal Ideas:

- Prefer a cuisine or region that is **not** American (289 of 728 recipes are American; 183 of 229 plates are tagged United States).
- Prefer plates tagged Japan, Korea, China, Brazil, Mexico, Italy when the household has been in a taco/pasta/chicken-rice loop.
- Prefer **special occasion** on a weekend (36 recipes, almost all dinners and a few desserts).
- Prefer **unused HA-assumed ingredients** as a “cook with something we catalogued but never used” prompt (see content).

### 3.3 Confirm House Approval as we actually eat

**Zero recipes** are `ha-confirmed` or `not-ha-confirmed`. Home recipes are classified from ingredients (397 HA-assumed, 315 Not-HA-assumed, 8 unknown). All 8 eat-out orders are Unknown.

The five-way HA filter is built. The household has not tagged the book as cooked-and-approved yet. A lightweight “this was fine / this was not” on the recipe page, written back into the repo (or stored locally until someone commits), is how assumed becomes confirmed.

Eat-out especially cannot be assumed: there is no ingredient list. Confirming the handful of regular orders — and adding HA sibling orders — is the difference between Eat Out being a sketch and being “what can I actually order.”

### 3.4 Explore by ingredient

728 of 1,031 catalog ingredients are not used in any home recipe. Many are variety splits (russet vs Yukon vs red potato) or Not-HA alliums. Plenty are foods we have never cooked: taro, jicama, shishito, galangal, water chestnuts, spaghetti squash, and so on.

A “try this ingredient” path:

- Ingredients already show “No recipes yet.”
- Add a way to jump from an unused HA-assumed ingredient to a suggested plate or a stub “not in the book yet.”
- That is a concrete answer to “something we haven’t tried.”

---

## 4. Other product features (still later)

From `DESIGN_DOCUMENT.md` §13 and the same household needs, in rough usefulness order for this family:

| Idea                                  | Why                                                             | Watch-outs                                                                      |
| ------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Device-saved favorites / we made this | Unlocks rotation and “haven’t tried”                            | No accounts; stay on-device                                                     |
| Weekly planner                        | We already have another system; this site should not replace it | Keep it optional, or only “pin this week’s plates”                              |
| Scaling servings                      | Useful at cook time                                             | Keep structured amounts; don’t turn steps into templates                        |
| Recipe photos                         | Pictures View proved photos help people pick                    | Unsplash is fine for plates; household photos later                             |
| Shopping list                         | Natural next step after a plate                                 | Easy to become a planner; keep it “this plate → this grocery list”              |
| Export / import                       | Backup of device history, or a printed booklet                  | Catalog stays curated in the repo                                               |
| PWA / add to home screen              | Phone on the counter                                            | Static GitHub Pages can do this                                                 |
| Browser editing                       | Household members could confirm HA without a PR                 | Conflicts with “curated in the repo”; maybe a JSON export of local tags instead |

Stay out of: logins, per-person profiles, in-page ingredient swaps, FODMAP science on the landing page, household first names.

---

## 5. Content to add

Content is the long game. Prefer plates and recipes the household would actually say out loud on a weeknight, plus a minority of special-occasion and “never tried that” regional food.

### 5.1 Meal Ideas: make more plates fully cookable as HA

55 plates do not get the green check (not every linked recipe family has an HA version). Many are household staples: pancakes, smoothie, muffin, biscuits and gravy, huevos/chilaquiles, avocado toast, salad, tuna sandwich, wrap, sushi bowl, pork chops plate, baked chicken, pasta and red sauce, meatballs, lasagna, taco night, pizza night, salmon, tuna casserole, shepherd’s pie, shrimp scampi, chicken parmesan, stuffed peppers, tostadas, carne asada, fish tacos, baked ziti, apple and peanut butter, chips and dip, fruit, rice cakes, ice cream, fruit crisp, cobbler, banana bread.

Some of those **should not** get an HA sibling with the same name (avocado toast is avocado; banana bread is banana; tuna salad is tuna — the culinary review already says so). For the rest, either:

- Add a real HA recipe that still produces that food, or
- Split the plate so the HA version is honestly named (tomato-basil pasta, not “Caprese”; strawberry smoothie, not “banana smoothie”).

242 home recipes are not linked from any Meal Idea. Linking is cheaper than writing new recipes and makes “give me a plate” richer. Examples already in the book but orphaned from plates: baked oatmeal, peanut butter toast, breakfast quesadilla, ginger rice porridge, egg muffins, leftover-friendly salads and soups.

25 meal ideas still lack Unsplash photos (biscuits and gravy, leftover dinner, shepherd’s pie, tamale pie, chicken parm, jambalaya, Weet-Bix, Vegemite on toast, feijoada, fairy bread, horchata, barley tea, …). Pictures View is the browse surface; missing photos are missing ideas.

### 5.2 Recipes: fill honest HA siblings, then stop forcing names

43 Not-HA home recipes have no HA sibling. After dropping identity dishes (avocado, banana, tuna, white fish, cottage cheese, mango, grapes, apple-as-the-dish, natto), the interesting remaining asks are things like pork chops without the apple, fish and chips, sausage roll, tteokbokki, sticky toffee pudding, protein shake (only if an HA protein powder exists).

`design/recipe-review.md` is the cook-through of quality, not a blind fix list. The systemic content bugs there still matter when adding or repairing recipes:

- Gluten-free flour treated as puff pastry / pie crust / croissant dough.
- Marinara left in the steps after the list was switched to crushed tomatoes.
- Bread or corn tortillas standing in for a named bakery item while keeping the old title.
- HA title on a recipe that still uses a Not-HA-confirmed ingredient.

Do not add more HA conversions that fail those tests. Rename the HA plate when the swap changes the dish.

`design/recipe-ideas.md` is stale (scrambled eggs HA, chili HA, taco filling HA, and similar already exist). Treat this file as the living ideas list; refresh or retire `recipe-ideas.md` when convenient.

### 5.3 Eat Out: the catalog is still a sketch

Eight orders, all Unknown HA, none tied to the restaurant directory:

- Chick-fil-A grilled nuggets
- Grocery rotisserie plate
- Salmon poke (no onion, no avocado)
- Chipotle chicken bowl
- McDonald’s Big Mac
- Pepperoni pizza takeout
- Pad Thai takeout
- Burger and fries

Worth adding when they become regulars (from the old ideas list, still valid):

- Bunless burger, no cheese, side salad (the burger-and-fries notes already point at this).
- A sushi or poke shop order that is reliably HA, named by restaurant.
- A pizza order that is actually repeatable as HA, if one ever is.
- Airport / road-trip defaults.
- Davis County regulars once `isFavorite` is tagged: Café Rio / Costa Vida sweet pork (onion), Kneaders, In-N-Out Protein Style, Mo’ Bettahs, Texas Roadhouse, Harmons/Costco rotisserie, dirty soda shops, Arctic Circle, Crown Burger.

Each Eat Out row should eventually point at one or more restaurant catalog ids.

### 5.4 Restaurants: local coverage and household truth

446 places across Bountiful, Centerville, Farmington, Kaysville, Layton, North Salt Lake, and Woods Cross. Gaps:

- **No favorites.** `isFavorite` is hardcoded false on every row.
- **Popular menus are generic chain lists**, not “what we actually get.” Fine as placeholders; replace with household orders as we use places.
- **Photos:** 101 of 446 have Street View stills; 345 are name placeholders. Fetch coverage is the browse quality of that page.
- **Cities.** Davis County also includes Clearfield, Clinton, Syracuse, Fruit Heights, West Point, and others. `design/food-inspections-in-davis-county.csv` is already in the repo as a source for places the seven-city catalog never ingested.
- Thin cuisine buckets: 4 BBQ, 5 Indian, 7 Mediterranean. If the household wants “someplace different,” those lists should be complete, not sparse.

### 5.5 Ingredients: confirm, photograph, then cook the unused HA ones

- 198 ingredients have a confirmed household yes/no; 833 are assumed or unknown.
- 386 ingredients have no photo.
- Unused HA-assumed foods are the “haven’t tried” pantry: squash varieties, roots, peppers, grains, and seafood that never made it into a recipe.
- Unused Not-HA ingredients (onions, garlic, most cheeses) do not need recipes; they already explain why so many plates are Not-HA.

The hidden `#/ingredient-categorizer` is an authoring tool. Keep it out of the family nav. Using it to finish confirmed HA tags is content work, not a user-facing feature.

### 5.6 Kitchen guide

The guide is three short sections (HA meaning, sourdough, substitutions). Later, still impersonal, still not medical advice:

- How assumed vs confirmed HA works, in one paragraph a tired cook can use.
- When not to keep the same recipe name after a swap (the pastry / Caprese / pesto lesson).
- Leftovers: what reheats, what does not.
- Davis County grocery notes that matter (where we actually buy Daiya, garlic-infused oil, gluten-free pasta) without naming people.

### 5.7 Regional and Utah plates we still do not think of

Meal Ideas already has good coverage of NHANES-style American plates and a first pass of UK / Mexico / Japan / Korea / Brazil / China / Australia. “Haven’t tried” from the national analyses, if they stay grocery-store cookable:

- Japan: donburi (gyudon, oyakodon), curry rice, nabe as a weeknight, more grilled-fish breakfasts.
- Korea: rice + soup + banchan as a plate (not only tteokbokki), kimchi jjigae, grilled mackerel.
- China: tomato-and-egg with rice, dumpling night, leftover-rice soup.
- Mexico: leftover-meat tacos as a named plate, beans-and-tortillas supper, atole / horchata already exist as drinks — more everyday plates than restaurant fajitas.
- Brazil / Australia / UK: feijoada, mince on toast, beans on toast, fairy bread exist; ploughman’s, meat pie night, Weet-Bix still need photos and HA honesty.

Utah / Wasatch Front household food that is barely in the recipe book:

- Utah scones with honey butter (restaurants mention them; Meal Ideas scones are British tea scones).
- Fry sauce as a pairing, not a gimmick.
- Funeral potatoes, green gelatin salad, Dutch-oven dump meals, chili-and-cinnamon-roll, funeral-potluck sides — as special occasion or “we only make this in winter,” not as core rotation.
- Harmons / Costco rotisserie already has an Eat Out row; grocery sushi, food-court pizza, and Kneaders soup-and-sandwich are the local defaults that still live only in restaurant popular-menu placeholders.

### 5.8 Thin cuisine × meal cells

If the book should feel complete when someone filters Recipes, these cells are small:

| Meal      | Cuisine       | Home recipes (approx.) |
| --------- | ------------- | ---------------------: |
| Breakfast | Mediterranean |                      3 |
| Breakfast | Italian       |                      5 |
| Breakfast | Indian        |                      5 |
| Lunch     | Indian        |                      4 |
| Snack     | Indian        |                      2 |
| Snack     | Mediterranean |                      4 |
| Dessert   | Asian         |                      3 |
| Dessert   | Indian        |                      2 |
| Dessert   | Mexican       |                      4 |

Do not pad them with chef food. A few honest weeknight plates each is enough.

### 5.9 Recipe quality pass

`design/recipe-review.md` scored 692 home recipes and found 182 with at least one rubric fail (missing HA alternate, bad pair swap, steps naming unlisted food, will not produce the titled dish, listed ingredient never used). That document is evaluation, not a patch script. A later pass should repair by pattern (pastry, marinara wording, identity swaps) rather than by blindly applying every C1.

---

## 6. Technical debt

Not user-visible features, but they will slow every content and product change above.

### 6.1 Docs drifted from the shipped app

- `DESIGN_DOCUMENT.md` locked nav and URL list omit Meal Ideas in places, still describe v1 as if pictures and plates were future work, and still say “No photos in v1” on recipe detail while Meal Ideas / Ingredients / Restaurants already have photos.
- `AGENTS.md` still says the placeholder counter machine is not part of the product. It is already gone.
- `design/recipe-ideas.md` lists HA conversions that now exist.
- `design/recipe-review.md` counts (692 home recipes, 8 eat-out) are already behind the live catalog (~720 home). Re-run or date-stamp it.

### 6.2 Data model and catalog integrity

- **Related recipes are one-way in at least one place** (Chipotle bowl → burrito bowl, not back). The UI only shows `relatedRecipeIds` on the current page, so a missing reverse link hides the sibling.
- **Recipe HA is never confirmed.** The classifier is doing all the work. There is no workflow besides editing TypeScript.
- **Ingredient sections depend on id ranges** in `ingredientBrowse.ts` (`cilantro`→`lemon` = herbs, `egg`→`salmon` = eggs). Inserting a catalog row in the wrong place silently recategorizes foods.
- **`home()` defaults cuisine to American.** Easy to mis-tag a new recipe.
- **Variety ingredients vs generic ids.** Recipes use `potato` while `russet-potato` / `yukon-potato` sit unused. Either recipes should name the variety or the extras should not clutter Ingredients.
- **Restaurant `isFavorite` cannot be set** without a code change; the helper always writes `false`.
- **Eat Out and Restaurants do not share ids.** Orders cannot deep-link to a place.
- **Meal Ideas HA-check is label-family based** (`(HA)` / `(Not-HA)` suffix). A mislabeled link silently breaks the green check.

### 6.3 Routing and state

- Hash routes work on GitHub Pages, but only recipe ids live in the URL. Open meal idea / restaurant / ingredient, and all filters, are memory in the xState actor. Refresh or share loses them.
- Random’s “avoid last id” is one slot. History (see §3.1) would belong in the same actor + `localStorage`, like theme, font size, and Meal Ideas display.
- `#/guides` and `#/fodmap-ingredients` compatibility shims should stay until we are sure nothing bookmarks them.

### 6.4 Photos and build

- Photo binaries are not in this source tree. Metadata is (`*.photos.data.ts`); files are expected at `BASE_URL/{ingredients,restaurants,meal-ideas}/id.jpg` after `scripts/fetch-*-photos.ts`. Easy for a clone or CI Pages build to show placeholders for everything.
- No recipe photos at all (by design for v1).
- Fetch scripts need API keys / network; document how a fresh environment restores images.

### 6.5 Codebase shape

- Recipe modules are huge (`ha-variants.ts` alone is thousands of lines). Fine for a generated dump; painful to review. Split by meal, or generate from a stricter data format, if we keep growing.
- Vitest covers data and machines only (`src/**/*.test.ts`). No component tests. Filter chips, Random, and Meal Ideas display are easy to regress visually.
- No `*.test.tsx`, no print CSS, no skip-to-content link, no `prefers-reduced-motion` except Meal Ideas scroll.
- Ingredient categorizer is a production route. Fine for authors; consider `import.meta.env.DEV` or leaving it undocumented.
- Analysis scripts under `scripts/` and `design/*-analysis/` still mention a Windows Downloads venv. They are inspiration, not the live catalog — say that at the top of each README if not already.

### 6.6 Accessibility and cooking UX

- Nav is a long row of text links; on a phone it competes with filters. A compact menu is in the design doc and only partly true in CSS.
- Recipe steps are not checkable; the screen can sleep mid-stir.
- No way to keep a recipe on screen while the phone is greasy (cook mode / fullscreen).
- Font size and theme persist; Meal Ideas list-vs-pictures persist. Filter choices do not.

---

## 7. Suggested order if we only do a few things

1. **Random a Meal Idea** (and a restaurant), with time / HA-plate chips — this is the “I’m not craving anything” button.
2. **Device-local “we made this”** — this is the “haven’t tried in a while” button.
3. **Shareable URLs** for a plate and a restaurant.
4. **Confirm HA** on the meals we actually cook and the orders we actually place; add Eat Out rows only for regulars.
5. **Link orphan recipes into Meal Ideas** and finish HA families for plates that can stay the same dish.
6. **Repair recipe-review systemic bugs** (pastry, marinara wording, identity-breaking titles) before writing more HA clones.
7. **Restaurant favorites + remaining Street View photos + the other Davis County cities** if eat-out exploration matters as much as cooking.
8. **Catch docs up** (`DESIGN_DOCUMENT.md`, `AGENTS.md`, retire stale `recipe-ideas.md`) so the next change does not argue with the source of truth.

Keep the site a catalog. The planner can stay elsewhere. The win is a family member with no craving still ending up with a plate, a recipe, or a place — including one they have not had in a while.
