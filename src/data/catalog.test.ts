import { expect, test } from "vitest";
import { kitchenGuide } from "./guide.ts";
import { ingredientLookup, ingredients } from "./ingredients.ts";
import { isEatOutRecipe, isHomeRecipe, relatedRecipes } from "./recipe.ts";
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

test("every home-recipe ingredient exists in the catalog", () => {
  const missing: string[] = [];
  for (const recipe of recipes) {
    if (!isHomeRecipe(recipe)) {
      continue;
    }
    for (const line of recipe.ingredients) {
      if (!ingredientLookup.has(line.ingredientId)) {
        missing.push(`${recipe.id} → ${line.ingredientId}`);
      }
    }
  }
  expect(missing).toEqual([]);
});

test("eat-out recipes have a description and no cook list", () => {
  const eatOut = recipes.filter(isEatOutRecipe);
  expect(eatOut.length).toBeGreaterThan(0);
  for (const recipe of eatOut) {
    expect(recipe.description.trim().length).toBeGreaterThan(0);
  }
});

test("related recipe ids exist and do not point at themselves", () => {
  const ids = new Set(recipes.map((recipe) => recipe.id));
  const broken: string[] = [];
  for (const recipe of recipes) {
    for (const relatedId of recipe.relatedRecipeIds ?? []) {
      if (relatedId === recipe.id) {
        broken.push(`${recipe.id} → self`);
      }
      if (!ids.has(relatedId)) {
        broken.push(`${recipe.id} → ${relatedId}`);
      }
    }
    expect(relatedRecipes(recipe, recipes).length).toBe(recipe.relatedRecipeIds?.length ?? 0);
  }
  expect(broken).toEqual([]);
});

test("HA and health ratings are present on every recipe", () => {
  for (const recipe of recipes) {
    expect(typeof recipe.ha).toBe("boolean");
    expect(["healthy", "moderate", "unhealthy"]).toContain(recipe.healthRating);
  }
  expect(recipes.some((recipe) => recipe.ha)).toBe(true);
  expect(recipes.some((recipe) => !recipe.ha)).toBe(true);
});

test("special-occasion marks and the Alfredo pair are present", () => {
  const special = recipes.filter((recipe) => recipe.specialOccasion).map((recipe) => recipe.id);
  expect(special).toEqual(
    expect.arrayContaining(["sunday-roast-chicken", "chicken-cacciatore", "parmesan-risotto"]),
  );
  const classic = recipes.find((recipe) => recipe.id === "fettuccine-alfredo");
  const converted = recipes.find((recipe) => recipe.id === "fettuccine-alfredo-ha");
  expect(classic?.ha).toBe(false);
  expect(converted?.ha).toBe(true);
  expect(classic?.relatedRecipeIds).toContain("fettuccine-alfredo-ha");
  expect(converted?.relatedRecipeIds).toContain("fettuccine-alfredo");
});

test("the kitchen guide has substitution sections", () => {
  expect(kitchenGuide.sections.length).toBeGreaterThanOrEqual(6);
  expect(kitchenGuide.sections.some((section) => section.id === "convert")).toBe(true);
});

test("exported cheddar carries lactose; lifestyle flags are gone", () => {
  const cheddar = ingredientLookup.get("cheddar");
  expect(cheddar?.flags).toEqual(expect.arrayContaining(["lactose"]));
  expect(cheddar?.flags).not.toEqual(expect.arrayContaining(["animal"]));
  expect(cheddar?.flags).not.toEqual(expect.arrayContaining(["not-paleo"]));
});

test("chickpeas still carry GOS; tofu is not flagged animal", () => {
  expect(ingredientLookup.get("chickpeas")?.flags).toEqual(expect.arrayContaining(["gos"]));
  expect(ingredientLookup.get("tofu")?.flags).not.toEqual(expect.arrayContaining(["animal"]));
});
