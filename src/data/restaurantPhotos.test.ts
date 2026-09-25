import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { restaurants } from "./restaurants/index.ts";
import {
  RESTAURANT_PHOTOS,
  restaurantPhoto,
  restaurantPhotoFileId,
  restaurantPhotoUrl,
} from "./restaurantPhotos.ts";

test("restaurant photo lookup is empty or points at a catalog restaurant", () => {
  for (const id of Object.keys(RESTAURANT_PHOTOS)) {
    expect(restaurants.some((restaurant) => restaurant.id === id)).toBe(true);
    const photo = restaurantPhoto(id);
    expect(photo).toBeDefined();
    expect(
      photo?.source === "generated" ||
        (photo?.source === "streetview" && photo.creditUrl.length > 0),
    ).toBe(true);
    const fileId = restaurantPhotoFileId(id);
    expect(restaurantPhotoUrl(id)).toBe(`/restaurants/${fileId}.jpg`);
    expect(existsSync(path.join("public", "restaurants", `${fileId}.jpg`))).toBe(true);
  }
  expect(restaurantPhotoUrl("not-a-restaurant")).toBeUndefined();
});
