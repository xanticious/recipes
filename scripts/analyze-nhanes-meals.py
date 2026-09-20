"""
Build occasion-grouped meal-idea lists from NHANES 2021-2023 dietary recalls.

Reads SAS XPORT and WWEIA files from the Downloads folder (or --data-dir)
and writes markdown lists to design/nhanes-analysis/.
"""

from __future__ import annotations

import argparse
import re
from collections import Counter, defaultdict
from pathlib import Path

import pandas as pd

OCCASION_TO_BUCKET = {
    1: "breakfasts",
    2: "lunches",
    3: "dinners",
    4: "dinners",  # supper
    5: "breakfasts",  # brunch
    6: "snacks",
    7: "drinks",
    8: "other",  # infant feeding
    9: "other",  # extended consumption
    10: "breakfasts",  # desayuno
    11: "lunches",  # almuerzo
    12: "dinners",  # comida
    13: "snacks",  # merienda
    14: "dinners",  # cena
    15: "snacks",  # entre comida
    16: "snacks",  # botana
    17: "snacks",  # bocadillo
    18: "snacks",  # tentempie
    19: "drinks",  # bebida
    91: "other",
}

BUCKET_TITLES = {
    "breakfasts": "Breakfasts",
    "lunches": "Lunches",
    "dinners": "Dinners",
    "drinks": "Drinks",
    "snacks": "Snacks",
    "desserts": "Desserts",
    "other": "Other",
}

DESSERT_CATS = {5502, 5504, 5506, 5702, 5704, 5802, 5804, 5806}
WATER_CATS = {7702, 7704, 7802, 7804, 9204}
MILK_CATS = {1002, 1004, 1006, 1008}
CEREAL_CATS = {4602, 4604}
SODA_CATS = {7102, 7202}
YOGURT_CATS = {1820, 1822}
BABY_CATS = {
    9002,
    9004,
    9006,
    9007,
    9008,
    9010,
    9012,
    9202,
    9204,
    9402,
    9404,
    9602,
}
CONDIMENT_CATS = {
    8002,
    8004,
    8006,
    8008,
    8010,
    8012,
    8402,
    8404,
    8406,
    8408,
    8410,
    8412,
    8802,
    8804,
    8806,
}
BEVERAGE_CATS = (
    {7002, 7004, 7006, 7008, 7102, 7104, 7106, 7202, 7204, 7206, 7208, 7220, 7302, 7304}
    | {7502, 7504, 7506}
    | WATER_CATS
    | MILK_CATS
    | {1902}
)
STORE_SOURCES = {1, 19, 27, 28}
MIXED_DISH_CATS = set(range(3002, 3810)) | set(range(3502, 3745))
SNACKY_CATS = DESSERT_CATS | set(range(5002, 5405)) | set(range(6002, 6025)) | {2804}
PROTEIN_CATS = set(range(2002, 2807)) | {2502}

CATEGORY_SHORT = {
    2002: "beef",
    2004: "ground beef",
    2006: "pork",
    2008: "lamb or game",
    2202: "chicken",
    2204: "chicken nuggets",
    2206: "turkey",
    2402: "fish",
    2404: "shellfish",
    2502: "eggs",
    2602: "cold cuts",
    2604: "bacon",
    2606: "hot dogs",
    2608: "sausage",
    2802: "beans",
    2804: "nuts",
    3002: "beef mixed dish",
    3004: "chicken mixed dish",
    3006: "seafood mixed dish",
    3104: "vegetable dish",
    3202: "rice dish",
    3204: "pasta dish",
    3206: "mac and cheese",
    3402: "fried rice or lo mein",
    3404: "stir-fry",
    3406: "egg roll, dumpling, or sushi",
    3502: "burrito or taco",
    3504: "nachos",
    3506: "Mexican mixed dish",
    3602: "pizza",
    3702: "burger",
    3703: "hot dog sandwich",
    3704: "chicken sandwich",
    3706: "breakfast sandwich",
    3720: "cheese sandwich",
    3722: "PB&J",
    3730: "seafood sandwich",
    3740: "deli sandwich",
    3742: "meat sandwich",
    3744: "veggie sandwich",
    3804: "broth soup",
    3806: "cream soup",
    3808: "ramen",
    4002: "rice",
    4004: "pasta",
    4202: "bread",
    4204: "rolls",
    4206: "bagel or English muffin",
    4208: "tortilla",
    4402: "biscuit or muffin",
    4404: "pancakes or waffles",
    4802: "oatmeal",
    4804: "grits",
    5002: "potato chips",
    5004: "tortilla chips",
    5006: "popcorn",
    5402: "cereal bar",
    5502: "cake or pie",
    5504: "cookies",
    5506: "pastry",
    5702: "chocolate",
    5704: "candy",
    5802: "ice cream",
    5804: "pudding",
    5806: "gelatin or sorbet",
    6002: "apple",
    6004: "banana",
    6006: "grapes",
    6412: "green beans",
    6410: "salad",
    6407: "broccoli",
    6409: "spinach",
    6430: "fried vegetables",
    6802: "baked potatoes",
    6804: "french fries",
    6806: "mashed potatoes",
    7002: "orange juice",
    7004: "apple juice",
    7204: "fruit drink",
    7208: "nutrition shake",
    7220: "smoothie",
    7502: "beer",
    7504: "wine",
    7506: "cocktail",
    8002: "butter",
    8006: "sour cream",
    8010: "mayonnaise",
    8012: "salad dressing",
    8402: "ketchup or salsa",
    8412: "gravy or sauce",
    8806: "jam or syrup",
}

