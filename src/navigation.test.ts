import type { MouseEvent } from "react";
import { createActor } from "xstate";
import { afterEach, expect, test, vi } from "vitest";
import { appMachine } from "./machines/appMachine.ts";
import {
  goOpenEatOut,
  goOpenExplore,
  goOpenMealIdeas,
  goToRoute,
  handleRouteClick,
  openRandomFromFilters,
  syncHash,
} from "./navigation.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubHash(hash = "") {
  const location = { hash };
  vi.stubGlobal("window", { location });
  return location;
}

function startApp() {
  const actor = createActor(appMachine, { input: { route: { name: "landing" } } });
  actor.start();
  return actor;
}

function clickEvent(
  overrides: Partial<MouseEvent<HTMLAnchorElement>> = {},
): MouseEvent<HTMLAnchorElement> {
  return {
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    button: 0,
    preventDefault: vi.fn(),
    ...overrides,
  } as MouseEvent<HTMLAnchorElement>;
}

test("syncHash writes only when the location hash changes", () => {
  const location = stubHash("#/");
  syncHash({ name: "landing" });
  expect(location.hash).toBe("#/");
  syncHash({ name: "explore" });
  expect(location.hash).toBe("#/recipes");
});

test("goToRoute and the open helpers send machine events and sync the hash", () => {
  const location = stubHash();
  const actor = startApp();
  goToRoute(actor, { name: "guide" });
  expect(actor.getSnapshot().context.route).toEqual({ name: "guide" });
  expect(location.hash).toBe("#/guide");

  goOpenExplore(actor, "dinner");
  expect(actor.getSnapshot().context.route).toEqual({ name: "explore" });
  expect(actor.getSnapshot().context.explore.mealTypes).toEqual(["dinner"]);
  expect(location.hash).toBe("#/recipes");

  goOpenMealIdeas(actor, "breakfast");
  expect(actor.getSnapshot().context.route).toEqual({ name: "mealIdeas" });
  expect(actor.getSnapshot().context.mealIdeas.occasion).toBe("breakfast");
  expect(location.hash).toBe("#/meal-ideas");

  goOpenEatOut(actor);
  expect(actor.getSnapshot().context.route).toEqual({ name: "eatOut" });
  expect(location.hash).toBe("#/eat-out");
  actor.stop();
});

test("handleRouteClick ignores modified or non-primary clicks", () => {
  const location = stubHash();
  const actor = startApp();
  const modified = clickEvent({ metaKey: true });
  handleRouteClick(modified, actor, { name: "guide" });
  expect(modified.preventDefault).not.toHaveBeenCalled();
  expect(actor.getSnapshot().context.route).toEqual({ name: "landing" });

  const event = clickEvent();
  handleRouteClick(event, actor, { name: "guide" });
  expect(event.preventDefault).toHaveBeenCalled();
  expect(actor.getSnapshot().context.route).toEqual({ name: "guide" });
  expect(location.hash).toBe("#/guide");
  actor.stop();
});

test("openRandomFromFilters opens a matching recipe or flags a miss", () => {
  const location = stubHash();
  const actor = startApp();
  openRandomFromFilters(actor);
  const hit = actor.getSnapshot();
  expect(hit.context.route.name).toBe("recipe");
  if (hit.context.route.name === "recipe") {
    expect(hit.context.route.fromRandom).toBe(true);
    expect(hit.context.random.lastRecipeId).toBe(hit.context.route.id);
    expect(location.hash).toBe(`#/recipes/${hit.context.route.id}?from=random`);
  }
  expect(hit.context.random.noMatch).toBe(false);

  actor.send({ type: "setRandomMealType", mealType: "dessert" });
  actor.send({ type: "setRandomCuisine", cuisine: "indian" });
  actor.send({ type: "setRandomEatOut", eatOut: "yes" });
  openRandomFromFilters(actor);
  expect(actor.getSnapshot().context.random.noMatch).toBe(true);
  expect(actor.getSnapshot().context.route).toEqual({ name: "random" });
  expect(location.hash).toBe("#/random");
  actor.stop();
});
