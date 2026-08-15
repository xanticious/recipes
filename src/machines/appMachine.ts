import { assign, setup } from "xstate";
import type { Cuisine, DietTag, MealType } from "../data/types.ts";
import { parseHash, routesEqual, type Route } from "../routing.ts";

export type ExploreFilters = {
  mealTypes: MealType[];
  cuisines: Cuisine[];
  tags: DietTag[];
  query: string;
};

export type RandomFilters = {
  mealType: MealType | null;
  cuisine: Cuisine | null;
  tags: DietTag[];
  lastRecipeId: string | null;
  noMatch: boolean;
};

export type AppContext = {
  route: Route;
  explore: ExploreFilters;
  random: RandomFilters;
};

export type AppEvent =
  | { type: "navigate"; route: Route }
  | { type: "hashChanged"; hash: string }
  | { type: "openExplore"; mealType?: MealType }
  | { type: "setExploreQuery"; query: string }
  | { type: "toggleExploreMealType"; mealType: MealType }
  | { type: "toggleExploreCuisine"; cuisine: Cuisine }
  | { type: "toggleExploreTag"; tag: DietTag }
  | { type: "clearExploreFilters" }
  | { type: "setRandomMealType"; mealType: MealType | null }
  | { type: "setRandomCuisine"; cuisine: Cuisine | null }
  | { type: "toggleRandomTag"; tag: DietTag }
  | { type: "randomMiss" }
  | { type: "openRandomRecipe"; id: string };

const emptyExplore: ExploreFilters = {
  mealTypes: [],
  cuisines: [],
  tags: [],
  query: "",
};

const emptyRandom: RandomFilters = {
  mealType: null,
  cuisine: null,
  tags: [],
  lastRecipeId: null,
  noMatch: false,
};

function toggleItem<T extends string>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

function currentHash(): string {
  return typeof window === "undefined" ? "" : window.location.hash;
}

export const appMachine = setup({
  types: {
    context: {} as AppContext,
    events: {} as AppEvent,
    input: {} as { route?: Route } | undefined,
  },
}).createMachine({
  id: "app",
  context: ({ input }) => ({
    route: input?.route ?? parseHash(currentHash()),
    explore: emptyExplore,
    random: emptyRandom,
  }),
  on: {
    navigate: {
      actions: assign({
        route: ({ event }) => event.route,
      }),
    },
    hashChanged: {
      guard: ({ context, event }) => !routesEqual(context.route, parseHash(event.hash)),
      actions: assign({
        route: ({ event }) => parseHash(event.hash),
      }),
    },
    openExplore: {
      actions: assign({
        route: { name: "explore" },
        explore: ({ event }) => ({
          ...emptyExplore,
          mealTypes: event.mealType ? [event.mealType] : [],
        }),
      }),
    },
    setExploreQuery: {
      actions: assign({
        explore: ({ context, event }) => ({ ...context.explore, query: event.query }),
      }),
    },
    toggleExploreMealType: {
      actions: assign({
        explore: ({ context, event }) => ({
          ...context.explore,
          mealTypes: toggleItem(context.explore.mealTypes, event.mealType),
        }),
      }),
    },
    toggleExploreCuisine: {
      actions: assign({
        explore: ({ context, event }) => ({
          ...context.explore,
          cuisines: toggleItem(context.explore.cuisines, event.cuisine),
        }),
      }),
    },
    toggleExploreTag: {
      actions: assign({
        explore: ({ context, event }) => ({
          ...context.explore,
          tags: toggleItem(context.explore.tags, event.tag),
        }),
      }),
    },
    clearExploreFilters: {
      actions: assign({
        explore: emptyExplore,
      }),
    },
    setRandomMealType: {
      actions: assign({
        random: ({ context, event }) => ({
          ...context.random,
          mealType: event.mealType,
          noMatch: false,
        }),
      }),
    },
    setRandomCuisine: {
      actions: assign({
        random: ({ context, event }) => ({
          ...context.random,
          cuisine: event.cuisine,
          noMatch: false,
        }),
      }),
    },
    toggleRandomTag: {
      actions: assign({
        random: ({ context, event }) => ({
          ...context.random,
          tags: toggleItem(context.random.tags, event.tag),
          noMatch: false,
        }),
      }),
    },
    randomMiss: {
      actions: assign({
        random: ({ context }) => ({ ...context.random, noMatch: true }),
      }),
    },
    openRandomRecipe: {
      actions: assign({
        route: ({ event }) => ({ name: "recipe", id: event.id, fromRandom: true }),
        random: ({ context, event }) => ({
          ...context.random,
          lastRecipeId: event.id,
          noMatch: false,
        }),
      }),
    },
  },
});
