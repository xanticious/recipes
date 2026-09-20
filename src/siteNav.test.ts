import { expect, test } from "vitest";
import { navItemIsCurrent, PRIMARY_NAV, sectionTitle } from "./siteNav.ts";

test("sectionTitle names each route", () => {
  expect(sectionTitle({ name: "landing" })).toBe("Home");
  expect(sectionTitle({ name: "explore" })).toBe("Recipes");
  expect(sectionTitle({ name: "recipe", id: "chili", fromRandom: false })).toBe("Recipes");
  expect(sectionTitle({ name: "eatOut" })).toBe("Eat Out");
  expect(sectionTitle({ name: "restaurants" })).toBe("Restaurants");
  expect(sectionTitle({ name: "ingredients" })).toBe("Ingredients");
  expect(sectionTitle({ name: "guide" })).toBe("Guide");
  expect(sectionTitle({ name: "random" })).toBe("Random");
  expect(sectionTitle({ name: "mealIdeas" })).toBe("Meal Ideas");
  expect(sectionTitle({ name: "ingredientCategorizer" })).toBe("Ingredient categorizer");
});

test("Recipes stays current while reading a recipe", () => {
  const recipesItem = PRIMARY_NAV.find((item) => item.label === "Recipes");
  const eatOutItem = PRIMARY_NAV.find((item) => item.label === "Eat Out");
  if (!recipesItem || !eatOutItem) {
    throw new Error("missing nav items");
  }
  expect(navItemIsCurrent({ name: "explore" }, recipesItem)).toBe(true);
  expect(navItemIsCurrent({ name: "recipe", id: "chili", fromRandom: false }, recipesItem)).toBe(
    true,
  );
  expect(navItemIsCurrent({ name: "recipe", id: "chili", fromRandom: false }, eatOutItem)).toBe(
    false,
  );
  expect(navItemIsCurrent({ name: "eatOut" }, eatOutItem)).toBe(true);
});
