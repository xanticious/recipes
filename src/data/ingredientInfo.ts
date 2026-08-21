import { ingredientSection, type IngredientSection } from "./ingredientBrowse.ts";
import {
  describeIngredientDiet,
  formatHighestFodmap,
  type IngredientDiet,
} from "./ingredientDiet.ts";
import { getIngredientFodmap, type FodmapReason, type FodmapStatus } from "./ingredientFodmap.ts";
import { CUISINE_LABELS, MEAL_TYPE_LABELS } from "./tags.ts";
import type { Cuisine, GlutenLevel, Ingredient, LactoseLevel, MealType, Recipe } from "./types.ts";

export type IngredientAvailability = "common" | "specialty" | "exotic";

export type IngredientFodmapInfo = {
  status: FodmapStatus;
  reasons: readonly FodmapReason[];
  label: string;
};

export type IngredientInfo = {
  what: string;
  commonness: string;
  uses: string;
  notes?: string;
  lactose: LactoseLevel;
  gluten: GlutenLevel;
  fodmap: IngredientFodmapInfo;
  diet: IngredientDiet;
};

const WHAT_KIND: Record<IngredientSection, string> = {
  meat: "a meat",
  seafood: "a seafood ingredient",
  eggs: "an egg ingredient",
  dairy: "a dairy ingredient",
  vegetables: "a vegetable",
  fruit: "a fruit",
  herbs: "a fresh herb",
  grains: "a grain, bread, or starch",
  beans: "a bean or plant protein",
  fats: "a fat or oil",
  sweeteners: "a sweetener",
  spices: "a spice or seasoning",
  pantry: "a pantry ingredient",
};

const COMMON_SPICE_IDS = new Set([
  "salt",
  "kosher-salt",
  "sea-salt",
  "flaky-salt",
  "black-pepper",
  "white-pepper",
  "cumin",
  "cumin-seed",
  "coriander",
  "paprika",
  "smoked-paprika",
  "hot-paprika",
  "chili-powder",
  "cayenne",
  "red-pepper-flakes",
  "chipotle-powder",
  "oregano",
  "thyme",
  "rosemary",
  "basil-dried",
  "parsley-dried",
  "dill-dried",
  "sage",
  "bay-leaf",
  "cinnamon",
  "cinnamon-stick",
  "nutmeg",
  "cloves",
  "allspice",
  "ginger-powder",
  "turmeric",
  "curry-powder",
  "italian-seasoning",
  "taco-seasoning",
  "fajita-seasoning",
  "cajun-seasoning",
  "creole-seasoning",
  "old-bay",
  "poultry-seasoning",
  "pumpkin-spice",
  "ranch-seasoning",
  "garlic-powder",
  "onion-powder",
  "onion-flakes",
  "vanilla-extract",
  "almond-extract",
  "peppermint-extract",
  "sesame-seeds",
  "poppy-seeds",
  "celery-salt",
  "garlic-salt",
  "onion-salt",
  "mustard-seed",
  "mustard-powder",
  "fennel-seed",
  "caraway",
  "celery-seed",
  "dill-seed",
  "cardamom",
  "everything-bagel-seasoning",
  "msg",
  "cream-of-tartar",
  "food-coloring",
]);

const EXOTIC_IDS = new Set([
  "ramp",
  "galangal",
  "lotus-root",
  "burdock",
  "malanga",
  "taro",
  "bitter-melon",
  "winter-melon",
  "bottle-gourd",
  "ridge-gourd",
  "luffa",
  "callaloo",
  "moringa-leaves",
  "chrysanthemum-greens",
  "amaranth-greens",
  "water-spinach",
  "yu-choy",
  "gai-lan",
  "fenugreek-leaves",
  "jerusalem-artichoke",
  "wood-ear",
  "maitake",
  "longan",
  "rambutan",
  "durian",
  "soursop",
  "breadfruit",
  "ackee",
  "yuzu",
  "calamansi",
  "chervil",
  "borage",
  "epazote",
  "culantro",
  "vietnamese-coriander",
  "shiso",
  "curry-leaf",
  "kaffir-lime-leaf",
  "holy-basil",
  "doubanjiang",
  "shrimp-paste",
  "recaito",
]);

