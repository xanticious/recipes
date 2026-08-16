import { dairy } from "./catalog/dairy.ts";
import { fat } from "./catalog/fat.ts";
import { grain } from "./catalog/grain.ts";
import { other } from "./catalog/other.ts";
import { produce } from "./catalog/produce.ts";
import { protein } from "./catalog/protein.ts";
import { spice } from "./catalog/spice.ts";
import { sweetener } from "./catalog/sweetener.ts";
import { indexIngredients } from "./lookup.ts";
import type { Ingredient } from "./types.ts";

export const ingredients: readonly Ingredient[] = [
  ...produce,
  ...dairy,
  ...grain,
  ...protein,
  ...fat,
  ...sweetener,
  ...spice,
  ...other,
];

export const ingredientLookup = indexIngredients(ingredients);
