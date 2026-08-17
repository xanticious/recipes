import type { IngredientFodmap } from "./ingredientFodmap.ts";

export const ingredientFodmapById: Readonly<Record<string, IngredientFodmap>> = {
  onion: {
    description: "pungent allium used as a flavor base in soups, sauces, and sautés.",
    status: "high",
    reasons: ["fructans"],
  },
  "yellow-onion": {
    description: "everyday cooking onion with golden-brown skin, sautéed as a savory base.",
    status: "high",
    reasons: ["fructans"],
  },
  "red-onion": {
    description: "purple-skinned allium eaten raw in salads and salsas or cooked in sautés.",
    status: "high",
    reasons: ["fructans"],
  },
  "white-onion": {
    description: "sharp, papery-skinned allium common in Mexican cooking and salsas.",
    status: "high",
    reasons: ["fructans"],
  },
  "sweet-onion": {
    description: "mild, juicy allium such as Vidalia, often eaten raw or caramelized.",
    status: "high",
    reasons: ["fructans"],
  },
  "pearl-onion": {
    description: "marble-sized alliums simmered whole in stews, creamed dishes, and pickles.",
    status: "high",
    reasons: ["fructans"],
  },
  garlic: {
    description: "pungent allium clove minced or crushed as a flavor base in nearly every cuisine.",
    status: "high",
    reasons: ["fructans"],
  },
  "green-onion": {
    description: "slender scallion with a white bulb and hollow green tops, sliced raw or cooked.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; green tops low at ~75g, white bulb high",
  },
  shallot: {
    description:
      "small, copper-skinned allium with a milder, sweeter bite than onion, minced into sauces and vinaigrettes.",
    status: "high",
    reasons: ["fructans"],
  },
  leek: {
    description:
      "large mild allium with a white stalk and dark green leaves, braised, sautéed, or used in soups.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; green leaves low at ~75g / 2/3–1 cup, white bulb low only at ~14g / 2 Tbsp",
  },
  chives: {
    description: "thin, grass-like allium herb snipped fresh over eggs, potatoes, and salads.",
    status: "low",
    reasons: [],
  },
  ramp: {
    description:
      "wild North American allium with broad leaves and a slender purple-tinged bulb, sautéed in spring dishes.",
    status: "high",
    reasons: ["fructans"],
  },
  tomato: {
    description: "juicy red fruit eaten raw in salads or cooked into sauces, soups, and salsas.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~65g / 1/2 medium, high at ~91g",
  },
  "roma-tomato": {
    description:
      "meaty plum tomato used in sauces, roasting, and canning, with fewer seeds than slicing tomatoes.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~48–75g, high at larger servings",
  },
  "cherry-tomato": {
    description: "small, sweet tomatoes eaten whole in salads, roasted, or tossed with pasta.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~45g / 3–5 tomatoes, high at ~75g",
  },
  "grape-tomato": {
    description: "oblong mini tomatoes with a firm, sweet bite, eaten raw in salads and snacks.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~45g / a small handful, high at larger servings",
  },
  "heirloom-tomato": {
    description:
      "irregular, often colorful slicing tomato eaten raw in salads and sandwiches for its rich flavor.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~65g / 1/2 medium, high at larger servings",
  },
  "canned-tomato": {
    description:
      "peeled tomatoes packed in juice, used as a pantry base for soups, stews, and sauces.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~100g / 1/2 cup, high at ~178–186g",
  },
  "crushed-tomato": {
    description:
      "roughly broken tomatoes in a thick liquid, used as a shortcut sauce for pasta and chili.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; plain tomato-only product similar to canned at ~100g / 1/2 cup",
  },
  "diced-tomato": {
    description: "cubed canned tomatoes used in salsas, chili, and quick sauces.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; plain tomato-only product similar to canned at ~100g / 1/2 cup",
  },
  "tomato-paste": {
    description:
      "concentrated tomato purée used in small spoonfuls to deepen sauces, stews, and braises.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~28g / 2 Tbsp, high at ~85g / 1/2 cup",
  },
  "tomato-sauce": {
    description: "smooth cooked tomato purée used as a pasta, pizza, or simmer-sauce base.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose and fructans; plain tomato-only sauce similar to canned at ~1/2 cup; sauces with onion or garlic are high",
  },
  "sun-dried-tomato": {
    description:
      "intensely flavored dried tomatoes used in small amounts in salads, pastas, and tapenades.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~8g / 3 pieces, high at larger servings",
  },
  tomatillo: {
    description: "tart green husk tomato used in salsas verdes, stews, and Mexican sauces.",
    status: "low",
    reasons: [],
  },
  "bell-pepper": {
    description:
      "blocky sweet pepper eaten raw, roasted, or stuffed, in green, red, yellow, or orange.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose in ripe colors; green is more generous at ~75g / 1/2 cup, red low at ~43g / 1/3 cup",
  },
  "red-bell-pepper": {
    description: "fully ripe sweet pepper, roasted, sautéed, or eaten raw for its sweetness.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~43g / 1/3 cup, high at ~75g",
  },
  "green-bell-pepper": {
    description:
      "unripe sweet pepper with a grassy bite, used in stir-fries, fajitas, and stuffed peppers.",
    status: "low",
    reasons: [],
  },
  "yellow-bell-pepper": {
    description: "ripe, mild sweet pepper used raw in salads or roasted for a honeyed flavor.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~35g / 1/2 cup, high at ~75g",
  },
  "orange-bell-pepper": {
    description: "ripe, fruity sweet pepper eaten raw, roasted, or sautéed.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~38g / 1/2 cup, high at ~75g",
  },
  jalapeno: {
    description: "medium-hot green chili used fresh in salsas, pickled, or sliced onto tacos.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~30g / 1 small, high at ~41g / 1 medium",
  },
  serrano: {
    description: "slender, hotter-than-jalapeño chili used raw in salsas and Mexican cooking.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~28g / 1 chile, moderate at ~33–35g",
  },
  poblano: {
    description: "large, mild dark-green chili roasted for chiles rellenos, rajas, and sauces.",
    status: "low",
    reasons: [],
  },
  "anaheim-pepper": {
    description: "long, mild green chili roasted, stuffed, or chopped into Southwestern dishes.",
    status: "low",
    reasons: [],
  },
  habanero: {
    description:
      "small, lantern-shaped super-hot chili used sparingly in Caribbean and Mexican salsas.",
    status: "low",
    reasons: [],
  },
  "scotch-bonnet": {
    description: "squat, fruity super-hot chili used in Caribbean jerk and pepper sauces.",
    status: "low",
    reasons: [],
  },
  "thai-chili": {
    description:
      "tiny, fiery chili used whole or sliced in Southeast Asian stir-fries, curries, and nam prik.",
    status: "low",
    reasons: [],
  },
  "bird-eye-chili": {
    description:
      "very small, hot chili used in Thai, Vietnamese, and other Southeast Asian cooking.",
    status: "low",
    reasons: [],
  },
  "cayenne-pepper": {
    description: "slim, tapered hot chili used fresh in sauces, pickles, and Cajun cooking.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~28g as for tested red chili, moderate at ~33–35g",
  },
  "banana-pepper": {
    description: "mild, yellow-green wax pepper eaten pickled on sandwiches or fresh in salads.",
    status: "low",
    reasons: [],
  },
  pepperoncini: {
    description: "mild, tangy pickled chili served on salads, sandwiches, and antipasti plates.",
    status: "low",
    reasons: [],
  },
  shishito: {
    description: "thin-walled, usually mild Japanese peppers blistered in a hot pan as a snack.",
    status: "low",
    reasons: [],
  },
  "fresno-chili": {
    description: "medium-hot, jalapeño-like chili that ripens red, used in salsas and hot sauces.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; treat like jalapeño, low at ~30g / 1 small",
  },
  "chipotle-pepper": {
    description: "smoked, dried ripe jalapeño used whole, ground, or in adobo for a smoky heat.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~2g / 1 tsp ground or a tiny piece of dried, moderate at ~3g",
  },
  "hungarian-wax-pepper": {
    description: "yellow, medium-hot wax pepper eaten fresh, pickled, or fried.",
    status: "low",
    reasons: [],
  },
  carrot: {
    description: "common vegetable eaten raw or in soups, salads, sauces. Orange color.",
    status: "low",
    reasons: [],
  },
  "baby-carrot": {
    description: "small, sweet orange carrots eaten raw as snacks or roasted as a side.",
    status: "low",
    reasons: [],
  },
  celery: {
    description:
      "crisp, stringy stalk used raw in salads and snacks or as a soup and stock aromatic.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; low at up to ~74g / about 1 medium stalk, moderate at 75g+",
  },
  "celery-root": {
    description:
      "knobby beige root with a celery-parsley flavor, mashed, roasted, or grated into salads.",
    status: "low",
    reasons: [],
  },
  potato: {
    description: "starchy tuber boiled, mashed, roasted, or fried as a staple side.",
    status: "low",
    reasons: [],
  },
  "russet-potato": {
    description: "large, fluffy baking potato used for fries, baked potatoes, and mash.",
    status: "low",
    reasons: [],
  },
  "yukon-potato": {
    description: "yellow-fleshed, buttery potato roasted, mashed, or boiled.",
    status: "low",
    reasons: [],
  },
  "red-potato": {
    description: "waxy, thin-skinned potato boiled for salads or roasted in wedges.",
    status: "low",
    reasons: [],
  },
  "baby-potato": {
    description: "small whole potatoes roasted, boiled, or smashed as a side.",
    status: "low",
    reasons: [],
  },
  "fingerling-potato": {
    description: "small, oblong waxy potatoes roasted whole for a nutty, creamy bite.",
    status: "low",
    reasons: [],
  },
  "sweet-potato": {
    description: "starchy orange tuber roasted, mashed, or fried.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; low at ~75g / 1/2 cup, high at larger servings",
  },
  yam: {
    description: "starchy tropical tuber with rough bark-like skin, boiled, fried, or mashed.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / 1/2 cup, moderate at ~300g",
  },
  yuca: {
    description:
      "dense white tropical root boiled, fried as yuca fries, or mashed, with a bark-like peel.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; low at ~75g / 1/2 cup",
  },
  cassava: {
    description: "same starchy tropical root as yuca, used for fries, mash, flour, and tapioca.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; low at ~75g / 1/2 cup",
  },
  taro: {
    description:
      "starchy, slightly nutty corm with hairy skin, steamed, fried, or used in desserts and stews.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; low at ~75g / 1/3–1/2 cup, high around ~106g",
  },
  malanga: {
    description:
      "hairy tropical corm similar to taro, boiled, mashed, or fried in Caribbean and Latin cooking.",
    status: "depends",
    reasons: ["gos"],
    note: "likely GOS like taro and cassava; modest ~75g servings are the usual low serve for similar roots",
  },
  jicama: {
    description:
      "crisp, juicy white tuber eaten raw in salads and slaws, with a mild apple-like crunch.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / 1/2 cup, moderate at ~250g",
  },
  radish: {
    description:
      "peppery, crisp root eaten raw in salads, pickles, and snacks, usually with red skin.",
    status: "low",
    reasons: [],
  },
  "watermelon-radish": {
    description: "large, pale-green radish with a bright magenta interior, sliced raw for salads.",
    status: "low",
    reasons: [],
  },
  daikon: {
    description: "long white radish used raw, pickled, or simmered in East Asian soups and stews.",
    status: "low",
    reasons: [],
  },
  turnip: {
    description:
      "white-and-purple root roasted, mashed, or added to stews, with a peppery bite when raw.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / 1/2 medium, high at ~135g / 1 medium",
  },
  rutabaga: {
    description:
      "large yellow-fleshed root roasted, mashed, or added to stews, milder and sweeter than turnip.",
    status: "low",
    reasons: [],
  },
  parsnip: {
    description:
      "cream-colored, carrot-shaped root roasted or added to soups for a sweet, nutty flavor.",
    status: "low",
    reasons: [],
  },
  beet: {
    description:
      "earthy, ruby-red root roasted, pickled, or eaten in salads, which stains vividly.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans and GOS; low at ~20–32g / 2 slices, high at typical servings; pickled is low",
  },
  "golden-beet": {
    description:
      "yellow-fleshed beet roasted or eaten in salads, milder and less staining than red beet.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans and GOS; treat like red beet, low at ~2 slices",
  },
  horseradish: {
    description: "fiery white root grated into sauces and condiments, with a sinus-clearing heat.",
    status: "low",
    reasons: [],
  },
  ginger: {
    description: "knobby, spicy rhizome grated or sliced into stir-fries, teas, and baking.",
    status: "low",
    reasons: [],
  },
  galangal: {
    description:
      "piney, citrusy rhizome sliced into Thai soups and curries, harder and paler than ginger.",
    status: "low",
    reasons: [],
  },
  "fresh-turmeric": {
    description: "orange-fleshed rhizome grated into curries, rice, and teas, staining vividly.",
    status: "low",
    reasons: [],
  },
  "lotus-root": {
    description: "lacy, crunchy aquatic rhizome sliced into stir-fries, soups, and pickles.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; frozen low at ~75g / 1 cup, dried typically high",
  },
  burdock: {
    description:
      "long, earthy root used in Japanese kinpira and other stir-fries, with a mild artichoke-like flavor.",
    status: "high",
    reasons: ["fructans"],
  },
  "water-chestnut": {
    description:
      "crisp, white aquatic corms used canned in stir-fries and salads, staying crunchy when cooked.",
    status: "low",
    reasons: [],
  },
  "bamboo-shoot": {
    description:
      "tender, ivory shoots used in Asian stir-fries, soups, and curries, usually canned.",
    status: "low",
    reasons: [],
  },
  zucchini: {
    description: "mild green summer squash sautéed, grilled, spiralized, or baked.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~65–67g / 1/3 cup, high at ~87g",
  },
  "yellow-squash": {
    description:
      "mild yellow summer squash sautéed, grilled, or baked, interchangeable with zucchini.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g, high above ~108g",
  },
  "pattypan-squash": {
    description:
      "small, saucer-shaped summer squash grilled, roasted, or stuffed, with scalloped edges.",
    status: "low",
    reasons: [],
  },
  "spaghetti-squash": {
    description:
      "winter squash whose cooked flesh pulls into pasta-like strands, roasted as a noodle stand-in.",
    status: "low",
    reasons: [],
  },
  "delicata-squash": {
    description: "small, cream-and-green-striped winter squash roasted in edible-skin rings.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~49–52g, high at ~75g",
  },
  "butternut-squash": {
    description:
      "tan-skinned winter squash with sweet orange flesh, roasted, mashed, or puréed into soup.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose and fructans; low at ~63g / 1/3 cup, high at ~85g",
  },
  "acorn-squash": {
    description: "dark-green, ribbed winter squash roasted in halves and often stuffed.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~54–59g, high at ~75g",
  },
  kabocha: {
    description: "dense, sweet Japanese winter squash roasted, simmered, or used in tempura.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / 1/3 cup, moderate at ~162g",
  },
  pumpkin: {
    description: "orange winter squash roasted, puréed, or used in soups and baking.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; sugar pumpkin low at ~46–49g, high at ~75g",
  },
  chayote: {
    description:
      "pale-green, pear-shaped squash eaten raw, sautéed, or stewed, with a mild cucumber-like flavor.",
    status: "low",
    reasons: [],
  },
  "bitter-melon": {
    description:
      "warty, bitter gourd sliced into stir-fries and curries, with a pronounced bitter taste.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; low at ~15–17g / 1 Tbsp, high at ~75g / 1/3 cup",
  },
  "winter-melon": {
    description: "large, pale wax gourd simmered in Asian soups and stir-fries, mild and watery.",
    status: "low",
    reasons: [],
  },
  "bottle-gourd": {
    description:
      "pale, mild gourd (lauki/calabash) simmered in Indian and Asian curries and soups.",
    status: "low",
    reasons: [],
  },
  "ridge-gourd": {
    description: "long, angled gourd (turai/luffa acutangula) used in Indian stir-fries and dals.",
    status: "low",
    reasons: [],
  },
  luffa: {
    description:
      "sponge gourd (si qua) stir-fried or added to soups, with a mild zucchini-like texture when young.",
    status: "low",
    reasons: [],
  },
  cucumber: {
    description: "crisp watery vegetable used raw in salads, sandwiches, pickles, and raita.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~75g / ½ cup diced, moderate around 97–132g depending on variety",
  },
  "english-cucumber": {
    description:
      "long thin-skinned cucumber, usually sold wrapped in plastic, used in salads and sandwiches.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~75g / ⅓ medium or ½ cup diced, moderate at ~132g / ½ medium",
  },
  "persian-cucumber": {
    description:
      "small, thin-skinned, mildly sweet cucumber similar to Lebanese cucumber, eaten raw or in salads.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; not separately lab-tested; treat like Lebanese cucumber, low at ~75g / ½ medium, moderate at ~97g",
  },
  "pickling-cucumber": {
    description: "short, bumpy cucumber grown for pickles and relish.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; fresh pickling cucumbers not separately lab-tested, treat like cucumber at ~75g; pickled gherkins without garlic/onion are low up to ~181g",
  },
  eggplant: {
    description:
      "purple nightshade vegetable roasted, grilled, or used in moussaka, parmigiana, and dips.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; low at ~75g / 1 cup, high at larger servings",
  },
  "japanese-eggplant": {
    description:
      "long, slender, thin-skinned eggplant used in stir-fries, miso glazes, and grilling.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; not separately lab-tested; treat like common eggplant, low at ~75g / 1 cup",
  },
  "indian-eggplant": {
    description: "small round eggplant used in curries, bharta, and stuffed vegetable dishes.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; not separately lab-tested; treat like common eggplant, low at ~75g / 1 cup",
  },
  okra: {
    description: "green pod vegetable used in gumbo, stews, stir-fries, and pickles.",
    status: "low",
    reasons: [],
  },
  nopales: {
    description:
      "paddles of prickly pear cactus, grilled or used in Mexican salads, eggs, and tacos.",
    status: "low",
    reasons: [],
  },
  spinach: {
    description:
      "leafy green sautéed, creamed, or used in soups, pasta, and eggs. Mature/English spinach.",
    status: "low",
    reasons: [],
  },
  "baby-spinach": {
    description: "young tender spinach leaves used raw in salads and smoothies.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g, moderate at ~150g or more",
  },
  romaine: {
    description: "crisp elongated lettuce used in Caesar salad, sandwiches, and lettuce cups.",
    status: "low",
    reasons: [],
  },
  iceberg: {
    description: "pale crunchy lettuce used in salads, burgers, and wedges.",
    status: "low",
    reasons: [],
  },
  "butter-lettuce": {
    description: "soft, mild-headed lettuce used in salads and lettuce wraps.",
    status: "low",
    reasons: [],
  },
  "bibb-lettuce": {
    description: "small butterhead lettuce used in salads and sandwiches.",
    status: "low",
    reasons: [],
  },
  "green-leaf-lettuce": {
    description: "loose-leaf lettuce with ruffled green leaves, used in salads and sandwiches.",
    status: "low",
    reasons: [],
  },
  "red-leaf-lettuce": {
    description: "loose-leaf lettuce with reddish ruffled leaves, used in salads.",
    status: "low",
    reasons: [],
  },
  "mixed-greens": {
    description: "bagged salad blend of lettuces and young leaves, used as a salad base.",
    status: "low",
    reasons: [],
  },
  "spring-mix": {
    description: "bagged mix of baby lettuces and tender greens for salads.",
    status: "low",
    reasons: [],
  },
  arugula: {
    description: "peppery salad green also called rocket, used in salads, pizza, and pesto.",
    status: "low",
    reasons: [],
  },
  kale: {
    description: "sturdy curly leafy green used in salads, sautés, soups, and chips.",
    status: "low",
    reasons: [],
  },
  "lacinato-kale": {
    description: "flat dark Tuscan/dinosaur kale used in soups, sautés, and salads.",
    status: "low",
    reasons: [],
  },
  "swiss-chard": {
    description: "colorful-stemmed leafy green sautéed or used in soups, gratins, and pies.",
    status: "low",
    reasons: [],
  },
  "collard-greens": {
    description: "large sturdy Southern greens simmered, sautéed, or used in wraps.",
    status: "low",
    reasons: [],
  },
  "mustard-greens": {
    description: "peppery brassica greens used in Southern cooking, Indian dishes, and sautés.",
    status: "low",
    reasons: [],
  },
  "turnip-greens": {
    description: "leafy tops of turnips, simmered or sautéed as a side.",
    status: "low",
    reasons: [],
  },
  "beet-greens": {
    description: "leafy tops of beets, cooked like chard or spinach.",
    status: "low",
    reasons: [],
  },
  watercress: {
    description: "peppery aquatic green used in salads, sandwiches, and soups.",
    status: "low",
    reasons: [],
  },
  endive: {
    description:
      "slightly bitter pale leaves used in salads and as scoop-shaped appetizer cups. Belgian endive/witloof.",
    status: "low",
    reasons: [],
  },
  radicchio: {
    description: "bitter red chicory used in salads, grilling, and Italian dishes.",
    status: "low",
    reasons: [],
  },
  escarole: {
    description: "broad slightly bitter chicory green used in Italian soups, sautés, and salads.",
    status: "low",
    reasons: [],
  },
  frisee: {
    description: "curly, lacy chicory used in salads, often with warm dressings.",
    status: "low",
    reasons: [],
  },
  microgreens: {
    description: "very young vegetable or herb seedlings used as a garnish or salad accent.",
    status: "low",
    reasons: [],
  },
  "bok-choy": {
    description:
      "Chinese cabbage with white stalks and green leaves, used in stir-fries and soups.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; low at ~75g / 1 cup",
  },
  "baby-bok-choy": {
    description: "small tender bok choy, halved and stir-fried, steamed, or roasted.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; treat like bok choy, low at ~75g / 1 cup",
  },
  "napa-cabbage": {
    description: "oblong Chinese cabbage used in kimchi, slaws, stir-fries, and soups.",
    status: "low",
    reasons: [],
  },
  "gai-lan": {
    description: "Chinese broccoli with thick stalks and leaves, stir-fried with oyster sauce.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / 1 cup, moderate around 250g",
  },
  "yu-choy": {
    description: "leafy Chinese brassica similar to choy sum, used in stir-fries and soups.",
    status: "low",
    reasons: [],
  },
  mizuna: {
    description: "feathery Japanese mustard green used in salads and stir-fries.",
    status: "low",
    reasons: [],
  },
  "water-spinach": {
    description: "hollow-stemmed Asian green (ong choy/kangkung) used in stir-fries.",
    status: "low",
    reasons: [],
  },
  "amaranth-greens": {
    description: "leafy amaranth (often sold as callaloo greens), sautéed or used in soups.",
    status: "low",
    reasons: [],
  },
  "chrysanthemum-greens": {
    description: "fragrant Asian greens (tong ho) used in hot pot, soups, and stir-fries.",
    status: "low",
    reasons: [],
  },
  callaloo: {
    description:
      "Caribbean leafy green, often amaranth or taro leaves, used in stews; canned callaloo is the tested form.",
    status: "low",
    reasons: [],
  },
  "fenugreek-leaves": {
    description: "bitter herb (methi) used fresh or dried in Indian vegetable dishes and breads.",
    status: "low",
    reasons: [],
  },
  "moringa-leaves": {
    description: "nutrient-dense drumstick-tree leaves used in soups, dals, and teas.",
    status: "low",
    reasons: [],
  },
  "grape-leaves": {
    description: "tender vine leaves used to wrap dolmas and other stuffed rolls.",
    status: "low",
    reasons: [],
  },
  broccoli: {
    description: "green crucifer with florets and stalks, steamed, roasted, or used in stir-fries.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose, mainly in stalks; also reported as fructans; florets low at ~75g / ¾ cup, stalks low at ~45g / ⅓ cup",
  },
  broccolini: {
    description: "long-stemmed broccoli–gai lan hybrid, roasted or stir-fried.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose, mainly in heads; heads low at ~21–45g, stalks low at ~75g / ¾ cup; whole vegetable low around ½ cup / 45g",
  },
  "broccoli-rabe": {
    description:
      "bitter Italian green (rapini) with thin stalks and small buds, sautéed with oil and chili.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "fructans / excess fructose likely, as with related brassicas; modest ~½ cup raw servings are commonly treated as low; not clearly Monash-tested",
  },
  cauliflower: {
    description: "white (or purple) crucifer roasted, mashed, riced, or used in soups and curries.",
    status: "depends",
    reasons: ["fructans", "mannitol"],
    note: "fructans at larger servings; historically high mannitol; current Monash testing low at ~75g / ¾ cup",
  },
  romanesco: {
    description: "chartreuse fractal cauliflower relative, roasted or used like cauliflower.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; not separately lab-tested, treat like cauliflower, low at ~75g / ¾ cup, higher at larger servings",
  },
  cabbage: {
    description: "round headed brassica used in slaws, soups, stir-fries, and braises.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "fructans; green cabbage also reported with sorbitol in some tests; low at ~75g / ¾ cup",
  },
  "green-cabbage": {
    description: "common pale-green cabbage used in coleslaw, soups, and boiled dinners.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "fructans; some tests also report sorbitol; low at ~75g / ¾ cup",
  },
  "red-cabbage": {
    description: "purple-red cabbage used in slaws, pickles, and braises.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / ¾ cup",
  },
  "savoy-cabbage": {
    description: "crinkled-leaf cabbage used in stuffed cabbage, soups, and sautés.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~75g / ¾ cup",
  },
  "brussels-sprouts": {
    description: "small cabbage-like buds, roasted, shaved raw, or sautéed.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ~4 medium / 75g, high around 6 medium / 118g",
  },
  kohlrabi: {
    description: "mild brassica bulb eaten raw in slaws or cooked like a turnip.",
    status: "low",
    reasons: [],
  },
  asparagus: {
    description: "spring spear vegetable roasted, grilled, or steamed as a side.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans and excess fructose; only ~12g / ⅔ spear is low, ~5 spears / 75g is high",
  },
  artichoke: {
    description: "globe artichoke with edible heart and leaf bases, steamed or used in dips.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans; canned hearts in brine may be low at ~50g / ⅓ cup drained",
  },
  "jerusalem-artichoke": {
    description: "knobby sunchoke tuber eaten raw, roasted, or pureed.",
    status: "high",
    reasons: ["fructans"],
  },
  "fennel-bulb": {
    description: "anise-flavored bulb sliced raw in salads or roasted and braised.",
    status: "depends",
    reasons: ["fructans", "fructose", "mannitol"],
    note: "fructans, mannitol, and excess fructose; low at ~75g / ¾ cup raw, moderate around 145g, high around 195g",
  },
  "fennel-fronds": {
    description: "feathery anise-scented fennel leaves used as an herb or garnish.",
    status: "low",
    reasons: [],
  },
  mushroom: {
    description: "generic fresh mushrooms used in sautés, soups, pasta, and pizza.",
    status: "high",
    reasons: ["mannitol"],
    note: "mannitol at typical servings; oyster, canned drained button, wood ear, and maitake are exceptions",
  },
  "button-mushroom": {
    description: "common white/champignon mushrooms used in sautés, soups, and sauces.",
    status: "depends",
    reasons: ["fructans", "mannitol"],
    note: "mannitol and fructans; low only at ~7g / about 1½ mushrooms, high at a typical ~75g serve; canned drained champignons are low at ~75g / ½ cup",
  },
  cremini: {
    description:
      "brown baby bella mushrooms, the same species as button, used in sautés and sauces.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; low only at a very small serve around 7–10g, high at typical cooking amounts",
  },
  portobello: {
    description: "large mature cremini caps, grilled or used as burger substitutes.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; low at ~10g, high at ~75g / 1 mushroom",
  },
  shiitake: {
    description: "meaty East Asian mushrooms used in stir-fries, ramen, and broths.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; fresh low only at ~7–11g, high at typical ~75g; dried low at about 2 mushrooms / ~7g",
  },
  "oyster-mushroom": {
    description: "fan-shaped mushrooms used in stir-fries, soups, and as a meaty substitute.",
    status: "low",
    reasons: [],
  },
  "king-oyster-mushroom": {
    description: "thick-stemmed oyster relative, sliced into steaks or scallops.",
    status: "low",
    reasons: [],
  },
  enoki: {
    description: "long thin white mushrooms used in ramen, hot pot, and salads.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; low at ~10–12g / about 2 mushrooms, high at ~75g",
  },
  maitake: {
    description: "frilly hen-of-the-woods clusters, roasted or used in sautés.",
    status: "low",
    reasons: [],
  },
  "wood-ear": {
    description: "crunchy black fungus used in Chinese stir-fries, soups, and dumplings.",
    status: "low",
    reasons: [],
  },
  "green-beans": {
    description: "snap/string beans eaten raw, steamed, or in casseroles and stir-fries.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; low at ~15 beans / 75g, moderate around 120g, high around 180g",
  },
  "wax-beans": {
    description: "yellow snap beans used like green beans in salads and sides.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; not separately lab-tested; treat like green beans, low at ~75g",
  },
  "long-beans": {
    description: "yardlong/snake beans used in stir-fries and curries.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; low at ~1 cup raw / about 75–90g",
  },
  "snow-peas": {
    description: "flat edible-pod peas used in stir-fries and salads.",
    status: "depends",
    reasons: ["fructans", "gos", "mannitol"],
    note: "fructans and mannitol; GOS at larger serves; low at ~5 pods / 16g, moderate around 7 pods / 25g, high around 22 pods / 75g",
  },
  "sugar-snap-peas": {
    description: "plump edible-pod peas eaten raw or in stir-fries.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; low at ~4 pods / 14g, moderate around 7 pods / 20g, high around 25 pods / 75g",
  },
  "bean-sprouts": {
    description: "crunchy mung bean sprouts used in stir-fries, pho, and salads.",
    status: "low",
    reasons: [],
  },
  "alfalfa-sprouts": {
    description: "fine sprouts used on sandwiches, salads, and as a garnish.",
    status: "low",
    reasons: [],
  },
  "broccoli-sprouts": {
    description: "young broccoli sprouts used in sandwiches, salads, and smoothies.",
    status: "low",
    reasons: [],
  },
  avocado: {
    description: "creamy fruit used in guacamole, salads, and toast.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "polyols / perseitol, historically listed as sorbitol; low at ~60g, high at larger servings",
  },
  corn: {
    description:
      "sweet corn kernels or corn on the cob, boiled, grilled, or used in salads and salsas.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans and GOS; low at ~½ cup / 75g kernels or ½ cob, moderate around 1 cup / 163g",
  },
  "baby-corn": {
    description: "miniature corn cobs used in stir-fries and salads, usually canned.",
    status: "low",
    reasons: [],
  },
  hominy: {
    description: "nixtamalized corn kernels used in posole, soups, and Southern dishes.",
    status: "low",
    reasons: [],
  },
  cilantro: {
    description: "fresh coriander leaves used in salsa, guacamole, curries, and as a garnish.",
    status: "low",
    reasons: [],
  },
  parsley: {
    description: "fresh herb used in tabbouleh, sauces, soups, and as a garnish.",
    status: "low",
    reasons: [],
  },
  basil: {
    description: "sweet aromatic herb used in pesto, Caprese, pasta, and Thai dishes.",
    status: "low",
    reasons: [],
  },
  "thai-basil": {
    description: "anise-scented basil used in Southeast Asian curries, pho, and stir-fries.",
    status: "low",
    reasons: [],
  },
  "holy-basil": {
    description: "spicy tulsi basil used in Thai stir-fries such as pad krapow.",
    status: "low",
    reasons: [],
  },
  dill: {
    description: "feathery herb used with fish, pickles, potatoes, yogurt, and salads.",
    status: "low",
    reasons: [],
  },
  mint: {
    description: "fresh cooling herb used in teas, salads, sauces, and desserts.",
    status: "low",
    reasons: [],
  },
  spearmint: {
    description: "common culinary mint used in teas, sauces, and Middle Eastern salads.",
    status: "low",
    reasons: [],
  },
  peppermint: {
    description: "pungent mint used in teas, desserts, and flavoring.",
    status: "low",
    reasons: [],
  },
  "rosemary-fresh": {
    description:
      "woody evergreen herb used in roasts, breads, and marinades. Needle-like leaves, piney aroma.",
    status: "low",
    reasons: [],
  },
  "thyme-fresh": {
    description:
      "small-leaf woody herb for stews, roasted vegetables, and poultry. Earthy and slightly minty.",
    status: "low",
    reasons: [],
  },
  "oregano-fresh": {
    description:
      "pungent Mediterranean herb for tomato sauces, pizza, and grilled meats. Stronger than marjoram.",
    status: "low",
    reasons: [],
  },
  "sage-fresh": {
    description:
      "velvety gray-green leaves used in stuffing, brown butter, and sausage. Earthy and slightly peppery.",
    status: "low",
    reasons: [],
  },
  tarragon: {
    description:
      "slender anise-scented herb used in French sauces, chicken, and vinaigrettes. Mild licorice note.",
    status: "low",
    reasons: [],
  },
  chervil: {
    description:
      "delicate parsley-like herb with a faint anise taste, used as a finishing garnish. Common in French cooking.",
    status: "low",
    reasons: [],
  },
  "marjoram-fresh": {
    description:
      "milder cousin of oregano used in soups, vegetables, and meat rubs. Sweet and floral.",
    status: "low",
    reasons: [],
  },
  lemongrass: {
    description:
      "fibrous tropical stalk used to perfume curries, soups, and teas. Bright lemon-citrus aroma.",
    status: "low",
    reasons: [],
  },
  "kaffir-lime-leaf": {
    description:
      "glossy double leaves used in Thai and Southeast Asian curries and soups. Floral citrus perfume.",
    status: "low",
    reasons: [],
  },
  "curry-leaf": {
    description:
      "aromatic South Asian leaves fried in oil to start dals, curries, and chutneys. Nutty citrus scent.",
    status: "low",
    reasons: [],
  },
  shiso: {
    description:
      "jagged Japanese herb (perilla) used with sushi, salads, and pickles. Mint-basil-anise flavor.",
    status: "low",
    reasons: [],
  },
  epazote: {
    description:
      "pungent Mexican herb traditionally cooked with beans. Sharp, medicinal aroma; used in small amounts.",
    status: "low",
    reasons: [],
  },
  culantro: {
    description:
      "long, saw-toothed herb related in flavor to cilantro, used in Caribbean and Latin stews. Stronger and more heat-stable than cilantro.",
    status: "low",
    reasons: [],
  },
  "vietnamese-coriander": {
    description:
      "pointed, peppery herb (rau răm) used in Vietnamese salads, soups, and noodle dishes. Hot-cilantro flavor.",
    status: "low",
    reasons: [],
  },
  "lemon-balm": {
    description:
      "mint-family herb with a lemon scent, used in teas, fruit salads, and light sauces. Soft, citrusy leaves.",
    status: "low",
    reasons: [],
  },
  sorrel: {
    description:
      "tart, lemony leafy herb used in soups, sauces, and salads. Bright sour flavor from oxalic acid.",
    status: "low",
    reasons: [],
  },
  borage: {
    description:
      "cucumber-flavored herb with edible blue flowers, used in salads, drinks, and garnishes. Hairy leaves.",
    status: "low",
    reasons: [],
  },
  lemon: {
    description: "tart citrus fruit used for juice, zest, and marinades. Bright yellow.",
    status: "low",
    reasons: [],
  },
  lime: {
    description:
      "small green citrus used for juice, zest, and finishing savory and sweet dishes. Sharper than lemon.",
    status: "low",
    reasons: [],
  },
  "key-lime": {
    description:
      "small, seedy Florida lime used in pies, ceviche, and drinks. More floral and tart than Persian lime.",
    status: "low",
    reasons: [],
  },
  orange: {
    description: "sweet round citrus eaten fresh, juiced, or zested. Typical table orange.",
    status: "low",
    reasons: [],
  },
  "navel-orange": {
    description:
      "seedless sweet orange with a navel at one end, eaten out of hand or sectioned. One medium (~130g) is the usual low serve; larger portions can add excess fructose.",
    status: "low",
    reasons: [],
  },
  "blood-orange": {
    description:
      "orange with crimson flesh and a berry-floral taste, used in salads, juice, and desserts.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; about 1/2 medium (50–65g) low; a whole fruit is likely high. Monash has not tested this variety.",
  },
  tangerine: {
    description:
      "easy-peel loose-skin citrus, sweeter and smaller than a typical orange. Treated like mandarin.",
    status: "low",
    reasons: [],
  },
  clementine: {
    description:
      "small seedless mandarin hybrid sold as a snack fruit. One medium is typically low; extra fruit can add excess fructose.",
    status: "low",
    reasons: [],
  },
  mandarin: {
    description:
      "small loose-skin citrus eaten in segments. One medium (~90g) low; around 97g and up can be high in excess fructose.",
    status: "low",
    reasons: [],
  },
  grapefruit: {
    description: "large tart-sweet citrus eaten fresh or juiced. Pink, red, or white flesh.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "fructans; about 1/3 small fruit (80–90g) low; a whole small fruit (~240g) high. Some tests also flag excess fructose at larger serves.",
  },
  pomelo: {
    description:
      "oversized mild citrus related to grapefruit, with thick pith and sweet-tart segments. Used fresh or in salads.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; not specifically Monash-tested; treat like grapefruit (about 1/3 of a small fruit low, a large serving high).",
  },
  yuzu: {
    description:
      "intensely aromatic East Asian citrus used mainly as zest and juice in small amounts. Rarely eaten as a whole fruit.",
    status: "low",
    reasons: [],
  },
  calamansi: {
    description:
      "tiny sour citrus used as a squeeze of juice in Filipino and Southeast Asian cooking. Used like lime.",
    status: "low",
    reasons: [],
  },
  "preserved-lemon": {
    description:
      "salt-cured lemon peel used in North African stews, dressings, and marinades. Rinse before using; check for onion or garlic in the brine.",
    status: "low",
    reasons: [],
  },
  apple: {
    description: "crisp tree fruit eaten raw, baked, or in sauces.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  "granny-smith": {
    description:
      "tart green apple used raw in salads and baking. Firmer and more acidic than dessert apples.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  honeycrisp: {
    description:
      "very crisp, juicy sweet-tart apple eaten fresh. Not separately lab-tested from other apples.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  pear: {
    description: "juicy, grainy-fleshed tree fruit eaten fresh or poached. Softens as it ripens.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  "asian-pear": {
    description: "round, crisp nashi pear eaten fresh like an apple. Juicy and mildly sweet.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  banana: {
    description:
      "tropical fruit eaten out of hand, in baking, or blended. FODMAP load rises as it ripens.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; firm/unripe: 1 medium (~95–100g) low; ripe: about 1/3 medium (35–46g) low, larger ripe servings high.",
  },
  plantain: {
    description:
      "starchy cooking banana fried, boiled, or baked. Used green or ripe in savory dishes.",
    status: "low",
    reasons: [],
  },
  "green-plantain": {
    description: "unripe plantain, very starchy, used for tostones and chips. Firm and not sweet.",
    status: "low",
    reasons: [],
  },
  blueberry: {
    description: "small blue berries for snacks, baking, and oatmeal. Mild and sweet.",
    status: "low",
    reasons: [],
  },
  strawberry: {
    description: "red berries eaten fresh, in desserts, and in salads.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; about 5 medium (65g) low; larger servings moderate to high.",
  },
  raspberry: {
    description: "fragile red berries used fresh, in sauces, and in baking. Tart-sweet.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; about 1/3 cup (58–74g) low; larger servings moderate to high.",
  },
  blackberry: {
    description: "dark, seedy berries used fresh, in cobblers, and in jams.",
    status: "high",
    reasons: ["sorbitol"],
  },
  boysenberry: {
    description: "large maroon blackberry–raspberry hybrid used in pies and jams. Very seedy.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; about 12g (a few berries) low; a typical handful high.",
  },
  cranberry: {
    description:
      "tart red berries used in sauces, baking, and salads. Usually cooked or dried rather than eaten raw by the handful.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 1/2 cup fresh (50g) low; around 133g moderate. Dried cranberries are a separate, more concentrated item.",
  },
  peach: {
    description: "fuzzy stone fruit eaten fresh, grilled, or in desserts. Yellow or white flesh.",
    status: "high",
    reasons: ["sorbitol"],
  },
  nectarine: {
    description: "smooth-skinned stone fruit similar to peach, eaten fresh or baked.",
    status: "high",
    reasons: ["sorbitol"],
  },
  apricot: {
    description: "small orange stone fruit eaten fresh, dried, or in jams. Tangy-sweet.",
    status: "high",
    reasons: ["sorbitol"],
  },
  plum: {
    description: "juicy stone fruit eaten fresh or cooked. Red, black, or yellow skin.",
    status: "high",
    reasons: ["sorbitol"],
  },
  cherry: {
    description: "small stone fruit eaten fresh or in desserts. Sweet or sour varieties.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  pineapple: {
    description:
      "tropical fruit with spiky skin and sweet-tart yellow flesh, eaten fresh or in savory dishes.",
    status: "low",
    reasons: [],
  },
  mango: {
    description:
      "sweet tropical fruit eaten fresh, in salsas, and in desserts. Fibrous orange flesh.",
    status: "high",
    reasons: ["fructose"],
  },
  "green-mango": {
    description:
      "unripe mango used in salads, pickles, and chutneys. Firm, tart, and pale. Not separately Monash-tested from ripe mango.",
    status: "high",
    reasons: ["fructose"],
  },
  watermelon: {
    description: "watery summer melon eaten in wedges and fruit salads. Red or yellow flesh.",
    status: "high",
    reasons: ["fructose", "mannitol"],
  },
  honeydew: {
    description: "pale green muskmelon with sweet, juicy flesh. Eaten in slices or fruit salad.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 1/2 cup diced (90g) low; around 3/4 cup (115–135g) moderate to high.",
  },
  cantaloupe: {
    description: "orange-fleshed muskmelon (rockmelon) eaten in slices or salads. Sweet and musky.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 3/4 cup diced (120g) low; around 1 cup (150g) moderate to high.",
  },
  grape: {
    description: "small bunched fruit eaten fresh or used in salads. Green, red, or black.",
    status: "high",
    reasons: ["fructose"],
  },
  kiwi: {
    description:
      "fuzzy brown fruit with bright green or gold flesh and tiny seeds. Eaten scooped or sliced.",
    status: "low",
    reasons: [],
  },
  papaya: {
    description:
      "tropical fruit with orange or green flesh, eaten fresh or in salads. Black seeds in the cavity.",
    status: "low",
    reasons: [],
  },
  guava: {
    description:
      "tropical fruit with fragrant flesh, eaten ripe or used green in cooking. Pink or white interior.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; ripe: generous serves (up to about 500g) low; unripe/firm: only about 14g low, larger servings high.",
  },
  "passion-fruit": {
    description:
      "seedy, aromatic pulp scooped from a wrinkled purple or yellow shell. Used in drinks and desserts.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; pulp of about 2 fruits (46g) low; around 98g moderate to high.",
  },
  lychee: {
    description:
      "peeled tropical fruit with translucent sweet flesh around a single seed. Floral and juicy.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; about 3 fresh fruits (30g) low; a typical handful high. Canned, drained lychees have a larger low serve (about 15 medium).",
  },
  longan: {
    description:
      "small brown-skinned fruit related to lychee, with translucent flesh. Milder and less floral.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; about 2–3 fruits (25g) low; larger servings high.",
  },
  rambutan: {
    description: "hairy red tropical fruit related to lychee, with similar translucent flesh.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 3 fruits (48g) low; larger servings high.",
  },
  starfruit: {
    description: "waxy yellow fruit that slices into stars. Crisp, juicy, mildly tart.",
    status: "low",
    reasons: [],
  },
  persimmon: {
    description: "orange fruit eaten when soft-ripe (Hachiya) or crisp (Fuyu). Honey-sweet flesh.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 3/4 fruit (60–64g) low; larger servings high.",
  },
  pomegranate: {
    description:
      "leathery fruit filled with juicy ruby seeds (arils), used in salads, sauces, and snacks.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 1/4 cup seeds (45–52g) low; larger servings high.",
  },
  fig: {
    description:
      "pear-shaped fruit with jammy flesh and tiny seeds, eaten fresh or dried. Purple or green skin.",
    status: "high",
    reasons: ["fructose"],
  },
  date: {
    description:
      "sticky-sweet fruit eaten as a snack or used to sweeten baking and energy bites. Fresh Medjool or dried pitted.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "sorbitol and fructans; about 5 dried pitted dates (30g) or 1 Medjool (20g) low; larger servings high.",
  },
  coconut: {
    description:
      "white meat from a mature coconut, eaten as chunks or grated. Mildly sweet and rich.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; about 3/4 cup flesh (81–95g) low; around 1 cup (96g) moderate to high.",
  },
  jackfruit: {
    description:
      "huge tropical fruit used ripe (sweet) or young (meaty, often canned). Fibrous yellow flesh.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; young canned, drained: about 1/2 cup and up to very large serves low; ripe/yellow canned: about 45–59g low, larger servings high.",
  },
  durian: {
    description:
      "large spiky tropical fruit with custard-like flesh and a strong odor. Eaten fresh or frozen.",
    status: "low",
    reasons: [],
  },
  soursop: {
    description:
      "large green tropical fruit (guanabana) with white, tart-sweet pulp. Used in juices and desserts. Closely related to high-FODMAP custard apple; not Monash-tested as a fresh fruit.",
    status: "high",
    reasons: ["fructose"],
  },
  breadfruit: {
    description: "starchy tropical fruit cooked like a potato when mature. Mild, bread-like flesh.",
    status: "low",
    reasons: [],
  },
  ackee: {
    description:
      "buttery Jamaican fruit usually sold canned in brine and cooked with saltfish. Only ripe/canned fruit is eaten.",
    status: "low",
    reasons: [],
  },
  "dragon-fruit": {
    description:
      "cactus fruit with pink or yellow skin and speckled white or red flesh. Mildly sweet.",
    status: "low",
    reasons: [],
  },
  quince: {
    description:
      "hard, fragrant pome fruit that is cooked into pastes, jellies, and stews. Rarely eaten raw. Fresh fruit is not well tested; older lists group it with apples and pears.",
    status: "high",
    reasons: ["fructose"],
  },
  currant: {
    description:
      "small tart Ribes berries, red or black, used in sauces, baking, and garnishes. (Dried Zante currants are a different, concentrated product.)",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; red currants: about 1/2 cup low; black currants typically high.",
  },
  gooseberry: {
    description:
      "tart green or blush Ribes berries used in crumbles, fools, and jams. Usually cooked with sugar.",
    status: "low",
    reasons: [],
  },
  mulberry: {
    description: "fragile blackberry-like fruit from a tree, eaten fresh or dried. Stain easily.",
    status: "low",
    reasons: [],
  },
  acai: {
    description:
      "dark purple Amazonian berry, usually sold as frozen pulp or powder for bowls and smoothies.",
    status: "low",
    reasons: [],
  },
  "goji-berry": {
    description:
      "small red dried berries used in teas, trail mixes, and baking. Also called wolfberries.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 3 teaspoons (10g) low; larger servings high.",
  },
  rhubarb: {
    description:
      "tart pink celery-like stalks used in pies, crumbles, and sauces. Leaves are not eaten.",
    status: "low",
    reasons: [],
  },
  olive: {
    description:
      "brined tree fruit used as a snack, in salads, and on pizza. Green or black; plain, not garlic-stuffed.",
    status: "low",
    reasons: [],
  },
  "kalamata-olive": {
    description:
      "almond-shaped Greek olives, dark purple, usually packed in brine or olive oil. Skip garlic marinades.",
    status: "low",
    reasons: [],
  },
  "green-olive": {
    description:
      "unripe olives, firmer and saltier than black, used as a snack or in cooking. Choose plain pitted olives.",
    status: "low",
    reasons: [],
  },
  raisin: {
    description: "dried grapes used in baking, oatmeal, and trail mix. Concentrated fruit sugars.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 1 tablespoon (13g) low; about 1 1/2 tablespoons moderate; larger servings high.",
  },
  "dried-cranberry": {
    description:
      "sweetened dried cranberries used in salads, baking, and trail mix. Often include added juice or sugar.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 1 tablespoon to 22g low; around 28g moderate; larger servings high.",
  },
  "dried-apricot": {
    description: "chewy orange dried stone fruit used in baking, tagines, and snacks.",
    status: "high",
    reasons: ["sorbitol"],
  },
  prune: {
    description: "dried plums used as a snack or for baking. Well known for a laxative effect.",
    status: "high",
    reasons: ["sorbitol"],
  },
  milk: {
    description: "cow's milk used as a drink and in cooking and baking.",
    status: "high",
    reasons: ["lactose"],
  },
  "whole-milk": {
    description: "full-fat cow's milk used as a drink and in cooking and baking.",
    status: "high",
    reasons: ["lactose"],
  },
  "2-percent-milk": {
    description: "reduced-fat cow's milk used as a drink and in cooking and baking.",
    status: "high",
    reasons: ["lactose"],
  },
  "skim-milk": {
    description: "nonfat cow's milk used as a drink and in cooking and baking.",
    status: "high",
    reasons: ["lactose"],
  },
  "lactose-free-milk": {
    description: "cow's milk treated with lactase so the lactose is already broken down.",
    status: "low",
    reasons: [],
  },
  buttermilk: {
    description: "tangy cultured milk used in baking, pancakes, and fried coatings.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 1 tablespoon; high at about 1/2 cup (125 ml) or more.",
  },
  "evaporated-milk": {
    description: "canned concentrated unsweetened cow's milk used in pies, sauces, and baking.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 10 g (2 teaspoons); moderate at 25 g; high in typical recipe amounts.",
  },
  "sweetened-condensed-milk": {
    description: "thick canned cow's milk cooked with sugar for desserts and fudge.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 7 g (1 teaspoon); moderate at 26 g (1 tablespoon); high at 1/2 cup.",
  },
  "half-and-half": {
    description: "blend of milk and cream used in coffee and creamy sauces.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 2 tablespoons; larger coffee or cooking amounts are higher in lactose.",
  },
  "heavy-cream": {
    description: "high-fat cream used in sauces, soups, and whipped toppings.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 1 1/2 tablespoons (30 g) of thickened/heavy cream; moderate at 2 tablespoons (40 g). A 1/2 cup (60 g) serve of whipped cream made from it is still low.",
  },
  "whipping-cream": {
    description: "cream with enough fat to whip, used in desserts and sauces.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 1 1/2 tablespoons (30 g) liquid cream; moderate at 2 tablespoons (40 g). A 1/2 cup whipped portion is still low.",
  },
  "whipped-cream": {
    description: "cream beaten until fluffy and used to top desserts and drinks.",
    status: "low",
    reasons: [],
  },
  butter: {
    description: "churned cream fat used for cooking, baking, and spreading.",
    status: "low",
    reasons: [],
  },
  "salted-butter": {
    description: "butter with added salt used for cooking, baking, and spreading.",
    status: "low",
    reasons: [],
  },
  "unsalted-butter": {
    description: "butter without added salt used for baking and cooking.",
    status: "low",
    reasons: [],
  },
  ghee: {
    description:
      "clarified butter with milk solids removed, used for high-heat cooking and finishing.",
    status: "low",
    reasons: [],
  },
  yogurt: {
    description: "fermented cow's milk eaten plain or flavored as a snack and used in cooking.",
    status: "high",
    reasons: ["lactose"],
  },
  "greek-yogurt": {
    description: "strained thick yogurt used as a snack, dip, and cooking ingredient.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 23 g (1 tablespoon); moderate at 93 g (about 1/3 cup); high at 170–200 g (typical tub).",
  },
  skyr: {
    description: "thick Icelandic-style strained yogurt used as a snack and in smoothies.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; treat like Greek yogurt: a tablespoon-size serve is more likely low; a typical tub is high. Not separately listed in Monash testing.",
  },
  kefir: {
    description: "drinkable fermented milk used as a beverage and in smoothies.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 1 tablespoon (24 g); moderate at 4 tablespoons (96 g); high at 200 ml.",
  },
  labneh: {
    description: "strained yogurt cheese used as a spread and dip.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; small spoonfuls are more likely low, similar to strained yogurt or cream cheese; a typical dip serving can be high. Not separately Monash-tested.",
  },
  "sour-cream": {
    description: "tangy cultured cream used on baked potatoes, tacos, and in baking.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 2 tablespoons (40 g); high at 1/4 cup (60–80 g) or more.",
  },
  "creme-fraiche": {
    description: "rich cultured cream used to finish soups, sauces, and desserts.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 2 tablespoons; larger dollops are higher in lactose.",
  },
  quark: {
    description: "fresh spoonable cheese used like yogurt in baking and spreads.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 2 tablespoons (40 g); moderate at 3 tablespoons (60 g).",
  },
  "fromage-blanc": {
    description: "fresh soft French cheese used like yogurt or cream cheese.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; treat like quark: about 2 tablespoons is more likely low; larger serves are higher. Not separately Monash-tested.",
  },
  "cottage-cheese": {
    description: "fresh curd cheese eaten as a snack and used in lasagna and baking.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (2 tablespoons); moderate at 60 g.",
  },
  ricotta: {
    description: "fresh whey cheese used in lasagna, stuffed pasta, and desserts.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (2 tablespoons); moderate at 120 g.",
  },
  "cream-cheese": {
    description: "fresh spreadable cheese used on bagels, in frosting, and in dips.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (2 tablespoons); moderate at 80 g.",
  },
  mascarpone: {
    description: "rich fresh Italian cream cheese used in tiramisu and desserts.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 2 tablespoons; larger dessert portions are higher in lactose.",
  },
  cheddar: {
    description: "firm aged cow's-milk cheese used for sandwiches, melting, and snacking.",
    status: "low",
    reasons: [],
  },
  "sharp-cheddar": {
    description: "longer-aged cheddar used for sandwiches, cooking, and snacking.",
    status: "low",
    reasons: [],
  },
  colby: {
    description: "mild semi-hard American cheese used for sandwiches and snacking.",
    status: "low",
    reasons: [],
  },
  "colby-jack": {
    description: "marbled blend of Colby and Monterey Jack used for sandwiches and melting.",
    status: "low",
    reasons: [],
  },
  "monterey-jack": {
    description: "mild semi-hard cheese used for melting, quesadillas, and sandwiches.",
    status: "low",
    reasons: [],
  },
  "pepper-jack": {
    description: "Monterey Jack with chili peppers used for sandwiches and melting.",
    status: "low",
    reasons: [],
  },
  mozzarella: {
    description: "mild pasta-filata cheese used on pizza, pasta, and sandwiches.",
    status: "low",
    reasons: [],
  },
  "fresh-mozzarella": {
    description: "high-moisture mozzarella packed in water or whey and used in caprese and salads.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (about 1 1/2 ounces); wetter fresh balls hold more lactose than low-moisture mozzarella, so larger salad portions can exceed a low serve.",
  },
  provolone: {
    description: "aged Italian-style stretching cheese used in sandwiches and melting.",
    status: "low",
    reasons: [],
  },
  "american-cheese": {
    description: "processed cheese slices used on burgers and grilled cheese.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at about 1 slice (19–28 g); moderate at 2 slices. Added milk or whey can raise lactose versus natural cheese.",
  },
  muenster: {
    description: "mild semi-soft cheese used for sandwiches and melting.",
    status: "low",
    reasons: [],
  },
  havarti: {
    description: "creamy semi-soft Danish cheese used for sandwiches and snacking.",
    status: "low",
    reasons: [],
  },
  "string-cheese": {
    description: "snack-size mozzarella sticks eaten as a finger food.",
    status: "low",
    reasons: [],
  },
  "cheese-curds": {
    description: "fresh unsalted curds used as a snack and in poutine.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; fresh curds are not aged, so treat like paneer: about 40 g is more likely low; larger snack portions are higher. Not separately Monash-tested.",
  },
  feta: {
    description: "brined crumbly cheese used on salads, in pies, and with vegetables.",
    status: "low",
    reasons: [],
  },
  "goat-cheese": {
    description: "fresh chèvre used on salads, crostini, and in cooking.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (about 1 tablespoon crumbled to 1 1/2 ounces); moderate at 250 g.",
  },
  brie: {
    description: "soft-ripened cheese with an edible rind used on cheese boards and baked.",
    status: "low",
    reasons: [],
  },
  camembert: {
    description: "soft-ripened French cheese used on cheese boards and baked.",
    status: "low",
    reasons: [],
  },
  "blue-cheese": {
    description: "veined aged cheese used in salads, dressings, and on steaks.",
    status: "low",
    reasons: [],
  },
  gorgonzola: {
    description: "Italian blue cheese used in pasta, salads, and on cheese boards.",
    status: "low",
    reasons: [],
  },
  roquefort: {
    description: "aged sheep's-milk blue cheese used in salads and dressings.",
    status: "low",
    reasons: [],
  },
  parmesan: {
    description: "hard aged Italian cheese grated over pasta and salads.",
    status: "low",
    reasons: [],
  },
  pecorino: {
    description: "hard aged sheep's-milk cheese grated over pasta and salads.",
    status: "low",
    reasons: [],
  },
  romano: {
    description: "hard aged grating cheese used on pasta and in cooking.",
    status: "low",
    reasons: [],
  },
  asiago: {
    description: "Italian cow's-milk cheese used for grating, slicing, and snacking.",
    status: "low",
    reasons: [],
  },
  gruyere: {
    description: "nutty aged Alpine cheese used in fondue, French onion soup, and baking.",
    status: "low",
    reasons: [],
  },
  swiss: {
    description: "mild holey aged cheese used for sandwiches and melting.",
    status: "low",
    reasons: [],
  },
  emmental: {
    description: "Swiss-style Alpine cheese used for sandwiches, fondue, and melting.",
    status: "low",
    reasons: [],
  },
  gouda: {
    description: "Dutch semi-hard cheese used for sandwiches, snacking, and melting.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; typical 40–60 g slices are usually low; younger, milder Gouda can hold more lactose than aged wheels, so check the label (aim for ≤1 g sugar per serve).",
  },
  "aged-gouda": {
    description: "long-aged Gouda used for snacking and grating.",
    status: "low",
    reasons: [],
  },
  manchego: {
    description: "aged Spanish sheep's-milk cheese used for snacking and tapas.",
    status: "low",
    reasons: [],
  },
  halloumi: {
    description: "firm grilling cheese used fried or grilled in salads and sandwiches.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (2 slices); moderate at 60 g (3 slices).",
  },
  paneer: {
    description: "fresh unsalted Indian cheese used in curries and grilling.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g (2 tablespoons); moderate at 55 g; high at very large serves (around 220 g).",
  },
  "queso-fresco": {
    description: "fresh crumbly Mexican cheese used on tacos, beans, and salads.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 40 g; moderate at 120 g.",
  },
  "queso-blanco": {
    description: "fresh mild Latin American cheese used crumbled or pan-fried.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; treat like queso fresco: about 40 g is more likely low; larger toppings are higher. Not separately Monash-tested.",
  },
  cotija: {
    description: "aged crumbly Mexican cheese used on elote, tacos, and beans.",
    status: "low",
    reasons: [],
  },
  oaxaca: {
    description: "stringy Mexican melting cheese used in quesadillas and tacos.",
    status: "low",
    reasons: [],
  },
  asadero: {
    description: "mild Mexican melting cheese used in quesadillas and nachos.",
    status: "low",
    reasons: [],
  },
  "queso-oaxaca": {
    description: "another name for Oaxaca cheese used in quesadillas and tacos.",
    status: "low",
    reasons: [],
  },
  "ice-cream": {
    description: "frozen dessert made from milk and cream.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; low at 30 g (about 2/3 scoop of vanilla); moderate at about 2 scoops; a typical US 2/3-cup serving is high.",
  },
  "frozen-yogurt": {
    description: "frozen dessert made from yogurt, eaten as a snack or dessert.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; regular frozen yogurt follows yogurt: typical scoops are high; lactose-free versions are low. Not separately Monash-tested as a generic food.",
  },
  "dulce-de-leche": {
    description: "caramelized sweetened milk used as a dessert sauce and filling.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; like sweetened condensed milk: about 1 teaspoon may stay low; typical dessert servings are high. Not separately Monash-tested.",
  },
  "whey-protein": {
    description: "milk-derived protein powder used in shakes and baking.",
    status: "depends",
    reasons: ["fructans", "lactose"],
    note: "lactose; whey protein isolate is typically low; whey protein concentrate is high unless labeled lactose-free. Watch flavored powders for inulin or polyols.",
  },
  "casein-protein": {
    description: "slow-digesting milk protein powder used in shakes.",
    status: "depends",
    reasons: ["fructans", "lactose"],
    note: "lactose; casein isolate is more likely low; concentrate can retain lactose unless labeled lactose-free. Watch flavored powders for inulin or polyols.",
  },
  "lactose-free-cheddar": {
    description: "cheddar treated or labeled as lactose-free for sandwiches and cooking.",
    status: "low",
    reasons: [],
  },
  "lactose-free-cheese-curds": {
    description: "fresh curds treated with lactase and eaten as a snack.",
    status: "low",
    reasons: [],
  },
  "lactose-free-yogurt": {
    description: "yogurt treated with lactase and eaten as a snack or used in cooking.",
    status: "low",
    reasons: [],
  },
  "lactose-free-feta": {
    description: "feta treated or labeled as lactose-free for salads and cooking.",
    status: "low",
    reasons: [],
  },
  "lactose-free-cream-cheese": {
    description: "cream cheese treated with lactase and used as a spread and in baking.",
    status: "low",
    reasons: [],
  },
  "lactose-free-ice-cream": {
    description: "dairy ice cream treated with lactase and eaten as dessert.",
    status: "low",
    reasons: [],
  },
  "lactose-free-sour-cream": {
    description: "sour cream treated with lactase and used as a topping and in cooking.",
    status: "low",
    reasons: [],
  },
  "white-rice": {
    description: "staple cooked grain served plain, in bowls, or as a side.",
    status: "low",
    reasons: [],
  },
  "brown-rice": {
    description: "whole-grain rice with the bran left on, cooked as a side or bowl base.",
    status: "low",
    reasons: [],
  },
  "jasmine-rice": {
    description: "fragrant long-grain white rice used in Thai and everyday cooking.",
    status: "low",
    reasons: [],
  },
  "basmati-rice": {
    description: "aromatic long-grain rice used in Indian and Middle Eastern dishes.",
    status: "low",
    reasons: [],
  },
  "sushi-rice": {
    description: "short-grain white rice seasoned and used for sushi or rice balls.",
    status: "low",
    reasons: [],
  },
  "sticky-rice": {
    description: "glutinous sweet rice cooked sticky for dumplings, desserts, or sides.",
    status: "low",
    reasons: [],
  },
  "wild-rice": {
    description: "dark aquatic grass grain cooked as a side or in pilafs and stuffing.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 cup / 140 g cooked low; about 2 cups / 246 g moderate and 2¼ cups / 288 g high",
  },
  "black-rice": {
    description: "dark whole-grain rice cooked as a side or in bowls.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 cup cooked low; 2 cups cooked moderate",
  },
  "red-rice": {
    description: "reddish whole-grain rice cooked as a side or in pilafs.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; 1 cup / 190 g cooked low; 2 cups / 380 g moderate",
  },
  "arborio-rice": {
    description: "short-grain starchy rice used for risotto.",
    status: "low",
    reasons: [],
  },
  "rice-noodle": {
    description: "dried noodles made from rice flour, used in stir-fries, soups, and pad Thai.",
    status: "low",
    reasons: [],
  },
  "rice-vermicelli": {
    description: "thin rice-flour noodles used in spring rolls, salads, and soups.",
    status: "low",
    reasons: [],
  },
  "rice-paper": {
    description: "thin wrappers made from rice, used for summer rolls.",
    status: "low",
    reasons: [],
  },
  "rice-cake": {
    description: "puffed cakes made from rice, eaten plain or topped.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 2–4 plain cakes / about 28 g low; 5 cakes / 35 g moderate and 7 cakes / 49 g high",
  },
  "rice-flour": {
    description: "finely ground raw rice used in gluten-free baking and batters.",
    status: "low",
    reasons: [],
  },
  "sweet-rice-flour": {
    description: "glutinous rice flour used for mochi, dumplings, and chewy baking.",
    status: "low",
    reasons: [],
  },
  "puffed-rice": {
    description: "air-puffed rice grains used as cereal or in snacks.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about ½ cup / 15–29 g low; 1 cup / 30 g moderate",
  },
  "rice-cereal": {
    description: "puffed toasted rice breakfast cereal such as rice crispies.",
    status: "low",
    reasons: [],
  },
  cornmeal: {
    description: "coarsely ground dried corn used for baking, breading, and porridge.",
    status: "low",
    reasons: [],
  },
  polenta: {
    description: "cooked cornmeal porridge or firm cooked cornmeal served as a side.",
    status: "low",
    reasons: [],
  },
  grits: {
    description: "coarsely ground corn cooked as a hot breakfast or side.",
    status: "low",
    reasons: [],
  },
  "masa-harina": {
    description: "nixtamalized corn flour used for tortillas and tamales.",
    status: "low",
    reasons: [],
  },
  "corn-tortilla": {
    description: "thin flatbreads made from masa or corn flour.",
    status: "low",
    reasons: [],
  },
  "taco-shell": {
    description: "crisp fried or baked corn tortillas shaped for tacos.",
    status: "low",
    reasons: [],
  },
  tostada: {
    description: "crisp flat corn tortillas used as a base for toppings.",
    status: "low",
    reasons: [],
  },
  "tortilla-chips": {
    description: "fried or baked corn-tortilla triangles, usually salted.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 50 g low; 250 g high",
  },
  "corn-chips": {
    description: "extruded or fried corn snacks, often thicker than tortilla chips.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 50 g low; 250 g high",
  },
  "popcorn-kernels": {
    description: "dried popping corn, air- or oil-popped as a snack.",
    status: "low",
    reasons: [],
  },
  cornstarch: {
    description: "refined maize starch used to thicken sauces and baking.",
    status: "low",
    reasons: [],
  },
  quinoa: {
    description: "cooked pseudo-grain used as a side, salad base, or porridge.",
    status: "low",
    reasons: [],
  },
  millet: {
    description: "small gluten-free grain cooked as porridge, pilaf, or a side.",
    status: "low",
    reasons: [],
  },
  buckwheat: {
    description: "hulled buckwheat kernels cooked as porridge or a side.",
    status: "low",
    reasons: [],
  },
  "buckwheat-flour": {
    description: "flour milled from buckwheat, used in pancakes and baking.",
    status: "low",
    reasons: [],
  },
  amaranth: {
    description:
      "tiny pseudo-grain used puffed as cereal or cooked as porridge; also milled to flour.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans and GOS; puffed about ⅓ cup / 17 g low; ¾ cup / 30 g high; amaranth flour high at typical baking serves",
  },
  teff: {
    description: "tiny gluten-free grain or flour used for porridge, baking, and injera.",
    status: "low",
    reasons: [],
  },
  sorghum: {
    description: "gluten-free grain or flour used in porridge and baking blends.",
    status: "low",
    reasons: [],
  },
  fonio: {
    description: "tiny West African millet-like grain cooked as a couscous-style side.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (check blend for inulin, chicory, bean flours; no Monash lab test found)",
  },
  "gf-oats": {
    description: "whole or rolled oats processed to avoid wheat contamination.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; rolled about 52 g / ½ cup uncooked low; larger serves high",
  },
  "gf-oat-flour": {
    description: "oats ground to flour and labeled gluten-free.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about 60–100 g low depending on source; larger serves high",
  },
  "steel-cut-oats-gf": {
    description: "chopped oat groats processed to avoid wheat contamination.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about ¼ cup / 40–60 g uncooked low; larger serves high",
  },
  "gf-flour": {
    description: "commercial mix of rice, starches, and other gluten-free flours.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (check blend for inulin, chicory, bean flours; rice–potato–tapioca blends about ⅔ cup / 100 g low)",
  },
  "almond-flour": {
    description: "finely ground almonds used in grain-free baking.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; ¼ cup / 24 g low; ½ cup / 48 g high",
  },
  "coconut-flour": {
    description: "dried coconut meat ground to a high-fiber baking flour.",
    status: "high",
    reasons: ["fructans", "gos", "sorbitol"],
    note: "sorbitol, GOS, and fructans; about 3 tablespoons already high",
  },
  "tapioca-starch": {
    description: "cassava starch used to thicken and add chew in gluten-free baking.",
    status: "low",
    reasons: [],
  },
  "potato-starch": {
    description: "refined potato starch used to thicken and lighten gluten-free baking.",
    status: "low",
    reasons: [],
  },
  arrowroot: {
    description: "tropical tuber starch used as a thickener and in gluten-free blends.",
    status: "low",
    reasons: [],
  },
  "cassava-flour": {
    description: "whole cassava root dried and milled, used in gluten-free baking.",
    status: "low",
    reasons: [],
  },
  "chickpea-flour": {
    description: "ground dried chickpeas (besan/gram) used for socca, pakoras, and batters.",
    status: "high",
    reasons: ["gos"],
    note: "GOS; small spoonfuls may be tolerated, typical flatbread or batter serves high",
  },
  "gf-pasta": {
    description: "pasta made from rice, corn, quinoa, or other gluten-free flours.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (rice, corn, or quinoa pasta about 1 cup cooked low; check blend for inulin, chicory, bean flours)",
  },
  "gf-bread": {
    description: "yeasted or quick loaf made without wheat, rye, or barley.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (plain rice-based loaves often 2 slices low; check blend for inulin, chicory, bean flours)",
  },
  "gf-breadcrumbs": {
    description: "dried crumbs from gluten-free bread, used for coating or topping.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (check blend for inulin, chicory, bean flours)",
  },
  "gf-crackers": {
    description: "crisp snacks made from rice, corn, or other gluten-free flours.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (plain rice or corn crackers often a small handful low; check blend for inulin, chicory, bean flours)",
  },
  "gf-pretzels": {
    description: "baked pretzel snacks made from rice, corn, or other gluten-free flours.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (rice or corn pretzels often about ½ cup low; check blend for inulin, chicory, bean flours)",
  },
  "glass-noodles": {
    description:
      "translucent noodles usually made from mung-bean, sweet-potato, or tapioca starch.",
    status: "low",
    reasons: [],
  },
  "shirataki-noodles": {
    description: "konjac-yam noodles packed in water, very low in digestible carbohydrate.",
    status: "low",
    reasons: [],
  },
  "sourdough-bread": {
    description: "long-fermented loaf made with a wild yeast and bacteria starter.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; traditional long-ferment wheat or spelt 1–2 slices low; quick or flavored “sourdough” high",
  },
  "wheat-flour": {
    description: "refined wheat flour used for general baking and thickening.",
    status: "high",
    reasons: ["fructans"],
  },
  "bread-flour": {
    description: "higher-protein wheat flour used for yeasted breads.",
    status: "high",
    reasons: ["fructans"],
  },
  "whole-wheat-flour": {
    description: "whole-grain wheat flour used for breads and baking.",
    status: "high",
    reasons: ["fructans"],
  },
  "cake-flour": {
    description: "finely milled low-protein wheat flour used for cakes.",
    status: "high",
    reasons: ["fructans"],
  },
  "self-rising-flour": {
    description: "wheat flour with added baking powder and salt.",
    status: "high",
    reasons: ["fructans"],
  },
  semolina: {
    description: "coarse durum-wheat meal used for pasta, couscous, and puddings.",
    status: "high",
    reasons: ["fructans"],
  },
  "durum-flour": {
    description: "finely milled durum wheat used for pasta and some breads.",
    status: "high",
    reasons: ["fructans"],
  },
  "wheat-bread": {
    description: "yeasted loaf made from wheat flour.",
    status: "high",
    reasons: ["fructans"],
  },
  "white-bread": {
    description: "yeasted loaf made from refined wheat flour.",
    status: "high",
    reasons: ["fructans"],
  },
  "wheat-pasta": {
    description: "dried noodles made from wheat or semolina.",
    status: "high",
    reasons: ["fructans"],
  },
  spaghetti: {
    description: "long thin wheat-pasta strands.",
    status: "high",
    reasons: ["fructans"],
  },
  penne: { description: "short ridged wheat-pasta tubes.", status: "high", reasons: ["fructans"] },
  macaroni: {
    description: "small curved wheat-pasta elbows.",
    status: "high",
    reasons: ["fructans"],
  },
  "lasagna-noodles": {
    description: "wide flat wheat-pasta sheets.",
    status: "high",
    reasons: ["fructans"],
  },
  orzo: {
    description: "rice-shaped wheat pasta used in soups and salads.",
    status: "high",
    reasons: ["fructans"],
  },
  couscous: {
    description: "tiny steamed pellets of durum semolina.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about ½ cup / 75 g cooked low; larger plate serves high",
  },
  "israeli-couscous": {
    description: "larger toasted wheat pearls, also called pearl couscous.",
    status: "high",
    reasons: ["fructans"],
  },
  bulgur: {
    description: "parboiled cracked wheat used in tabbouleh and pilafs.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about ¼ cup / 44 g cooked low; 1 cup high",
  },
  freekeh: {
    description: "roasted green wheat berries used as a pilaf or side.",
    status: "high",
    reasons: ["fructans"],
  },
  farro: {
    description: "cooked emmer or related wheat berries used as a side or in salads.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about ⅓ cup / 60 g cooked low; typical ½–1 cup high",
  },
  spelt: {
    description: "ancient wheat grain or flour used in breads, pasta, and baking.",
    status: "high",
    reasons: ["fructans"],
  },
  einkorn: {
    description: "ancient wheat grain or flour used in baking.",
    status: "high",
    reasons: ["fructans"],
  },
  kamut: {
    description: "Khorasan wheat grain or flour used as a side or in baking.",
    status: "high",
    reasons: ["fructans"],
  },
  barley: {
    description: "chewy cereal grain used in soups, stews, and sides.",
    status: "high",
    reasons: ["fructans"],
  },
  "pearl-barley": {
    description: "polished barley grains used in soups and risottos.",
    status: "high",
    reasons: ["fructans"],
  },
  "rye-flour": {
    description: "flour milled from rye, used for dense breads.",
    status: "high",
    reasons: ["fructans"],
  },
  "rye-bread": {
    description: "yeasted or sourdough loaf made from rye flour.",
    status: "high",
    reasons: ["fructans"],
  },
  pumpernickel: {
    description: "dark dense rye bread, often molasses-sweetened.",
    status: "high",
    reasons: ["fructans"],
  },
  oats: {
    description: "whole oat grain used as porridge, baking, or muesli.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about ½ cup / 52 g rolled uncooked low; ¾ cup / 78 g high",
  },
  "rolled-oats": {
    description: "steamed and flattened oat flakes used for oatmeal and baking.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about ½ cup / 52–65 g uncooked low; larger serves high",
  },
  "steel-cut-oats": {
    description: "chopped oat groats cooked as a chewy porridge.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about ¼ cup / 40–60 g uncooked low; larger serves high",
  },
  "instant-oats": {
    description: "finely cut quick-cooking oats, often sold in packets.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; generic quick oats about 23 g low; many instant packets 28–35 g low; larger serves high",
  },
  "oat-flour": {
    description: "oats ground to flour for baking.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about 60–100 g low depending on source; larger serves high",
  },
  "flour-tortilla": {
    description: "soft wheat-flour wraps used for burritos and quesadillas.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 small / about 35 g low; 1½ tortillas / 50 g or burrito-size high",
  },
  pita: {
    description: "pocketed wheat flatbread used for sandwiches and dips.",
    status: "high",
    reasons: ["fructans"],
  },
  naan: {
    description: "leavened wheat flatbread, often yogurt-enriched.",
    status: "high",
    reasons: ["fructans"],
  },
  roti: {
    description: "unleavened whole-wheat flatbread cooked on a griddle.",
    status: "high",
    reasons: ["fructans"],
  },
  "chapati-flour": {
    description: "finely milled whole-wheat atta used for roti and chapati.",
    status: "high",
    reasons: ["fructans"],
  },
  bagel: {
    description: "dense boiled-then-baked wheat ring.",
    status: "high",
    reasons: ["fructans"],
  },
  "english-muffin": {
    description: "griddled yeasted wheat muffin split and toasted.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 muffin / about 67 g low; more than one high",
  },
  "hamburger-bun": {
    description: "soft wheat rolls used for burgers.",
    status: "high",
    reasons: ["fructans"],
  },
  "hot-dog-bun": {
    description: "soft split wheat rolls used for frankfurters.",
    status: "high",
    reasons: ["fructans"],
  },
  breadcrumbs: {
    description: "dried ground wheat bread used for coating and topping.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; a typical coating handful low; large cups high",
  },
  panko: {
    description: "coarse Japanese-style wheat breadcrumbs used for frying.",
    status: "low",
    reasons: [],
  },
  crackers: {
    description: "thin baked wheat snacks, often salted.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about 2 plain biscuits low; larger handfuls high",
  },
  saltines: {
    description: "thin salted wheat soda crackers.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; a few crackers low; larger serves high",
  },
  "graham-crackers": {
    description: "sweet whole-wheat crackers, often honey-sweetened.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans; honey if used",
  },
  pretzels: {
    description: "baked wheat twists or sticks, usually salted.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; about ½ cup / 24–30 g low; 1 cup high",
  },
  cereal: {
    description: "ready-to-eat boxed cereal, grain and sweetener vary by brand.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (oats, corn flakes, or rice crisps in tested serves low; wheat, honey, inulin, or dried fruit high)",
  },
  granola: {
    description: "baked clusters of oats, nuts, and sweetener.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (plain oats and maple in a small serve low; honey, wheat, dried fruit, or inulin high)",
  },
  muesli: {
    description: "raw or toasted mix of oats, grains, nuts, and often dried fruit.",
    status: "depends",
    reasons: [],
    note: "/ ingredients (plain oats about ¼–½ cup low; wheat or dried-fruit muesli high)",
  },
  udon: {
    description: "thick fresh or dried Japanese wheat noodles.",
    status: "high",
    reasons: ["fructans"],
  },
  "ramen-noodles": {
    description: "wavy alkaline wheat noodles used in ramen soup.",
    status: "high",
    reasons: ["fructans"],
  },
  soba: {
    description: "Japanese noodles made from buckwheat, often blended with wheat.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; ⅓ cup / 90 g cooked low for typical wheat-and-buckwheat soba; larger bowls high",
  },
  "egg-noodles": {
    description: "wheat pasta enriched with egg, used in soups and casseroles.",
    status: "high",
    reasons: ["fructans"],
  },
  "wonton-wrappers": {
    description: "thin wheat-dough squares used for wontons.",
    status: "high",
    reasons: ["fructans"],
  },
  "egg-roll-wrappers": {
    description: "larger thin wheat-dough sheets used for egg rolls.",
    status: "high",
    reasons: ["fructans"],
  },
  "dumpling-wrappers": {
    description: "round wheat-dough skins used for potstickers and dumplings.",
    status: "high",
    reasons: ["fructans"],
  },
  phyllo: {
    description: "paper-thin wheat pastry sheets used for pies and pastries.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 sheet low; stacked pastries high",
  },
  "puff-pastry": {
    description: "laminated wheat pastry used for pies, turnovers, and tarts.",
    status: "high",
    reasons: ["fructans"],
  },
  "pie-crust": {
    description: "wheat-flour pastry shell for sweet or savory pies.",
    status: "high",
    reasons: ["fructans"],
  },
  "pizza-dough": {
    description: "yeasted wheat dough stretched for pizza.",
    status: "high",
    reasons: ["fructans"],
  },
  "pizza-crust": {
    description: "baked wheat pizza base, thin or thick.",
    status: "high",
    reasons: ["fructans"],
  },
  "crescent-roll-dough": {
    description: "refrigerated wheat pastry rolled into crescents.",
    status: "high",
    reasons: ["fructans"],
  },
  "biscuit-dough": {
    description: "wheat dough for drop or cut biscuits, often refrigerated.",
    status: "high",
    reasons: ["fructans"],
  },
  "pancake-mix": {
    description: "packaged wheat (or mixed) flour blend for pancakes.",
    status: "high",
    reasons: ["fructans"],
  },
  "cake-mix": {
    description: "packaged wheat cake batter mix, often with added fibers or sugars.",
    status: "high",
    reasons: ["fructans"],
  },
  "stuffing-mix": {
    description: "dried seasoned wheat-bread cubes for poultry stuffing.",
    status: "high",
    reasons: ["fructans"],
  },
  croutons: {
    description: "toasted seasoned cubes of wheat bread for salads and soups.",
    status: "high",
    reasons: ["fructans"],
  },
  matzo: {
    description: "unleavened wheat cracker bread used at Passover.",
    status: "high",
    reasons: ["fructans"],
  },
  injera: {
    description: "spongy fermented flatbread, traditionally 100% teff.",
    status: "depends",
    reasons: ["fructans"],
    note: "/ ingredients (teff itself low; restaurant injera often cut with wheat or barley and then high in fructans)",
  },
  "chicken-breast": {
    description: "lean poultry cut grilled, baked, or poached.",
    status: "low",
    reasons: [],
  },
  "chicken-thigh": {
    description: "darker poultry cut roasted, grilled, or braised.",
    status: "low",
    reasons: [],
  },
  "chicken-wing": {
    description: "poultry wing sections fried, baked, or grilled.",
    status: "low",
    reasons: [],
  },
  "chicken-drumstick": {
    description: "poultry leg portions roasted or grilled.",
    status: "low",
    reasons: [],
  },
  "whole-chicken": {
    description: "entire bird roasted or poached, unseasoned.",
    status: "low",
    reasons: [],
  },
  "ground-chicken": {
    description: "minced chicken used in patties, meatballs, or sauces.",
    status: "low",
    reasons: [],
  },
  "rotisserie-chicken": {
    description: "supermarket or deli roast chicken, usually seasoned.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic rubs or marinades, unless a plain unseasoned bird",
  },
  "ground-turkey": {
    description: "minced turkey used in burgers, chili, or meatballs.",
    status: "low",
    reasons: [],
  },
  "turkey-breast": {
    description: "lean turkey cut roasted or sliced from a plain roast.",
    status: "low",
    reasons: [],
  },
  "whole-turkey": {
    description: "entire bird roasted without a high-FODMAP stuffing or glaze.",
    status: "low",
    reasons: [],
  },
  "turkey-slices": {
    description: "deli or packaged turkey slices.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic seasoning, unless a plain salt-only roast turkey",
  },
  "duck-breast": {
    description: "rich poultry breast seared or roasted.",
    status: "low",
    reasons: [],
  },
  "whole-duck": {
    description: "entire duck roasted without a sweet glaze or stuffing.",
    status: "low",
    reasons: [],
  },
  "ground-beef": {
    description: "minced beef used in burgers, meatballs, or sauces.",
    status: "low",
    reasons: [],
  },
  "beef-steak": {
    description: "steakhouse cuts grilled or pan-seared.",
    status: "low",
    reasons: [],
  },
  "beef-roast": {
    description: "larger beef cut oven-roasted or pot-roasted.",
    status: "low",
    reasons: [],
  },
  "beef-brisket": { description: "slow-cooked beef cut, unsauced.", status: "low", reasons: [] },
  "beef-ribs": {
    description: "short ribs or back ribs braised or smoked, unsauced.",
    status: "low",
    reasons: [],
  },
  "stew-beef": { description: "cubed beef for stews and braises.", status: "low", reasons: [] },
  "beef-liver": { description: "organ meat pan-fried or braised.", status: "low", reasons: [] },
  "corned-beef": {
    description: "salt-cured brisket, often sold with a spice packet.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in many pickling spices, unless a plain salt-brined product",
  },
  pastrami: {
    description: "smoked, spice-rubbed cured beef.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in the typical spice rub, unless a plain salt-and-pepper version",
  },
  "roast-beef-slices": {
    description: "deli or packaged roast beef slices.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic seasoning, unless plain unseasoned roast beef",
  },
  "ground-pork": {
    description: "minced pork used in patties, dumplings, or sauces.",
    status: "low",
    reasons: [],
  },
  "pork-chop": {
    description: "loin or rib chops grilled, fried, or baked.",
    status: "low",
    reasons: [],
  },
  "pork-shoulder": {
    description: "picnic or Boston butt used for pulled pork or stews.",
    status: "low",
    reasons: [],
  },
  "pork-tenderloin": {
    description: "lean pork loin roast, unmarinated.",
    status: "low",
    reasons: [],
  },
  "pork-ribs": { description: "spare ribs or baby backs, unsauced.", status: "low", reasons: [] },
  ham: {
    description: "cured pork leg, whole or spiral-sliced.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from onion and garlic, or excess fructose from honey glaze, unless a plain salt-cured ham",
  },
  "deli-ham": {
    description: "deli or packaged ham slices.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from onion and garlic, or excess fructose from honey, unless a plain salt-cured ham",
  },
  prosciutto: {
    description: "dry-cured Italian ham, typically pork and salt.",
    status: "low",
    reasons: [],
  },
  pancetta: {
    description: "Italian cured pork belly, often just pork, salt, and pepper.",
    status: "low",
    reasons: [],
  },
  guanciale: {
    description: "cured pork jowl used in Italian cooking.",
    status: "low",
    reasons: [],
  },
  bacon: { description: "cured pork belly strips, plain smoked.", status: "low", reasons: [] },
  "canadian-bacon": {
    description: "lean back bacon or peameal-style pork loin.",
    status: "low",
    reasons: [],
  },
  "lamb-chop": {
    description: "rib or loin chops grilled or pan-seared.",
    status: "low",
    reasons: [],
  },
  "ground-lamb": {
    description: "minced lamb used in patties, kefta, or sauces.",
    status: "low",
    reasons: [],
  },
  "lamb-shoulder": { description: "shoulder cut roasted or braised.", status: "low", reasons: [] },
  "leg-of-lamb": { description: "whole or butterflied leg roasted.", status: "low", reasons: [] },
  bison: { description: "lean game red meat, steaks or ground.", status: "low", reasons: [] },
  venison: { description: "deer meat, steaks, roast, or ground.", status: "low", reasons: [] },
  "goat-meat": {
    description: "chevon used in stews, curries, or grilled cuts.",
    status: "low",
    reasons: [],
  },
  rabbit: { description: "lean game meat roasted or stewed.", status: "low", reasons: [] },
  veal: { description: "young beef cuts, chops, or stew meat.", status: "low", reasons: [] },
  "italian-sausage": {
    description: "seasoned pork sausage, typically fennel and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  "breakfast-sausage": {
    description: "seasoned pork or turkey sausage links or patties.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic, unless a plain herb-only brand",
  },
  chorizo: {
    description: "Spanish or Mexican seasoned pork sausage.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  andouille: {
    description: "smoked Cajun-style pork sausage.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  kielbasa: {
    description: "smoked Polish-style sausage.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  bratwurst: {
    description: "German-style fresh sausage, often with onion or wheat rusk.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion, garlic, and sometimes wheat fillers",
  },
  "hot-dog": {
    description: "frankfurters or wieners.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic, unless a plain meat-and-salt brand",
  },
  salami: {
    description: "dry-cured sausage, often garlic-seasoned.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  pepperoni: {
    description: "spicy dry-cured sausage used on pizza.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  mortadella: {
    description: "Italian cooked sausage, sometimes with pistachios.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "fructans from garlic; GOS and fructans if pistachios are included",
  },
  "chicken-sausage": {
    description: "poultry sausage links, usually pre-seasoned.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic, unless a plain herb-only brand",
  },
  egg: { description: "whole chicken eggs, boiled, fried, or baked.", status: "low", reasons: [] },
  "egg-white": { description: "albumen used in omelets or baking.", status: "low", reasons: [] },
  "egg-yolk": {
    description: "yolks used in sauces, custards, or baking.",
    status: "low",
    reasons: [],
  },
  "quail-egg": { description: "small whole eggs, boiled or fried.", status: "low", reasons: [] },
  "duck-egg": {
    description: "larger whole eggs used like chicken eggs.",
    status: "low",
    reasons: [],
  },
  salmon: {
    description: "fresh salmon fillet grilled, baked, or poached.",
    status: "low",
    reasons: [],
  },
  "smoked-salmon": {
    description: "cold- or hot-smoked salmon, plain.",
    status: "low",
    reasons: [],
  },
  "white-fish": {
    description: "generic mild white fish, baked or pan-fried.",
    status: "low",
    reasons: [],
  },
  cod: { description: "lean white fish fillet.", status: "low", reasons: [] },
  tilapia: { description: "mild farmed white fish fillet.", status: "low", reasons: [] },
  halibut: { description: "firm white fish steak or fillet.", status: "low", reasons: [] },
  "mahi-mahi": { description: "firm tropical fish fillet.", status: "low", reasons: [] },
  trout: { description: "freshwater trout, pan-fried or baked.", status: "low", reasons: [] },
  "tuna-steak": { description: "fresh tuna grilled or seared.", status: "low", reasons: [] },
  "canned-tuna": {
    description: "tuna packed in water or oil, unflavored.",
    status: "low",
    reasons: [],
  },
  "canned-salmon": {
    description: "salmon packed in water or oil, unflavored.",
    status: "low",
    reasons: [],
  },
  sardines: {
    description: "small oily fish, fresh or canned in oil or water.",
    status: "low",
    reasons: [],
  },
  anchovies: { description: "salt-cured small fish used for flavor.", status: "low", reasons: [] },
  mackerel: {
    description: "oily fish, fresh or canned in oil or water.",
    status: "low",
    reasons: [],
  },
  shrimp: {
    description: "peeled shrimp, boiled, grilled, or sautéed.",
    status: "low",
    reasons: [],
  },
  prawns: { description: "large shrimp, grilled or sautéed.", status: "low", reasons: [] },
  crab: { description: "real crab meat, steamed or picked.", status: "low", reasons: [] },
  lobster: {
    description: "lobster tail or claw meat, boiled or grilled.",
    status: "low",
    reasons: [],
  },
  scallops: { description: "sea or bay scallops, seared or baked.", status: "low", reasons: [] },
  mussels: { description: "bivalves steamed or in a plain broth.", status: "low", reasons: [] },
  clams: {
    description: "hard- or soft-shell clams, steamed or chopped.",
    status: "low",
    reasons: [],
  },
  oysters: { description: "raw or cooked oysters.", status: "low", reasons: [] },
  calamari: {
    description: "squid rings or tubes, grilled or fried in a low-FODMAP batter.",
    status: "low",
    reasons: [],
  },
  octopus: { description: "tentacles grilled or braised.", status: "low", reasons: [] },
  crawfish: { description: "freshwater crayfish, boiled or peeled.", status: "low", reasons: [] },
  "imitation-crab": {
    description: "surimi sticks made from fish plus starch and sweeteners.",
    status: "high",
    reasons: ["fructans", "sorbitol"],
    note: "fructans from wheat starch; often sorbitol",
  },
  tofu: {
    description: "pressed soybean curd, drained, used in stir-fries.",
    status: "low",
    reasons: [],
  },
  "extra-firm-tofu": {
    description: "very well-pressed tofu, drained, used for baking or grilling.",
    status: "low",
    reasons: [],
  },
  "silken-tofu": {
    description: "unpressed soft tofu used in desserts, sauces, and scrambles.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans",
  },
  "smoked-tofu": {
    description: "firm tofu that has been smoked, unmarinated.",
    status: "low",
    reasons: [],
  },
  tempeh: { description: "fermented soybean cake, plain.", status: "low", reasons: [] },
  edamame: {
    description: "shelled immature green soybeans, fresh or frozen.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at ½ cup / 75–90 g shelled, moderate around 195–210 g",
  },
  seitan: {
    description: "wheat-gluten meat substitute.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans in larger amounts of vital wheat gluten — low at about 30 g; commercial seitan is High if it contains onion or garlic",
  },
  tvp: {
    description: "dried soy TVP used as a ground-meat substitute.",
    status: "high",
    reasons: ["gos"],
    note: "GOS; only about 2 g is low, and a typical ¾ cup / 75 g serve is high",
  },
  "pea-protein": {
    description: "isolated protein from yellow peas, used in powders and meat alternatives.",
    status: "low",
    reasons: [],
  },
  "soy-protein": {
    description: "soy protein isolate used in powders and soy milk.",
    status: "low",
    reasons: [],
  },
  "veggie-patty": {
    description: "commercial veggie or “impossible-style” burgers.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "fructans from onion and garlic; often GOS from pea or soy",
  },
  falafel: {
    description: "fried chickpea fritters, typically with onion and garlic.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "GOS from chickpeas; fructans from onion and garlic",
  },
  hummus: {
    description: "chickpea and tahini dip, usually garlic-seasoned.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans and GOS; commercial hummus is moderate at 1 Tbsp / 20 g and high at 2 Tbsp / 40 g",
  },
  "black-beans": {
    description: "common legume used in Mexican and Caribbean cooking.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; canned drained low at about 40 g / 2 Tbsp, moderate at 52 g, high at 210 g",
  },
  "pinto-beans": {
    description: "speckled beige beans used in Mexican cooking and refries.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; canned drained low at about 55 g, moderate at 64 g, high at 210 g",
  },
  "kidney-beans": {
    description: "red beans used in chili, salads, and rice and beans.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; canned drained low at about 86 g, moderate at 90 g, high at 103 g; boiled-from-dried low only around 17 g",
  },
  "navy-beans": {
    description: "small white beans used in soups and baked beans.",
    status: "high",
    reasons: ["gos"],
  },
  "cannellini-beans": {
    description: "large white Italian beans used in soups and salads.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; canned drained low at about 75 g, moderate at 89 g, high at 100 g",
  },
  "great-northern-beans": {
    description: "medium white beans used in soups and casseroles.",
    status: "high",
    reasons: ["gos"],
    note: "GOS; not separately lab-tested, treated like navy or haricot beans",
  },
  "lima-beans": {
    description: "butter beans, fresh, frozen, or canned.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; boiled low at about 39 g / ¼ cup, moderate at 54 g, high at 79 g; canned butter beans low at about 35 g",
  },
  "fava-beans": {
    description: "broad beans, fresh or dried.",
    status: "high",
    reasons: ["gos", "fructose"],
    note: "fructose and GOS",
  },
  "mung-beans": {
    description: "small green beans used in Asian cooking, whole or sprouted.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; boiled drained low at about 53 g / ¼ cup",
  },
  "adzuki-beans": {
    description: "small red beans used in East Asian cooking and sweets.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; canned drained low at about 38 g / 2 Tbsp, moderate at 50 g, high at 150 g",
  },
  "black-eyed-peas": {
    description: "cream-colored beans with a black hilum, used in Southern and African cooking.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; boiled drained low at about 21 g, moderate at 25 g, high at 170 g",
  },
  "pigeon-peas": {
    description: "tropical peas used in Caribbean, African, and Indian cooking (toor dal).",
    status: "high",
    reasons: ["gos"],
  },
  chickpeas: {
    description: "garbanzo beans used in salads, curries, and hummus.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; canned drained and rinsed low at about 42 g / ¼ cup, moderate at 84 g; boiled-from-dried low around 29 g",
  },
  soybeans: {
    description: "mature soybeans, boiled or roasted.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; boiled drained low around 31 g / about 2 Tbsp; typical serves are high",
  },
  "refried-beans": {
    description: "mashed pinto or black beans, canned or homemade.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS; plain canned refried low around 2 Tbsp / 34–56 g; larger scoops are high; onion or garlic versions are High for fructans",
  },
  "baked-beans": {
    description: "navy or haricot beans in sweet tomato sauce.",
    status: "high",
    reasons: ["fructans", "gos", "fructose"],
    note: "GOS plus fructans and excess fructose from onion, garlic, and sauce; only about 2 tsp / 16 g is low",
  },
  "red-lentils": {
    description: "hulled split lentils that cook down quickly for dal and soups.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; boiled-from-dried low at about 23 g, moderate at 46 g; canned drained low at about 46 g / ¼ cup",
  },
  "brown-lentils": {
    description: "common earthy lentils that hold their shape.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; canned drained low at about 46 g / ¼ cup; larger serves are moderate to high",
  },
  "green-lentils": {
    description: "firmer lentils used in salads and sides.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; boiled-from-dried low at about 29 g, moderate at 34 g; canned drained low at about 46 g / ¼ cup",
  },
  "black-lentils": {
    description: "beluga lentils used in salads and sides.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; not separately lab-tested, treat like boiled green or brown lentils, low around 23–29 g cooked",
  },
  "yellow-lentils": {
    description: "hulled yellow lentils used in dal.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; not separately lab-tested, treat like red lentils, boiled low around 23 g",
  },
  "split-peas": {
    description: "dried split green peas used in soup.",
    status: "high",
    reasons: ["gos"],
    note: "GOS; only about 13 g is low",
  },
  "yellow-split-peas": {
    description: "dried split yellow peas used in soup and dal.",
    status: "high",
    reasons: ["gos"],
  },
  "green-peas": {
    description: "garden peas, fresh, frozen, or canned.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; low at ¼ cup / 23 g, moderate at ½ cup / 46 g, high at 1 cup / 92 g",
  },
  "olive-oil": {
    description: "common cooking and salad oil pressed from olives.",
    status: "low",
    reasons: [],
  },
  "extra-virgin-olive-oil": {
    description:
      "unrefined olive oil with a stronger fruit flavor, used for cooking and finishing.",
    status: "low",
    reasons: [],
  },
  "vegetable-oil": {
    description: "neutral blended cooking oil, often soybean or similar seed oils.",
    status: "low",
    reasons: [],
  },
  "canola-oil": {
    description: "mild rapeseed oil used for frying, baking, and dressings.",
    status: "low",
    reasons: [],
  },
  "sunflower-oil": {
    description: "light seed oil used for sauteing, frying, and baking.",
    status: "low",
    reasons: [],
  },
  "safflower-oil": {
    description: "high-smoke-point seed oil used for frying and baking.",
    status: "low",
    reasons: [],
  },
  "grapeseed-oil": {
    description: "mild oil pressed from grape seeds, used for cooking and dressings.",
    status: "low",
    reasons: [],
  },
  "avocado-oil": {
    description: "buttery oil pressed from avocados, used for high-heat cooking and dressings.",
    status: "low",
    reasons: [],
  },
  "coconut-oil": {
    description: "solid-at-room-temperature tropical fat used for cooking, baking, and frying.",
    status: "low",
    reasons: [],
  },
  "sesame-oil": {
    description: "pale seed oil used in cooking and dressings.",
    status: "low",
    reasons: [],
  },
  "toasted-sesame-oil": {
    description: "dark, nutty finishing oil pressed from roasted sesame seeds.",
    status: "low",
    reasons: [],
  },
  "peanut-oil": {
    description: "nutty oil used for frying and stir-fries.",
    status: "low",
    reasons: [],
  },
  "corn-oil": {
    description: "mild oil pressed from corn germ, used for frying and baking.",
    status: "low",
    reasons: [],
  },
  "walnut-oil": {
    description: "fragrant nut oil used mainly as a salad and finishing oil.",
    status: "low",
    reasons: [],
  },
  "chili-oil": {
    description:
      "spicy condiment of dried chiles steeped in oil, sometimes with garlic or crisp solids.",
    status: "depends",
    reasons: ["fructans"],
    note: "chile and oil are low Fodmap; garlic solids add fructans, so oils with garlic pieces or chili crisp with garlic are high",
  },
  "mustard-oil": {
    description: "pungent oil pressed from mustard seeds, used in South Asian cooking.",
    status: "low",
    reasons: [],
  },
  "palm-oil": {
    description: "semi-solid tropical fat used in baking, frying, and processed foods.",
    status: "low",
    reasons: [],
  },
  shortening: {
    description: "solid hydrogenated or palm-based fat used in pie crusts and baking.",
    status: "low",
    reasons: [],
  },
  "cooking-spray": {
    description: "aerosol oil used to grease pans; flavored sprays may include garlic or onion.",
    status: "low",
    reasons: [],
  },
  lard: {
    description: "rendered pork fat used for frying, biscuits, and pastry.",
    status: "low",
    reasons: [],
  },
  tallow: {
    description: "rendered beef fat used for frying and roasting.",
    status: "low",
    reasons: [],
  },
  "duck-fat": {
    description: "rendered duck fat used for roasting potatoes and sauteing.",
    status: "low",
    reasons: [],
  },
  schmaltz: {
    description: "rendered chicken or goose fat used in cooking and spreads.",
    status: "low",
    reasons: [],
  },
  "bacon-grease": {
    description: "fat rendered from cooked bacon, used for frying and flavoring.",
    status: "low",
    reasons: [],
  },
  suet: {
    description: "hard fat from around beef or mutton kidneys, used in pastry and puddings.",
    status: "low",
    reasons: [],
  },
  mayonnaise: {
    description: "emulsified sauce of oil, egg, and vinegar used as a spread and dressing.",
    status: "low",
    reasons: [],
  },
  "avocado-mayo": {
    description: "mayonnaise made with avocado oil instead of soybean or canola oil.",
    status: "low",
    reasons: [],
  },
  "almond-butter": {
    description: "spread of ground almonds, sometimes with salt or oil.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; 1 tbsp / 20 g low, 2 tbsp / 32 g moderate to high",
  },
  "peanut-butter": {
    description: "spread of ground peanuts, often with salt, oil, or sugar.",
    status: "low",
    reasons: [],
  },
  "cashew-butter": {
    description: "creamy spread of ground cashews.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; about 2 tsp / 10 g low, 1 tbsp / 20 g high",
  },
  "sunflower-butter": {
    description: "spread of ground sunflower seeds, used as a nut-free alternative.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; sunflower seeds are low at 2 tsp hulled; butter is untested, so keep to about 1 tbsp",
  },
  tahini: {
    description: "sesame-seed paste used in hummus, dressings, and sauces.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 tbsp / 20 g low; larger servings are not given a green light",
  },
  "coconut-butter": {
    description: "creamy spread of ground coconut flesh, not the same as coconut oil.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "FODMAP Friendly about 34 g low, up to about 76 g; shredded coconut is high in sorbitol at 1 cup / 96 g",
  },
  "walnut-butter": {
    description: "spread of ground walnuts.",
    status: "depends",
    reasons: ["fructans"],
    note: "walnuts are low at 10 halves / 30 g and high in fructans at 35 halves / 135 g; keep butter to about 1–2 tbsp",
  },
  "garlic-infused-oil": {
    description: "cooking oil flavored with garlic, low if garlic solids are strained out.",
    status: "low",
    reasons: [],
  },
  "white-sugar": {
    description: "refined sucrose used in baking, drinks, and preserving.",
    status: "low",
    reasons: [],
  },
  "brown-sugar": {
    description: "sucrose with molasses, used in baking and sauces.",
    status: "low",
    reasons: [],
  },
  "light-brown-sugar": {
    description: "milder molasses-coated sucrose used in cookies and baking.",
    status: "low",
    reasons: [],
  },
  "dark-brown-sugar": {
    description: "stronger molasses-coated sucrose used in gingerbread and barbecue.",
    status: "low",
    reasons: [],
  },
  "powdered-sugar": {
    description: "finely milled sucrose with a little cornstarch, used in icing and dusting.",
    status: "low",
    reasons: [],
  },
  "raw-sugar": {
    description: "partially refined beige cane sugar used like table sugar.",
    status: "low",
    reasons: [],
  },
  turbinado: {
    description: "coarse, lightly processed cane crystals used in baking and coffee.",
    status: "low",
    reasons: [],
  },
  demerara: {
    description: "large golden cane crystals used for topping baked goods.",
    status: "low",
    reasons: [],
  },
  "coconut-sugar": {
    description: "granules from coconut-palm sap, used as a brown-sugar substitute.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 tsp / 4 g low, 1 tbsp / 12 g high",
  },
  "date-sugar": {
    description: "dried dates ground into granules, used as a whole-fruit sweetener.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "fructans and sorbitol from dates; dates are low at 5 small dried / 30 g or 1 Medjool / 20 g; sugar is untested and more concentrated",
  },
  jaggery: {
    description: "unrefined cane or palm sugar sold in blocks, used in South Asian sweets.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1/2 tbsp / 12 g low, 24 g high",
  },
  "palm-sugar": {
    description: "sap sugar from date or sugar palms, used in Southeast Asian cooking.",
    status: "low",
    reasons: [],
  },
  honey: {
    description: "floral sweetener used in baking, tea, and glazes.",
    status: "high",
    reasons: ["fructose"],
  },
  honeycomb: {
    description: "chewy beeswax comb filled with honey, eaten as a sweet or spread.",
    status: "high",
    reasons: ["fructose"],
  },
  "maple-syrup": {
    description: "boiled maple sap used on pancakes and in baking.",
    status: "low",
    reasons: [],
  },
  "pancake-syrup": {
    description: "table syrup, often maple-flavored and sweetened with corn syrup or HFCS.",
    status: "depends",
    reasons: ["fructose"],
    note: "pure maple is low at 2 tbsp / 50 g; HFCS versions are high in excess fructose",
  },
  molasses: {
    description: "dark cane syrup used in gingerbread, baked beans, and barbecue.",
    status: "high",
    reasons: ["fructose"],
  },
  agave: {
    description: "thin cactus-sap syrup used as a honey substitute.",
    status: "high",
    reasons: ["fructose"],
  },
  "corn-syrup": {
    description: "glucose syrup used to keep candies and frostings smooth.",
    status: "low",
    reasons: [],
  },
  hfcs: {
    description: "fructose-enriched corn sweetener used in sodas, syrups, and processed foods.",
    status: "high",
    reasons: ["fructose"],
  },
  "rice-syrup": {
    description: "thick rice-malt sweetener used as a honey substitute.",
    status: "low",
    reasons: [],
  },
  "golden-syrup": {
    description: "light inverted cane syrup used in treacle tarts and baking.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; 1 tsp / 7 g low, about 1 tbsp / 15 g high",
  },
  "date-syrup": {
    description: "thick syrup reduced from dates, used in baking and drizzling.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "fructans and sorbitol; untested concentrate of dates, which are low at 5 small dried / 30 g or 1 Medjool / 20 g and high in larger serves",
  },
  "pomegranate-molasses": {
    description: "tart reduced pomegranate juice used in marinades and dressings.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; pomegranate juice is low at 100 ml, but this syrup is untested and more concentrated",
  },
  stevia: {
    description: "zero-calorie leaf extract used to sweeten drinks and baking.",
    status: "depends",
    reasons: ["fructans"],
    note: "pure stevia 2 tsp / 5 g low; blends with inulin, FOS, or polyols are high",
  },
  erythritol: {
    description: "bulk sugar-alcohol sweetener used in sugar-free baking and drinks.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "polyol; mostly absorbed before the colon and often better tolerated than sorbitol or xylitol, but Monash lists erythritol among FODMAP polyols",
  },
  "monk-fruit": {
    description: "extract of luo han guo, often blended with erythritol or inulin for bulk.",
    status: "depends",
    reasons: ["fructans"],
    note: "pure extract is considered low; blends with inulin or polyols can be high",
  },
  allulose: {
    description: "rare sugar used as a 1:1 sugar substitute in baking.",
    status: "low",
    reasons: [],
  },
  sucralose: {
    description: "zero-calorie sweetener sold as Splenda, used in drinks and baking.",
    status: "low",
    reasons: [],
  },
  "chocolate-chips": {
    description: "baking morsels, usually semi-sweet, milk, or dark.",
    status: "depends",
    reasons: ["lactose"],
    note: "dark chips about 30 g low; milk chips limited by lactose at about 20 g; sugar-free chips with polyols are high",
  },
  "dark-chocolate": {
    description: "high-cacao chocolate used for eating and baking.",
    status: "depends",
    reasons: ["fructans", "lactose"],
    note: "30 g low; 85% cacao 20 g low; about 80 g moderate lactose if dairy is present, 125 g high in lactose and fructans",
  },
  "milk-chocolate": {
    description: "sweeter chocolate made with milk solids.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; about 20 g / 4 squares low, larger serves high",
  },
  "white-chocolate": {
    description: "cocoa-butter confection with sugar and milk solids, no cocoa mass.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose; 25 g low, larger serves high",
  },
  "cocoa-powder": {
    description: "natural cocoa used in baking and hot chocolate.",
    status: "low",
    reasons: [],
  },
  "dutch-cocoa": {
    description: "alkali-treated cocoa with a darker color and milder flavor.",
    status: "low",
    reasons: [],
  },
  "cacao-nibs": {
    description: "crushed roasted cacao beans used as a crunchy chocolate garnish.",
    status: "depends",
    reasons: ["fructans"],
    note: "1 tsp / 3 g suggested low; moderate fructans at 125 g",
  },
  caramel: {
    description: "cooked-sugar candy or sauce, sometimes made with cream or condensed milk.",
    status: "depends",
    reasons: ["lactose", "fructose"],
    note: "sugar caramel is low; cream or condensed milk adds lactose; commercial sauces may use HFCS",
  },
  jam: {
    description: "fruit cooked with sugar into a spread, used on toast and in baking.",
    status: "depends",
    reasons: ["fructose", "sorbitol"],
    note: "strawberry or raspberry jam with sugar 2 tbsp / 40 g low; strawberry jam with HFCS 1/2 tbsp / 10 g low; apple, pear, mango, or cherry jam high in excess fructose and/or sorbitol",
  },
  jelly: {
    description: "clear fruit-juice spread used on toast and in sandwiches.",
    status: "depends",
    reasons: ["fructose", "sorbitol"],
    note: "same fruit and sweetener rules as jam; grape or strawberry with sugar can be low in about 2 tbsp; apple or pear juice jellies are high in excess fructose and sorbitol",
  },
  "orange-marmalade": {
    description: "citrus peel jam used on toast and in glazes.",
    status: "depends",
    reasons: ["fructose"],
    note: "2 tbsp / 40 g low if sweetened with sugar; versions with HFCS or extra fruit juice can be higher in excess fructose",
  },
  "apple-butter": {
    description: "concentrated slow-cooked apple spread, often spiced with cinnamon.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  marshmallow: {
    description: "airy gelatin candies used in cocoa, s'mores, and baking.",
    status: "depends",
    reasons: ["fructans", "fructose", "sorbitol"],
    note: "sugar and glucose syrup versions about 4 pieces / 25 g low, fructans high above about 90 g; avoid sorbitol or fructose-glucose syrup",
  },
  "marshmallow-fluff": {
    description: "spreadable marshmallow creme used in frosting and sandwiches.",
    status: "depends",
    reasons: ["fructose"],
    note: "typical corn-syrup-and-sugar brands are low like marshmallows; versions with HFCS or polyols are high in excess fructose or polyols",
  },
  sprinkles: {
    description: "tiny sugar decorations for cakes, cookies, and ice cream.",
    status: "depends",
    reasons: [],
    note: "sugar, cornstarch, and glaze are low; sugar-free sprinkles with polyols are high",
  },
  frosting: {
    description: "ready-to-spread cake icing, often vanilla or chocolate.",
    status: "depends",
    reasons: ["lactose", "fructose"],
    note: "powdered sugar and fat can be low; many tubs use HFCS, milk, or polyols, which add excess fructose, lactose, or polyols",
  },
  salt: {
    description: "mineral seasoning used to enhance flavor in cooking.",
    status: "low",
    reasons: [],
  },
  "kosher-salt": {
    description: "coarse additive-free salt used for cooking and seasoning meat.",
    status: "low",
    reasons: [],
  },
  "sea-salt": {
    description: "salt evaporated from seawater, used as a cooking and finishing salt.",
    status: "low",
    reasons: [],
  },
  "flaky-salt": {
    description: "large-crystal finishing salt such as Maldon, used as a garnish.",
    status: "low",
    reasons: [],
  },
  "black-pepper": {
    description: "dried Piper nigrum berries, ground or whole, used as a everyday seasoning.",
    status: "low",
    reasons: [],
  },
  "white-pepper": {
    description: "hulled Piper nigrum berries with a milder, earthier heat than black pepper.",
    status: "low",
    reasons: [],
  },
  "pink-peppercorn": {
    description: "dried Schinus berries used as a floral, mildly peppery garnish.",
    status: "low",
    reasons: [],
  },
  "sichuan-pepper": {
    description: "dried prickly-ash husks that give a citrusy, numbing heat.",
    status: "low",
    reasons: [],
  },
  cumin: {
    description:
      "warm, earthy ground seed spice used in Mexican, Indian, and Middle Eastern cooking.",
    status: "low",
    reasons: [],
  },
  "cumin-seed": {
    description: "whole cumin seeds toasted or bloomed in oil for curries and stews.",
    status: "low",
    reasons: [],
  },
  coriander: {
    description: "citrusy ground coriander seed used in curries, chili, and baking.",
    status: "low",
    reasons: [],
  },
  "coriander-seed": {
    description: "whole coriander seeds used in pickling, curries, and spice blends.",
    status: "low",
    reasons: [],
  },
  paprika: {
    description: "mild ground dried red pepper used for color and sweetness.",
    status: "low",
    reasons: [],
  },
  "smoked-paprika": {
    description: "paprika smoked over wood, used for barbecue and Spanish dishes.",
    status: "depends",
    reasons: ["fructose"],
    note: "fructose; low at 1 tsp (2 g); moderate at about 2½ tsp (5 g).",
  },
  "hot-paprika": {
    description: "spicier ground paprika used in Hungarian and Spanish cooking.",
    status: "low",
    reasons: [],
  },
  "chili-powder": {
    description:
      "American-style blend of ground chiles, cumin, oregano, and often garlic or onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical blends; pure 100% chile powder is Low",
  },
  cayenne: {
    description: "hot ground dried cayenne chile used for heat.",
    status: "low",
    reasons: [],
  },
  "red-pepper-flakes": {
    description: "crushed dried red chiles (often cayenne) used as a table heat.",
    status: "low",
    reasons: [],
  },
  "chipotle-powder": {
    description: "smoked, dried, ground jalapeño used for smoky heat.",
    status: "depends",
    reasons: [],
    note: "Low at 1 tsp (2 g); moderate at about 3 g.",
  },
  "ancho-powder": {
    description: "ground dried ripe poblano, mild and raisiny.",
    status: "depends",
    reasons: ["fructose"],
    note: "fructose; low at 1 tsp (2 g); high at about 17 g (1 whole dried chile).",
  },
  "guajillo-powder": {
    description: "ground dried guajillo chile used in Mexican sauces and rubs.",
    status: "low",
    reasons: [],
  },
  "aleppo-pepper": {
    description: "mildly hot, fruity crushed Syrian/Turkish chile flakes.",
    status: "low",
    reasons: [],
  },
  "urfa-biber": {
    description: "smoky, raisiny Turkish chile flakes used as a finishing pepper.",
    status: "low",
    reasons: [],
  },
  gochugaru: {
    description: "Korean sun-dried red chile flakes used in kimchi and stews.",
    status: "depends",
    reasons: ["fructose"],
    note: "fructose; low at 1 tsp (2 g); moderate at about 2½ tsp (5 g).",
  },
  togarashi: {
    description: "Japanese seven-spice blend of chile, orange peel, sesame, nori, and sansho.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in some commercial blends; garlic-free blends are Low",
  },
  oregano: {
    description: "pungent dried Mediterranean or Mexican oregano used in sauces and rubs.",
    status: "low",
    reasons: [],
  },
  thyme: {
    description: "savory dried thyme leaves used in stews, poultry, and French cooking.",
    status: "low",
    reasons: [],
  },
  rosemary: {
    description: "piney dried rosemary needles used with roast meats and potatoes.",
    status: "low",
    reasons: [],
  },
  "basil-dried": {
    description: "sweet dried basil used in Italian sauces and seasoning blends.",
    status: "low",
    reasons: [],
  },
  "parsley-dried": {
    description: "mild dried parsley flakes used as a garnish and blend herb.",
    status: "low",
    reasons: [],
  },
  "dill-dried": {
    description: "grassy dried dill weed used with fish, potatoes, and pickles.",
    status: "low",
    reasons: [],
  },
  sage: {
    description: "earthy dried sage used in poultry seasoning and stuffing.",
    status: "low",
    reasons: [],
  },
  "tarragon-dried": {
    description: "anise-scented dried tarragon used in French sauces.",
    status: "low",
    reasons: [],
  },
  marjoram: {
    description: "sweet oregano-like herb used in poultry blends and Mediterranean cooking.",
    status: "low",
    reasons: [],
  },
  savory: {
    description: "peppery dried herb used in bean dishes and herbes de Provence.",
    status: "low",
    reasons: [],
  },
  "bay-leaf": {
    description: "dried laurel leaf simmered in soups, stews, and braises.",
    status: "low",
    reasons: [],
  },
  cinnamon: {
    description: "warm ground bark spice used in baking and drinks.",
    status: "low",
    reasons: [],
  },
  "cinnamon-stick": {
    description: "whole cinnamon quill used to infuse stews, rice, and mulled drinks.",
    status: "low",
    reasons: [],
  },
  nutmeg: {
    description: "warm, sweet seed spice used in baking, béchamel, and spice blends.",
    status: "low",
    reasons: [],
  },
  mace: {
    description: "lacy nutmeg aril, ground, with a lighter nutmeg flavor.",
    status: "low",
    reasons: [],
  },
  cloves: {
    description: "intensely aromatic dried flower buds used in baking and savory braises.",
    status: "low",
    reasons: [],
  },
  allspice: {
    description: "dried pimento berry tasting of cinnamon, clove, and nutmeg.",
    status: "low",
    reasons: [],
  },
  "ginger-powder": {
    description: "dried powdered ginger used in baking, curries, and spice blends.",
    status: "low",
    reasons: [],
  },
  cardamom: {
    description: "sweet, resinous ground cardamom used in baking, chai, and Indian cooking.",
    status: "low",
    reasons: [],
  },
  "green-cardamom": {
    description: "whole green cardamom capsules crushed or simmered for aroma.",
    status: "low",
    reasons: [],
  },
  "black-cardamom": {
    description: "smoky large cardamom pods used in savory Indian and Chinese dishes.",
    status: "low",
    reasons: [],
  },
  "star-anise": {
    description: "star-shaped licorice-scented spice used in Chinese and Vietnamese cooking.",
    status: "low",
    reasons: [],
  },
  "anise-seed": {
    description: "small licorice-flavored seeds used in baking and Mediterranean cooking.",
    status: "low",
    reasons: [],
  },
  "fennel-seed": {
    description: "sweet licorice-flavored seeds used in Italian sausage and Indian cooking.",
    status: "low",
    reasons: [],
  },
  caraway: {
    description: "rye-bread spice used in Central European cooking and cheese.",
    status: "low",
    reasons: [],
  },
  "celery-seed": {
    description: "concentrated celery-flavored seeds used in pickles, coleslaw, and Old Bay.",
    status: "low",
    reasons: [],
  },
  "dill-seed": {
    description: "stronger, seed form of dill used in pickling and potato salad.",
    status: "low",
    reasons: [],
  },
  "mustard-seed": {
    description: "yellow, brown, or black seeds used in pickling, curries, and mustard.",
    status: "low",
    reasons: [],
  },
  "mustard-powder": {
    description: "ground mustard seed used in sauces, dry rubs, and homemade mustard.",
    status: "low",
    reasons: [],
  },
  fenugreek: {
    description: "bitter-sweet ground fenugreek used in curry powders and Ethiopian cooking.",
    status: "low",
    reasons: [],
  },
  "fenugreek-seed": {
    description: "whole fenugreek seeds toasted for curries and spice blends.",
    status: "low",
    reasons: [],
  },
  nigella: {
    description: "small black kalonji seeds used on breads and in Bengali cooking.",
    status: "low",
    reasons: [],
  },
  ajwain: {
    description: "thyme-scented carom seeds used in Indian breads and fried snacks.",
    status: "low",
    reasons: [],
  },
  turmeric: {
    description: "earthy golden ground rhizome used in curries and as a colorant.",
    status: "low",
    reasons: [],
  },
  saffron: {
    description: "costly dried crocus stigmas used for color and aroma in rice and sauces.",
    status: "low",
    reasons: [],
  },
  sumac: {
    description: "tart, lemony ground dried berries used in Middle Eastern cooking.",
    status: "low",
    reasons: [],
  },
  amchur: {
    description: "tangy dried green-mango powder used in Indian cooking and chaat.",
    status: "depends",
    reasons: [],
    note: "Low at 1 tsp (2 g); moderate at about 3¼ tsp (7 g); high at about 4¼ tsp (9 g).",
  },
  asafoetida: {
    description: "pungent dried ferula gum (hing) used as an onion/garlic substitute.",
    status: "low",
    reasons: [],
  },
  "garam-masala": {
    description: "warm North Indian blend of cinnamon, cardamom, cloves, cumin, and pepper.",
    status: "low",
    reasons: [],
  },
  "curry-powder": {
    description: "British-Indian blend of turmeric, coriander, cumin, fenugreek, and chili.",
    status: "low",
    reasons: [],
  },
  "tandoori-masala": {
    description: "red Indian grill blend that typically includes garlic, ginger, and chili.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical commercial blends; garlic-free blends are Low",
  },
  "chaat-masala": {
    description: "tangy Indian street-food blend of amchur, cumin, chili, and often asafoetida.",
    status: "low",
    reasons: [],
  },
  "sambar-powder": {
    description: "South Indian lentil-stew spice blend of coriander, chili, and lentils.",
    status: "low",
    reasons: [],
  },
  "panch-phoron": {
    description: "Bengali five-seed mix of cumin, fennel, fenugreek, nigella, and mustard.",
    status: "low",
    reasons: [],
  },
  "chinese-five-spice": {
    description: "blend of star anise, cloves, cinnamon, Sichuan pepper, and fennel.",
    status: "low",
    reasons: [],
  },
  zaatar: {
    description: "Levantine mix of thyme or oregano, sumac, sesame seeds, and salt.",
    status: "low",
    reasons: [],
  },
  "ras-el-hanout": {
    description: "Moroccan “top of the shop” blend of warm spices, sometimes with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in some commercial blends; garlic-free blends are Low",
  },
  "harissa-spice": {
    description: "North African chili blend that typically includes garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical blends; garlic-free chili-spice mixes are Low",
  },
  berbere: {
    description: "Ethiopian chili-spice blend that typically includes garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical blends; garlic-free blends are Low",
  },
  dukkah: {
    description: "Egyptian mix of nuts, sesame, coriander, and cumin, used as a dip or crust.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "fructans from sesame; GOS/fructans if cashews are used; low at a typical 1 tsp sprinkle of a garlic-free, almond- or hazelnut-based mix; large dip portions can exceed sesame (high at 6 tbsp / 66 g sesame) and nut limits.",
  },
  "herbes-de-provence": {
    description:
      "French dried-herb blend of thyme, rosemary, oregano, savory, and sometimes lavender.",
    status: "low",
    reasons: [],
  },
  "italian-seasoning": {
    description: "dried Italian herb mix that often includes garlic powder.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical commercial blends; garlic-free herb-only blends are Low",
  },
  "taco-seasoning": {
    description: "Mexican-style packet blend that typically includes onion and garlic powder.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical packets; garlic-free blends are Low",
  },
  "fajita-seasoning": {
    description: "Tex-Mex packet blend that typically includes onion and garlic powder.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical packets; garlic-free blends are Low",
  },
  "cajun-seasoning": {
    description:
      "Louisiana blend of paprika, cayenne, and herbs that typically includes garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical blends; garlic-free blends are Low",
  },
  "creole-seasoning": {
    description: "New Orleans blend similar to Cajun, typically with garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical blends; garlic-free blends are Low",
  },
  "old-bay": {
    description:
      "Maryland seafood seasoning of celery salt, paprika, and pepper (no garlic or onion in the classic formula).",
    status: "low",
    reasons: [],
  },
  "poultry-seasoning": {
    description: "sage-forward blend of thyme, marjoram, rosemary, and nutmeg.",
    status: "low",
    reasons: [],
  },
  "pumpkin-spice": {
    description: "sweet baking blend of cinnamon, ginger, nutmeg, allspice, and cloves.",
    status: "low",
    reasons: [],
  },
  "ranch-seasoning": {
    description:
      "dry ranch mix that typically includes garlic, onion, and often buttermilk powder.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from garlic/onion; lactose if buttermilk powder is present",
  },
  "adobo-seasoning": {
    description: "Latin all-purpose salt-and-spice blend that typically includes garlic and onion.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion/garlic in typical blends; low at 1 tsp (6 g) per Monash even when onion is present; larger amounts not recommended.",
  },
  sazon: {
    description: "Latin seasoning with annatto, coriander, cumin, and typically garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical packets; garlic-free versions are Low",
  },
  achiote: {
    description: "earthy orange-red annatto seed used to color and flavor Latin cooking.",
    status: "low",
    reasons: [],
  },
  annatto: {
    description: "same as achiote; the seed or ground spice used for color and mild flavor.",
    status: "low",
    reasons: [],
  },
  "garlic-powder": {
    description: "dried powdered garlic used as a pantry seasoning.",
    status: "high",
    reasons: ["fructans"],
  },
  "onion-powder": {
    description: "dried powdered onion used as a pantry seasoning.",
    status: "high",
    reasons: ["fructans"],
  },
  "onion-flakes": {
    description: "dehydrated onion pieces used in soups, mixes, and everything-bagel seasoning.",
    status: "high",
    reasons: ["fructans"],
  },
  "vanilla-extract": {
    description: "vanilla beans steeped in alcohol, used in baking.",
    status: "low",
    reasons: [],
  },
  "vanilla-bean": {
    description: "whole vanilla pod used to infuse desserts and custards.",
    status: "low",
    reasons: [],
  },
  "almond-extract": {
    description: "concentrated almond flavoring (usually almond oil in alcohol) used in baking.",
    status: "low",
    reasons: [],
  },
  "peppermint-extract": {
    description: "peppermint oil in alcohol used in baking and candy.",
    status: "low",
    reasons: [],
  },
  "coconut-extract": {
    description: "coconut flavoring in alcohol used in baking (not coconut milk).",
    status: "low",
    reasons: [],
  },
  "lemon-extract": {
    description: "lemon oil in alcohol used in baking and frostings.",
    status: "low",
    reasons: [],
  },
  "orange-extract": {
    description: "orange oil in alcohol used in baking and desserts.",
    status: "low",
    reasons: [],
  },
  "maple-extract": {
    description: "maple flavoring in alcohol used in baking (not maple syrup).",
    status: "low",
    reasons: [],
  },
  "rum-extract": {
    description: "rum flavoring used in baking in teaspoon amounts.",
    status: "low",
    reasons: [],
  },
  "sesame-seeds": {
    description: "small oil seeds used as a garnish, in tahini, and in spice blends.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at 1 tbsp (11 g); high at 6 tbsp (66 g).",
  },
  "black-sesame-seeds": {
    description: "unhulled black sesame used in East Asian cooking and desserts.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; low at 1 tbsp (11 g); high at 6 tbsp (66 g).",
  },
  "poppy-seeds": {
    description: "tiny blue-gray seeds used in baking and as a garnish.",
    status: "low",
    reasons: [],
  },
  "celery-salt": {
    description:
      "salt blended with ground celery seed, used in Bloody Marys and seafood seasoning.",
    status: "low",
    reasons: [],
  },
  "garlic-salt": {
    description: "salt mixed with garlic powder.",
    status: "high",
    reasons: ["fructans"],
  },
  "onion-salt": {
    description: "salt mixed with onion powder.",
    status: "high",
    reasons: ["fructans"],
  },
  msg: {
    description: "monosodium glutamate, an umami flavor enhancer used in small pinches.",
    status: "low",
    reasons: [],
  },
  "cream-of-tartar": {
    description:
      "potassium bitartrate powder used to stabilize egg whites and prevent sugar crystallization.",
    status: "low",
    reasons: [],
  },
  "citric-acid": {
    description: "tart acidity regulator used in canning, candy, and as a sour salt.",
    status: "low",
    reasons: [],
  },
  "food-coloring": {
    description: "synthetic or natural dyes used in tiny amounts for color.",
    status: "low",
    reasons: [],
  },
  "rose-water": {
    description: "distilled rose-petal hydrosol used in Middle Eastern and Indian desserts.",
    status: "low",
    reasons: [],
  },
  "orange-blossom-water": {
    description: "distilled bitter-orange-flower hydrosol used in Mediterranean desserts.",
    status: "low",
    reasons: [],
  },
  "kewra-water": {
    description: "distilled pandanus-flower hydrosol used in Indian and Pakistani sweets and rice.",
    status: "low",
    reasons: [],
  },
  "peri-peri-spice": {
    description: "African-Portuguese chili blend that typically includes garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical blends; garlic-free chili blends are Low",
  },
  "suya-spice": {
    description: "West African peanut-chili rub (yaji) that typically includes onion and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion/garlic in typical blends",
  },
  "jerk-seasoning": {
    description: "Jamaican allspice-and-chile rub that typically includes garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical blends; garlic-free blends are Low",
  },
  "everything-bagel-seasoning": {
    description: "mix of sesame, poppy, salt, dried garlic, and dried onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from dried garlic and onion",
  },
  furikake: {
    description: "Japanese rice sprinkle of sesame, nori, and salt that often includes garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic/onion in typical commercial blends; garlic-free blends are Low",
  },
  matcha: {
    description: "finely ground green-tea powder used in drinks and desserts.",
    status: "depends",
    reasons: [],
    note: "Low at 1 tsp (2 g); moderate at 4½ tsp (9 g); high at 6 tsp (12 g).",
  },
  "wasabi-powder": {
    description:
      "dried wasabi or horseradish powder (often with fillers) mixed with water for sushi.",
    status: "low",
    reasons: [],
  },
  water: { description: "plain drinking and cooking liquid.", status: "low", reasons: [] },
  "sparkling-water": {
    description: "carbonated water without juice or sweeteners.",
    status: "low",
    reasons: [],
  },
  "chicken-broth": {
    description: "simmered chicken stock used as a soup and cooking base.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in most commercial broths; onion- and garlic-free broth is Low",
  },
  "beef-broth": {
    description: "simmered beef stock used as a soup and cooking base.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in most commercial broths; onion- and garlic-free broth is Low",
  },
  "vegetable-broth": {
    description: "stock made from mixed vegetables, often including onion and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in typical recipes and store brands",
  },
  "garlic-free-broth": {
    description: "stock made without onion, garlic, or other high-FODMAP aromatics.",
    status: "low",
    reasons: [],
  },
  "bone-broth": {
    description: "long-simmered bone stock, often flavored with onion and garlic.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in most commercial versions; onion- and garlic-free bone broth is Low",
  },
  "fish-stock": {
    description: "simmered fish-bone stock used in soups and sauces.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion and garlic if those aromatics are used; plain fish-and-water stock is Low",
  },
  dashi: {
    description: "Japanese broth typically made from kombu and bonito flakes.",
    status: "low",
    reasons: [],
  },
  "bouillon-cube": {
    description: "dehydrated stock cubes or powder used to make broth.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in most cubes; onion- and garlic-free cubes such as some Massel products are Low",
  },
  "coconut-milk": {
    description: "thick coconut milk from a can used in cooking.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "sorbitol; Low at about 1/4 cup / 60 g, moderate at about 1/2 cup; light canned coconut milk stays Low in larger tested amounts; avoid versions with inulin",
  },
  "coconut-cream": {
    description: "high-fat coconut product skimmed from coconut milk.",
    status: "low",
    reasons: [],
  },
  "coconut-water": {
    description: "clear liquid from the center of a coconut, fresh or packaged.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "sorbitol and fructans; Low at about 100 ml, moderate around 150–160 ml, High at 250 ml",
  },
  "almond-milk": {
    description: "plant milk made from strained almonds and water.",
    status: "low",
    reasons: [],
  },
  "oat-milk": {
    description: "plant milk made from oats and water.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; Low around 100–125 ml depending on country, moderate at about 120–165 ml, High at a typical 250 ml cup",
  },
  "soy-milk": {
    description: "plant milk made from soybeans or soy protein.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS from whole soybeans: High at a drinking cup, Low only around 2 tbsp / 44 g; soy milk from soy protein is Low at 1 cup / 250 ml",
  },
  "rice-milk": { description: "plant milk made from rice and water.", status: "low", reasons: [] },
  "hemp-milk": {
    description: "plant milk made from hemp seeds and water.",
    status: "low",
    reasons: [],
  },
  "cashew-milk": {
    description: "plant milk made from cashews and water.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; commercial cashew milk is often Low around 1/2 cup, while homemade high-cashew versions are High",
  },
  "coconut-milk-beverage": {
    description: "carton or UHT coconut milk sold as a drinking milk.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "oligosaccharides and sorbitol; Low around 1/2–3/4 cup / 125–180 ml, moderate at about 150–250 ml; High if inulin is added",
  },
  coffee: { description: "brewed coffee from coffee beans, black.", status: "low", reasons: [] },
  espresso: { description: "concentrated coffee shot, black.", status: "low", reasons: [] },
  "black-tea": {
    description: "tea brewed from Camellia sinensis leaves, black.",
    status: "low",
    reasons: [],
  },
  "green-tea": {
    description: "tea brewed from unoxidized Camellia sinensis leaves.",
    status: "low",
    reasons: [],
  },
  "herbal-tea": {
    description: "infusion of herbs, flowers, or spices rather than tea leaves.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans in chamomile, fennel, dandelion, and strong herbal blends; peppermint, ginger, rooibos, and lemongrass teas are Low at about 1 cup / 250 ml",
  },
  "apple-juice": {
    description: "juice pressed from apples.",
    status: "high",
    reasons: ["fructose"],
  },
  "orange-juice": {
    description: "juice from oranges, fresh or reconstituted.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; freshly squeezed Low around 1/3 cup / 72 ml, moderate near 1/2 cup; reconstituted Low around 120 ml, moderate at 160 ml",
  },
  "grape-juice": {
    description: "juice pressed from grapes.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose in larger glasses; Monash-tested as Low in a small serve, often cited around 30 ml to a modest juice portion",
  },
  "cranberry-juice": {
    description: "juice or juice drink from cranberries.",
    status: "low",
    reasons: [],
  },
  "pineapple-juice": {
    description: "juice pressed from pineapple.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose in larger glasses; Low around 1/2 cup / 120 ml or less",
  },
  "lemon-juice": { description: "juice squeezed from lemons.", status: "low", reasons: [] },
  "lime-juice": { description: "juice squeezed from limes.", status: "low", reasons: [] },
  soda: {
    description: "sweetened carbonated soft drink such as cola.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose from high-fructose corn syrup or fruit juice; sucrose-sweetened soda is often Low around 1/2 cup / 125–150 ml; polyol-sweetened diet sodas are High",
  },
  "ginger-ale": {
    description: "ginger-flavored sweetened carbonated drink.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose if made with high-fructose corn syrup or fruit juice; Low around 3/4 cup when sucrose-sweetened",
  },
  "tonic-water": {
    description: "bitter carbonated mixer sweetened with sugar or syrup.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose if sweetened with high-fructose corn syrup; sucrose-sweetened tonic is generally Low in a typical mixer serve",
  },
  vinegar: {
    description: "distilled vinegar used for cooking and pickling.",
    status: "low",
    reasons: [],
  },
  "rice-vinegar": {
    description: "mild vinegar made from fermented rice.",
    status: "low",
    reasons: [],
  },
  "apple-cider-vinegar": {
    description: "vinegar fermented from apple cider.",
    status: "low",
    reasons: [],
  },
  "balsamic-vinegar": {
    description: "aged grape-must vinegar.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "fructans and fructose; Low at 1 tbsp / 21 g, moderate at 2 tbsp / 42 g, High at about 3 tbsp",
  },
  "red-wine-vinegar": {
    description: "vinegar fermented from red wine.",
    status: "low",
    reasons: [],
  },
  "white-wine-vinegar": {
    description: "vinegar fermented from white wine.",
    status: "low",
    reasons: [],
  },
  "sherry-vinegar": {
    description: "vinegar fermented from sherry wine.",
    status: "low",
    reasons: [],
  },
  "malt-vinegar": { description: "vinegar made from malted barley.", status: "low", reasons: [] },
  "champagne-vinegar": {
    description: "vinegar fermented from sparkling wine.",
    status: "low",
    reasons: [],
  },
  "baking-powder": {
    description: "chemical leavener of baking soda plus acid salts.",
    status: "low",
    reasons: [],
  },
  "baking-soda": {
    description: "sodium bicarbonate used as a leavener.",
    status: "low",
    reasons: [],
  },
  "active-dry-yeast": {
    description: "granulated baker’s yeast for bread dough.",
    status: "low",
    reasons: [],
  },
  "instant-yeast": {
    description: "finely milled baker’s yeast that can be mixed into flour.",
    status: "low",
    reasons: [],
  },
  "fresh-yeast": {
    description: "compressed cake yeast used in baking.",
    status: "low",
    reasons: [],
  },
  gelatin: { description: "animal-derived protein gelling agent.", status: "low", reasons: [] },
  collagen: { description: "hydrolyzed collagen protein powder.", status: "low", reasons: [] },
  pectin: { description: "fruit-derived gelling fiber used in jams.", status: "low", reasons: [] },
  "xanthan-gum": {
    description: "bacterial polysaccharide used as a thickener and gluten-free binder.",
    status: "low",
    reasons: [],
  },
  "guar-gum": {
    description: "seed-derived thickener used in baking and processed foods.",
    status: "low",
    reasons: [],
  },
  "psyllium-husk": {
    description: "soluble fiber from Plantago ovata used as a binder and supplement.",
    status: "low",
    reasons: [],
  },
  inulin: {
    description: "chicory-derived fiber added to processed foods and supplements.",
    status: "high",
    reasons: ["fructans"],
  },
  "chicory-root-fiber": {
    description: "inulin-rich fiber from chicory root, often labeled as a prebiotic.",
    status: "high",
    reasons: ["fructans"],
  },
  "soy-sauce": { description: "fermented soy and wheat condiment.", status: "low", reasons: [] },
  "soy-sauce-gf": { description: "soy sauce brewed without wheat.", status: "low", reasons: [] },
  tamari: {
    description: "Japanese-style soy sauce, often wheat-free.",
    status: "low",
    reasons: [],
  },
  "coconut-aminos": {
    description: "seasoning sauce made from coconut sap.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; Low at 1 tsp / 5 g, High in larger soy-sauce-style pours",
  },
  "fish-sauce": { description: "salty fermented anchovy sauce.", status: "low", reasons: [] },
  "oyster-sauce": {
    description: "thick savory sauce made from oysters, salt, and sugar.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; Low at 1 tbsp / 20 g, moderate to High at 2 tbsp",
  },
  hoisin: {
    description: "sweet fermented soybean sauce used in Chinese cooking.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and fermented soy in typical store brands",
  },
  "teriyaki-sauce": {
    description: "sweet soy-based glaze, usually with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic; also golden syrup or similar sweeteners in many bottles",
  },
  mirin: { description: "sweet Japanese rice wine used for cooking.", status: "low", reasons: [] },
  sake: {
    description: "Japanese rice wine used for drinking or cooking.",
    status: "low",
    reasons: [],
  },
  "shaoxing-wine": { description: "Chinese rice cooking wine.", status: "low", reasons: [] },
  "rice-wine": {
    description: "fermented rice wine used in East Asian cooking.",
    status: "low",
    reasons: [],
  },
  ponzu: {
    description: "citrus-soy dipping sauce.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose if made with high-fructose corn syrup, as in the Monash-tested style; homemade soy-citrus ponzu without HFCS is Low in condiment amounts",
  },
  "kecap-manis": {
    description: "thick sweet soy sauce.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; Low at 1 tbsp / 20 g, moderate around 50 g",
  },
  sriracha: {
    description: "chili-garlic hot sauce.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from garlic; Low at 1 tsp / 5 g, moderate at 3 tsp / 15 g, High at 1 tbsp / 20 g",
  },
  "chili-garlic-sauce": {
    description: "coarse chili paste packed with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  "sweet-chili-sauce": {
    description: "sweet-and-spicy dipping sauce.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from garlic and excess fructose from the sweet base in typical store brands",
  },
  "sambal-oelek": {
    description: "Indonesian chili paste of chiles, vinegar, and salt.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans if garlic is added; garlic-free sambal of chiles, vinegar, and salt is Low in typical teaspoon amounts",
  },
  "chili-crisp": {
    description: "chili-oil condiment with fried chili flakes and aromatics.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from garlic and onion in most commercial jars; chili-and-oil versions without alliums are Low",
  },
  gochujang: {
    description: "Korean fermented chili paste.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic, onion, and fermented soy or glutinous rice in typical commercial paste",
  },
  doenjang: {
    description: "Korean fermented soybean paste.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans from soybeans, plus garlic or onion in many commercial pastes; plain paste in a miso-like spoonful may be tolerated, but typical Korean dishes using it are High",
  },
  miso: {
    description: "Japanese fermented soybean paste.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; Low at about 2 tsp to 1 tbsp / 12 g, moderate at larger soup-bowl amounts",
  },
  doubanjiang: {
    description: "spicy fermented broad-bean and chili paste.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "fructans from garlic and GOS from fermented beans in typical commercial paste",
  },
  "black-bean-sauce": {
    description: "Chinese sauce made from fermented black soybeans.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans; garlic-free sauce Low at 1 tbsp / 20 g; versions with garlic are High",
  },
  "fermented-black-beans": {
    description: "salted fermented black soybeans (douchi).",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 1 tbsp / 15 g if no garlic is added",
  },
  "shrimp-paste": { description: "fermented ground shrimp seasoning.", status: "low", reasons: [] },
  "anchovy-paste": {
    description: "concentrated mashed anchovies in a tube.",
    status: "low",
    reasons: [],
  },
  wasabi: {
    description: "pungent green paste or powder served with sushi.",
    status: "low",
    reasons: [],
  },
  "pickled-ginger": {
    description: "thin-sliced ginger pickled in vinegar and sugar.",
    status: "low",
    reasons: [],
  },
  nori: {
    description: "dried sheet seaweed used for sushi and garnish.",
    status: "low",
    reasons: [],
  },
  wakame: {
    description: "tender seaweed used in soups and salads.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol in larger amounts; Low around 5 g dried or 30 g fresh",
  },
  kombu: { description: "dried kelp used to make dashi.", status: "low", reasons: [] },
  "bonito-flakes": {
    description: "dried, shaved skipjack tuna used for dashi and garnish.",
    status: "low",
    reasons: [],
  },
  kimchi: {
    description: "Korean fermented napa cabbage with chili and seasonings.",
    status: "depends",
    reasons: ["fructans", "mannitol"],
    note: "mannitol, plus fructans from garlic and onion in most recipes; Low around 47 g / 1/3 cup, moderate at about 70 g, High at 75 g / 1/2 cup",
  },
  sauerkraut: {
    description: "fermented cabbage.",
    status: "depends",
    reasons: ["mannitol"],
    note: "mannitol; white-cabbage sauerkraut Low at 1 tbsp / 20 g, moderate at 1 1/2 tbsp / 30 g, High at 1/2 cup / 75 g; red-cabbage sauerkraut is Low around 1/2 cup",
  },
  "red-curry-paste": {
    description: "Thai paste of red chiles, aromatics, and shrimp paste.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and shallot in typical store paste",
  },
  "green-curry-paste": {
    description: "Thai paste of green chiles, aromatics, and herbs.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and shallot in typical store paste",
  },
  "yellow-curry-paste": {
    description: "Thai paste of yellow chiles, spices, and aromatics.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and shallot in typical store paste",
  },
  "pad-thai-sauce": {
    description: "sweet-sour-salty sauce for pad Thai noodles.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and onion in typical bottled sauce",
  },
  "peanut-sauce": {
    description: "sauce of peanuts or peanut butter with soy and aromatics.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from garlic and onion in most bottled sauces; homemade sauce without alliums is Low when peanuts stay within a small handful and soy sauce within 2 tbsp",
  },
  ketchup: {
    description: "sweet tomato condiment.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose and fructans from onion; Low at about 13 g / 2 tsp, larger dollops are moderate to High",
  },
  mustard: {
    description: "prepared mustard condiment, generic yellow or brown style.",
    status: "low",
    reasons: [],
  },
  "dijon-mustard": {
    description: "sharp prepared mustard from brown mustard seeds.",
    status: "low",
    reasons: [],
  },
  "whole-grain-mustard": {
    description: "coarse mustard with visible mustard seeds.",
    status: "low",
    reasons: [],
  },
  "honey-mustard": {
    description: "mustard sweetened with honey.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose from honey; Low only if the honey in a serving stays around 1 tsp or less",
  },
  "yellow-mustard": {
    description: "mild American-style prepared mustard.",
    status: "low",
    reasons: [],
  },
  relish: {
    description: "chopped sweet pickle relish.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose and fructans; Low at 1 tbsp / 20 g",
  },
  "dill-pickle": {
    description: "cucumbers pickled in vinegar with dill.",
    status: "low",
    reasons: [],
  },
  "bread-and-butter-pickle": {
    description: "sweet vinegar-pickled cucumber slices.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "excess fructose from sugar or high-fructose corn syrup, and fructans if onion is in the brine; vinegar-pickled cucumber itself is Low like dill pickles",
  },
  "pickle-juice": {
    description: "leftover vinegar brine from a pickle jar.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from garlic or onion if those are in the brine; plain vinegar-salt-dill brine is Low in a splash",
  },
  "sauerkraut-juice": {
    description: "liquid from fermented cabbage.",
    status: "high",
    reasons: ["mannitol"],
    note: "mannitol from fermented cabbage",
  },
  capers: {
    description: "pickled flower buds used as a salty garnish in sauces and salads.",
    status: "low",
    reasons: [],
  },
  salsa: {
    description: "tomato dip typically made with onion, chili, and cilantro.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in typical jarred and restaurant salsa",
  },
  "pico-de-gallo": {
    description: "fresh chopped tomato, onion, chili, and cilantro salsa.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from raw onion",
  },
  "salsa-verde": {
    description: "tomatillo salsa, usually blended with onion and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  "hot-sauce": {
    description: "chili-pepper sauce used as a table condiment.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; plain chile, vinegar, and salt sauces are Low; garlic- or onion-containing sauces are High; sriracha is often Low around 1 tbsp / 5 g",
  },
  tabasco: {
    description: "fermented red-pepper, vinegar, and salt hot sauce.",
    status: "low",
    reasons: [],
  },
  "frank-hot-sauce": {
    description: "cayenne-pepper hot sauce such as Frank’s-style table sauce.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; chile-vinegar-salt bases are Low; many cayenne sauces add garlic powder",
  },
  "bbq-sauce": {
    description: "sweet-tangy tomato sauce for grilled meats.",
    status: "depends",
    reasons: ["fructans", "fructose"],
    note: "fructans and excess fructose; about 2 tbsp / 46 g is often listed as Low; many brands add onion, garlic, or high-fructose corn syrup",
  },
  worcestershire: {
    description: "fermented anchovy-and-vinegar condiment used in marinades and meat dishes.",
    status: "low",
    reasons: [],
  },
  "steak-sauce": {
    description: "thick brown table sauce for beef, such as A.1.-style sauce.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from dried garlic and onion",
  },
  "cocktail-sauce": {
    description: "ketchup-and-horseradish dip for shrimp and seafood.",
    status: "depends",
    reasons: ["fructose"],
    note: "horseradish is Low at about 2 tbsp; ketchup is Low around 1 sachet / 13 g and High in larger amounts from onion and fructose",
  },
  "tartar-sauce": {
    description: "mayonnaise-based sauce with pickles, served with fried fish.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion in typical commercial tartar sauce",
  },
  "horseradish-sauce": {
    description: "creamy prepared horseradish condiment.",
    status: "depends",
    reasons: ["lactose"],
    note: "prepared grated horseradish is Low at about 2 tbsp / 42 g; cream sauces may add lactose or onion",
  },
  "ranch-dressing": {
    description: "creamy herb dressing typically flavored with garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and onion",
  },
  "caesar-dressing": {
    description: "creamy Parmesan dressing typically made with garlic and anchovy.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  "italian-dressing": {
    description: "oil-and-vinegar herb dressing, usually with garlic and onion.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic and onion",
  },
  "blue-cheese-dressing": {
    description: "creamy dressing made with blue cheese.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from garlic in typical commercial dressings; blue cheese itself is Low in lactose",
  },
  "thousand-island": {
    description: "creamy pink dressing of mayonnaise, ketchup, and relish.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from onion and excess fructose from ketchup or high-fructose corn syrup",
  },
  vinaigrette: {
    description: "oil-and-vinegar salad dressing.",
    status: "depends",
    reasons: ["fructose"],
    note: "oil plus most vinegars are Low; balsamic vinegar is Low at 1 tbsp / 21 g and moderate in fructose at 2 tbsp; garlic versions are High",
  },
  "balsamic-glaze": {
    description: "reduced, syrupy balsamic vinegar used as a drizzle.",
    status: "high",
    reasons: ["fructose"],
    note: "concentrated excess fructose; commercial glazes often add high-fructose corn syrup or fruit concentrates",
  },
  "miracle-whip": {
    description: "sweet mayonnaise-style spread such as Miracle Whip.",
    status: "high",
    reasons: ["fructose"],
    note: "high-fructose corn syrup and garlic",
  },
  pesto: {
    description: "basil, nut, cheese, and oil sauce, classically made with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  marinara: {
    description: "tomato pasta sauce typically simmered with onion and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  "alfredo-sauce": {
    description: "cream and Parmesan pasta sauce, typically flavored with garlic.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from garlic and lactose from cream",
  },
  "enchilada-sauce": {
    description: "red chili-and-tomato sauce for enchiladas.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in typical recipes and cans",
  },
  "taco-sauce": {
    description: "thin tomato-chili table sauce for tacos.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from onion powder and often excess fructose from high-fructose corn syrup",
  },
  mole: {
    description: "Mexican chili sauce often made with chocolate, nuts, onion, and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  "chipotle-in-adobo": {
    description: "smoked jalapeños packed in a tangy tomato sauce.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic in typical adobo",
  },
  sofrito: {
    description: "Puerto Rican or Spanish cooking base of peppers, onion, and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  recaito: {
    description: "Puerto Rican green cooking base of culantro, peppers, onion, and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion and garlic",
  },
  "tikka-masala-sauce": {
    description: "creamy tomato-and-spice Indian curry sauce.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from onion and garlic, plus lactose from cream",
  },
  "mango-chutney": {
    description: "sweet-sour mango relish used with Indian food.",
    status: "high",
    reasons: ["fructose"],
    note: "excess fructose from mango",
  },
  "tamarind-paste": {
    description: "sour paste made from tamarind fruit, used in Asian and Latin cooking.",
    status: "depends",
    reasons: ["fructans"],
    note: "about 1/2 tbsp is Low; about 3 tbsp is moderate in fructans",
  },
  "tamarind-concentrate": {
    description: "thicker, more reduced tamarind puree.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; more concentrated than paste, so keep to a similar small 1/2 tbsp Low serve",
  },
  harissa: {
    description: "North African chili paste, typically blended with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical paste",
  },
  ajvar: {
    description: "Balkan roasted red-pepper and eggplant spread, often with garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic in typical jarred ajvar",
  },
  tzatziki: {
    description: "yogurt, cucumber, and garlic dip.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from garlic and lactose from yogurt",
  },
  "baba-ganoush": {
    description: "eggplant dip typically blended with tahini and garlic.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from garlic",
  },
  "tahini-sauce": {
    description: "pourable sesame sauce, often lemon-thinned and garlicky.",
    status: "depends",
    reasons: ["fructans"],
    note: "plain tahini is Low at about 1 tbsp / 20 g to 2 tbsp / 30 g for fructans; typical restaurant tahini sauce adds garlic",
  },
  "canned-pumpkin": {
    description: "plain canned pumpkin puree used in baking and soups.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; Low at about 1/3 cup / 75 g, moderate around 105 g, High around 128 g",
  },
  "pumpkin-pie-filling": {
    description: "sweetened, spiced canned pumpkin mix for pie.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans from concentrated pumpkin; plain pumpkin is Low at 1/3 cup / 75 g, while pie filling is sweeter and easier to overshoot",
  },
  applesauce: {
    description: "cooked, mashed apples, unsweetened or sweetened.",
    status: "depends",
    reasons: ["fructose", "sorbitol"],
    note: "excess fructose and sorbitol; Low only at about 3/4 tsp / 3 g, moderate at 1 tsp / 4 g; a typical serving is High",
  },
  "canned-pineapple": {
    description: "pineapple packed in juice or syrup.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; in juice Low around 90–106 g, moderate near 107 g; in syrup Low around 67–83 g",
  },
  "canned-peaches": {
    description: "peach halves or slices packed in juice or syrup.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
    note: "excess fructose and sorbitol; canned drained peaches have no practical Low serve",
  },
  "canned-pears": {
    description: "pear halves or slices packed in juice or syrup.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
  },
  "maraschino-cherry": {
    description: "bright preserved cherries used as a garnish.",
    status: "high",
    reasons: ["fructose", "sorbitol"],
    note: "excess fructose and sorbitol from cherries, plus high-fructose corn syrup",
  },
  "roasted-red-pepper": {
    description: "jarred roasted red bell peppers in brine.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; jarred Low at about 1/3 cup / 50 g, moderate around 1 cup, High around 1 1/3 cups",
  },
  "artichoke-hearts": {
    description: "tender artichoke centers, usually canned or jarred in brine.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; canned in brine about 1/2 cup / 75 g is often Low; fresh globe artichoke is High",
  },
  "hearts-of-palm": {
    description: "canned inner stem of certain palms, used in salads.",
    status: "low",
    reasons: [],
  },
  "pickled-jalapeno": {
    description: "jalapeño slices packed in vinegar brine.",
    status: "low",
    reasons: [],
  },
  giardiniera: {
    description: "mixed pickled vegetables, often cauliflower, peppers, and onion.",
    status: "high",
    reasons: ["fructans", "mannitol"],
    note: "mannitol from cauliflower and fructans from onion and garlic",
  },
  "banana-peppers-jarred": {
    description: "mild pickled peppers used on sandwiches and salads.",
    status: "low",
    reasons: [],
  },
  "olives-canned": {
    description: "black or green olives packed in brine.",
    status: "low",
    reasons: [],
  },
  "coconut-flakes": {
    description: "dried coconut meat with no added sugar.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; Low at about 1/2 cup / 30 g, moderate around 35 g, High around 51 g",
  },
  "sweetened-coconut": {
    description: "dried coconut tossed with sugar, used in baking.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; same Low serve as unsweetened, about 1/2 cup / 30 g",
  },
  "vegan-cheese": {
    description: "plant-based cheese, often coconut-oil or cashew based.",
    status: "depends",
    reasons: ["fructans", "gos"],
    note: "coconut-oil cheddar-style about 40 g / 2 slices is Low; cashew cheeses are High in GOS and fructans; watch inulin, onion, and garlic",
  },
  "coconut-yogurt": {
    description: "yogurt made from coconut milk.",
    status: "depends",
    reasons: ["fructans", "sorbitol"],
    note: "sorbitol; Low around 1/2 cup / 125–149 g, moderate around 200 g; High if inulin or chicory root is added",
  },
  "almond-yogurt": {
    description: "yogurt made from almond milk.",
    status: "depends",
    reasons: ["fructans"],
    note: "almonds are Low at 10 nuts; many almond yogurts add inulin or chicory fiber, which are High fructans",
  },
  "cream-of-mushroom": {
    description: "canned condensed mushroom soup.",
    status: "high",
    reasons: ["fructans", "mannitol"],
    note: "mannitol from mushrooms plus fructans from onion and garlic",
  },
  "cream-of-chicken": {
    description: "canned condensed chicken soup.",
    status: "high",
    reasons: ["fructans", "lactose"],
    note: "fructans from onion and garlic, plus lactose",
  },
  "canned-chili": {
    description: "canned bean-and-meat chili.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "GOS from beans plus fructans from onion and garlic",
  },
  "sloppy-joe-sauce": {
    description: "sweet tomato sauce mix for ground-meat sandwiches.",
    status: "high",
    reasons: ["fructans", "fructose"],
    note: "fructans from onion and garlic, plus high-fructose corn syrup",
  },
  "gravy-mix": {
    description: "dry packet mix for brown or poultry gravy.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion powder and often wheat",
  },
  "french-fried-onions": {
    description: "crispy fried onion topping for casseroles.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from onion",
  },
  jello: { description: "flavored gelatin powder such as Jell-O.", status: "low", reasons: [] },
  "pudding-mix": {
    description: "sweet starch mix for cooked or instant pudding.",
    status: "depends",
    reasons: ["lactose"],
    note: "lactose if prepared with regular milk; the dry mix is mostly sucrose and starch, so lactose-free milk keeps a typical serve Low",
  },
  "cool-whip": {
    description: "frozen non-dairy whipped topping such as Cool Whip.",
    status: "high",
    reasons: ["lactose", "fructose"],
    note: "high-fructose corn syrup and lactose",
  },
  "evaporated-coconut-milk": {
    description: "canned concentrated coconut milk sold as a dairy substitute.",
    status: "depends",
    reasons: ["sorbitol"],
    note: "sorbitol; treat like regular canned coconut milk, Low around 1/4 cup / 60 g",
  },
  almonds: {
    description: "tree nuts eaten whole, sliced, or as butter.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 10 nuts / 12–22 g, moderate to High in larger handfuls",
  },
  walnuts: {
    description: "tree nuts used as snacks and in baking.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 10–15 halves / 30 g",
  },
  pecans: {
    description: "buttery tree nuts used as snacks and in pies.",
    status: "low",
    reasons: [],
  },
  cashews: {
    description: "creamy tree nuts used as snacks and in dairy-free sauces.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans",
  },
  pistachios: {
    description: "green tree nuts eaten as snacks and in desserts.",
    status: "high",
    reasons: ["fructans", "gos"],
    note: "GOS and fructans",
  },
  macadamia: {
    description: "rich, buttery tree nuts eaten as snacks.",
    status: "low",
    reasons: [],
  },
  "brazil-nuts": {
    description: "large selenium-rich tree nuts.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 10 nuts / 30 g, moderate around 15 nuts",
  },
  hazelnuts: {
    description: "tree nuts used in baking, spreads, and snacks.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 10–15 nuts / 24 g",
  },
  "pine-nuts": {
    description: "small seeds of pine trees used in pesto and salads.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 1 tbsp / 8–14 g",
  },
  peanuts: {
    description: "common legume-nut eaten roasted, in snacks, and as butter.",
    status: "low",
    reasons: [],
  },
  "pumpkin-seeds": {
    description: "hulled pepitas used as snacks and salad toppers.",
    status: "low",
    reasons: [],
  },
  "sunflower-seeds": {
    description: "hulled seeds eaten as snacks and in baking.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 1 tbsp / 15 g, moderate around 17 g",
  },
  "chia-seeds": {
    description: "tiny seeds used in puddings, smoothies, and baking.",
    status: "depends",
    reasons: ["fructans"],
    note: "fructans; Low at about 2 tbsp / 24 g, up to about 36 g",
  },
  "flax-seeds": {
    description: "linseeds used ground in baking and breakfasts.",
    status: "depends",
    reasons: ["gos"],
    note: "GOS; Low at about 1 tbsp / 15–16 g, moderate around 17 g",
  },
  "hemp-hearts": {
    description: "hulled hemp seeds sprinkled on yogurt, salads, and bowls.",
    status: "low",
    reasons: [],
  },
  egusi: {
    description: "melon seeds used in West African soups and stews.",
    status: "low",
    reasons: [],
  },
  "potato-chips": {
    description: "thin fried potato slices, typically salted.",
    status: "low",
    reasons: [],
  },
  "plantain-chips": {
    description: "fried plantain slices eaten as a snack.",
    status: "low",
    reasons: [],
  },
  "pork-rinds": {
    description: "fried pork skin snack, also called chicharrones.",
    status: "low",
    reasons: [],
  },
  "graham-cracker-crumbs": {
    description: "crushed wheat graham crackers used in pie crusts.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from wheat; gluten-free crumbs may be Low",
  },
  "oreo-crumbs": {
    description: "crushed Oreo-style cookies used in crusts and desserts.",
    status: "high",
    reasons: ["fructans"],
    note: "fructans from wheat in regular crumbs; gluten-free versions are often Low",
  },
  "protein-powder": {
    description: "powdered protein used in shakes and baking.",
    status: "depends",
    reasons: ["fructans", "gos", "lactose"],
    note: "whey isolate is Low; whey concentrate is High in lactose; pea protein varies in GOS by brand; inulin or chicory fiber makes it High",
  },
  "nutritional-yeast": {
    description: "deactivated yeast flakes used for a cheesy, savory sprinkle.",
    status: "low",
    reasons: [],
  },
  "tofu-skin": {
    description: "dried soy-milk film, also called yuba, used in Asian cooking.",
    status: "low",
    reasons: [],
  },
  "white-wine": {
    description: "fermented grape wine used as a drink and in cooking.",
    status: "depends",
    reasons: ["fructose"],
    note: "excess fructose; 1 glass / 150 ml is Low",
  },
  "red-wine": {
    description: "fermented red-grape wine used as a drink and in cooking.",
    status: "depends",
    reasons: ["fructose"],
    note: "1 glass / 150 ml is Low; larger servings can be moderate in excess fructose",
  },
  "dry-sherry": {
    description: "fortified wine used in cooking and as an aperitif.",
    status: "high",
    reasons: ["fructose"],
    note: "excess fructose in fortified and dessert-style wines",
  },
  beer: { description: "fermented barley or wheat beer.", status: "low", reasons: [] },
  "gluten-free-beer": {
    description: "beer brewed without wheat, barley, or rye.",
    status: "low",
    reasons: [],
  },
  vodka: {
    description: "distilled spirit typically made from grain or potatoes.",
    status: "low",
    reasons: [],
  },
  rum: {
    description: "distilled spirit made from sugarcane or molasses.",
    status: "high",
    reasons: ["fructose"],
  },
  bourbon: {
    description: "American whiskey distilled from a corn mash.",
    status: "low",
    reasons: [],
  },
};
