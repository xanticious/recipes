import { expect, test } from "vitest";
import {
  filterMealIdeas,
  groupMealIdeas,
  isMealIdeaDisplay,
  mealIdeaHasHaRecipes,
  mealIdeaLookup,
  mealIdeaPinSize,
  mealIdeaRecipeFamily,
  relatedMealIdeas,
  resolveMealIdeaRecipes,
} from "./mealIdeaBrowse.ts";
import { mealIdeas } from "./mealIdeas.ts";
import { recipes } from "./recipes/index.ts";
import { missingReverseLinks } from "./related.ts";
import { MEAL_IDEA_REGION_ABBREVS, MEAL_IDEA_REGIONS } from "./tags.ts";
import type { MealIdea } from "./types.ts";

test("meal ideas are grouped in occasion order", () => {
  const grouped = groupMealIdeas(mealIdeas);
  expect(grouped.map((group) => group.occasion)).toEqual([
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "dessert",
    "drinks",
  ]);
  expect(grouped.every((group) => group.ideas.length > 0)).toBe(true);
});

test("occasion and name search filter the list", () => {
  const dinners = filterMealIdeas(mealIdeas, { occasion: "dinner", region: "all", query: "" });
  expect(dinners.every((idea) => idea.occasion === "dinner")).toBe(true);
  expect(dinners.some((idea) => idea.id === "pork-chops-plate")).toBe(true);

  const cereal = filterMealIdeas(mealIdeas, {
    occasion: "all",
    region: "all",
    query: "almond milk",
  });
  expect(cereal.map((idea) => idea.id)).toContain("cereal-and-milk");
});

test("region filter keeps plates tagged for that region", () => {
  const japan = filterMealIdeas(mealIdeas, { occasion: "all", region: "japan", query: "" });
  expect(japan.some((idea) => idea.id === "japanese-rice-breakfast")).toBe(true);
  expect(japan.every((idea) => idea.regions.includes("japan"))).toBe(true);
});

test("every region has a unique list abbreviation", () => {
  const abbrevs = MEAL_IDEA_REGIONS.map((region) => MEAL_IDEA_REGION_ABBREVS[region]);
  expect(abbrevs.every((abbrev) => /^[A-Z]{2}$/.test(abbrev))).toBe(true);
  expect(new Set(abbrevs).size).toBe(abbrevs.length);
});

test("name search matches region abbreviations", () => {
  const japan = filterMealIdeas(mealIdeas, { occasion: "all", region: "all", query: "JP" });
  expect(japan.some((idea) => idea.id === "japanese-rice-breakfast")).toBe(true);
  expect(japan.every((idea) => idea.regions.includes("japan"))).toBe(true);
});

test("related meals resolve and recipe links mark missing book entries", () => {
  const lookup = mealIdeaLookup(mealIdeas);
  const pork = lookup.get("pork-chops-plate");
  expect(pork).toBeDefined();
  const related = relatedMealIdeas(pork as MealIdea, lookup);
  expect(related.map((idea) => idea.id)).toEqual([...(pork as MealIdea).relatedMealIds ?? []]);
  expect(related.map((idea) => idea.id)).toEqual(
    expect.arrayContaining(["chicken-rice-vegetables", "steak-and-potatoes"]),
  );

  const links = resolveMealIdeaRecipes(pork as MealIdea, recipes);
  expect(links.find((link) => link.recipeId === "baked-pork-chops")?.missing).toBe(false);
  expect(links.find((link) => link.label === "Mashed Potatoes (Not-HA)")?.missing).toBe(false);
  expect(links.find((link) => link.label === "Pan Gravy (Not-HA)")?.missing).toBe(false);
});

