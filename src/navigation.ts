import type { MouseEvent } from "react";
import type { ActorRefFrom } from "xstate";
import { filterRecipes, ingredientLookup, pickRandomId, recipes } from "./data/index.ts";
import type { DietTag, MealType } from "./data/types.ts";
import type { appMachine } from "./machines/appMachine.ts";
import { routeToHash, type Route } from "./routing.ts";

export type AppActor = ActorRefFrom<typeof appMachine>;

export function syncHash(route: Route): void {
  const hash = routeToHash(route);
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }
}

export function goToRoute(appActor: AppActor, route: Route): void {
  appActor.send({ type: "navigate", route });
  syncHash(route);
}

export function goOpenExplore(appActor: AppActor, mealType?: MealType): void {
  appActor.send({ type: "openExplore", mealType });
  syncHash({ name: "explore" });
}

export function goOpenExploreWithTag(appActor: AppActor, tag: DietTag): void {
  appActor.send({ type: "openExplore", tag });
  syncHash({ name: "explore" });
}

export function handleRouteClick(
  event: MouseEvent<HTMLAnchorElement>,
  appActor: AppActor,
  route: Route,
): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }
  event.preventDefault();
  goToRoute(appActor, route);
}

export function openRandomFromFilters(appActor: AppActor): void {
  const { random } = appActor.getSnapshot().context;
  const matches = filterRecipes(recipes, ingredientLookup, {
    mealTypes: random.mealType ? [random.mealType] : undefined,
    cuisines: random.cuisine ? [random.cuisine] : undefined,
    tags: random.tags,
  });
  const id = pickRandomId(
    matches.map((recipe) => recipe.id),
    random.lastRecipeId,
  );
  if (id === null) {
    appActor.send({ type: "randomMiss" });
    goToRoute(appActor, { name: "random" });
    return;
  }
  appActor.send({ type: "openRandomRecipe", id });
  syncHash({ name: "recipe", id, fromRandom: true });
}
