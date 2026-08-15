import type { Cuisine, DietTag, IngredientFlag, MealType } from "./types.ts";

export const MEAL_TYPES: readonly MealType[] = ["breakfast", "lunch", "dinner", "snack", "dessert"];

export const CUISINES: readonly Cuisine[] = [
  "american",
  "mexican",
  "italian",
  "asian",
  "mediterranean",
  "indian",
  "other",
];

export const DIET_TAGS: readonly DietTag[] = [
  "gluten-free",
  "lactose-free",
  "low-fructose",
  "low-fructan",
  "low-gos",
  "low-sorbitol",
  "low-mannitol",
  "low-oligosaccharide",
  "low-polyol",
  "low-fodmap",
  "low-fop",
];

export const FODMAP_SUBGROUP_TAGS = [
  "lactose-free",
  "low-fructose",
  "low-fructan",
  "low-gos",
  "low-sorbitol",
  "low-mannitol",
] as const satisfies readonly DietTag[];

export const FLAG_TO_TAG = {
  gluten: "gluten-free",
  lactose: "lactose-free",
  fructose: "low-fructose",
  fructan: "low-fructan",
  gos: "low-gos",
  sorbitol: "low-sorbitol",
  mannitol: "low-mannitol",
} as const satisfies Record<IngredientFlag, DietTag>;

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

export const CUISINE_LABELS: Record<Cuisine, string> = {
  american: "American",
  mexican: "Mexican",
  italian: "Italian",
  asian: "Asian",
  mediterranean: "Mediterranean",
  indian: "Indian",
  other: "Other",
};

export const DIET_TAG_LABELS: Record<DietTag, string> = {
  "gluten-free": "Gluten-free",
  "lactose-free": "Lactose-free",
  "low-fructose": "Low fructose",
  "low-fructan": "Low fructan",
  "low-gos": "Low GOS",
  "low-sorbitol": "Low sorbitol",
  "low-mannitol": "Low mannitol",
  "low-oligosaccharide": "Low oligosaccharide",
  "low-polyol": "Low polyol",
  "low-fodmap": "Low FODMAP",
  "low-fop": "Low FOP",
};

export type TagLegendEntry = {
  tag: DietTag;
  group: "always" | "fodmap" | "rollup";
  meaning: string;
  examples?: string;
};

export const TAG_LEGEND: readonly TagLegendEntry[] = [
  {
    tag: "gluten-free",
    group: "always",
    meaning: "No gluten-containing ingredients as written. Gluten-free flours are allowed.",
    examples: "Household exception: sourdough bread is treated as acceptable.",
  },
  {
    tag: "lactose-free",
    group: "fodmap",
    meaning:
      "Disaccharides — lactose. The recipe as written (or with a listed swap) does not use lactose.",
    examples: "Milk, soft cheeses, ice cream.",
  },
  {
    tag: "low-fructose",
    group: "fodmap",
    meaning: "Monosaccharides — excess fructose.",
    examples: "Apples, pears, honey, brown sugar, molasses.",
  },
  {
    tag: "low-fructan",
    group: "fodmap",
    meaning: "Oligosaccharides — fructans.",
    examples: "Garlic, onion, inulin, many wheat products (sourdough excepted).",
  },
  {
    tag: "low-gos",
    group: "fodmap",
    meaning: "Oligosaccharides — GOS.",
    examples: "Beans and some legumes.",
  },
  {
    tag: "low-sorbitol",
    group: "fodmap",
    meaning: "Polyols — sorbitol.",
    examples: "Apples, pears, avocado, many stone fruits.",
  },
  {
    tag: "low-mannitol",
    group: "fodmap",
    meaning: "Polyols — mannitol.",
    examples: "Cauliflower, mushrooms, celery.",
  },
  {
    tag: "low-oligosaccharide",
    group: "rollup",
    meaning: "Has both low-fructan and low-GOS.",
  },
  {
    tag: "low-polyol",
    group: "rollup",
    meaning: "Has both low-sorbitol and low-mannitol.",
  },
  {
    tag: "low-fodmap",
    group: "rollup",
    meaning: "Clears every FODMAP subgroup, including lactose.",
  },
  {
    tag: "low-fop",
    group: "rollup",
    meaning:
      "Clears fructose, oligosaccharides, and polyols — the cluster that matters most in this household. Lactose is not required.",
  },
];
