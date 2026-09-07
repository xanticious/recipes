"""Write qualitative meal-idea analysis folders for non-NHANES nutrition surveys.

Lists follow design/nhanes-analysis/ (plates, "Often with", grouped by main food)
but do not invent sitting counts. Frequency is Very common / Common / Also seen.

EFSA: if pandas can read the Comprehensive Database Excel, a table of top FoodEx
L3 foods (Adults, median of mean g/day, Mean != 0) is inserted into the README.
POF microdata is documented only; the 641MB CONSUMO_ALIMENTAR.txt is not parsed.
"""

from __future__ import annotations

import traceback
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "design"
EFSA_XLSX = Path.home() / "Downloads" / "survey-data" / "efsa-chronicgdaytotpop.xlsx"
POF_ZIP = Path.home() / "Downloads" / "survey-data" / "pof-2018-dados.zip"

OCCASIONS = (
    "breakfasts",
    "lunches",
    "dinners",
    "drinks",
    "snacks",
    "desserts",
    "other",
)
OCCASION_TITLES = {
    "breakfasts": "Breakfasts",
    "lunches": "Lunches",
    "dinners": "Dinners",
    "drinks": "Drinks",
    "snacks": "Snacks",
    "desserts": "Desserts",
    "other": "Other",
}
BANDS = ("very_common", "common", "also_seen")
BAND_HEADINGS = {
    "very_common": "Very common",
    "common": "Common",
    "also_seen": "Also seen",
}

REGENERATE = (
    r"C:\Users\tonyl\Downloads\nhanes-venv\Scripts\python.exe "
    r"scripts/write-regional-analyses.py"
)

SHARED_INTRO = (
    "Each line is a typical sitting: foods eaten together at one time and occasion.\n"
    "Similar foods are stacked (toast with eggs counts with other egg-and-toast plates).\n"
    "Frequency bands are qualitative (**Very common** / **Common** / **Also seen**).\n"
    "Sitting counts were not computed from microdata."
)


def g(title: str, often: str, *plates: str) -> tuple[str, str, tuple[str, ...]]:
    return (title, often, plates)


def count_groups(bands: dict[str, list]) -> int:
    return sum(len(bands.get(key, [])) for key in BANDS)


def render_occasion(
    title: str,
    source_line: str,
    bands: dict[str, list[tuple[str, str, tuple[str, ...]]]],
) -> str:
    lines = [
        f"# {title}",
        "",
        source_line,
        SHARED_INTRO,
        "",
    ]
    for key in BANDS:
        groups = bands.get(key) or []
        if not groups:
            continue
        lines.append(f"## {BAND_HEADINGS[key]}")
        lines.append("")
        for heading, often, plates in groups:
            lines.append(f"### {heading}")
            lines.append("")
            if often:
                lines.append(f"Often with: {often}")
                lines.append("")
            for plate in plates:
                lines.append(f"- {plate}")
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_readme(
    *,
    heading: str,
    survey: str,
    years: str,
    located: str,
    parsed: str,
    filters: str,
    prep_variants: str,
    extra: str = "",
) -> str:
    parts = [
        f"# {heading}",
        "",
        "Frequency-ranked **plates**, not recipes. A plate is everything one adult",
        "would typically eat at one time on one recall day, for example:",
        "",
        "`toast, eggs, tea`",
        "",
        "These lists are **inspiration for a later Meal Ideas catalog page**: a full",
        "dinner in mind, with optional links out to recipes for the parts. They are",
        "**not a live catalog import** and were not scored as NHANES sitting counts.",
        "",
        "## Survey",
        "",
        f"- **Survey:** {survey}",
        f"- **Years:** {years}",
        f"- **What was located:** {located}",
        f"- **Microdata parsed:** {parsed}",
        "",
        "## How the lists were built",
        "",
        "Filters analogous to the NHANES meal-idea pass:",
        "",
        filters,
        "",
        "Published food-group results and typical home eating occasions fill the",
        "plate lists. Occasion mapping follows the same buckets as NHANES:",
        "breakfasts, lunches, dinners, drinks, snacks, desserts, and other",
        "(unnamed, leftover, or odd-hour sittings).",
        "",
        "Drinks that belong with a meal stay on that plate. Standalone drink",
        "sittings go in drinks.md. Water kinds are treated as one drink;",
        "plain milks, regular/diet soda, and similar yogurts are stacked.",
        "",
        "## Preparation variants",
        "",
        prep_variants,
        "",
        "The same groceries can be several meals. Do not collapse those into one",
        "catalog row when the eating occasion feels different.",
        "",
    ]
    if extra:
        parts.extend([extra.rstrip(), ""])
    parts.extend(
        [
            "## Regenerate",
            "",
            "```",
            REGENERATE,
            "```",
            "",
            "Requires pandas and openpyxl only for the EFSA table. Other folders are",
            "curated markdown and write even if that parse fails.",
            "",
        ]
    )
    return "\n".join(parts)


def clean_foodex(name: str) -> str:
    return (
        name.replace("caf\ufffd am\ufffdricano", "café américain")
        .replace("Filmj\ufffdlk", "Filmjölk")
        .replace("Musa \ufffd paradisica", "Musa × paradisiaca")
        .replace("caf� am�ricano", "café américain")
        .replace("Filmj�lk", "Filmjölk")
        .replace("Musa � paradisica", "Musa × paradisiaca")
    )


def parse_efsa_table(path: Path) -> tuple[str | None, str]:
    """Return (markdown table or None, status note)."""
    try:
        import pandas as pd
    except Exception as exc:  # pragma: no cover
        return None, f"pandas import failed: {exc}"
    if not path.is_file():
        return None, f"Excel not found at {path}"
    try:
        df = pd.read_excel(path, sheet_name="L3_All_subjects_g_day", header=1)
        df = df[df["Population Class"] == "Adults"].copy()
        mean_col = "Mean consumption in grams/day"
        df["Mean"] = pd.to_numeric(df[mean_col], errors="coerce")
        df = df[df["Mean"].notna() & (df["Mean"] != 0)]
        grouped = (
            df.groupby("Level 3 FoodEx Name", as_index=False)["Mean"]
            .median()
            .sort_values("Mean", ascending=False)
        )
        n_surveys = int(df["Dietary survey"].nunique())
        n_countries = int(df["Country of the dietary survey"].nunique())
        n_foods = int(len(grouped))
        top = grouped.head(25)
        lines = [
            "## Top FoodEx Level 3 foods (Adults)",
            "",
            f"Parsed `{path.name}`, sheet `L3_All_subjects_g_day`.",
            f"Adults only; rows with Mean consumption = 0 dropped ({len(df):,} remaining",
            f"country-survey rows). **{n_countries} countries**, **{n_surveys} surveys**,",
            f"**{n_foods}** Level 3 foods with a non-zero mean.",
            "",
            "Value is the **median across surveys** of mean grams/day (all subjects in",
            "the adult class). This is consumption volume, not sitting counts. Water,",
            "coffee, milk, and bread dominate, as expected.",
            "",
            "| Rank | FoodEx L3 | Median mean g/day |",
            "| ---: | --------- | ----------------: |",
        ]
        for i, row in enumerate(top.itertuples(index=False), start=1):
            food = clean_foodex(str(row[0]))
            lines.append(f"| {i} | {food} | {row[1]:.1f} |")
        lines.append("")
        return "\n".join(lines), (
            f"Adults, {n_countries} countries, {n_surveys} surveys, "
            f"top 25 of {n_foods} L3 foods"
        )
    except Exception as exc:
        return None, f"parse failed: {exc}\n{traceback.format_exc()}"


# ---------------------------------------------------------------------------
# Plate lists
# ---------------------------------------------------------------------------

NDNS_BREAKFASTS = {
    "very_common": [
        g("Cereal", "milk, tea, banana, sugar, coffee", "cereal, milk", "cereal, tea, milk", "cereal, banana, milk"),
        g("Toast", "butter, jam, marmalade, tea, margarine", "toast, butter, tea", "toast, butter, jam", "toast, marmalade, tea"),
        g("Porridge", "milk, sugar, honey, banana, tea", "porridge, milk", "porridge, milk, sugar, tea"),
        g("Eggs on toast", "tea, butter, beans, tomato, coffee", "eggs, toast, tea", "scrambled eggs, toast, butter"),
        g("Yogurt", "fruit, granola, honey, tea", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Beans on toast", "tea, butter, cheese", "beans on toast, tea", "beans on toast"),
        g("Bacon sandwich", "tea, ketchup, brown sauce, butter", "bacon sandwich, tea", "bacon, toast, tea"),
        g("Fruit", "tea, yogurt, toast", "banana, tea", "apple"),
        g("Crumpets", "butter, jam, tea", "crumpets, butter, tea"),
        g("Cheese on toast", "tea, worcestershire sauce, tomato", "cheese on toast, tea"),
        g("Marmite on toast", "butter, tea", "toast, marmite, butter, tea"),
        g("Muesli", "milk, yogurt, fruit", "muesli, milk", "muesli, yogurt"),
    ],
    "also_seen": [
        g("Cooked breakfast", "tea, toast, beans, tomato, mushrooms", "egg, bacon, toast, beans, tea", "egg, sausage, toast, tea"),
        g("Croissant", "coffee, jam, butter", "croissant, coffee"),
        g("Smoothie", "toast, banana, yogurt", "smoothie", "banana, smoothie"),
        g("Pancakes", "tea, jam, lemon, sugar", "pancakes, lemon, sugar, tea"),
        g("Overnight oats", "yogurt, berries, honey", "overnight oats, yogurt"),
    ],
}

NDNS_LUNCHES = {
    "very_common": [
        g("Sandwich", "crisps, tea, fruit, soup, water", "sandwich, crisps, tea", "ham sandwich, crisps", "cheese sandwich, apple"),
        g("Soup", "bread, butter, cheese, tea", "soup, bread", "soup, bread, butter"),
        g("Jacket potato", "beans, cheese, tuna, salad, tea", "jacket potato, beans, cheese", "jacket potato, tuna, salad"),
        g("Leftovers", "tea, bread, salad", "leftover roast, potatoes, veg", "leftover pasta"),
    ],
    "common": [
        g("Cheese toastie", "soup, crisps, tea, tomato", "cheese toastie, tea", "cheese toastie, soup"),
        g("Pasta", "cheese, salad, garlic bread, water", "pasta, tomato sauce", "leftover spaghetti bolognese"),
        g("Beans on toast", "tea, cheese", "beans on toast, tea"),
        g("Salad", "bread, cheese, ham, dressing", "salad, ham, bread", "mixed salad, cheese"),
        g("Wrap", "crisps, fruit, water", "chicken wrap", "wrap, salad"),
        g("Ploughman's", "bread, pickle, apple, tea", "cheese, bread, pickle, apple"),
        g("Fish finger sandwich", "ketchup, tea, peas", "fish finger sandwich, tea"),
    ],
    "also_seen": [
        g("Pie", "peas, mash, gravy, tea", "meat pie, peas", "leftover pie, potatoes"),
        g("Omelette", "salad, bread, tea", "omelette, salad, bread"),
        g("Pizza leftover", "salad, soda, water", "leftover pizza"),
        g("Baked beans and eggs", "toast, tea", "eggs, beans, toast"),
        g("Couscous or rice salad", "chicken, veg, water", "couscous, chicken, salad"),
    ],
}

NDNS_DINNERS = {
    "very_common": [
        g("Meat and potatoes", "veg, gravy, tea, water", "chicken, potatoes, veg", "pork, potatoes, veg, gravy", "beef, potatoes, veg"),
        g("Pasta", "cheese, garlic bread, salad, wine", "spaghetti bolognese", "pasta, tomato sauce, cheese", "pasta bake"),
        g("Sausage and mash", "peas, gravy, onion, tea", "sausage, mash, peas, gravy"),
        g("Chicken", "rice, potatoes, veg, salad", "roast chicken, potatoes, veg", "chicken, rice, veg"),
    ],
    "common": [
        g("Cottage pie", "peas, carrots, tea", "cottage pie, peas", "shepherd's pie, veg"),
        g("Curry and rice", "naan, yogurt, water", "chicken curry, rice", "leftover curry, rice"),
        g("Fish and chips", "peas, ketchup, tea, vinegar", "fish, chips, peas", "breaded fish, chips, peas"),
        g("Stew", "bread, potatoes, tea", "beef stew, potatoes, bread", "chicken stew, veg"),
        g("Pizza", "salad, soda, garlic bread", "pizza, salad", "pizza"),
        g("Stir fry", "rice, noodles, soy sauce", "chicken stir fry, rice", "veg stir fry, noodles"),
        g("Chilli", "rice, cheese, tortilla chips", "chilli con carne, rice"),
        g("Fish pie", "peas, broccoli, water", "fish pie, peas"),
    ],
    "also_seen": [
        g("Sunday roast", "yorkshire pudding, gravy, veg, potatoes", "roast beef, potatoes, veg, gravy", "roast chicken, potatoes, veg"),
        g("Risotto", "salad, wine, bread", "mushroom risotto", "leftover risotto"),
        g("Jacket potato dinner", "beans, cheese, tuna, salad", "jacket potato, cheese, beans"),
        g("Soup and bread", "cheese, butter, tea", "soup, bread, cheese"),
        g("Toad in the hole", "onion gravy, peas, mash", "toad in the hole, peas, gravy"),
    ],
}

NDNS_DRINKS = {
    "very_common": [
        g("Tea", "milk, sugar, biscuits", "tea", "tea, milk", "tea, milk, sugar"),
        g("Coffee", "milk, sugar, water", "coffee", "coffee, milk"),
        g("Water", "", "water"),
        g("Squash", "water", "squash", "orange squash"),
    ],
    "common": [
        g("Orange juice", "tea, toast", "orange juice"),
        g("Soda", "water, crisps", "soda", "cola"),
        g("Beer", "wine, water", "beer", "lager"),
        g("Wine", "water, cheese", "wine", "red wine"),
        g("Milk", "tea, coffee", "milk"),
        g("Diet soda", "water", "diet soda", "diet cola"),
    ],
    "also_seen": [
        g("Hot chocolate", "milk, biscuits", "hot chocolate"),
        g("Herbal tea", "", "herbal tea"),
        g("Cider", "water", "cider"),
        g("Ribena or fruit drink", "water", "ribena", "fruit drink"),
        g("Irn-Bru", "water", "irn-bru"),
        g("Cocoa", "milk", "cocoa, milk"),
    ],
}

NDNS_SNACKS = {
    "very_common": [
        g("Biscuits", "tea, coffee, milk", "biscuits, tea", "biscuits"),
        g("Crisps", "soda, sandwich, water", "crisps", "crisps, soda"),
        g("Fruit", "tea, yogurt, nuts", "apple", "banana", "grapes"),
        g("Chocolate", "tea, coffee, biscuits", "chocolate", "chocolate, tea"),
    ],
    "common": [
        g("Cheese and crackers", "pickle, apple, tea", "cheese, crackers", "cheese, crackers, pickle"),
        g("Toast", "butter, jam, tea", "toast, butter, tea", "toast, jam"),
        g("Yogurt", "fruit, honey", "yogurt", "yogurt, fruit"),
        g("Nuts", "fruit, chocolate, tea", "nuts", "peanuts"),
        g("Cake", "tea, coffee", "cake, tea", "slice of cake"),
        g("Cereal bar", "tea, coffee, banana", "cereal bar"),
        g("Popcorn", "soda, tea", "popcorn"),
    ],
    "also_seen": [
        g("Scone", "jam, cream, tea, butter", "scone, jam, tea"),
        g("Toast and cheese", "pickle, tea", "cheese on toast"),
        g("Ice lolly", "fruit, water", "ice lolly"),
        g("Hummus and bread", "carrot, crackers", "hummus, bread", "hummus, carrot"),
        g("Leftover sandwich", "crisps, tea", "sandwich"),
    ],
}

NDNS_DESSERTS = {
    "very_common": [
        g("Biscuits", "tea, coffee, milk", "biscuits", "biscuits, tea"),
        g("Ice cream", "chocolate sauce, fruit, wafer", "ice cream", "ice cream, chocolate sauce"),
        g("Cake", "tea, coffee, custard", "cake", "cake, tea"),
        g("Chocolate", "tea, coffee", "chocolate"),
    ],
    "common": [
        g("Crumble and custard", "ice cream, cream, tea", "apple crumble, custard", "crumble, ice cream"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "fruit yogurt"),
        g("Pudding", "custard, cream, ice cream", "sponge pudding, custard"),
        g("Cheesecake", "cream, berries", "cheesecake"),
        g("Trifle", "cream, fruit", "trifle"),
        g("Fruit salad", "yogurt, cream, ice cream", "fruit salad"),
        g("Jelly", "ice cream, fruit", "jelly", "jelly, ice cream"),
    ],
    "also_seen": [
        g("Scone", "jam, cream, tea", "scone, jam, cream"),
        g("Rice pudding", "jam, nutmeg", "rice pudding"),
        g("Banoffee or gateau leftover", "cream, tea", "leftover gateau"),
        g("Custard", "fruit, sponge", "custard, banana"),
        g("Chocolate pudding", "cream, ice cream", "chocolate pudding"),
    ],
}

NDNS_OTHER = {
    "very_common": [
        g("Tea and biscuits", "milk, sugar", "tea, biscuits"),
        g("Fruit", "tea, yogurt", "banana", "apple"),
        g("Toast", "butter, jam, tea, cheese", "toast, butter, tea"),
        g("Leftovers", "tea, bread", "leftover dinner, tea"),
    ],
    "common": [
        g("Cereal at odd hour", "milk, tea", "cereal, milk"),
        g("Cheese", "crackers, pickle, apple", "cheese, crackers"),
        g("Yogurt", "fruit, honey", "yogurt"),
        g("Crisps", "soda, sandwich", "crisps"),
        g("Sandwich leftover", "tea, crisps", "sandwich"),
        g("Soup leftover", "bread, tea", "soup, bread"),
        g("Chocolate", "tea, coffee", "chocolate"),
    ],
    "also_seen": [
        g("Late toast", "cheese, beans, tea", "toast, cheese, tea"),
        g("Milk", "biscuits, cereal", "milk"),
        g("Nuts", "fruit, chocolate", "nuts"),
        g("Ice cream", "chocolate, fruit", "ice cream"),
        g("Cake leftover", "tea, coffee", "cake, tea"),
    ],
}

CCHS_BREAKFASTS = {
    "very_common": [
        g("Cereal", "milk, coffee, banana, orange juice", "cereal, milk", "cereal, milk, coffee", "cereal, banana, milk"),
        g("Toast", "butter, jam, peanut butter, coffee, tea", "toast, butter, coffee", "toast, peanut butter", "toast, jam, coffee"),
        g("Eggs and toast", "coffee, bacon, hash browns, fruit", "eggs, toast, coffee", "scrambled eggs, toast, butter"),
        g("Coffee", "milk, sugar, toast, cereal", "coffee", "coffee, milk"),
        g("Yogurt", "fruit, granola, honey, coffee", "yogurt, fruit", "yogurt, granola"),
    ],
    "common": [
        g("Oatmeal", "milk, brown sugar, banana, coffee", "oatmeal, milk", "oatmeal, banana"),
        g("Bagel", "cream cheese, coffee, jam, butter", "bagel, cream cheese, coffee", "bagel, butter"),
        g("Peanut butter toast", "banana, coffee, milk", "toast, peanut butter, banana"),
        g("Fruit", "yogurt, coffee, toast", "banana, coffee", "apple"),
        g("Breakfast sandwich", "coffee, hash browns, juice", "egg sandwich, coffee", "bacon egg sandwich"),
        g("Pancakes", "syrup, coffee, fruit, bacon", "pancakes, syrup, coffee"),
        g("English muffin", "butter, jam, egg, coffee", "english muffin, butter, coffee"),
    ],
    "also_seen": [
        g("Bacon and eggs", "toast, coffee, hash browns", "bacon, eggs, toast, coffee"),
        g("Smoothie", "toast, banana, yogurt", "smoothie", "smoothie, toast"),
        g("Waffles", "syrup, fruit, coffee", "waffles, syrup"),
        g("Croissant", "coffee, jam", "croissant, coffee"),
        g("Leftover pizza breakfast", "coffee", "leftover pizza, coffee"),
    ],
}

CCHS_LUNCHES = {
    "very_common": [
        g("Sandwich", "chips, apple, soda, water, soup", "sandwich, chips", "ham sandwich, apple", "turkey sandwich, chips, water"),
        g("Soup", "sandwich, crackers, bread, cheese", "soup, sandwich", "soup, crackers, bread"),
        g("Leftovers", "salad, bread, water", "leftover dinner", "leftover pasta, salad"),
        g("Salad", "bread, chicken, dressing, water", "salad, chicken", "garden salad, sandwich"),
    ],
    "common": [
        g("Grilled cheese", "soup, pickles, water", "grilled cheese, soup", "grilled cheese"),
        g("Pasta leftover", "salad, bread, cheese", "leftover pasta", "macaroni and cheese"),
        g("Wrap", "chips, fruit, water", "chicken wrap", "wrap, salad"),
        g("Pizza leftover", "salad, soda", "leftover pizza"),
        g("Peanut butter sandwich", "milk, apple, chips", "peanut butter and jam sandwich, milk"),
        g("Quesadilla", "salsa, sour cream, salad", "quesadilla, salsa"),
        g("Eggs at lunch", "toast, salad, coffee", "eggs, toast, salad"),
    ],
    "also_seen": [
        g("Poutine leftover", "salad, soda, water", "leftover poutine"),
        g("Kraft dinner", "hot dogs, ketchup, water", "macaroni and cheese, hot dogs"),
        g("Baked potato", "cheese, sour cream, salad, chili", "baked potato, cheese, sour cream"),
        g("Chili", "bread, cheese, crackers", "chili, bread, cheese"),
        g("Sushi leftover", "salad, tea, water", "leftover sushi"),
    ],
}

CCHS_DINNERS = {
    "very_common": [
        g("Chicken and potatoes", "veg, salad, gravy, water", "chicken, potatoes, veg", "roast chicken, potatoes, salad"),
        g("Pasta", "garlic bread, salad, cheese, wine", "spaghetti, meat sauce", "pasta, tomato sauce, salad"),
        g("Beef and potatoes", "veg, gravy, bread, water", "steak, potatoes, veg", "ground beef, potatoes, veg"),
        g("Pork", "applesauce, potatoes, veg, rice", "pork chops, potatoes, veg"),
    ],
    "common": [
        g("Stir fry", "rice, noodles, soy sauce", "chicken stir fry, rice", "beef stir fry, rice"),
        g("Pizza", "salad, soda, beer", "pizza, salad", "pizza"),
        g("Salmon", "rice, potatoes, veg, salad", "salmon, rice, veg", "salmon, potatoes, salad"),
        g("Tacos", "salsa, sour cream, salad, rice", "tacos, salsa, salad"),
        g("Soup and bread", "salad, cheese, crackers", "soup, bread, salad"),
        g("Casserole", "salad, bread, veg", "tuna casserole, salad", "chicken casserole"),
        g("Burger at home", "fries, salad, ketchup, soda", "hamburger, salad", "hamburger, fries"),
        g("Chili", "rice, bread, cheese, sour cream", "chili, rice, cheese"),
    ],
    "also_seen": [
        g("Poutine", "salad, beer, soda", "poutine", "homemade poutine, salad"),
        g("Tourtière leftover", "ketchup, salad, pickles", "tourtière, salad"),
        g("Meat pie", "veg, potatoes, ketchup", "meat pie, veg"),
        g("Curry and rice", "naan, yogurt", "chicken curry, rice"),
        g("Lasagna", "salad, garlic bread", "lasagna, salad"),
    ],
}

CCHS_DRINKS = {
    "very_common": [
        g("Coffee", "milk, cream, sugar, water", "coffee", "coffee, milk", "coffee, cream"),
        g("Water", "", "water"),
        g("Tea", "milk, sugar, honey", "tea", "tea, milk"),
        g("Milk", "coffee, cereal", "milk"),
    ],
    "common": [
        g("Orange juice", "coffee, water", "orange juice"),
        g("Soda", "water, chips", "soda", "cola"),
        g("Diet soda", "water", "diet soda"),
        g("Beer", "water, wine", "beer"),
        g("Wine", "water", "wine"),
        g("Apple juice", "water", "apple juice"),
    ],
    "also_seen": [
        g("Hot chocolate", "milk, marshmallows", "hot chocolate"),
        g("Iced coffee", "milk, sugar", "iced coffee"),
        g("Herbal tea", "", "herbal tea"),
        g("Caesar", "water, celery", "caesar"),
        g("Chocolate milk", "", "chocolate milk"),
        g("Sparkling water", "", "sparkling water"),
    ],
}

CCHS_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, cheese, crackers", "apple", "banana", "grapes"),
        g("Crackers", "cheese, peanut butter, soda", "crackers, cheese", "crackers"),
        g("Chips", "salsa, soda, dip", "chips", "chips, salsa"),
        g("Yogurt", "fruit, granola, honey", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Cheese", "crackers, apple, grapes", "cheese, crackers", "cheese"),
        g("Popcorn", "soda, tea, chocolate", "popcorn"),
        g("Chocolate", "coffee, tea, fruit", "chocolate"),
        g("Toast", "peanut butter, jam, butter", "toast, peanut butter"),
        g("Nuts", "fruit, yogurt", "nuts"),
        g("Granola bar", "coffee, banana, yogurt", "granola bar"),
        g("Cookies", "milk, coffee, tea", "cookies, milk", "cookies"),
    ],
    "also_seen": [
        g("Ketchup chips", "soda, sandwich", "ketchup chips"),
        g("Veggies and dip", "hummus, crackers", "carrots, dip", "celery, hummus"),
        g("Ice cream snack", "chocolate, fruit", "ice cream"),
        g("Muffin", "coffee, tea", "muffin, coffee"),
        g("Pretzels", "hummus, cheese, soda", "pretzels"),
    ],
}

