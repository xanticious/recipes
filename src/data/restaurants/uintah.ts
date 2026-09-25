import { restaurant } from "../restaurantEntry.ts";
import { starbucksMenu } from "./popularMenus.ts";

/** Uintah places seeded from Weber-Morgan food inspection records, September 2026. */
export const uintahRestaurants = [
  restaurant(
    "leo-s-smokehouse-kitchen-uintah",
    "Leo's Smokehouse Kitchen",
    "uintah",
    "Barbecue restaurant on S 2500 E.",
    ["bbq"],
  ),
  restaurant("seven-brothers-uintah", "Seven Brothers", "uintah", "Place to eat on S 2500 S.", [
    "other",
  ]),
  restaurant(
    "starbucks-uintah",
    "Starbucks",
    "uintah",
    "Coffee shop for drinks and bakery snacks.",
    ["drinks"],
    starbucksMenu,
  ),
];
