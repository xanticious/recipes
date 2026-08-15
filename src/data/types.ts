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
  | "mannitol";

export type DietTag =
  | "gluten-free"
  | "lactose-free"
  | "low-fructose"
  | "low-fructan"
  | "low-gos"
  | "low-sorbitol"
  | "low-mannitol"
  | "low-oligosaccharide"
  | "low-polyol"
  | "low-fodmap"
  | "low-fop";

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
  substitutions?: string[];
};

export type Recipe = {
  id: string;
  title: string;
  mealType: MealType;
  cuisine: Cuisine;
  specialOccasion: boolean;
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes?: number;
  servings: number;
  ingredients: IngredientLine[];
  steps: string[];
  notes?: string;
  tagOverrides?: Partial<Record<DietTag, boolean>>;
};

export type Theme = "light" | "dark";
export type FontSize = "small" | "medium" | "large";