CCHS_DESSERTS = {
    "very_common": [
        g("Ice cream", "chocolate sauce, fruit, cone", "ice cream", "ice cream, chocolate sauce"),
        g("Cookies", "milk, coffee, tea", "cookies", "cookies, milk"),
        g("Cake", "coffee, tea, ice cream", "cake", "cake, coffee"),
        g("Chocolate", "tea, coffee, fruit", "chocolate"),
    ],
    "common": [
        g("Pie", "ice cream, cream, coffee", "apple pie, ice cream", "pie"),
        g("Yogurt dessert", "fruit, honey, granola", "yogurt, fruit"),
        g("Brownies", "milk, ice cream, coffee", "brownies", "brownies, ice cream"),
        g("Pudding", "whipped cream, cookie", "pudding"),
        g("Donut leftover", "coffee, milk", "donut, coffee"),
        g("Fruit crisp", "ice cream, cream", "apple crisp, ice cream"),
        g("Squares", "coffee, tea, milk", "date square, coffee", "nanaimo bar"),
    ],
    "also_seen": [
        g("Butter tarts", "coffee, tea, cream", "butter tarts, coffee"),
        g("Nanaimo bar", "coffee, milk", "nanaimo bar, coffee"),
        g("Maple syrup dessert", "ice cream, pancakes leftover", "ice cream, maple syrup"),
        g("Cheesecake", "berries, coffee", "cheesecake"),
        g("Frozen yogurt", "fruit, granola", "frozen yogurt"),
    ],
}

CCHS_OTHER = {
    "very_common": [
        g("Coffee", "milk, toast, muffin", "coffee"),
        g("Fruit", "yogurt, cheese", "banana", "apple"),
        g("Leftovers", "bread, salad, water", "leftover dinner"),
        g("Toast", "peanut butter, jam, coffee", "toast, peanut butter"),
    ],
    "common": [
        g("Yogurt", "fruit, granola", "yogurt"),
        g("Crackers and cheese", "apple, grapes", "cheese, crackers"),
        g("Cereal at odd hour", "milk, coffee", "cereal, milk"),
        g("Chips", "soda, dip", "chips"),
        g("Cookies", "milk, coffee", "cookies, milk"),
        g("Sandwich leftover", "chips, fruit", "sandwich"),
        g("Soup leftover", "bread, crackers", "soup, bread"),
    ],
    "also_seen": [
        g("Muffin", "coffee, tea", "muffin, coffee"),
        g("Chocolate", "coffee, tea", "chocolate"),
        g("Ice cream", "fruit, cookies", "ice cream"),
        g("Nuts", "fruit, yogurt", "nuts"),
        g("Late grilled cheese", "soup, tea", "grilled cheese, tea"),
    ],
}

NNPAS_BREAKFASTS = {
    "very_common": [
        g("Weet-Bix", "milk, sugar, banana, tea, coffee", "weet-bix, milk", "weet-bix, milk, banana", "weet-bix, milk, tea"),
        g("Toast", "butter, vegemite, jam, tea, coffee", "toast, vegemite, butter, tea", "toast, butter, jam, coffee", "toast, butter, tea"),
        g("Cereal", "milk, fruit, coffee, tea", "cereal, milk", "cereal, milk, coffee"),
        g("Eggs on toast", "coffee, tomato, bacon, avocado", "eggs, toast, coffee", "scrambled eggs, toast"),
        g("Tea or coffee with toast", "milk, sugar, vegemite, jam", "coffee, toast", "tea, toast, butter"),
    ],
    "common": [
        g("Yogurt", "fruit, muesli, honey, coffee", "yogurt, fruit", "yogurt, muesli"),
        g("Muesli", "milk, yogurt, fruit", "muesli, milk", "muesli, yogurt"),
        g("Fruit", "yogurt, toast, tea", "banana, tea", "fruit salad, yogurt"),
        g("Porridge", "milk, honey, banana, tea", "porridge, milk", "porridge, honey"),
        g("Bacon and eggs", "toast, tomato, coffee", "bacon, eggs, toast, coffee"),
        g("Avocado toast", "egg, coffee, tomato, feta", "avocado, toast, coffee", "avocado, toast, egg"),
        g("Crumpets", "butter, jam, vegemite, tea", "crumpets, butter, tea"),
    ],
    "also_seen": [
        g("Smoothie", "toast, banana, yogurt", "smoothie", "banana smoothie, toast"),
        g("Leftover leftover dinner", "coffee, toast", "leftover stir fry, rice, coffee"),
        g("Pancakes", "maple syrup, fruit, coffee", "pancakes, syrup, coffee"),
        g("Banana on toast", "honey, peanut butter, tea", "toast, banana, honey"),
        g("Baked beans on toast", "tea, cheese, egg", "baked beans, toast, tea"),
    ],
}

NNPAS_LUNCHES = {
    "very_common": [
        g("Sandwich", "fruit, chips, water, leftover salad", "sandwich, fruit", "ham sandwich, apple", "chicken sandwich, water"),
        g("Leftovers", "salad, bread, water", "leftover dinner", "leftover stir fry, rice"),
        g("Salad", "bread, chicken, cheese, water", "salad, chicken", "salad, bread"),
        g("Wrap", "fruit, chips, water", "chicken wrap", "salad wrap"),
    ],
    "common": [
        g("Meat pie leftover", "sauce, salad, water", "meat pie, salad", "leftover meat pie"),
        g("Toastie", "soup, fruit, tea", "cheese toastie", "ham and cheese toastie"),
        g("Soup", "bread, toast, fruit", "soup, bread"),
        g("Pasta leftover", "salad, cheese, water", "leftover pasta"),
        g("Sushi leftover", "salad, water, tea", "leftover sushi"),
        g("Eggs and toast at lunch", "salad, coffee, tomato", "eggs, toast, salad"),
        g("Rice bowl leftover", "veg, chicken, soy sauce", "leftover rice, chicken, veg"),
    ],
    "also_seen": [
        g("Sausage roll leftover", "sauce, salad", "sausage roll, salad"),
        g("Quiche leftover", "salad, fruit", "quiche, salad"),
        g("Vegemite sandwich", "fruit, water, tea", "vegemite sandwich, fruit"),
        g("Fish and salad", "bread, lemon, water", "leftover fish, salad"),
        g("Dim sim leftover", "soy sauce, rice, tea", "leftover dim sim, rice"),
    ],
}

NNPAS_DINNERS = {
    "very_common": [
        g("Meat and three veg", "potatoes, gravy, salad, water", "chicken, potatoes, veg", "beef, potatoes, veg", "lamb, potatoes, veg"),
        g("Stir fry", "rice, noodles, soy sauce", "chicken stir fry, rice", "beef stir fry, rice"),
        g("Pasta", "salad, garlic bread, cheese", "spaghetti bolognese", "pasta, tomato sauce, salad"),
        g("BBQ", "salad, bread, sausages, beer", "sausages, salad, bread", "bbq chicken, salad"),
    ],
    "common": [
        g("Chicken parma at home", "chips, salad, beer", "chicken parma, salad", "chicken schnitzel, salad, chips"),
        g("Meat pie", "sauce, peas, mash, salad", "meat pie, peas, mash", "meat pie, salad"),
        g("Curry and rice", "naan, yogurt, pappadum", "chicken curry, rice", "leftover curry, rice"),
        g("Fish", "chips, salad, lemon, veg", "grilled fish, salad", "fish, chips, salad"),
        g("Pizza", "salad, soda, beer", "pizza, salad", "pizza"),
        g("Sausages and mash", "peas, gravy, onion", "sausages, mash, peas"),
        g("Roast leftover", "veg, potatoes, gravy, bread", "leftover roast, potatoes, veg"),
        g("Tacos", "salsa, salad, rice, sour cream", "tacos, salad"),
    ],
    "also_seen": [
        g("Lamb roast", "potatoes, veg, gravy, mint sauce", "roast lamb, potatoes, veg"),
        g("Risotto", "salad, wine, bread", "risotto, salad"),
        g("Soup and toast", "cheese, butter, tea", "pumpkin soup, toast"),
        g("Sausage sizzle at home", "onions, bread, sauce, salad", "sausage in bread, onions, salad"),
        g("Leftover Chinese takeaway", "rice, tea, water", "leftover fried rice, water"),
    ],
}

NNPAS_DRINKS = {
    "very_common": [
        g("Coffee", "milk, sugar, water", "coffee", "flat white", "coffee, milk"),
        g("Tea", "milk, sugar, water", "tea", "tea, milk"),
        g("Water", "", "water"),
        g("Milk", "coffee, cereal, milo", "milk"),
    ],
    "common": [
        g("Orange juice", "water, coffee", "orange juice"),
        g("Soda", "water, chips", "soda", "lemonade"),
        g("Beer", "water, wine", "beer"),
        g("Wine", "water", "wine"),
        g("Milo", "milk, ice", "milo, milk"),
        g("Diet soda", "water", "diet soda"),
    ],
    "also_seen": [
        g("Iced coffee", "milk, ice cream", "iced coffee"),
        g("Herbal tea", "", "herbal tea"),
        g("Sparkling water", "lemon, wine", "sparkling water"),
        g("Cordial", "water", "cordial"),
        g("Hot chocolate", "milk", "hot chocolate"),
        g("Bundaberg ginger beer", "water", "ginger beer"),
    ],
}

NNPAS_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, nuts, cheese", "apple", "banana", "grapes"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea", "biscuits"),
        g("Chips", "soda, dip, sandwich", "chips", "chips, dip"),
        g("Yogurt", "fruit, muesli, honey", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Toast and vegemite", "butter, tea, cheese", "toast, vegemite, tea"),
        g("Cheese and crackers", "fruit, pickle, tea", "cheese, crackers"),
        g("Chocolate", "tea, coffee, fruit", "chocolate"),
        g("Nuts", "fruit, yogurt", "nuts"),
        g("Muesli bar", "coffee, banana, yogurt", "muesli bar"),
        g("Popcorn", "soda, tea", "popcorn"),
        g("Cake", "tea, coffee", "cake, tea"),
    ],
    "also_seen": [
        g("Lamington leftover", "tea, coffee", "lamington, tea"),
        g("ANZAC biscuits", "tea, coffee", "anzac biscuits, tea"),
        g("Tim Tams", "tea, coffee, milk", "tim tams, tea"),
        g("Carrot sticks", "hummus, dip, cheese", "carrot, hummus"),
        g("Ice cream snack", "chocolate, fruit", "ice cream"),
    ],
}

