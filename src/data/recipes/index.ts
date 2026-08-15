import type { Recipe } from "../types.ts";
import { breakfast } from "./breakfast.ts";
import { breakfastMore } from "./breakfast-more.ts";
import { dessert } from "./dessert.ts";
import { dessertMore } from "./dessert-more.ts";
import { dinner } from "./dinner.ts";
import { dinnerAmerican } from "./dinner-american.ts";
import { dinnerAsian } from "./dinner-asian.ts";
import { dinnerIndian } from "./dinner-indian.ts";
import { dinnerItalian } from "./dinner-italian.ts";
import { dinnerMediterranean } from "./dinner-mediterranean.ts";
import { dinnerMexican } from "./dinner-mexican.ts";
import { dinnerOther } from "./dinner-other.ts";
import { lunch } from "./lunch.ts";
import { lunchMore } from "./lunch-more.ts";
import { snack } from "./snack.ts";
import { snackMore } from "./snack-more.ts";

export const recipes: Recipe[] = [
  ...breakfast,
  ...breakfastMore,
  ...lunch,
  ...lunchMore,
  ...dinner,
  ...dinnerAmerican,
  ...dinnerMexican,
  ...dinnerItalian,
  ...dinnerAsian,
  ...dinnerMediterranean,
  ...dinnerIndian,
  ...dinnerOther,
  ...snack,
  ...snackMore,
  ...dessert,
  ...dessertMore,
];
