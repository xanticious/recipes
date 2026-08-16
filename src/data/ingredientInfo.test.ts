import { expect, test } from "vitest";
import { recipesByIngredientId, recipesUsingIngredient } from "./ingredientBrowse.ts";
import {
  capitalizeIngredientName,
  describeIngredient,
  ingredientAvailability,
  joinEnglish,
} from "./ingredientInfo.ts";
import { ingredients } from "./ingredients.ts";
import { recipes } from "./recipes/index.ts";
import type { HomeRecipe, Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

function home(
  partial: Partial<HomeRecipe> & Pick<HomeRecipe, "id" | "title" | "cuisine" | "mealType">,
): HomeRecipe {
  return {
    specialOccasion: false,
    ha: "pending",
    healthRating: "healthy",
    eatOut: false,
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [{ ingredientId: "garlic", amount: 1, unit: "clove" }],
    steps: ["Cook."],
    ...partial,
  };
}

test("joinEnglish uses commas and a final and", () => {
  expect(joinEnglish([])).toBe("");
  expect(joinEnglish(["Italian"])).toBe("Italian");
  expect(joinEnglish(["Italian", "Asian"])).toBe("Italian and Asian");
  expect(joinEnglish(["Italian", "Asian", "Mexican"])).toBe("Italian, Asian, and Mexican");
});

test("garlic is a common vegetable; ajwain is specialty; ramps are exotic", () => {
  expect(ingredientAvailability(item({ id: "garlic", name: "garlic", kind: "produce" }))).toBe(
    "common",
  );
  expect(ingredientAvailability(item({ id: "ajwain", name: "ajwain", kind: "spice" }))).toBe(
    "specialty",
  );
  expect(ingredientAvailability(item({ id: "ramp", name: "ramps", kind: "produce" }))).toBe(
    "exotic",
  );
});

test("describeIngredient covers what it is, how common it is, and how it is used", () => {
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] });
  const info = describeIngredient(garlic, [
    home({
      id: "pasta",
      title: "Garlic pasta",
      cuisine: "italian",
      mealType: "dinner",
    }),
    home({
      id: "stir-fry",
      title: "Chicken stir-fry",
      cuisine: "asian",
      mealType: "dinner",
    }),
    home({
      id: "tacos",
      title: "Steak tacos",
      cuisine: "mexican",
      mealType: "lunch",
    }),
  ]);
  expect(info.what).toBe("Garlic is a vegetable.");
  expect(info.commonness).toMatch(/common grocery-store/i);
  expect(info.commonness).toMatch(/3 recipes/);
  expect(info.uses).toMatch(/Asian, Italian, and Mexican cooking/);
  expect(info.uses).toMatch(/dinner and lunch/);
  expect(info.uses).toMatch(/Garlic pasta, Chicken stir-fry, and Steak tacos/);
  expect(info.notes).toBeUndefined();
});

test("unused exotic produce still explains what it is", () => {
  const ramps = item({
    id: "ramp",
    name: "ramps",
    kind: "produce",
    notes: "Seasonal wild leeks.",
  });
  const info = describeIngredient(ramps, []);
  expect(info.what).toBe("Ramps is a vegetable.");
  expect(info.commonness).toMatch(/exotic/i);
  expect(info.commonness).toMatch(/not used in this book yet/i);
  expect(info.uses).toMatch(/no recipes in this book/i);
  expect(info.notes).toBe("Seasonal wild leeks.");
});

test("capitalizeIngredientName only changes the first character", () => {
  expect(capitalizeIngredientName("garlic")).toBe("Garlic");
  expect(capitalizeIngredientName("Roma tomato")).toBe("Roma tomato");
  expect(capitalizeIngredientName("")).toBe("");
});

test("every catalog ingredient gets a what / commonness / uses description", () => {
  const usage = recipesByIngredientId(recipes);
  for (const ingredient of ingredients) {
    const info = describeIngredient(ingredient, recipesUsingIngredient(ingredient.id, usage));
    expect(info.what.length).toBeGreaterThan(8);
    expect(info.commonness.length).toBeGreaterThan(8);
    expect(info.uses.length).toBeGreaterThan(8);
  }
});
