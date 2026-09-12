# ENSANUT meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for the Meal Ideas catalog** (the live list is
`src/data/mealIdeas.ts`). Do not import them as-is. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** Encuesta Nacional de Salud y Nutrición (ENSANUT), 24-hour recall
- **Years:** Recent cycles include 2018, 2020, 2021, and 2022 (ensarec2022_alim dietary recall)
- **What was located:** Public microdata is advertised on ensanut.insp.mx. A JavaScript download flow did not yield a stable direct file URL in this pass, so files were not saved. The 24-hour recall dataset name is **ensarec2022_alim**. Plates follow published ENSANUT diet patterns: tortillas, beans, eggs, salsa, tacos, quesadillas, tamales, pan dulce, café con leche, aguas frescas, pozole, mole.
- **Microdata parsed:** No. ensarec2022_alim was not downloaded or parsed. Lists are qualitative.

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

The same groceries can be different meals: tortillas and eggs as huevos a la mexicana, chilaquiles, tacos, or quesadillas; leftover meat in tacos versus a rice-and-beans plate; pan dulce with café con leche versus atole with a leftover tamal.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
