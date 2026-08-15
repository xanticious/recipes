import { getIngredient, indexIngredients, type IngredientLookup } from "./lookup.ts";
import { resolveRecipeLines, substitutionCandidateIds } from "./substitutions.ts";
import { FLAG_TO_TAG, FODMAP_SUBGROUP_TAGS } from "./tags.ts";
import type { DietTag, IngredientFlag, IngredientLine, Recipe, RecipeSelections } from "./types.ts";

export type { IngredientLookup } from "./lookup.ts";
export { getIngredient, indexIngredients };

export type TagDerivationMode = "as-written" | "with-alterations";

function lineCarriesFlag(
  line: IngredientLine,
  flag: IngredientFlag,
  lookup: IngredientLookup,
  mode: TagDerivationMode,
): boolean {
  if (line.optional) {
    return false;
  }

  if (mode === "as-written") {
    return getIngredient(lookup, line.ingredientId).flags.includes(flag);
  }

  const candidates = substitutionCandidateIds(line);
  if (candidates.some((id) => id === null)) {
    return false;
  }

  const ids = candidates.filter((id): id is string => id !== null);
  return ids.every((id) => getIngredient(lookup, id).flags.includes(flag));
}

function tagsFromLines(
  lines: readonly IngredientLine[],
  lookup: IngredientLookup,
  mode: TagDerivationMode,
  tagOverrides?: Recipe["tagOverrides"],
): DietTag[] {
  const earned = new Set<DietTag>();

  for (const [flag, tag] of Object.entries(FLAG_TO_TAG) as [IngredientFlag, DietTag][]) {
    const blocked = lines.some((line) => lineCarriesFlag(line, flag, lookup, mode));
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

  if (tagOverrides) {
    for (const [tag, force] of Object.entries(tagOverrides) as [DietTag, boolean][]) {
      if (force) {
        earned.add(tag);
      } else {
        earned.delete(tag);
      }
    }
  }

  return [...earned];
}

export function recipeTotalMinutes(recipe: Recipe): number {
  return recipe.totalMinutes ?? recipe.prepMinutes + recipe.cookMinutes;
}

export function deriveTags(
  recipe: Recipe,
  lookup: IngredientLookup,
  mode: TagDerivationMode = "with-alterations",
): DietTag[] {
  return tagsFromLines(recipe.ingredients, lookup, mode, recipe.tagOverrides);
}

export function deriveTagsForSelections(
  recipe: Recipe,
  lookup: IngredientLookup,
  selections: RecipeSelections,
): DietTag[] {
  const resolved = resolveRecipeLines(recipe, selections, lookup);
  const lines = resolved.map((item) =>
    item.omitted ? { ...item.line, optional: true } : item.line,
  );
  return tagsFromLines(lines, lookup, "as-written", recipe.tagOverrides);
}
