import type { Recipe } from "../types.ts";
import { breakfast } from "./breakfast.ts";
import { dessert } from "./dessert.ts";
import { dinner } from "./dinner.ts";
import { lunch } from "./lunch.ts";
import { snack } from "./snack.ts";

export const recipes: Recipe[] = [...breakfast, ...lunch, ...dinner, ...snack, ...dessert];
