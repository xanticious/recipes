import { expect, test } from "vitest";
import { indexIngredients } from "./deriveTags.ts";
import { filterRecipes, groupRecipes } from "./filterRecipes.ts";
import type { Ingredient, Recipe } from "./types.ts";

const lookup = indexIngredients([
  { id: "rice", name: "rice", kind: "grain", flags: [] },
  { id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] },
] satisfies Ingredient[]);

function recipe(partial: Partial<Recipe>): Recipe {
  return {
    id: "id",
    title: "Recipe",
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [{ ingredientId: "rice", amount: 1, unit: "cup" }],
    steps: ["Cook."],
    ...partial,
  };
}

const chili = recipe({ id: "chili", title: "Chili", mealType: "dinner", cuisine: "american" });
const tacos = recipe({ id: "tacos", title: "Tacos", mealType: "dinner", cuisine: "mexican" });
const oats = recipe({
  id: "oats",
  title: "Blueberry Oatmeal",
  mealType: "breakfast",
  cuisine: "american",
});
const garlicChicken = recipe({
  id: "garlic-chicken",
  title: "Garlic Chicken",
  ingredients: [{ ingredientId: "garlic", amount: 3, unit: "clove" }],
});

const all = [chili, tacos, oats, garlicChicken];

test("AND diet tags require every selected tag", () => {
  const matches = filterRecipes(all, lookup, { tags: ["low-fructan", "gluten-free"] });
  expect(matches.map((item) => item.id)).toEqual(["chili", "tacos", "oats"]);
});

test("meal type and cuisine filters combine", () => {
  const matches = filterRecipes(all, lookup, {
    mealTypes: ["dinner"],
    cuisines: ["mexican"],
  });
  expect(matches.map((item) => item.id)).toEqual(["tacos"]);
});

test("name search is case-insensitive", () => {
  const matches = filterRecipes(all, lookup, { query: "blue" });
  expect(matches.map((item) => item.id)).toEqual(["oats"]);
});

test("empty filters return every recipe", () => {
  expect(filterRecipes(all, lookup, {}).map((item) => item.id)).toEqual([
    "chili",
    "tacos",
    "oats",
    "garlic-chicken",
  ]);
});

test("groupRecipes nests cuisine inside meal type and sorts titles", () => {
  const grouped = groupRecipes([tacos, chili, oats]);
  expect(grouped.map((group) => group.mealType)).toEqual(["breakfast", "dinner"]);
  expect(grouped[1]?.cuisines.map((item) => item.cuisine)).toEqual(["american", "mexican"]);
  expect(grouped[1]?.cuisines[0]?.recipes.map((item) => item.title)).toEqual(["Chili"]);
});
