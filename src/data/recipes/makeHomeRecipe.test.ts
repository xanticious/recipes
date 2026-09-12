import { expect, test } from "vitest";
import { home, line } from "./makeHomeRecipe.ts";

test("line copies amount, unit, and optional extras", () => {
  expect(line("salt", 1, "tsp")).toEqual({ ingredientId: "salt", amount: 1, unit: "tsp" });
  expect(line("garlic", 2, "clove", { optional: true, preparation: "minced" })).toEqual({
    ingredientId: "garlic",
    amount: 2,
    unit: "clove",
    optional: true,
    preparation: "minced",
  });
});

test("home fills catalog defaults and assumes HA from ingredients", () => {
  const recipe = home({
    id: "rice-bowl",
    title: "Rice bowl",
    mealType: "dinner",
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [line("white-rice", 1, "cup"), line("salt", 0.25, "tsp")],
    steps: ["Cook."],
    notes: "Weeknight staple.",
    relatedRecipeIds: ["chili"],
  });
  expect(recipe).toMatchObject({
    id: "rice-bowl",
    cuisine: "american",
    specialOccasion: false,
    healthRating: "moderate",
    eatOut: false,
    ha: "ha-assumed",
    notes: "Weeknight staple.",
    relatedRecipeIds: ["chili"],
  });

  const garlicRice = home({
    id: "garlic-rice",
    title: "Garlic rice",
    mealType: "dinner",
    cuisine: "asian",
    healthRating: "healthy",
    specialOccasion: true,
    ha: "ha-confirmed",
    prepMinutes: 5,
    cookMinutes: 15,
    servings: 4,
    ingredients: [line("white-rice", 1, "cup"), line("garlic", 2, "clove")],
    steps: ["Cook."],
  });
  expect(garlicRice.cuisine).toBe("asian");
  expect(garlicRice.healthRating).toBe("healthy");
  expect(garlicRice.specialOccasion).toBe(true);
  expect(garlicRice.ha).toBe("ha-confirmed");
  expect(garlicRice.notes).toBeUndefined();
  expect(garlicRice.relatedRecipeIds).toBeUndefined();
});
