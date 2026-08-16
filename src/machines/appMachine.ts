import { assign, setup } from "xstate";
import type { CategorizerColumn } from "../data/ingredientCategorizer.ts";
import type { IngredientSection } from "../data/ingredientBrowse.ts";
import type { Cuisine, HaFilter, MealType, TernaryFilter } from "../data/types.ts";
import { parseHash, routesEqual, type Route } from "../routing.ts";

export type CatalogFilters = {
  mealTypes: MealType[];
  cuisines: Cuisine[];
  ha: HaFilter;
  query: string;
};

export type ExploreFilters = CatalogFilters;

export type RandomFilters = {
  mealType: MealType | null;
  cuisine: Cuisine | null;
  eatOut: TernaryFilter;
  ha: HaFilter;
  lastRecipeId: string | null;
  noMatch: boolean;
};

export type IngredientsBrowse = {
  ha: HaFilter;
  query: string;
  section: IngredientSection | null;
  expandedId: string | null;
};

export type IngredientCategorizer = {
  overrides: Record<string, CategorizerColumn>;
  selectedId: string | null;
  infoId: string | null;
  draggingId: string | null;
  dropTarget: CategorizerColumn | null;
  copied: boolean;
  suppressClick: boolean;
};

export type AppContext = {
  route: Route;
  explore: CatalogFilters;
  eatOutCatalog: CatalogFilters;
  random: RandomFilters;
  ingredients: IngredientsBrowse;
  categorizer: IngredientCategorizer;
};

export type AppEvent =
  | { type: "navigate"; route: Route }
  | { type: "hashChanged"; hash: string }
  | { type: "openExplore"; mealType?: MealType }
  | { type: "openEatOut" }
  | { type: "setExploreQuery"; query: string }
  | { type: "toggleExploreMealType"; mealType: MealType }
  | { type: "toggleExploreCuisine"; cuisine: Cuisine }
  | { type: "setExploreHa"; ha: HaFilter }
  | { type: "clearExploreFilters" }
  | { type: "setEatOutQuery"; query: string }
  | { type: "toggleEatOutMealType"; mealType: MealType }
  | { type: "toggleEatOutCuisine"; cuisine: Cuisine }
  | { type: "setEatOutHa"; ha: HaFilter }
  | { type: "clearEatOutFilters" }
  | { type: "setRandomMealType"; mealType: MealType | null }
  | { type: "setRandomCuisine"; cuisine: Cuisine | null }
  | { type: "setRandomEatOut"; eatOut: TernaryFilter }
  | { type: "setRandomHa"; ha: HaFilter }
  | { type: "randomMiss" }
  | { type: "openRandomRecipe"; id: string }
  | { type: "setIngredientsHa"; ha: HaFilter }
  | { type: "setIngredientsQuery"; query: string }
  | { type: "setIngredientsSection"; section: IngredientSection | null }
  | { type: "toggleIngredient"; id: string }
  | { type: "clearIngredientsFilters" }
  | { type: "selectCategorizerIngredient"; id: string; suppressClick?: boolean }
  | { type: "categorizerPrimaryClick"; id: string }
  | { type: "moveCategorizerIngredient"; id: string; column: CategorizerColumn }
  | { type: "setCategorizerDropTarget"; column: CategorizerColumn | null }
  | { type: "startCategorizerDrag"; id: string }
  | { type: "endCategorizerDrag" }
  | { type: "toggleCategorizerInfo"; id: string }
  | { type: "categorizerCopied" };

const emptyCatalog: CatalogFilters = {
  mealTypes: [],
  cuisines: [],
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
  section: null,
  expandedId: null,
};

const emptyCategorizer: IngredientCategorizer = {
  overrides: {},
  selectedId: null,
  infoId: null,
  draggingId: null,
  dropTarget: null,
  copied: false,
  suppressClick: false,
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
    explore: emptyCatalog,
    eatOutCatalog: emptyCatalog,
    random: emptyRandom,
    ingredients: emptyIngredients,
    categorizer: emptyCategorizer,
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
          ...emptyCatalog,
          mealTypes: event.mealType ? [event.mealType] : [],
        }),
      }),
    },
    openEatOut: {
      actions: assign({
        route: { name: "eatOut" },
        eatOutCatalog: emptyCatalog,
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
    setExploreHa: {
      actions: assign({
        explore: ({ context, event }) => ({ ...context.explore, ha: event.ha }),
      }),
    },
    clearExploreFilters: {
      actions: assign({
        explore: emptyCatalog,
      }),
    },
    setEatOutQuery: {
      actions: assign({
        eatOutCatalog: ({ context, event }) => ({ ...context.eatOutCatalog, query: event.query }),
      }),
    },
    toggleEatOutMealType: {
      actions: assign({
        eatOutCatalog: ({ context, event }) => ({
          ...context.eatOutCatalog,
          mealTypes: toggleItem(context.eatOutCatalog.mealTypes, event.mealType),
        }),
      }),
    },
    toggleEatOutCuisine: {
      actions: assign({
        eatOutCatalog: ({ context, event }) => ({
          ...context.eatOutCatalog,
          cuisines: toggleItem(context.eatOutCatalog.cuisines, event.cuisine),
        }),
      }),
    },
    setEatOutHa: {
      actions: assign({
        eatOutCatalog: ({ context, event }) => ({ ...context.eatOutCatalog, ha: event.ha }),
      }),
    },
    clearEatOutFilters: {
      actions: assign({
        eatOutCatalog: emptyCatalog,
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
    setIngredientsSection: {
      actions: assign({
        ingredients: ({ context, event }) => ({ ...context.ingredients, section: event.section }),
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
    selectCategorizerIngredient: {
      actions: assign({
        categorizer: ({ context, event }) => ({
          ...context.categorizer,
          selectedId: event.id,
          suppressClick: event.suppressClick ?? false,
        }),
      }),
    },
    categorizerPrimaryClick: {
      actions: assign({
        categorizer: ({ context, event }) => {
          if (context.categorizer.suppressClick) {
            return { ...context.categorizer, suppressClick: false };
          }
          return {
            ...context.categorizer,
            overrides: { ...context.categorizer.overrides, [event.id]: "ha" },
            selectedId: event.id,
            copied: false,
          };
        },
      }),
    },
    moveCategorizerIngredient: {
      actions: assign({
        categorizer: ({ context, event }) => ({
          ...context.categorizer,
          overrides: { ...context.categorizer.overrides, [event.id]: event.column },
          selectedId: event.id,
          copied: false,
        }),
      }),
    },
    setCategorizerDropTarget: {
      guard: ({ context, event }) => context.categorizer.dropTarget !== event.column,
      actions: assign({
        categorizer: ({ context, event }) => ({
          ...context.categorizer,
          dropTarget: event.column,
        }),
      }),
    },
    startCategorizerDrag: {
      actions: assign({
        categorizer: ({ context, event }) => ({
          ...context.categorizer,
          selectedId: event.id,
          draggingId: event.id,
          suppressClick: true,
        }),
      }),
    },
    endCategorizerDrag: {
      actions: assign({
        categorizer: ({ context }) => ({
          ...context.categorizer,
          draggingId: null,
          dropTarget: null,
        }),
      }),
    },
    toggleCategorizerInfo: {
      actions: assign({
        categorizer: ({ context, event }) => ({
          ...context.categorizer,
          selectedId: event.id,
          infoId: context.categorizer.infoId === event.id ? null : event.id,
        }),
      }),
    },
    categorizerCopied: {
      actions: assign({
        categorizer: ({ context }) => ({ ...context.categorizer, copied: true }),
      }),
    },
  },
});
