import { MEAL_IDEA_OCCASION_LABELS, MEAL_IDEA_OCCASIONS } from "./tags.ts";
import type { MealIdea, MealIdeaOccasion, Recipe } from "./types.ts";

export type MealIdeaOccasionFilter = "all" | MealIdeaOccasion;

export type MealIdeaFilters = {
  occasion: MealIdeaOccasionFilter;
  query: string;
};

export type GroupedMealIdeas = {
  occasion: MealIdeaOccasion;
  ideas: MealIdea[];
};

export type ResolvedMealIdeaRecipe = {
  label: string;
  recipeId?: string;
  missing: boolean;
};

export const MEAL_IDEA_OCCASION_FILTERS: readonly MealIdeaOccasionFilter[] = [
  "all",
  ...MEAL_IDEA_OCCASIONS,
];

export const MEAL_IDEA_OCCASION_FILTER_LABELS: Record<MealIdeaOccasionFilter, string> = {
  all: "All",
  ...MEAL_IDEA_OCCASION_LABELS,
};

export function isMealIdeaOccasion(value: string): value is MealIdeaOccasion {
  return (MEAL_IDEA_OCCASIONS as readonly string[]).includes(value);
}

export function mealIdeaLookup(ideas: readonly MealIdea[]): ReadonlyMap<string, MealIdea> {
  return new Map(ideas.map((idea) => [idea.id, idea]));
}

export function mealIdeaMatchesFilters(idea: MealIdea, filters: MealIdeaFilters): boolean {
  if (filters.occasion !== "all" && idea.occasion !== filters.occasion) {
    return false;
  }
  const query = filters.query.trim().toLowerCase();
  if (!query) {
    return true;
  }
  const haystack = [
    idea.title,
    ...idea.pairings,
    ...(idea.substitutions ?? []),
    ...(idea.recipes ?? []).map((ref) => ref.label),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function filterMealIdeas(ideas: readonly MealIdea[], filters: MealIdeaFilters): MealIdea[] {
  return ideas.filter((idea) => mealIdeaMatchesFilters(idea, filters));
}

export function groupMealIdeas(ideas: readonly MealIdea[]): GroupedMealIdeas[] {
  return MEAL_IDEA_OCCASIONS.flatMap((occasion) => {
    const group = ideas.filter((idea) => idea.occasion === occasion);
    return group.length > 0 ? [{ occasion, ideas: group }] : [];
  });
}

export function relatedMealIdeas(
  idea: MealIdea,
  lookup: ReadonlyMap<string, MealIdea>,
): MealIdea[] {
  return (idea.relatedMealIds ?? []).flatMap((id) => {
    const match = lookup.get(id);
    return match ? [match] : [];
  });
}

export function resolveMealIdeaRecipes(
  idea: MealIdea,
  recipes: readonly Recipe[],
): ResolvedMealIdeaRecipe[] {
  if (!idea.recipes || idea.recipes.length === 0) {
    return [];
  }
  const ids = new Set(recipes.map((recipe) => recipe.id));
  return idea.recipes.map((ref) => {
    const recipeId = ref.recipeId;
    const missing = recipeId === undefined || !ids.has(recipeId);
    return { label: ref.label, recipeId, missing };
  });
}
