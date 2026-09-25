import { restaurant } from "../restaurantEntry.ts";
import { betosMenu, groceryDeliMenu, wienerschnitzelMenu } from "./popularMenus.ts";
import { beansAndBrewsMenu, chilisMenu, dominosMenu, subwayMenu } from "./popularMenus.ts";

/** Harrisville places seeded from Weber-Morgan food inspection records, September 2026. */
export const harrisvilleRestaurants = [
  restaurant(
    "beans-and-brews-harrisville",
    "Beans & Brews",
    "harrisville",
    "Local coffee shop for drinks and pastries.",
    ["drinks"],
    beansAndBrewsMenu,
  ),
  restaurant(
    "beto-s-mexican-food-harrisville",
    "Beto's Mexican Food",
    "harrisville",
    "Utah Mexican fast-food counter for carne asada burritos and a salsa bar.",
    ["mexican"],
    betosMenu,
  ),
  restaurant(
    "chili-s-grill-and-bar-harrisville",
    "Chili's Grill & Bar",
    "harrisville",
    "National chain for fajitas, burgers, and ribs.",
    ["american", "mexican"],
    chilisMenu,
  ),
  restaurant(
    "domino-s-harrisville",
    "Domino's",
    "harrisville",
    "Delivery pizza for pies, wings, and bread bites.",
    ["italian"],
    dominosMenu,
  ),
  restaurant(
    "family-promise-of-ogden-harrisville",
    "Family Promise of Ogden",
    "harrisville",
    "Place to eat on E 1100 n.",
    ["other"],
  ),
  restaurant(
    "harajuku-grill-and-sushi-harrisville",
    "Harajuku Grill & Sushi",
    "harrisville",
    "Asian restaurant on N Harrisville Road.",
    ["asian"],
  ),
  restaurant(
    "javier-s-harrisville",
    "Javier's",
    "harrisville",
    "Mexican restaurant for enchiladas, tacos, and a salsa bar.",
    ["mexican"],
    ["Chile verde burrito", "Chile relleno", "Chimichanga", "Carne asada", "Enchiladas"],
  ),
  restaurant(
    "kidz-town-harrisville",
    "Kidz Town Harrisville",
    "harrisville",
    "Place to eat on N. Washington Blvd.",
    ["other"],
  ),
  restaurant(
    "subway-harrisville",
    "Subway",
    "harrisville",
    "Sandwich counter for subs, cookies, and chips.",
    ["fast-food"],
    subwayMenu,
  ),
  restaurant(
    "wal-mart-deli-harrisville",
    "Wal-mart Deli",
    "harrisville",
    "Grocery deli for rotisserie chicken, sandwiches, and pizza.",
    ["grocery"],
    groceryDeliMenu,
  ),
  restaurant(
    "wetzel-s-pretzels-and-the-scoop-harrisville",
    "Wetzel's Pretzels & the Scoop",
    "harrisville",
    "Place to eat on N Harrisville Rd.",
    ["other"],
  ),
  restaurant(
    "wienerschnitzel-harrisville",
    "Wienerschnitzel",
    "harrisville",
    "Hot-dog drive-thru for chili dogs, corn dogs, and fries.",
    ["fast-food"],
    wienerschnitzelMenu,
  ),
];
