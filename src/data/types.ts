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

/** House approval on an ingredient: approved, not approved, or still considering. */
export type HaStatus = "yes" | "no" | "pending";

export type HaFilter = "all" | HaStatus;

export type Ingredient = {
  id: string;
  name: string;
  kind: IngredientKind;
  flags: readonly IngredientFlag[];
  notes?: string;
  /** House approval. When omitted, Pending House Approval. */
  ha?: HaStatus;
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
  /** House approval. Hand-maintained. Shown as HA / Pending House Approval / Not House Approved. */
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
