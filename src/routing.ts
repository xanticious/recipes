export type Route =
  | { name: "landing" }
  | { name: "explore" }
  | { name: "recipe"; id: string; fromRandom: boolean }
  | { name: "random" };

export function parseHash(hash: string): Route {
  const trimmed = hash.replace(/^#/, "");
  const [pathPart, searchPart] = trimmed.split("?");
  const path = pathPart && pathPart.length > 0 ? pathPart : "/";
  const params = new URLSearchParams(searchPart ?? "");
  const parts = path.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { name: "landing" };
  }
  if (parts[0] === "random") {
    return { name: "random" };
  }
  if (parts[0] === "recipes" && parts[1]) {
    return { name: "recipe", id: parts[1], fromRandom: params.get("from") === "random" };
  }
  if (parts[0] === "recipes") {
    return { name: "explore" };
  }
  return { name: "landing" };
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case "landing":
      return "#/";
    case "explore":
      return "#/recipes";
    case "random":
      return "#/random";
    case "recipe":
      return route.fromRandom ? `#/recipes/${route.id}?from=random` : `#/recipes/${route.id}`;
  }
}

export function routesEqual(a: Route, b: Route): boolean {
  if (a.name !== b.name) {
    return false;
  }
  if (a.name === "recipe" && b.name === "recipe") {
    return a.id === b.id && a.fromRandom === b.fromRandom;
  }
  return true;
}
