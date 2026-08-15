import { deriveTags, type IngredientLookup } from "./deriveTags.ts";
import type { Cuisine, DietTag, MealType, Recipe } from "./types.ts";

export type RecipeFilters = {
  mealTypes?: readonly MealType[];
  cuisines?: readonly Cuisine[];
  tags?: readonly DietTag[];
  query?: string;
};

export function recipeMatchesFilters(
  recipe: Recipe,
  lookup: IngredientLookup,
  filters: RecipeFilters,
): boolean {
  if (filters.mealTypes && filters.mealTypes.length > 0) {
    if (!filters.mealTypes.includes(recipe.mealType)) {
      return false;
    }
  }

  if (filters.cuisines && filters.cuisines.length > 0) {
    if (!filters.cuisines.includes(recipe.cuisine)) {
      return false;
    }
  }

  if (filters.tags && filters.tags.length > 0) {
    const tags = deriveTags(recipe, lookup);
    if (!filters.tags.every((tag) => tags.includes(tag))) {
      return false;
    }
  }

  const query = filters.query?.trim().toLowerCase();
  if (query && !recipe.title.toLowerCase().includes(query)) {
    return false;
  }

  return true;
}

export function filterRecipes(
  recipes: readonly Recipe[],
  lookup: IngredientLookup,
  filters: RecipeFilters,
): Recipe[] {
  return recipes.filter((recipe) => recipeMatchesFilters(recipe, lookup, filters));
}

export type GroupedRecipes = {
  mealType: MealType;
  cuisines: { cuisine: Cuisine; recipes: Recipe[] }[];
}[];

export function groupRecipes(recipes: readonly Recipe[]): GroupedRecipes {
  const byMeal = new Map<MealType, Map<Cuisine, Recipe[]>>();

  for (const recipe of recipes) {
    let byCuisine = byMeal.get(recipe.mealType);
    if (!byCuisine) {
      byCuisine = new Map();
      byMeal.set(recipe.mealType, byCuisine);
    }
    const list = byCuisine.get(recipe.cuisine) ?? [];
    list.push(recipe);
    byCuisine.set(recipe.cuisine, list);
  }

  for (const byCuisine of byMeal.values()) {
    for (const list of byCuisine.values()) {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  const mealOrder: MealType[] = ["breakfast", "lunch", "dinner", "snack", "dessert"];
  const cuisineOrder: Cuisine[] = [
    "american",
    "mexican",
    "italian",
    "asian",
    "mediterranean",
    "indian",
    "other",
  ];

  return mealOrder.flatMap((mealType) => {
    const byCuisine = byMeal.get(mealType);
    if (!byCuisine) {
      return [];
    }
    const cuisines = cuisineOrder.flatMap((cuisine) => {
      const list = byCuisine.get(cuisine);
      return list ? [{ cuisine, recipes: list }] : [];
    });
    return cuisines.length > 0 ? [{ mealType, cuisines }] : [];
  });
}
