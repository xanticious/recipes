import { existsSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { ingredients } from "./ingredients.ts";
import {
  INGREDIENT_PHOTOS,
  ingredientPhoto,
  ingredientPhotoUrl,
  ingredientPlaceholderHue,
  ingredientPlaceholderLabel,
} from "./ingredientPhotos.ts";

test("placeholder hue is stable and in 0–359", () => {
  expect(ingredientPlaceholderHue("bok-choy")).toBe(ingredientPlaceholderHue("bok-choy"));
  expect(ingredientPlaceholderHue("bok-choy")).not.toBe(ingredientPlaceholderHue("garlic"));
  expect(ingredientPlaceholderHue("garlic")).toBeGreaterThanOrEqual(0);
  expect(ingredientPlaceholderHue("garlic")).toBeLessThan(360);
});

test("placeholder label uses the ingredient name", () => {
  expect(ingredientPlaceholderLabel({ name: "bok choy" })).toBe("Bok choy");
  expect(ingredientPlaceholderLabel({ name: "garlic" })).toBe("Garlic");
});

test("photo lookup is empty or points at a catalog ingredient", () => {
  for (const id of Object.keys(INGREDIENT_PHOTOS)) {
    expect(ingredients.some((ingredient) => ingredient.id === id)).toBe(true);
    expect(ingredientPhoto(id)?.unsplashId.length).toBeGreaterThan(0);
    expect(ingredientPhotoUrl(id)).toBe(`/ingredients/${id}.jpg`);
    expect(existsSync(path.join("public", "ingredients", `${id}.jpg`))).toBe(true);
  }
  expect(ingredientPhotoUrl("not-an-ingredient")).toBeUndefined();
});
