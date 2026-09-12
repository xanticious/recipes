import { expect, test } from "vitest";
import { getRestaurant, restaurantLookup, restaurants } from "./index.ts";

test("getRestaurant looks up catalog rows by id", () => {
  const sills = restaurants.find((item) => item.id === "sills-cafe-layton");
  expect(sills).toBeDefined();
  expect(restaurantLookup.get("sills-cafe-layton")).toBe(sills);
  expect(getRestaurant("sills-cafe-layton")).toBe(sills);
  expect(getRestaurant("not-a-restaurant")).toBeUndefined();
});
