import { expect, test } from "vitest";
import {
  filterIngredients,
  groupIngredients,
  ingredientSection,
  ingredientsInBrowseOrder,
  isIngredientSection,
  recipesByIngredientId,
  recipesUsingIngredient,
} from "./ingredientBrowse.ts";
import { ingredients } from "./ingredients.ts";
import type { HomeRecipe, Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

function home(partial: Partial<HomeRecipe> & Pick<HomeRecipe, "id" | "title">): HomeRecipe {
  return {
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    ha: "yes",
    healthRating: "healthy",
    eatOut: false,
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [{ ingredientId: "rice", amount: 1, unit: "cup" }],
    steps: ["Cook."],
    ...partial,
  };
}

test("grocery sections match the catalog kinds", () => {
  expect(ingredientSection(item({ id: "chicken-breast", name: "chicken", kind: "protein" }))).toBe(
    "meat",
  );
  expect(ingredientSection(item({ id: "salmon", name: "salmon", kind: "protein" }))).toBe(
    "seafood",
  );
  expect(ingredientSection(item({ id: "egg", name: "eggs", kind: "protein" }))).toBe("eggs");
  expect(ingredientSection(item({ id: "tofu", name: "tofu", kind: "protein" }))).toBe("beans");
  expect(ingredientSection(item({ id: "cheddar", name: "cheddar", kind: "dairy" }))).toBe("dairy");
  expect(ingredientSection(item({ id: "garlic", name: "garlic", kind: "produce" }))).toBe(
    "vegetables",
  );
  expect(ingredientSection(item({ id: "apple", name: "apple", kind: "produce" }))).toBe("fruit");
  expect(ingredientSection(item({ id: "basil", name: "basil", kind: "produce" }))).toBe("herbs");
  expect(ingredientSection(item({ id: "cumin", name: "cumin", kind: "spice" }))).toBe("spices");
});

test("every catalog ingredient lands in a section and grouping covers the book", () => {
  const grouped = groupIngredients(ingredients);
  const ids = grouped.flatMap((group) => group.ingredients.map((ingredient) => ingredient.id));
  expect(new Set(ids).size).toBe(ingredients.length);
  expect(grouped.map((group) => group.section)).toEqual(
    expect.arrayContaining(["meat", "dairy", "vegetables", "spices"]),
  );
});

test("browse order is grocery section then alphabetical name", () => {
  const zucchini = item({ id: "zucchini", name: "zucchini", kind: "produce" });
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce" });
  const apple = item({ id: "apple", name: "apple", kind: "produce" });
  const chicken = item({ id: "chicken-breast", name: "chicken", kind: "protein" });
  const catalog = [zucchini, apple, chicken, garlic];
  expect(groupIngredients(catalog).map((group) => group.section)).toEqual([
    "meat",
    "vegetables",
    "fruit",
  ]);
  expect(ingredientsInBrowseOrder(catalog).map((ingredient) => ingredient.id)).toEqual([
    "chicken-breast",
    "garlic",
    "zucchini",
    "apple",
  ]);
});

test("HA filter, category, and name search combine", () => {
  const garlic = item({
    id: "garlic",
    name: "garlic",
    kind: "produce",
    flags: ["fructan"],
    ha: "no",
  });
  const rice = item({ id: "white-rice", name: "white rice", kind: "grain", ha: "yes" });
  const chicken = item({ id: "chicken-breast", name: "chicken", kind: "protein", ha: "yes" });
  const banana = item({
    id: "banana",
    name: "banana",
    kind: "produce",
    flags: ["fructan"],
    ha: "pending",
  });
  const catalog = [garlic, rice, chicken, banana];
  expect(filterIngredients(catalog, { ha: "yes" }).map((ingredient) => ingredient.id)).toEqual([
    "white-rice",
    "chicken-breast",
  ]);
  expect(filterIngredients(catalog, { ha: "no" }).map((ingredient) => ingredient.id)).toEqual([
    "garlic",
  ]);
  expect(filterIngredients(catalog, { ha: "pending" }).map((ingredient) => ingredient.id)).toEqual([
    "banana",
  ]);
  expect(filterIngredients(catalog, { query: "RICE" }).map((ingredient) => ingredient.id)).toEqual([
    "white-rice",
  ]);
  expect(
    filterIngredients(catalog, { section: "meat" }).map((ingredient) => ingredient.id),
  ).toEqual(["chicken-breast"]);
  expect(
    filterIngredients(catalog, { section: "grains", query: "rice" }).map(
      (ingredient) => ingredient.id,
    ),
  ).toEqual(["white-rice"]);
});

test("isIngredientSection accepts grocery sections and rejects empty", () => {
  expect(isIngredientSection("meat")).toBe(true);
  expect(isIngredientSection("pantry")).toBe(true);
  expect(isIngredientSection("")).toBe(false);
  expect(isIngredientSection("protein")).toBe(false);
});

test("recipesUsingIngredient lists home recipes and skips eat-out", () => {
  const chili = home({
    id: "chili",
    title: "Chili",
    ingredients: [
      { ingredientId: "beef", amount: 1, unit: "lb" },
      { ingredientId: "beef", amount: 1, unit: "pinch" },
    ],
  });
  const oats = home({
    id: "oats",
    title: "Oats",
    ingredients: [{ ingredientId: "gf-oats", amount: 1, unit: "cup" }],
  });
  const index = recipesByIngredientId([
    chili,
    oats,
    {
      id: "nuggets",
      title: "Nuggets",
      mealType: "lunch",
      cuisine: "american",
      specialOccasion: false,
      ha: "yes",
      healthRating: "healthy",
      eatOut: true,
      description: "Grilled nuggets.",
    },
  ]);
  expect(recipesUsingIngredient("beef", index).map((recipe) => recipe.id)).toEqual(["chili"]);
  expect(recipesUsingIngredient("gf-oats", index).map((recipe) => recipe.id)).toEqual(["oats"]);
  expect(recipesUsingIngredient("unknown", index)).toEqual([]);
});
