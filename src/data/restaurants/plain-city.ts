import { restaurant } from "../restaurantEntry.ts";
import { fiizMenu } from "./popularMenus.ts";

/** Plain City places seeded from Weber-Morgan food inspection records, September 2026. */
export const plainCityRestaurants = [
  restaurant(
    "fiiz-drinks-plain-city",
    "FiiZ Drinks",
    "plain-city",
    "Dirty-soda drive-through.",
    ["drinks"],
    fiizMenu,
  ),
  restaurant(
    "kent-s-market-plain-city",
    "Kent's Market",
    "plain-city",
    "Place to eat on W. 2600 N.",
    ["other"],
  ),
  restaurant(
    "plain-city-confectionary-plain-city",
    "Plain City Confectionary",
    "plain-city",
    "Place to eat on N 4350 W.",
    ["other"],
  ),
  restaurant(
    "warrens-restaurant-plain-city",
    "Warrens Restaurant",
    "plain-city",
    "American restaurant on W 2600 n.",
    ["american"],
  ),
  restaurant(
    "westside-pizza-plain-city",
    "Westside Pizza",
    "plain-city",
    "Pizzeria for specialty pies, cheese bread, and salads.",
    ["italian"],
    ["Pepperoni pizza", "Hawaiian pizza", "Tropical Heat pizza", "Cheese bread", "Caesar salad"],
  ),
];
