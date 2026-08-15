import { expect, test } from "vitest";
import { indexIngredients } from "./lookup.ts";
import { fillStep, resolveLine } from "./substitutions.ts";
import type { Ingredient, IngredientLine } from "./types.ts";

const lookup = indexIngredients([
  { id: "cheddar", name: "cheddar", kind: "dairy", flags: ["lactose"] },
  { id: "lactose-free-cheddar", name: "lactose-free cheddar", kind: "dairy", flags: [] },
] satisfies Ingredient[]);

const cheeseLine: IngredientLine = {
  slot: "cheese",
  ingredientId: "cheddar",
  amount: 4,
  unit: "slice",
  substitutions: [
    {
      tags: ["lactose-free"],
      options: [
        { ingredientId: null, label: "Leave cheese out", stepPhrase: "no cheese" },
        { ingredientId: "lactose-free-cheddar" },
      ],
    },
  ],
};

test("resolveLine keeps the original until a swap is selected", () => {
  const resolved = resolveLine(cheeseLine, undefined, lookup);
  expect(resolved.omitted).toBe(false);
  expect(resolved.line.ingredientId).toBe("cheddar");
  expect(resolved.stepPhrase).toBe("cheddar");
});

test("resolveLine can omit a line or swap the catalog ingredient", () => {
  const omitted = resolveLine(cheeseLine, { tag: "lactose-free", optionIndex: 0 }, lookup);
  expect(omitted.omitted).toBe(true);
  expect(omitted.label).toBe("Leave cheese out");
  expect(omitted.stepPhrase).toBe("no cheese");

  const swapped = resolveLine(cheeseLine, { tag: "lactose-free", optionIndex: 1 }, lookup);
  expect(swapped.omitted).toBe(false);
  expect(swapped.line.ingredientId).toBe("lactose-free-cheddar");
  expect(swapped.stepPhrase).toBe("lactose-free cheddar");
});

test("fillStep replaces placeholders and omit branches", () => {
  const present = new Map([["cheese", { omitted: false, stepPhrase: "cheddar" }]]);
  const omitted = new Map([["cheese", { omitted: true, stepPhrase: "no cheese" }]]);

  expect(fillStep("Add {{cheese}} for the last minute.", present)).toBe(
    "Add cheddar for the last minute.",
  );
  expect(fillStep("{{cheese:Add {name} for the last minute.|Skip the cheese.}}", present)).toBe(
    "Add cheddar for the last minute.",
  );
  expect(fillStep("{{cheese:Add {name} for the last minute.|Skip the cheese.}}", omitted)).toBe(
    "Skip the cheese.",
  );
  expect(fillStep("Add {{cheese}} for the last minute.", omitted)).toBe("Add for the last minute.");
});
