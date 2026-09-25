import { expect, test } from "vitest";
import {
  DAVIS_RESTAURANT_CITIES,
  duplicateRestaurantNames,
  filterRestaurants,
  groupRestaurants,
  isRestaurantCity,
  isRestaurantCuisine,
  isRestaurantDisplay,
  POPULAR_MENU_SLOTS,
  popularMenuSlots,
  primaryCuisine,
  RESTAURANT_CITIES,
  RESTAURANT_CITY_LABELS,
  RESTAURANT_CUISINES,
  restaurantDisplayName,
  WEBER_RESTAURANT_CITIES,
} from "./restaurantBrowse.ts";
import { restaurants, restaurantIdsByName } from "./restaurants/index.ts";
import type { Restaurant } from "./types.ts";

test("restaurant ids are unique", () => {
  const ids = restaurants.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test("restaurantIdsByName collects every franchise location", () => {
  expect(restaurantIdsByName("Noodles & Company")).toEqual([
    "noodles-and-company-farmington",
    "noodles-and-company-layton",
    "noodles-and-company-riverdale",
  ]);
  expect(restaurantIdsByName("Blaze Pizza")).toEqual(["blaze-pizza-farmington"]);
  expect(restaurantIdsByName("Chick-fil-A").length).toBeGreaterThan(2);
  expect(restaurantIdsByName("Chick-fil-A")).toEqual(
    expect.arrayContaining([
      "chick-fil-a-centerville",
      "chick-fil-a-farmington",
      "chick-fil-a-layton",
      "chick-fil-a-hill-field-layton",
      "chick-fil-a-antelope-layton",
    ]),
  );
  expect(restaurantIdsByName("FiiZ Drinks").length).toBeGreaterThan(2);
  expect(restaurantIdsByName("FiiZ Drinks").every((id) => id.startsWith("fiiz-"))).toBe(true);
  expect(restaurantIdsByName("In-N-Out Burger").length).toBeGreaterThan(0);
  expect(restaurantIdsByName("Panda Express").length).toBeGreaterThan(0);
  expect(restaurantIdsByName("Domino's").length).toBeGreaterThan(0);
  expect(restaurantIdsByName("Joy Luck")).toEqual(["joy-luck-bountiful"]);
  expect(restaurantIdsByName("No Such Place")).toEqual([]);
});

test("city filters split Davis and Weber and sort each by name", () => {
  const labels = (cities: readonly (typeof RESTAURANT_CITIES)[number][]) =>
    cities.map((city) => RESTAURANT_CITY_LABELS[city]);
  expect(labels(DAVIS_RESTAURANT_CITIES)).toEqual([...labels(DAVIS_RESTAURANT_CITIES)].toSorted());
  expect(labels(WEBER_RESTAURANT_CITIES)).toEqual([...labels(WEBER_RESTAURANT_CITIES)].toSorted());
  expect(new Set([...DAVIS_RESTAURANT_CITIES, ...WEBER_RESTAURANT_CITIES])).toEqual(
    new Set(RESTAURANT_CITIES),
  );
  expect(DAVIS_RESTAURANT_CITIES.length + WEBER_RESTAURANT_CITIES.length).toBe(
    RESTAURANT_CITIES.length,
  );
});

test("the catalog covers every city in the list", () => {
  const cities = new Set(restaurants.map((item) => item.city));
  expect(cities).toEqual(new Set(RESTAURANT_CITIES));
  expect(restaurants.length).toBeGreaterThanOrEqual(50);
});

test("every restaurant has a primary cuisine and five popular items", () => {
  for (const item of restaurants) {
    expect(item.cuisines.length).toBeGreaterThan(0);
    expect(RESTAURANT_CUISINES).toContain(item.cuisines[0]);
    expect(item.popularMenuItems.length).toBeLessThanOrEqual(POPULAR_MENU_SLOTS);
    expect(item.popularMenuItems.every((name) => name.length > 0)).toBe(true);
    expect(item.isFavorite).toBe(false);
  }
  const davisCities = new Set([
    "bountiful",
    "centerville",
    "farmington",
    "kaysville",
    "layton",
    "north-salt-lake",
    "woods-cross",
  ]);
  const davis = restaurants.filter((item) => davisCities.has(item.city));
  expect(davis.every((item) => item.popularMenuItems.length === POPULAR_MENU_SLOTS)).toBe(true);
});

test("city filter keeps only that city", () => {
  const layton = filterRestaurants(restaurants, { city: "layton" });
  expect(layton.length).toBeGreaterThan(0);
  expect(layton.every((item) => item.city === "layton")).toBe(true);
  expect(filterRestaurants(restaurants, { city: "all" })).toHaveLength(restaurants.length);
  const searched = filterRestaurants(restaurants, { city: "all", query: "chick-fil-a" });
  expect(searched.length).toBeGreaterThan(0);
  expect(searched.every((item) => item.name.toLowerCase().includes("chick-fil-a"))).toBe(true);
  expect(filterRestaurants(restaurants, { city: "roy", query: "zzz-no-such-place" })).toEqual([]);
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

test("display is list or pictures", () => {
  expect(isRestaurantDisplay("list")).toBe(true);
  expect(isRestaurantDisplay("pictures")).toBe(true);
  expect(isRestaurantDisplay("gallery")).toBe(false);
});

test("type guards accept cities and cuisines", () => {
  expect(isRestaurantCity("kaysville")).toBe(true);
  expect(isRestaurantCity("ogden")).toBe(true);
  expect(isRestaurantCity("clearfield")).toBe(false);
  expect(isRestaurantCuisine("bbq")).toBe(true);
  expect(isRestaurantCuisine("fast-food")).toBe(true);
  expect(isRestaurantCuisine("dessert")).toBe(true);
  expect(isRestaurantCuisine("drinks")).toBe(true);
  expect(isRestaurantCuisine("grocery")).toBe(true);
  expect(isRestaurantCuisine("french")).toBe(false);
});
