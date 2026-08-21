import { produce } from "./catalog/produce.ts";
import { protein } from "./catalog/protein.ts";
import { ingredientHaStatus, matchesIngredientHaFilter } from "./ha.ts";
import { isHomeRecipe } from "./recipe.ts";
import type { Ingredient, IngredientHaFilter, Recipe } from "./types.ts";

export type IngredientSection =
  | "meat"
  | "seafood"
  | "eggs"
  | "dairy"
  | "vegetables"
  | "fruit"
  | "herbs"
  | "grains"
  | "beans"
  | "fats"
  | "sweeteners"
  | "spices"
  | "pantry";

export const INGREDIENT_SECTIONS: readonly IngredientSection[] = [
  "meat",
  "seafood",
  "eggs",
  "dairy",
  "vegetables",
  "fruit",
  "herbs",
  "grains",
  "beans",
  "fats",
  "sweeteners",
  "spices",
  "pantry",
];

export const INGREDIENT_SECTION_LABELS: Record<IngredientSection, string> = {
  meat: "Meat",
  seafood: "Seafood",
  eggs: "Eggs",
  dairy: "Dairy",
  vegetables: "Vegetables",
  fruit: "Fruit",
  herbs: "Herbs",
  grains: "Grains",
  beans: "Beans and plant proteins",
  fats: "Fats and oils",
  sweeteners: "Sweeteners",
  spices: "Spices",
  pantry: "Pantry",
};

function idsFrom(
  list: readonly Ingredient[],
  startId: string,
  endIdExclusive?: string,
): Set<string> {
  const start = list.findIndex((item) => item.id === startId);
  if (start < 0) {
    throw new Error(`Unknown catalog start id: ${startId}`);
  }
  const end =
    endIdExclusive === undefined
      ? list.length
      : list.findIndex((item) => item.id === endIdExclusive);
  if (endIdExclusive !== undefined && end < 0) {
    throw new Error(`Unknown catalog end id: ${endIdExclusive}`);
  }
  return new Set(list.slice(start, end).map((item) => item.id));
}

const HERB_IDS = idsFrom(produce, "cilantro", "lemon");
const FRUIT_IDS = new Set([...idsFrom(produce, "lemon", "rhubarb"), ...idsFrom(produce, "raisin")]);
const EGG_IDS = idsFrom(protein, "egg", "salmon");
const SEAFOOD_IDS = idsFrom(protein, "salmon", "tofu");
const PLANT_PROTEIN_IDS = idsFrom(protein, "tofu");

export function ingredientSection(ingredient: Ingredient): IngredientSection {
  switch (ingredient.kind) {
    case "dairy":
      return "dairy";
    case "grain":
      return "grains";
    case "fat":
      return "fats";
    case "sweetener":
      return "sweeteners";
    case "spice":
      return "spices";
    case "other":
      return "pantry";
    case "produce":
      if (HERB_IDS.has(ingredient.id)) {
        return "herbs";
      }
      if (FRUIT_IDS.has(ingredient.id)) {
        return "fruit";
      }
      return "vegetables";
    case "protein":
      if (EGG_IDS.has(ingredient.id)) {
        return "eggs";
      }
      if (SEAFOOD_IDS.has(ingredient.id)) {
        return "seafood";
      }
      if (PLANT_PROTEIN_IDS.has(ingredient.id)) {
        return "beans";
      }
      return "meat";
  }
}

export type IngredientFilters = {
  ha?: IngredientHaFilter;
  query?: string;
  section?: IngredientSection | null;
};

export function isIngredientSection(value: string): value is IngredientSection {
  return INGREDIENT_SECTIONS.some((section) => section === value);
}

export function ingredientMatchesFilters(
  ingredient: Ingredient,
  filters: IngredientFilters,
): boolean {
  if (filters.section && ingredientSection(ingredient) !== filters.section) {
    return false;
  }
  if (!matchesIngredientHaFilter(ingredientHaStatus(ingredient), filters.ha)) {
    return false;
  }
  const query = filters.query?.trim().toLowerCase();
  if (query && !ingredient.name.toLowerCase().includes(query)) {
    return false;
  }
  return true;
}

export function filterIngredients(
  catalog: readonly Ingredient[],
  filters: IngredientFilters,
): Ingredient[] {
  return catalog.filter((ingredient) => ingredientMatchesFilters(ingredient, filters));
}

export type GroupedIngredients = {
  section: IngredientSection;
  ingredients: Ingredient[];
}[];

export function groupIngredients(
  catalog: readonly Ingredient[],
  sectionOrder: readonly IngredientSection[] = INGREDIENT_SECTIONS,
): GroupedIngredients {
  const bySection = new Map<IngredientSection, Ingredient[]>();
  for (const ingredient of catalog) {
    const section = ingredientSection(ingredient);
    const list = bySection.get(section) ?? [];
    list.push(ingredient);
    bySection.set(section, list);
  }
  for (const list of bySection.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sectionOrder.flatMap((section) => {
    const ingredients = bySection.get(section);
    return ingredients && ingredients.length > 0 ? [{ section, ingredients }] : [];
  });
}

export function ingredientsInBrowseOrder(catalog: readonly Ingredient[]): Ingredient[] {
  return groupIngredients(catalog).flatMap((group) => group.ingredients);
}

export function recipesByIngredientId(catalog: readonly Recipe[]): ReadonlyMap<string, Recipe[]> {
  const map = new Map<string, Recipe[]>();
  for (const recipe of catalog) {
    if (!isHomeRecipe(recipe)) {
      continue;
    }
    const seen = new Set<string>();
    for (const line of recipe.ingredients) {
      if (seen.has(line.ingredientId)) {
        continue;
      }
      seen.add(line.ingredientId);
      const list = map.get(line.ingredientId) ?? [];
      list.push(recipe);
      map.set(line.ingredientId, list);
    }
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return map;
}

export function recipesUsingIngredient(
  ingredientId: string,
  index: ReadonlyMap<string, Recipe[]>,
): Recipe[] {
  return index.get(ingredientId) ?? [];
}
