# EFSA meal ideas

Frequency-ranked **plates**, not recipes. A plate is everything one adult
would typically eat at one time on one recall day, for example:

`toast, eggs, tea`

These lists are **inspiration for the Meal Ideas catalog** (the live list is
`src/data/mealIdeas.ts`). Do not import them as-is. They are
**not a live catalog import** and were not scored as NHANES sitting counts.

## Survey

- **Survey:** EFSA Comprehensive European Food Consumption Database (chronic, all subjects, g/day)
- **Years:** Compiled from national dietary surveys (country years vary; mostly 2000s–2010s in this extract)
- **What was located:** Excel extract downloaded to `C:\Users\tonyl\Downloads\survey-data\efsa-chronicgdaytotpop.xlsx`. Sheet `L3_All_subjects_g_day` is FoodEx Level 3 consumption for all subjects. This is **not** sitting-level plate data.
- **Microdata parsed:** Yes, for the Adult FoodEx L3 consumption table only (Adults, 16 countries, 23 surveys, top 25 of 1083 L3 foods). Plate lists were not derived from sittings.

## How the lists were built

Filters analogous to the NHANES meal-idea pass:

- Adults (analogous to NHANES 18+)
- Home-eaten everyday fare, not restaurant tasting menus
- Grocery / home-store foods rather than eat-out as the default
- Lunch and dinner are mixed plates, not dessert-only or drink-only
- Baby foods omitted
- Drinks that belong with a meal stay on that plate; drink-only sittings go in drinks.md
- Continental European everyday meals (bread and cheese, pasta, meat and potatoes, yogurt, coffee). UK-only plates belong in ndns-analysis; Italy-only specialties belong in scai-analysis.

Published food-group results and typical home eating occasions fill the
plate lists. Occasion mapping follows the same buckets as NHANES:
breakfasts, lunches, dinners, drinks, snacks, desserts, and other
(unnamed, leftover, or odd-hour sittings).

Drinks that belong with a meal stay on that plate. Standalone drink
sittings go in drinks.md. Water kinds are treated as one drink;
plain milks, regular/diet soda, and similar yogurts are stacked.

## Preparation variants

The same groceries can be different meals: bread and cheese versus a toasted sandwich versus an omelette with bread; leftover stew with potatoes versus the same meat in a salad with bread; yogurt as breakfast versus dessert.

The same groceries can be several meals. Do not collapse those into one
catalog row when the eating occasion feels different.

## Top FoodEx Level 3 foods (Adults)

Parsed `efsa-chronicgdaytotpop.xlsx`, sheet `L3_All_subjects_g_day`.
Adults only; rows with Mean consumption = 0 dropped (9,487 remaining
country-survey rows). **16 countries**, **23 surveys**,
**1083** Level 3 foods with a non-zero mean.

Value is the **median across surveys** of mean grams/day (all subjects in
the adult class). This is consumption volume, not sitting counts. Water,
coffee, milk, and bread dominate, as expected.

| Rank | FoodEx L3                          | Median mean g/day |
| ---: | ---------------------------------- | ----------------: |
|    1 | Tap water                          |             501.3 |
|    2 | Coffee drink, café américano       |             216.7 |
|    3 | Cow milk                           |             147.8 |
|    4 | Black tea, infusion                |             107.9 |
|    5 | Wheat bread and rolls              |              88.1 |
|    6 | Beer, regular                      |              84.5 |
|    7 | Still mineral water                |              57.1 |
|    8 | Bottled water                      |              56.2 |
|    9 | Potato boiled                      |              54.1 |
|   10 | Filmjölk                           |              43.4 |
|   11 | Fruit tee, infusion                |              40.5 |
|   12 | Apple (Malus domesticus)           |              39.1 |
|   13 | Pastries and cakes                 |              37.3 |
|   14 | Cola beverages, caffeinic          |              34.6 |
|   15 | Juice, Orange                      |              33.9 |
|   16 | Beer and beer-like beverage        |              33.6 |
|   17 | Carbonated mineral water           |              33.3 |
|   18 | Soft drink, flavoured              |              29.5 |
|   19 | Tomatoes (Lycopersicum esculentum) |              29.4 |
|   20 | Tea (Infusion)                     |              24.3 |
|   21 | Chicken meat (Gallus domesticus)   |              24.0 |
|   22 | Cheese, Danbo                      |              23.8 |
|   23 | Wine, red                          |              22.8 |
|   24 | Herbal tea, infusion               |              21.6 |
|   25 | Beef meat (Bos spp.)               |              20.8 |

## Regenerate

```
C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe scripts/write-regional-analyses.py
```

Requires pandas and openpyxl only for the EFSA table. Other folders are
curated markdown and write even if that parse fails.
