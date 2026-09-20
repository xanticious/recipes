import { placeholderHue } from "./catalogImage.ts";
import { recipeIsHa } from "./ha.ts";
import { isHomeRecipe, recipeTotalMinutes } from "./recipe.ts";
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

export type MealIdeaPrepTimeFilter = "all" | "under-20" | "around-30" | "around-60" | "over-75";

export type MealIdeaFilters = {
  occasion: MealIdeaOccasionFilter;
  region: MealIdeaRegionFilter;
  prepTime?: MealIdeaPrepTimeFilter;
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

export const MEAL_IDEA_PREP_TIME_FILTERS: readonly MealIdeaPrepTimeFilter[] = [
  "all",
  "under-20",
  "around-30",
  "around-60",
  "over-75",
];

export const MEAL_IDEA_PREP_TIME_FILTER_LABELS: Record<MealIdeaPrepTimeFilter, string> = {
  all: "All",
  "under-20": "< 20 min",
  "around-30": "~30 min",
  "around-60": "~60 min",
  "over-75": ">75 min",
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

export function isMealIdeaPrepTime(value: string): value is MealIdeaPrepTimeFilter {
  return (MEAL_IDEA_PREP_TIME_FILTERS as readonly string[]).includes(value);
}

export function mealIdeaPrepTimeBucket(minutes: number): Exclude<MealIdeaPrepTimeFilter, "all"> {
  if (minutes < 20) {
    return "under-20";
  }
  if (minutes < 45) {
    return "around-30";
  }
  if (minutes <= 75) {
    return "around-60";
  }
  return "over-75";
}

/**
 * How long the plate takes: the slowest linked home-recipe family, using that
 * recipe's total time. HA / Not-HA siblings of the same dish use the faster
 * one. Plates with no linked recipes are a few minutes. Unknown when every
 * linked recipe is missing or eat-out.
 */
export function mealIdeaPrepMinutes(
  idea: MealIdea,
  recipeById: ReadonlyMap<string, Recipe>,
): number | undefined {
  const refs = idea.recipes;
  if (!refs || refs.length === 0) {
    return 0;
  }
  const familyMinutes = new Map<string, number>();
  for (const ref of refs) {
    const recipe = ref.recipeId === undefined ? undefined : recipeById.get(ref.recipeId);
    if (!recipe || !isHomeRecipe(recipe)) {
      continue;
    }
    const family = mealIdeaRecipeFamily(ref.label);
    const minutes = recipeTotalMinutes(recipe);
    const current = familyMinutes.get(family);
    if (current === undefined || minutes < current) {
      familyMinutes.set(family, minutes);
    }
  }
  if (familyMinutes.size === 0) {
    return undefined;
  }
  return Math.max(...familyMinutes.values());
}

export function formatMealIdeaPrepMinutes(minutes: number): string {
  return minutes === 1 ? "1 minute" : `${String(minutes)} minutes`;
}

export function mealIdeaLookup(ideas: readonly MealIdea[]): ReadonlyMap<string, MealIdea> {
  return new Map(ideas.map((idea) => [idea.id, idea]));
}

export function mealIdeaMatchesFilters(
  idea: MealIdea,
  filters: MealIdeaFilters,
  recipeById: ReadonlyMap<string, Recipe> = new Map(),
): boolean {
  if (filters.occasion !== "all" && idea.occasion !== filters.occasion) {
    return false;
  }
  if (filters.region !== "all" && !idea.regions.includes(filters.region)) {
    return false;
  }
  if (filters.prepTime && filters.prepTime !== "all") {
    const minutes = mealIdeaPrepMinutes(idea, recipeById);
    if (minutes === undefined || mealIdeaPrepTimeBucket(minutes) !== filters.prepTime) {
      return false;
    }
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

export function filterMealIdeas(
  ideas: readonly MealIdea[],
  filters: MealIdeaFilters,
  recipeById: ReadonlyMap<string, Recipe> = new Map(),
): MealIdea[] {
  return ideas.filter((idea) => mealIdeaMatchesFilters(idea, filters, recipeById));
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

const RECIPE_FAMILY_SUFFIX = /\s*\((?:Not-)?HA\)\s*$/i;

export function mealIdeaRecipeFamily(label: string): string {
  return label.replace(RECIPE_FAMILY_SUFFIX, "").trim();
}

export function mealIdeaHasHaRecipes(
  idea: MealIdea,
  recipeById: ReadonlyMap<string, Recipe>,
): boolean {
  if (!idea.recipes || idea.recipes.length === 0) {
    return false;
  }
  const families = new Map<string, boolean>();
  for (const ref of idea.recipes) {
    const family = mealIdeaRecipeFamily(ref.label);
    const recipe = ref.recipeId === undefined ? undefined : recipeById.get(ref.recipeId);
    const hasHa = recipe !== undefined && recipeIsHa(recipe);
    families.set(family, (families.get(family) ?? false) || hasHa);
  }
  return families.size > 0 && [...families.values()].every(Boolean);
}
