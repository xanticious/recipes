import { expect, test } from "vitest";
import { deriveTags, deriveTagsForSelections, recipeTotalMinutes } from "./deriveTags.ts";
import { indexIngredients } from "./lookup.ts";
import type { Ingredient, Recipe } from "./types.ts";

const catalog = indexIngredients([
  { id: "rice", name: "rice", kind: "grain", flags: ["not-keto", "not-paleo", "not-carnivore"] },
  { id: "chicken", name: "chicken", kind: "protein", flags: ["animal"] },
  { id: "garlic", name: "garlic", kind: "produce", flags: ["fructan", "not-carnivore"] },
  {
    id: "honey",
    name: "honey",
    kind: "sweetener",
    flags: ["fructose", "animal", "not-keto", "not-carnivore"],
  },
  { id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose", "animal", "not-paleo"] },
  {
    id: "lactose-free-cheddar",
    name: "lactose-free cheddar",
    kind: "dairy",
    flags: ["animal", "not-paleo"],
  },
  {
    id: "black-beans",
    name: "black beans",
    kind: "protein",
    flags: ["gos", "not-keto", "not-paleo", "not-carnivore"],
  },
  {
    id: "apple",
    name: "apple",
    kind: "produce",
    flags: ["fructose", "sorbitol", "not-keto", "not-carnivore"],
  },
  { id: "mushroom", name: "mushrooms", kind: "produce", flags: ["mannitol", "not-carnivore"] },
  {
    id: "wheat-flour",
    name: "wheat flour",
    kind: "grain",
    flags: ["gluten", "fructan", "not-keto", "not-paleo", "not-carnivore"],
  },
  {
    id: "sourdough-bread",
    name: "sourdough",
    kind: "grain",
    flags: ["not-keto", "not-paleo", "not-carnivore"],
  },
  { id: "olive-oil", name: "olive oil", kind: "fat", flags: ["not-carnivore"] },
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

test("plain chicken and rice earns the FODMAP tags but not vegan or keto", () => {
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
  expect(tags).not.toContain("vegan");
  expect(tags).not.toContain("keto");
  expect(tags).not.toContain("paleo");
  expect(tags).not.toContain("carnivore");
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

test("as-written cheddar blocks lactose-free; a listed swap unlocks it", () => {
  const dish = recipe({
    ingredients: [
      { ingredientId: "chicken", amount: 1, unit: "lb" },
      {
        slot: "cheese",
        ingredientId: "cheddar",
        amount: 0.5,
        unit: "cup",
        substitutions: [
          {
            tags: ["lactose-free"],
            options: [{ ingredientId: "lactose-free-cheddar" }],
          },
        ],
      },
    ],
  });

  expect(deriveTags(dish, catalog, "as-written")).not.toContain("lactose-free");
  expect(deriveTags(dish, catalog, "with-alterations")).toContain("lactose-free");
});

test("selecting a lactose-free swap updates this-version tags", () => {
  const dish = recipe({
    ingredients: [
      { ingredientId: "chicken", amount: 1, unit: "lb" },
      {
        slot: "cheese",
        ingredientId: "cheddar",
        amount: 0.5,
        unit: "cup",
        substitutions: [
          {
            tags: ["lactose-free"],
            options: [
              { ingredientId: null, label: "Leave cheese out" },
              { ingredientId: "lactose-free-cheddar" },
            ],
          },
        ],
      },
    ],
  });

  expect(deriveTagsForSelections(dish, catalog, {})).not.toContain("lactose-free");
  expect(
    deriveTagsForSelections(dish, catalog, { cheese: { tag: "lactose-free", optionIndex: 0 } }),
  ).toContain("lactose-free");
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
