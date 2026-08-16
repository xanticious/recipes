import { isEatOutRecipe } from "./recipe.ts";
import { matchesHaFilter } from "./ha.ts";
import type { Cuisine, HaFilter, MealType, Recipe, TernaryFilter } from "./types.ts";

export type RecipeFilters = {
  mealTypes?: readonly MealType[];
  cuisines?: readonly Cuisine[];
  eatOut?: TernaryFilter;
  ha?: HaFilter;
  query?: string;
};

export function matchesTernary(value: boolean, filter: TernaryFilter | undefined): boolean {
  if (!filter || filter === "all") {
    return true;
  }
  return filter === "yes" ? value : !value;
}

export function recipeMatchesFilters(recipe: Recipe, filters: RecipeFilters): boolean {
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

  if (!matchesTernary(isEatOutRecipe(recipe), filters.eatOut)) {
    return false;
  }

  if (!matchesHaFilter(recipe.ha, filters.ha)) {
    return false;
  }

  const query = filters.query?.trim().toLowerCase();
  if (query && !recipe.title.toLowerCase().includes(query)) {
    return false;
  }

  return true;
}

export function filterRecipes(recipes: readonly Recipe[], filters: RecipeFilters): Recipe[] {
  return recipes.filter((recipe) => recipeMatchesFilters(recipe, filters));
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
