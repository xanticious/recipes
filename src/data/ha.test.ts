import { expect, test } from "vitest";
import {
  assumedIngredientHa,
  describeIngredientDiet,
  servingSizeFromNote,
} from "./ingredientDiet.ts";
import {
  assumedHaFromStatuses,
  assumedRecipeHa,
  assumedRecipeHaFromIngredients,
  classifyRecipeHa,
  ingredientHaStatus,
  ingredientIsHa,
  recipeHaBreakdown,
} from "./ha.ts";
import { indexIngredients } from "./lookup.ts";
import type { Ingredient, Recipe } from "./types.ts";

function item(partial: Partial<Ingredient> & Pick<Ingredient, "id" | "name" | "kind">): Ingredient {
  return { flags: [], ...partial };
}

test("ingredients without a confirmed tag are assumed from diet metadata", () => {
  expect(ingredientHaStatus(item({ id: "mystery", name: "mystery", kind: "other" }))).toBe(
    "unknown",
  );
  expect(ingredientHaStatus(item({ id: "white-rice", name: "rice", kind: "grain" }))).toBe(
    "ha-assumed",
  );
  expect(
    ingredientHaStatus(item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] })),
  ).toBe("not-ha-assumed");
  expect(
    ingredientHaStatus(item({ id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] })),
  ).toBe("not-ha-assumed");
  expect(ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain" }))).toBe(true);
  expect(ingredientIsHa(item({ id: "garlic", name: "garlic", kind: "produce" }))).toBe(false);
});

test("an explicit confirmed ha field is the displayed status", () => {
  expect(
    ingredientHaStatus(item({ id: "mystery", name: "mystery", kind: "other", ha: "ha-confirmed" })),
  ).toBe("ha-confirmed");
  expect(
    ingredientHaStatus(
      item({
        id: "garlic",
        name: "garlic",
        kind: "produce",
        flags: ["fructan"],
        ha: "not-ha-confirmed",
      }),
    ),
  ).toBe("not-ha-confirmed");
  expect(
    ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain", ha: "ha-confirmed" })),
  ).toBe(true);
  expect(
    ingredientIsHa(item({ id: "white-rice", name: "rice", kind: "grain", ha: "not-ha-confirmed" })),
  ).toBe(false);
});

test("lactose-free, gluten-free, low or watch FODMAP is assumed HA", () => {
  expect(assumedIngredientHa(item({ id: "white-rice", name: "white rice", kind: "grain" }))).toBe(
    "ha-assumed",
  );
  expect(assumedIngredientHa(item({ id: "tomato", name: "tomato", kind: "produce" }))).toBe(
    "ha-assumed",
  );
  expect(assumedIngredientHa(item({ id: "bacon", name: "bacon", kind: "protein" }))).toBe(
    "ha-assumed",
  );
});

test("high lactose, cheese, or high FODMAP is assumed not HA", () => {
  expect(
    assumedIngredientHa(item({ id: "milk", name: "milk", kind: "dairy", flags: ["lactose"] })),
  ).toBe("not-ha-assumed");
  expect(
    assumedIngredientHa(
      item({ id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] }),
    ),
  ).toBe("not-ha-assumed");
  expect(assumedIngredientHa(item({ id: "onion", name: "onion", kind: "produce" }))).toBe(
    "not-ha-assumed",
  );
});

test("high gluten without a Not-HA trigger stays unknown", () => {
  expect(
    assumedIngredientHa(
      item({ id: "sourdough-bread", name: "sourdough bread", kind: "grain", flags: ["gluten"] }),
    ),
  ).toBe("unknown");
});

