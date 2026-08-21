import { expect, test } from "vitest";
import { isEatOutRecipe, isHomeRecipe } from "./recipe.ts";
import { filterRecipes, groupRecipes } from "./filterRecipes.ts";
import type { EatOutRecipe, HomeRecipe, Recipe } from "./types.ts";

function home(partial: Partial<HomeRecipe> & Pick<HomeRecipe, "id" | "title">): HomeRecipe {
  return {
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    ha: "not-ha-assumed",
    healthRating: "moderate",
    eatOut: false,
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [{ ingredientId: "rice", amount: 1, unit: "cup" }],
    steps: ["Cook."],
    ...partial,
  };
}

function eatOut(
  partial: Partial<EatOutRecipe> & Pick<EatOutRecipe, "id" | "title" | "description">,
): EatOutRecipe {
  return {
    mealType: "lunch",
    cuisine: "american",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "healthy",
    eatOut: true,
    ...partial,
  };
}

const chili = home({ id: "chili", title: "Chili" });
const tacos = home({ id: "tacos", title: "Tacos", cuisine: "mexican", ha: "ha-confirmed" });
const oats = home({
  id: "oats",
  title: "Blueberry Oatmeal",
  mealType: "breakfast",
  ha: "ha-confirmed",
  healthRating: "healthy",
});
const salad = home({
  id: "salad",
  title: "Green Salad",
  mealType: "lunch",
  ha: "unknown",
});
const nuggets = eatOut({
  id: "nuggets",
  title: "Grilled Nuggets",
  description: "Grilled nuggets, no sauce.",
});

const all: Recipe[] = [chili, tacos, oats, salad, nuggets];

test("HA filter is exclusive, not AND tags", () => {
  expect(filterRecipes(all, { ha: "ha-confirmed" }).map((item) => item.id)).toEqual([
    "tacos",
    "oats",
    "nuggets",
  ]);
  expect(filterRecipes(all, { ha: "not-ha-assumed" }).map((item) => item.id)).toEqual(["chili"]);
  expect(filterRecipes(all, { ha: "unknown" }).map((item) => item.id)).toEqual(["salad"]);
  expect(filterRecipes(all, { ha: "all" }).map((item) => item.id)).toEqual([
    "chili",
    "tacos",
    "oats",
    "salad",
    "nuggets",
  ]);
});

test("eat-out filter is exclusive", () => {
  expect(filterRecipes(all, { eatOut: "yes" }).map((item) => item.id)).toEqual(["nuggets"]);
  expect(filterRecipes(all, { eatOut: "no" }).map((item) => item.id)).toEqual([
    "chili",
    "tacos",
    "oats",
    "salad",
  ]);
});

test("meal type and cuisine filters combine", () => {
  const matches = filterRecipes(all, {
    mealTypes: ["dinner"],
    cuisines: ["mexican"],
  });
  expect(matches.map((item) => item.id)).toEqual(["tacos"]);
});

test("name search is case-insensitive", () => {
  const matches = filterRecipes(all, { query: "blue" });
  expect(matches.map((item) => item.id)).toEqual(["oats"]);
});

test("empty filters return every recipe", () => {
  expect(filterRecipes(all, {}).map((item) => item.id)).toEqual([
    "chili",
    "tacos",
    "oats",
    "salad",
    "nuggets",
  ]);
});

test("groupRecipes nests cuisine inside meal type and sorts titles", () => {
  const grouped = groupRecipes([tacos, chili, oats]);
  expect(grouped.map((group) => group.mealType)).toEqual(["breakfast", "dinner"]);
  expect(grouped[1]?.cuisines.map((item) => item.cuisine)).toEqual(["american", "mexican"]);
  expect(grouped[1]?.cuisines[0]?.recipes.map((item) => item.title)).toEqual(["Chili"]);
});

test("home and eat-out recipes are distinguished", () => {
  expect(isHomeRecipe(chili)).toBe(true);
  expect(isEatOutRecipe(nuggets)).toBe(true);
});
