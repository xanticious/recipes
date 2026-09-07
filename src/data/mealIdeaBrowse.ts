import { placeholderHue } from "./catalogImage.ts";
import {
  MEAL_IDEA_OCCASION_LABELS,
  MEAL_IDEA_OCCASIONS,
  MEAL_IDEA_REGION_ABBREVS,
  MEAL_IDEA_REGION_LABELS,
  MEAL_IDEA_REGIONS,
} from "./tags.ts";
import type { MealIdea, MealIdeaOccasion, MealIdeaRegion, Recipe } from "./types.ts";

export type MealIdeaOccasionFilter = "all" | MealIdeaOccasion;

export type MealIdeaRegionFilter = "all" | MealIdeaRegion;

export type MealIdeaFilters = {
  occasion: MealIdeaOccasionFilter;
  region: MealIdeaRegionFilter;
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

export const MEAL_IDEA_REGION_FILTERS: readonly MealIdeaRegionFilter[] = [
  "all",
  ...MEAL_IDEA_REGIONS,
];

export const MEAL_IDEA_REGION_FILTER_LABELS: Record<MealIdeaRegionFilter, string> = {
  all: "All",
  ...MEAL_IDEA_REGION_LABELS,
};

export const MEAL_IDEA_DISPLAYS = ["list", "pictures"] as const;

export type MealIdeaDisplay = (typeof MEAL_IDEA_DISPLAYS)[number];

export const MEAL_IDEA_DISPLAY_LABELS: Record<MealIdeaDisplay, string> = {
  list: "List View",
  pictures: "Pictures View",
};

const MEAL_IDEA_PIN_SIZES = [
  { width: 320, height: 240 },
  { width: 320, height: 300 },
  { width: 320, height: 360 },
  { width: 320, height: 420 },
] as const;

export function mealIdeaPinSize(id: string): { width: number; height: number } {
  return MEAL_IDEA_PIN_SIZES[placeholderHue(id) % MEAL_IDEA_PIN_SIZES.length];
}

export function isMealIdeaDisplay(value: string): value is MealIdeaDisplay {
  return (MEAL_IDEA_DISPLAYS as readonly string[]).includes(value);
}

export function isMealIdeaOccasion(value: string): value is MealIdeaOccasion {
  return (MEAL_IDEA_OCCASIONS as readonly string[]).includes(value);
}

export function isMealIdeaRegion(value: string): value is MealIdeaRegion {
  return (MEAL_IDEA_REGIONS as readonly string[]).includes(value);
}

export function mealIdeaLookup(ideas: readonly MealIdea[]): ReadonlyMap<string, MealIdea> {
  return new Map(ideas.map((idea) => [idea.id, idea]));
}

export function mealIdeaMatchesFilters(idea: MealIdea, filters: MealIdeaFilters): boolean {
  if (filters.occasion !== "all" && idea.occasion !== filters.occasion) {
    return false;
  }
  if (filters.region !== "all" && !idea.regions.includes(filters.region)) {
    return false;
  }
  const query = filters.query.trim().toLowerCase();
  if (!query) {
    return true;
  }
  const haystack = [
    idea.title,
    idea.description,
    ...idea.pairings,
    ...(idea.substitutions ?? []),
    ...(idea.recipes ?? []).map((ref) => ref.label),
    ...idea.regions.map((region) => MEAL_IDEA_REGION_LABELS[region]),
    ...idea.regions.map((region) => MEAL_IDEA_REGION_ABBREVS[region]),
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
