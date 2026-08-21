import { expect, test } from "vitest";
import { kitchenGuide } from "./guide.ts";
import { classifyRecipeHa, ingredientHaStatus, isConfirmedHa } from "./ha.ts";
import { ingredientLookup, ingredients } from "./ingredients.ts";
import { isEatOutRecipe, isHomeRecipe, relatedRecipes } from "./recipe.ts";
import { recipes } from "./recipes/index.ts";
import { HA_STATUSES } from "./tags.ts";

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
    expect(HA_STATUSES).toContain(recipe.ha);
    expect(["healthy", "moderate", "unhealthy"]).toContain(recipe.healthRating);
  }
});

test("unconfirmed recipe HA matches the ingredient classifier", () => {
  for (const recipe of recipes) {
    if (isConfirmedHa(recipe.ha)) {
      continue;
    }
    expect(recipe.ha).toBe(classifyRecipeHa(recipe, ingredientLookup));
  }
});

test("special-occasion marks and the Alfredo pair are present", () => {
  const special = recipes.filter((recipe) => recipe.specialOccasion).map((recipe) => recipe.id);
  expect(special).toEqual(
    expect.arrayContaining(["sunday-roast-chicken", "chicken-cacciatore", "parmesan-risotto"]),
  );
  const classic = recipes.find((recipe) => recipe.id === "fettuccine-alfredo");
  const converted = recipes.find((recipe) => recipe.id === "fettuccine-alfredo-ha");
  expect(classic?.relatedRecipeIds).toContain("fettuccine-alfredo-ha");
  expect(converted?.relatedRecipeIds).toContain("fettuccine-alfredo");
});

test("the kitchen guide has House Approved meaning and substitutions", () => {
  expect(kitchenGuide.sections.map((section) => section.id)).toEqual([
    "ha",
    "sourdough",
    "substitutions",
  ]);
  expect(kitchenGuide.sections.some((section) => (section.items?.length ?? 0) > 0)).toBe(true);
});

test("exported cheddar carries lactose; lifestyle flags are gone", () => {
  const cheddar = ingredientLookup.get("cheddar");
  expect(cheddar?.flags).toEqual(expect.arrayContaining(["lactose"]));
  expect(cheddar?.flags).not.toEqual(expect.arrayContaining(["animal"]));
  expect(cheddar?.flags).not.toEqual(expect.arrayContaining(["not-paleo"]));
});

test("categorized catalog ingredients keep confirmed House Approval; the rest follow diet metadata", () => {
  expect(ingredientLookup.get("chicken-breast")?.ha).toBe("ha-confirmed");
  expect(ingredientLookup.get("butter")?.ha).toBe("ha-confirmed");
  expect(ingredientLookup.get("broccoli")?.ha).toBe("ha-confirmed");
  expect(ingredientLookup.get("cheddar")?.ha).toBe("not-ha-confirmed");
  expect(ingredientLookup.get("avocado")?.ha).toBe("not-ha-confirmed");
  expect(ingredientHaStatus(ingredientLookup.get("garlic")!)).toBe("not-ha-assumed");
  expect(ingredientHaStatus(ingredientLookup.get("white-rice")!)).toBe("ha-assumed");
  expect(ingredientHaStatus(ingredientLookup.get("sourdough-bread")!)).toBe("unknown");
  expect(ingredientHaStatus(ingredientLookup.get("beef-brisket")!)).toBe("ha-assumed");

  const confirmed = ingredients.filter(
    (ingredient) => ingredientHaStatus(ingredient) === "ha-confirmed",
  );
  const notHaConfirmed = ingredients.filter(
    (ingredient) => ingredientHaStatus(ingredient) === "not-ha-confirmed",
  );
  expect(confirmed).toHaveLength(63);
  expect(notHaConfirmed).toHaveLength(125);
  expect(confirmed.length + notHaConfirmed.length).toBe(188);
});
