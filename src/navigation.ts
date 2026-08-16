import type { MouseEvent } from "react";
import type { ActorRefFrom } from "xstate";
import { filterRecipes, pickRandomId, recipes } from "./data/index.ts";
import type { MealType } from "./data/types.ts";
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
  const matches = filterRecipes(recipes, {
    mealTypes: random.mealType ? [random.mealType] : undefined,
    cuisines: random.cuisine ? [random.cuisine] : undefined,
    eatOut: random.eatOut,
    ha: random.ha,
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