const SPECIALTY_IDS = new Set([
  "dashi",
  "fish-sauce",
  "oyster-sauce",
  "hoisin",
  "mirin",
  "sake",
  "shaoxing-wine",
  "ponzu",
  "kecap-manis",
  "sambal-oelek",
  "gochujang",
  "doenjang",
  "miso",
  "black-bean-sauce",
  "fermented-black-beans",
  "nori",
  "wakame",
  "kombu",
  "bonito-flakes",
  "kimchi",
  "red-curry-paste",
  "green-curry-paste",
  "yellow-curry-paste",
  "tamarind-paste",
  "tamarind-concentrate",
  "harissa",
  "mole",
  "chipotle-in-adobo",
  "sofrito",
  "masa-harina",
  "teff",
  "sorghum",
  "amaranth",
  "fonio",
  "lemongrass",
  "thai-basil",
  "daikon",
  "jicama",
  "yuca",
  "cassava",
  "kabocha",
  "chayote",
  "nopales",
  "tomatillo",
  "shiitake",
  "enoki",
  "king-oyster-mushroom",
  "plantain",
  "green-plantain",
  "jackfruit",
  "goji-berry",
  "acai",
  "preserved-lemon",
  "pomelo",
]);

export function capitalizeIngredientName(name: string): string {
  if (name.length === 0) {
    return name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function joinEnglish(items: readonly string[]): string {
  if (items.length === 0) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function ingredientAvailability(ingredient: Ingredient): IngredientAvailability {
  if (EXOTIC_IDS.has(ingredient.id)) {
    return "exotic";
  }
  if (SPECIALTY_IDS.has(ingredient.id)) {
    return "specialty";
  }
  if (ingredient.kind === "spice" && !COMMON_SPICE_IDS.has(ingredient.id)) {
    return "specialty";
  }
  return "common";
}

function whatSentence(ingredient: Ingredient): string {
  const name = capitalizeIngredientName(ingredient.name);
  const fodmap = getIngredientFodmap(ingredient.id);
  if (fodmap) {
    return `${name} is ${fodmap.description}`;
  }
  const kind = WHAT_KIND[ingredientSection(ingredient)];
  return `${name} is ${kind}.`;
}

function fodmapInfo(ingredient: Ingredient): IngredientFodmapInfo {
  const entry = getIngredientFodmap(ingredient.id);
  const diet = describeIngredientDiet(ingredient);
  const label = formatHighestFodmap(diet.fodmap);
  if (!entry) {
    return { status: "low", reasons: [], label };
  }
  return {
    status: entry.status,
    reasons: entry.reasons,
    label,
  };
}

function commonnessSentence(ingredient: Ingredient, usedIn: readonly Recipe[]): string {
  const availability = ingredientAvailability(ingredient);
  const count = usedIn.length;
  const inBook =
    count === 0
      ? "it is not used in this book yet"
      : count === 1
        ? "it appears in 1 recipe in this book"
        : count < 5
          ? `it appears in ${String(count)} recipes in this book`
          : count < 12
            ? `it is fairly common in this book (${String(count)} recipes)`
            : `it is a staple in this book (${String(count)} recipes)`;

  if (availability === "exotic") {
    return `Exotic or hard to find at a typical supermarket; ${inBook}.`;
  }
  if (availability === "specialty") {
    return `Specialty item — look in the ethnic aisle or a specialty store; ${inBook}.`;
  }
  return `Common grocery-store ingredient; ${inBook}.`;
}

function usesSentence(usedIn: readonly Recipe[]): string {
  if (usedIn.length === 0) {
    return "No recipes in this book use it yet, so judge it by how you cook with it at home.";
  }

  const cuisineCounts = new Map<Cuisine, number>();
  const mealCounts = new Map<MealType, number>();
  for (const recipe of usedIn) {
    cuisineCounts.set(recipe.cuisine, (cuisineCounts.get(recipe.cuisine) ?? 0) + 1);
    mealCounts.set(recipe.mealType, (mealCounts.get(recipe.mealType) ?? 0) + 1);
  }

  const cuisines = [...cuisineCounts.entries()]
    .toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([cuisine]) => CUISINE_LABELS[cuisine]);
  const meals = [...mealCounts.entries()]
    .toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([meal]) => MEAL_TYPE_LABELS[meal].toLowerCase());
  const examples = usedIn.slice(0, 3).map((recipe) => recipe.title);

  const cuisineText =
    cuisines.length === 1 ? `${cuisines[0]} cooking` : `${joinEnglish(cuisines)} cooking`;
  const mealText = joinEnglish(meals);
  const exampleText = joinEnglish(examples);

  return `Used in ${cuisineText}, especially for ${mealText} — for example ${exampleText}.`;
}

export function describeIngredient(
  ingredient: Ingredient,
  usedIn: readonly Recipe[],
): IngredientInfo {
  const notes = ingredient.notes?.trim();
  const diet = describeIngredientDiet(ingredient);
  return {
    what: whatSentence(ingredient),
    commonness: commonnessSentence(ingredient, usedIn),
    uses: usesSentence(usedIn),
    lactose: diet.lactose,
    gluten: diet.gluten,
    fodmap: fodmapInfo(ingredient),
    diet,
    ...(notes ? { notes } : {}),
  };
}
