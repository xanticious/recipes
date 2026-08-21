import type {
  Cuisine,
  HaFilter,
  HaStatus,
  HealthRating,
  IngredientHaFilter,
  IngredientHaStatus,
  MealType,
  TernaryFilter,
} from "./types.ts";
import { HA_STATUSES } from "./ha.ts";

export { HA_STATUSES } from "./ha.ts";

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

export const HA_FILTERS: readonly HaFilter[] = ["all", ...HA_STATUSES];

export const INGREDIENT_HA_FILTERS: readonly IngredientHaFilter[] = HA_FILTERS;

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
  moderate: "Moderately healthy",
  unhealthy: "Unhealthy",
};

export const HA_LABEL = "HA";

export const HA_FULL_LABEL = "House Approved";

export const EAT_OUT_FILTER_LABELS: Record<TernaryFilter, string> = {
  all: "All meals",
  yes: "Eat out",
  no: "Home cooking",
};

export const HA_FILTER_LABELS: Record<HaFilter, string> = {
  all: "All",
  "ha-confirmed": "HA - Confirmed",
  "ha-assumed": "HA - Assumed",
  unknown: "Unknown",
  "not-ha-assumed": "Not-HA Assumed",
  "not-ha-confirmed": "Not-HA Confirmed",
};

export const INGREDIENT_HA_FILTER_LABELS: Record<IngredientHaFilter, string> = HA_FILTER_LABELS;

export const HA_TAG_LABELS: Record<HaStatus, string> = {
  "ha-confirmed": HA_LABEL,
  "ha-assumed": "HA assumed",
  unknown: "Unknown",
  "not-ha-assumed": "Not-HA assumed",
  "not-ha-confirmed": "Not-HA",
};

export const HA_TAG_TITLES: Record<HaStatus, string> = {
  "ha-confirmed": "HA - Confirmed",
  "ha-assumed": "HA - Assumed",
  unknown: "Unknown",
  "not-ha-assumed": "Not-HA Assumed",
  "not-ha-confirmed": "Not-HA Confirmed",
};

export const INGREDIENT_HA_TAG_LABELS: Record<IngredientHaStatus, string> = HA_TAG_LABELS;

export const INGREDIENT_HA_TAG_TITLES: Record<IngredientHaStatus, string> = HA_TAG_TITLES;

export const RECIPE_HA_TAG_LABELS: Record<HaStatus, string> = HA_TAG_LABELS;

export const RECIPE_HA_TAG_TITLES: Record<HaStatus, string> = HA_TAG_TITLES;
