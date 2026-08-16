import { expect, test } from "vitest";
import {
  categorizerColumn,
  categorizerExport,
  categorizerExportJson,
  defaultCategorizerColumn,
  ingredientsInColumn,
  isCategorizerColumn,
} from "./ingredientCategorizer.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name">): Ingredient {
  return { kind: "other", flags: [], ...partial };
}

const catalog: Ingredient[] = [
  item({ id: "a", name: "A", ha: "yes" }),
  item({ id: "b", name: "B" }),
  item({ id: "c", name: "C", ha: "no" }),
  item({ id: "d", name: "D", ha: "pending" }),
  item({ id: "e", name: "E" }),
];

test("isCategorizerColumn accepts the four board columns", () => {
  expect(isCategorizerColumn("ha")).toBe(true);
  expect(isCategorizerColumn("notHa")).toBe(true);
  expect(isCategorizerColumn("pending")).toBe(true);
  expect(isCategorizerColumn("uncategorized")).toBe(true);
  expect(isCategorizerColumn("yes")).toBe(false);
  expect(isCategorizerColumn(null)).toBe(false);
});

test("pending ingredients start uncategorized; tagged ones keep HA / not HA", () => {
  expect(defaultCategorizerColumn(catalog[0])).toBe("ha");
  expect(defaultCategorizerColumn(catalog[1])).toBe("uncategorized");
  expect(defaultCategorizerColumn(catalog[2])).toBe("notHa");
  expect(defaultCategorizerColumn(catalog[3])).toBe("uncategorized");
  expect(
    ingredientsInColumn(catalog, {}, "uncategorized").map((ingredient) => ingredient.id),
  ).toEqual(["b", "d", "e"]);
  expect(ingredientsInColumn(catalog, {}, "ha").map((ingredient) => ingredient.id)).toEqual(["a"]);
  expect(ingredientsInColumn(catalog, {}, "pending")).toEqual([]);
  expect(ingredientsInColumn(catalog, {}, "notHa").map((ingredient) => ingredient.id)).toEqual([
    "c",
  ]);
});

test("moved ingredients keep Ingredients-page order inside a column", () => {
  const overrides = { e: "ha" as const, b: "ha" as const };
  expect(categorizerColumn(catalog[1], overrides)).toBe("ha");
  expect(ingredientsInColumn(catalog, overrides, "ha").map((ingredient) => ingredient.id)).toEqual([
    "a",
    "b",
    "e",
  ]);
  expect(
    ingredientsInColumn(catalog, overrides, "uncategorized").map((ingredient) => ingredient.id),
  ).toEqual(["d"]);
});

test("columns follow grocery section then alphabetical name, not file order", () => {
  const mixed: Ingredient[] = [
    item({ id: "zucchini", name: "zucchini", kind: "produce" }),
    item({ id: "apple", name: "apple", kind: "produce" }),
    item({ id: "chicken-breast", name: "chicken", kind: "protein" }),
    item({ id: "garlic", name: "garlic", kind: "produce" }),
  ];
  expect(
    ingredientsInColumn(mixed, {}, "uncategorized").map((ingredient) => ingredient.id),
  ).toEqual(["chicken-breast", "garlic", "zucchini", "apple"]);
});

test("export lists HA and Not HA ids in Ingredients-page order", () => {
  const overrides = { d: "notHa" as const, b: "pending" as const };
  expect(categorizerExport(catalog, overrides)).toEqual({
    ha: ["a"],
    "not-ha": ["c", "d"],
  });
  expect(categorizerExportJson(catalog, overrides)).toBe(
    `${JSON.stringify({ ha: ["a"], "not-ha": ["c", "d"] }, null, 2)}\n`,
  );
});
