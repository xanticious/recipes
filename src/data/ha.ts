import type { HaFilter, HaStatus, Ingredient } from "./types.ts";

export function ingredientHaStatus(ingredient: Ingredient): HaStatus {
  return ingredient.ha ?? "pending";
}

export function ingredientIsHa(ingredient: Ingredient): boolean {
  return ingredientHaStatus(ingredient) === "yes";
}

export function matchesHaFilter(status: HaStatus, filter: HaFilter | undefined): boolean {
  if (!filter || filter === "all") {
    return true;
  }
  return status === filter;
}
