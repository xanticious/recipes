# NHANES meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult reported
eating at one time on one recall day, for example:

`pork chops, mashed potatoes, gravy, green beans, water`

These lists are inspiration for the **Meal Ideas** catalog (the live list is
`src/data/mealIdeas.ts`; do not import these files as-is): a full dinner
in mind, with optional links out to recipes for the parts.

## How the lists were built

Source files (kept in Downloads, not the repo):

- `DR1IFF_L.xpt` / `DR2IFF_L.xpt` — individual foods, Day 1 and Day 2
- `DRXFCD_L.xpt` — FNDDS food names
- `WWEIA_August2021_August2023_foodcat_FNDDS.xlsx` — food code to WWEIA category
- `DEMO_L.xpt` — age

Filters:

- Reliable recalls only
- Adults 18+
- Sitting eaten mostly at home
- Non-water items mostly from a store (grocery, convenience, grown/caught), not a restaurant
- Lunch and dinner must be a mixed dish (pizza, soup, taco, pasta, …) or at least two foods; dessert-only and fruit-only plates are dropped
- Baby foods and human milk dropped
- A breakfast / lunch / dinner / snack / dessert must include at least one
  non-beverage, non-condiment food
- Patterns seen fewer than 3 times are omitted

Occasion mapping uses the respondent's name (`DR1_030Z` / `DR2_030Z`):

- Breakfast / brunch / desayuno → breakfasts
- Lunch / almuerzo → lunches
- Dinner / supper / comida / cena → dinners
- Snack / merienda / botana and similar → snacks
- Beverage / bebida, or a sitting that is only drinks → drinks
- A snack whose foods are all cakes, cookies, pastry, candy, ice cream, pudding,
  or gelatin → desserts
- Infant feeding, leftover extended consumption, and unnamed occasions → other

Drinks that were part of a meal stay on that plate. Water kinds are merged;
plain milks, the two cereal-sugar bands, regular/diet soda, and regular/Greek
yogurt are merged so similar plates stack.

Counts are raw sitting counts, not NHANES sample-weighted national estimates.

## Run counts

Adult food rows used: 145,260

| List       | Home sittings | Distinct plates | Listed (3+) |
| ---------- | ------------: | --------------: | ----------: |
| Breakfasts |         5,861 |           3,762 |         286 |
| Lunches    |         3,145 |           2,480 |         104 |
| Dinners    |         5,737 |           4,725 |         132 |
| Drinks     |        13,404 |             357 |         111 |
| Snacks     |         6,265 |           2,005 |         264 |
| Desserts   |         2,870 |             245 |          76 |
| Other      |           170 |              75 |          12 |

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/analyze-nhanes-meals.py
```

Requires pandas and openpyxl (installed in `Downloads/nhanes-venv`).
