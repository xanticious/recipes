import { assign, setup } from "xstate";
import {
  showsFodmapTypeRow,
  type FodmapBrowseLevel,
  type FodmapBrowseType,
} from "../data/fodmapIngredients.ts";
import type { IngredientSection } from "../data/ingredientBrowse.ts";
import {
  isMealIdeaDisplay,
  type MealIdeaDisplay,
  type MealIdeaHaFilter,
  type MealIdeaOccasionFilter,
  type MealIdeaPrepTimeFilter,
  type MealIdeaRegionFilter,
} from "../data/mealIdeaBrowse.ts";
import {
  isRestaurantDisplay,
  type RestaurantCityFilter,
  type RestaurantDisplay,
} from "../data/restaurantBrowse.ts";
import type { CategorizerColumn } from "../data/ingredientCategorizer.ts";
import type {
  Cuisine,
  HaFilter,
  IngredientHaFilter,
  MealType,
  TernaryFilter,
} from "../data/types.ts";
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
  ha: IngredientHaFilter;
  query: string;
  section: IngredientSection | null;
  level: FodmapBrowseLevel;
  type: FodmapBrowseType;
  expandedId: string | null;
};

export type RestaurantsBrowse = {
  city: RestaurantCityFilter;
  query: string;
  display: RestaurantDisplay;
  expandedId: string | null;
};

export type MealIdeasBrowse = {
  occasion: MealIdeaOccasionFilter;
  region: MealIdeaRegionFilter;
  ha: MealIdeaHaFilter;
  prepTime: MealIdeaPrepTimeFilter;
  query: string;
  display: MealIdeaDisplay;
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
  filtersOpen: boolean;
  navOpen: boolean;
  focusMode: boolean;
  wakeLockHeld: boolean;
  explore: CatalogFilters;
  eatOutCatalog: CatalogFilters;
  random: RandomFilters;
  ingredients: IngredientsBrowse;
  restaurants: RestaurantsBrowse;
  mealIdeas: MealIdeasBrowse;
  categorizer: IngredientCategorizer;
};

export type AppEvent =
  | { type: "navigate"; route: Route }
  | { type: "hashChanged"; hash: string }
  | { type: "toggleNav" }
  | { type: "closeNav" }
  | { type: "enterFocusMode" }
  | { type: "exitFocusMode" }
  | { type: "setWakeLockHeld"; held: boolean }
  | { type: "toggleFilters" }
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
  | { type: "clearRandomFilters" }
  | { type: "randomMiss" }
  | { type: "openRandomRecipe"; id: string }
  | { type: "setIngredientsHa"; ha: IngredientHaFilter }
  | { type: "setIngredientsQuery"; query: string }
  | { type: "setIngredientsSection"; section: IngredientSection | null }
  | { type: "setIngredientsFodmapLevel"; level: FodmapBrowseLevel }
  | { type: "setIngredientsFodmapType"; fodmapType: FodmapBrowseType }
  | { type: "toggleIngredient"; id: string }
  | { type: "closeIngredient" }
  | { type: "clearIngredientsFilters" }
  | { type: "setRestaurantCity"; city: RestaurantCityFilter }
  | { type: "setRestaurantQuery"; query: string }
  | { type: "setRestaurantDisplay"; display: RestaurantDisplay }
  | { type: "clearRestaurantFilters" }
  | { type: "toggleRestaurant"; id: string }
  | { type: "closeRestaurant" }
  | { type: "openRestaurant"; id: string }
  | { type: "openMealIdeas"; occasion?: MealIdeaOccasionFilter; region?: MealIdeaRegionFilter }
  | { type: "setMealIdeasOccasion"; occasion: MealIdeaOccasionFilter }
  | { type: "setMealIdeasRegion"; region: MealIdeaRegionFilter }
  | { type: "setMealIdeasHa"; ha: MealIdeaHaFilter }
  | { type: "setMealIdeasPrepTime"; prepTime: MealIdeaPrepTimeFilter }
  | { type: "setMealIdeasQuery"; query: string }
  | { type: "setMealIdeasDisplay"; display: MealIdeaDisplay }
  | { type: "toggleMealIdea"; id: string }
  | { type: "openMealIdea"; id: string }
  | { type: "closeMealIdea" }
  | { type: "clearMealIdeasFilters" }
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
  level: "all",
  type: "all",
  expandedId: null,
};

const emptyRestaurants: RestaurantsBrowse = {
  city: "all",
  query: "",
  display: "pictures",
  expandedId: null,
};

