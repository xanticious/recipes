import type { Restaurant, RestaurantCity, RestaurantCuisine } from "./types.ts";

export function restaurant(
  id: string,
  name: string,
  city: RestaurantCity,
  description: string,
  cuisines: readonly [RestaurantCuisine, ...RestaurantCuisine[]],
  popularMenuItems: readonly string[] = [],
): Restaurant {
  return { id, name, city, description, cuisines, popularMenuItems, isFavorite: false };
}
