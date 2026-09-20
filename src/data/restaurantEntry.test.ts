import { expect, test } from "vitest";
import { restaurant } from "./restaurantEntry.ts";

test("restaurant builds a catalog entry with favorites off", () => {
  expect(
    restaurant(
      "sills",
      "Sill's Cafe",
      "layton",
      "Breakfast.",
      ["breakfast", "american"],
      ["Pancakes"],
    ),
  ).toEqual({
    id: "sills",
    name: "Sill's Cafe",
    city: "layton",
    description: "Breakfast.",
    cuisines: ["breakfast", "american"],
    popularMenuItems: ["Pancakes"],
    isFavorite: false,
  });
  expect(restaurant("solo", "Solo", "layton", "One type.", ["american"]).popularMenuItems).toEqual(
    [],
  );
});
