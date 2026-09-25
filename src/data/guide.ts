export const GUIDE_DISCLAIMER =
  "This is the substitution guide used by our family. We have very specific dietary restrictions and food dislikes that may not apply to your family. Make sure you ask people what their restrictions are, and how strict they are, before blindly using substitution guides like this one.";

export const GUIDE_HA =
  "House Approved (HA) means a meal, recipe, or restaurant order doesn't interfere with any of our family's allergies, dietary restrictions, and hasn't been vetoed.";

export const GUIDE_SUBSTITUTIONS_INTRO =
  "What you use for a substitution depends on the meal or recipe, but here are some common substitutions we use:";

export type GuideSubstitution = {
  original: string;
  substitution: string;
};

export const kitchenGuide: {
  title: string;
  ha: string;
  substitutionsIntro: string;
  substitutions: GuideSubstitution[];
} = {
  title: "Substitution Guide",
  ha: GUIDE_HA,
  substitutionsIntro: GUIDE_SUBSTITUTIONS_INTRO,
  substitutions: [
    { original: "Milk", substitution: "Almond milk" },
    { original: "Shredded cheddar cheese", substitution: "Daiya dairy-free cheddar shreds" },
    {
      original: "Sliced cheddar cheese",
      substitution:
        "Daiya cheddar cheese slices or Follow Your Heart dairy-free American cheese slices",
    },
    { original: "Wheat or white bread", substitution: "Sourdough bread" },
    { original: "Wheat pasta", substitution: "Gluten-free pasta, rice, or rice noodles" },
    { original: "Flour tortillas", substitution: "Corn tortillas" },
    {
      original: "Soy sauce",
      substitution: "Gluten-free soy sauce, tamari, or coconut aminos",
    },
    { original: "Wheat flour", substitution: "Gluten-free flour blend" },
    { original: "Honey", substitution: "Maple syrup" },
    { original: "Garlic cloves or garlic powder", substitution: "Garlic-infused oil" },
    { original: "Onion", substitution: "Green tops of scallions or chives" },
    { original: "Raw mushrooms", substitution: "Cooked mushrooms" },
  ],
};