test("diet metadata covers lactose, gluten, and per-type FODMAPs", () => {
  const bacon = describeIngredientDiet(item({ id: "bacon", name: "bacon", kind: "protein" }));
  expect(bacon.lactose).toBe("free");
  expect(bacon.gluten).toBe("free");
  expect(bacon.cheese).toBe(false);
  expect(bacon.fodmap.overall).toBe("low");
  expect(bacon.fodmap.types.fructose.level).toBe("low");

  const garlic = describeIngredientDiet(
    item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] }),
  );
  expect(garlic.fodmap.overall).toBe("high");
  expect(garlic.fodmap.highestTypes).toEqual(["fructans"]);
  expect(garlic.fodmap.types.fructans.level).toBe("high");
  expect(garlic.fodmap.types.gos.level).toBe("low");

  const tomato = describeIngredientDiet(item({ id: "tomato", name: "tomato", kind: "produce" }));
  expect(tomato.fodmap.overall).toBe("watch");
  expect(tomato.fodmap.highestTypes).toEqual(["fructose"]);
  expect(tomato.fodmap.servingSize).toMatch(/65g/);

  const milk = describeIngredientDiet(
    item({ id: "milk", name: "milk", kind: "dairy", flags: ["lactose"] }),
  );
  expect(milk.lactose).toBe("high");
  expect(milk.gluten).toBe("free");

  const wheat = describeIngredientDiet(
    item({
      id: "wheat-flour",
      name: "all-purpose flour",
      kind: "grain",
      flags: ["gluten", "fructan"],
    }),
  );
  expect(wheat.gluten).toBe("high");
  expect(wheat.lactose).toBe("free");

  const gfSoy = describeIngredientDiet(
    item({ id: "soy-sauce-gf", name: "gluten-free soy sauce", kind: "other" }),
  );
  expect(gfSoy.gluten).toBe("free");
});

test("recipe HA follows the worst ingredient and never confirms", () => {
  const rice = item({ id: "white-rice", name: "rice", kind: "grain", ha: "ha-confirmed" });
  const salt = item({ id: "salt", name: "salt", kind: "spice" });
  const garlic = item({ id: "garlic", name: "garlic", kind: "produce", flags: ["fructan"] });
  const cheddar = item({
    id: "cheddar",
    name: "cheddar",
    kind: "dairy",
    flags: ["lactose"],
    ha: "not-ha-confirmed",
  });
  const mystery = item({ id: "mystery", name: "mystery", kind: "other" });
  const lookup = indexIngredients([rice, salt, garlic, cheddar, mystery]);

  expect(assumedRecipeHa(["white-rice", "salt"], lookup)).toBe("ha-assumed");
  expect(assumedRecipeHaFromIngredients([rice, salt])).toBe("ha-assumed");
  expect(assumedRecipeHa(["white-rice", "garlic"], lookup)).toBe("not-ha-assumed");
  expect(assumedRecipeHa(["white-rice", "cheddar"], lookup)).toBe("not-ha-assumed");
  expect(assumedRecipeHa(["white-rice", "mystery"], lookup)).toBe("unknown");
  expect(assumedRecipeHa(["white-rice", "missing"], lookup)).toBe("unknown");
  expect(assumedRecipeHa([], lookup)).toBe("unknown");
  expect(assumedHaFromStatuses(["ha-confirmed", "ha-assumed"])).toBe("ha-assumed");
  expect(assumedHaFromStatuses(["ha-confirmed", "unknown", "not-ha-assumed"])).toBe(
    "not-ha-assumed",
  );

  const home: Recipe = {
    id: "rice-bowl",
    title: "Rice bowl",
    mealType: "dinner",
    cuisine: "american",
    specialOccasion: false,
    ha: "unknown",
    healthRating: "healthy",
    eatOut: false,
    prepMinutes: 5,
    cookMinutes: 10,
    servings: 2,
    ingredients: [
      { ingredientId: "white-rice", amount: 1, unit: "cup" },
      { ingredientId: "salt", amount: null, unit: null },
    ],
    steps: ["Cook."],
  };
  expect(classifyRecipeHa(home, lookup)).toBe("ha-assumed");
  expect(
    classifyRecipeHa(
      {
        id: "nuggets",
        title: "Nuggets",
        mealType: "lunch",
        cuisine: "american",
        specialOccasion: false,
        ha: "unknown",
        healthRating: "healthy",
        eatOut: true,
        description: "Grilled nuggets.",
      },
      lookup,
    ),
  ).toBe("unknown");

  const breakdown = recipeHaBreakdown(["white-rice", "garlic", "missing"], lookup);
  expect(breakdown.status).toBe("not-ha-assumed");
  expect(breakdown.ingredients.map((entry) => [entry.id, entry.status, entry.missing])).toEqual([
    ["white-rice", "ha-confirmed", false],
    ["garlic", "not-ha-assumed", false],
    ["missing", "unknown", true],
  ]);
});

test("servingSizeFromNote picks the low threshold", () => {
  expect(servingSizeFromNote("excess fructose; low at ~65g / 1/2 medium, high at ~91g")).toBe(
    "~65g / 1/2 medium",
  );
  expect(servingSizeFromNote("fructans; low at ~28g / 2 Tbsp, high at ~85g / 1/2 cup")).toBe(
    "~28g / 2 Tbsp",
  );
  expect(servingSizeFromNote(undefined)).toBeUndefined();
});
