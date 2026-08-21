import { expect, test } from "vitest";
import {
  duplicateRestaurantNames,
  filterRestaurants,
  groupRestaurants,
  isRestaurantCity,
  isRestaurantCuisine,
  POPULAR_MENU_SLOTS,
  popularMenuSlots,
  primaryCuisine,
  RESTAURANT_CITIES,
  RESTAURANT_CUISINES,
  restaurantDisplayName,
} from "./restaurantBrowse.ts";
import { restaurants } from "./restaurants/index.ts";
import type { Restaurant } from "./types.ts";

test("restaurant ids are unique", () => {
  const ids = restaurants.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("the catalog covers every Davis County city in the list", () => {
  const cities = new Set(restaurants.map((item) => item.city));
  expect(cities).toEqual(new Set(RESTAURANT_CITIES));
  expect(restaurants.length).toBeGreaterThanOrEqual(50);
});

test("every restaurant has a primary cuisine and five popular items", () => {
  for (const item of restaurants) {
    expect(item.cuisines.length).toBeGreaterThan(0);
    expect(RESTAURANT_CUISINES).toContain(item.cuisines[0]);
    expect(item.popularMenuItems).toHaveLength(POPULAR_MENU_SLOTS);
    expect(item.popularMenuItems.every((name) => name.length > 0)).toBe(true);
    expect(item.isFavorite).toBe(false);
  }
});

test("city filter keeps only that city", () => {
  const layton = filterRestaurants(restaurants, { city: "layton" });
  expect(layton.length).toBeGreaterThan(0);
  expect(layton.every((item) => item.city === "layton")).toBe(true);
  expect(filterRestaurants(restaurants, { city: "all" })).toHaveLength(restaurants.length);
});

test("grouping uses primary cuisine, sorted by name, and skips empty categories", () => {
  const grouped = groupRestaurants(restaurants);
  expect(grouped.length).toBeGreaterThan(0);
  expect(grouped.every((group) => group.restaurants.length > 0)).toBe(true);
  for (const group of grouped) {
    expect(group.restaurants.every((item) => primaryCuisine(item) === group.cuisine)).toBe(true);
    const names = group.restaurants.map((item) => item.name);
    expect(names).toEqual([...names].toSorted((a, b) => a.localeCompare(b)));
  }
});

test("duplicate restaurant names include the city on cards", () => {
  const catalog: Restaurant[] = [
    {
      id: "texas-bountiful",
      name: "Texas Roadhouse",
      city: "bountiful",
      description: "",
      cuisines: ["american"],
      popularMenuItems: [],
      isFavorite: false,
    },
    {
      id: "texas-layton",
      name: "Texas Roadhouse",
      city: "layton",
      description: "",
      cuisines: ["american"],
      popularMenuItems: [],
      isFavorite: false,
    },
    {
      id: "sills",
      name: "Sill's Cafe",
      city: "layton",
      description: "",
      cuisines: ["breakfast"],
      popularMenuItems: [],
      isFavorite: false,
    },
  ];
  const duplicates = duplicateRestaurantNames(catalog);
  expect(restaurantDisplayName(catalog[0]!, duplicates)).toBe("Texas Roadhouse (Bountiful)");
  expect(restaurantDisplayName(catalog[1]!, duplicates)).toBe("Texas Roadhouse (Layton)");
  expect(restaurantDisplayName(catalog[2]!, duplicates)).toBe("Sill's Cafe");
  const american = groupRestaurants(catalog).find((group) => group.cuisine === "american");
  expect(american?.restaurants.map((item) => item.city)).toEqual(["bountiful", "layton"]);
});

test("popular menu slots always fill five rows", () => {
  expect(popularMenuSlots(["Schnitzel", "Spaetzle"])).toEqual([
    "Schnitzel",
    "Spaetzle",
    null,
    null,
    null,
  ]);
});

test("type guards accept cities and cuisines", () => {
  expect(isRestaurantCity("kaysville")).toBe(true);
  expect(isRestaurantCity("clearfield")).toBe(false);
  expect(isRestaurantCuisine("bbq")).toBe(true);
  expect(isRestaurantCuisine("french")).toBe(false);
});
