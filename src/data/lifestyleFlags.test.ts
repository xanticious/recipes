import { expect, test } from "vitest";
import { lifestyleFlagsFor } from "./lifestyleFlags.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Pick<Ingredient, "id" | "kind">): Ingredient {
  return { ...partial, name: partial.id, flags: [] };
}

test("dairy and meat block vegan; tofu does not", () => {
  expect(lifestyleFlagsFor(item({ id: "cheddar", kind: "dairy" }))).toContain("animal");
  expect(lifestyleFlagsFor(item({ id: "ground-beef", kind: "protein" }))).toContain("animal");
  expect(lifestyleFlagsFor(item({ id: "tofu", kind: "protein" }))).not.toContain("animal");
});

test("grains and potatoes block keto; eggs and almond flour do not", () => {
  expect(lifestyleFlagsFor(item({ id: "white-rice", kind: "grain" }))).toContain("not-keto");
  expect(lifestyleFlagsFor(item({ id: "potato", kind: "produce" }))).toContain("not-keto");
  expect(lifestyleFlagsFor(item({ id: "egg", kind: "protein" }))).not.toContain("not-keto");
  expect(lifestyleFlagsFor(item({ id: "almond-flour", kind: "grain" }))).not.toContain("not-keto");
});

test("dairy and legumes block paleo; olive oil does not", () => {
  expect(lifestyleFlagsFor(item({ id: "cheddar", kind: "dairy" }))).toContain("not-paleo");
  expect(lifestyleFlagsFor(item({ id: "chickpeas", kind: "protein" }))).toContain("not-paleo");
  expect(lifestyleFlagsFor(item({ id: "olive-oil", kind: "fat" }))).not.toContain("not-paleo");
});

test("plants block carnivore; meat, eggs, and dairy do not", () => {
  expect(lifestyleFlagsFor(item({ id: "tomato", kind: "produce" }))).toContain("not-carnivore");
  expect(lifestyleFlagsFor(item({ id: "olive-oil", kind: "fat" }))).toContain("not-carnivore");
  expect(lifestyleFlagsFor(item({ id: "ground-beef", kind: "protein" }))).not.toContain(
    "not-carnivore",
  );
  expect(lifestyleFlagsFor(item({ id: "egg", kind: "protein" }))).not.toContain("not-carnivore");
  expect(lifestyleFlagsFor(item({ id: "cheddar", kind: "dairy" }))).not.toContain("not-carnivore");
});