NNPAS_DESSERTS = {
    "very_common": [
        g("Ice cream", "chocolate sauce, fruit, wafer", "ice cream", "ice cream, chocolate sauce"),
        g("Cake", "tea, coffee, cream", "cake", "cake, tea"),
        g("Yogurt", "fruit, honey, muesli", "yogurt, fruit"),
        g("Chocolate", "tea, coffee", "chocolate"),
    ],
    "common": [
        g("Pavlova", "cream, fruit, passionfruit", "pavlova, cream, fruit"),
        g("Fruit salad", "ice cream, yogurt, cream", "fruit salad", "fruit salad, ice cream"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea"),
        g("Pudding", "custard, ice cream, cream", "pudding, custard"),
        g("Crumble", "custard, ice cream, cream", "apple crumble, custard"),
        g("Cheesecake", "berries, cream, coffee", "cheesecake"),
        g("Lamingtons", "tea, coffee, cream", "lamingtons, tea"),
    ],
    "also_seen": [
        g("Trifle", "cream, fruit, jelly", "trifle"),
        g("Tim Tams dessert", "tea, coffee, ice cream", "tim tams, ice cream"),
        g("Banana split leftover", "ice cream, chocolate", "banana, ice cream"),
        g("Jelly", "ice cream, fruit", "jelly, ice cream"),
        g("ANZAC biscuit crumble", "ice cream, cream", "anzac biscuits, ice cream"),
    ],
}

NNPAS_OTHER = {
    "very_common": [
        g("Tea and biscuits", "milk, sugar", "tea, biscuits"),
        g("Fruit", "yogurt, nuts", "banana", "apple"),
        g("Toast", "vegemite, butter, tea", "toast, vegemite, tea"),
        g("Leftovers", "tea, bread, salad", "leftover dinner"),
    ],
    "common": [
        g("Coffee", "milk, biscuit, toast", "coffee"),
        g("Weet-Bix at odd hour", "milk, banana", "weet-bix, milk"),
        g("Yogurt", "fruit, muesli", "yogurt"),
        g("Chips", "soda, dip", "chips"),
        g("Cheese and crackers", "fruit, pickle", "cheese, crackers"),
        g("Sandwich leftover", "fruit, water", "sandwich"),
        g("Milo", "milk, biscuits", "milo, milk"),
    ],
    "also_seen": [
        g("Late toastie", "tea, tomato sauce", "cheese toastie, tea"),
        g("Ice cream", "chocolate, fruit", "ice cream"),
        g("Nuts", "fruit, chocolate", "nuts"),
        g("Cake leftover", "tea, coffee", "cake, tea"),
        g("Meat pie leftover", "sauce, salad", "leftover meat pie"),
    ],
}

EFSA_BREAKFASTS = {
    "very_common": [
        g("Bread and butter", "jam, cheese, coffee, tea, milk", "bread, butter, jam, coffee", "bread, butter, coffee", "bread, cheese, coffee"),
        g("Coffee", "milk, sugar, bread, pastry", "coffee", "coffee, milk", "coffee, bread"),
        g("Yogurt", "fruit, muesli, honey, bread", "yogurt", "yogurt, fruit", "yogurt, muesli"),
        g("Muesli or cereal", "milk, yogurt, fruit, coffee", "muesli, milk", "cereal, milk, coffee"),
        g("Cheese and bread", "coffee, tomato, ham, butter", "bread, cheese, coffee", "bread, cheese, ham"),
    ],
    "common": [
        g("Pastry", "coffee, jam, juice", "croissant, coffee", "pastry, coffee"),
        g("Boiled eggs", "bread, butter, coffee, cheese", "boiled eggs, bread, coffee", "eggs, bread, butter"),
        g("Fruit", "yogurt, bread, coffee", "apple, coffee", "banana, yogurt"),
        g("Open sandwich", "cheese, ham, tomato, coffee", "open sandwich, coffee", "rye bread, cheese, ham"),
        g("Milk", "cereal, coffee, bread", "milk, cereal", "milk, bread"),
        g("Quark or fromage blanc", "fruit, honey, bread, coffee", "quark, fruit", "fromage blanc, honey"),
        g("Toast", "butter, jam, cheese, coffee", "toast, butter, coffee"),
    ],
    "also_seen": [
        g("Cold cuts and bread", "cheese, tomato, coffee, mustard", "ham, bread, coffee", "salami, bread, cheese"),
        g("Omelette", "bread, salad, coffee, cheese", "omelette, bread, coffee"),
        g("Porridge", "milk, honey, fruit, coffee", "porridge, milk"),
        g("Smoothie", "bread, yogurt, fruit", "smoothie, bread"),
        g("Filmjölk or fermented milk", "cereal, bread, fruit", "filmjölk, cereal"),
    ],
}

EFSA_LUNCHES = {
    "very_common": [
        g("Bread with cheese or ham", "tomato, yogurt, water, fruit, soup", "bread, cheese, ham, tomato", "bread, cheese, yogurt", "open sandwich, salad"),
        g("Leftover stew or roast", "bread, salad, water, potatoes", "leftover meat, potatoes, veg", "leftover stew, bread"),
        g("Soup", "bread, cheese, yogurt, fruit", "soup, bread", "soup, bread, cheese"),
        g("Pasta leftover", "cheese, salad, bread, water", "leftover pasta, salad", "pasta, tomato sauce"),
    ],
    "common": [
        g("Salad", "bread, cheese, ham, oil, yogurt", "salad, bread, cheese", "salad, ham, bread"),
        g("Yogurt lunch", "bread, fruit, cheese", "yogurt, bread, fruit"),
        g("Omelette", "salad, bread, tomato, water", "omelette, salad, bread"),
        g("Potatoes and sausage", "mustard, salad, bread, water", "sausage, potatoes, salad", "leftover sausage, potatoes"),
        g("Rice leftover", "meat, veg, yogurt, water", "leftover rice, meat, veg"),
        g("Quiche leftover", "salad, water, fruit", "quiche, salad"),
        g("Lentils or beans", "bread, salad, sausage, water", "lentils, sausage, bread", "beans, rice, salad"),
    ],
    "also_seen": [
        g("Couscous leftover", "veg, chicken, yogurt", "couscous, veg, chicken"),
        g("Pizza leftover", "salad, water, soda", "leftover pizza, salad"),
        g("Fish leftover", "potatoes, salad, bread", "leftover fish, potatoes, salad"),
        g("Goulash leftover", "bread, potatoes, yogurt", "leftover goulash, bread"),
        g("Cheese plate lunch", "bread, fruit, tomato, water", "cheese, bread, fruit"),
    ],
}

EFSA_DINNERS = {
    "very_common": [
        g("Meat and potatoes", "veg, gravy, bread, water, salad", "pork, potatoes, veg", "beef, potatoes, veg", "chicken, potatoes, veg"),
        g("Pasta", "cheese, salad, bread, wine, water", "pasta, tomato sauce, cheese", "pasta, meat sauce, salad"),
        g("Soup and bread", "cheese, salad, yogurt", "soup, bread", "soup, bread, cheese"),
        g("Chicken", "rice, potatoes, salad, veg", "roast chicken, potatoes, salad", "chicken, rice, veg"),
    ],
    "common": [
        g("Fish and potatoes", "veg, salad, lemon, bread", "fish, potatoes, veg", "baked fish, salad, bread"),
        g("Stew", "bread, potatoes, yogurt, water", "beef stew, potatoes, bread", "chicken stew, veg"),
        g("Sausage and potatoes", "mustard, salad, bread, sauerkraut", "sausage, potatoes, salad"),
        g("Rice and meat", "veg, salad, yogurt, water", "rice, pork, veg", "rice, chicken, salad"),
        g("Salad dinner", "bread, cheese, ham, egg, oil", "salad, bread, cheese, ham"),
        g("Pizza", "salad, beer, wine, water", "pizza, salad", "pizza"),
        g("Lentil dish", "bread, sausage, salad, yogurt", "lentils, sausage, bread"),
        g("Casserole", "salad, bread, water", "potato casserole, salad", "vegetable gratin, bread"),
    ],
    "also_seen": [
        g("Omelette dinner", "salad, bread, tomato, cheese", "omelette, salad, bread"),
        g("Goulash", "bread, potatoes, yogurt, pickles", "goulash, bread", "goulash, potatoes"),
        g("Couscous", "veg, chicken, yogurt, harissa", "couscous, chicken, veg"),
        g("Cheese and bread dinner", "salad, tomato, wine, fruit", "cheese, bread, salad, wine"),
        g("Rotisserie chicken leftover", "salad, bread, potatoes", "chicken, salad, bread"),
    ],
}

EFSA_DRINKS = {
    "very_common": [
        g("Tap water", "", "water"),
        g("Coffee", "milk, sugar, water", "coffee", "coffee, milk", "café américain"),
        g("Tea", "milk, sugar, lemon, water", "tea", "black tea", "herbal tea"),
        g("Milk", "coffee, cereal", "milk", "cow milk"),
    ],
    "common": [
        g("Still mineral water", "", "mineral water", "bottled water"),
        g("Beer", "water, wine", "beer"),
        g("Wine", "water, bread", "wine", "red wine"),
        g("Orange juice", "water, coffee", "orange juice"),
        g("Soda", "water", "cola", "flavoured soft drink"),
        g("Carbonated mineral water", "wine, lemon", "sparkling water"),
    ],
    "also_seen": [
        g("Fruit tea", "sugar, lemon", "fruit tea"),
        g("Green tea", "", "green tea"),
        g("Diet cola", "water", "diet cola"),
        g("Hot chocolate", "milk, pastry", "hot chocolate"),
        g("Apple juice", "water", "apple juice"),
        g("Aperitif leftover at home", "water, nuts", "wine, water"),
    ],
}

EFSA_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, nuts, cheese, bread", "apple", "banana", "grapes"),
        g("Bread and cheese", "tomato, ham, tea, coffee", "bread, cheese", "bread, cheese, tomato"),
        g("Yogurt", "fruit, honey, muesli", "yogurt", "yogurt, fruit"),
        g("Pastry", "coffee, tea, milk", "pastry, coffee", "cake slice, coffee"),
    ],
    "common": [
        g("Crackers", "cheese, ham, tomato", "crackers, cheese"),
        g("Chocolate", "coffee, tea, fruit", "chocolate"),
        g("Nuts", "fruit, cheese, wine", "nuts"),
        g("Toast", "butter, jam, cheese, coffee", "toast, butter, jam"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea", "biscuits, coffee"),
        g("Chips", "soda, beer, dip", "chips"),
        g("Carrot and dip", "hummus, bread, yogurt", "carrot, hummus"),
    ],
    "also_seen": [
        g("Quark", "fruit, honey, bread", "quark, fruit"),
        g("Cold cuts", "bread, pickle, mustard", "ham, bread"),
        g("Ice cream snack", "fruit, wafer", "ice cream"),
        g("Popcorn", "soda, tea", "popcorn"),
        g("Olives and bread", "cheese, tomato, wine", "olives, bread, cheese"),
    ],
}

