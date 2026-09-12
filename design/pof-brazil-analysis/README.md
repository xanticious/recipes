# Brazil POF meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for the Meal Ideas catalog** (the live list is
`src/data/mealIdeas.ts`). Do not import them as-is. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** Pesquisa de Orçamentos Familiares (POF) 2017–2018, consumo alimentar
- **Years:** 2017–2018
- **What was located:** Microdata zip is in Downloads: `C:\Users\tonyl\Downloads\survey-data\pof-2018-dados.zip` (contains `CONSUMO_ALIMENTAR.txt`, on the order of 641MB). **This script does not parse that file** (too slow/heavy for this pass). Dictionary fields for a later sitting-level pass: **V9015** hour, **V9017** eating occasion, **V9018** location, **V9001** food code. Plates follow published POF consumo alimentar highlights: rice and beans, pão de queijo, coffee with milk, French bread, feijoada, churrasco leftover, açaí, tapioca, guaraná.
- **Microdata parsed:** No. CONSUMO_ALIMENTAR.txt was not parsed. Lists are qualitative.

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

The same groceries can be different meals: pão francês with coffee versus pão na chapa versus a ham-and-cheese sandwich versus tapioca with the same cheese; leftover rice and beans as lunch versus dinner soup with bread; eggs with bread versus eggs on leftover rice.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
