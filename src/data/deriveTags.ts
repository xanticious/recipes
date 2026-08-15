import { FLAG_TO_TAG, FODMAP_SUBGROUP_TAGS } from "./tags.ts";
import type { DietTag, Ingredient, IngredientFlag, IngredientLine, Recipe } from "./types.ts";

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

function lineCarriesFlag(
  line: IngredientLine,
  flag: IngredientFlag,
  lookup: IngredientLookup,
): boolean {
  if (line.optional) {
    return false;
  }

  const candidates = [line.ingredientId, ...(line.substitutions ?? [])];
  return candidates.every((id) => getIngredient(lookup, id).flags.includes(flag));
}

export function recipeTotalMinutes(recipe: Recipe): number {
  return recipe.totalMinutes ?? recipe.prepMinutes + recipe.cookMinutes;
}

export function deriveTags(recipe: Recipe, lookup: IngredientLookup): DietTag[] {
  const earned = new Set<DietTag>();

  for (const [flag, tag] of Object.entries(FLAG_TO_TAG) as [IngredientFlag, DietTag][]) {
    const blocked = recipe.ingredients.some((line) => lineCarriesFlag(line, flag, lookup));
    if (!blocked) {
      earned.add(tag);
    }
  }

  if (earned.has("low-fructan") && earned.has("low-gos")) {
    earned.add("low-oligosaccharide");
  }
  if (earned.has("low-sorbitol") && earned.has("low-mannitol")) {
    earned.add("low-polyol");
  }
  if (FODMAP_SUBGROUP_TAGS.every((tag) => earned.has(tag))) {
    earned.add("low-fodmap");
  }
  if (earned.has("low-fructose") && earned.has("low-oligosaccharide") && earned.has("low-polyol")) {
    earned.add("low-fop");
  }

  if (recipe.tagOverrides) {
    for (const [tag, force] of Object.entries(recipe.tagOverrides) as [DietTag, boolean][]) {
      if (force) {
        earned.add(tag);
      } else {
        earned.delete(tag);
      }
    }
  }

  return [...earned];
}
