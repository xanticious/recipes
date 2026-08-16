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
  lede: "A practical reference for turning everyday recipes into meals that fit this household. HA on a recipe means it already follows these constraints as written. Everything else can still be cooked — use this page when you want to convert it.",
  sections: [
    {
      id: "ha",
      title: "What HA means",
      paragraphs: [
        "HA is a single household tag. A recipe marked HA is the version we can serve without extra swaps: no gluten, no lactose, not a high-fat plate, and none of the FODMAP foods that still cause trouble after reintroduction.",
        "Occasional gluten is tolerated here, and cross-contamination is not treated as an emergency. HA is still the default we aim for on ordinary nights. If a dish is not HA, it is honest about that rather than pretending a swap chip will fix it. When we want both versions, we keep two recipes and link them under Related recipes.",
      ],
    },
    {
      id: "gluten",
      title: "Gluten",
      paragraphs: [
        "Gluten is avoided on HA plates because it aggravates eosinophilic esophagitis. Wheat bread, regular pasta, flour tortillas, soy sauce, and most bakery items are out unless the recipe is written gluten-free.",
        "Wheat and sourdough are usually fine from a fructan point of view. They still are not HA, because of gluten. Gluten-free labeled bread, pasta, oats, and soy sauce are the everyday stand-ins.",
      ],
      swaps: [
        { insteadOf: "Wheat pasta", use: "Gluten-free pasta, rice, or rice noodles" },
        {
          insteadOf: "Sandwich bread or sourdough",
          use: "Labeled gluten-free bread, or skip the bread",
        },
        { insteadOf: "Flour tortillas", use: "Corn tortillas labeled gluten-free" },
        { insteadOf: "Regular soy sauce", use: "Gluten-free soy sauce, tamari, or coconut aminos" },
        { insteadOf: "Wheat flour for coating or baking", use: "A gluten-free flour blend" },
      ],
    },
    {
      id: "lactose",
      title: "Lactose",
      paragraphs: [
        "Lactose makes IBS worse in this household. Milk, soft cheeses, yogurt, sour cream, ice cream, and creamy sauces are the usual problems. Hard aged cheeses such as Parmesan are treated as lactose-clear.",
        "Butter and ghee are usually tolerated in small cooking amounts. A cream-heavy Alfredo is still a problem because of fat, even if you switch the dairy.",
      ],
      swaps: [
        {
          insteadOf: "Cow’s milk",
          use: "Lactose-free milk, or oat / rice milk if you also want it dairy-light",
        },
        {
          insteadOf: "Yogurt or sour cream",
          use: "Lactose-free yogurt, lactose-free sour cream, or coconut yogurt",
        },
        {
          insteadOf: "Cheddar, mozzarella, feta",
          use: "Lactose-free versions, or leave the cheese off",
        },
        {
          insteadOf: "Cream in a sauce",
          use: "Lactose-free milk thickened with a little gluten-free flour or cornstarch — and keep the portion modest",
        },
        { insteadOf: "Ice cream", use: "A lactose-free pint, or fruit and lactose-free yogurt" },
      ],
    },
    {
      id: "fat",
      title: "High-fat meals",
      paragraphs: [
        "After gallbladder surgery, a high fat ratio can flare IBS even when the ingredients are otherwise HA. Fried food, cream sauces, extra cheese, and large amounts of bacon or fatty cuts are the usual traps.",
        "Cooking with a spoon of olive oil or butter is fine. The issue is the plate: if fat is the main event, it is not HA. When converting a recipe, cut cream, skip the extra cheese, bake or sauté instead of deep-frying, and pair protein with vegetables and a starch instead of a heavy sauce.",
      ],
      swaps: [
        {
          insteadOf: "Heavy cream or Alfredo sauce",
          use: "A lighter lactose-free milk sauce, or skip the sauce and use herbs, lemon, and a little oil",
        },
        { insteadOf: "Deep-fried coating", use: "Oven-baked crumbs, or a simple pan sear" },
        {
          insteadOf: "Loaded nachos or extra cheese",
          use: "A smaller sprinkle of lactose-free cheese, or none",
        },
        {
          insteadOf: "Fatty cuts as the whole meal",
          use: "Chicken breast, fish, shrimp, turkey, tofu, or a modest portion of a leaner cut",
        },
      ],
    },
    {
      id: "fructose",
      title: "Fructose (monosaccharides)",
      paragraphs: [
        "Excess fructose is still a problem. Apples, pears, honey, brown sugar, and molasses are the household examples. Many “healthy” sauces hide honey or apple juice.",
        "Maple syrup, white sugar in small amounts, and most berries are the usual sweeteners we reach for instead. Ripe bananas are a maybe — they have some fructan; use a small portion if they are already in a recipe you like.",
      ],
      swaps: [
        { insteadOf: "Honey", use: "Maple syrup" },
        {
          insteadOf: "Brown sugar or molasses",
          use: "White sugar in a smaller amount, or maple syrup",
        },
        { insteadOf: "Apples or pears", use: "Berries, orange, kiwi, or grapes" },
        {
          insteadOf: "Apple juice in a sauce or marinade",
          use: "Orange juice in a small splash, broth, or rice vinegar",
        },
      ],
    },
    {
      id: "fructans",
      title: "Fructans (onion, garlic, inulin)",
      paragraphs: [
        "Garlic, onion, and inulin are the fructans that still cause trouble. Shallots, leeks, onion powder, and garlic powder count. Inulin also hides in some yogurts, protein bars, and “fiber” additives — read labels.",
        "Wheat is generally acceptable for fructans here; gluten is the separate issue. Broccoli, cabbage, and similar vegetables are not automatic avoids after reintroduction.",
        "Garlic-infused oil (solids strained out) gives garlic flavor without the fructan. The green tops of scallions or chives can stand in for onion in small amounts. Store broth usually has onion or garlic; use an onion- and garlic-free broth, or homemade.",
      ],
      swaps: [
        {
          insteadOf: "Garlic cloves or garlic powder",
          use: "Garlic-infused oil, or skip it and lean on ginger, herbs, lemon, and chili flakes",
        },
        { insteadOf: "Onion", use: "The green tops of scallions, chives, or just skip it" },
        {
          insteadOf: "Jarred marinara or salsa",
          use: "Crushed tomatoes simmered with oil, salt, basil, and chili — no onion or garlic",
        },
        { insteadOf: "Regular chicken or vegetable broth", use: "Onion- and garlic-free broth" },
        {
          insteadOf: "Inulin, chicory root fiber, “fiber added” yogurt",
          use: "Plain lactose-free yogurt; add oats, chia, or fruit for fiber",
        },
      ],
    },
    {
      id: "polyols",
      title: "Polyols (sorbitol and mannitol)",
      paragraphs: [
        "Sorbitol: apples, pears, and avocado are the household avoids. Stone fruit can be similar; berries are usually safer.",
        "Mannitol: raw cauliflower, mushrooms, and celery are the problem foods. Cooked mushrooms are tolerated. Cauliflower and celery stay off HA plates even when cooked, unless a later re-test says otherwise.",
        "Sugar-free gum, mints, and some “diet” ice creams use sorbitol or mannitol as sweeteners. Skip those.",
      ],
      swaps: [
        {
          insteadOf: "Avocado on toast or in a bowl",
          use: "Lactose-free cream cheese in a thin smear, hummus if beans sit well, or just olive oil and tomato",
        },
        {
          insteadOf: "Raw cauliflower or celery sticks",
          use: "Cucumber, carrot, bell pepper, or cucumber slices",
        },
        { insteadOf: "Raw mushrooms in a salad", use: "Cooked mushrooms, or skip them" },
        {
          insteadOf: "Apple or pear in oatmeal",
          use: "Blueberries, strawberries, or banana in a small amount",
        },
      ],
    },
    {
      id: "convert",
      title: "How to convert a recipe",
      paragraphs: [
        "When a family favorite is not HA, copy it into a second recipe instead of hiding swaps on the original. Keep the same meal type and cuisine, mark the new one HA, and link them under Related recipes.",
      ],
      items: [
        "Swap wheat pasta, bread, and soy sauce for gluten-free versions.",
        "Swap milk, yogurt, and melting cheeses for lactose-free (or omit the cheese).",
        "Take out garlic, onion, and inulin. Use garlic-infused oil, chives, ginger, and herbs.",
        "Replace honey, brown sugar, apples, pears, and avocado.",
        "Leave raw cauliflower, celery, and raw mushrooms out. Cooked mushrooms can stay.",
        "Lighten the fat: less cream, less frying, a normal amount of oil.",
        "Cook the converted version once before you file it. If it still does not sit well, it is not HA yet.",
      ],
    },
    {
      id: "nutrition",
      title: "Fiber, protein, and minerals",
      paragraphs: [
        "Cutting gluten, lactose, and several fruits can quietly drop fiber and calcium. Build the plate on purpose instead of grazing on rice and chicken every night.",
      ],
      items: [
        "Fiber: gluten-free oats, quinoa, rice, potatoes with skin, carrots, zucchini, spinach, berries, chia, and ground flax. Canned lentils or chickpeas if they sit well — they were not a reintroduction problem here, but start with a modest serving.",
        "Protein: eggs, chicken, turkey, fish, shrimp, tofu, lactose-free Greek-style yogurt, and a normal serving of meat. Cheese is not the protein plan on HA nights.",
        "Calcium: lactose-free milk and yogurt, canned salmon with bones, tofu set with calcium, and leafy greens. A lactose-free fortified milk is the easy weekday option.",
        "Iron: beef, dark turkey, spinach, and lentils, with a vitamin C side (bell pepper, tomato, orange) if you eat little red meat.",
        "Keep dessert and fried takeout as the exception, not the weekday pattern. Health ratings on recipes are a household shorthand, not a nutrient analysis.",
      ],
    },
  ],
};
