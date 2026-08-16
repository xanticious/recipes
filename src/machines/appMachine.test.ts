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

test("explore HA and eat-out filters are exclusive choices", () => {
  const actor = startApp();
  actor.send({ type: "setExploreHa", ha: "yes" });
  actor.send({ type: "setExploreEatOut", eatOut: "no" });
  expect(actor.getSnapshot().context.explore.ha).toBe("yes");
  expect(actor.getSnapshot().context.explore.eatOut).toBe("no");
  actor.send({ type: "setExploreHa", ha: "no" });
  expect(actor.getSnapshot().context.explore.ha).toBe("no");
  actor.stop();
});

test("clearExploreFilters resets search and chips", () => {
  const actor = startApp();
  actor.send({ type: "setExploreQuery", query: "chili" });
  actor.send({ type: "toggleExploreCuisine", cuisine: "american" });
  actor.send({ type: "setExploreHa", ha: "yes" });
  actor.send({ type: "clearExploreFilters" });
  expect(actor.getSnapshot().context.explore).toEqual({
    mealTypes: [],
    cuisines: [],
    eatOut: "all",
    ha: "all",
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

test("ingredient expand toggles and filters reset without losing the open row", () => {
  const actor = startApp();
  actor.send({ type: "toggleIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.ingredients.expandedId).toBe("garlic");
  actor.send({ type: "toggleIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.ingredients.expandedId).toBeNull();
  actor.send({ type: "toggleIngredient", id: "garlic" });
  actor.send({ type: "setIngredientsHa", ha: "yes" });
  actor.send({ type: "setIngredientsQuery", query: "gar" });
  actor.send({ type: "clearIngredientsFilters" });
  expect(actor.getSnapshot().context.ingredients).toEqual({
    ha: "all",
    query: "",
    expandedId: "garlic",
  });
  actor.stop();
});

test("randomMiss keeps filters and flags the empty result", () => {
  const actor = startApp();
  actor.send({ type: "setRandomMealType", mealType: "dessert" });
  actor.send({ type: "setRandomHa", ha: "yes" });
  actor.send({ type: "randomMiss" });
  expect(actor.getSnapshot().context.random.mealType).toBe("dessert");
  expect(actor.getSnapshot().context.random.ha).toBe("yes");
  expect(actor.getSnapshot().context.random.noMatch).toBe(true);
  actor.stop();
});
