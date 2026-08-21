import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { restaurants } from "./restaurants/index.ts";
import { RESTAURANT_PHOTOS, restaurantPhoto, restaurantPhotoUrl } from "./restaurantPhotos.ts";

test("restaurant photo lookup is empty or points at a catalog restaurant", () => {
  for (const id of Object.keys(RESTAURANT_PHOTOS)) {
    expect(restaurants.some((restaurant) => restaurant.id === id)).toBe(true);
    expect(restaurantPhoto(id)?.creditUrl.length).toBeGreaterThan(0);
    expect(restaurantPhotoUrl(id)).toBe(`/restaurants/${id}.jpg`);
    expect(existsSync(path.join("public", "restaurants", `${id}.jpg`))).toBe(true);
  }
  expect(restaurantPhotoUrl("not-a-restaurant")).toBeUndefined();
});
