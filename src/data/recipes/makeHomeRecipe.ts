import { assumedRecipeHa } from "../ha.ts";
import { ingredientLookup } from "../ingredients.ts";
import type { Cuisine, HealthRating, HomeRecipe, IngredientLine, MealType } from "../types.ts";

export function line(
  ingredientId: string,
  amount: number | null,
  unit: string | null,
  extra?: Pick<IngredientLine, "preparation" | "optional">,
): IngredientLine {
  return { ingredientId, amount, unit, ...extra };
}

export function home(spec: {
  id: string;
  title: string;
  mealType: MealType;
  cuisine?: Cuisine;
  healthRating?: HealthRating;
  specialOccasion?: boolean;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: IngredientLine[];
  steps: string[];
  notes?: string;
  relatedRecipeIds?: readonly string[];
  ha?: HomeRecipe["ha"];
}): HomeRecipe {
  return {
    id: spec.id,
    title: spec.title,
    mealType: spec.mealType,
    cuisine: spec.cuisine ?? "american",
    specialOccasion: spec.specialOccasion ?? false,
    ha:
      spec.ha ??
      assumedRecipeHa(
        spec.ingredients.map((item) => item.ingredientId),
        ingredientLookup,
      ),
    healthRating: spec.healthRating ?? "moderate",
    eatOut: false,
    prepMinutes: spec.prepMinutes,
    cookMinutes: spec.cookMinutes,
    servings: spec.servings,
    ingredients: spec.ingredients,
    steps: spec.steps,
    ...(spec.relatedRecipeIds ? { relatedRecipeIds: spec.relatedRecipeIds } : {}),
    ...(spec.notes ? { notes: spec.notes } : {}),
  };
}
