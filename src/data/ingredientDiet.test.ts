import { expect, test } from "vitest";
import {
  assumedIngredientHa,
  describeIngredientDiet,
  fodmapTypeLines,
  formatFodmapTypeLine,
  formatHighestFodmap,
  ingredientContainsCheese,
  ingredientFodmapDiet,
  ingredientGlutenLevel,
  ingredientLactoseLevel,
  servingSizeFromNote,
  type IngredientFodmapDiet,
} from "./ingredientDiet.ts";
import type { Ingredient } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

const unknownDiet: IngredientFodmapDiet = {
  overall: "unknown",
  highestTypes: [],
  types: {
    fructose: { level: "low" },
    fructans: { level: "low" },
    gos: { level: "low" },
    lactose: { level: "low" },
    sorbitol: { level: "low" },
    mannitol: { level: "low" },
  },
};

test("ingredientContainsCheese matches ids and cheese-like names", () => {
  expect(ingredientContainsCheese(item({ id: "cheddar", name: "cheddar", kind: "dairy" }))).toBe(
    true,
  );
  expect(
    ingredientContainsCheese(item({ id: "queso-dip", name: "queso dip", kind: "dairy" })),
  ).toBe(true);
  expect(ingredientContainsCheese(item({ id: "salt", name: "salt", kind: "spice" }))).toBe(false);
});

test("servingSizeFromNote reads a low-at threshold or a nearby amount", () => {
  expect(servingSizeFromNote("excess fructose; low at ~65g / 1/2 medium, high at ~91g")).toBe(
    "~65g / 1/2 medium",
  );
  expect(servingSizeFromNote("ok in 1 tbsp")).toBe("1 tbsp");
  expect(servingSizeFromNote("no amount here")).toBeUndefined();
});

test("lactose and gluten levels honor explicit fields, names, notes, and flags", () => {
  expect(
    ingredientLactoseLevel(item({ id: "milk", name: "milk", kind: "dairy", lactose: "low" })),
  ).toBe("low");
  expect(
    ingredientLactoseLevel(
      item({ id: "lactose-free-milk", name: "lactose-free milk", kind: "dairy" }),
    ),
  ).toBe("free");
  expect(
    ingredientLactoseLevel(
      item({ id: "butter", name: "butter", kind: "dairy", notes: "lactose-clear at a pat" }),
    ),
  ).toBe("free");
  expect(
    ingredientLactoseLevel(item({ id: "milk", name: "milk", kind: "dairy", flags: ["lactose"] })),
  ).toBe("high");

  expect(
    ingredientGlutenLevel(item({ id: "wheat-flour", name: "flour", kind: "grain", gluten: "low" })),
  ).toBe("low");
  expect(
    ingredientGlutenLevel(item({ id: "gf-oats", name: "oats", kind: "grain", flags: ["gluten"] })),
  ).toBe("free");
  expect(
    ingredientGlutenLevel(
      item({ id: "wheat-flour", name: "flour", kind: "grain", flags: ["gluten"] }),
    ),
  ).toBe("high");
  expect(ingredientGlutenLevel(item({ id: "rice", name: "rice", kind: "grain" }))).toBe("free");
});

test("formatFodmapTypeLine and formatHighestFodmap cover low, watch, high, and unknown", () => {
  expect(formatFodmapTypeLine("fructose", { level: "low" })).toBe("Fructose: low");
  expect(formatFodmapTypeLine("fructans", { level: "high" })).toBe("Fructans: high");
  expect(formatFodmapTypeLine("lactose", { level: "high", servingSize: "1 tbsp" })).toBe(
    "Lactose: high (1 tbsp)",
  );
  expect(formatFodmapTypeLine("gos", { level: "watch" })).toBe("GOS: watch serving size");
  expect(formatFodmapTypeLine("gos", { level: "watch", servingSize: "1/4 cup" })).toBe(
    "GOS: watch serving size (1/4 cup)",
  );

  expect(formatHighestFodmap(unknownDiet)).toBe("FODMAP unknown");
  expect(formatHighestFodmap({ ...unknownDiet, overall: "low" })).toBe("Low Fodmap");
  expect(formatHighestFodmap({ ...unknownDiet, overall: "high", highestTypes: ["fructans"] })).toBe(
    "High Fodmap (fructans)",
  );
  expect(formatHighestFodmap({ ...unknownDiet, overall: "high" })).toBe("High Fodmap");
  expect(
    formatHighestFodmap({
      ...unknownDiet,
      overall: "watch",
      highestTypes: ["fructose"],
      servingSize: "65g",
    }),
  ).toBe("Watch serving size (fructose, 65g)");
  expect(
    formatHighestFodmap({ ...unknownDiet, overall: "watch", highestTypes: ["fructose"] }),
  ).toBe("Watch serving size (fructose)");
  expect(formatHighestFodmap({ ...unknownDiet, overall: "watch", servingSize: "65g" })).toBe(
    "Watch serving size (65g)",
  );
  expect(formatHighestFodmap({ ...unknownDiet, overall: "watch" })).toBe("Watch serving size");

  expect(fodmapTypeLines(unknownDiet)).toEqual([
    "Fructose: low",
    "Fructans: low",
    "GOS: low",
    "Lactose: low",
    "Sorbitol: low",
    "Mannitol: low",
  ]);
});

test("describeIngredientDiet and assumedIngredientHa compose the per-field ratings", () => {
  const rice = describeIngredientDiet(
    item({ id: "white-rice", name: "white rice", kind: "grain" }),
  );
  expect(rice.lactose).toBe("free");
  expect(rice.gluten).toBe("free");
  expect(rice.cheese).toBe(false);
  expect(rice.fodmap.overall).toBe("low");
  expect(assumedIngredientHa(item({ id: "white-rice", name: "white rice", kind: "grain" }))).toBe(
    "ha-assumed",
  );

  const cheddar = item({ id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] });
  expect(describeIngredientDiet(cheddar).cheese).toBe(true);
  expect(assumedIngredientHa(cheddar)).toBe("not-ha-assumed");

  expect(
    assumedIngredientHa(
      item({ id: "sourdough-bread", name: "sourdough bread", kind: "grain", flags: ["gluten"] }),
    ),
  ).toBe("unknown");

  const garlicDiet = ingredientFodmapDiet(
    item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] }),
  );
  expect(garlicDiet.overall).toBe("high");
  expect(garlicDiet.highestTypes).toEqual(["fructans"]);
});
