import { expect, test } from "vitest";
import { ingredientIsHa } from "./ha.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

test("plain rice and chicken are HA; problem foods are not", () => {
  expect(ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain" }))).toBe(true);
  expect(ingredientIsHa(item({ id: "chicken-breast", name: "chicken", kind: "protein" }))).toBe(
    true,
  );
  expect(
    ingredientIsHa(item({ id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] })),
  ).toBe(false);
  expect(
    ingredientIsHa(item({ id: "honey", name: "honey", kind: "sweetener", flags: ["fructose"] })),
  ).toBe(false);
  expect(
    ingredientIsHa(item({ id: "wheat-flour", name: "flour", kind: "grain", flags: ["gluten"] })),
  ).toBe(false);
});

test("garlic and onion are not HA; chives are", () => {
  expect(
    ingredientIsHa(item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] })),
  ).toBe(false);
  expect(
    ingredientIsHa(item({ id: "onion", name: "onion", kind: "produce", flags: ["fructan"] })),
  ).toBe(false);
  expect(ingredientIsHa(item({ id: "chives", name: "chives", kind: "produce" }))).toBe(true);
});

test("broccoli fructan does not block HA; cauliflower mannitol does", () => {
  expect(
    ingredientIsHa(item({ id: "broccoli", name: "broccoli", kind: "produce", flags: ["fructan"] })),
  ).toBe(true);
  expect(
    ingredientIsHa(
      item({ id: "cauliflower", name: "cauliflower", kind: "produce", flags: ["mannitol"] }),
    ),
  ).toBe(false);
});

test("cooked mushrooms are treated as HA even with a mannitol flag", () => {
  expect(
    ingredientIsHa(
      item({ id: "mushroom", name: "mushrooms", kind: "produce", flags: ["mannitol"] }),
    ),
  ).toBe(true);
});
