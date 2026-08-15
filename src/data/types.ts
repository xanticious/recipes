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
  | "animal"
  | "not-keto"
  | "not-paleo"
  | "not-carnivore";

export type DietTag =
  | "gluten-free"
  | "vegan"
  | "keto"
  | "paleo"
  | "carnivore"
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

export type SubstitutionOption = {
  /** Catalog ingredient to use, or `null` to leave the line out. */
  ingredientId: string | null;
  amount?: number | null;
  unit?: string | null;
  preparation?: string;
  /** Ingredient-list wording. Defaults to the catalog name or “Leave it out”. */
  label?: string;
  /** Text inserted into `{{slot}}` in steps. Defaults to the catalog name. */
  stepPhrase?: string;
};

export type SubstitutionGroup = {
  /** Diet tags this group of options is meant to satisfy. */
  tags: DietTag[];
  options: SubstitutionOption[];
};

export type IngredientLine = {
  /** Key for selections and `{{slot}}` in steps. Defaults to `ingredientId`. */
  slot?: string;
  ingredientId: string;
  amount: number | null;
  unit: string | null;
  preparation?: string;
  optional?: boolean;
  substitutions?: SubstitutionGroup[];
};

export type IngredientSelection = {
  tag: DietTag;
  optionIndex: number;
};

export type RecipeSelections = Readonly<Record<string, IngredientSelection>>;

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
