# NNPAS meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for the Meal Ideas catalog** (the live list is
`src/data/mealIdeas.ts`). Do not import them as-is. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** National Nutrition and Physical Activity Survey (NNPAS) / Australian Health Survey
- **Years:** 2011–12 NNPAS (AHS); later ABS nutrition releases exist but were not parsed here
- **What was located:** ABS Confidentialised Unit Record Files (CURF) exist under application. This pass did not obtain CURF microdata. Plates follow published AHS/NNPAS food-group highlights plus typical Australian home plates (Weet-Bix, vegemite toast, meat and three veg, meat pie, parma-at-home, pavlova).
- **Microdata parsed:** No. ABS CURF microdata was not parsed. Lists are qualitative.

## How the lists were built

Filters analogous to the NHANES meal-idea pass:

- Adults (analogous to NHANES 18+)
- Home-eaten everyday fare, not restaurant tasting menus
- Grocery / home-store foods rather than eat-out as the default
- Lunch and dinner are mixed plates, not dessert-only or drink-only
- Baby foods omitted
- Drinks that belong with a meal stay on that plate; drink-only sittings go in drinks.md

Published food-group results and typical home eating occasions fill the
plate lists. Occasion mapping follows the same buckets as NHANES:
breakfasts, lunches, dinners, drinks, snacks, desserts, and other
(unnamed, leftover, or odd-hour sittings).

Drinks that belong with a meal stay on that plate. Standalone drink
sittings go in drinks.md. Water kinds are treated as one drink;
plain milks, regular/diet soda, and similar yogurts are stacked.

## Preparation variants

The same groceries can be different meals: Weet-Bix with milk, vegemite toast, or eggs on toast; leftover roast as sandwiches versus a meat-and-three-veg plate; pavlova as a weekend dessert versus yogurt and fruit on a weeknight.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
