import type { DietTag } from "../types.ts";

export const GUIDE_CATEGORIES = ["allergies", "lifestyle"] as const;

export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

export function isGuideCategory(value: string): value is GuideCategory {
  return (GUIDE_CATEGORIES as readonly string[]).includes(value);
}

export type GuideSwap = {
  insteadOf: string;
  use: string;
};

export type BaselineGroup = {
  heading: string;
  foods: string;
};

export type DietGuide = {
  tag: DietTag;
  category: GuideCategory;
  title: string;
  blurb: string;
  lifeIsLike: string[];
  swaps: GuideSwap[];
  baseline: BaselineGroup[];
  exampleRecipeIds: string[];
  firstSteps: string[];
  relatedTags?: DietTag[];
};

export type GuideGroup = {
  heading: string;
  tags: DietTag[];
};

export type GuideCategoryMeta = {
  id: GuideCategory;
  title: string;
  blurb: string;
  lede: string;
  groups: GuideGroup[];
};
