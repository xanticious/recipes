import { expect, test } from "vitest";
import { deriveTags } from "./deriveTags.ts";
import { ingredientLookup, ingredients } from "./ingredients.ts";
import { recipes } from "./recipes/index.ts";

test("ingredient ids are unique", () => {
  const ids = ingredients.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("recipe ids are unique", () => {
  const ids = recipes.map((recipe) => recipe.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("the catalog has about 50 recipes and all five meal types", () => {
  expect(recipes.length).toBeGreaterThanOrEqual(48);
  expect(recipes.length).toBeLessThanOrEqual(55);
  const meals = new Set(recipes.map((recipe) => recipe.mealType));
  expect(meals).toEqual(new Set(["breakfast", "lunch", "dinner", "snack", "dessert"]));
});

test("every ingredient and substitution exists in the catalog", () => {
  for (const recipe of recipes) {
    for (const line of recipe.ingredients) {
      expect(ingredientLookup.has(line.ingredientId), `${recipe.id} → ${line.ingredientId}`).toBe(
        true,
      );
      for (const swap of line.substitutions ?? []) {
        expect(ingredientLookup.has(swap), `${recipe.id} swap → ${swap}`).toBe(true);
      }
    }
  }
});

test("deriveTags runs for every recipe", () => {
  for (const recipe of recipes) {
    expect(() => deriveTags(recipe, ingredientLookup)).not.toThrow();
  }
});

test("baseline recipes are gluten-free under household rules", () => {
  const missing = recipes.filter(
    (recipe) => !deriveTags(recipe, ingredientLookup).includes("gluten-free"),
  );
  expect(missing.map((recipe) => recipe.id)).toEqual([]);
});

test("special-occasion marks and the sourdough sandwich are present", () => {
  const special = recipes.filter((recipe) => recipe.specialOccasion).map((recipe) => recipe.id);
  expect(special).toEqual(
    expect.arrayContaining(["sunday-roast-chicken", "chicken-cacciatore", "parmesan-risotto"]),
  );
  expect(recipes.some((recipe) => recipe.id === "sourdough-turkey-sandwich")).toBe(true);
});

test("several recipes have no onion or garlic at all", () => {
  const allium = new Set(["onion", "garlic", "shallot", "leek", "garlic-powder", "onion-powder"]);
  const clear = recipes.filter((recipe) =>
    recipe.ingredients.every((line) => line.optional || !allium.has(line.ingredientId)),
  );
  expect(clear.length).toBeGreaterThanOrEqual(10);
});
