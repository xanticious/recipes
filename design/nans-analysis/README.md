# NZ Adult Nutrition Survey meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for a later Meal Ideas catalog page**: a full
dinner in mind, with optional links out to recipes for the parts. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** New Zealand Adult Nutrition Survey (NANS / NZANS), with later NZ Health Survey nutrition modules unpublished here
- **Years:** 2008/09 Adult Nutrition Survey is the main published dietary recall; later NZHS nutrition indicators exist
- **What was located:** Published key findings and food-group summaries were used. Confidential unit-record dietary files were not obtained. Plates resemble Australian home fare plus mince on toast, sausage sizzle at home, and pavlova (NZ claim included as a home dessert).
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

The same groceries can be different meals: mince on toast versus spaghetti mince versus leftover mince with mash; Weet-Bix versus marmite toast versus eggs; pavlova versus yogurt and kiwifruit.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
