import { expect, test } from "vitest";
import { parseHash, routesEqual, routeToHash, type Route } from "./routing.ts";

test("parseHash reads landing, explore, eat-out, random, recipe, guide, ingredients, and restaurants urls", () => {
  expect(parseHash("")).toEqual({ name: "landing" });
  expect(parseHash("#/")).toEqual({ name: "landing" });
  expect(parseHash("#/recipes")).toEqual({ name: "explore" });
  expect(parseHash("#/eat-out")).toEqual({ name: "eatOut" });
  expect(parseHash("#/random")).toEqual({ name: "random" });
  expect(parseHash("#/guide")).toEqual({ name: "guide" });
  expect(parseHash("#/guides")).toEqual({ name: "guide" });
  expect(parseHash("#/ingredients")).toEqual({ name: "ingredients" });
  expect(parseHash("#/fodmap-ingredients")).toEqual({ name: "ingredients" });
  expect(parseHash("#/restaurants")).toEqual({ name: "restaurants" });
  expect(parseHash("#/ingredient-categorizer")).toEqual({ name: "ingredientCategorizer" });
  expect(parseHash("#/recipes/chili")).toEqual({
    name: "recipe",
    id: "chili",
    fromRandom: false,
  });
  expect(parseHash("#/recipes/chili?from=random")).toEqual({
    name: "recipe",
    id: "chili",
    fromRandom: true,
  });
});

test("routeToHash round-trips", () => {
  const routes: Route[] = [
    { name: "landing" },
    { name: "explore" },
    { name: "eatOut" },
    { name: "random" },
    { name: "guide" },
    { name: "ingredients" },
    { name: "restaurants" },
    { name: "ingredientCategorizer" },
    { name: "recipe", id: "chili", fromRandom: false },
    { name: "recipe", id: "chili", fromRandom: true },
  ];
  for (const route of routes) {
    expect(parseHash(routeToHash(route))).toEqual(route);
  }
});

test("routesEqual compares recipe identity and the random flag", () => {
  expect(routesEqual({ name: "explore" }, { name: "explore" })).toBe(true);
  expect(
    routesEqual(
      { name: "recipe", id: "a", fromRandom: true },
      { name: "recipe", id: "a", fromRandom: false },
    ),
  ).toBe(false);
  expect(routesEqual({ name: "guide" }, { name: "explore" })).toBe(false);
});
