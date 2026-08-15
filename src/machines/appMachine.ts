import { assign, setup } from "xstate";
import type { Cuisine, DietTag, IngredientSelection, MealType } from "../data/types.ts";
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

export type RecipeView = {
  recipeId: string | null;
  expanded: { slot: string; tag: DietTag } | null;
  selections: Record<string, IngredientSelection>;
};

export type AppContext = {
  route: Route;
  explore: ExploreFilters;
  random: RandomFilters;
  recipeView: RecipeView;
};

export type AppEvent =
  | { type: "navigate"; route: Route }
  | { type: "hashChanged"; hash: string }
  | { type: "openExplore"; mealType?: MealType; tag?: DietTag }
  | { type: "setExploreQuery"; query: string }
  | { type: "toggleExploreMealType"; mealType: MealType }
  | { type: "toggleExploreCuisine"; cuisine: Cuisine }
  | { type: "toggleExploreTag"; tag: DietTag }
  | { type: "clearExploreFilters" }
  | { type: "setRandomMealType"; mealType: MealType | null }
  | { type: "setRandomCuisine"; cuisine: Cuisine | null }
  | { type: "toggleRandomTag"; tag: DietTag }
  | { type: "randomMiss" }
  | { type: "openRandomRecipe"; id: string }
  | { type: "toggleSubPanel"; recipeId: string; slot: string; tag: DietTag }
  | {
      type: "selectSubstitution";
      recipeId: string;
      slot: string;
      tag: DietTag;
      optionIndex: number;
    }
  | { type: "clearSubstitution"; recipeId: string; slot: string }
  | { type: "collapseSubPanel" };

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

const emptyRecipeView: RecipeView = {
  recipeId: null,
  expanded: null,
  selections: {},
};

function recipeIdFromRoute(route: Route): string | null {
  return route.name === "recipe" ? route.id : null;
}

function recipeViewFor(recipeId: string | null, previous: RecipeView): RecipeView {
  if (recipeId === previous.recipeId) {
    return previous;
  }
  return { recipeId, expanded: null, selections: {} };
}

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
    recipeView: emptyRecipeView,
  }),
  on: {
    navigate: {
      actions: assign({
        route: ({ event }) => event.route,
        recipeView: ({ context, event }) =>
          recipeViewFor(recipeIdFromRoute(event.route), context.recipeView),
      }),
    },
    hashChanged: {
      guard: ({ context, event }) => !routesEqual(context.route, parseHash(event.hash)),
      actions: assign({
        route: ({ event }) => parseHash(event.hash),
        recipeView: ({ context, event }) =>
          recipeViewFor(recipeIdFromRoute(parseHash(event.hash)), context.recipeView),
      }),
    },
    openExplore: {
      actions: assign({
        route: { name: "explore" },
        explore: ({ event }) => ({
          ...emptyExplore,
          mealTypes: event.mealType ? [event.mealType] : [],
          tags: event.tag ? [event.tag] : [],
        }),
        recipeView: ({ context }) => recipeViewFor(null, context.recipeView),
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
        recipeView: ({ context, event }) => recipeViewFor(event.id, context.recipeView),
      }),
    },
    toggleSubPanel: {
      actions: assign({
        recipeView: ({ context, event }) => {
          const view = recipeViewFor(event.recipeId, context.recipeView);
          const already = view.expanded?.slot === event.slot && view.expanded.tag === event.tag;
          return {
            ...view,
            expanded: already ? null : { slot: event.slot, tag: event.tag },
          };
        },
      }),
    },
    selectSubstitution: {
      actions: assign({
        recipeView: ({ context, event }) => {
          const view = recipeViewFor(event.recipeId, context.recipeView);
          return {
            ...view,
            expanded: null,
            selections: {
              ...view.selections,
              [event.slot]: { tag: event.tag, optionIndex: event.optionIndex },
            },
          };
        },
      }),
    },
    clearSubstitution: {
      actions: assign({
        recipeView: ({ context, event }) => {
          const view = recipeViewFor(event.recipeId, context.recipeView);
          const selections = { ...view.selections };
          delete selections[event.slot];
          return { ...view, expanded: null, selections };
        },
      }),
    },
    collapseSubPanel: {
      actions: assign({
        recipeView: ({ context }) => ({ ...context.recipeView, expanded: null }),
      }),
    },
  },
});
