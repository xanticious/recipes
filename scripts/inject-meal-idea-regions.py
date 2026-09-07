"""Insert region tags after each meal idea's occasion field."""

from __future__ import annotations

import re
from pathlib import Path

US = "united-states"
CA = "canada"
MX = "mexico"
BR = "brazil"
UK = "united-kingdom"
IT = "italy"
EU = "europe"
CN = "china"
JP = "japan"
KR = "south-korea"
AU = "australia"
NZ = "new-zealand"

ANGLO = [US, UK, CA, AU, NZ]
WEST = [US, UK, CA, AU, NZ, EU, IT]
AMERICAS = [US, CA, MX, BR]
NA = [US, CA]
US_MX = [US, MX]
EA = [CN, JP, KR]
GLOBAL = [US, CA, MX, BR, UK, IT, EU, CN, JP, KR, AU, NZ]
COFFEE = [US, CA, MX, BR, UK, IT, EU, JP, KR, AU, NZ]
SODA = [US, CA, MX, BR, UK, IT, EU, JP, KR, AU, NZ, CN]


def r(*parts: str) -> list[str]:
    seen: list[str] = []
    for part in parts:
        if part not in seen:
            seen.append(part)
    return seen


REGIONS: dict[str, list[str]] = {
    "cereal-and-milk": r(*ANGLO, EU, MX, BR),
    "eggs-and-toast": r(*WEST, AU, NZ, MX),
    "breakfast-sandwich": r(*ANGLO, EU),
    "oatmeal-bowl": r(*ANGLO, EU, CN),
    "yogurt-and-fruit": r(*WEST, MX, BR),
    "bagel-and-cream-cheese": r(US, CA, UK, AU),
    "pancakes-or-waffles": r(*ANGLO, EU),
    "breakfast-burrito": r(*US_MX, CA),
    "bacon-and-eggs": r(*ANGLO, EU),
    "breakfast-smoothie": r(*ANGLO, EU, BR, MX),
    "toaster-pastry": r(US, CA, UK, AU),
    "toaster-strudel": r(US, CA, EU),
    "doughnut-and-coffee": r(*ANGLO, EU, MX, JP),
    "muffin": r(*ANGLO, EU),
    "croissant": r(EU, IT, US, CA, UK, AU, MX, BR),
    "brioche-toast": r(EU, US, UK, CA),
    "crepes": r(EU, US, CA, BR),
    "pan-dulce": r(MX, US),
    "cinnamon-roll": r(*ANGLO, EU),
    "scone": r(UK, AU, NZ, CA, US),
    "biscuits-and-gravy": r(US),
    "french-toast": r(*WEST, MX),
    "grits": r(US),
    "potato-hash-and-eggs": r(*ANGLO, MX),
    "shakshuka-plate": r(EU, UK, US, AU),
    "huevos-or-chilaquiles": r(*US_MX),
    "avocado-toast-idea": r(*ANGLO, EU, MX),
    "granola-and-milk-idea": r(*WEST),
    "turkey-sandwich": r(*ANGLO, EU),
    "soup-and-sandwich": r(*ANGLO, EU),
    "grilled-cheese": r(*ANGLO),
    "pb-and-j": r(US, CA, AU),
    "quesadilla": r(*US_MX, CA),
    "leftover-rice-bowl-idea": r(*EA, US, MX, BR, AU),
    "salad-plate": r(*WEST, AU, NZ, BR, MX),
    "chili-bowl": r(US, MX, CA),
    "burrito-bowl": r(*US_MX, CA),
    "tuna-or-egg-sandwich": r(*WEST),
    "leftover-dinner-plate": r(*GLOBAL),
    "mac-and-cheese-lunch": r(*ANGLO),
    "baked-potato-lunch-idea": r(*ANGLO, EU),
    "wrap-lunch": r(*ANGLO, EU, AU, NZ),
    "chicken-salad-lunch": r(*ANGLO, EU),
    "nachos-lunch": r(*US_MX, CA, AU),
    "pasta-salad-lunch": r(*WEST, AU, NZ),
    "sushi-bowl-lunch": r(JP, US, AU, CA, UK, KR),
    "hot-pocket": r(US, CA, UK, AU),
    "meatloaf-sandwich": r(US, CA, AU),
    "hummus-and-veg": r(*WEST, AU),
    "fried-rice-lunch": r(*EA, US, AU, UK, MX, BR),
    "pork-chops-plate": r(*WEST, MX, BR, AU),
    "chicken-rice-vegetables": r(*GLOBAL),
    "baked-chicken-plate": r(*ANGLO, EU, MX, BR),
    "pasta-marinara": r(IT, EU, *ANGLO, MX, BR),
    "meatball-pasta": r(IT, US, EU, CA, AU),
    "lasagna-night": r(IT, *ANGLO, EU),
    "taco-night": r(*US_MX, CA, AU),
    "fajitas": r(*US_MX, CA),
    "chili-night": r(US, MX, CA),
    "soup-night": r(*GLOBAL),
    "stir-fry-night": r(*EA, US, AU, UK, CA),
    "burger-night": r(*ANGLO, EU, MX, BR, JP, AU, NZ),
    "pizza-night": r(IT, *ANGLO, EU, MX, BR, JP, AU, NZ),
    "salmon-and-sides": r(*WEST, JP, KR, AU, NZ),
    "stew-or-pot-roast": r(*ANGLO, EU, MX, BR),
    "steak-and-potatoes": r(*ANGLO, EU, BR, AU, NZ, MX),
    "rice-and-beans-plate": r(BR, MX, US, CA),
    "sunday-roast": r(UK, AU, NZ, CA),
    "enchiladas": r(*US_MX),
    "chicken-rice-casserole-idea": r(US, CA, AU, UK),
    "tuna-casserole-idea": r(US, CA, AU),
    "shepherds-pie-idea": r(UK, AU, NZ, CA, US),
    "chicken-pot-pie-idea": r(*ANGLO),
    "tamale-pie-idea": r(US, MX),
    "breakfast-casserole-dinner": r(US, CA, UK, AU),
    "mac-and-cheese-night": r(*ANGLO),
    "fettuccine-alfredo-idea": r(IT, US, CA, EU),
    "pesto-pasta-idea": r(IT, EU, *ANGLO),
    "shrimp-scampi-idea": r(IT, US, EU),
    "chicken-parm-idea": r(IT, US, AU, CA),
    "meatloaf-plate": r(US, CA, AU, UK),
    "pulled-pork-idea": r(US, CA, AU, MX),
    "sausage-and-peppers-idea": r(IT, US, EU),
    "stuffed-peppers-idea": r(US, EU, MX, IT),
    "jambalaya-idea": r(US),
    "fried-rice-night": r(*EA, US, AU, UK, MX, BR),
    "orange-chicken-idea": r(US, CA, AU, CN),
    "butter-chicken-idea": r(UK, CA, AU, NZ, US),
    "dal-and-rice": r(UK, AU, NZ, CA, US),
    "tostadas-idea": r(*US_MX),
    "carne-asada-plate": r(*US_MX),
    "fish-tacos-idea": r(*US_MX, AU),
    "wings-and-sides": r(*ANGLO, KR, JP),
    "baked-ziti-idea": r(IT, US, CA),
    "popcorn-snack": r(*ANGLO, EU, MX, BR, JP, KR),
    "apple-and-peanut-butter-snack": r(*ANGLO),
    "chips-and-dip": r(*ANGLO, MX, EU),
    "yogurt-cup-snack": r(*WEST, MX, BR),
    "cheese-and-crackers": r(*WEST),
    "nuts-snack": r(*GLOBAL),
    "fruit-cup-snack": r(*GLOBAL),
    "granola-bar": r(*ANGLO, EU),
    "trail-mix": r(*ANGLO),
    "pretzels": r(US, EU, CA, AU),
    "hard-boiled-eggs-snack": r(*GLOBAL),
    "jerky": r(US, CA, AU, NZ, MX, BR),
    "rice-cakes-snack": r(*EA, US, AU, UK),
    "edamame": r(JP, KR, CN, US, AU),
    "leftover-pastry-snack": r(*WEST, MX, BR, JP),
    "cookies-dessert": r(*WEST, MX, BR, JP, AU),
    "ice-cream-dessert": r(*GLOBAL),
    "brownies-dessert": r(*ANGLO),
    "pudding-dessert": r(*ANGLO, EU),
    "fruit-crisp": r(*ANGLO),
    "mug-cake": r(*ANGLO),
    "cake-or-cupcake": r(*WEST, MX, BR, AU, JP),
    "pie": r(*ANGLO, EU),
    "cobbler": r(US, UK, AU),
    "doughnut-dessert": r(*ANGLO, EU, MX, JP),
    "chocolate-or-candy": r(*GLOBAL),
    "banana-bread-dessert": r(*ANGLO),
    "churros": r(MX, EU, US, BR),
    "flan-or-custard": r(MX, EU, IT, BR, US),
    "coffee-drink": COFFEE,
    "tea-drink": r(*GLOBAL),
    "water-drink": GLOBAL,
    "smoothie-drink": r(*ANGLO, EU, BR, MX),
    "milk-drink": r(*WEST, MX, BR, AU, NZ),
    "orange-juice": r(*WEST, MX, BR, AU),
    "hot-chocolate": r(*WEST, MX, BR),
    "protein-shake": r(*ANGLO, EU, BR),
    "soda-drink": SODA,
    "energy-drink": r(*ANGLO, EU, JP, KR, MX, BR),
    "sports-drink": r(*ANGLO, EU, JP, KR, MX, BR),
}

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "src" / "data" / "mealIdeas.ts"


