import { expect, test } from "vitest";
import { getIngredient, indexIngredients } from "./lookup.ts";
import type { Ingredient } from "./types.ts";

const garlic: Ingredient = { id: "garlic", name: "garlic", kind: "produce", flags: [] };

test("indexIngredients maps ids and getIngredient throws when missing", () => {
  const lookup = indexIngredients([garlic]);
  expect(getIngredient(lookup, "garlic")).toBe(garlic);
  expect(() => getIngredient(lookup, "missing")).toThrow("Unknown ingredient: missing");
});
