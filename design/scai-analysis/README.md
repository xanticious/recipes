# Italy SCAI meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for a later Meal Ideas catalog page**: a full
dinner in mind, with optional links out to recipes for the parts. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** INRAN-SCAI 2005–06 and IV SCAI (CREA)
- **Years:** INRAN-SCAI 2005–06; IV SCAI volumes published later by CREA (2010s–2020s tables)
- **What was located:** FAO GIFT holds microdata behind login. CREA published IV SCAI summary volumes. This pass did not log into FAO GIFT or parse individual recalls. Plates follow published Italian adult diet patterns: pasta, bread, pizza, espresso, ricotta or yogurt, risotto, frittata, gelato, tiramisu leftover, minestrone.
- **Microdata parsed:** No. FAO GIFT microdata was not parsed. Lists are qualitative.

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

The same groceries can be different meals: leftover pasta as a lunch bowl, a frittata di pasta, or a side with salad; bread and eggs as frittata versus a panino versus leftover pizza; ricotta with honey at breakfast versus a sweet leftover tiramisu.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
