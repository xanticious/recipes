import { expect, test } from "vitest";
import {
  filterMealIdeas,
  groupMealIdeas,
  mealIdeaLookup,
  relatedMealIdeas,
  resolveMealIdeaRecipes,
} from "./mealIdeaBrowse.ts";
import { mealIdeas } from "./mealIdeas.ts";
import { recipes } from "./recipes/index.ts";
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
  const dinners = filterMealIdeas(mealIdeas, { occasion: "dinner", query: "" });
  expect(dinners.every((idea) => idea.occasion === "dinner")).toBe(true);
  expect(dinners.some((idea) => idea.id === "pork-chops-plate")).toBe(true);

  const cereal = filterMealIdeas(mealIdeas, { occasion: "all", query: "almond milk" });
  expect(cereal.map((idea) => idea.id)).toContain("cereal-and-milk");
});

test("related meals resolve and recipe links mark missing book entries", () => {
  const lookup = mealIdeaLookup(mealIdeas);
  const pork = lookup.get("pork-chops-plate");
  expect(pork).toBeDefined();
  const related = relatedMealIdeas(pork as MealIdea, lookup);
  expect(related.map((idea) => idea.id)).toEqual(["chicken-rice-vegetables", "steak-and-potatoes"]);

  const links = resolveMealIdeaRecipes(pork as MealIdea, recipes);
  expect(links.find((link) => link.recipeId === "baked-pork-chops")?.missing).toBe(false);
  expect(links.find((link) => link.label === "Mashed Potatoes")?.missing).toBe(true);
  expect(links.find((link) => link.label === "Pan Gravy")?.missing).toBe(true);
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
});