FOOD_NAME_RULES = (
    (re.compile(r"pork chop", re.I), "pork chops"),
    (re.compile(r"^beans, string|^string bean", re.I), "green beans"),
    (re.compile(r"^potato, mashed|mashed potato", re.I), "mashed potatoes"),
    (re.compile(r"french fry|french fries", re.I), "french fries"),
    (re.compile(r"^water", re.I), "water"),
    (re.compile(r"^coffee(?! creamer)", re.I), "coffee"),
    (re.compile(r"^tea,", re.I), "tea"),
    (re.compile(r"^soft drink|^soda", re.I), "soda"),
    (re.compile(r"^milk,|^milk$", re.I), "milk"),
    (re.compile(r"ice cream", re.I), "ice cream"),
    (re.compile(r"^chicken breast", re.I), "chicken breast"),
    (re.compile(r"^chicken thigh", re.I), "chicken thighs"),
    (re.compile(r"^chicken wing", re.I), "chicken wings"),
    (re.compile(r"^rice, white|^white rice", re.I), "white rice"),
    (re.compile(r"^rice, brown|^brown rice", re.I), "brown rice"),
    (re.compile(r"^bread, white", re.I), "white bread"),
    (re.compile(r"^bread, wheat|^bread, whole", re.I), "wheat bread"),
    (re.compile(r"^egg, whole|^eggs,", re.I), "eggs"),
    (re.compile(r"^orange juice", re.I), "orange juice"),
)


def decode(value) -> str:
    if isinstance(value, bytes):
        return value.decode("latin-1").strip()
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return ""
    return str(value).strip()


def as_int(value) -> int | None:
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def clean_food_name(desc: str) -> str:
    text = decode(desc)
    if not text:
        return "unknown food"
    for pattern, label in FOOD_NAME_RULES:
        if pattern.search(text):
            return label
    head = text.split(",")[0].strip()
    head = re.sub(r"\s+", " ", head)
    return head.lower()


def coarsen_category(cat_num: int | None, cat_desc: str) -> str:
    if cat_num is None:
        return "unknown food"
    if cat_num in WATER_CATS:
        return "water"
    if cat_num in MILK_CATS:
        return "milk"
    if cat_num in CEREAL_CATS:
        return "cereal"
    if cat_num in SODA_CATS:
        return "soda"
    if cat_num in YOGURT_CATS:
        return "yogurt"
    if cat_num in CATEGORY_SHORT:
        return CATEGORY_SHORT[cat_num]
    desc = cat_desc.lower()
    desc = re.sub(r", excludes.*$", "", desc)
    desc = re.sub(r"\s+", " ", desc).strip()
    return desc or f"category {cat_num}"


def pick_label(key: str, counter: Counter | None) -> str:
    if not counter:
        return key
    best, count = counter.most_common(1)[0]
    if best == "unknown food":
        return key
    total = sum(counter.values())
    if best != key and count / total >= 0.35:
        return best
    first = key.split()[0]
    if first in best and (key in best or len(best) >= len(key)):
        return best
    return key


def as_heading(label: str) -> str:
    if label.upper() == "PB&J":
        return "PB&J"
    return label[:1].upper() + label[1:]


