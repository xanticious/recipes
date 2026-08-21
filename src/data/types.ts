export type MealType = "breakfast" | "lunch" | "dinner" | "snack" | "dessert";

export type Cuisine =
  | "american"
  | "mexican"
  | "italian"
  | "asian"
  | "mediterranean"
  | "indian"
  | "other";

export type IngredientKind =
  | "produce"
  | "dairy"
  | "grain"
  | "protein"
  | "fat"
  | "sweetener"
  | "spice"
  | "other";

export type IngredientFlag =
  | "gluten"
  | "lactose"
  | "fructose"
  | "fructan"
  | "gos"
  | "sorbitol"
  | "mannitol"
  | "high-fat";

export type HealthRating = "healthy" | "moderate" | "unhealthy";

export type TernaryFilter = "all" | "yes" | "no";

/** House approval: confirmed household yes/no, assumed from diet metadata, or unknown. */
export type HaStatus =
  | "ha-confirmed"
  | "ha-assumed"
  | "unknown"
  | "not-ha-assumed"
  | "not-ha-confirmed";

export type HaFilter = "all" | HaStatus;

/** Assumed recipe HA from ingredients. Confirmed tags stay a household yes/no. */
export type AssumedHaStatus = "ha-assumed" | "unknown" | "not-ha-assumed";

export type LactoseLevel = "free" | "low" | "high";

export type GlutenLevel = "free" | "low" | "high";

export type FodmapLevel = "low" | "watch" | "high";

/** Confirmed household yes/no stored on an ingredient. Assumed and unknown are derived. */
export type IngredientHaStored = "ha-confirmed" | "not-ha-confirmed";

export type IngredientHaStatus = HaStatus;

export type IngredientHaFilter = HaFilter;

export type Ingredient = {
  id: string;
  name: string;
  kind: IngredientKind;
  flags: readonly IngredientFlag[];
  notes?: string;
  /** Confirmed House Approval. When omitted, assumed or unknown from diet metadata. */
  ha?: IngredientHaStored;
  lactose?: LactoseLevel;
  gluten?: GlutenLevel;
};

export type IngredientLine = {
  ingredientId: string;
  amount: number | null;
  unit: string | null;
  preparation?: string;
  optional?: boolean;
};

export type RecipeCore = {
  id: string;
  title: string;
  mealType: MealType;
  cuisine: Cuisine;
  specialOccasion: boolean;
  /**
   * House approval. Confirmed tags are household yes/no. Otherwise assumed from
   * the ingredient list (eat-out stays unknown until confirmed).
   */
  ha: HaStatus;
  healthRating: HealthRating;
  relatedRecipeIds?: readonly string[];
  notes?: string;
};

export type HomeRecipe = RecipeCore & {
  eatOut: false;
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes?: number;
  servings: number;
  ingredients: IngredientLine[];
  steps: string[];
};

export type EatOutRecipe = RecipeCore & {
  eatOut: true;
  description: string;
};

export type Recipe = HomeRecipe | EatOutRecipe;

export type Theme = "light" | "dark";
export type FontSize = "small" | "medium" | "large";

export type RestaurantCity =
  | "bountiful"
  | "centerville"
  | "farmington"
  | "kaysville"
  | "layton"
  | "north-salt-lake"
  | "woods-cross";

export type RestaurantCuisine =
  | "american"
  | "mexican"
  | "italian"
  | "asian"
  | "mediterranean"
  | "indian"
  | "bbq"
  | "breakfast"
  | "other";

export type Restaurant = {
  id: string;
  name: string;
  city: RestaurantCity;
  description: string;
  /** First cuisine is the grouping category. Extra values are shown as extra types. */
  cuisines: readonly [RestaurantCuisine, ...RestaurantCuisine[]];
  /** Up to five household favorites. Empty slots stay blank in the UI. */
  popularMenuItems: readonly string[];
  isFavorite: boolean;
};
