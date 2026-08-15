import { expect, test } from "vitest";
import { deriveTags } from "./deriveTags.ts";
import { ingredientLookup, ingredients } from "./ingredients.ts";
import { recipes } from "./recipes/index.ts";

test("ingredient ids are unique", () => {
  const ids = ingredients.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("the ingredient catalog is at least five times the original staple list", () => {
  expect(ingredients.length).toBeGreaterThanOrEqual(785);
});

test("recipe ids are unique", () => {
  const ids = recipes.map((recipe) => recipe.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("the catalog has at least 300 recipes and all five meal types", () => {
  expect(recipes.length).toBeGreaterThanOrEqual(300);
  const meals = new Set(recipes.map((recipe) => recipe.mealType));
  expect(meals).toEqual(new Set(["breakfast", "lunch", "dinner", "snack", "dessert"]));
});

test("every ingredient and substitution exists in the catalog", () => {
  const missing: string[] = [];
  for (const recipe of recipes) {
    for (const line of recipe.ingredients) {
      if (!ingredientLookup.has(line.ingredientId)) {
        missing.push(`${recipe.id} → ${line.ingredientId}`);
      }
      for (const group of line.substitutions ?? []) {
        for (const option of group.options) {
          if (option.ingredientId && !ingredientLookup.has(option.ingredientId)) {
            missing.push(`${recipe.id} swap → ${option.ingredientId}`);
          }
        }
      }
    }
  }
  expect(missing).toEqual([]);
});

test("step placeholders refer to ingredient slots", () => {
  const slotName = /\{\{([^}:]+)/g;
  const unknown: string[] = [];
  for (const recipe of recipes) {
    const slots = new Set(recipe.ingredients.map((line) => line.slot ?? line.ingredientId));
    for (const step of recipe.steps) {
      for (const match of step.matchAll(slotName)) {
        const slot = match[1]?.trim() ?? "";
        if (!slots.has(slot)) {
          unknown.push(`${recipe.id} unknown slot {{${slot}}}`);
        }
      }
    }
  }
  expect(unknown).toEqual([]);
});

test("plant proteins are not flagged animal; typical broth is", () => {
  expect(ingredientLookup.get("tofu")?.flags).not.toEqual(expect.arrayContaining(["animal"]));
  expect(ingredientLookup.get("chickpeas")?.flags).toEqual(expect.arrayContaining(["gos"]));
  expect(ingredientLookup.get("tempeh")?.flags).not.toEqual(expect.arrayContaining(["animal"]));
  expect(ingredientLookup.get("chicken-broth")?.flags).toEqual(
    expect.arrayContaining(["animal", "fructan"]),
  );
});

test("exported cheddar carries lactose and animal flags", () => {
  const cheddar = ingredientLookup.get("cheddar");
  expect(cheddar?.flags).toEqual(expect.arrayContaining(["lactose", "animal", "not-paleo"]));
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
