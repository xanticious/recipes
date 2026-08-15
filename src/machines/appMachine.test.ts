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
