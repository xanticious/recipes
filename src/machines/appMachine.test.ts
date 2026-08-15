import { createActor } from "xstate";
import { expect, test } from "vitest";
import { appMachine } from "./appMachine.ts";

function startApp() {
  const actor = createActor(appMachine, { input: { route: { name: "landing" } } });
  actor.start();
  return actor;
}

test("openExplore can preselect a meal type", () => {
  const actor = startApp();
  actor.send({ type: "openExplore", mealType: "dinner" });
  expect(actor.getSnapshot().context.route).toEqual({ name: "explore" });
  expect(actor.getSnapshot().context.explore.mealTypes).toEqual(["dinner"]);
  actor.stop();
});

test("openExplore can preselect a diet tag from a guide", () => {
  const actor = startApp();
  actor.send({ type: "openExplore", tag: "low-fop" });
  expect(actor.getSnapshot().context.route).toEqual({ name: "explore" });
  expect(actor.getSnapshot().context.explore.tags).toEqual(["low-fop"]);
  expect(actor.getSnapshot().context.explore.mealTypes).toEqual([]);
  actor.stop();
});

test("explore diet tags toggle and combine", () => {
  const actor = startApp();
  actor.send({ type: "toggleExploreTag", tag: "lactose-free" });
  actor.send({ type: "toggleExploreTag", tag: "gluten-free" });
  expect(actor.getSnapshot().context.explore.tags).toEqual(["lactose-free", "gluten-free"]);
  actor.send({ type: "toggleExploreTag", tag: "lactose-free" });
  expect(actor.getSnapshot().context.explore.tags).toEqual(["gluten-free"]);
  actor.stop();
});

test("clearExploreFilters resets search and chips", () => {
  const actor = startApp();
  actor.send({ type: "setExploreQuery", query: "chili" });
  actor.send({ type: "toggleExploreCuisine", cuisine: "american" });
  actor.send({ type: "clearExploreFilters" });
  expect(actor.getSnapshot().context.explore).toEqual({
    mealTypes: [],
    cuisines: [],
    tags: [],
    query: "",
  });
  actor.stop();
});

test("openRandomRecipe remembers the last id and marks the route", () => {
  const actor = startApp();
  actor.send({ type: "openRandomRecipe", id: "chili" });
  expect(actor.getSnapshot().context.route).toEqual({
    name: "recipe",
    id: "chili",
    fromRandom: true,
  });
  expect(actor.getSnapshot().context.random.lastRecipeId).toBe("chili");
  expect(actor.getSnapshot().context.random.noMatch).toBe(false);
  actor.stop();
});

test("substitution selection is stored per recipe and resets on another recipe", () => {
  const actor = startApp();
  actor.send({
    type: "selectSubstitution",
    recipeId: "skillet-burgers",
    slot: "cheese",
    tag: "lactose-free",
    optionIndex: 0,
  });
  expect(actor.getSnapshot().context.recipeView.selections.cheese).toEqual({
    tag: "lactose-free",
    optionIndex: 0,
  });
  actor.send({
    type: "navigate",
    route: { name: "recipe", id: "baked-salmon", fromRandom: false },
  });
  expect(actor.getSnapshot().context.recipeView.recipeId).toBe("baked-salmon");
  expect(actor.getSnapshot().context.recipeView.selections).toEqual({});
  actor.stop();
});

test("toggleSubPanel expands and collapses the same chip", () => {
  const actor = startApp();
  actor.send({
    type: "toggleSubPanel",
    recipeId: "skillet-burgers",
    slot: "cheese",
    tag: "lactose-free",
  });
  expect(actor.getSnapshot().context.recipeView.expanded).toEqual({
    slot: "cheese",
    tag: "lactose-free",
  });
  actor.send({
    type: "toggleSubPanel",
    recipeId: "skillet-burgers",
    slot: "cheese",
    tag: "lactose-free",
  });
  expect(actor.getSnapshot().context.recipeView.expanded).toBeNull();
  actor.stop();
});

test("substitution panels expand, apply, and reset per recipe", () => {
  const actor = startApp();
  actor.send({
    type: "navigate",
    route: { name: "recipe", id: "skillet-burgers", fromRandom: false },
  });
  actor.send({
    type: "toggleSubPanel",
    recipeId: "skillet-burgers",
    slot: "cheese",
    tag: "lactose-free",
  });
  expect(actor.getSnapshot().context.recipeView.expanded).toEqual({
    slot: "cheese",
    tag: "lactose-free",
  });
  actor.send({
    type: "selectSubstitution",
    recipeId: "skillet-burgers",
    slot: "cheese",
    tag: "lactose-free",
    optionIndex: 0,
  });
  expect(actor.getSnapshot().context.recipeView.expanded).toBeNull();
  expect(actor.getSnapshot().context.recipeView.selections.cheese).toEqual({
    tag: "lactose-free",
    optionIndex: 0,
  });
  actor.send({ type: "navigate", route: { name: "recipe", id: "taco-night", fromRandom: false } });
  expect(actor.getSnapshot().context.recipeView.selections).toEqual({});
  actor.stop();
});

test("randomMiss keeps filters and flags the empty result", () => {
  const actor = startApp();
  actor.send({ type: "setRandomMealType", mealType: "dessert" });
  actor.send({ type: "toggleRandomTag", tag: "low-fop" });
  actor.send({ type: "randomMiss" });
  expect(actor.getSnapshot().context.random.mealType).toBe("dessert");
  expect(actor.getSnapshot().context.random.tags).toEqual(["low-fop"]);
  expect(actor.getSnapshot().context.random.noMatch).toBe(true);
  actor.stop();
});