EFSA_DESSERTS = {
    "very_common": [
        g("Yogurt", "fruit, honey, muesli", "yogurt", "yogurt, fruit"),
        g("Fruit", "yogurt, cream, ice cream", "apple", "fruit salad"),
        g("Pastries and cakes", "coffee, tea, cream", "cake", "pastry, coffee"),
        g("Ice cream", "wafer, fruit, chocolate sauce", "ice cream"),
    ],
    "common": [
        g("Chocolate", "coffee, tea, fruit", "chocolate"),
        g("Pudding", "cream, fruit, biscuit", "pudding"),
        g("Compote", "yogurt, cream, biscuit", "apple compote, yogurt"),
        g("Cheese as dessert", "fruit, bread, honey, wine", "cheese, fruit"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea"),
        g("Custard", "fruit, cake, caramel", "custard"),
        g("Rice pudding", "cinnamon, fruit, jam", "rice pudding"),
    ],
    "also_seen": [
        g("Crepe leftover", "sugar, jam, chocolate, fruit", "crepe, sugar, jam"),
        g("Quark dessert", "fruit, honey, vanilla", "quark, fruit, honey"),
        g("Tart leftover", "cream, coffee, fruit", "fruit tart, coffee"),
        g("Jelly", "fruit, cream", "jelly, fruit"),
        g("Waffle leftover", "cream, fruit, chocolate", "waffle, cream, fruit"),
    ],
}

EFSA_OTHER = {
    "very_common": [
        g("Coffee", "milk, pastry, bread", "coffee"),
        g("Fruit", "yogurt, nuts", "apple", "banana"),
        g("Bread and cheese", "tomato, ham, tea", "bread, cheese"),
        g("Leftovers", "bread, salad, water", "leftover dinner, bread"),
    ],
    "common": [
        g("Yogurt", "fruit, muesli, honey", "yogurt"),
        g("Tea", "biscuits, milk, lemon", "tea, biscuits"),
        g("Pastry", "coffee, tea", "pastry, coffee"),
        g("Soup leftover", "bread, cheese", "soup, bread"),
        g("Open sandwich", "cheese, ham, tomato", "open sandwich"),
        g("Milk", "cereal, coffee, biscuits", "milk"),
        g("Chocolate", "coffee, tea", "chocolate"),
    ],
    "also_seen": [
        g("Late omelette", "bread, salad, tea", "omelette, bread"),
        g("Nuts", "fruit, wine, cheese", "nuts"),
        g("Ice cream", "fruit, wafer", "ice cream"),
        g("Crackers", "cheese, ham", "crackers, cheese"),
        g("Wine at odd hour", "cheese, bread, water", "wine, cheese, bread"),
    ],
}

NHNS_BREAKFASTS = {
    "very_common": [
        g("Rice and miso soup", "grilled fish, nori, pickles, green tea, egg", "rice, miso soup, grilled fish, green tea", "rice, miso soup, nori, pickles", "rice, miso soup, egg"),
        g("Toast", "coffee, egg, salad, milk, jam", "toast, coffee", "toast, egg, coffee", "toast, jam, coffee"),
        g("Tamago kake gohan", "nori, miso soup, green tea, pickles", "rice, raw egg, soy sauce, nori", "rice, egg, miso soup, green tea"),
        g("Natto and rice", "miso soup, green tea, nori, pickles", "rice, natto, miso soup, green tea"),
        g("Green tea", "rice, pickles, nori", "green tea, rice"),
    ],
    "common": [
        g("Onigiri", "green tea, miso soup, fruit, yogurt", "onigiri, green tea", "onigiri, miso soup"),
        g("Yogurt", "banana, coffee, toast, granola", "yogurt, banana", "yogurt, coffee"),
        g("Egg and rice", "miso soup, nori, green tea", "fried egg, rice, miso soup", "scrambled egg, rice, green tea"),
        g("Fish leftover breakfast", "rice, miso soup, green tea, pickles", "leftover grilled fish, rice, miso soup"),
        g("Cereal", "milk, coffee, banana", "cereal, milk, coffee"),
        g("Soup and rice", "nori, egg, pickles, tea", "leftover soup, rice, green tea"),
        g("Banana", "yogurt, coffee, toast", "banana, yogurt", "banana, coffee"),
    ],
    "also_seen": [
        g("Ochazuke", "nori, pickles, salmon, green tea", "ochazuke, nori, pickles"),
        g("Pancakes", "coffee, fruit, syrup", "pancakes, coffee"),
        g("Convenience leftover", "green tea, rice, coffee", "leftover kimbap-style roll, green tea"),
        g("Okayu", "umeboshi, nori, green tea", "okayu, umeboshi, green tea"),
        g("Salad breakfast", "toast, egg, coffee", "salad, toast, coffee"),
    ],
}

NHNS_LUNCHES = {
    "very_common": [
        g("Leftover rice set", "miso soup, leftover fish, veg, tea", "rice, leftover fish, veg, miso soup", "rice, leftover meat, salad, tea"),
        g("Donburi", "miso soup, pickles, green tea", "oyakodon, miso soup, green tea", "gyudon, pickles, tea", "leftover donburi"),
        g("Onigiri lunch", "green tea, fruit, yogurt, leftover sides", "onigiri, green tea", "onigiri, leftover salad"),
        g("Noodles", "green tea, rice, pickles", "leftover ramen, green tea", "udon, green tea", "soba, green tea"),
    ],
    "common": [
        g("Curry rice leftover", "pickles, salad, water, tea", "curry rice, pickles", "leftover curry, rice"),
        g("Pasta leftover", "salad, bread, tea", "leftover pasta, salad"),
        g("Sandwich", "tea, fruit, yogurt, soup", "sandwich, tea", "egg sandwich, fruit"),
        g("Fried rice leftover", "miso soup, pickles, tea", "leftover fried rice, miso soup"),
        g("Salad and rice", "egg, leftover fish, tea", "salad, rice, egg, tea"),
        g("Miso soup and leftovers", "rice, nori, pickles", "miso soup, rice, leftover veg"),
        g("Instant ramyeon-style noodles", "egg, green onion, tea", "instant noodles, egg, green tea"),
    ],
    "also_seen": [
        g("Katsu leftover", "rice, shredded cabbage, miso soup, tea", "leftover tonkatsu, rice, cabbage"),
        g("Sushi leftover", "tea, pickles, salad", "leftover sushi, green tea"),
        g("Omurice leftover", "salad, tea, ketchup", "leftover omurice, salad"),
        g("Bento leftover", "tea, fruit, pickles", "leftover bento, green tea"),
        g("Bread and soup", "salad, cheese, tea", "bread, leftover soup, salad"),
    ],
}

NHNS_DINNERS = {
    "very_common": [
        g("Rice, miso, grilled fish", "veg, pickles, nori, green tea", "rice, miso soup, grilled fish, veg", "rice, miso soup, salmon, pickles"),
        g("Donburi", "miso soup, pickles, salad, tea", "gyudon, miso soup", "oyakodon, salad, tea"),
        g("Curry rice", "pickles, salad, beer, tea", "curry rice, pickles", "curry rice, salad"),
        g("Nabe", "rice, ponzu, beer, green tea", "nabe, rice", "hot pot, rice, beer"),
    ],
    "common": [
        g("Ramen at home", "egg, green onion, nori, tea", "ramen, egg", "instant ramen, egg, green onion"),
        g("Stir fry and rice", "miso soup, salad, tea", "veg stir fry, rice, miso soup", "pork stir fry, rice"),
        g("Pasta", "salad, bread, tea, beer", "pasta, salad", "wafu pasta, salad"),
        g("Fried chicken leftover", "rice, cabbage, miso soup, beer", "karaage, rice, cabbage, miso soup"),
        g("Tonkatsu leftover", "rice, cabbage, miso soup, tea", "tonkatsu, rice, cabbage"),
        g("Salad and grilled meat", "rice, miso soup, beer", "grilled pork, rice, salad, miso soup"),
        g("Tamagoyaki and rice", "miso soup, veg, nori, tea", "tamagoyaki, rice, miso soup, veg"),
        g("Leftover bento pieces", "rice, miso soup, tea", "leftover sides, rice, miso soup"),
    ],
    "also_seen": [
        g("Omurice", "salad, miso soup, tea", "omurice, salad"),
        g("Yakisoba", "salad, beer, pickles", "yakisoba, salad"),
        g("Ochazuke dinner", "nori, pickles, leftover fish", "ochazuke, leftover salmon, nori"),
        g("Hamburg steak", "rice, salad, miso soup, demiglace", "hamburg steak, rice, salad"),
        g("Tofu and veg", "rice, miso soup, green tea", "tofu, veg, rice, miso soup"),
    ],
}

NHNS_DRINKS = {
    "very_common": [
        g("Green tea", "", "green tea", "sencha"),
        g("Barley tea", "ice, water", "barley tea", "mugicha"),
        g("Water", "", "water"),
        g("Coffee", "milk, sugar, water", "coffee", "coffee, milk"),
    ],
    "common": [
        g("Tea", "milk, sugar, lemon", "tea", "black tea"),
        g("Milk", "coffee, cereal", "milk"),
        g("Beer", "water, tea", "beer"),
        g("Soda", "water", "soda", "ramune leftover"),
        g("Juice", "water, tea", "orange juice", "apple juice"),
        g("Canned coffee leftover", "water", "canned coffee"),
    ],
    "also_seen": [
        g("Green tea latte", "milk, sugar", "green tea latte"),
        g("Sake leftover at home", "water, leftovers", "sake, water"),
        g("Sports drink", "water", "sports drink"),
        g("Soy milk", "toast, banana", "soy milk"),
        g("Hot chocolate", "milk", "hot chocolate"),
        g("Highball leftover", "water, ice", "highball, water"),
    ],
}

NHNS_SNACKS = {
    "very_common": [
        g("Onigiri", "green tea, pickles, fruit", "onigiri, green tea", "onigiri"),
        g("Rice crackers", "green tea, beer, cheese", "rice crackers, green tea", "senbei, tea"),
        g("Fruit", "yogurt, tea, nuts", "banana", "apple", "mandarin"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, banana"),
    ],
    "common": [
        g("Edamame", "beer, tea, rice crackers", "edamame, beer", "edamame"),
        g("Chocolate", "tea, coffee, fruit", "chocolate"),
        g("Toast snack", "butter, jam, cheese, coffee", "toast, butter, tea"),
        g("Nuts", "fruit, beer, cheese", "nuts"),
        g("Potato chips", "soda, beer, tea", "potato chips"),
        g("Steamed bun leftover", "tea, pickles", "manju leftover, green tea", "leftover nikuman, tea"),
        g("Ice cream snack", "tea, fruit", "ice cream"),
    ],
    "also_seen": [
        g("Pocky or snack biscuit", "tea, coffee, milk", "biscuit sticks, tea"),
        g("Leftover karaage", "beer, cabbage, tea", "leftover fried chicken, beer"),
        g("Cheese", "rice crackers, beer, tomato", "cheese, rice crackers"),
        g("Popcorn", "soda, tea", "popcorn"),
        g("Seaweed snack", "tea, rice, beer", "nori snack, green tea"),
    ],
}

NHNS_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, ice cream, tea", "mandarin", "apple", "fruit, yogurt"),
        g("Ice cream", "fruit, wafer, green tea", "ice cream", "ice cream, fruit"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, fruit"),
        g("Pudding", "cream, tea, fruit", "pudding", "custard pudding"),
    ],
    "common": [
        g("Cake leftover", "tea, coffee, fruit", "shortcake leftover, tea", "cake, coffee"),
        g("Dorayaki", "green tea, milk", "dorayaki, green tea"),
        g("Mochi", "green tea, fruit, red bean", "mochi, green tea"),
        g("Chocolate", "tea, coffee, fruit", "chocolate"),
        g("Jelly", "fruit, tea", "fruit jelly"),
        g("Sweet red bean leftover", "rice cake, tea", "anko leftover, mochi, tea"),
        g("Cookies", "tea, coffee, milk", "cookies, tea"),
    ],
    "also_seen": [
        g("Matcha sweets leftover", "tea, ice cream, red bean", "matcha ice cream, tea"),
        g("Castella leftover", "tea, coffee", "castella, green tea"),
        g("Anmitsu leftover", "fruit, ice cream, tea", "anmitsu leftover, tea"),
        g("Crepe leftover", "cream, fruit, tea", "crepe leftover, fruit"),
        g("Daifuku leftover", "tea, fruit", "daifuku, green tea"),
    ],
}

NHNS_OTHER = {
    "very_common": [
        g("Green tea", "rice crackers, pickles, fruit", "green tea"),
        g("Onigiri", "tea, pickles", "onigiri, green tea"),
        g("Leftover rice", "miso soup, tea, nori", "leftover rice, tea"),
        g("Fruit", "yogurt, tea", "banana", "mandarin"),
    ],
    "common": [
        g("Ochazuke", "nori, pickles, leftover fish", "ochazuke"),
        g("Yogurt", "fruit, honey", "yogurt"),
        g("Toast", "coffee, jam, butter", "toast, coffee"),
        g("Instant noodles at odd hour", "egg, green onion, tea", "instant ramen, egg"),
        g("Rice crackers", "tea, beer", "rice crackers, tea"),
        g("Leftover sides", "rice, tea, pickles", "leftover banchan-style veg, rice, tea"),
        g("Coffee", "milk, toast, pastry", "coffee"),
    ],
    "also_seen": [
        g("Late-night ramen", "egg, green onion, beer", "ramen, egg"),
        g("Ice cream", "fruit, tea", "ice cream"),
        g("Chocolate", "tea, coffee", "chocolate"),
        g("Milk", "cereal, banana", "milk"),
        g("Okayu", "umeboshi, nori, tea", "okayu, umeboshi"),
    ],
}

NANS_BREAKFASTS = {
    "very_common": [
        g("Weet-Bix", "milk, sugar, banana, tea, coffee", "weet-bix, milk", "weet-bix, milk, banana", "weet-bix, tea, milk"),
        g("Toast", "butter, marmite, jam, vegemite, tea", "toast, marmite, butter, tea", "toast, butter, jam, coffee", "toast, vegemite, tea"),
        g("Cereal", "milk, fruit, coffee, tea", "cereal, milk", "cereal, milk, coffee"),
        g("Eggs on toast", "tea, coffee, tomato, bacon", "eggs, toast, tea", "scrambled eggs, toast"),
        g("Mince on toast", "tea, worcestershire sauce, cheese, egg", "mince on toast, tea", "mince on toast, cheese"),
    ],
    "common": [
        g("Porridge", "milk, honey, banana, tea", "porridge, milk", "porridge, brown sugar"),
        g("Yogurt", "fruit, muesli, honey, coffee", "yogurt, fruit", "yogurt, muesli"),
        g("Fruit", "yogurt, toast, tea", "banana, tea", "kiwifruit, yogurt"),
        g("Bacon and eggs", "toast, tea, tomato", "bacon, eggs, toast, tea"),
        g("Muesli", "milk, yogurt, fruit", "muesli, milk", "muesli, yogurt"),
        g("Leftover mince breakfast", "toast, tea, egg", "leftover mince, toast, tea"),
        g("Crumpets", "butter, jam, marmite, tea", "crumpets, butter, tea"),
    ],
    "also_seen": [
        g("Smoothie", "toast, banana, yogurt", "smoothie, toast"),
        g("Pancakes", "syrup, fruit, tea", "pancakes, syrup, tea"),
        g("Cheese rolls leftover", "tea, butter", "cheese roll, tea"),
        g("Baked beans on toast", "tea, cheese, egg", "baked beans, toast, tea"),
        g("Avocado toast", "egg, coffee, tomato", "avocado, toast, egg, coffee"),
    ],
}

NANS_LUNCHES = {
    "very_common": [
        g("Sandwich", "fruit, chips, water, leftover salad", "sandwich, fruit", "ham sandwich, apple", "marmite sandwich, fruit"),
        g("Leftovers", "salad, bread, tea", "leftover roast, salad", "leftover stir fry, rice"),
        g("Mince leftover", "toast, bread, salad, tea", "leftover mince on toast", "leftover mince, rice, salad"),
        g("Salad", "bread, cheese, ham, water", "salad, ham, bread", "salad, leftover chicken"),
    ],
    "common": [
        g("Soup", "bread, toast, cheese, tea", "soup, bread", "pumpkin soup, toast"),
        g("Toastie", "fruit, tea, soup", "cheese toastie, tea", "ham and cheese toastie"),
        g("Meat pie leftover", "sauce, salad, tea", "meat pie, salad"),
        g("Pasta leftover", "salad, cheese, water", "leftover pasta"),
        g("Wrap", "fruit, chips, water", "chicken wrap", "salad wrap"),
        g("Eggs and toast at lunch", "salad, tea, tomato", "eggs, toast, salad"),
        g("Fish leftover", "salad, bread, lemon", "leftover fish, salad"),
    ],
    "also_seen": [
        g("Sausage leftover", "bread, sauce, salad", "leftover sausage in bread"),
        g("Cheese rolls", "soup, tea, salad", "cheese rolls, soup"),
        g("Sushi leftover", "salad, tea, water", "leftover sushi"),
        g("Pie and salad", "sauce, water", "mince pie, salad"),
        g("Baked potato", "cheese, beans, leftover mince", "baked potato, cheese, mince"),
    ],
}

NANS_DINNERS = {
    "very_common": [
        g("Meat and veg", "potatoes, gravy, salad, water", "roast, potatoes, veg", "chicken, potatoes, veg", "sausages, mash, peas"),
        g("Mince", "toast, pasta, rice, cheese, veg", "mince, mash, veg", "spaghetti mince", "mince on toast leftover dinner"),
        g("Stir fry", "rice, noodles, soy sauce", "chicken stir fry, rice", "beef stir fry, rice"),
        g("Pasta", "salad, garlic bread, cheese", "spaghetti bolognese", "pasta, tomato sauce, salad"),
    ],
    "common": [
        g("BBQ sausages", "bread, salad, sauce, beer", "sausages, salad, bread", "sausage sizzle at home, salad"),
        g("Fish and chips at home", "salad, lemon, peas, tea", "fish, chips, salad", "crumbed fish, salad"),
        g("Curry and rice", "naan, yogurt", "chicken curry, rice", "leftover curry, rice"),
        g("Pizza", "salad, soda, beer", "pizza, salad", "pizza"),
        g("Meat pie", "peas, mash, sauce, salad", "meat pie, peas, mash"),
        g("Lamb roast", "potatoes, veg, gravy, mint sauce", "roast lamb, potatoes, veg"),
        g("Soup and toast", "cheese, butter, tea", "soup, toast, cheese"),
        g("Tacos", "salsa, salad, rice, sour cream", "tacos, salad"),
    ],
    "also_seen": [
        g("Hangi leftover", "bread, salad, pickles", "leftover hangi, salad"),
        g("Whitebait leftover", "bread, lemon, salad", "leftover whitebait fritter, salad"),
        g("Chicken parma at home", "salad, chips, beer", "chicken parma, salad"),
        g("Risotto", "salad, wine, bread", "risotto, salad"),
        g("Leftover Chinese takeaway", "rice, tea", "leftover fried rice"),
    ],
}

NANS_DRINKS = {
    "very_common": [
        g("Tea", "milk, sugar, water", "tea", "tea, milk"),
        g("Coffee", "milk, sugar, water", "coffee", "flat white", "coffee, milk"),
        g("Water", "", "water"),
        g("Milk", "tea, cereal, milo", "milk"),
    ],
    "common": [
        g("Orange juice", "water, tea", "orange juice"),
        g("Soda", "water, chips", "soda", "lemonade"),
        g("Beer", "water, wine", "beer"),
        g("Wine", "water", "wine"),
        g("Milo", "milk, ice", "milo, milk"),
        g("Diet soda", "water", "diet soda"),
    ],
    "also_seen": [
        g("L&P", "water", "l&p"),
        g("Herbal tea", "", "herbal tea"),
        g("Iced coffee", "milk, ice cream", "iced coffee"),
        g("Hot chocolate", "milk", "hot chocolate"),
        g("Cordial", "water", "cordial"),
        g("Sparkling water", "lemon, wine", "sparkling water"),
    ],
}

NANS_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, cheese, nuts", "apple", "banana", "kiwifruit"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea", "biscuits"),
        g("Chips", "soda, dip, sandwich", "chips"),
        g("Yogurt", "fruit, muesli, honey", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Toast and marmite", "butter, tea, cheese", "toast, marmite, tea"),
        g("Cheese and crackers", "fruit, pickle, tea", "cheese, crackers"),
        g("Chocolate", "tea, coffee, fruit", "chocolate"),
        g("Nuts", "fruit, yogurt", "nuts"),
        g("Muesli bar", "coffee, banana, yogurt", "muesli bar"),
        g("Cake", "tea, coffee", "cake, tea"),
        g("Popcorn", "soda, tea", "popcorn"),
    ],
    "also_seen": [
        g("Lolly cake leftover", "tea, coffee", "lolly cake, tea"),
        g("ANZAC biscuits", "tea, coffee", "anzac biscuits, tea"),
        g("Cheese rolls snack", "tea, soup leftover", "cheese roll, tea"),
        g("Carrot sticks", "hummus, dip", "carrot, hummus"),
        g("Ice cream snack", "chocolate, fruit", "ice cream"),
    ],
}

NANS_DESSERTS = {
    "very_common": [
        g("Ice cream", "chocolate sauce, fruit, wafer", "ice cream", "hokey pokey ice cream"),
        g("Yogurt", "fruit, honey, muesli", "yogurt, fruit"),
        g("Cake", "tea, coffee, cream", "cake", "cake, tea"),
        g("Fruit", "ice cream, yogurt, cream", "fruit salad", "kiwifruit, yogurt"),
    ],
    "common": [
        g("Pavlova", "cream, fruit, kiwifruit", "pavlova, cream, fruit"),
        g("Chocolate", "tea, coffee", "chocolate"),
        g("Pudding", "custard, ice cream, cream", "pudding, custard"),
        g("Crumble", "custard, ice cream", "apple crumble, custard"),
        g("Biscuits", "tea, coffee, milk", "biscuits, tea"),
        g("Cheesecake", "berries, cream, coffee", "cheesecake"),
        g("Trifle leftover", "cream, fruit, jelly", "trifle"),
    ],
    "also_seen": [
        g("Hokey pokey", "ice cream, tea", "hokey pokey ice cream, fruit"),
        g("Lolly cake", "tea, cream", "lolly cake, tea"),
        g("Jelly", "ice cream, fruit", "jelly, ice cream"),
        g("Banoffee leftover", "cream, coffee", "leftover banoffee"),
        g("ANZAC biscuit dessert", "ice cream, cream, tea", "anzac biscuits, ice cream"),
    ],
}

NANS_OTHER = {
    "very_common": [
        g("Tea and biscuits", "milk, sugar", "tea, biscuits"),
        g("Fruit", "yogurt, nuts", "banana", "apple"),
        g("Toast", "marmite, butter, tea", "toast, marmite, tea"),
        g("Leftovers", "tea, bread, salad", "leftover dinner"),
    ],
    "common": [
        g("Mince leftover", "toast, tea, cheese", "leftover mince on toast"),
        g("Weet-Bix at odd hour", "milk, banana", "weet-bix, milk"),
        g("Yogurt", "fruit, muesli", "yogurt"),
        g("Coffee", "milk, biscuit", "coffee"),
        g("Chips", "soda, dip", "chips"),
        g("Cheese and crackers", "fruit, pickle", "cheese, crackers"),
        g("Milo", "milk, biscuits", "milo, milk"),
    ],
    "also_seen": [
        g("Late toastie", "tea, sauce", "cheese toastie, tea"),
        g("Ice cream", "fruit, chocolate", "ice cream"),
        g("Sausage leftover", "bread, sauce, salad", "leftover sausage in bread"),
        g("Nuts", "fruit, chocolate", "nuts"),
        g("Cake leftover", "tea, coffee", "cake, tea"),
    ],
}

POF_BREAKFASTS = {
    "very_common": [
        g("French bread and coffee with milk", "butter, cheese, ham, margarine", "pão francês, café com leite", "pão francês, butter, café com leite", "french bread, cheese, coffee with milk"),
        g("Coffee with milk", "bread, sugar, biscuit, cheese", "café com leite", "coffee with milk, bread"),
        g("Pão de queijo", "coffee with milk, fruit, butter", "pão de queijo, café com leite", "pão de queijo, coffee"),
        g("Tapioca", "cheese, ham, butter, coffee with milk", "tapioca, cheese, café com leite", "tapioca, butter, coffee"),
        g("Fruit", "bread, yogurt, coffee with milk", "papaya, coffee with milk", "banana, bread, café com leite"),
    ],
    "common": [
        g("Biscuit", "coffee with milk, butter, cheese", "biscuit, café com leite"),
        g("Cheese and bread", "coffee with milk, ham, tomato", "bread, queijo, café com leite"),
        g("Cuscuz", "butter, egg, cheese, coffee", "cuscuz, butter, café com leite", "corn couscous, egg, coffee"),
        g("Eggs and bread", "coffee with milk, cheese, tomato", "eggs, pão francês, café com leite"),
        g("Yogurt", "fruit, granola, bread, coffee", "yogurt, fruit"),
        g("Cake leftover", "coffee with milk, bread, fruit", "bolo, café com leite"),
        g("Açaí", "granola, banana, milk, bread", "açaí, banana, granola"),
    ],
    "also_seen": [
        g("Leftover rice breakfast", "egg, coffee, beans leftover", "leftover rice, egg, coffee"),
        g("Smoothie", "bread, fruit, milk", "vitamina, bread"),
        g("Ham and cheese sandwich", "coffee with milk, fruit", "pão com queijo e presunto, café com leite"),
        g("Oatmeal", "milk, banana, honey, coffee", "oatmeal, milk, banana"),
        g("Requeijão on bread", "coffee with milk, fruit", "pão, requeijão, café com leite"),
    ],
}

POF_LUNCHES = {
    "very_common": [
        g("Rice and beans", "salad, meat, juice, farofa, water", "rice, beans, salad, beef", "rice, beans, chicken, salad", "arroz, feijão, bife, salada"),
        g("Rice, beans, and chicken", "salad, juice, farofa, fries leftover", "rice, beans, chicken, salad, juice"),
        g("Rice, beans, and egg", "salad, sausage, farofa, juice", "rice, beans, fried egg, salad"),
        g("Leftover rice and beans", "salad, meat leftover, juice", "leftover rice, leftover beans, salad"),
    ],
    "common": [
        g("Bife and rice", "beans, salad, juice, farofa", "bife, rice, beans, salad"),
        g("Chicken stew leftover", "rice, beans, salad, juice", "frango ensopado, rice, beans, salad"),
        g("Fish leftover", "rice, beans, salad, juice", "leftover fish, rice, beans, salad"),
        g("Pasta leftover", "salad, juice, cheese", "leftover pasta, salad"),
        g("Soup leftover", "bread, rice, juice", "leftover soup, bread"),
        g("Farofa plate", "rice, beans, meat, salad", "rice, beans, farofa, meat, salad"),
        g("Salad-heavy lunch", "rice, beans, juice, egg", "salad, rice, beans, juice"),
    ],
    "also_seen": [
        g("Feijoada leftover", "rice, orange, farofa, juice, couve", "leftover feijoada, rice, orange, farofa"),
        g("Tapioca lunch", "cheese, juice, salad", "tapioca, cheese, juice"),
        g("Pão de queijo lunch", "juice, fruit, leftover salad", "pão de queijo, juice, fruit"),
        g("Strogonoff leftover", "rice, salad, potato sticks, juice", "leftover strogonoff, rice, salad"),
        g("Cuscuz lunch", "egg, butter, juice, salad", "cuscuz, egg, salad, juice"),
    ],
}

