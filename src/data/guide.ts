export const GUIDE_DISCLAIMER =
  "These notes are how this household cooks. They are not a diagnosis, a treatment plan, or medical advice. Keep your clinician or a registered dietitian in the loop. You do not have to get every meal perfect.";

export type GuideSwap = {
  insteadOf: string;
  use: string;
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  swaps?: GuideSwap[];
  items?: string[];
};

export const kitchenGuide: {
  title: string;
  lede: string;
  sections: GuideSection[];
} = {
  title: "Kitchen guide",
  lede: "Household cooking notes: what House Approved means, and the substitutions we use.",
  sections: [
    {
      id: "ha",
      title: "House Approved",
      paragraphs: [
        "HA means House Approved. A recipe is HA if we can serve it without interfering with our food allergies and it does not taste bad to all of us. Recipes and ingredients use the same tags: HA - Confirmed, HA - Assumed, Unknown, Not-HA Assumed, and Not-HA Confirmed. Confirmed is a household yes or no. Assumed recipe tags come from the ingredients as written.",
      ],
    },
    {
      id: "sourdough",
      title: "Sourdough",
      paragraphs: ["Sourdough bread is an okay alternative to wheat bread."],
    },
    {
      id: "substitutions",
      title: "Substitutions",
      paragraphs: [],
      items: [
        "Substitute almond milk or whole milk.",
        "Substitute sourdough bread for wheat or white bread.",
        "Substitute gluten-free pasta, rice, or rice noodles for wheat pasta.",
        "Substitute corn tortillas for flour tortillas.",
        "Substitute gluten-free soy sauce, tamari, or coconut aminos for regular soy sauce.",
        "Substitute a gluten-free flour blend for wheat flour.",
        "Substitute maple syrup for honey.",
        "Substitute garlic-infused oil for garlic cloves or garlic powder.",
        "Substitute the green tops of scallions or chives for onion.",
        "Substitute cooked mushrooms for raw mushrooms.",
      ],
    },
  ],
};
