import { restaurant } from "../restaurantEntry.ts";
import { ramblinRoadsMenu } from "./popularMenus.ts";
/** Marriott-Slaterville places seeded from Weber-Morgan food inspection records, September 2026. */
export const marriottSlatervilleRestaurants = [
  restaurant(
    "best-western-plus-high-country-inn-marriott-slaterville",
    "Best Western Plus High Country Inn",
    "marriott-slaterville",
    "Place to eat on W. 12th St.",
    ["other"],
  ),
  restaurant(
    "gridelis-north-marriott-slaterville",
    "Gridelis North",
    "marriott-slaterville",
    "Place to eat on 380 North 2000 West.",
    ["other"],
  ),
  restaurant(
    "jeremiah-s-lodge-and-garden-marriott-slaterville",
    "Jeremiah's Lodge & Garden",
    "marriott-slaterville",
    "Place to eat on 12th Street.",
    ["other"],
  ),
  restaurant(
    "paco-s-tacos-of-ogden-marriott-slaterville",
    "Paco's Tacos of Ogden",
    "marriott-slaterville",
    "Mexican restaurant on W 12th Street.",
    ["mexican"],
  ),
  restaurant(
    "ramblin-roads-restaurant-marriott-slaterville",
    "Ramblin Roads Restaurant",
    "marriott-slaterville",
    "Local diner serving all-day breakfast plates and American comfort food.",
    ["breakfast", "american"],
    ramblinRoadsMenu,
  ),
  restaurant(
    "sweetland-n-things-marriott-slaterville",
    "Sweetland N'things",
    "marriott-slaterville",
    "Place to eat on 340 North 1900 West.",
    ["other"],
  ),
  restaurant(
    "taco-rico-marriott-slaterville",
    "Taco Rico",
    "marriott-slaterville",
    "Mexican restaurant on N 1900 W.",
    ["mexican"],
  ),
  restaurant(
    "zhang-s-chinese-gourmet-marriott-slaterville",
    "Zhang's Chinese Gourmet",
    "marriott-slaterville",
    "Asian restaurant on 380 North 2000 West.",
    ["asian"],
  ),
];