export const RESTAURANTS_DISPLAY_STORAGE_KEY = "family-recipes-restaurants-display";

export function readStoredRestaurantDisplay(): RestaurantDisplay {
  if (typeof localStorage === "undefined") {
    return "pictures";
  }
  const stored = localStorage.getItem(RESTAURANTS_DISPLAY_STORAGE_KEY);
  if (stored !== null && isRestaurantDisplay(stored)) {
    return stored;
  }
  return "pictures";
}

export function persistRestaurantDisplay(display: RestaurantDisplay): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(RESTAURANTS_DISPLAY_STORAGE_KEY, display);
  }
}

export const MEAL_IDEAS_DISPLAY_STORAGE_KEY = "family-recipes-meal-ideas-display";

export function readStoredMealIdeasDisplay(): MealIdeaDisplay {
  if (typeof localStorage === "undefined") {
    return "list";
  }
  const stored = localStorage.getItem(MEAL_IDEAS_DISPLAY_STORAGE_KEY);
  if (stored !== null && isMealIdeaDisplay(stored)) {
    return stored;
  }
  return "list";
}

export function persistMealIdeasDisplay(display: MealIdeaDisplay): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(MEAL_IDEAS_DISPLAY_STORAGE_KEY, display);
  }
}

const emptyMealIdeas: MealIdeasBrowse = {
  occasion: "all",
  region: "all",
  ha: "all",
  prepTime: "all",
  query: "",
  display: "list",
  expandedId: null,
};

function mealIdeasForRoute(mealIdeas: MealIdeasBrowse, route: Route): MealIdeasBrowse {
  if (route.name === "mealIdeas" || mealIdeas.expandedId === null) {
    return mealIdeas;
  }
  return { ...mealIdeas, expandedId: null };
}

