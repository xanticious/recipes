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

export type Ingredient = {
  id: string;
  name: string;
  kind: IngredientKind;
  flags: readonly IngredientFlag[];
  notes?: string;
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
  /** Fits this household’s usual diet constraints. Shown as “HA”. */
  ha: boolean;
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
