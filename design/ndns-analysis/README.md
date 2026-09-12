# NDNS meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for the Meal Ideas catalog** (the live list is
`src/data/mealIdeas.ts`). Do not import them as-is. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** UK National Diet and Nutrition Survey (NDNS) Rolling Programme
- **Years:** 2008/09 onward; published food-group tables commonly cited from Years 9–11 (2016/17–2018/19) and later rolling-programme reports
- **What was located:** UK Data Service study SN 6533 holds the microdata (registration). This pass used **published NDNS food-group results** plus typical UK eating occasions. SN 6533 was not downloaded.
- **Microdata parsed:** No. Microdata was not parsed. Lists are qualitative.

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

The same groceries can be different meals: toast and eggs, French toast, or toad in the hole; leftover roast as a sandwich versus meat-and-potato dinner; tea with biscuits versus a pudding with custard.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