POF_DINNERS = {
    "very_common": [
        g("Rice and beans", "salad, meat, juice, farofa, water", "rice, beans, salad, beef", "rice, beans, chicken, salad", "arroz, feijão, salada, carne"),
        g("Soup", "bread, rice leftover, juice, cheese", "soup, bread", "canja, bread", "vegetable soup, bread"),
        g("French bread dinner", "cheese, ham, coffee with milk, juice", "pão francês, cheese, ham, juice", "pão na chapa, coffee"),
        g("Leftover lunch", "salad, juice, rice, beans", "leftover rice, leftover beans, salad"),
    ],
    "common": [
        g("Eggs and bread", "salad, juice, cheese, rice leftover", "eggs, bread, salad", "omelette, salad, bread"),
        g("Chicken and rice", "beans, salad, juice, farofa", "chicken, rice, beans, salad"),
        g("Pasta", "salad, juice, cheese, meat sauce", "pasta, tomato sauce, salad", "macarrão, salad"),
        g("Tapioca dinner", "cheese, ham, juice, coffee", "tapioca, cheese, juice"),
        g("Fish", "rice, salad, juice, beans", "fish, rice, salad", "peixe, rice, salad"),
        g("Sausage and rice", "beans, salad, farofa, juice", "sausage, rice, beans, salad"),
        g("Cuscuz dinner", "butter, egg, cheese, juice", "cuscuz, butter, egg"),
        g("Salad and leftover meat", "rice, beans, juice, bread", "salad, leftover meat, rice"),
    ],
    "also_seen": [
        g("Feijoada", "rice, orange, farofa, couve, juice", "feijoada, rice, orange, farofa, couve"),
        g("Churrasco leftover", "rice, vinaigrette, farofa, salad, beer", "leftover churrasco, rice, vinaigrette, farofa"),
        g("Açaí dinner", "granola, banana, milk", "açaí, banana, granola"),
        g("Pizza leftover", "salad, soda, juice", "leftover pizza, salad"),
        g("Pão de queijo dinner", "coffee with milk, fruit, cheese", "pão de queijo, café com leite"),
    ],
}

POF_DRINKS = {
    "very_common": [
        g("Coffee with milk", "sugar, bread, water", "café com leite", "coffee with milk"),
        g("Coffee", "sugar, milk, water", "coffee", "café"),
        g("Water", "", "water"),
        g("Juice", "water, lunch leftovers", "juice", "suco de laranja", "fresh fruit juice"),
    ],
    "common": [
        g("Guaraná", "water, ice, lunch", "guaraná", "guaraná soda"),
        g("Milk", "coffee, bread, fruit", "milk"),
        g("Soda", "water, lunch, pizza leftover", "soda", "cola"),
        g("Mate", "sugar, water, ice", "mate", "chimarrão", "tereré"),
        g("Tea", "sugar, lemon, water", "tea"),
        g("Diet soda", "water", "diet soda"),
    ],
    "also_seen": [
        g("Beer", "water, churrasco leftover", "beer"),
        g("Coconut water", "fruit, water", "coconut water"),
        g("Açaí drink", "milk, banana", "açaí na tigela leftover drink"),
        g("Hot chocolate", "milk, bread", "hot chocolate"),
        g("Sugarcane juice leftover", "water, lime", "caldo de cana leftover"),
        g("Wine", "water", "wine"),
    ],
}

POF_SNACKS = {
    "very_common": [
        g("French bread", "butter, cheese, coffee, ham", "pão francês, butter", "pão, queijo"),
        g("Fruit", "yogurt, juice, bread", "banana", "apple", "papaya"),
        g("Pão de queijo", "coffee, juice, fruit", "pão de queijo", "pão de queijo, coffee"),
        g("Biscuits", "coffee with milk, milk, juice", "biscuit, café com leite"),
    ],
    "common": [
        g("Cake", "coffee, juice, milk", "bolo, coffee", "cake leftover"),
        g("Yogurt", "fruit, granola, honey", "yogurt", "yogurt, fruit"),
        g("Tapioca snack", "cheese, butter, coconut", "tapioca, cheese"),
        g("Cheese", "bread, fruit, coffee", "queijo, bread"),
        g("Chips", "soda, juice, sandwich", "chips"),
        g("Açaí", "granola, banana, milk", "açaí, banana, granola"),
        g("Popcorn", "soda, juice", "popcorn"),
    ],
    "also_seen": [
        g("Coxinha leftover", "juice, soda, salad", "leftover coxinha, juice"),
        g("Brigadeiro leftover", "coffee, milk", "brigadeiro leftover, coffee"),
        g("Nuts", "fruit, yogurt", "nuts", "castanha"),
        g("Requeijão on bread", "coffee, fruit", "bread, requeijão"),
        g("Ice cream snack", "fruit, wafer", "ice cream"),
    ],
}

POF_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, cream, juice", "papaya", "banana", "fruit salad"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, fruit"),
        g("Pudim leftover", "coffee, cream", "pudim", "flan leftover"),
        g("Cake", "coffee, milk, juice", "bolo", "cake, coffee"),
    ],
    "common": [
        g("Ice cream", "fruit, chocolate, wafer", "ice cream", "sorvete"),
        g("Brigadeiro leftover", "coffee, milk, cake", "brigadeiro leftover"),
        g("Gelatin", "fruit, cream", "gelatina", "gelatin, fruit"),
        g("Chocolate", "coffee, milk, fruit", "chocolate"),
        g("Açaí dessert", "granola, banana, condensed milk leftover", "açaí, banana, granola"),
        g("Rice pudding leftover", "cinnamon, milk, coffee", "arroz-doce leftover"),
        g("Cookies", "milk, coffee, juice", "cookies, milk"),
    ],
    "also_seen": [
        g("Romeu e julieta leftover", "coffee, bread", "queijo, goiabada"),
        g("Mousse leftover", "fruit, cream, coffee", "mousse leftover"),
        g("Coconut dessert leftover", "coffee, fruit", "cocada leftover, coffee"),
        g("Sweet tapioca leftover", "coconut, condensed milk, coffee", "sweet tapioca leftover"),
        g("Pudim de leite leftover", "coffee, cream", "pudim de leite"),
    ],
}

POF_OTHER = {
    "very_common": [
        g("Coffee with milk", "bread, biscuit, sugar", "café com leite"),
        g("French bread", "butter, cheese, coffee", "pão francês, butter, café com leite"),
        g("Fruit", "yogurt, juice", "banana", "papaya"),
        g("Leftover rice and beans", "salad, juice", "leftover rice, leftover beans"),
    ],
    "common": [
        g("Pão de queijo", "coffee, juice", "pão de queijo, coffee"),
        g("Juice", "bread, fruit, leftover lunch", "juice"),
        g("Tapioca", "cheese, coffee, ham", "tapioca, cheese"),
        g("Biscuits", "coffee with milk, milk", "biscuit, café com leite"),
        g("Yogurt", "fruit, granola", "yogurt"),
        g("Cake leftover", "coffee, milk", "bolo, coffee"),
        g("Soup leftover", "bread, juice", "leftover soup, bread"),
    ],
    "also_seen": [
        g("Late tapioca", "cheese, ham, juice", "tapioca, cheese, ham"),
        g("Açaí at odd hour", "granola, banana", "açaí, banana, granola"),
        g("Guaraná", "bread, leftover lunch", "guaraná"),
        g("Ice cream", "fruit, wafer", "ice cream"),
        g("Requeijão on bread", "coffee, fruit", "bread, requeijão, coffee"),
    ],
}

KNHANES_BREAKFASTS = {
    "very_common": [
        g("Rice, soup, and kimchi", "banchan, egg, barley tea, nori", "rice, soup, kimchi, banchan", "rice, leftover soup, kimchi, barley tea"),
        g("Leftover stew and rice", "kimchi, egg, barley tea, nori", "kimchi stew leftover, rice, kimchi", "doenjang stew leftover, rice, kimchi"),
        g("Egg and rice", "kimchi, soup, nori, barley tea", "fried egg, rice, kimchi", "rolled omelette leftover, rice, kimchi"),
        g("Barley tea", "rice, kimchi, soup", "barley tea, rice, kimchi"),
        g("Toast or bread", "coffee, milk, jam, egg", "toast, coffee", "bread, jam, coffee"),
    ],
    "common": [
        g("Gukbap leftover", "kimchi, barley tea, egg", "leftover soup rice, kimchi, barley tea"),
        g("Yogurt", "fruit, granola, coffee, bread", "yogurt, fruit"),
        g("Cereal", "milk, banana, coffee", "cereal, milk"),
        g("Kimchi fried rice leftover", "egg, seaweed, barley tea", "leftover kimchi fried rice, egg"),
        g("Banana", "yogurt, coffee, bread, milk", "banana, yogurt"),
        g("Coffee breakfast", "bread, milk, fruit, egg", "coffee, bread", "coffee, milk, toast"),
        g("Nori and rice", "kimchi, leftover soup, tea", "rice, nori, kimchi, leftover soup"),
    ],
    "also_seen": [
        g("Kimbap leftover", "kimchi, barley tea, fruit", "leftover kimbap, kimchi, barley tea"),
        g("Ramyeon leftover breakfast", "egg, kimchi, rice", "leftover ramyeon, egg, kimchi"),
        g("Juk", "kimchi, tea, egg", "rice porridge, kimchi, barley tea"),
        g("Sandwich", "coffee, milk, fruit", "sandwich, coffee"),
        g("Sweet potato leftover", "milk, tea, yogurt", "leftover sweet potato, milk"),
    ],
}

KNHANES_LUNCHES = {
    "very_common": [
        g("Rice, soup, and banchan", "kimchi, leftover meat, barley tea", "rice, soup, kimchi, banchan", "rice, leftover stew, kimchi, banchan"),
        g("Leftover dinner", "rice, kimchi, barley tea, egg", "leftover stir fry, rice, kimchi", "leftover grilled fish, rice, kimchi"),
        g("Kimchi stew leftover", "rice, egg, barley tea, nori", "kimchi jjigae leftover, rice, egg"),
        g("Kimbap", "kimchi, barley tea, fruit, soup leftover", "kimbap, kimchi, barley tea", "leftover kimbap, kimchi"),
    ],
    "common": [
        g("Bibimbap leftover", "soup, kimchi, barley tea, egg", "leftover bibimbap, soup, kimchi"),
        g("Ramyeon", "egg, kimchi, rice, barley tea", "ramyeon, egg, kimchi", "ramyeon, kimchi, rice"),
        g("Doenjang stew leftover", "rice, kimchi, tofu, barley tea", "doenjang jjigae leftover, rice, kimchi"),
        g("Kimchi fried rice", "egg, seaweed, leftover soup, tea", "kimchi fried rice, egg"),
        g("Noodles leftover", "kimchi, barley tea, side veg", "leftover naengmyeon, kimchi", "leftover jajang leftover, rice leftover"),
        g("Egg and leftover rice", "kimchi, soup, barley tea", "fried egg, leftover rice, kimchi"),
        g("Salad and rice leftover", "egg, kimchi, tea", "salad, leftover rice, egg, kimchi"),
    ],
    "also_seen": [
        g("Tteokbokki leftover", "kimbap leftover, ramyeon leftover, tea", "leftover tteokbokki, kimbap"),
        g("Sandwich lunch", "fruit, milk, coffee, kimchi leftover", "sandwich, fruit, milk"),
        g("Juk lunch", "kimchi, tea, side veg", "rice porridge, kimchi"),
        g("Leftover grilled meat", "rice, lettuce, ssamjang, kimchi", "leftover pork belly, rice, lettuce, kimchi"),
        g("Soybean sprout soup leftover", "rice, kimchi, egg, tea", "kongnamul guk leftover, rice, kimchi"),
    ],
}

KNHANES_DINNERS = {
    "very_common": [
        g("Rice, soup, and banchan", "kimchi, grilled fish, barley tea, egg", "rice, soup, kimchi, banchan, grilled fish", "rice, doenjang stew, kimchi, banchan"),
        g("Kimchi stew", "rice, egg, tofu, barley tea, nori", "kimchi jjigae, rice, egg, tofu"),
        g("Grilled fish and rice", "soup, kimchi, banchan, barley tea", "grilled mackerel, rice, kimchi, soup"),
        g("Stir fry and rice", "soup, kimchi, barley tea, egg", "pork stir fry, rice, kimchi, soup"),
    ],
    "common": [
        g("Bibimbap", "soup, kimchi, barley tea, egg", "bibimbap, soup, kimchi", "dolsot leftover as bibimbap, soup"),
        g("Doenjang stew", "rice, tofu, kimchi, barley tea", "doenjang jjigae, rice, kimchi, tofu"),
        g("Ramyeon dinner", "egg, kimchi, rice, barley tea", "ramyeon, egg, kimchi, rice"),
        g("Kimchi fried rice", "egg, leftover soup, seaweed, tea", "kimchi fried rice, egg, leftover soup"),
        g("Kimbap dinner", "soup leftover, kimchi, barley tea", "kimbap, leftover soup, kimchi"),
        g("Grilled meat at home", "rice, lettuce, ssamjang, kimchi, barley tea", "grilled pork, rice, lettuce, kimchi"),
        g("Soft tofu stew", "rice, kimchi, egg, barley tea", "sundubu jjigae, rice, kimchi"),
        g("Leftover soup rice", "kimchi, egg, nori, tea", "gukbap, kimchi, egg"),
    ],
    "also_seen": [
        g("Tteokbokki", "kimbap, ramyeon, barley tea, kimchi", "tteokbokki, kimbap", "tteokbokki, ramyeon, kimchi"),
        g("Bulgogi leftover", "rice, lettuce, soup, kimchi", "leftover bulgogi, rice, lettuce, kimchi"),
        g("Jajang leftover", "kimchi, radish, barley tea, rice leftover", "leftover jajangmyeon, kimchi"),
        g("Fish-cake soup leftover", "rice, kimchi, barley tea", "eomuk leftover, rice, kimchi"),
        g("Egg roll and rice", "soup, kimchi, banchan, tea", "gyeran-mari, rice, soup, kimchi"),
    ],
}

KNHANES_DRINKS = {
    "very_common": [
        g("Barley tea", "ice, water, rice leftover", "barley tea", "boricha"),
        g("Water", "", "water"),
        g("Coffee", "milk, sugar, water", "coffee", "coffee, milk"),
        g("Green tea", "", "green tea"),
    ],
    "common": [
        g("Milk", "coffee, banana, cereal", "milk"),
        g("Soda", "water, ramyeon leftover", "soda", "cola"),
        g("Juice", "water, fruit", "orange juice", "apple juice"),
        g("Corn silk or grain tea", "water, rice", "grain tea", "oksusu cha"),
        g("Beer", "water, leftover grilled meat", "beer"),
        g("Sikhye leftover", "rice, water", "sikhye leftover"),
    ],
    "also_seen": [
        g("Banana milk", "bread, banana", "banana milk"),
        g("Citron tea", "water, honey", "yuja tea"),
        g("Soju leftover at home", "beer, leftover meat, water", "soju, beer, water"),
        g("Soy milk", "bread, banana", "soy milk"),
        g("Diet soda", "water", "diet soda"),
        g("Hot chocolate", "milk, bread", "hot chocolate"),
    ],
}

KNHANES_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, barley tea, nuts", "apple", "banana", "persimmon leftover"),
        g("Rice leftover snack", "kimchi, barley tea, nori", "leftover rice, kimchi, barley tea"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, fruit"),
        g("Kimchi and leftover rice", "barley tea, egg, nori", "kimchi, leftover rice, barley tea"),
    ],
    "common": [
        g("Kimbap leftover", "kimchi, barley tea, fruit", "leftover kimbap, barley tea"),
        g("Rice cakes leftover", "tea, honey, fruit", "tteok leftover, barley tea"),
        g("Sweet potato", "milk, tea, yogurt", "sweet potato, milk"),
        g("Chips", "soda, beer, tea", "potato chips"),
        g("Nuts", "fruit, yogurt, beer", "nuts"),
        g("Bread", "milk, jam, coffee, cream", "bread, milk", "bread, coffee"),
        g("Seaweed snack", "rice leftover, tea, beer", "gim snack, barley tea"),
    ],
    "also_seen": [
        g("Tteokbokki leftover", "kimbap, tea, soda", "leftover tteokbokki"),
        g("Ramyeon snack", "egg, kimchi, barley tea", "ramyeon, egg, kimchi"),
        g("Ice cream snack", "fruit, tea", "ice cream"),
        g("Chocolate", "tea, coffee, milk", "chocolate"),
        g("Mandu leftover", "kimchi, soy sauce, tea", "leftover dumplings, kimchi"),
    ],
}

KNHANES_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, ice cream, tea", "apple", "banana", "fruit, yogurt"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, fruit"),
        g("Ice cream", "fruit, wafer, red bean leftover", "ice cream"),
        g("Rice cake leftover", "tea, honey, fruit, red bean", "tteok leftover, barley tea"),
    ],
    "common": [
        g("Sweet red bean leftover", "rice cake, ice cream, tea", "patbingsu leftover", "red bean, rice cake, tea"),
        g("Cake leftover", "coffee, milk, fruit", "cake leftover, coffee"),
        g("Chocolate", "tea, coffee, milk", "chocolate"),
        g("Sikhye leftover", "rice, pine nuts leftover", "sikhye leftover"),
        g("Pudding", "fruit, cream, tea", "pudding"),
        g("Cookies", "milk, coffee, tea", "cookies, milk"),
        g("Shaved ice leftover", "fruit, red bean, milk", "patbingsu leftover, fruit"),
    ],
    "also_seen": [
        g("Hotteok leftover", "tea, milk, fruit", "leftover hotteok, tea"),
        g("Yakgwa leftover", "tea, fruit", "leftover yakgwa, tea"),
        g("Jelly", "fruit, tea", "jelly, fruit"),
        g("Sweet pumpkin leftover", "tea, yogurt", "leftover sweet pumpkin"),
        g("Castella leftover", "milk, coffee, tea", "castella leftover, milk"),
    ],
}

