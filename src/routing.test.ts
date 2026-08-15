import { expect, test } from "vitest";
import { parseHash, routesEqual, routeToHash } from "./routing.ts";

test("parseHash reads landing, explore, random, and recipe urls", () => {
  expect(parseHash("")).toEqual({ name: "landing" });
  expect(parseHash("#/")).toEqual({ name: "landing" });
  expect(parseHash("#/recipes")).toEqual({ name: "explore" });
  expect(parseHash("#/random")).toEqual({ name: "random" });
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
  const routes = [
    { name: "landing" as const },
    { name: "explore" as const },
    { name: "random" as const },
    { name: "recipe" as const, id: "chili", fromRandom: false },
    { name: "recipe" as const, id: "chili", fromRandom: true },
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
});
