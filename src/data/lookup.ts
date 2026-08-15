import type { Ingredient } from "./types.ts";

export type IngredientLookup = ReadonlyMap<string, Ingredient>;

export function indexIngredients(list: readonly Ingredient[]): IngredientLookup {
  return new Map(list.map((item) => [item.id, item]));
}

export function getIngredient(lookup: IngredientLookup, id: string): Ingredient {
  const found = lookup.get(id);
  if (!found) {
    throw new Error(`Unknown ingredient: ${id}`);
  }
  return found;
}
