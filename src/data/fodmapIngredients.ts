import {
  filterIngredients,
  groupIngredients,
  INGREDIENT_SECTION_LABELS,
  INGREDIENT_SECTIONS,
  type GroupedIngredients,
  type IngredientFilters,
  type IngredientSection,
} from "./ingredientBrowse.ts";
import { getIngredientFodmap, FODMAP_REASONS } from "./ingredientFodmap.ts";
import type { Ingredient } from "./types.ts";

export const FODMAP_BROWSE_LEVELS = ["all", "low", "medium", "high"] as const;

export type FodmapBrowseLevel = (typeof FODMAP_BROWSE_LEVELS)[number];

export const FODMAP_BROWSE_LEVEL_LABELS: Record<FodmapBrowseLevel, string> = {
  all: "All",
  low: "Low Fodmap",
  medium: "Medium Fodmap",
  high: "High Fodmap",
};

export const FODMAP_BROWSE_TYPES = ["all", ...FODMAP_REASONS] as const;

export type FodmapBrowseType = (typeof FODMAP_BROWSE_TYPES)[number];

export const FODMAP_BROWSE_TYPE_LABELS: Record<FodmapBrowseType, string> = {
  all: "All",
  fructose: "Fructose",
  fructans: "Fructans",
  gos: "GOS",
  lactose: "Lactose",
  sorbitol: "Sorbitol",
  mannitol: "Mannitol",
};

const REST_SECTIONS = INGREDIENT_SECTIONS.filter(
  (section) => section !== "fruit" && section !== "vegetables",
).toSorted((a, b) => INGREDIENT_SECTION_LABELS[a].localeCompare(INGREDIENT_SECTION_LABELS[b]));

export const FODMAP_INGREDIENT_SECTIONS: readonly IngredientSection[] = [
  "fruit",
  "vegetables",
  ...REST_SECTIONS,
];

export type FodmapIngredientFilters = {
  level: FodmapBrowseLevel;
  type?: FodmapBrowseType;
};

export type BrowsedIngredientFilters = IngredientFilters & FodmapIngredientFilters;

export function isFodmapBrowseLevel(value: string): value is FodmapBrowseLevel {
  return FODMAP_BROWSE_LEVELS.some((level) => level === value);
}

export function isFodmapBrowseType(value: string): value is FodmapBrowseType {
  return FODMAP_BROWSE_TYPES.some((type) => type === value);
}

export function fodmapStatusForLevel(level: Exclude<FodmapBrowseLevel, "all">) {
  if (level === "medium") {
    return "depends" as const;
  }
  return level;
}

export function showsFodmapTypeRow(level: FodmapBrowseLevel): boolean {
  return level === "medium" || level === "high";
}

export function ingredientMatchesFodmapBrowse(
  ingredient: Ingredient,
  filters: FodmapIngredientFilters,
): boolean {
  if (filters.level === "all") {
    return true;
  }
  const entry = getIngredientFodmap(ingredient.id);
  if (!entry || entry.status !== fodmapStatusForLevel(filters.level)) {
    return false;
  }
  if (!showsFodmapTypeRow(filters.level) || !filters.type || filters.type === "all") {
    return true;
  }
  return entry.reasons.includes(filters.type);
}

export function filterFodmapIngredients(
  catalog: readonly Ingredient[],
  filters: FodmapIngredientFilters,
): Ingredient[] {
  return catalog.filter((ingredient) => ingredientMatchesFodmapBrowse(ingredient, filters));
}

export function filterBrowsedIngredients(
  catalog: readonly Ingredient[],
  filters: BrowsedIngredientFilters,
): Ingredient[] {
  return filterFodmapIngredients(filterIngredients(catalog, filters), filters);
}

export function groupFodmapIngredients(catalog: readonly Ingredient[]): GroupedIngredients {
  return groupIngredients(catalog, FODMAP_INGREDIENT_SECTIONS);
}
