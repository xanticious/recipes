import { assign, setup } from "xstate";
import type { Cuisine, MealType, TernaryFilter } from "../data/types.ts";
import { parseHash, routesEqual, type Route } from "../routing.ts";

export type ExploreFilters = {
  mealTypes: MealType[];
  cuisines: Cuisine[];
  eatOut: TernaryFilter;
  ha: TernaryFilter;
  query: string;
};

export type RandomFilters = {
  mealType: MealType | null;
  cuisine: Cuisine | null;
  eatOut: TernaryFilter;
  ha: TernaryFilter;
  lastRecipeId: string | null;
  noMatch: boolean;
};

export type IngredientsBrowse = {
  ha: TernaryFilter;
  query: string;
  expandedId: string | null;
};

export type AppContext = {
  route: Route;
  explore: ExploreFilters;
  random: RandomFilters;
  ingredients: IngredientsBrowse;
};

export type AppEvent =
  | { type: "navigate"; route: Route }
  | { type: "hashChanged"; hash: string }
  | { type: "openExplore"; mealType?: MealType }
  | { type: "setExploreQuery"; query: string }
  | { type: "toggleExploreMealType"; mealType: MealType }
  | { type: "toggleExploreCuisine"; cuisine: Cuisine }
  | { type: "setExploreEatOut"; eatOut: TernaryFilter }
  | { type: "setExploreHa"; ha: TernaryFilter }
  | { type: "clearExploreFilters" }
  | { type: "setRandomMealType"; mealType: MealType | null }
  | { type: "setRandomCuisine"; cuisine: Cuisine | null }
  | { type: "setRandomEatOut"; eatOut: TernaryFilter }
  | { type: "setRandomHa"; ha: TernaryFilter }
  | { type: "randomMiss" }
  | { type: "openRandomRecipe"; id: string }
  | { type: "setIngredientsHa"; ha: TernaryFilter }
  | { type: "setIngredientsQuery"; query: string }
  | { type: "toggleIngredient"; id: string }
  | { type: "clearIngredientsFilters" };

const emptyExplore: ExploreFilters = {
  mealTypes: [],
  cuisines: [],
  eatOut: "all",
  ha: "all",
  query: "",
};

const emptyRandom: RandomFilters = {
  mealType: null,
  cuisine: null,
  eatOut: "all",
  ha: "all",
  lastRecipeId: null,
  noMatch: false,
};

const emptyIngredients: IngredientsBrowse = {
  ha: "all",
  query: "",
  expandedId: null,
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
    ingredients: emptyIngredients,
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
    setExploreEatOut: {
      actions: assign({
        explore: ({ context, event }) => ({ ...context.explore, eatOut: event.eatOut }),
      }),
    },
    setExploreHa: {
      actions: assign({
        explore: ({ context, event }) => ({ ...context.explore, ha: event.ha }),
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
    setRandomEatOut: {
      actions: assign({
        random: ({ context, event }) => ({
          ...context.random,
          eatOut: event.eatOut,
          noMatch: false,
        }),
      }),
    },
    setRandomHa: {
      actions: assign({
        random: ({ context, event }) => ({
          ...context.random,
          ha: event.ha,
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
    setIngredientsHa: {
      actions: assign({
        ingredients: ({ context, event }) => ({ ...context.ingredients, ha: event.ha }),
      }),
    },
    setIngredientsQuery: {
      actions: assign({
        ingredients: ({ context, event }) => ({ ...context.ingredients, query: event.query }),
      }),
    },
    toggleIngredient: {
      actions: assign({
        ingredients: ({ context, event }) => ({
          ...context.ingredients,
          expandedId: context.ingredients.expandedId === event.id ? null : event.id,
        }),
      }),
    },
    clearIngredientsFilters: {
      actions: assign({
        ingredients: ({ context }) => ({
          ...emptyIngredients,
          expandedId: context.ingredients.expandedId,
        }),
      }),
    },
  },
});
