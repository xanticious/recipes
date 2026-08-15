import type { DietTag } from "../types.ts";
import { allergyGuides } from "./allergyGuides.ts";
import { lifestyleGuides } from "./lifestyleGuides.ts";
import type { DietGuide, GuideCategory } from "./types.ts";

export { GUIDE_CATEGORIES, isGuideCategory } from "./types.ts";
export { GUIDE_CATEGORY_META, GUIDE_DISCLAIMER } from "./categories.ts";
export type { DietGuide, GuideCategory, GuideCategoryMeta } from "./types.ts";

export const dietGuides: DietGuide[] = [...allergyGuides, ...lifestyleGuides];

const guidesByTag = new Map<DietTag, DietGuide>(dietGuides.map((guide) => [guide.tag, guide]));

export function getGuide(tag: DietTag): DietGuide {
  const guide = guidesByTag.get(tag);
  if (!guide) {
    throw new Error(`Missing diet guide for ${tag}`);
  }
  return guide;
}

export function guidesForCategory(category: GuideCategory): DietGuide[] {
  return dietGuides.filter((guide) => guide.category === category);
}
