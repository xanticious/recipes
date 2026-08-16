import { expect, test } from "vitest";
import { ingredientHaStatus, ingredientIsHa } from "./ha.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

test("ingredients are pending until an ha field is set", () => {
  expect(ingredientHaStatus(item({ id: "white-rice", name: "rice", kind: "grain" }))).toBe(
    "pending",
  );
  expect(ingredientHaStatus(item({ id: "chicken-breast", name: "chicken", kind: "protein" }))).toBe(
    "pending",
  );
  expect(
    ingredientHaStatus(item({ id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] })),
  ).toBe("pending");
  expect(
    ingredientHaStatus(item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] })),
  ).toBe("pending");
  expect(ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain" }))).toBe(false);
});

test("an explicit ha field is the displayed status", () => {
  expect(
    ingredientHaStatus(
      item({ id: "mystery", name: "mystery", kind: "other", flags: [], ha: "yes" }),
    ),
  ).toBe("yes");
  expect(
    ingredientHaStatus(
      item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"], ha: "no" }),
    ),
  ).toBe("no");
  expect(
    ingredientHaStatus(
      item({ id: "sourdough-bread", name: "sourdough bread", kind: "grain", ha: "pending" }),
    ),
  ).toBe("pending");
  expect(ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain", ha: "yes" }))).toBe(
    true,
  );
});