KNHANES_OTHER = {
    "very_common": [
        g("Barley tea", "rice leftover, kimchi", "barley tea"),
        g("Leftover rice and kimchi", "soup leftover, tea, egg", "leftover rice, kimchi, barley tea"),
        g("Fruit", "yogurt, tea", "apple", "banana"),
        g("Coffee", "bread, milk, fruit", "coffee"),
    ],
    "common": [
        g("Ramyeon at odd hour", "egg, kimchi, rice", "ramyeon, egg, kimchi"),
        g("Kimbap leftover", "kimchi, tea", "leftover kimbap"),
        g("Yogurt", "fruit, honey", "yogurt"),
        g("Soup leftover", "rice, kimchi, tea", "leftover soup, rice, kimchi"),
        g("Bread", "milk, jam, coffee", "bread, milk"),
        g("Kimchi fried rice leftover", "egg, tea", "leftover kimchi fried rice, egg"),
        g("Sweet potato", "milk, tea", "sweet potato"),
    ],
    "also_seen": [
        g("Late tteokbokki", "kimbap leftover, tea", "leftover tteokbokki, kimbap"),
        g("Ice cream", "fruit, tea", "ice cream"),
        g("Juk", "kimchi, tea", "rice porridge, kimchi"),
        g("Nuts", "fruit, beer", "nuts"),
        g("Mandu leftover", "kimchi, tea", "leftover dumplings, kimchi"),
    ],
}

CHNS_BREAKFASTS = {
    "very_common": [
        g("Congee", "pickles, egg, youtiao leftover, soy milk, tea", "congee, pickles", "congee, egg, pickles", "congee, youtiao leftover"),
        g("Soy milk and youtiao", "congee leftover, egg, tea, pickles", "soy milk, youtiao", "soy milk, youtiao, egg"),
        g("Baozi", "soy milk, congee, tea, egg, pickles", "baozi, soy milk", "baozi, congee, tea"),
        g("Rice leftover breakfast", "egg, pickles, leftover veg, tea", "leftover rice, egg, pickles", "leftover rice, leftover dishes"),
        g("Mantou", "soy milk, leftover dishes, tea, egg", "mantou, soy milk", "mantou, leftover veg"),
    ],
    "common": [
        g("Eggs and rice", "pickles, leftover veg, tea, soy milk", "fried egg, leftover rice, pickles"),
        g("Noodles leftover", "egg, pickles, greens, tea", "leftover noodles, egg, greens"),
        g("Yogurt", "fruit, bread, soy milk, tea", "yogurt, fruit"),
        g("Bread", "milk, tea, egg, jam", "bread, milk", "bread, tea"),
        g("Scallion pancake leftover", "soy milk, egg, pickles, tea", "leftover scallion pancake, soy milk"),
        g("Tea eggs leftover", "congee, rice leftover, pickles", "tea egg, congee, pickles"),
        g("Fruit", "congee, yogurt, soy milk", "banana, soy milk", "apple, congee"),
    ],
    "also_seen": [
        g("Jianbing leftover", "soy milk, tea, fruit", "leftover jianbing, soy milk"),
        g("Dumpling leftover breakfast", "vinegar, garlic, tea, leftover soup", "leftover dumplings, vinegar, tea"),
        g("Milk and bread", "egg, fruit, tea", "milk, bread, egg"),
        g("Sweet potato leftover", "congee, soy milk, pickles", "leftover sweet potato, congee"),
        g("Wonton leftover", "greens, tea, vinegar", "leftover wonton soup, greens"),
    ],
}

CHNS_LUNCHES = {
    "very_common": [
        g("Rice and dishes", "soup, leftover veg, meat, tea, water", "rice, stir-fried veg, meat, soup", "rice, leftover dishes, soup, tea"),
        g("Noodles", "greens, egg, vinegar, tea, chili", "noodles, greens, egg", "leftover noodle soup"),
        g("Leftover breakfast buns", "rice leftover, soup, tea, pickles", "leftover baozi, leftover rice, soup"),
        g("Congee leftover lunch", "pickles, leftover dishes, tea", "leftover congee, pickles, leftover veg"),
    ],
    "common": [
        g("Dumpling leftover", "vinegar, garlic, soup, tea", "leftover dumplings, vinegar, leftover soup"),
        g("Fried rice leftover", "soup, pickles, tea, egg", "leftover fried rice, soup, pickles"),
        g("Stir-fried veg and rice", "egg, leftover meat, soup, tea", "rice, stir-fried greens, egg, soup"),
        g("Mantou and leftover dishes", "soup, pickles, tea", "mantou, leftover meat, leftover veg, soup"),
        g("Egg and tomato leftover", "rice, soup, tea", "tomato egg leftover, rice, soup"),
        g("Noodle soup leftover", "greens, chili, tea, pickle", "leftover noodle soup, greens"),
        g("Cold leftover dishes", "rice, tea, soup leftover", "cold leftover veg, rice, tea"),
    ],
    "also_seen": [
        g("Hot pot leftover", "rice, dipping sauce, tea, greens", "leftover hot pot, rice, greens"),
        g("Baozi lunch", "soy milk leftover, pickles, tea", "leftover baozi, pickles, tea"),
        g("Jianbing leftover lunch", "soy milk, fruit, tea", "leftover jianbing, fruit"),
        g("Wonton leftover", "greens, vinegar, tea", "leftover wontons, greens"),
        g("Bread and leftover dishes", "tea, soup, fruit", "bread, leftover stir fry, tea"),
    ],
}

CHNS_DINNERS = {
    "very_common": [
        g("Rice and several dishes", "soup, tea, leftover veg, meat", "rice, stir-fried veg, meat, soup", "rice, fish, greens, soup, tea"),
        g("Noodles", "greens, egg, vinegar, chili, tea", "noodles, greens, minced meat", "noodle soup, greens, egg"),
        g("Dumplings", "vinegar, garlic, leftover soup, tea", "dumplings, vinegar, leftover soup", "leftover dumplings, greens"),
        g("Soup and leftover rice", "greens, egg, pickles, tea", "soup, leftover rice, greens, egg"),
    ],
    "common": [
        g("Tomato and egg with rice", "soup, leftover veg, tea", "tomato egg, rice, soup", "tomato egg, leftover rice"),
        g("Stir-fried meat and veg", "rice, soup, tea, tofu leftover", "pork stir fry, greens, rice, soup"),
        g("Fish and rice", "greens, soup, tea, leftover veg", "steamed fish, rice, greens, soup"),
        g("Hot pot", "rice, dipping sauce, greens, tofu, tea", "hot pot, rice, greens, tofu"),
        g("Fried rice", "soup, egg, leftover veg, tea", "fried rice, leftover soup, egg"),
        g("Tofu and greens", "rice, soup, leftover meat, tea", "mapo tofu leftover, rice, greens, soup"),
        g("Baozi dinner leftover style", "congee leftover, pickles, tea", "leftover baozi, leftover congee, pickles"),
        g("Egg drop soup and rice", "leftover veg, pickles, tea", "egg drop soup, leftover rice, leftover veg"),
    ],
    "also_seen": [
        g("Wontons", "greens, vinegar, chili, tea", "wontons, greens, vinegar"),
        g("Scallion pancake with leftover dishes", "soup, tea, egg", "scallion pancake, leftover veg, soup"),
        g("Congee dinner", "pickles, leftover fish, tea, youtiao leftover", "congee, leftover fish, pickles"),
        g("Mantou and stew leftover", "greens, soup, tea", "mantou, leftover stew, greens"),
        g("Leftover hot pot noodles", "greens, chili, tea", "hot pot leftover noodles, greens"),
    ],
}

CHNS_DRINKS = {
    "very_common": [
        g("Tea", "water, leftover meal", "tea", "green tea", "jasmine tea"),
        g("Water", "", "water"),
        g("Soy milk", "youtiao leftover, baozi leftover", "soy milk"),
        g("Hot water", "tea leftover, meal leftover", "hot water"),
    ],
    "common": [
        g("Milk", "bread, banana, coffee leftover", "milk"),
        g("Juice", "water, fruit", "orange juice", "apple juice"),
        g("Soda", "water, leftover meal", "soda", "cola"),
        g("Coffee", "milk, sugar, bread", "coffee", "coffee, milk"),
        g("Beer", "water, leftover hot pot", "beer"),
        g("Grain drink leftover", "rice leftover, water", "leftover rice drink"),
    ],
    "also_seen": [
        g("Yogurt drink", "fruit, bread", "yogurt drink"),
        g("Sour plum drink leftover", "water, ice", "suanmeitang leftover"),
        g("Wine leftover at home", "water, leftover dishes", "wine, water"),
        g("Herbal tea leftover", "water", "herbal tea leftover"),
        g("Bubble tea leftover", "water, fruit", "leftover milk tea"),
        g("Diet soda", "water", "diet soda"),
    ],
}

CHNS_SNACKS = {
    "very_common": [
        g("Fruit", "tea, nuts, yogurt", "apple", "banana", "pear"),
        g("Leftover baozi", "tea, soy milk, pickles", "leftover baozi, tea"),
        g("Nuts", "fruit, tea, leftover seeds", "nuts", "sunflower seeds, tea"),
        g("Yogurt", "fruit, honey, granola", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Mantou leftover", "leftover dishes, tea, soy milk", "leftover mantou, leftover veg, tea"),
        g("Sunflower seeds", "tea, nuts, fruit", "sunflower seeds, tea"),
        g("Biscuits", "tea, milk, soy milk", "biscuits, tea"),
        g("Leftover dumplings", "vinegar, tea, leftover soup", "leftover dumplings, vinegar, tea"),
        g("Bread", "milk, tea, jam", "bread, milk"),
        g("Pickles and leftover rice", "tea, leftover soup", "leftover rice, pickles, tea"),
        g("Sweet potato leftover", "tea, yogurt, fruit", "leftover sweet potato, tea"),
    ],
    "also_seen": [
        g("Youtiao leftover", "soy milk, tea, congee leftover", "leftover youtiao, soy milk"),
        g("Chips", "soda, tea", "chips"),
        g("Ice cream snack", "fruit, tea", "ice cream"),
        g("Chocolate", "tea, milk, fruit", "chocolate"),
        g("Scallion pancake leftover", "tea, leftover soup", "leftover scallion pancake, tea"),
    ],
}

CHNS_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, tea, ice cream", "apple", "orange", "fruit, yogurt"),
        g("Yogurt", "fruit, honey", "yogurt", "yogurt, fruit"),
        g("Sweet soup leftover", "rice balls leftover, fruit, tea", "leftover sweet soup", "tangyuan leftover, sweet soup"),
        g("Ice cream", "fruit, wafer, red bean leftover", "ice cream"),
    ],
    "common": [
        g("Mooncake leftover", "tea, fruit", "leftover mooncake, tea"),
        g("Red bean leftover", "rice, ice cream, tea", "leftover red bean soup, rice"),
        g("Cake leftover", "tea, milk, fruit", "cake leftover, tea"),
        g("Sesame balls leftover", "tea, fruit", "leftover sesame balls, tea"),
        g("Cookies", "tea, milk, soy milk", "cookies, tea"),
        g("Sweet potato dessert leftover", "tea, yogurt", "leftover sweet potato"),
        g("Chocolate", "tea, milk, fruit", "chocolate"),
    ],
    "also_seen": [
        g("Douhua leftover", "syrup, peanuts leftover, tea", "leftover tofu pudding"),
        g("Egg tart leftover", "tea, milk, fruit", "leftover egg tart, tea"),
        g("Jelly", "fruit, tea", "jelly, fruit"),
        g("Osmanthus cake leftover", "tea, fruit", "leftover osmanthus cake, tea"),
        g("Tangyuan leftover", "sweet soup, tea", "leftover tangyuan"),
    ],
}

CHNS_OTHER = {
    "very_common": [
        g("Tea", "fruit, leftover seeds, leftover buns", "tea"),
        g("Leftover rice", "pickles, leftover dishes, tea", "leftover rice, leftover dishes, tea"),
        g("Fruit", "tea, yogurt", "apple", "banana"),
        g("Congee leftover", "pickles, tea, leftover youtiao", "leftover congee, pickles"),
    ],
    "common": [
        g("Leftover baozi", "tea, soy milk, pickles", "leftover baozi, tea"),
        g("Soy milk", "youtiao leftover, bread", "soy milk"),
        g("Noodles at odd hour", "egg, greens, vinegar, tea", "leftover noodles, egg, greens"),
        g("Sunflower seeds", "tea, fruit", "sunflower seeds, tea"),
        g("Yogurt", "fruit, honey", "yogurt"),
        g("Mantou leftover", "leftover dishes, tea", "leftover mantou, leftover veg"),
        g("Dumpling leftover", "vinegar, tea, leftover soup", "leftover dumplings, tea"),
    ],
    "also_seen": [
        g("Late fried rice", "egg, leftover veg, tea", "fried leftover rice, egg"),
        g("Hot pot leftover", "rice, tea, greens", "leftover hot pot, rice"),
        g("Bread", "milk, tea, jam", "bread, milk"),
        g("Ice cream", "fruit, tea", "ice cream"),
        g("Wonton leftover", "greens, tea", "leftover wonton soup"),
    ],
}

ENSANUT_BREAKFASTS = {
    "very_common": [
        g("Eggs, tortillas, and beans", "salsa, coffee with milk, cheese, avocado", "huevos, tortillas, beans, salsa, café con leche", "scrambled eggs, tortillas, beans, salsa"),
        g("Café con leche", "pan dulce, tortillas leftover, sugar, bread", "café con leche, pan dulce", "coffee with milk, bread"),
        g("Pan dulce", "café con leche, milk, fruit", "pan dulce, café con leche", "concha, café con leche"),
        g("Beans and tortillas", "cheese, salsa, eggs leftover, coffee", "beans, tortillas, cheese, salsa", "refried beans, tortillas, café con leche"),
        g("Tortillas leftover breakfast", "eggs, salsa, leftover meat, coffee", "tortillas, leftover meat, salsa, eggs"),
    ],
    "common": [
        g("Chilaquiles leftover", "eggs, cream, cheese, beans, coffee", "chilaquiles, eggs, cream, cheese", "leftover chilaquiles, beans, café con leche"),
        g("Quesadillas", "salsa, beans, coffee, leftover chicken", "quesadillas, salsa, beans", "quesadilla, café con leche"),
        g("Fruit", "yogurt, granola, juice, coffee", "papaya, yogurt", "banana, café con leche"),
        g("Tamales leftover", "atole leftover, coffee, salsa", "leftover tamal, café con leche", "leftover tamales, atole"),
        g("Yogurt", "fruit, granola, honey, coffee", "yogurt, fruit"),
        g("Atole leftover", "pan dulce, tamal leftover, milk", "atole, pan dulce"),
        g("Huevos rancheros leftover style", "tortillas, salsa, beans, coffee", "eggs, salsa, tortillas, beans, café con leche"),
    ],
    "also_seen": [
        g("Tacos leftover breakfast", "salsa, leftover meat, coffee, beans", "leftover tacos, salsa, café con leche"),
        g("Molletes leftover", "beans, cheese, salsa, coffee", "molletes, salsa, café con leche"),
        g("Smoothie", "fruit, milk, bread, yogurt", "licuado, pan dulce"),
        g("Oatmeal", "milk, cinnamon, banana, coffee", "avena, milk, cinnamon"),
        g("Leftover rice breakfast", "eggs, beans, tortillas, coffee", "leftover rice, eggs, beans, tortillas"),
    ],
}

ENSANUT_LUNCHES = {
    "very_common": [
        g("Tortillas, beans, and leftover meat", "salsa, rice, agua fresca, cheese", "tortillas, beans, leftover meat, salsa, rice", "tortillas, beans, salsa, leftover chicken"),
        g("Tacos", "salsa, leftover meat, agua fresca, lime", "tacos, salsa, agua fresca", "leftover tacos, salsa, beans"),
        g("Rice, beans, and tortillas", "salsa, leftover meat, salad, agua fresca", "arroz, beans, tortillas, salsa, leftover meat"),
        g("Eggs leftover at lunch", "tortillas, beans, salsa, agua fresca", "eggs, tortillas, beans, salsa"),
    ],
    "common": [
        g("Quesadillas", "salsa, beans, leftover chicken, agua fresca", "quesadillas, salsa, beans", "quesadilla, leftover chicken, salsa"),
        g("Soup leftover", "tortillas, lime, salsa, rice leftover", "sopa, tortillas, lime", "leftover vegetable soup, tortillas"),
        g("Torta leftover", "salsa, agua fresca, pickled jalapeño", "torta, salsa, agua fresca"),
        g("Leftover mole", "rice, tortillas, chicken leftover, agua fresca", "leftover mole, rice, chicken, tortillas"),
        g("Chilaquiles leftover lunch", "beans, cream, cheese, agua fresca", "leftover chilaquiles, beans, cream"),
        g("Salad and tortillas", "beans, leftover meat, agua fresca, cheese", "salad, tortillas, beans, leftover meat"),
        g("Tamales leftover", "salsa, atole leftover, agua fresca", "leftover tamales, salsa"),
    ],
    "also_seen": [
        g("Pozole leftover", "tostadas, radish, lime, oregano, agua fresca", "leftover pozole, tostadas, lime, radish"),
        g("Enchiladas leftover", "cream, cheese, rice, beans, agua fresca", "leftover enchiladas, rice, beans"),
        g("Gorditas leftover", "salsa, beans, leftover meat, agua fresca", "leftover gorditas, salsa, beans"),
        g("Sopes leftover", "beans, salsa, cheese, cream, agua fresca", "leftover sopes, beans, salsa"),
        g("Leftover grilled meat", "tortillas, salsa, beans, guacamole leftover", "leftover carne asada, tortillas, salsa, beans"),
    ],
}

ENSANUT_DINNERS = {
    "very_common": [
        g("Tacos", "salsa, leftover meat, tortillas, agua fresca, lime", "tacos, salsa", "leftover meat tacos, salsa, tortillas"),
        g("Quesadillas", "salsa, beans, leftover chicken, coffee", "quesadillas, salsa, beans", "quesadilla, leftover salsa"),
        g("Eggs, tortillas, and salsa", "beans, cheese, leftover rice, coffee", "eggs, tortillas, salsa, beans", "huevos, tortillas, leftover beans"),
        g("Beans and tortillas", "cheese, salsa, leftover rice, coffee", "beans, tortillas, cheese, salsa"),
    ],
    "common": [
        g("Soup", "tortillas, lime, leftover rice, salsa", "sopa, tortillas, lime", "caldo leftover, tortillas"),
        g("Tortas", "salsa, pickled jalapeño, agua fresca, leftover meat", "torta, salsa, leftover meat"),
        g("Chilaquiles", "eggs, cream, cheese, beans, coffee", "chilaquiles, cream, cheese, eggs"),
        g("Rice, leftover meat, and tortillas", "beans, salsa, agua fresca, salad", "rice, leftover meat, tortillas, beans, salsa"),
        g("Tamales", "atole leftover, salsa, coffee", "tamales, salsa", "leftover tamales, café con leche"),
        g("Enchiladas leftover", "cream, cheese, rice, beans", "leftover enchiladas, cream, rice"),
        g("Tostadas", "beans, salsa, leftover chicken, cream, lettuce", "tostadas, beans, leftover chicken, salsa"),
        g("Leftover mole", "rice, tortillas, chicken, agua fresca", "mole leftover, rice, chicken, tortillas"),
    ],
    "also_seen": [
        g("Pozole", "tostadas, radish, lime, oregano, cabbage", "pozole, tostadas, lime, radish, cabbage"),
        g("Mole", "rice, tortillas, chicken, sesame leftover", "mole, rice, chicken, tortillas"),
        g("Tacos de leftover stew", "salsa, cilantro, onion, lime", "stew leftover tacos, salsa, cilantro, onion"),
        g("Pan dulce dinner", "café con leche, milk, leftover fruit", "pan dulce, café con leche"),
        g("Atole and leftover tamal", "pan dulce, cinnamon", "atole, leftover tamal"),
    ],
}