def plate_rank(key: str, cat_num: int | None) -> tuple[int, str]:
    num = cat_num or 9999
    if num in DESSERT_CATS or 5402 <= num <= 5806:
        band = 7
    elif num in BEVERAGE_CATS or key in {"water", "milk", "soda", "coffee", "tea"}:
        band = 8
    elif num in CONDIMENT_CATS:
        band = 6
    elif 6002 <= num <= 6024:
        band = 5
    elif 1002 <= num <= 1904:
        band = 4
    elif 6402 <= num <= 6806:
        band = 3
    elif 4002 <= num <= 4804:
        band = 2
    else:
        band = 1
    return (band, key)


def load_codes(data_dir: Path) -> pd.DataFrame:
    wweia = pd.read_excel(
        data_dir / "WWEIA_August2021_August2023_foodcat_FNDDS.xlsx",
        "Aug2021-Aug2023_FNDDS_foodcat",
    )
    names = pd.read_sas(data_dir / "DRXFCD_L.xpt", format="xport")
    names["food_code"] = names["DRXFDCD"].map(as_int)
    names["short_name"] = names["DRXFCSD"].map(decode)
    names["long_name"] = names["DRXFCLD"].map(decode)
    wweia = wweia.rename(
        columns={
            "food_code_description": "wweia_name",
            "category_number": "category_number",
            "category_description": "category_description",
        }
    )
    wweia["food_code"] = wweia["food_code"].map(as_int)
    wweia["category_number"] = wweia["category_number"].map(as_int)
    merged = wweia.merge(names[["food_code", "short_name", "long_name"]], on="food_code", how="left")
    return merged


def load_demo(data_dir: Path) -> pd.DataFrame:
    demo = pd.read_sas(data_dir / "DEMO_L.xpt", format="xport")
    return pd.DataFrame(
        {
            "SEQN": demo["SEQN"].map(as_int),
            "age": demo["RIDAGEYR"],
        }
    )


def load_iff(path: Path, day: int) -> pd.DataFrame:
    raw = pd.read_sas(path, format="xport")
    frame = pd.DataFrame(
        {
            "SEQN": raw["SEQN"].map(as_int),
            "status": raw[f"DR{day}DRSTZ"].map(as_int),
            "time": raw[f"DR{day}_020"],
            "occasion": raw[f"DR{day}_030Z"].map(as_int),
            "at_home": raw[f"DR{day}_040Z"].map(as_int),
            "source": raw[f"DR{day}FS"].map(as_int),
            "food_code": raw[f"DR{day}IFDCD"].map(as_int),
            "kcal": raw[f"DR{day}IKCAL"],
            "day": day,
        }
    )
    return frame


def classify_bucket(occasion: int | None, keys: list[str], cat_nums: list[int]) -> str:
    base = OCCASION_TO_BUCKET.get(occasion or 91, "other")
    food_cats = [n for n in cat_nums if n not in BEVERAGE_CATS and n not in CONDIMENT_CATS]
    dessert_cats = [n for n in food_cats if n in DESSERT_CATS]
    if not food_cats and keys:
        return "drinks"
    if base == "snacks" and dessert_cats and len(dessert_cats) == len(food_cats):
        return "desserts"
    if base == "other" and not food_cats:
        return "drinks"
    return base