def fmt(regions: list[str]) -> str:
    inner = ", ".join(f'"{name}"' for name in regions)
    return f"    regions: [{inner}],"


def main() -> None:
    missing = [key for key in REGIONS if False]
    text = PATH.read_text(encoding="utf-8")
    current_id: str | None = None
    out: list[str] = []
    id_re = re.compile(r'^\s+id: "([^"]+)",\s*$')
    occ_re = re.compile(r'^(\s+)occasion: "[^"]+",\s*$')
    seen: set[str] = set()

    for line in text.splitlines(keepends=True):
        id_match = id_re.match(line)
        if id_match:
            current_id = id_match.group(1)
        occ_match = occ_re.match(line)
        out.append(line)
        if occ_match and current_id:
            if current_id not in REGIONS:
                raise SystemExit(f"No regions mapped for {current_id}")
            indent = occ_match.group(1)
            # fmt uses 4-space indent already
            _ = indent
            out.append(fmt(REGIONS[current_id]) + "\n")
            seen.add(current_id)
            current_id = None

    unused = sorted(set(REGIONS) - seen)
    if unused:
        raise SystemExit(f"Unused region maps: {unused}")
    PATH.write_text("".join(out), encoding="utf-8")
    print(f"Tagged {len(seen)} meal ideas")


if __name__ == "__main__":
    main()