ENSANUT_DRINKS = {
    "very_common": [
        g("Café con leche", "sugar, pan dulce, water", "café con leche", "coffee with milk"),
        g("Water", "", "water"),
        g("Aguas frescas", "lunch leftover, ice, fruit", "agua de jamaica", "agua de horchata", "agua de limón"),
        g("Coffee", "sugar, milk, water", "coffee", "café"),
    ],
    "common": [
        g("Milk", "coffee, pan dulce, fruit", "milk"),
        g("Atole leftover", "tamal leftover, cinnamon, pan dulce", "atole"),
        g("Juice", "water, fruit, breakfast leftover", "orange juice", "fresh juice"),
        g("Soda", "water, tacos leftover", "soda", "cola"),
        g("Tea", "lemon, sugar, water", "tea"),
        g("Horchata leftover", "cinnamon, ice, water", "horchata"),
    ],
    "also_seen": [
        g("Beer", "water, leftover tacos", "beer"),
        g("Chocolate atole leftover", "pan dulce, milk", "champurrado leftover"),
        g("Diet soda", "water", "diet soda"),
        g("Licuado leftover", "fruit, milk, bread", "licuado leftover"),
        g("Jamaica leftover", "ice, water, lunch", "agua de jamaica leftover"),
        g("Wine leftover at home", "water", "wine, water"),
    ],
}

ENSANUT_SNACKS = {
    "very_common": [
        g("Fruit", "chili leftover, lime, yogurt, water", "mango", "banana", "orange, lime"),
        g("Tortilla leftover snack", "salsa, leftover beans, cheese", "tortilla, leftover beans, salsa", "quesadilla leftover"),
        g("Pan dulce", "café con leche, milk, fruit", "pan dulce, café con leche"),
        g("Yogurt", "fruit, granola, honey", "yogurt", "yogurt, fruit"),
    ],
    "common": [
        g("Chips and salsa", "soda, leftover beans, lime", "chips, salsa", "totopos, salsa"),
        g("Nuts", "fruit, chili leftover, lime", "peanuts", "nuts"),
        g("Cheese and tortillas", "salsa, leftover beans", "queso, tortillas, salsa"),
        g("Elote leftover", "mayo leftover, cheese, chili, lime", "leftover elote"),
        g("Cookies", "milk, coffee, fruit", "cookies, milk"),
        g("Tacos leftover snack", "salsa, lime", "leftover taco, salsa"),
        g("Gelatin leftover", "fruit, cream", "gelatina leftover"),
    ],
    "also_seen": [
        g("Tamales leftover snack", "atole leftover, salsa, coffee", "leftover tamal, café con leche"),
        g("Ice cream snack", "fruit, wafer, chili leftover", "ice cream", "nieve leftover"),
        g("Popcorn", "soda, chili leftover, lime", "popcorn"),
        g("Bread with leftover beans", "cheese, salsa, coffee", "bolillo, leftover beans, cheese"),
        g("Agua fresca and leftover chips", "salsa, lime", "totopos, agua fresca, salsa"),
    ],
}

ENSANUT_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, cream, chili leftover, lime", "papaya", "banana", "fruit salad"),
        g("Flan leftover", "cream, coffee, milk", "flan leftover", "flan"),
        g("Pan dulce", "café con leche, milk, chocolate leftover", "pan dulce, café con leche"),
        g("Ice cream", "fruit, wafer, chocolate", "ice cream", "nieve leftover"),
    ],
    "common": [
        g("Arroz con leche leftover", "cinnamon, raisins leftover, coffee", "arroz con leche leftover"),
        g("Gelatin", "fruit, cream, milk", "gelatina", "gelatin, fruit"),
        g("Yogurt", "fruit, honey, granola", "yogurt, fruit"),
        g("Chocolate", "coffee, milk, pan dulce leftover", "chocolate"),
        g("Cookies", "milk, coffee, fruit", "cookies, milk"),
        g("Tres leches leftover", "fruit, cream, coffee", "leftover tres leches"),
        g("Cajeta leftover", "pancakes leftover, fruit, milk", "cajeta leftover, fruit"),
    ],
    "also_seen": [
        g("Churros leftover", "chocolate leftover, coffee, sugar", "leftover churros, chocolate"),
        g("Buñuelos leftover", "piloncillo leftover, coffee", "leftover buñuelos"),
        g("Rice pudding leftover", "cinnamon, milk, coffee", "leftover rice pudding"),
        g("Paleta leftover", "fruit, chili leftover, lime", "paleta leftover"),
        g("Cake leftover", "coffee, milk, fruit", "cake leftover, café con leche"),
    ],
}

ENSANUT_OTHER = {
    "very_common": [
        g("Café con leche", "pan dulce, leftover bread", "café con leche"),
        g("Tortillas leftover", "beans leftover, salsa, cheese", "tortillas, leftover beans, salsa"),
        g("Fruit", "yogurt, agua fresca leftover", "banana", "orange"),
        g("Leftover tacos", "salsa, lime, leftover meat", "leftover tacos, salsa"),
    ],
    "common": [
        g("Pan dulce", "café con leche, milk", "pan dulce, café con leche"),
        g("Quesadilla leftover", "salsa, leftover beans", "leftover quesadilla, salsa"),
        g("Agua fresca leftover", "fruit, leftover chips", "agua fresca leftover"),
        g("Yogurt", "fruit, granola", "yogurt"),
        g("Eggs leftover", "tortillas, salsa, beans", "leftover eggs, tortillas, salsa"),
        g("Soup leftover", "tortillas, lime", "leftover soup, tortillas"),
        g("Atole leftover", "tamal leftover, pan dulce", "atole leftover"),
    ],
    "also_seen": [
        g("Late quesadilla", "salsa, leftover beans, coffee", "quesadilla, salsa, leftover beans"),
        g("Tamales leftover", "atole leftover, salsa", "leftover tamal"),
        g("Ice cream", "fruit, wafer", "ice cream"),
        g("Chips and salsa", "agua fresca leftover, lime", "totopos, salsa"),
        g("Molletes leftover", "salsa, café con leche", "leftover molletes, salsa"),
    ],
}

SCAI_BREAKFASTS = {
    "very_common": [
        g("Espresso and biscuit", "milk, fette biscottate, jam, fruit", "espresso, biscuit", "espresso, fette biscottate, jam"),
        g("Fette biscottate", "jam, butter, espresso, milk, honey", "fette biscottate, jam, espresso", "fette biscottate, butter, milk"),
        g("Milk and coffee", "bread, biscuit, rusks, sugar", "caffè latte, biscuit", "milk, coffee, bread"),
        g("Yogurt", "fruit, rusks, honey, espresso", "yogurt, fruit", "yogurt, rusks"),
        g("Bread and jam", "espresso, butter, milk, fruit", "bread, jam, espresso", "bread, butter, jam"),
    ],
    "common": [
        g("Cornetto leftover", "espresso, cappuccino leftover, jam", "cornetto, espresso", "leftover brioche, cappuccino"),
        g("Fruit", "yogurt, rusks, espresso", "apple, espresso", "banana, yogurt"),
        g("Ricotta", "honey, bread, fruit, espresso", "ricotta, honey, bread", "ricotta, fruit"),
        g("Cappuccino leftover at home", "cornetto leftover, rusks, sugar", "cappuccino, rusks"),
        g("Cereal", "milk, yogurt, fruit, coffee", "cereal, milk"),
        g("Toast leftover", "jam, espresso, ham leftover, cheese", "toast, jam, espresso"),
        g("Juice", "rusks, espresso, fruit, yogurt", "orange juice, fette biscottate, espresso"),
    ],
    "also_seen": [
        g("Eggs leftover breakfast", "bread, espresso, cheese", "leftover frittata, bread, espresso"),
        g("Pizza leftover breakfast", "espresso, water", "leftover pizza, espresso"),
        g("Cheese and bread breakfast", "espresso, tomato leftover, fruit", "bread, cheese, espresso"),
        g("Smoothie", "rusks, yogurt, fruit", "smoothie, rusks"),
        g("Pastry leftover", "espresso, milk", "leftover pastry, espresso"),
    ],
}

SCAI_LUNCHES = {
    "very_common": [
        g("Pasta", "bread, salad, cheese, water, fruit", "pasta al pomodoro, bread, salad", "leftover pasta, bread, salad", "pasta, parmesan, salad"),
        g("Bread and leftover pasta", "salad, cheese, water, fruit", "leftover pasta, bread", "bread, leftover ragù, salad"),
        g("Salad and bread", "cheese, leftover meat, water, fruit", "salad, bread, cheese", "insalata, leftover chicken, bread"),
        g("Minestrone leftover", "bread, cheese, water, fruit", "leftover minestrone, bread", "minestrone, bread, parmesan"),
    ],
    "common": [
        g("Risotto leftover", "salad, bread, water, cheese", "leftover risotto, salad", "leftover risotto, bread"),
        g("Frittata leftover", "salad, bread, tomato, water", "leftover frittata, salad, bread"),
        g("Pizza leftover", "salad, water, fruit", "leftover pizza, salad"),
        g("Cheese, bread, and tomato", "olive oil, leftover greens, water, fruit", "bread, tomato, cheese, olive oil"),
        g("Leftover roast", "salad, bread, leftover veg, water", "leftover roast, salad, bread"),
        g("Rice leftover", "leftover veg, cheese, water, salad", "leftover rice, leftover veg, salad"),
        g("Soup leftover", "bread, cheese, water, fruit", "leftover soup, bread, cheese"),
    ],
    "also_seen": [
        g("Panino leftover", "fruit, water, leftover salad", "panino, fruit, water"),
        g("Gnocchi leftover", "salad, cheese, water", "leftover gnocchi, salad"),
        g("Polenta leftover", "leftover stew, cheese, salad", "leftover polenta, leftover stew"),
        g("Couscous leftover", "veg, leftover fish, water", "leftover couscous, veg"),
        g("Eggs and salad", "bread, tomato, water, cheese", "eggs, salad, bread"),
    ],
}

SCAI_DINNERS = {
    "very_common": [
        g("Pasta", "bread, salad, cheese, wine, water", "pasta al pomodoro, salad, bread", "pasta, ragù leftover, salad", "pasta, pesto leftover, bread"),
        g("Meat or fish with veg", "bread, salad, leftover potatoes, water, wine", "grilled chicken, salad, bread", "fish, veg, bread, salad"),
        g("Minestrone", "bread, cheese, leftover rice, water", "minestrone, bread", "minestrone, bread, parmesan"),
        g("Salad dinner", "bread, cheese, leftover meat, tomato, oil", "salad, bread, cheese, leftover meat"),
    ],
    "common": [
        g("Risotto", "salad, wine, leftover veg, bread", "risotto, salad", "leftover risotto, salad"),
        g("Frittata", "salad, bread, tomato, leftover veg", "frittata, salad, bread", "leftover frittata, tomato, bread"),
        g("Pizza", "salad, beer leftover, water, wine", "pizza, salad", "homemade pizza, salad"),
        g("Cheese and bread dinner", "salad, tomato, fruit, wine", "cheese, bread, salad, tomato"),
        g("Leftover roast chicken", "salad, bread, leftover potatoes, wine", "leftover roast chicken, salad, bread"),
        g("Soup and bread", "cheese, leftover pasta leftover, water", "soup, bread, cheese"),
        g("Grilled veg and leftover protein", "bread, oil, salad, water", "grilled veg, leftover meat, bread"),
        g("Gnocchi leftover", "salad, cheese, sage leftover, water", "leftover gnocchi, salad"),
    ],
    "also_seen": [
        g("Polenta leftover", "leftover stew, cheese, salad", "polenta leftover, leftover stew, cheese"),
        g("Lasagna leftover", "salad, bread, wine", "leftover lasagna, salad"),
        g("Cotoletta leftover", "salad, leftover potatoes, bread", "leftover cotoletta, salad"),
        g("Beans leftover", "bread, leftover greens, olive oil, water", "leftover beans, bread, greens"),
        g("Omelette with leftover pasta", "salad, bread, tomato", "frittata di pasta leftover, salad"),
    ],
}

SCAI_DRINKS = {
    "very_common": [
        g("Espresso", "sugar, water, leftover biscuit", "espresso", "caffè"),
        g("Water", "", "water"),
        g("Wine", "water, leftover dinner", "wine", "red wine"),
        g("Milk", "coffee, rusks, cereal", "milk"),
    ],
    "common": [
        g("Tea", "lemon, sugar, biscuit leftover", "tea"),
        g("Orange juice", "water, breakfast leftover", "orange juice"),
        g("Cappuccino leftover at home", "sugar, leftover pastry", "cappuccino"),
        g("Soda", "water, leftover pizza", "soda", "cola"),
        g("Beer", "water, leftover pizza", "beer"),
        g("Herbal tea", "lemon, leftover biscuit", "herbal tea", "camomile"),
    ],
    "also_seen": [
        g("Chinotto leftover", "water", "chinotto"),
        g("Aperitivo leftover at home", "water, leftover chips, leftover olives", "wine, water, olives leftover"),
        g("Diet soda", "water", "diet soda"),
        g("Hot chocolate leftover", "milk, leftover biscuit", "hot chocolate"),
        g("Limonata leftover", "water, ice", "limonata leftover"),
        g("Digestivo leftover", "espresso leftover, water", "leftover amaro, espresso"),
    ],
}

SCAI_SNACKS = {
    "very_common": [
        g("Fruit", "yogurt, nuts, rusks", "apple", "banana", "grapes"),
        g("Yogurt", "fruit, honey, rusks", "yogurt", "yogurt, fruit"),
        g("Bread and leftover cheese", "tomato, olive oil, leftover ham", "bread, cheese, tomato", "bread, leftover cheese"),
        g("Biscuits", "espresso, milk, tea", "biscuits, espresso", "biscuits, milk"),
    ],
    "common": [
        g("Ricotta", "honey, fruit, bread, espresso", "ricotta, honey, fruit"),
        g("Nuts", "fruit, leftover wine, cheese", "nuts"),
        g("Crackers", "cheese, leftover ham, tomato", "crackers, cheese"),
        g("Chocolate", "espresso, fruit, milk", "chocolate"),
        g("Leftover pizza snack", "water, leftover salad", "leftover pizza"),
        g("Fette biscottate", "jam, leftover espresso, butter", "fette biscottate, jam"),
        g("Olives leftover", "bread, leftover cheese, tomato", "olives, bread, leftover cheese"),
    ],
    "also_seen": [
        g("Gelato leftover snack", "fruit, wafer, espresso leftover", "gelato leftover"),
        g("Panino leftover", "fruit, water", "leftover panino"),
        g("Chips", "soda leftover, leftover olives", "chips"),
        g("Carrot leftover", "leftover hummus-style dip, bread", "carrot, leftover dip"),
        g("Ice lolly leftover", "fruit, water", "ice lolly leftover"),
    ],
}

SCAI_DESSERTS = {
    "very_common": [
        g("Fruit", "yogurt, leftover gelato, espresso leftover", "apple", "fruit salad", "orange"),
        g("Yogurt", "fruit, honey, leftover biscuit", "yogurt", "yogurt, fruit"),
        g("Gelato leftover", "fruit, wafer, espresso leftover", "gelato leftover", "gelato, fruit"),
        g("Biscuits", "espresso, milk, leftover fruit", "biscuits, espresso"),
    ],
    "common": [
        g("Tiramisu leftover", "espresso leftover, leftover cocoa, fruit", "leftover tiramisu, espresso"),
        g("Cake leftover", "espresso, leftover cream, fruit", "leftover cake, espresso"),
        g("Ricotta dessert leftover", "honey, fruit, leftover cocoa", "ricotta, honey, fruit"),
        g("Ice cream leftover", "fruit, wafer, leftover chocolate", "ice cream leftover"),
        g("Panna cotta leftover", "fruit leftover, leftover caramel", "leftover panna cotta, fruit"),
        g("Chocolate", "espresso, leftover fruit, milk", "chocolate, espresso"),
        g("Crostata leftover", "espresso, leftover jam, fruit", "leftover crostata, espresso"),
    ],
    "also_seen": [
        g("Cannoli leftover", "espresso leftover, leftover ricotta, fruit", "leftover cannoli, espresso"),
        g("Panna cotta and fruit leftover", "leftover berries, espresso", "leftover panna cotta, leftover berries"),
        g("Jelly leftover", "fruit, leftover cream", "leftover jelly, fruit"),
        g("Pandoro leftover", "leftover cream, espresso, fruit", "leftover pandoro, espresso"),
        g("Affogato leftover", "leftover gelato, leftover espresso", "leftover gelato, leftover espresso"),
    ],
}

SCAI_OTHER = {
    "very_common": [
        g("Espresso", "biscuit leftover, water", "espresso"),
        g("Fruit", "yogurt, leftover rusks", "apple", "banana"),
        g("Leftover pasta", "bread, leftover salad, water", "leftover pasta, bread"),
        g("Bread and leftover cheese", "tomato leftover, leftover ham", "bread, leftover cheese"),
    ],
    "common": [
        g("Yogurt", "fruit, honey, rusks", "yogurt"),
        g("Fette biscottate", "jam, leftover espresso, milk", "fette biscottate, jam, espresso"),
        g("Minestrone leftover", "bread, leftover cheese", "leftover minestrone, bread"),
        g("Leftover frittata", "bread, leftover salad, tomato", "leftover frittata, bread, salad"),
        g("Wine leftover", "leftover cheese, leftover bread, water", "wine, leftover cheese, bread"),
        g("Biscuits", "espresso leftover, milk", "biscuits, espresso"),
        g("Leftover pizza", "leftover salad, water", "leftover pizza"),
    ],
    "also_seen": [
        g("Late panino", "leftover salad, leftover fruit, water", "leftover panino, fruit"),
        g("Gelato leftover", "espresso leftover, fruit", "leftover gelato"),
        g("Camomile", "leftover biscuit, honey", "camomile, leftover biscuit"),
        g("Leftover risotto", "leftover salad, leftover cheese", "leftover risotto, salad"),
        g("Ricotta leftover", "honey, leftover bread, fruit", "leftover ricotta, honey, bread"),
    ],
}


