import { expect, test } from "vitest";
import {
  eatOutRestaurantBrands,
  eatOutRestaurantNames,
  eatOutRestaurants,
  eatOutSearchHaystack,
} from "./eatOutRestaurants.ts";
import type { EatOutRecipe } from "./types.ts";

function order(restaurantIds: readonly string[], title = "An order"): EatOutRecipe {
  return {
    id: "test-order",
    title,
    mealType: "dinner",
    cuisine: "asian",
    specialOccasion: false,
    ha: "ha-confirmed",
    healthRating: "moderate",
    eatOut: true,
    restaurantIds,
    description: "Order it.",
  };
}

test("eatOutRestaurants resolves catalog rows and skips missing ids", () => {
  const places = eatOutRestaurants(
    order(["joy-luck-bountiful", "missing-place", "joy-luck-bountiful"]),
  );
  expect(places.map((place) => place.id)).toEqual(["joy-luck-bountiful", "joy-luck-bountiful"]);
  expect(eatOutRestaurants(order([]))).toEqual([]);
});

test("eatOutRestaurantNames and brands collapse franchise store labels", () => {
  const chick = order([
    "chick-fil-a-centerville",
    "chick-fil-a-layton",
    "chick-fil-a-antelope-layton",
  ]);
  expect(eatOutRestaurantNames(chick)).toEqual([
    "Chick-fil-A",
    "Chick-fil-A (Layton Hills Mall)",
    "Chick-fil-A (Antelope)",
  ]);
  expect(new Set(eatOutRestaurantNames(chick)).size).toBe(3);
  expect(eatOutRestaurantBrands(chick)).toEqual(["Chick-fil-A"]);
});

test("eatOutSearchHaystack includes title, restaurant name, and city", () => {
  const haystack = eatOutSearchHaystack(
    order(["joy-luck-bountiful"], "Egg drop soup, white rice, GF Strawberry Chicken (HA)"),
  ).toLowerCase();
  expect(haystack).toContain("egg drop soup");
  expect(haystack).toContain("joy luck");
  expect(haystack).toContain("bountiful");
});
