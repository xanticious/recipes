import type {
  Cuisine,
  HaFilter,
  HaStatus,
  HealthRating,
  MealType,
  TernaryFilter,
} from "./types.ts";

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

export const HA_FILTERS: readonly HaFilter[] = ["all", "yes", "pending", "no"];

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

export const HA_PENDING_LABEL = "Pending House Approval";

export const HA_NOT_LABEL = "Not House Approved";

export const EAT_OUT_FILTER_LABELS: Record<TernaryFilter, string> = {
  all: "All meals",
  yes: "Eat out",
  no: "Home cooking",
};

export const HA_FILTER_LABELS: Record<HaFilter, string> = {
  all: "All",
  yes: HA_FULL_LABEL,
  pending: HA_PENDING_LABEL,
  no: HA_NOT_LABEL,
};

export const INGREDIENT_HA_FILTER_LABELS: Record<HaFilter, string> = HA_FILTER_LABELS;

export const INGREDIENT_HA_TAG_LABELS: Record<HaStatus, string> = {
  yes: HA_LABEL,
  pending: HA_PENDING_LABEL,
  no: HA_NOT_LABEL,
};

export const INGREDIENT_HA_TAG_TITLES: Record<HaStatus, string> = {
  yes: HA_FULL_LABEL,
  pending: HA_PENDING_LABEL,
  no: HA_NOT_LABEL,
};
