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

test("explore HA filter is an exclusive choice", () => {
  const actor = startApp();
  actor.send({ type: "setExploreHa", ha: "yes" });
  expect(actor.getSnapshot().context.explore.ha).toBe("yes");
  actor.send({ type: "setExploreHa", ha: "pending" });
  expect(actor.getSnapshot().context.explore.ha).toBe("pending");
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
    ha: "all",
    query: "",
  });
  actor.stop();
});

test("openEatOut opens the eat-out catalog", () => {
  const actor = startApp();
  actor.send({ type: "openEatOut" });
  expect(actor.getSnapshot().context.route).toEqual({ name: "eatOut" });
  actor.send({ type: "setEatOutHa", ha: "yes" });
  actor.send({ type: "clearEatOutFilters" });
  expect(actor.getSnapshot().context.eatOutCatalog.ha).toBe("all");
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
  actor.send({ type: "setIngredientsSection", section: "meat" });
  actor.send({ type: "clearIngredientsFilters" });
  expect(actor.getSnapshot().context.ingredients).toEqual({
    ha: "all",
    query: "",
    section: null,
    expandedId: "garlic",
  });
  actor.stop();
});

test("categorizer moves keep a selected id and clear the copied flag", () => {
  const actor = startApp();
  actor.send({ type: "selectCategorizerIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.selectedId).toBe("garlic");
  actor.send({ type: "categorizerCopied" });
  expect(actor.getSnapshot().context.categorizer.copied).toBe(true);
  actor.send({ type: "moveCategorizerIngredient", id: "garlic", column: "ha" });
  expect(actor.getSnapshot().context.categorizer).toEqual({
    overrides: { garlic: "ha" },
    selectedId: "garlic",
    infoId: null,
    draggingId: null,
    dropTarget: null,
    copied: false,
    suppressClick: false,
  });
  actor.send({ type: "setCategorizerDropTarget", column: "pending" });
  expect(actor.getSnapshot().context.categorizer.dropTarget).toBe("pending");
  actor.send({ type: "setCategorizerDropTarget", column: null });
  expect(actor.getSnapshot().context.categorizer.dropTarget).toBeNull();
  actor.stop();
});

test("categorizer info toggles open and closed on the same ingredient", () => {
  const actor = startApp();
  actor.send({ type: "toggleCategorizerInfo", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.infoId).toBe("garlic");
  expect(actor.getSnapshot().context.categorizer.selectedId).toBe("garlic");
  actor.send({ type: "toggleCategorizerInfo", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.infoId).toBeNull();
  actor.send({ type: "toggleCategorizerInfo", id: "onion" });
  expect(actor.getSnapshot().context.categorizer.infoId).toBe("onion");
  actor.send({ type: "toggleCategorizerInfo", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.infoId).toBe("garlic");
  actor.stop();
});

test("categorizer drag marks the ingredient and suppresses the following click", () => {
  const actor = startApp();
  actor.send({ type: "startCategorizerDrag", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.draggingId).toBe("garlic");
  expect(actor.getSnapshot().context.categorizer.selectedId).toBe("garlic");
  expect(actor.getSnapshot().context.categorizer.suppressClick).toBe(true);
  actor.send({ type: "setCategorizerDropTarget", column: "notHa" });
  actor.send({ type: "moveCategorizerIngredient", id: "garlic", column: "notHa" });
  actor.send({ type: "endCategorizerDrag" });
  expect(actor.getSnapshot().context.categorizer.draggingId).toBeNull();
  expect(actor.getSnapshot().context.categorizer.dropTarget).toBeNull();
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "notHa" });
  actor.send({ type: "categorizerPrimaryClick", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "notHa" });
  actor.stop();
});

test("categorizer left click sends to HA unless a drag just happened", () => {
  const actor = startApp();
  actor.send({ type: "categorizerPrimaryClick", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "ha" });
  actor.send({ type: "selectCategorizerIngredient", id: "onion", suppressClick: true });
  actor.send({ type: "categorizerPrimaryClick", id: "onion" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "ha" });
  expect(actor.getSnapshot().context.categorizer.suppressClick).toBe(false);
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