test("every related meal id and claimed recipe id is valid", () => {
  const ids = mealIdeas.map((idea) => idea.id);
  expect(new Set(ids).size).toBe(ids.length);

  const lookup = mealIdeaLookup(mealIdeas);
  const recipeIds = new Set(recipes.map((recipe) => recipe.id));
  const brokenRelated = mealIdeas.flatMap((idea) =>
    (idea.relatedMealIds ?? [])
      .filter((relatedId) => !lookup.has(relatedId))
      .map((relatedId) => `${idea.id} → ${relatedId}`),
  );
  const brokenRecipes = mealIdeas.flatMap((idea) =>
    (idea.recipes ?? [])
      .filter((ref) => ref.recipeId !== undefined && !recipeIds.has(ref.recipeId))
      .map((ref) => `${idea.id} → ${ref.recipeId}`),
  );
  expect(brokenRelated).toEqual([]);
  expect(brokenRecipes).toEqual([]);

  const missingRegions = mealIdeas
    .filter((idea) => idea.regions.length === 0)
    .map((idea) => idea.id);
  expect(missingRegions).toEqual([]);
  const unknownRegions = mealIdeas.flatMap((idea) =>
    idea.regions
      .filter((region) => !(MEAL_IDEA_REGIONS as readonly string[]).includes(region))
      .map((region) => `${idea.id} → ${region}`),
  );
  expect(unknownRegions).toEqual([]);

  const missingDescriptions = mealIdeas
    .filter((idea) => idea.description.trim().length < 40)
    .map((idea) => idea.id);
  expect(missingDescriptions).toEqual([]);
});

test("related meal ids are stored in both directions", () => {
  expect(missingReverseLinks(mealIdeas, (idea) => idea.relatedMealIds)).toEqual([]);
});

test("name search matches descriptions", () => {
  const battleCreek = filterMealIdeas(mealIdeas, {
    occasion: "all",
    region: "all",
    query: "Battle Creek",
  });
  expect(battleCreek.map((idea) => idea.id)).toContain("cereal-and-milk");
});

test("picture pins keep a stable size per meal idea", () => {
  const cereal = mealIdeaPinSize("cereal-and-milk");
  expect(cereal).toEqual(mealIdeaPinSize("cereal-and-milk"));
  expect(cereal.width).toBe(320);
  expect(cereal.height).toBeGreaterThan(0);
  const heights = new Set(mealIdeas.map((idea) => mealIdeaPinSize(idea.id).height));
  expect(heights.size).toBeGreaterThan(1);
});

test("display is list or pictures", () => {
  expect(isMealIdeaDisplay("list")).toBe(true);
  expect(isMealIdeaDisplay("pictures")).toBe(true);
  expect(isMealIdeaDisplay("gallery")).toBe(false);
});

test("recipe family strips HA suffixes", () => {
  expect(mealIdeaRecipeFamily("Grilled Steak (HA)")).toBe("Grilled Steak");
  expect(mealIdeaRecipeFamily("Mashed Potatoes (Not-HA)")).toBe("Mashed Potatoes");
  expect(mealIdeaRecipeFamily("Roasted Green Beans")).toBe("Roasted Green Beans");
});

test("a meal idea has HA recipes when every linked family has an HA version", () => {
  const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const lookupById = mealIdeaLookup(mealIdeas);
  const steak = lookupById.get("steak-and-potatoes");
  const smoothie = lookupById.get("breakfast-smoothie");
  const cereal = lookupById.get("cereal-and-milk");
  expect(steak).toBeDefined();
  expect(smoothie).toBeDefined();
  expect(cereal).toBeDefined();
  expect(mealIdeaHasHaRecipes(steak as MealIdea, recipeById)).toBe(true);
  expect(mealIdeaHasHaRecipes(cereal as MealIdea, recipeById)).toBe(true);
  expect(mealIdeaHasHaRecipes(smoothie as MealIdea, recipeById)).toBe(false);

  const mixed: MealIdea = {
    id: "mixed-plate",
    title: "Mixed Plate",
    occasion: "dinner",
    description: "A test plate with one HA family and one Not-HA-only family.",
    regions: ["united-states"],
    pairings: [],
    recipes: [
      { label: "Grilled Steak (HA)", recipeId: "grilled-steak" },
      { label: "Banana Smoothie (Not-HA)", recipeId: "banana-smoothie" },
    ],
  };
  expect(mealIdeaHasHaRecipes(mixed, recipeById)).toBe(false);
  expect(
    mealIdeaHasHaRecipes(
      { ...mixed, recipes: [{ label: "Grilled Steak (HA)", recipeId: "grilled-steak" }] },
      recipeById,
    ),
  ).toBe(true);
  expect(mealIdeaHasHaRecipes({ ...mixed, recipes: undefined }, recipeById)).toBe(false);
});
