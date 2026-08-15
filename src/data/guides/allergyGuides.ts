import type { DietGuide } from "./types.ts";

export const allergyGuides: DietGuide[] = [
  {
    tag: "gluten-free",
    category: "allergies",
    title: "Getting started gluten-free",
    blurb: "A calm kitchen briefing if wheat, barley, or rye just left the menu.",
    lifeIsLike: [
      "The first week can feel like every familiar food has a catch. Bread, pasta, soy sauce, and baked treats are the usual surprises. You do not have to rebuild your whole pantry on day one. Start with meals that were already naturally gluten-free — eggs, rice, meat, fish, potatoes, and most vegetables — and add the packaged swaps when you are ready.",
      "In this household, gluten-free flours are welcome, and sourdough bread is treated as acceptable. That is a family rule, not a medical claim. If you have celiac disease or a wheat allergy, please follow the guidance you were given by your clinician. Labels still matter for sauces, broths, and spice blends.",
      "Eating with other people gets easier once you have two or three reliable meals. You can say, kindly and simply, “I need this one to be gluten-free,” and then enjoy the rest of the evening.",
    ],
    swaps: [
      { insteadOf: "Wheat pasta", use: "Gluten-free pasta, rice, or rice noodles" },
      { insteadOf: "Regular soy sauce", use: "Gluten-free soy sauce or tamari" },
      { insteadOf: "Wheat flour for coating or baking", use: "A gluten-free flour blend" },
      {
        insteadOf: "Sandwich bread",
        use: "Gluten-free bread, or sourdough if that is acceptable for you",
      },
      { insteadOf: "Flour tortillas", use: "Corn tortillas, labeled gluten-free" },
    ],
    baseline: [
      { heading: "Proteins", foods: "Eggs, chicken, turkey, beef, fish, canned tuna" },
      {
        heading: "Starches",
        foods: "Rice, potatoes, gluten-free oats, gluten-free pasta, corn tortillas",
      },
      {
        heading: "Produce",
        foods: "Most fresh vegetables and fruit. Watch sauces more than the produce itself.",
      },
      {
        heading: "Pantry",
        foods: "Olive oil, butter, salt, herbs, gluten-free soy sauce, maple syrup",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "sheet-pan-roasted-chicken",
      "gf-spaghetti-marinara",
      "banana-pancakes",
      "gf-chocolate-chip-cookies",
    ],
    firstSteps: [
      "Choose two dinners you already like and make them with rice or gluten-free pasta this week.",
      "Read labels on soy sauce, broth, and spice packets before you buy a new bottle.",
      "Use Explore with the gluten-free tag when you want the catalog to do the sorting.",
    ],
  },
  {
    tag: "lactose-free",
    category: "allergies",
    title: "Getting started lactose-free",
    blurb: "Milk sugar is the issue here — not every dairy food, and not every meal.",
    lifeIsLike: [
      "Lactose is the sugar in milk. Soft cheeses, milk, ice cream, and many yogurts are the usual trouble. Butter and hard aged cheeses are often gentler, and this cookbook treats Parmesan that way. You may still be able to enjoy a great deal of familiar food.",
      "A new limit can feel bigger than it is. Many weeknight dinners never needed a splash of milk. Where cheese is the star, this site lists swaps: leave it off, or use a lactose-free stand-in. Click the LF chip on an ingredient to try the change before you shop.",
      "If this is new, go slowly. One comfortable breakfast and one comfortable dinner are enough for the first few days. You can add variety once those feel easy.",
    ],
    swaps: [
      {
        insteadOf: "Cow’s milk",
        use: "Lactose-free milk, or a plain unsweetened alternative you tolerate",
      },
      { insteadOf: "Soft cheese or cheddar", use: "Leave it off, or use a lactose-free cheese" },
      { insteadOf: "Regular yogurt", use: "Lactose-free yogurt, or coconut yogurt if you prefer" },
      {
        insteadOf: "Ice cream",
        use: "A lactose-free pint, or a fruit-and-coconut dessert from the catalog",
      },
      { insteadOf: "Cream in soup", use: "Skip it, or finish with olive oil and herbs" },
    ],
    baseline: [
      {
        heading: "Proteins",
        foods: "Eggs, chicken, fish, beans, tofu — none of these need lactose",
      },
      {
        heading: "Dairy that is often easier",
        foods: "Butter, Parmesan, lactose-free milk and yogurt",
      },
      {
        heading: "Meals that stay simple",
        foods: "Rice bowls, roasted chicken, tuna salad, tomato-based pasta",
      },
      {
        heading: "Watch-outs",
        foods: "Hidden milk in creamy sauces, ranch, some breads, and chocolate",
      },
    ],
    exampleRecipeIds: [
      "baked-salmon",
      "leftover-rice-bowl",
      "tuna-cucumber-boats",
      "rice-and-beans",
      "stovetop-popcorn",
    ],
    firstSteps: [
      "Keep butter if you tolerate it, and swap only the milky or cheesy parts first.",
      "On a recipe page, tap LF on a cheese line to leave it off or replace it.",
      "Browse Explore with lactose-free selected when you want a longer list.",
    ],
  },
  {
    tag: "low-fructose",
    category: "allergies",
    title: "Eating with less excess fructose",
    blurb: "Honey, apples, pears, and some sweeteners are the usual first edits.",
    lifeIsLike: [
      "Fructose is a sugar found in fruit, honey, and many sweet condiments. Some people handle it well in small amounts and struggle when it is concentrated — a drizzle of honey, a juice, or a high-fructose syrup. This is not a “no fruit forever” rule. It is a request to choose fruit and sweeteners more carefully.",
      "In this household we treat apples, pears, honey, brown sugar, and molasses as the main kitchen avoids. Berries, citrus, banana, and maple are usually the easier everyday options. Ketchup and some bottled sauces hide fructose too.",
      "If this is new, you do not need a perfect fruit chart tonight. Swap the obvious sweeteners, keep meals savory, and add fruit back in the forms you have been told are safer.",
    ],
    swaps: [
      { insteadOf: "Honey or brown sugar", use: "Maple syrup, or skip the sweetener" },
      { insteadOf: "Apples or pears", use: "Blueberries, strawberries, banana, or orange" },
      { insteadOf: "Apple juice", use: "Water, or a squeeze of lemon or lime" },
      { insteadOf: "Ketchup as a default sauce", use: "Mustard, salsa you tolerate, or nothing" },
      { insteadOf: "Molasses or agave", use: "Maple, or a recipe that does not need syrup" },
    ],
    baseline: [
      { heading: "Savory plate", foods: "Eggs, chicken, fish, rice, potatoes, most vegetables" },
      {
        heading: "Easier fruit",
        foods: "Berries, banana, citrus, grapes — in the portions you tolerate",
      },
      { heading: "Sweeteners", foods: "Maple syrup when you want something sweet; skip honey" },
      {
        heading: "Watch-outs",
        foods: "Apples, pears, honey, brown sugar, molasses, ketchup, dried fruit",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "sheet-pan-roasted-chicken",
      "tuna-cucumber-boats",
    ],
    firstSteps: [
      "Make tonight’s dinner savory: protein, a starch, and a vegetable, with no honey glaze.",
      "Move honey and brown sugar off the easy-reach shelf so they are a choice, not a habit.",
      "Open Explore with low fructose selected when you want more ideas.",
    ],
    relatedTags: ["low-fodmap", "low-fop"],
  },
  {
    tag: "low-fructan",
    category: "allergies",
    title: "Cooking with less fructan",
    blurb: "Onion and garlic are the two changes that reshape the most recipes.",
    lifeIsLike: [
      "Fructans are a kind of fiber in onion, garlic, wheat, and a few other plants. They are also the reason a “simple” soup can feel anything but simple. The good news is that salt, herbs, citrus, ginger, and chives still give food a lot of character.",
      "This household keeps a deliberate set of recipes with no onion and no garlic. We also treat sourdough as acceptable, which is a family exception. Garlic-infused oil is a common low-FODMAP trick because the fructans stay in the solids — use it only if it fits the advice you were given.",
      "You do not have to tell every host a chemistry lesson. “No onion or garlic, please” is enough, and it is a kind request.",
    ],
    swaps: [
      {
        insteadOf: "Onion or garlic in the pan",
        use: "Chives, green onion tops if you tolerate them, ginger, or extra herbs",
      },
      { insteadOf: "Regular broth", use: "Onion- and garlic-free broth" },
      {
        insteadOf: "Onion powder or garlic powder",
        use: "Paprika, cumin, oregano, lemon, or pepper",
      },
      { insteadOf: "Wheat-heavy sides", use: "Rice, potatoes, or gluten-free pasta" },
      {
        insteadOf: "Inulin “fiber” additives",
        use: "Skip the supplement or bar; inulin is a problem here even when it sounds healthy",
      },
    ],
    baseline: [
      {
        heading: "Flavor without alliums",
        foods: "Lemon, lime, ginger, chives, herbs, paprika, cumin, sesame",
      },
      { heading: "Proteins", foods: "Eggs, chicken, fish, beef, canned tuna" },
      {
        heading: "Sides",
        foods: "Rice, potatoes, cucumber, tomato, zucchini, green beans, carrots",
      },
      {
        heading: "Watch-outs",
        foods: "Onion, garlic, shallot, leek, asparagus, inulin, many wheat products",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "tuna-cucumber-boats",
      "ginger-rice-porridge",
    ],
    firstSteps: [
      "Cook one sheet-pan or skillet meal this week with no onion and no garlic. Taste it with lemon and salt.",
      "Buy a carton of garlic-free broth so soups stay easy.",
      "Filter Explore by low fructan when you want the catalog’s no-allium list.",
    ],
    relatedTags: ["low-oligosaccharide", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-gos",
    category: "allergies",
    title: "Eating with less GOS",
    blurb:
      "Beans and some legumes are the main kitchen change. The rest of the plate can stay familiar.",
    lifeIsLike: [
      "GOS (galacto-oligosaccharides) show up most clearly in beans, lentils, chickpeas, and some peas. If those foods have been bothering you, it is not a personal failing and it is not forever-or-nothing. Portions and preparation matter, and many people reintroduce legumes later with guidance.",
      "For a first week, it is completely fine to let rice, potatoes, eggs, and meat carry dinner. Hummus, dal, chili, and rice-and-beans can wait. You are not “bad at vegetables” because you skipped the chickpeas.",
      "When you eat with others, a quiet “I’m skipping the beans tonight” is enough. There is almost always something else on the table.",
    ],
    swaps: [
      { insteadOf: "A bean-based dinner", use: "Rice with eggs, chicken, or fish" },
      {
        insteadOf: "Hummus as a snack",
        use: "Cucumber with tuna, or rice cakes with a spread you tolerate",
      },
      { insteadOf: "Lentil soup or dal", use: "Tomato soup you tolerate, or ginger rice porridge" },
      { insteadOf: "Chickpeas in a salad", use: "Cucumber, tomato, and a protein on the side" },
      { insteadOf: "Pea-heavy sides", use: "Green beans, carrots, zucchini, or a simple salad" },
    ],
    baseline: [
      { heading: "Proteins", foods: "Eggs, chicken, turkey, fish, beef — easy GOS-free mains" },
      {
        heading: "Starches",
        foods: "Rice, potatoes, gluten-free pasta, oats if you tolerate them",
      },
      {
        heading: "Vegetables",
        foods: "Cucumber, tomato, zucchini, carrots, green beans, leafy greens",
      },
      { heading: "Watch-outs", foods: "Beans, lentils, chickpeas, hummus, some peas" },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "leftover-rice-bowl",
      "greek-salad",
      "sheet-pan-roasted-chicken",
    ],
    firstSteps: [
      "Plan three dinners that use rice or potatoes instead of beans.",
      "Leave dal, chili, and hummus for later, unless you already know your portion is fine.",
      "Use the low GOS filter in Explore to hide the legume-heavy recipes.",
    ],
    relatedTags: ["low-oligosaccharide", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-sorbitol",
    category: "allergies",
    title: "Eating with less sorbitol",
    blurb: "Stone fruit, apples, pears, and avocado are the usual fruit-bowl edits.",
    lifeIsLike: [
      "Sorbitol is a sugar alcohol that appears in apples, pears, avocado, and many stone fruits. It is also added to some “sugar-free” gums and sweets. If those foods leave you uncomfortable, the rest of a normal plate — eggs, rice, chicken, berries, citrus — can still look like home cooking.",
      "This household treats apples, pears, and avocado as avoids when we claim a low-sorbitol or Low FOP meal. Guacamole can wait. A baked apple dessert can wait. You are allowed to miss them and still make a good dinner.",
      "Read “sugar-free” labels when you want a mint or a protein bar. Sorbitol and similar -ol sweeteners are a common surprise.",
    ],
    swaps: [
      { insteadOf: "Apple or pear as a snack", use: "Banana, berries, orange, or grapes" },
      { insteadOf: "Guacamole", use: "Salsa, or cucumber and tomato with lime and salt" },
      { insteadOf: "Peaches or cherries for dessert", use: "Berries, or a coconut rice pudding" },
      {
        insteadOf: "Sugar-free candy with sorbitol",
        use: "A square of plain dark chocolate you tolerate, or skip the sweet",
      },
      { insteadOf: "Avocado toast", use: "Eggs on gluten-free bread or rice cakes" },
    ],
    baseline: [
      {
        heading: "Fruit that is often easier",
        foods: "Banana, blueberries, strawberries, citrus, grapes",
      },
      {
        heading: "Savory plate",
        foods: "Eggs, chicken, fish, rice, potatoes, tomato, cucumber, zucchini",
      },
      {
        heading: "Watch-outs",
        foods: "Apples, pears, avocado, peaches, cherries, sugar-free products with sorbitol",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "leftover-rice-bowl",
      "coconut-rice-pudding",
    ],
    firstSteps: [
      "Take avocado, apples, and pears off this week’s grocery list. You can revisit them later.",
      "Keep one easy fruit you already tolerate in the house so snacks stay simple.",
      "Filter Explore by low sorbitol when you want the catalog to hide the stone-fruit recipes.",
    ],
    relatedTags: ["low-polyol", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-mannitol",
    category: "allergies",
    title: "Eating with less mannitol",
    blurb: "Cauliflower, mushrooms, and celery are the three names to learn first.",
    lifeIsLike: [
      "Mannitol is another sugar alcohol. In a home kitchen it shows up most often in cauliflower, mushrooms, and celery. That can be surprising, because those foods are otherwise “healthy” and quiet. You are not being fussy. You are matching dinner to what your body has been telling you.",
      "This household treats those three as avoids when we claim low-mannitol or Low FOP. Chicken salad with celery can wait. A mushroom stir-fry can wait. Cauliflower rice does not have to be the default low-carb side.",
      "Most other vegetables are still on the table: cucumber, tomato, zucchini, green beans, carrots, leafy greens. The plate does not have to look empty.",
    ],
    swaps: [
      {
        insteadOf: "Celery in chicken or tuna salad",
        use: "Cucumber, or skip the crunch and add extra herbs",
      },
      { insteadOf: "Mushroom stir-fry", use: "Bell pepper, bok choy, carrot, or green beans" },
      { insteadOf: "Cauliflower rice or mash", use: "Rice, potatoes, or zucchini" },
      { insteadOf: "Celery sticks as a snack", use: "Cucumber, carrots, or rice cakes" },
      {
        insteadOf: "Cream of mushroom soup",
        use: "Tomato basil soup, or a simple broth you tolerate",
      },
    ],
    baseline: [
      {
        heading: "Easier vegetables",
        foods: "Cucumber, tomato, zucchini, green beans, carrots, leafy greens, potato",
      },
      { heading: "Proteins", foods: "Eggs, chicken, fish, beef, tuna" },
      {
        heading: "Watch-outs",
        foods: "Cauliflower, mushrooms, celery, and some sugar-free products with mannitol",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "leftover-rice-bowl",
      "tuna-cucumber-boats",
    ],
    firstSteps: [
      "Leave cauliflower, mushrooms, and celery out of this week’s shop.",
      "Use cucumber or herbs when a recipe asks for celery crunch.",
      "Select low mannitol in Explore to see the meals that already avoid those three.",
    ],
    relatedTags: ["low-polyol", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-oligosaccharide",
    category: "allergies",
    title: "Low oligosaccharide, in plain language",
    blurb: "This tag is fructans and GOS together: onion, garlic, and beans in one filter.",
    lifeIsLike: [
      "Oligosaccharides is a long word for two kitchen problems that often travel together: fructans (onion, garlic, wheat) and GOS (beans and some legumes). If both bother you, a single filter is kinder than remembering two lists at the store.",
      "A first week on this pattern looks like rice, eggs, chicken, fish, and vegetables that are not beans. Flavor comes from lemon, ginger, herbs, and chives. Chili, dal, and garlic-heavy pasta can wait without any guilt.",
      "This is a roll-up tag. If you want the longer explanation of each half, the low-fructan and low-GOS guides are there when you have the energy.",
    ],
    swaps: [
      {
        insteadOf: "Onion, garlic, and a can of beans",
        use: "A sheet-pan chicken or baked fish with rice",
      },
      { insteadOf: "Hummus or dal", use: "Tuna cucumber boats, or eggs" },
      { insteadOf: "Garlic broth", use: "Onion- and garlic-free broth" },
      { insteadOf: "Wheat sides plus legumes", use: "Rice or potatoes with a simple protein" },
    ],
    baseline: [
      {
        heading: "A reliable plate",
        foods: "Eggs or chicken or fish, rice or potatoes, cucumber or green beans or zucchini",
      },
      { heading: "Flavor", foods: "Lemon, ginger, chives, herbs, salt, olive oil" },
      { heading: "Set aside for now", foods: "Onion, garlic, beans, lentils, chickpeas, hummus" },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "tuna-cucumber-boats",
      "ginger-rice-porridge",
    ],
    firstSteps: [
      "Cook from the no-onion, no-garlic, no-bean recipes first. There are already several in this book.",
      "Read the low-fructan or low-GOS guide only if you want more detail on one half.",
      "Filter Explore by low oligosaccharide to combine both rules at once.",
    ],
    relatedTags: ["low-fructan", "low-gos", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-polyol",
    category: "allergies",
    title: "Low polyol, in plain language",
    blurb:
      "Sorbitol and mannitol together: certain fruits plus cauliflower, mushrooms, and celery.",
    lifeIsLike: [
      "Polyols are sugar alcohols. This cookbook splits them into sorbitol and mannitol, then offers this combined tag when both matter. The grocery version is short: skip apples, pears, avocado, and many stone fruits, and also skip cauliflower, mushrooms, and celery.",
      "That list looks long written out. On a plate it is usually just “not those.” Eggs, rice, berries, chicken, cucumber, and tomato are still everyday food.",
      "Sugar-free labels are worth a glance. If you see sorbitol or mannitol in a gum or protein bar, that may explain a mystery symptom.",
    ],
    swaps: [
      { insteadOf: "Apple, pear, or avocado", use: "Banana, berries, or citrus" },
      {
        insteadOf: "Celery or cauliflower on the side",
        use: "Cucumber, carrot, zucchini, or green beans",
      },
      { insteadOf: "Mushroom dishes", use: "The same recipe with pepper, tomato, or greens" },
      {
        insteadOf: "Sugar-free treats with -ol sweeteners",
        use: "A recipe from this book, or fruit you already tolerate",
      },
    ],
    baseline: [
      { heading: "Fruit", foods: "Banana, blueberries, strawberries, orange, grapes" },
      {
        heading: "Vegetables",
        foods: "Cucumber, tomato, zucchini, green beans, carrots, leafy greens, potato",
      },
      {
        heading: "Set aside for now",
        foods: "Apples, pears, avocado, peaches, cauliflower, mushrooms, celery",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "leftover-rice-bowl",
      "coconut-rice-pudding",
    ],
    firstSteps: [
      "Shop from the “easier fruit and vegetable” lists above for one week.",
      "Open the sorbitol or mannitol guide if you only need one of the two.",
      "Use the low polyol filter in Explore when you want both rules applied.",
    ],
    relatedTags: ["low-sorbitol", "low-mannitol", "low-fodmap", "low-fop"],
  },
  {
    tag: "low-fodmap",
    category: "allergies",
    title: "A gentle start with low FODMAP",
    blurb:
      "Every FODMAP subgroup at once, including lactose. Use this when you need the full filter.",
    lifeIsLike: [
      "FODMAP is an acronym, not a personality. It groups several carbohydrates that can be hard to digest: oligosaccharides, disaccharides (lactose), monosaccharides (excess fructose), and polyols. This site tags all six types so you can be specific, and Low FODMAP means a recipe clears every one of them — as written, or with the listed swaps.",
      "A full low-FODMAP stretch is often a short, guided elimination, then a careful reintroduction. Please do that with a clinician or dietitian if you can. This page is only here to make dinner less overwhelming while you are in that stretch.",
      "The first days work best when the plate is boring on purpose: eggs, rice, baked fish, cucumber, a little maple if you want something sweet. Variety can return. You are learning your own map, not signing up for a permanent tiny menu.",
    ],
    swaps: [
      {
        insteadOf: "Onion, garlic, and beans",
        use: "Garlic-free broth, chives, ginger, rice, and a simple protein",
      },
      { insteadOf: "Milk and soft cheese", use: "Lactose-free options, or leave the cheese off" },
      { insteadOf: "Honey, apples, pears", use: "Maple, berries, banana, or citrus" },
      {
        insteadOf: "Avocado, cauliflower, mushrooms, celery",
        use: "Cucumber, tomato, zucchini, green beans",
      },
    ],
    baseline: [
      {
        heading: "Breakfast",
        foods: "Scrambled eggs (skip or swap the cheese), or ginger rice porridge",
      },
      {
        heading: "Lunch",
        foods: "Tuna cucumber boats, leftover rice, or a salad without onion or beans",
      },
      {
        heading: "Dinner",
        foods: "Baked salmon or roasted chicken with rice or potato and a safe vegetable",
      },
      { heading: "Snack", foods: "Popcorn, rice cakes without honey, or cucumber with salt" },
    ],
    exampleRecipeIds: [
      "baked-salmon",
      "tuna-cucumber-boats",
      "leftover-rice-bowl",
      "ginger-rice-porridge",
      "stovetop-popcorn",
    ],
    firstSteps: [
      "Pick three meals from the list below and repeat them. Repetition is a kindness this week.",
      "Use recipe-page chips (LF and others) when a dish can be cleared with a listed swap.",
      "When you have more energy, the six type-by-type guides explain the “why” behind each avoid.",
    ],
    relatedTags: [
      "lactose-free",
      "low-fructose",
      "low-fructan",
      "low-gos",
      "low-sorbitol",
      "low-mannitol",
      "low-fop",
    ],
  },
  {
    tag: "low-fop",
    category: "allergies",
    title: "Low FOP, the household cluster",
    blurb: "Fructose, oligosaccharides, and polyols — FODMAP without requiring lactose-free.",
    lifeIsLike: [
      "Low FOP is the composite this family uses most. F, O, and P stand for fructose, oligosaccharides, and polyols. Lactose (the D in FODMAP) is not required. If dairy is comfortable for you and the other groups are not, this is the filter that matches that life.",
      "In practice it means: go easy on honey, apples, and pears; skip onion, garlic, and beans; and leave avocado, cauliflower, mushrooms, and celery for another day. Cheese can stay if you tolerate it. That is already a cookable week.",
      "You are not expected to recite the science at the table. “We’re cooking Low FOP tonight” is a household shorthand, and these recipes are tagged so you do not have to rebuild the list from memory.",
    ],
    swaps: [
      {
        insteadOf: "Honey-glazed or ketchup-heavy dinners",
        use: "Lemon, herbs, mustard, or a simple roast",
      },
      { insteadOf: "Onion-garlic-bean pots", use: "Sheet-pan chicken, baked fish, eggs, rice" },
      { insteadOf: "Guacamole or apple desserts", use: "Berries, banana, or coconut rice pudding" },
      { insteadOf: "Celery crunch", use: "Cucumber, or extra herbs" },
    ],
    baseline: [
      {
        heading: "A weekday plate",
        foods: "Eggs or chicken or fish, rice or potato, a Low FOP vegetable, optional cheese",
      },
      { heading: "Flavor", foods: "Butter, lemon, chives, ginger, herbs, salt" },
      {
        heading: "The cluster to skip",
        foods:
          "Honey, apples, pears, onion, garlic, beans, avocado, cauliflower, mushrooms, celery",
      },
    ],
    exampleRecipeIds: [
      "scrambled-eggs",
      "baked-salmon",
      "greek-salad",
      "tuna-cucumber-boats",
      "ginger-rice-porridge",
    ],
    firstSteps: [
      "Use the Low FOP filter in Explore. That is the fastest way to see what this household already cooks.",
      "Keep lactose in or out based on how you feel. This tag does not force lactose-free.",
      "If the combined list feels like a lot, read the fructose, oligosaccharide, and polyol guides one at a time.",
    ],
    relatedTags: ["low-fructose", "low-oligosaccharide", "low-polyol", "low-fodmap"],
  },
];
