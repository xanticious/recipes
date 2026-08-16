import type { Cuisine, HealthRating, MealType, TernaryFilter } from "./types.ts";

export const MEAL_TYPES: readonly MealType[] = ["breakfast", "lunch", "dinner", "snack", "dessert"];

export const CUISINES: readonly Cuisine[] = [
  "american",
  "mexican",
  "italian",
  "asian",
  "mediterranean",
  "indian",
  "other",
];

export const HEALTH_RATINGS: readonly HealthRating[] = ["healthy", "moderate", "unhealthy"];

export const TERNARY_FILTERS: readonly TernaryFilter[] = ["all", "yes", "no"];

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  dessert: "Dessert",
};

export const CUISINE_LABELS: Record<Cuisine, string> = {
  american: "American",
  mexican: "Mexican",
  italian: "Italian",
  asian: "Asian",
  mediterranean: "Mediterranean",
  indian: "Indian",
  other: "Other",
};

export const HEALTH_RATING_LABELS: Record<HealthRating, string> = {
  healthy: "Healthy",
  moderate: "Moderate",
  unhealthy: "Unhealthy",
};

export const HA_LABEL = "HA";

export const EAT_OUT_FILTER_LABELS: Record<TernaryFilter, string> = {
  all: "All meals",
  yes: "Eat out",
  no: "Home cooking",
};

export const HA_FILTER_LABELS: Record<TernaryFilter, string> = {
  all: "All",
  yes: "HA",
  no: "Not HA",
};
