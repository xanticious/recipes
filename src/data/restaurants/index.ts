import type { Restaurant } from "../types.ts";
import { bountifulRestaurants } from "./bountiful.ts";
import { centervilleRestaurants } from "./centerville.ts";
import { farmingtonRestaurants } from "./farmington.ts";
import { kaysvilleRestaurants } from "./kaysville.ts";
import { laytonRestaurants } from "./layton.ts";
import { northSaltLakeRestaurants } from "./north-salt-lake.ts";
import { woodsCrossRestaurants } from "./woods-cross.ts";

export const restaurants: Restaurant[] = [
  ...bountifulRestaurants,
  ...centervilleRestaurants,
  ...farmingtonRestaurants,
  ...kaysvilleRestaurants,
  ...laytonRestaurants,
  ...northSaltLakeRestaurants,
  ...woodsCrossRestaurants,
];

export const restaurantLookup = new Map(restaurants.map((item) => [item.id, item]));

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurantLookup.get(id);
}