def analyze(data_dir: Path, out_dir: Path, min_age: int = 18, min_count: int = 3) -> dict:
    print("Loading definition files...")
    codes = load_codes(data_dir)
    demo = load_demo(data_dir)
    adults = set(demo.loc[demo["age"] >= min_age, "SEQN"])

    print("Loading Day 1 foods...")
    day1 = load_iff(data_dir / "DR1IFF_L.xpt", 1)
    print("Loading Day 2 foods...")
    day2 = load_iff(data_dir / "DR2IFF_L.xpt", 2)
    foods = pd.concat([day1, day2], ignore_index=True)
    foods = foods[foods["status"] == 1]
    foods = foods[foods["SEQN"].isin(adults)]
    foods = foods[foods["food_code"].notna()]

    print(f"Adult food rows: {len(foods):,}")

    foods = foods.merge(
        codes[["food_code", "category_number", "category_description", "long_name"]],
        on="food_code",
        how="left",
    )
    foods["category_number"] = foods["category_number"].map(as_int)
    foods = foods[~foods["category_number"].isin(BABY_CATS)]
    foods["cat_desc"] = foods["category_description"].map(decode)
    foods["long_name"] = foods["long_name"].map(decode)
    foods["key"] = [
        coarsen_category(num, desc)
        for num, desc in zip(foods["category_number"], foods["cat_desc"])
    ]
    foods["food_name"] = [
        clean_food_name(name or desc)
        for name, desc in zip(foods["long_name"], foods["cat_desc"])
    ]

    meals: dict[tuple, list[dict]] = defaultdict(list)
    for row in foods.itertuples(index=False):
        meals[(row.SEQN, row.day, row.time, row.occasion)].append(
            {
                "at_home": row.at_home,
                "source": row.source,
                "cat_num": row.category_number,
                "key": row.key,
                "food_name": row.food_name,
            }
        )

    clusters: dict[str, dict[tuple[str, ...], dict]] = defaultdict(
        lambda: defaultdict(
            lambda: {"count": 0, "home": 0, "names": defaultdict(Counter), "cats": {}}
        )
    )
    meal_totals = Counter()
    skipped_tiny = 0

    for (_seqn, _day, _time, occasion), items in meals.items():
        if not items:
            continue
        # Prefer home plates for cook-from-scratch ideas.
        home_votes = sum(1 for item in items if item["at_home"] == 1)
        if home_votes * 2 < len(items):
            continue
        solid = [item for item in items if item["key"] != "water"]
        if solid and sum(1 for item in solid if item["source"] in STORE_SOURCES) * 2 < len(solid):
            continue
        keys = []
        seen = set()
        cat_nums = []
        for item in items:
            if item["key"] in seen:
                continue
            seen.add(item["key"])
            keys.append(item["key"])
            if item["cat_num"] is not None:
                cat_nums.append(item["cat_num"])
        bucket = classify_bucket(occasion, keys, cat_nums)
        foodish = [
            item
            for item in items
            if item["cat_num"] not in BEVERAGE_CATS and item["cat_num"] not in CONDIMENT_CATS
        ]
        if bucket in {"breakfasts", "lunches", "dinners", "snacks", "desserts"} and not foodish:
            skipped_tiny += 1
            continue
        if bucket in {"lunches", "dinners"}:
            food_keys = {item["key"] for item in foodish}
            has_mixed = any(item["cat_num"] in MIXED_DISH_CATS for item in foodish)
            snacky = bool(foodish) and all(
                item["cat_num"] in SNACKY_CATS for item in foodish
            )
            has_protein = any(item["cat_num"] in PROTEIN_CATS for item in foodish)
            if snacky or not (has_mixed or has_protein):
                skipped_tiny += 1
                continue
            if not has_mixed and len(food_keys) < 2:
                skipped_tiny += 1
                continue
        keys_sorted = tuple(sorted(keys, key=lambda k: plate_rank(k, None)))
        if not keys_sorted:
            continue
        cluster = clusters[bucket][keys_sorted]
        cluster["count"] += 1
        cluster["home"] += 1
        meal_totals[bucket] += 1
        for item in items:
            cluster["names"][item["key"]][item["food_name"]] += 1
            if item["key"] not in cluster["cats"] and item["cat_num"] is not None:
                cluster["cats"][item["key"]] = item["cat_num"]

    out_dir.mkdir(parents=True, exist_ok=True)
    stats = {
        "adult_food_rows": int(len(foods)),
        "adults": len(adults),
        "skipped_tiny": skipped_tiny,
        "buckets": {},
    }

    for bucket, title in BUCKET_TITLES.items():
        ranked = sorted(clusters[bucket].items(), key=lambda kv: (-kv[1]["count"], kv[0]))
        kept = [(pattern, data) for pattern, data in ranked if data["count"] >= min_count]
        stats["buckets"][bucket] = {
            "meals": meal_totals[bucket],
            "patterns": len(ranked),
            "listed": len(kept),
        }
        write_bucket(out_dir / f"{bucket}.md", title, kept, ranked)

    write_readme(out_dir / "README.md", stats, min_age, min_count)
    return stats


def display_plate(pattern: tuple[str, ...], name_counts: dict) -> str:
    labels = []
    seen = set()
    for key in pattern:
        label = pick_label(key, name_counts.get(key))
        if label in seen:
            continue
        seen.add(label)
        labels.append(label)
    return ", ".join(labels)


