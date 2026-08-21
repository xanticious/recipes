import type { Restaurant, RestaurantCity, RestaurantCuisine } from "./types.ts";

export const RESTAURANT_CITIES = [
  "bountiful",
  "centerville",
  "farmington",
  "kaysville",
  "layton",
  "north-salt-lake",
  "woods-cross",
] as const satisfies readonly RestaurantCity[];

export const RESTAURANT_CITY_LABELS: Record<RestaurantCity, string> = {
  bountiful: "Bountiful",
  centerville: "Centerville",
  farmington: "Farmington",
  kaysville: "Kaysville",
  layton: "Layton",
  "north-salt-lake": "North Salt Lake",
  "woods-cross": "Woods Cross",
};

export const RESTAURANT_CUISINES = [
  "american",
  "mexican",
  "italian",
  "asian",
  "mediterranean",
  "indian",
  "bbq",
  "breakfast",
  "other",
] as const satisfies readonly RestaurantCuisine[];

export const RESTAURANT_CUISINE_LABELS: Record<RestaurantCuisine, string> = {
  american: "American",
  mexican: "Mexican",
  italian: "Italian",
  asian: "Asian",
  mediterranean: "Mediterranean",
  indian: "Indian",
  bbq: "BBQ",
  breakfast: "Breakfast & Cafe",
  other: "Other",
};

export const POPULAR_MENU_SLOTS = 5;

export type RestaurantCityFilter = "all" | RestaurantCity;

export type RestaurantFilters = {
  city: RestaurantCityFilter;
};

export type GroupedRestaurants = {
  cuisine: RestaurantCuisine;
  restaurants: Restaurant[];
};

export function isRestaurantCity(value: string): value is RestaurantCity {
  return RESTAURANT_CITIES.some((city) => city === value);
}

export function isRestaurantCuisine(value: string): value is RestaurantCuisine {
  return RESTAURANT_CUISINES.some((cuisine) => cuisine === value);
}

export function primaryCuisine(restaurant: Restaurant): RestaurantCuisine {
  return restaurant.cuisines[0];
}

export function restaurantMatchesFilters(
  restaurant: Restaurant,
  filters: RestaurantFilters,
): boolean {
  return filters.city === "all" || restaurant.city === filters.city;
}

export function filterRestaurants(
  catalog: readonly Restaurant[],
  filters: RestaurantFilters,
): Restaurant[] {
  return catalog.filter((restaurant) => restaurantMatchesFilters(restaurant, filters));
}

export function groupRestaurants(catalog: readonly Restaurant[]): GroupedRestaurants[] {
  const byCuisine = new Map<RestaurantCuisine, Restaurant[]>();
  for (const restaurant of catalog) {
    const cuisine = primaryCuisine(restaurant);
    const group = byCuisine.get(cuisine);
    if (group) {
      group.push(restaurant);
    } else {
      byCuisine.set(cuisine, [restaurant]);
    }
  }
  return RESTAURANT_CUISINES.flatMap((cuisine) => {
    const group = byCuisine.get(cuisine);
    if (!group || group.length === 0) {
      return [];
    }
    return [
      {
        cuisine,
        restaurants: group.toSorted(
          (a, b) => a.name.localeCompare(b.name) || a.city.localeCompare(b.city),
        ),
      },
    ];
  });
}

export function duplicateRestaurantNames(catalog: readonly Restaurant[]): ReadonlySet<string> {
  const counts = new Map<string, number>();
  for (const restaurant of catalog) {
    counts.set(restaurant.name, (counts.get(restaurant.name) ?? 0) + 1);
  }
  return new Set([...counts.entries()].filter(([, count]) => count > 1).map(([name]) => name));
}

export function restaurantDisplayName(
  restaurant: Restaurant,
  duplicateNames: ReadonlySet<string>,
): string {
  if (!duplicateNames.has(restaurant.name)) {
    return restaurant.name;
  }
  return `${restaurant.name} (${RESTAURANT_CITY_LABELS[restaurant.city]})`;
}

export function popularMenuSlots(items: readonly string[]): (string | null)[] {
  return Array.from({ length: POPULAR_MENU_SLOTS }, (_, index) => items[index] ?? null);
}
