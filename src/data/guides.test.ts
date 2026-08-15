import { expect, test } from "vitest";
import { deriveTags } from "./deriveTags.ts";
import { dietGuides, getGuide, guidesForCategory } from "./guides/index.ts";
import { GUIDE_CATEGORY_META } from "./guides/categories.ts";
import { ingredientLookup } from "./ingredients.ts";
import { recipes } from "./recipes/index.ts";
import { DIET_TAGS } from "./tags.ts";

test("every diet tag has a guide", () => {
  expect(dietGuides.map((guide) => guide.tag).toSorted()).toEqual([...DIET_TAGS].toSorted());
});

test("guide categories list each of their tags once", () => {
  const listed = Object.values(GUIDE_CATEGORY_META).flatMap((meta) =>
    meta.groups.flatMap((group) => group.tags),
  );
  expect(listed.toSorted()).toEqual([...DIET_TAGS].toSorted());
});

test("example recipes exist and earn the guide tag with alterations", () => {
  const missing: string[] = [];
  const untagged: string[] = [];
  for (const guide of dietGuides) {
    expect(guide.exampleRecipeIds.length).toBeGreaterThan(0);
    for (const id of guide.exampleRecipeIds) {
      const recipe = recipes.find((item) => item.id === id);
      if (!recipe) {
        missing.push(`${guide.tag} → ${id}`);
        continue;
      }
      const tags = deriveTags(recipe, ingredientLookup);
      if (!tags.includes(guide.tag)) {
        untagged.push(`${guide.tag} → ${id}`);
      }
    }
  }
  expect(missing).toEqual([]);
  expect(untagged).toEqual([]);
});

test("guidesForCategory splits allergies and lifestyle", () => {
  expect(guidesForCategory("lifestyle").map((guide) => guide.tag)).toEqual([
    "vegan",
    "keto",
    "paleo",
    "carnivore",
  ]);
  expect(getGuide("low-fop").category).toBe("allergies");
});