def primary_label(pattern: tuple[str, ...], data: dict) -> str:
    cats = data.get("cats") or {}
    ranked = sorted(pattern, key=lambda key: plate_rank(key, cats.get(key)))
    for key in ranked:
        cat_num = cats.get(key)
        if key in {"water", "soda", "coffee", "tea", "milk"} or cat_num in BEVERAGE_CATS:
            continue
        if cat_num in CONDIMENT_CATS:
            continue
        return as_heading(pick_label(key, data["names"].get(key)))
    return as_heading(pick_label(ranked[0], data["names"].get(ranked[0])))


def often_with(main: str, all_ranked: list) -> list[str]:
    sides: Counter[str] = Counter()
    for pattern, data in all_ranked:
        if primary_label(pattern, data) != main:
            continue
        for part in display_plate(pattern, data["names"]).split(", "):
            if part.casefold() == main.casefold() or part == "water":
                continue
            sides[part] += data["count"]
    return [name for name, _count in sides.most_common(6)]


def write_bucket(path: Path, title: str, ranked: list, all_ranked: list) -> None:
    tiers = [
        ("Very common", 25),
        ("Common", 10),
        ("Occasional", 3),
    ]
    lines = [
        f"# {title}",
        "",
        "Home-eaten plates from NHANES August 2021–August 2023, adults 18+, Day 1 and Day 2.",
        "Each line is a sitting: foods reported together at one time and occasion.",
        "Similar foods are stacked (pork chops with mashed potatoes counts with other pork + mashed potato plates).",
        "Count is how many adult sittings matched that plate.",
        "",
    ]
    used = set()
    for label, threshold in tiers:
        rows = [(pattern, data) for pattern, data in ranked if data["count"] >= threshold and pattern not in used]
        for pattern, _data in rows:
            used.add(pattern)
        lines.append(f"## {label} ({threshold}+ sittings)")
        lines.append("")
        if not rows:
            lines.append("_None at this threshold._")
            lines.append("")
            continue
        by_main: dict[str, list] = defaultdict(list)
        for pattern, data in rows:
            by_main[primary_label(pattern, data)].append((pattern, data))
        for main in sorted(by_main, key=lambda name: (-sum(d["count"] for _p, d in by_main[name]), name)):
            lines.append(f"### {main}")
            lines.append("")
            extras = often_with(main, all_ranked)
            if extras:
                lines.append(f"Often with: {', '.join(extras)}")
                lines.append("")
            for pattern, data in by_main[main]:
                plate = display_plate(pattern, data["names"])
                lines.append(f"- {plate} ({data['count']})")
            lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {path} ({len(ranked)} plates)")


def write_readme(path: Path, stats: dict, min_age: int, min_count: int) -> None:
    bucket_rows = []
    for bucket, title in BUCKET_TITLES.items():
        info = stats["buckets"][bucket]
        bucket_rows.append(
            f"| {title} | {info['meals']:,} | {info['patterns']:,} | {info['listed']:,} |"
        )
    text = f"""# NHANES meal ideas

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
- Adults {min_age}+
- Sitting eaten mostly at home
- Non-water items mostly from a store (grocery, convenience, grown/caught), not a restaurant
- Lunch and dinner must be a mixed dish (pizza, soup, taco, pasta, …) or at least two foods; dessert-only and fruit-only plates are dropped
- Baby foods and human milk dropped
- A breakfast / lunch / dinner / snack / dessert must include at least one
  non-beverage, non-condiment food
- Patterns seen fewer than {min_count} times are omitted

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

Adult food rows used: {stats["adult_food_rows"]:,}

| List | Home sittings | Distinct plates | Listed ({min_count}+) |
| --- | ---: | ---: | ---: |
{chr(10).join(bucket_rows)}

## Regenerate

```
C:\\Users\\tonyl\\Downloads\\nhanes-venv\\Scripts\\python.exe scripts/analyze-nhanes-meals.py
```

Requires pandas and openpyxl (installed in `Downloads/nhanes-venv`).
"""
    path.write_text(text, encoding="utf-8")
    print(f"Wrote {path}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=Path.home() / "Downloads",
        help="Folder with NHANES XPT and WWEIA Excel files",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "design" / "nhanes-analysis",
        help="Output folder for markdown lists",
    )
    parser.add_argument("--min-age", type=int, default=18)
    parser.add_argument("--min-count", type=int, default=3)
    args = parser.parse_args()
    analyze(args.data_dir, args.out_dir, args.min_age, args.min_count)


if __name__ == "__main__":
    main()
