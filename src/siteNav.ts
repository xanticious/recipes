import type { Route } from "./routing.ts";

export type PrimaryNavItem = {
  label: string;
  route: Route;
};

export const PRIMARY_NAV: readonly PrimaryNavItem[] = [
  { label: "Home", route: { name: "landing" } },
  { label: "Meal Ideas", route: { name: "mealIdeas" } },
  { label: "Restaurants", route: { name: "restaurants" } },
  { label: "Recipes", route: { name: "explore" } },
  { label: "Random Recipe", route: { name: "random" } },
  { label: "Ingredients", route: { name: "ingredients" } },
  { label: "Substitution Guide", route: { name: "guide" } },
  { label: "Eat Out", route: { name: "eatOut" } },
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
      return "Substitution Guide";
    case "random":
      return "Random Recipe";
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
