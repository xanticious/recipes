# CHNS meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for a later Meal Ideas catalog page**: a full
dinner in mind, with optional links out to recipes for the parts. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** China Health and Nutrition Survey (CHNS)
- **Years:** Household waves from 1989 through the 2015 (and later) nutrition waves
- **What was located:** Microdata is available via UNC Carolina Population Center registration. This pass did not register or parse CHNS files. Plates follow published CHNS diet descriptions plus typical home Chinese meals: congee, youtiao with soy milk, baozi, rice with several dishes, dumplings, noodles, hot pot, tea.
- **Microdata parsed:** No. UNC-registered microdata was not parsed. Lists are qualitative.

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

The same groceries can be different meals: leftover dough as baozi versus mantou versus noodles; leftover rice as congee, fried rice, or a bowl with leftover dishes; eggs in tomato-and-egg, on leftover rice, or in noodle soup.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
