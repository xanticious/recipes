import type { Route } from "./routing.ts";

export type PrimaryNavItem = {
  label: string;
  route: Route;
};

export const PRIMARY_NAV: readonly PrimaryNavItem[] = [
  { label: "Home", route: { name: "landing" } },
  { label: "Recipes", route: { name: "explore" } },
  { label: "Meal Ideas", route: { name: "mealIdeas" } },
  { label: "Eat Out", route: { name: "eatOut" } },
  { label: "Restaurants", route: { name: "restaurants" } },
  { label: "Ingredients", route: { name: "ingredients" } },
  { label: "Guide", route: { name: "guide" } },
  { label: "Random", route: { name: "random" } },
];

export function sectionTitle(route: Route): string {
  switch (route.name) {
    case "landing":
      return "Home";
    case "explore":
    case "recipe":
      return "Recipes";
    case "eatOut":
      return "Eat Out";
    case "restaurants":
      return "Restaurants";
    case "ingredients":
      return "Ingredients";
    case "guide":
      return "Guide";
    case "random":
      return "Random";
    case "mealIdeas":
      return "Meal Ideas";
    case "ingredientCategorizer":
      return "Ingredient categorizer";
  }
}

export function navItemIsCurrent(route: Route, item: PrimaryNavItem): boolean {
  if (item.route.name === "explore") {
    return route.name === "explore" || route.name === "recipe";
  }
  return route.name === item.route.name;
}
