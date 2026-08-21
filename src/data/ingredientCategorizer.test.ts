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
  item({ id: "a", name: "A", ha: "ha-confirmed" }),
  item({ id: "white-rice", name: "B" }),
  item({ id: "c", name: "C", ha: "not-ha-confirmed" }),
  item({ id: "garlic", name: "D" }),
  item({ id: "sourdough-bread", name: "E", flags: ["gluten"] }),
];

test("isCategorizerColumn accepts the five board columns", () => {
  expect(isCategorizerColumn("ha-confirmed")).toBe(true);
  expect(isCategorizerColumn("ha-assumed")).toBe(true);
  expect(isCategorizerColumn("unknown")).toBe(true);
  expect(isCategorizerColumn("not-ha-assumed")).toBe(true);
  expect(isCategorizerColumn("not-ha-confirmed")).toBe(true);
  expect(isCategorizerColumn("ha")).toBe(false);
  expect(isCategorizerColumn("pending")).toBe(false);
  expect(isCategorizerColumn(null)).toBe(false);
});

test("confirmed tags keep their columns; the rest follow diet assumptions", () => {
  expect(defaultCategorizerColumn(catalog[0])).toBe("ha-confirmed");
  expect(defaultCategorizerColumn(catalog[1])).toBe("ha-assumed");
  expect(defaultCategorizerColumn(catalog[2])).toBe("not-ha-confirmed");
  expect(defaultCategorizerColumn(catalog[3])).toBe("not-ha-assumed");
  expect(defaultCategorizerColumn(catalog[4])).toBe("unknown");
  expect(
    ingredientsInColumn(catalog, {}, "ha-confirmed").map((ingredient) => ingredient.id),
  ).toEqual(["a"]);
  expect(ingredientsInColumn(catalog, {}, "ha-assumed").map((ingredient) => ingredient.id)).toEqual(
    ["white-rice"],
  );
  expect(ingredientsInColumn(catalog, {}, "unknown").map((ingredient) => ingredient.id)).toEqual([
    "sourdough-bread",
  ]);
  expect(
    ingredientsInColumn(catalog, {}, "not-ha-assumed").map((ingredient) => ingredient.id),
  ).toEqual(["garlic"]);
  expect(
    ingredientsInColumn(catalog, {}, "not-ha-confirmed").map((ingredient) => ingredient.id),
  ).toEqual(["c"]);
});

test("moved ingredients keep Ingredients-page order inside a column", () => {
  const overrides = { garlic: "ha-confirmed" as const, "white-rice": "ha-confirmed" as const };
  expect(categorizerColumn(catalog[1], overrides)).toBe("ha-confirmed");
  expect(
    ingredientsInColumn(catalog, overrides, "ha-confirmed").map((ingredient) => ingredient.id),
  ).toEqual(["a", "white-rice", "garlic"]);
  expect(ingredientsInColumn(catalog, overrides, "ha-assumed")).toEqual([]);
});

test("columns follow grocery section then alphabetical name, not file order", () => {
  const mixed: Ingredient[] = [
    item({ id: "zucchini", name: "zucchini", kind: "produce" }),
    item({ id: "apple", name: "apple", kind: "produce" }),
    item({ id: "chicken-breast", name: "chicken", kind: "protein" }),
    item({ id: "garlic", name: "garlic", kind: "produce" }),
  ];
  expect(ingredientsInColumn(mixed, {}, "ha-assumed").map((ingredient) => ingredient.id)).toEqual([
    "chicken-breast",
    "zucchini",
  ]);
  expect(
    ingredientsInColumn(mixed, {}, "not-ha-assumed").map((ingredient) => ingredient.id),
  ).toEqual(["garlic", "apple"]);
});

test("export lists every column in Ingredients-page order", () => {
  const overrides = { garlic: "not-ha-confirmed" as const, "sourdough-bread": "unknown" as const };
  expect(categorizerExport(catalog, overrides)).toEqual({
    "ha-confirmed": ["a"],
    "ha-assumed": ["white-rice"],
    unknown: ["sourdough-bread"],
    "not-ha-assumed": [],
    "not-ha-confirmed": ["c", "garlic"],
  });
  expect(categorizerExportJson(catalog, overrides)).toBe(
    `${JSON.stringify(
      {
        "ha-confirmed": ["a"],
        "ha-assumed": ["white-rice"],
        unknown: ["sourdough-bread"],
        "not-ha-assumed": [],
        "not-ha-confirmed": ["c", "garlic"],
      },
      null,
      2,
    )}\n`,
  );
});
