import { isGuideCategory, type GuideCategory } from "./data/guides/types.ts";
import { isDietTag } from "./data/tags.ts";
import type { DietTag } from "./data/types.ts";

export type Route =
  | { name: "landing" }
  | { name: "explore" }
  | { name: "recipe"; id: string; fromRandom: boolean }
  | { name: "random" }
  | { name: "guides" }
  | { name: "guideList"; category: GuideCategory }
  | { name: "guide"; tag: DietTag };

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
  if (parts[0] === "guides") {
    const slug = parts[1];
    if (!slug) {
      return { name: "guides" };
    }
    if (isGuideCategory(slug)) {
      return { name: "guideList", category: slug };
    }
    if (isDietTag(slug)) {
      return { name: "guide", tag: slug };
    }
    return { name: "guides" };
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
    case "guides":
      return "#/guides";
    case "guideList":
      return `#/guides/${route.category}`;
    case "guide":
      return `#/guides/${route.tag}`;
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
  if (a.name === "guideList" && b.name === "guideList") {
    return a.category === b.category;
  }
  if (a.name === "guide" && b.name === "guide") {
    return a.tag === b.tag;
  }
  return true;
}
