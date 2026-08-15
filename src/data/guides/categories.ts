import type { GuideCategoryMeta } from "./types.ts";

export const GUIDE_DISCLAIMER =
  "These notes are how this household cooks. They are not a diagnosis, a treatment plan, or medical advice. If you are newly navigating an allergy or intolerance, please keep your clinician or a registered dietitian in the loop. You do not have to get every meal perfect on the first try.";

export const GUIDE_CATEGORY_META: Record<GuideCategoryMeta["id"], GuideCategoryMeta> = {
  allergies: {
    id: "allergies",
    title: "Food allergies and sensitivities",
    blurb:
      "Gluten, lactose, and the FODMAP groups. Start here if a food is making you unwell and you want a calmer way to cook.",
    lede: "Each guide below is a short kitchen briefing: what the tag means in daily life, the swaps we use most, a simple plate to fall back on, and a few recipes already in this cookbook. Read only the one that matches what you are working with. The rest can wait.",
    groups: [
      {
        heading: "Everyday kitchen rules",
        tags: ["gluten-free", "lactose-free"],
      },
      {
        heading: "The FODMAP types",
        tags: ["low-fructose", "low-fructan", "low-gos", "low-sorbitol", "low-mannitol"],
      },
      {
        heading: "When several types overlap",
        tags: ["low-oligosaccharide", "low-polyol", "low-fodmap", "low-fop"],
      },
    ],
  },
  lifestyle: {
    id: "lifestyle",
    title: "Eating patterns",
    blurb:
      "Vegan, keto, paleo, and carnivore. Start here if you are choosing a way of eating and want to see how this cookbook supports it.",
    lede: "These are household-practical patterns, not a contest. Pick the guide that matches how you want to eat this season. Each one names the main swaps, a baseline plate, and recipes you can open tonight.",
    groups: [
      {
        heading: "Ways of eating in this cookbook",
        tags: ["vegan", "keto", "paleo", "carnivore"],
      },
    ],
  },
};
