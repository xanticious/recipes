import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { mealIdeas } from "./mealIdeas.ts";
import {
  MEAL_IDEA_PHOTOS,
  mealIdeaPhoto,
  mealIdeaPhotoUrl,
  mealIdeaPlaceholderHue,
} from "./mealIdeaPhotos.ts";

test("placeholder hue is stable and in 0–359", () => {
  expect(mealIdeaPlaceholderHue("cereal-and-milk")).toBe(mealIdeaPlaceholderHue("cereal-and-milk"));
  expect(mealIdeaPlaceholderHue("cereal-and-milk")).not.toBe(mealIdeaPlaceholderHue("pizza-night"));
  expect(mealIdeaPlaceholderHue("pizza-night")).toBeGreaterThanOrEqual(0);
  expect(mealIdeaPlaceholderHue("pizza-night")).toBeLessThan(360);
});

test("photo lookup is empty or points at a catalog meal idea", () => {
  for (const id of Object.keys(MEAL_IDEA_PHOTOS)) {
    expect(mealIdeas.some((idea) => idea.id === id)).toBe(true);
    expect(mealIdeaPhoto(id)?.unsplashId.length).toBeGreaterThan(0);
    expect(mealIdeaPhotoUrl(id)).toBe(`/meal-ideas/${id}.jpg`);
    expect(existsSync(path.join("public", "meal-ideas", `${id}.jpg`))).toBe(true);
  }
  expect(mealIdeaPhotoUrl("not-a-meal-idea")).toBeUndefined();
});
