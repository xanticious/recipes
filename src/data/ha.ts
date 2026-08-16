import type { Ingredient } from "./types.ts";

const BLOCKING_FLAGS = new Set(["gluten", "lactose", "fructose", "sorbitol", "high-fat"]);

/** Onion, garlic, inulin, and prepared foods that typically contain them. */
const HOUSEHOLD_FRUCTAN = new Set([
  "onion",
  "yellow-onion",
  "red-onion",
  "white-onion",
  "sweet-onion",
  "pearl-onion",
  "garlic",
  "green-onion",
  "shallot",
  "leek",
  "ramp",
  "garlic-powder",
  "onion-powder",
  "onion-flakes",
  "garlic-salt",
  "onion-salt",
  "inulin",
  "chicory-root-fiber",
  "chicken-broth",
  "beef-broth",
  "vegetable-broth",
  "fish-stock",
  "marinara",
  "tomato-sauce",
  "salsa",
  "pico-de-gallo",
  "salsa-verde",
  "chili-garlic-sauce",
  "chili-crisp",
  "chili-oil",
  "sofrito",
  "recaito",
  "french-fried-onions",
  "red-curry-paste",
  "green-curry-paste",
  "yellow-curry-paste",
  "tzatziki",
  "italian-sausage",
  "breakfast-sausage",
  "chorizo",
  "andouille",
  "kielbasa",
  "bratwurst",
  "hot-dog",
  "salami",
  "pepperoni",
  "mortadella",
  "chicken-sausage",
  "hummus",
  "falafel",
  "veggie-patty",
  "refried-beans",
  "baked-beans",
]);

const HOUSEHOLD_MANNITOL = new Set(["cauliflower", "romanesco", "celery", "celery-root"]);

export function ingredientIsHa(ingredient: Ingredient): boolean {
  if (ingredient.flags.some((flag) => BLOCKING_FLAGS.has(flag))) {
    return false;
  }
  if (HOUSEHOLD_FRUCTAN.has(ingredient.id) || HOUSEHOLD_MANNITOL.has(ingredient.id)) {
    return false;
  }
  return true;
}
