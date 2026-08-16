import type { EatOutRecipe, HomeRecipe, Recipe } from "./types.ts";

export function isHomeRecipe(recipe: Recipe): recipe is HomeRecipe {
  return recipe.eatOut === false;
}

export function isEatOutRecipe(recipe: Recipe): recipe is EatOutRecipe {
  return recipe.eatOut === true;
}

export function recipeTotalMinutes(recipe: HomeRecipe): number {
  return recipe.totalMinutes ?? recipe.prepMinutes + recipe.cookMinutes;
}

export function relatedRecipes(recipe: Recipe, catalog: readonly Recipe[]): Recipe[] {
  const ids = recipe.relatedRecipeIds ?? [];
  return ids.flatMap((id) => {
    const match = catalog.find((item) => item.id === id);
    return match ? [match] : [];
  });
}
