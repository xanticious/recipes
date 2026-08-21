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
  actor.send({ type: "setExploreHa", ha: "ha-confirmed" });
  expect(actor.getSnapshot().context.explore.ha).toBe("ha-confirmed");
  actor.send({ type: "setExploreHa", ha: "unknown" });
  expect(actor.getSnapshot().context.explore.ha).toBe("unknown");
  actor.send({ type: "setExploreHa", ha: "not-ha-confirmed" });
  expect(actor.getSnapshot().context.explore.ha).toBe("not-ha-confirmed");
  actor.stop();
});

test("clearExploreFilters resets search and chips", () => {
  const actor = startApp();
  actor.send({ type: "setExploreQuery", query: "chili" });
  actor.send({ type: "toggleExploreCuisine", cuisine: "american" });
  actor.send({ type: "setExploreHa", ha: "ha-confirmed" });
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
  actor.send({ type: "setEatOutHa", ha: "ha-confirmed" });
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

test("ingredient details toggle, filters reset without losing the open card, and close", () => {
  const actor = startApp();
  actor.send({ type: "toggleIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.ingredients.expandedId).toBe("garlic");
  actor.send({ type: "toggleIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.ingredients.expandedId).toBeNull();
  actor.send({ type: "toggleIngredient", id: "garlic" });
  actor.send({ type: "setIngredientsHa", ha: "ha-confirmed" });
  actor.send({ type: "setIngredientsQuery", query: "gar" });
  actor.send({ type: "setIngredientsSection", section: "meat" });
  actor.send({ type: "clearIngredientsFilters" });
  expect(actor.getSnapshot().context.ingredients).toEqual({
    ha: "all",
    query: "",
    section: null,
    level: "all",
    type: "all",
    expandedId: "garlic",
  });
  actor.send({ type: "closeIngredient" });
  expect(actor.getSnapshot().context.ingredients.expandedId).toBeNull();
  actor.stop();
});

test("categorizer moves keep a selected id and clear the copied flag", () => {
  const actor = startApp();
  actor.send({ type: "selectCategorizerIngredient", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.selectedId).toBe("garlic");
  actor.send({ type: "categorizerCopied" });
  expect(actor.getSnapshot().context.categorizer.copied).toBe(true);
  actor.send({ type: "moveCategorizerIngredient", id: "garlic", column: "ha-confirmed" });
  expect(actor.getSnapshot().context.categorizer).toEqual({
    overrides: { garlic: "ha-confirmed" },
    selectedId: "garlic",
    infoId: null,
    draggingId: null,
    dropTarget: null,
    copied: false,
    suppressClick: false,
  });
  actor.send({ type: "setCategorizerDropTarget", column: "unknown" });
  expect(actor.getSnapshot().context.categorizer.dropTarget).toBe("unknown");
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
  actor.send({ type: "setCategorizerDropTarget", column: "not-ha-confirmed" });
  actor.send({ type: "moveCategorizerIngredient", id: "garlic", column: "not-ha-confirmed" });
  actor.send({ type: "endCategorizerDrag" });
  expect(actor.getSnapshot().context.categorizer.draggingId).toBeNull();
  expect(actor.getSnapshot().context.categorizer.dropTarget).toBeNull();
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "not-ha-confirmed" });
  actor.send({ type: "categorizerPrimaryClick", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "not-ha-confirmed" });
  actor.stop();
});

test("categorizer left click sends to HA unless a drag just happened", () => {
  const actor = startApp();
  actor.send({ type: "categorizerPrimaryClick", id: "garlic" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "ha-confirmed" });
  actor.send({ type: "selectCategorizerIngredient", id: "onion", suppressClick: true });
  actor.send({ type: "categorizerPrimaryClick", id: "onion" });
  expect(actor.getSnapshot().context.categorizer.overrides).toEqual({ garlic: "ha-confirmed" });
  expect(actor.getSnapshot().context.categorizer.suppressClick).toBe(false);
  actor.stop();
});

test("FODMAP browse starts at All, keeps type across Medium/High, and resets type on All and Low", () => {
  const actor = startApp();
  expect(actor.getSnapshot().context.ingredients).toEqual({
    ha: "all",
    query: "",
    section: null,
    level: "all",
    type: "all",
    expandedId: null,
  });
  actor.send({ type: "setIngredientsFodmapLevel", level: "medium" });
  actor.send({ type: "setIngredientsFodmapType", fodmapType: "fructans" });
  actor.send({ type: "toggleIngredient", id: "tomato" });
  expect(actor.getSnapshot().context.ingredients).toMatchObject({
    level: "medium",
    type: "fructans",
    expandedId: "tomato",
  });
  actor.send({ type: "setIngredientsFodmapLevel", level: "high" });
  expect(actor.getSnapshot().context.ingredients).toMatchObject({
    level: "high",
    type: "fructans",
    expandedId: null,
  });
  actor.send({ type: "toggleIngredient", id: "garlic" });
  actor.send({ type: "setIngredientsFodmapLevel", level: "low" });
  expect(actor.getSnapshot().context.ingredients).toMatchObject({
    level: "low",
    type: "all",
    expandedId: null,
  });
  actor.send({ type: "setIngredientsFodmapLevel", level: "medium" });
  actor.send({ type: "setIngredientsFodmapType", fodmapType: "gos" });
  actor.send({ type: "setIngredientsFodmapLevel", level: "all" });
  expect(actor.getSnapshot().context.ingredients).toMatchObject({
    level: "all",
    type: "all",
    expandedId: null,
  });
  actor.stop();
});

test("restaurant city filter resets details, and cards toggle and close", () => {
  const actor = startApp();
  expect(actor.getSnapshot().context.restaurants).toEqual({
    city: "all",
    expandedId: null,
  });
  actor.send({ type: "toggleRestaurant", id: "sills-cafe-layton" });
  expect(actor.getSnapshot().context.restaurants.expandedId).toBe("sills-cafe-layton");
  actor.send({ type: "setRestaurantCity", city: "layton" });
  expect(actor.getSnapshot().context.restaurants).toEqual({
    city: "layton",
    expandedId: null,
  });
  actor.send({ type: "toggleRestaurant", id: "sills-cafe-layton" });
  actor.send({ type: "toggleRestaurant", id: "sills-cafe-layton" });
  expect(actor.getSnapshot().context.restaurants.expandedId).toBeNull();
  actor.send({ type: "toggleRestaurant", id: "wellers-bistro-layton" });
  actor.send({ type: "closeRestaurant" });
  expect(actor.getSnapshot().context.restaurants.expandedId).toBeNull();
  actor.stop();
});

test("randomMiss keeps filters and flags the empty result", () => {
  const actor = startApp();
  actor.send({ type: "setRandomMealType", mealType: "dessert" });
  actor.send({ type: "setRandomHa", ha: "ha-confirmed" });
  actor.send({ type: "randomMiss" });
  expect(actor.getSnapshot().context.random.mealType).toBe("dessert");
  expect(actor.getSnapshot().context.random.ha).toBe("ha-confirmed");
  expect(actor.getSnapshot().context.random.noMatch).toBe(true);
  actor.stop();
});