def filters_block(*bullets: str) -> str:
    return "\n".join(f"- {b}" for b in bullets)


STANDARD_FILTERS = filters_block(
    "Adults (analogous to NHANES 18+)",
    "Home-eaten everyday fare, not restaurant tasting menus",
    "Grocery / home-store foods rather than eat-out as the default",
    "Lunch and dinner are mixed plates, not dessert-only or drink-only",
    "Baby foods omitted",
    "Drinks that belong with a meal stay on that plate; drink-only sittings go in drinks.md",
)


def occasion_source(survey_short: str) -> str:
    return (
        f"Home-eaten plates inspired by {survey_short}, adults, everyday fare mostly at home."
    )


SURVEYS: list[dict] = [
    {
        "slug": "ndns-analysis",
        "heading": "NDNS meal ideas",
        "survey_short": "UK NDNS",
        "readme": dict(
            heading="NDNS meal ideas",
            survey="UK National Diet and Nutrition Survey (NDNS) Rolling Programme",
            years="2008/09 onward; published food-group tables commonly cited from Years 9–11 (2016/17–2018/19) and later rolling-programme reports",
            located=(
                "UK Data Service study SN 6533 holds the microdata (registration). "
                "This pass used **published NDNS food-group results** plus typical UK eating "
                "occasions. SN 6533 was not downloaded."
            ),
            parsed="No. Microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: toast and eggs, French toast, "
                "or toad in the hole; leftover roast as a sandwich versus meat-and-potato "
                "dinner; tea with biscuits versus a pudding with custard."
            ),
        ),
        "occasions": {
            "breakfasts": NDNS_BREAKFASTS,
            "lunches": NDNS_LUNCHES,
            "dinners": NDNS_DINNERS,
            "drinks": NDNS_DRINKS,
            "snacks": NDNS_SNACKS,
            "desserts": NDNS_DESSERTS,
            "other": NDNS_OTHER,
        },
    },
    {
        "slug": "cchs-analysis",
        "heading": "CCHS-Nutrition meal ideas",
        "survey_short": "Canada CCHS-Nutrition 2015",
        "readme": dict(
            heading="CCHS-Nutrition meal ideas",
            survey="Canadian Community Health Survey – Nutrition 2015 (CCHS-Nutrition)",
            years="2015 (24-hour dietary recall cycle)",
            located=(
                "Public Use Microdata File (PUMF) and Research Data Centre (RDC) access "
                "exist through Statistics Canada. This pass did not obtain or parse PUMF/RDC "
                "files. Plates follow typical Canadian home eating plus published 2015 "
                "nutrition highlights (coffee, milk, bread, fruit, meat-and-potato dinners)."
            ),
            parsed="No. PUMF/RDC microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: eggs and toast versus a breakfast "
                "sandwich versus pancakes; leftover roast as a sandwich versus a plate with "
                "potatoes and veg; cheddar with crackers versus a grilled cheese with soup."
            ),
        ),
        "occasions": {
            "breakfasts": CCHS_BREAKFASTS,
            "lunches": CCHS_LUNCHES,
            "dinners": CCHS_DINNERS,
            "drinks": CCHS_DRINKS,
            "snacks": CCHS_SNACKS,
            "desserts": CCHS_DESSERTS,
            "other": CCHS_OTHER,
        },
    },
    {
        "slug": "nnpas-analysis",
        "heading": "NNPAS meal ideas",
        "survey_short": "Australia NNPAS / Australian Health Survey",
        "readme": dict(
            heading="NNPAS meal ideas",
            survey="National Nutrition and Physical Activity Survey (NNPAS) / Australian Health Survey",
            years="2011–12 NNPAS (AHS); later ABS nutrition releases exist but were not parsed here",
            located=(
                "ABS Confidentialised Unit Record Files (CURF) exist under application. "
                "This pass did not obtain CURF microdata. Plates follow published AHS/NNPAS "
                "food-group highlights plus typical Australian home plates (Weet-Bix, vegemite "
                "toast, meat and three veg, meat pie, parma-at-home, pavlova)."
            ),
            parsed="No. ABS CURF microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: Weet-Bix with milk, vegemite toast, "
                "or eggs on toast; leftover roast as sandwiches versus a meat-and-three-veg "
                "plate; pavlova as a weekend dessert versus yogurt and fruit on a weeknight."
            ),
        ),
        "occasions": {
            "breakfasts": NNPAS_BREAKFASTS,
            "lunches": NNPAS_LUNCHES,
            "dinners": NNPAS_DINNERS,
            "drinks": NNPAS_DRINKS,
            "snacks": NNPAS_SNACKS,
            "desserts": NNPAS_DESSERTS,
            "other": NNPAS_OTHER,
        },
    },
    {
        "slug": "efsa-analysis",
        "heading": "EFSA meal ideas",
        "survey_short": "EFSA Comprehensive Food Consumption Database",
        "readme": dict(
            heading="EFSA meal ideas",
            survey="EFSA Comprehensive European Food Consumption Database (chronic, all subjects, g/day)",
            years="Compiled from national dietary surveys (country years vary; mostly 2000s–2010s in this extract)",
            located=(
                f"Excel extract downloaded to `{EFSA_XLSX}`. "
                "Sheet `L3_All_subjects_g_day` is FoodEx Level 3 consumption for all subjects. "
                "This is **not** sitting-level plate data."
            ),
            parsed="See below. If the table is present, Adults L3 means were parsed; plate lists are still qualitative.",
            filters=STANDARD_FILTERS + "\n- Continental European everyday meals (bread and cheese, pasta, meat and potatoes, yogurt, coffee). UK-only plates belong in ndns-analysis; Italy-only specialties belong in scai-analysis.",
            prep_variants=(
                "The same groceries can be different meals: bread and cheese versus a toasted "
                "sandwich versus an omelette with bread; leftover stew with potatoes versus "
                "the same meat in a salad with bread; yogurt as breakfast versus dessert."
            ),
        ),
        "occasions": {
            "breakfasts": EFSA_BREAKFASTS,
            "lunches": EFSA_LUNCHES,
            "dinners": EFSA_DINNERS,
            "drinks": EFSA_DRINKS,
            "snacks": EFSA_SNACKS,
            "desserts": EFSA_DESSERTS,
            "other": EFSA_OTHER,
        },
        "efsa": True,
    },
    {
        "slug": "nhns-japan-analysis",
        "heading": "Japan NHNS meal ideas",
        "survey_short": "Japan National Health and Nutrition Survey",
        "readme": dict(
            heading="Japan NHNS meal ideas",
            survey="Japan National Health and Nutrition Survey (NHNS / 国民健康・栄養調査)",
            years="Annual; published e-Stat tables (recent public tables around 2019–2023)",
            located=(
                "Aggregate tables are on e-Stat. Individual dietary microdata is restricted. "
                "This pass did not obtain microdata. Plates follow published food-group "
                "patterns plus typical home Japanese meals: rice with miso soup and grilled "
                "fish, donburi, ramen or curry rice, onigiri, green tea."
            ),
            parsed="No. Microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: leftover rice as tamago kake gohan, "
                "fried rice, ochazuke, omurice, or onigiri; eggs as a rolled omelette, a fried "
                "egg on rice, or mixed into ramen."
            ),
        ),
        "occasions": {
            "breakfasts": NHNS_BREAKFASTS,
            "lunches": NHNS_LUNCHES,
            "dinners": NHNS_DINNERS,
            "drinks": NHNS_DRINKS,
            "snacks": NHNS_SNACKS,
            "desserts": NHNS_DESSERTS,
            "other": NHNS_OTHER,
        },
    },
    {
        "slug": "nans-analysis",
        "heading": "NZ Adult Nutrition Survey meal ideas",
        "survey_short": "New Zealand Adult Nutrition Survey",
        "readme": dict(
            heading="NZ Adult Nutrition Survey meal ideas",
            survey="New Zealand Adult Nutrition Survey (NANS / NZANS), with later NZ Health Survey nutrition modules unpublished here",
            years="2008/09 Adult Nutrition Survey is the main published dietary recall; later NZHS nutrition indicators exist",
            located=(
                "Published key findings and food-group summaries were used. Confidential "
                "unit-record dietary files were not obtained. Plates resemble Australian "
                "home fare plus mince on toast, sausage sizzle at home, and pavlova "
                "(NZ claim included as a home dessert)."
            ),
            parsed="No. Microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: mince on toast versus spaghetti "
                "mince versus leftover mince with mash; Weet-Bix versus marmite toast versus "
                "eggs; pavlova versus yogurt and kiwifruit."
            ),
        ),
        "occasions": {
            "breakfasts": NANS_BREAKFASTS,
            "lunches": NANS_LUNCHES,
            "dinners": NANS_DINNERS,
            "drinks": NANS_DRINKS,
            "snacks": NANS_SNACKS,
            "desserts": NANS_DESSERTS,
            "other": NANS_OTHER,
        },
    },
    {
        "slug": "pof-brazil-analysis",
        "heading": "Brazil POF meal ideas",
        "survey_short": "Brazil POF 2017–2018",
        "readme": dict(
            heading="Brazil POF meal ideas",
            survey="Pesquisa de Orçamentos Familiares (POF) 2017–2018, consumo alimentar",
            years="2017–2018",
            located=(
                f"Microdata zip is in Downloads: `{POF_ZIP}` "
                "(contains `CONSUMO_ALIMENTAR.txt`, on the order of 641MB). "
                "**This script does not parse that file** (too slow/heavy for this pass). "
                "Dictionary fields for a later sitting-level pass: **V9015** hour, "
                "**V9017** eating occasion, **V9018** location, **V9001** food code. "
                "Plates follow published POF consumo alimentar highlights: rice and beans, "
                "pão de queijo, coffee with milk, French bread, feijoada, churrasco leftover, "
                "açaí, tapioca, guaraná."
            ),
            parsed="No. CONSUMO_ALIMENTAR.txt was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: pão francês with coffee versus "
                "pão na chapa versus a ham-and-cheese sandwich versus tapioca with the same "
                "cheese; leftover rice and beans as lunch versus dinner soup with bread; "
                "eggs with bread versus eggs on leftover rice."
            ),
        ),
        "occasions": {
            "breakfasts": POF_BREAKFASTS,
            "lunches": POF_LUNCHES,
            "dinners": POF_DINNERS,
            "drinks": POF_DRINKS,
            "snacks": POF_SNACKS,
            "desserts": POF_DESSERTS,
            "other": POF_OTHER,
        },
    },
    {
        "slug": "knhanes-analysis",
        "heading": "KNHANES meal ideas",
        "survey_short": "Korea KNHANES",
        "readme": dict(
            heading="KNHANES meal ideas",
            survey="Korea National Health and Nutrition Examination Survey (KNHANES)",
            years="Annual rolling survey; published nutrition tables from recent cycles (e.g. 2019–2022) were used as context",
            located=(
                "Microdata requires registration with KDCA. This pass did not register or "
                "parse files. Plates follow published Korean diet patterns plus typical home "
                "meals: rice with soup and banchan, kimchi stew, bibimbap, kimbap, ramyeon, "
                "tteokbokki, barley tea."
            ),
            parsed="No. Registered microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: leftover rice as gukbap, kimchi "
                "fried rice, bibimbap, or kimbap; eggs in stew, as a rolled omelette, or on "
                "ramyeon; leftover stew as breakfast soup versus a full rice-and-banchan dinner."
            ),
        ),
        "occasions": {
            "breakfasts": KNHANES_BREAKFASTS,
            "lunches": KNHANES_LUNCHES,
            "dinners": KNHANES_DINNERS,
            "drinks": KNHANES_DRINKS,
            "snacks": KNHANES_SNACKS,
            "desserts": KNHANES_DESSERTS,
            "other": KNHANES_OTHER,
        },
    },
    {
        "slug": "chns-analysis",
        "heading": "CHNS meal ideas",
        "survey_short": "China Health and Nutrition Survey",
        "readme": dict(
            heading="CHNS meal ideas",
            survey="China Health and Nutrition Survey (CHNS)",
            years="Household waves from 1989 through the 2015 (and later) nutrition waves",
            located=(
                "Microdata is available via UNC Carolina Population Center registration. "
                "This pass did not register or parse CHNS files. Plates follow published "
                "CHNS diet descriptions plus typical home Chinese meals: congee, youtiao "
                "with soy milk, baozi, rice with several dishes, dumplings, noodles, hot pot, tea."
            ),
            parsed="No. UNC-registered microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: leftover dough as baozi versus "
                "mantou versus noodles; leftover rice as congee, fried rice, or a bowl with "
                "leftover dishes; eggs in tomato-and-egg, on leftover rice, or in noodle soup."
            ),
        ),
        "occasions": {
            "breakfasts": CHNS_BREAKFASTS,
            "lunches": CHNS_LUNCHES,
            "dinners": CHNS_DINNERS,
            "drinks": CHNS_DRINKS,
            "snacks": CHNS_SNACKS,
            "desserts": CHNS_DESSERTS,
            "other": CHNS_OTHER,
        },
    },
    {
        "slug": "ensanut-analysis",
        "heading": "ENSANUT meal ideas",
        "survey_short": "Mexico ENSANUT",
        "readme": dict(
            heading="ENSANUT meal ideas",
            survey="Encuesta Nacional de Salud y Nutrición (ENSANUT), 24-hour recall",
            years="Recent cycles include 2018, 2020, 2021, and 2022 (ensarec2022_alim dietary recall)",
            located=(
                "Public microdata is advertised on ensanut.insp.mx. A JavaScript download "
                "flow did not yield a stable direct file URL in this pass, so files were not "
                "saved. The 24-hour recall dataset name is **ensarec2022_alim**. Plates follow "
                "published ENSANUT diet patterns: tortillas, beans, eggs, salsa, tacos, "
                "quesadillas, tamales, pan dulce, café con leche, aguas frescas, pozole, mole."
            ),
            parsed="No. ensarec2022_alim was not downloaded or parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: tortillas and eggs as huevos a la "
                "mexicana, chilaquiles, tacos, or quesadillas; leftover meat in tacos versus "
                "a rice-and-beans plate; pan dulce with café con leche versus atole with a leftover tamal."
            ),
        ),
        "occasions": {
            "breakfasts": ENSANUT_BREAKFASTS,
            "lunches": ENSANUT_LUNCHES,
            "dinners": ENSANUT_DINNERS,
            "drinks": ENSANUT_DRINKS,
            "snacks": ENSANUT_SNACKS,
            "desserts": ENSANUT_DESSERTS,
            "other": ENSANUT_OTHER,
        },
    },
    {
        "slug": "scai-analysis",
        "heading": "Italy SCAI meal ideas",
        "survey_short": "Italy INRAN-SCAI / IV SCAI",
        "readme": dict(
            heading="Italy SCAI meal ideas",
            survey="INRAN-SCAI 2005–06 and IV SCAI (CREA)",
            years="INRAN-SCAI 2005–06; IV SCAI volumes published later by CREA (2010s–2020s tables)",
            located=(
                "FAO GIFT holds microdata behind login. CREA published IV SCAI summary volumes. "
                "This pass did not log into FAO GIFT or parse individual recalls. Plates follow "
                "published Italian adult diet patterns: pasta, bread, pizza, espresso, "
                "ricotta or yogurt, risotto, frittata, gelato, tiramisu leftover, minestrone."
            ),
            parsed="No. FAO GIFT microdata was not parsed. Lists are qualitative.",
            filters=STANDARD_FILTERS,
            prep_variants=(
                "The same groceries can be different meals: leftover pasta as a lunch bowl, "
                "a frittata di pasta, or a side with salad; bread and eggs as frittata versus "
                "a panino versus leftover pizza; ricotta with honey at breakfast versus a "
                "sweet leftover tiramisu."
            ),
        ),
        "occasions": {
            "breakfasts": SCAI_BREAKFASTS,
            "lunches": SCAI_LUNCHES,
            "dinners": SCAI_DINNERS,
            "drinks": SCAI_DRINKS,
            "snacks": SCAI_SNACKS,
            "desserts": SCAI_DESSERTS,
            "other": SCAI_OTHER,
        },
    },
]


def write_survey(survey: dict, efsa_extra: str = "", efsa_note: str = "") -> None:
    slug = survey["slug"]
    out_dir = DESIGN / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    readme_kwargs = dict(survey["readme"])
    extra = ""
    if survey.get("efsa"):
        if efsa_extra:
            extra = efsa_extra
            readme_kwargs["parsed"] = (
                "Yes, for the Adult FoodEx L3 consumption table only "
                f"({efsa_note}). Plate lists were not derived from sittings."
            )
        else:
            extra = (
                "## EFSA table\n\n"
                f"Could not include the Adult FoodEx L3 table. {efsa_note or 'Parse failed.'}\n"
                "Curated continental European plates were still written.\n"
            )
            readme_kwargs["parsed"] = (
                "No sitting-level parse. FoodEx L3 table was not included "
                f"({efsa_note or 'parse failed'}). Plate lists are qualitative."
            )
    readme = render_readme(**readme_kwargs, extra=extra)
    (out_dir / "README.md").write_text(readme, encoding="utf-8")
    source = occasion_source(survey["survey_short"])
    for occ in OCCASIONS:
        bands = survey["occasions"][occ]
        n = count_groups(bands)
        if not 12 <= n <= 25:
            raise SystemExit(f"{slug} {occ} has {n} plate groups (need 12–25)")
        text = render_occasion(OCCASION_TITLES[occ], source, bands)
        (out_dir / f"{occ}.md").write_text(text, encoding="utf-8")
    counts = ", ".join(
        f"{o}={count_groups(survey['occasions'][o])}" for o in OCCASIONS
    )
    print(f"Wrote {out_dir} ({counts})")


def main() -> None:
    table, efsa_note = parse_efsa_table(EFSA_XLSX)
    print(f"EFSA: {'included (' + efsa_note + ')' if table else efsa_note}")
    for survey in SURVEYS:
        if survey.get("efsa"):
            write_survey(survey, efsa_extra=table or "", efsa_note=efsa_note)
        else:
            write_survey(survey)
    print(f"Done. {len(SURVEYS)} folders under {DESIGN}")


if __name__ == "__main__":
    main()
