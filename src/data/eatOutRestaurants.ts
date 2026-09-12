import { RESTAURANT_CITY_LABELS } from "./restaurantBrowse.ts";
import { getRestaurant } from "./restaurants/index.ts";
import type { EatOutRecipe, Restaurant } from "./types.ts";

export function eatOutRestaurants(recipe: EatOutRecipe): Restaurant[] {
  return recipe.restaurantIds.flatMap((id) => {
    const match = getRestaurant(id);
    return match ? [match] : [];
  });
}

export function eatOutRestaurantNames(recipe: EatOutRecipe): string[] {
  return [...new Set(eatOutRestaurants(recipe).map((item) => item.name))];
}

export function eatOutSearchHaystack(recipe: EatOutRecipe): string {
  const places = eatOutRestaurants(recipe);
  return [
    recipe.title,
    ...places.map((place) => place.name),
    ...places.map((place) => RESTAURANT_CITY_LABELS[place.city]),
  ].join(" ");
}
