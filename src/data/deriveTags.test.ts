import { expect, test } from "vitest";
import { deriveTags, indexIngredients, recipeTotalMinutes } from "./deriveTags.ts";
import type { Ingredient, Recipe } from "./types.ts";

const catalog = indexIngredients([
  { id: "rice", name: "rice", kind: "grain", flags: [] },
  { id: "chicken", name: "chicken", kind: "protein", flags: [] },
  { id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] },
  { id: "honey", name: "honey", kind: "sweetener", flags: ["fructose"] },
  { id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] },
  { id: "lactose-free-cheddar", name: "lactose-free cheddar", kind: "dairy", flags: [] },
  { id: "black-beans", name: "black beans", kind: "protein", flags: ["gos"] },
  { id: "apple", name: "apple", kind: "produce", flags: ["fructose", "sorbitol"] },
  { id: "mushroom", name: "mushrooms", kind: "produce", flags: ["mannitol"] },
  { id: "wheat-flour", name: "wheat flour", kind: "grain", flags: ["gluten", "fructan"] },
  { id: "sourdough-bread", name: "sourdough", kind: "grain", flags: [] },
  { id: "olive-oil", name: "olive oil", kind: "fat", flags: [] },
] satisfies Ingredient[]);

function recipe(partial: Partial<Recipe> & Pick<Recipe, "ingredients">): Recipe {
  return {
    id: "test",
    title: "Test",
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 4,
    steps: ["Cook."],
    ...partial,
  };
}

test("plain chicken and rice earns every diet tag", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [
        { ingredientId: "chicken", amount: 1, unit: "lb" },
        { ingredientId: "rice", amount: 1, unit: "cup" },
        { ingredientId: "olive-oil", amount: 1, unit: "tbsp" },
      ],
    }),
    catalog,
  );

  expect(tags).toEqual(
    expect.arrayContaining([
      "gluten-free",
      "lactose-free",
      "low-fructose",
      "low-fructan",
      "low-gos",
      "low-sorbitol",
      "low-mannitol",
      "low-oligosaccharide",
      "low-polyol",
      "low-fodmap",
      "low-fop",
    ]),
  );
});

test("garlic blocks low-fructan, oligosaccharide, low-fodmap, and low-fop", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [
        { ingredientId: "chicken", amount: 1, unit: "lb" },
        { ingredientId: "garlic", amount: 2, unit: "clove" },
      ],
    }),
    catalog,
  );

  expect(tags).toContain("gluten-free");
  expect(tags).toContain("lactose-free");
  expect(tags).not.toContain("low-fructan");
  expect(tags).not.toContain("low-oligosaccharide");
  expect(tags).not.toContain("low-fodmap");
  expect(tags).not.toContain("low-fop");
});

test("optional cheese does not block lactose-free", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [
        { ingredientId: "chicken", amount: 1, unit: "lb" },
        { ingredientId: "cheddar", amount: 0.5, unit: "cup", optional: true },
      ],
    }),
    catalog,
  );

  expect(tags).toContain("lactose-free");
});

test("a lactose-free substitution lets the recipe earn lactose-free", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [
        { ingredientId: "chicken", amount: 1, unit: "lb" },
        {
          ingredientId: "cheddar",
          amount: 0.5,
          unit: "cup",
          substitutions: ["lactose-free-cheddar"],
        },
      ],
    }),
    catalog,
  );

  expect(tags).toContain("lactose-free");
});

test("sourdough does not block gluten-free or low-fructan", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "sourdough-bread", amount: 2, unit: "slice" }],
    }),
    catalog,
  );

  expect(tags).toContain("gluten-free");
  expect(tags).toContain("low-fructan");
});

test("wheat flour blocks gluten-free and low-fructan", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "wheat-flour", amount: 1, unit: "cup" }],
    }),
    catalog,
  );

  expect(tags).not.toContain("gluten-free");
  expect(tags).not.toContain("low-fructan");
});

test("low-fop does not require lactose-free", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [
        { ingredientId: "rice", amount: 1, unit: "cup" },
        { ingredientId: "cheddar", amount: 0.25, unit: "cup" },
      ],
    }),
    catalog,
  );

  expect(tags).not.toContain("lactose-free");
  expect(tags).not.toContain("low-fodmap");
  expect(tags).toContain("low-fop");
});

test("beans block low-gos and therefore low-fop", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "black-beans", amount: 1, unit: "cup" }],
    }),
    catalog,
  );

  expect(tags).not.toContain("low-gos");
  expect(tags).not.toContain("low-oligosaccharide");
  expect(tags).not.toContain("low-fop");
});

test("apple blocks fructose and sorbitol", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "apple", amount: 1, unit: null }],
    }),
    catalog,
  );

  expect(tags).not.toContain("low-fructose");
  expect(tags).not.toContain("low-sorbitol");
  expect(tags).not.toContain("low-polyol");
  expect(tags).not.toContain("low-fop");
});

test("mushrooms block low-mannitol", () => {
  const tags = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "mushroom", amount: 1, unit: "cup" }],
    }),
    catalog,
  );

  expect(tags).not.toContain("low-mannitol");
  expect(tags).not.toContain("low-polyol");
});

test("tagOverrides can force a tag on or off", () => {
  const forcedOff = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "rice", amount: 1, unit: "cup" }],
      tagOverrides: { "gluten-free": false },
    }),
    catalog,
  );
  expect(forcedOff).not.toContain("gluten-free");

  const forcedOn = deriveTags(
    recipe({
      ingredients: [{ ingredientId: "wheat-flour", amount: 1, unit: "cup" }],
      tagOverrides: { "gluten-free": true },
    }),
    catalog,
  );
  expect(forcedOn).toContain("gluten-free");
});

test("recipeTotalMinutes uses stored total or prep plus cook", () => {
  expect(recipeTotalMinutes(recipe({ ingredients: [], totalMinutes: 45 }))).toBe(45);
  expect(recipeTotalMinutes(recipe({ ingredients: [] }))).toBe(30);
});
