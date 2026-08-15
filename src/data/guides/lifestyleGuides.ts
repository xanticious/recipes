import type { DietGuide } from "./types.ts";

export const lifestyleGuides: DietGuide[] = [
  {
    tag: "vegan",
    category: "lifestyle",
    title: "Cooking vegan in this kitchen",
    blurb: "No animal products — and a few recipes that were already plant-based.",
    lifeIsLike: [
      "Vegan cooking in this cookbook means no meat, fish, dairy, eggs, honey, or typical chicken broth. That sounds like a long list. In the kitchen it often becomes beans, rice, vegetables, coconut milk, and a well-seasoned pot of lentils.",
      "If this is new, you do not need mock meats on day one. Rice and beans, dal, hummus, popcorn, and a coconut dessert will carry you through a first week. Flavor still comes from lime, cumin, ginger, and a little salt.",
      "This tag is household-practical, not a debate. If you are vegan for ethics, health, or curiosity, the recipes do not mind why. Take what helps and leave the rest.",
    ],
    swaps: [
      { insteadOf: "Chicken broth", use: "Vegetable broth, or water with extra spices" },
      { insteadOf: "Butter", use: "Olive oil or a vegan butter you like" },
      {
        insteadOf: "Eggs at breakfast",
        use: "Oatmeal, rice porridge, or a tofu scramble when we add one",
      },
      { insteadOf: "Honey", use: "Maple syrup" },
      {
        insteadOf: "Yogurt or cheese garnish",
        use: "Leave it off, or use a coconut or other plant option",
      },
    ],
    baseline: [
      {
        heading: "Mains",
        foods: "Rice and beans, dal, chickpea curry, vegetable fried dishes without egg",
      },
      {
        heading: "Snacks",
        foods: "Popcorn, roasted chickpeas, hummus and vegetables, fruit you enjoy",
      },
      {
        heading: "Pantry",
        foods: "Coconut milk, olive oil, spices, gluten-free soy sauce, maple, canned tomatoes",
      },
      {
        heading: "Watch-outs in this catalog",
        foods: "Honey, mayonnaise, fish sauce, chicken broth, eggs hiding in fried rice",
      },
    ],
    exampleRecipeIds: [
      "rice-and-beans",
      "weeknight-dal",
      "chickpea-curry",
      "hummus-veggie-plate",
      "coconut-rice-pudding",
    ],
    firstSteps: [
      "Cook one pot meal this week: dal or rice and beans. Leftovers make lunch easier.",
      "Check the vegan tag on a recipe — some dishes qualify only after you use a listed swap.",
      "Use Explore with vegan selected when you want the full plant-based list.",
    ],
  },
  {
    tag: "keto",
    category: "lifestyle",
    title: "A practical keto plate",
    blurb:
      "Skip grains, sugars, starchy vegetables, most fruit, and legumes — keep dinner recognizable.",
    lifeIsLike: [
      "Keto in this household is a kitchen definition, not a medical protocol. Recipes earn the tag when they skip grains, sugars, starchy vegetables, most fruit, and legumes. Eggs, meat, fish, leafy vegetables, and cheese (if you want it) do most of the work.",
      "The first week is easier if you stop hunting for “keto versions” of bread and cereal. Eat the foods that were already low in starch: scrambled eggs, baked salmon, tuna in cucumber, a burger without the bun. Curiosity about desserts can wait.",
      "If you are trying this with a clinician’s blessing, wonderful. If you are just seeing whether fewer starches help you feel better, start with a few meals and notice how you feel. This page will not ask you to count every gram.",
    ],
    swaps: [
      { insteadOf: "A bun or sandwich bread", use: "Lettuce wraps, or the burger on a plate" },
      { insteadOf: "Rice or pasta", use: "Extra vegetables, or zucchini" },
      { insteadOf: "Potatoes", use: "A larger salad, green beans, or cucumber" },
      { insteadOf: "Ketchup or sweet sauces", use: "Mustard, or leave the sauce off" },
      { insteadOf: "Oatmeal or pancakes", use: "Eggs, or a yogurt bowl if dairy fits your plan" },
    ],
    baseline: [
      { heading: "Breakfast", foods: "Eggs with butter; optional cheese" },
      {
        heading: "Lunch",
        foods:
          "Tuna cucumber boats, or chicken salad in lettuce (watch celery if you also avoid mannitol)",
      },
      {
        heading: "Dinner",
        foods: "Salmon, burgers without bread, or roasted chicken without the potatoes",
      },
      { heading: "Set aside", foods: "Rice, tortillas, beans, honey, fruit-heavy snacks, ketchup" },
    ],
    exampleRecipeIds: ["scrambled-eggs", "baked-salmon", "tuna-cucumber-boats", "skillet-burgers"],
    firstSteps: [
      "On skillet burgers, use the keto chips to skip the bun and the ketchup.",
      "Build two repeatable plates: eggs in the morning, fish or meat with vegetables at night.",
      "Filter Explore by keto. The list is shorter on purpose.",
    ],
  },
  {
    tag: "paleo",
    category: "lifestyle",
    title: "Cooking paleo here",
    blurb:
      "No grains, dairy, legumes, corn products, soy sauce, or refined sugar. Honey and maple are fine.",
    lifeIsLike: [
      "Paleo in this cookbook is a practical filter, not a history lesson. We skip grains, dairy, legumes, corn, soy sauce, and refined sugar. Honey and maple can stay. Meat, fish, eggs, vegetables, and fruit do the everyday work.",
      "The adjustment that surprises people is soy sauce and cheese, not the steak. A rice bowl can become a plate of chicken and vegetables with lemon. A salad can lose the feta and still be dinner.",
      "If you also need Low FOP or gluten-free, you can combine tags in Explore. Start with one change if stacking rules feels like a lot.",
    ],
    swaps: [
      {
        insteadOf: "Soy sauce",
        use: "Salt, lemon, ginger, and sesame oil — or skip the salty sauce",
      },
      { insteadOf: "Cheese on a salad or burger", use: "Leave it off" },
      { insteadOf: "Bread or tortillas", use: "Lettuce cups, or eat the filling with a fork" },
      { insteadOf: "Refined sugar in a dessert", use: "Maple, honey, or fruit" },
      { insteadOf: "Beans as the protein", use: "Eggs, chicken, or fish" },
    ],
    baseline: [
      {
        heading: "Mains",
        foods: "Roasted chicken, baked salmon, tuna, eggs, skillet meat without bread",
      },
      {
        heading: "Sides",
        foods: "Vegetables, fruit you enjoy, potatoes if they fit your own paleo style",
      },
      {
        heading: "Flavor",
        foods: "Olive oil, lemon, herbs, salt, honey or maple when you want sweet",
      },
      {
        heading: "Set aside",
        foods: "Dairy, grains, legumes, soy sauce, refined sugar, peanut butter",
      },
    ],
    exampleRecipeIds: [
      "baked-salmon",
      "sheet-pan-roasted-chicken",
      "tuna-cucumber-boats",
      "chicken-salad-lettuce",
    ],
    firstSteps: [
      "Cook a sheet-pan chicken or baked salmon this week. Both are already close to paleo as written.",
      "Use the paleo chips on burgers to drop the bun and ketchup.",
      "Select paleo in Explore when you want the catalog to hide dairy and grains.",
    ],
  },
  {
    tag: "carnivore",
    category: "lifestyle",
    title: "A quiet start with carnivore",
    blurb:
      "Animal foods, salt, pepper, and water. The catalog is still thin here — and that is all right.",
    lifeIsLike: [
      "Carnivore in this household means animal foods plus salt, pepper, and water. Dairy is allowed in our tagging. Plants, oils, and most spices are not. It is the narrowest pattern we track, and it can feel stark if you arrived here after a new diagnosis or a long search for relief.",
      "Please be gentle with yourself. A first week might be eggs, and then eggs again. That is not a failure. It is a small, repeatable meal while you decide whether this way of eating is for you. Talk with a clinician if you can, especially if this is a big change.",
      "This cookbook does not yet have many true carnivore recipes. Soft scrambled eggs qualify. Most other pages include a vegetable, an oil, or a sauce. We would rather be honest than stretch the tag. There is a list of recipes we still want to add.",
    ],
    swaps: [
      { insteadOf: "A bun, salad, or condiment", use: "The meat or eggs on their own, with salt" },
      { insteadOf: "Cooking in olive oil", use: "Butter, ghee, or animal fat" },
      { insteadOf: "A vegetable side", use: "A second portion of the protein, or broth" },
      { insteadOf: "Spiced marinades", use: "Salt, pepper, and time in a hot pan" },
    ],
    baseline: [
      {
        heading: "What we can cook today",
        foods: "Soft scrambled eggs with butter; optional cheese",
      },
      {
        heading: "What a fuller week would include",
        foods: "Steak, roast, bacon, salmon cooked in butter, bone broth",
      },
      { heading: "Allowed in our tags", foods: "Meat, fish, eggs, dairy, salt, pepper, water" },
      {
        heading: "Not tagged carnivore",
        foods: "Vegetables, fruit, oils, mustard, ketchup, most spices",
      },
    ],
    exampleRecipeIds: ["scrambled-eggs"],
    firstSteps: [
      "Start with scrambled eggs. Use the chips if you want the cheese off for another reason.",
      "If you need more variety, look at the recipe ideas list in the design folder — those are the next dishes we want.",
      "Explore with carnivore selected will be a short list until the catalog grows. That is expected.",
    ],
  },
];
