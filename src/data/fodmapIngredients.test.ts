import { expect, test } from "vitest";
import {
  FODMAP_INGREDIENT_SECTIONS,
  filterBrowsedIngredients,
  filterFodmapIngredients,
  fodmapStatusForLevel,
  groupFodmapIngredients,
  ingredientMatchesFodmapBrowse,
  isFodmapBrowseLevel,
  isFodmapBrowseType,
  showsFodmapTypeRow,
} from "./fodmapIngredients.ts";
import { INGREDIENT_SECTION_LABELS } from "./ingredientBrowse.ts";
import { getIngredientFodmap } from "./ingredientFodmap.ts";
import { ingredients } from "./ingredients.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

test("medium maps to watch-serving-size FODMAP status", () => {
  expect(fodmapStatusForLevel("low")).toBe("low");
  expect(fodmapStatusForLevel("medium")).toBe("depends");
  expect(fodmapStatusForLevel("high")).toBe("high");
});

test("type guards accept browse levels and FODMAP types", () => {
  expect(isFodmapBrowseLevel("all")).toBe(true);
  expect(isFodmapBrowseLevel("low")).toBe(true);
  expect(isFodmapBrowseLevel("medium")).toBe(true);
  expect(isFodmapBrowseLevel("depends")).toBe(false);
  expect(isFodmapBrowseType("all")).toBe(true);
  expect(isFodmapBrowseType("fructans")).toBe(true);
  expect(isFodmapBrowseType("polyol")).toBe(false);
});

test("FODMAP type chips only apply on medium and high", () => {
  expect(showsFodmapTypeRow("all")).toBe(false);
  expect(showsFodmapTypeRow("low")).toBe(false);
  expect(showsFodmapTypeRow("medium")).toBe(true);
  expect(showsFodmapTypeRow("high")).toBe(true);
});

test("all FODMAP level keeps every ingredient, including ones without a study entry", () => {
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce" });
  const mystery = item({ id: "unknown-food", name: "mystery", kind: "other" });
  expect(ingredientMatchesFodmapBrowse(garlic, { level: "all" })).toBe(true);
  expect(ingredientMatchesFodmapBrowse(mystery, { level: "all", type: "fructans" })).toBe(true);
});

test("low, medium, and high filters follow catalog FODMAP status", () => {
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "chives", name: "chives", kind: "produce" }), {
      level: "low",
    }),
  ).toBe(true);
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "garlic", name: "garlic", kind: "produce" }), {
      level: "low",
    }),
  ).toBe(false);
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "tomato", name: "tomato", kind: "produce" }), {
      level: "medium",
    }),
  ).toBe(true);
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "garlic", name: "garlic", kind: "produce" }), {
      level: "high",
    }),
  ).toBe(true);
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "unknown-food", name: "mystery", kind: "other" }), {
      level: "low",
    }),
  ).toBe(false);
});

test("medium and high type filters keep All and match named FODMAPs", () => {
  const tomato = item({ id: "tomato", name: "tomato", kind: "produce" });
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce" });
  expect(ingredientMatchesFodmapBrowse(tomato, { level: "medium", type: "all" })).toBe(true);
  expect(ingredientMatchesFodmapBrowse(tomato, { level: "medium", type: "fructose" })).toBe(true);
  expect(ingredientMatchesFodmapBrowse(tomato, { level: "medium", type: "fructans" })).toBe(false);
  expect(ingredientMatchesFodmapBrowse(garlic, { level: "high", type: "fructans" })).toBe(true);
  expect(ingredientMatchesFodmapBrowse(garlic, { level: "high", type: "fructose" })).toBe(false);
});

test("low ignores a leftover type chip", () => {
  expect(
    ingredientMatchesFodmapBrowse(item({ id: "chives", name: "chives", kind: "produce" }), {
      level: "low",
      type: "fructans",
    }),
  ).toBe(true);
});

test("high fructans filter only returns high ingredients that list fructans", () => {
  const matches = filterFodmapIngredients(ingredients, { level: "high", type: "fructans" });
  expect(matches.some((ingredient) => ingredient.id === "garlic")).toBe(true);
  expect(
    matches.every((ingredient) => {
      const entry = getIngredientFodmap(ingredient.id);
      return entry?.status === "high" && entry.reasons.includes("fructans");
    }),
  ).toBe(true);
});

test("grocery and FODMAP filters compose", () => {
  const matches = filterBrowsedIngredients(ingredients, {
    section: "vegetables",
    query: "gar",
    level: "high",
    type: "fructans",
  });
  expect(matches.map((ingredient) => ingredient.id)).toEqual(["garlic"]);
  expect(
    filterBrowsedIngredients(ingredients, {
      ha: "ha-confirmed",
      level: "all",
    }).every((ingredient) => ingredient.ha === "ha-confirmed"),
  ).toBe(true);
});

test("FODMAP sections put fruit first, vegetables second, then the rest A–Z", () => {
  expect(FODMAP_INGREDIENT_SECTIONS[0]).toBe("fruit");
  expect(FODMAP_INGREDIENT_SECTIONS[1]).toBe("vegetables");
  const rest = FODMAP_INGREDIENT_SECTIONS.slice(2).map(
    (section) => INGREDIENT_SECTION_LABELS[section],
  );
  expect(rest).toEqual([...rest].toSorted((a, b) => a.localeCompare(b)));
});

test("FODMAP grouping follows that section order and sorts names inside each", () => {
  const zucchini = item({ id: "zucchini", name: "zucchini", kind: "produce" });
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce" });
  const apple = item({ id: "apple", name: "apple", kind: "produce" });
  const banana = item({ id: "banana", name: "banana", kind: "produce" });
  const cheddar = item({ id: "cheddar", name: "cheddar", kind: "dairy" });
  const chicken = item({ id: "chicken-breast", name: "chicken", kind: "protein" });
  const grouped = groupFodmapIngredients([zucchini, cheddar, banana, chicken, garlic, apple]);
  expect(grouped.map((group) => group.section)).toEqual(["fruit", "vegetables", "dairy", "meat"]);
  expect(grouped[0].ingredients.map((ingredient) => ingredient.id)).toEqual(["apple", "banana"]);
  expect(grouped[1].ingredients.map((ingredient) => ingredient.id)).toEqual(["garlic", "zucchini"]);
});
