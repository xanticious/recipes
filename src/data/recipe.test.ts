import { expect, test } from "vitest";
import { recipeTotalMinutes } from "./recipe.ts";
import type { HomeRecipe } from "./types.ts";

const base: HomeRecipe = {
  id: "test",
  title: "Test",
  mealType: "dinner",
  cuisine: "american",
  specialOccasion: false,
  ha: "yes",
  healthRating: "healthy",
  eatOut: false,
  prepMinutes: 10,
  cookMinutes: 20,
  servings: 4,
  ingredients: [],
  steps: ["Cook."],
};

test("recipeTotalMinutes uses stored total or prep plus cook", () => {
  expect(recipeTotalMinutes({ ...base, totalMinutes: 45 })).toBe(45);
  expect(recipeTotalMinutes(base)).toBe(30);
});