function chromeForRoute(
  context: AppContext,
  route: Route,
): Pick<AppContext, "route" | "navOpen" | "focusMode" | "wakeLockHeld" | "mealIdeas"> {
  return {
    route,
    navOpen: false,
    focusMode: false,
    wakeLockHeld: false,
    mealIdeas: mealIdeasForRoute(context.mealIdeas, route),
  };
}

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
    filtersOpen: false,
    navOpen: false,
    focusMode: false,
    wakeLockHeld: false,
    explore: emptyCatalog,
    eatOutCatalog: emptyCatalog,
    random: emptyRandom,
    ingredients: emptyIngredients,
    restaurants: {
      ...emptyRestaurants,
      display: readStoredRestaurantDisplay(),
    },
    mealIdeas: {
      ...emptyMealIdeas,
      display: readStoredMealIdeasDisplay(),
    },
    categorizer: emptyCategorizer,
  }),
  on: {
    navigate: {
      actions: assign(({ context, event }) => chromeForRoute(context, event.route)),
    },
    hashChanged: {
      guard: ({ context, event }) => !routesEqual(context.route, parseHash(event.hash)),
      actions: assign(({ context, event }) => chromeForRoute(context, parseHash(event.hash))),
    },
    toggleNav: {
      guard: ({ context }) => !context.focusMode,
      actions: assign({
        navOpen: ({ context }) => !context.navOpen,
      }),
    },
    closeNav: {
      actions: assign({
        navOpen: false,
      }),
    },
    enterFocusMode: {
      guard: ({ context }) => context.route.name === "recipe" && !context.focusMode,
      actions: assign({
        focusMode: true,
        navOpen: false,
      }),
    },
    exitFocusMode: {
      actions: assign({
        focusMode: false,
        wakeLockHeld: false,
      }),
    },
    setWakeLockHeld: {
      actions: assign({
        wakeLockHeld: ({ event }) => event.held,
      }),
    },
    toggleFilters: {
      actions: assign({
        filtersOpen: ({ context }) => !context.filtersOpen,
      }),
    },
    openExplore: {
      actions: assign(({ context, event }) => ({
        ...chromeForRoute(context, { name: "explore" }),
        explore: {
          ...emptyCatalog,
          mealTypes: event.mealType ? [event.mealType] : [],
        },
      })),
    },
    openEatOut: {
      actions: assign(({ context }) => ({
        ...chromeForRoute(context, { name: "eatOut" }),
        eatOutCatalog: emptyCatalog,
      })),
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
    clearRandomFilters: {
      actions: assign({
        random: ({ context }) => ({
          ...emptyRandom,
          lastRecipeId: context.random.lastRecipeId,
        }),
      }),
    },
    randomMiss: {
      actions: assign({
        random: ({ context }) => ({ ...context.random, noMatch: true }),
      }),
    },
    openRandomRecipe: {
      actions: assign(({ context, event }) => ({
        ...chromeForRoute(context, { name: "recipe", id: event.id, fromRandom: true }),
        random: {
          ...context.random,
          lastRecipeId: event.id,
          noMatch: false,
        },
      })),
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
    setIngredientsFodmapLevel: {
      actions: assign({
        ingredients: ({ context, event }) => ({
          ...context.ingredients,
          level: event.level,
          type: showsFodmapTypeRow(event.level) ? context.ingredients.type : "all",
          expandedId: null,
        }),
      }),
    },
    setIngredientsFodmapType: {
      actions: assign({
        ingredients: ({ context, event }) => ({
          ...context.ingredients,
          type: event.fodmapType,
          expandedId: null,
        }),
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
    closeIngredient: {
      actions: assign({
        ingredients: ({ context }) => ({
          ...context.ingredients,
          expandedId: null,
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
    setRestaurantCity: {
      actions: assign({
        restaurants: ({ context, event }) => ({
          ...context.restaurants,
          city: event.city,
          expandedId: null,
        }),
      }),
    },
    setRestaurantQuery: {
      actions: assign({
        restaurants: ({ context, event }) => ({
          ...context.restaurants,
          query: event.query,
        }),
      }),
    },
    setRestaurantDisplay: {
      actions: [
        assign({
          restaurants: ({ context, event }) => ({
            ...context.restaurants,
            display: event.display,
          }),
        }),
        ({ event }) => {
          persistRestaurantDisplay(event.display);
        },
      ],
    },
    clearRestaurantFilters: {
      actions: assign({
        restaurants: ({ context }) => ({
          ...emptyRestaurants,
          display: context.restaurants.display,
          expandedId: context.restaurants.expandedId,
        }),
      }),
    },
    toggleRestaurant: {
      actions: assign({
        restaurants: ({ context, event }) => ({
          ...context.restaurants,
          expandedId: context.restaurants.expandedId === event.id ? null : event.id,
        }),
      }),
    },
    closeRestaurant: {
      actions: assign({
        restaurants: ({ context }) => ({
          ...context.restaurants,
          expandedId: null,
        }),
      }),
    },
    openRestaurant: {
      actions: assign({
        route: { name: "restaurants" },
        restaurants: ({ context, event }) => ({
          city: "all",
          query: "",
          display: context.restaurants.display,
          expandedId: event.id,
        }),
      }),
    },
    openMealIdeas: {
      actions: assign(({ context, event }) => ({
        ...chromeForRoute(context, { name: "mealIdeas" }),
        mealIdeas: {
          ...emptyMealIdeas,
          display: context.mealIdeas.display,
          occasion: event.occasion ?? "all",
          region: event.region ?? "all",
        },
      })),
    },
    setMealIdeasOccasion: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          occasion: event.occasion,
          expandedId: null,
        }),
      }),
    },
    setMealIdeasRegion: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          region: event.region,
          expandedId: null,
        }),
      }),
    },
    setMealIdeasHa: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          ha: event.ha,
          expandedId: null,
        }),
      }),
    },
    setMealIdeasPrepTime: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          prepTime: event.prepTime,
          expandedId: null,
        }),
      }),
    },
    setMealIdeasQuery: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          query: event.query,
        }),
      }),
    },
    setMealIdeasDisplay: {
      actions: [
        assign({
          mealIdeas: ({ context, event }) => ({
            ...context.mealIdeas,
            display: event.display,
          }),
        }),
        ({ event }) => {
          persistMealIdeasDisplay(event.display);
        },
      ],
    },
    toggleMealIdea: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          expandedId: context.mealIdeas.expandedId === event.id ? null : event.id,
        }),
      }),
    },
    openMealIdea: {
      actions: assign({
        mealIdeas: ({ context, event }) => ({
          ...context.mealIdeas,
          expandedId: event.id,
        }),
      }),
    },
    closeMealIdea: {
      actions: assign({
        mealIdeas: ({ context }) => ({
          ...context.mealIdeas,
          expandedId: null,
        }),
      }),
    },
    clearMealIdeasFilters: {
      actions: assign({
        mealIdeas: ({ context }) => ({
          ...emptyMealIdeas,
          display: context.mealIdeas.display,
          expandedId: context.mealIdeas.expandedId,
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
            overrides: { ...context.categorizer.overrides, [event.id]: "ha-confirmed" },
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
