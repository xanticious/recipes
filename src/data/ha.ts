import { assumedIngredientHa } from "./ingredientDiet.ts";
import type { IngredientLookup } from "./lookup.ts";
import type {
  AssumedHaStatus,
  HaFilter,
  HaStatus,
  Ingredient,
  IngredientHaFilter,
  IngredientHaStatus,
  Recipe,
} from "./types.ts";

export const HA_STATUSES: readonly HaStatus[] = [
  "ha-confirmed",
  "ha-assumed",
  "unknown",
  "not-ha-assumed",
  "not-ha-confirmed",
];

export const ASSUMED_HA_STATUSES: readonly AssumedHaStatus[] = [
  "ha-assumed",
  "unknown",
  "not-ha-assumed",
];

const HA_RANK: Record<HaStatus, number> = {
  "not-ha-confirmed": 0,
  "not-ha-assumed": 1,
  unknown: 2,
  "ha-assumed": 3,
  "ha-confirmed": 4,
};

export function isHaStatus(value: string): value is HaStatus {
  return HA_STATUSES.some((status) => status === value);
}

export function isConfirmedHa(status: HaStatus): boolean {
  return status === "ha-confirmed" || status === "not-ha-confirmed";
}

export function ingredientHaStatus(ingredient: Ingredient): IngredientHaStatus {
  if (ingredient.ha === "ha-confirmed") {
    return "ha-confirmed";
  }
  if (ingredient.ha === "not-ha-confirmed") {
    return "not-ha-confirmed";
  }
  return assumedIngredientHa(ingredient);
}

export function ingredientIsHa(ingredient: Ingredient): boolean {
  const status = ingredientHaStatus(ingredient);
  return status === "ha-confirmed" || status === "ha-assumed";
}

export function assumedHaFromStatuses(statuses: readonly HaStatus[]): AssumedHaStatus {
  if (statuses.length === 0) {
    return "unknown";
  }

  let worst = statuses[0];
  for (const status of statuses) {
    if (HA_RANK[status] < HA_RANK[worst]) {
      worst = status;
    }
  }

  if (worst === "not-ha-confirmed" || worst === "not-ha-assumed") {
    return "not-ha-assumed";
  }
  if (worst === "unknown") {
    return "unknown";
  }
  return "ha-assumed";
}

export function assumedRecipeHaFromIngredients(
  ingredients: readonly Ingredient[],
): AssumedHaStatus {
  return assumedHaFromStatuses(ingredients.map(ingredientHaStatus));
}

export type RecipeHaIngredient = {
  id: string;
  name: string;
  status: HaStatus;
  missing: boolean;
};

export type RecipeHaBreakdown = {
  status: AssumedHaStatus;
  ingredients: RecipeHaIngredient[];
};

export function recipeHaBreakdown(
  ingredientIds: readonly string[],
  lookup: IngredientLookup,
): RecipeHaBreakdown {
  const ingredients = ingredientIds.map((id) => {
    const ingredient = lookup.get(id);
    if (!ingredient) {
      return { id, name: id, status: "unknown" as const, missing: true };
    }
    return {
      id,
      name: ingredient.name,
      status: ingredientHaStatus(ingredient),
      missing: false,
    };
  });
  return {
    status: assumedHaFromStatuses(ingredients.map((item) => item.status)),
    ingredients,
  };
}

export function assumedRecipeHa(
  ingredientIds: readonly string[],
  lookup: IngredientLookup,
): AssumedHaStatus {
  return recipeHaBreakdown(ingredientIds, lookup).status;
}

export function classifyRecipeHa(recipe: Recipe, lookup: IngredientLookup): AssumedHaStatus {
  if (recipe.eatOut) {
    return "unknown";
  }
  return assumedRecipeHa(
    recipe.ingredients.map((line) => line.ingredientId),
    lookup,
  );
}

export function matchesHaFilter(status: HaStatus, filter: HaFilter | undefined): boolean {
  if (!filter || filter === "all") {
    return true;
  }
  return status === filter;
}

export function matchesIngredientHaFilter(
  status: IngredientHaStatus,
  filter: IngredientHaFilter | undefined,
): boolean {
  return matchesHaFilter(status, filter);
}
