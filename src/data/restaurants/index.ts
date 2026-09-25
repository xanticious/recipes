import type { Restaurant, RestaurantCity } from "../types.ts";
import { bountifulRestaurants } from "./bountiful.ts";
import { centervilleRestaurants } from "./centerville.ts";
import { edenRestaurants } from "./eden.ts";
import { farmingtonRestaurants } from "./farmington.ts";
import { farrWestRestaurants } from "./farr-west.ts";
import { harrisvilleRestaurants } from "./harrisville.ts";
import { hooperRestaurants } from "./hooper.ts";
import { huntsvilleRestaurants } from "./huntsville.ts";
import { kaysvilleRestaurants } from "./kaysville.ts";
import { laytonRestaurants } from "./layton.ts";
import { marriottSlatervilleRestaurants } from "./marriott-slaterville.ts";
import { northOgdenRestaurants } from "./north-ogden.ts";
import { northSaltLakeRestaurants } from "./north-salt-lake.ts";
import { ogdenRestaurants } from "./ogden.ts";
import { plainCityRestaurants } from "./plain-city.ts";
import { pleasantViewRestaurants } from "./pleasant-view.ts";
import { riverdaleRestaurants } from "./riverdale.ts";
import { royRestaurants } from "./roy.ts";
import { southOgdenRestaurants } from "./south-ogden.ts";
import { uintahRestaurants } from "./uintah.ts";
import { washingtonTerraceRestaurants } from "./washington-terrace.ts";
import { westHavenRestaurants } from "./west-haven.ts";
import { woodsCrossRestaurants } from "./woods-cross.ts";

export const restaurants: Restaurant[] = [
  ...bountifulRestaurants,
  ...centervilleRestaurants,
  ...farmingtonRestaurants,
  ...kaysvilleRestaurants,
  ...laytonRestaurants,
  ...northSaltLakeRestaurants,
  ...woodsCrossRestaurants,
  ...ogdenRestaurants,
  ...royRestaurants,
  ...southOgdenRestaurants,
  ...riverdaleRestaurants,
  ...northOgdenRestaurants,
  ...westHavenRestaurants,
  ...pleasantViewRestaurants,
  ...harrisvilleRestaurants,
  ...washingtonTerraceRestaurants,
  ...farrWestRestaurants,
  ...hooperRestaurants,
  ...plainCityRestaurants,
  ...marriottSlatervilleRestaurants,
  ...uintahRestaurants,
  ...huntsvilleRestaurants,
  ...edenRestaurants,
];

export const restaurantLookup = new Map(restaurants.map((item) => [item.id, item]));

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurantLookup.get(id);
}

const DAVIS_CITIES = new Set<RestaurantCity>([
  "bountiful",
  "centerville",
  "farmington",
  "kaysville",
  "layton",
  "north-salt-lake",
  "woods-cross",
]);

/** Every catalog location for this brand, including names like "Chick-fil-A (Antelope)". */
export function restaurantIdsByName(name: string): string[] {
  return restaurants
    .filter((item) => item.name === name || item.name.startsWith(`${name} (`))
    .toSorted((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name))
    .map((item) => item.id);
}

/** Davis County locations only. Eat Out orders stay on this list until Ogden is added on purpose. */
export function davisRestaurantIdsByName(name: string): string[] {
  return restaurantIdsByName(name).filter((id) => {
    const city = restaurantLookup.get(id)?.city;
    return city !== undefined && DAVIS_CITIES.has(city);
  });
}
