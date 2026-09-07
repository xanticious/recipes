/**
 * Rewrite catalog titles as (HA) / (Not-HA), generate HA companion recipes,
 * and link Meal Idea recipes.
 *
 *   node --experimental-strip-types scripts/apply-ha-format.ts
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { classifyRecipeHa, ingredientLookup, mealIdeas, recipes } from "../src/data/index.ts";
import { isHomeRecipe } from "../src/data/recipe.ts";
import type { HomeRecipe, IngredientLine, MealIdeaRecipeRef, Recipe } from "../src/data/types.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RECIPE_DIR = path.join(ROOT, "src", "data", "recipes");

const STAR_FORBIDDEN = new Set([
  "apple",
  "pear",
  "peach",
  "cherry",
  "sweet-cherry",
  "avocado",
  "watermelon",
  "mango",
  "banana",
  "inulin",
  "applesauce",
  "apple-butter",
  "granny-smith",
  "honeycrisp",
  "asian-pear",
  "nectarine",
  "date",
]);

type Swap = {
  ingredientId: string;
  amount?: number;
  unit?: string | null;
  preparation?: string;
};

const SWAPS: Record<string, Swap> = {
  milk: { ingredientId: "almond-milk" },
  "whole-milk": { ingredientId: "almond-milk" },
  "2-percent-milk": { ingredientId: "almond-milk" },
  "skim-milk": { ingredientId: "almond-milk" },
  "lactose-free-milk": { ingredientId: "almond-milk" },
  buttermilk: { ingredientId: "almond-milk" },
  "evaporated-milk": { ingredientId: "coconut-milk" },
  "sweetened-condensed-milk": { ingredientId: "coconut-milk" },
  "half-and-half": { ingredientId: "coconut-milk" },
  "heavy-cream": { ingredientId: "coconut-milk" },
  "whipping-cream": { ingredientId: "coconut-milk" },
  "whipped-cream": { ingredientId: "coconut-cream" },
  yogurt: { ingredientId: "coconut-yogurt" },
  "greek-yogurt": { ingredientId: "coconut-yogurt" },
  "lactose-free-yogurt": { ingredientId: "coconut-yogurt" },
  "frozen-yogurt": { ingredientId: "lactose-free-ice-cream" },
  "ice-cream": { ingredientId: "lactose-free-ice-cream" },
  "sour-cream": { ingredientId: "coconut-yogurt" },
  "lactose-free-sour-cream": { ingredientId: "coconut-yogurt" },
  "cream-cheese": { ingredientId: "lactose-free-cream-cheese" },
  cheddar: { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "sharp-cheddar": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  colby: { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "colby-jack": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "monterey-jack": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "pepper-jack": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  mozzarella: { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "fresh-mozzarella": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  provolone: { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "american-cheese": { ingredientId: "follow-your-heart-dairy-free-american-cheese-slices" },
  parmesan: { ingredientId: "nutritional-yeast" },
  pecorino: { ingredientId: "nutritional-yeast" },
  romano: { ingredientId: "nutritional-yeast" },
  mascarpone: { ingredientId: "coconut-cream" },
  ricotta: { ingredientId: "coconut-yogurt" },
  "cottage-cheese": { ingredientId: "coconut-yogurt" },
  feta: { ingredientId: "lactose-free-feta" },
  "queso-fresco": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  "cheese-curds": { ingredientId: "daiya-dairy-free-cheddar-shreds" },
  ghee: { ingredientId: "butter" },
  garlic: { ingredientId: "garlic-infused-oil" },
  "garlic-powder": { ingredientId: "garlic-infused-oil", unit: "tsp" },
  onion: { ingredientId: "chives" },
  "yellow-onion": { ingredientId: "chives" },
  "red-onion": { ingredientId: "chives" },
  "white-onion": { ingredientId: "chives" },
  "sweet-onion": { ingredientId: "chives" },
  "pearl-onion": { ingredientId: "chives" },
  "green-onion": { ingredientId: "chives" },
  shallot: { ingredientId: "chives" },
  leek: { ingredientId: "chives" },
  "wheat-flour": { ingredientId: "gf-flour" },
  "bread-flour": { ingredientId: "gf-flour" },
  "whole-wheat-flour": { ingredientId: "gf-flour" },
  "cake-flour": { ingredientId: "gf-flour" },
  "self-rising-flour": { ingredientId: "gf-flour" },
  "wheat-bread": { ingredientId: "sourdough-bread" },
  "white-bread": { ingredientId: "sourdough-bread" },
  "wheat-pasta": { ingredientId: "gf-pasta" },
  spaghetti: { ingredientId: "gf-pasta" },
  penne: { ingredientId: "gf-pasta" },
  macaroni: { ingredientId: "gf-pasta" },
  "lasagna-noodles": { ingredientId: "gf-pasta" },
  orzo: { ingredientId: "gf-pasta" },
  "flour-tortilla": { ingredientId: "corn-tortilla" },
  breadcrumbs: { ingredientId: "gf-breadcrumbs" },
  panko: { ingredientId: "gf-breadcrumbs" },
  crackers: { ingredientId: "gf-crackers" },
  pretzels: { ingredientId: "gf-pretzels" },
  "hamburger-bun": { ingredientId: "gf-bread" },
  "hot-dog-bun": { ingredientId: "gf-bread" },
  pita: { ingredientId: "corn-tortilla" },
  bagel: { ingredientId: "gf-bread" },
  "english-muffin": { ingredientId: "gf-bread" },
  croissant: { ingredientId: "gf-bread" },
  doughnut: { ingredientId: "gf-bread" },
  crumpet: { ingredientId: "gf-bread" },
  "pop-tart": { ingredientId: "rice-cake" },
  "pizza-dough": { ingredientId: "corn-tortilla" },
  "pizza-crust": { ingredientId: "corn-tortilla" },
  "pie-crust": { ingredientId: "gf-flour" },
  "puff-pastry": { ingredientId: "gf-flour" },
  "crescent-roll-dough": { ingredientId: "gf-flour" },
  "biscuit-dough": { ingredientId: "gf-flour" },
  "dumpling-wrappers": { ingredientId: "rice-paper" },
  udon: { ingredientId: "rice-noodle" },
  "ramen-noodles": { ingredientId: "rice-noodle" },
  "egg-noodles": { ingredientId: "rice-noodle" },
  couscous: { ingredientId: "quinoa" },
  barley: { ingredientId: "white-rice" },
  cereal: { ingredientId: "rice-cereal" },
  granola: { ingredientId: "gf-oats" },
  "soy-sauce": { ingredientId: "soy-sauce-gf" },
  "oyster-sauce": { ingredientId: "coconut-aminos" },
  honey: { ingredientId: "maple-syrup" },
  honeycomb: { ingredientId: "maple-syrup" },
  "brown-sugar": { ingredientId: "white-sugar" },
  "light-brown-sugar": { ingredientId: "white-sugar" },
  "dark-brown-sugar": { ingredientId: "white-sugar" },
  molasses: { ingredientId: "maple-syrup" },
  "chicken-broth": { ingredientId: "garlic-free-broth" },
  "beef-broth": { ingredientId: "garlic-free-broth" },
  "vegetable-broth": { ingredientId: "garlic-free-broth" },
  "fish-stock": { ingredientId: "garlic-free-broth" },
  marinara: { ingredientId: "crushed-tomato" },
  "tomato-sauce": { ingredientId: "crushed-tomato" },
  salsa: { ingredientId: "diced-tomato" },
  "pico-de-gallo": { ingredientId: "diced-tomato" },
  "salsa-verde": { ingredientId: "diced-tomato" },
  "enchilada-sauce": { ingredientId: "crushed-tomato" },
  "bbq-sauce": { ingredientId: "tomato-paste" },
  pesto: { ingredientId: "basil" },
  "chili-powder": { ingredientId: "paprika" },
  "taco-seasoning": { ingredientId: "cumin" },
  "italian-seasoning": { ingredientId: "oregano" },
  "cajun-seasoning": { ingredientId: "paprika" },
  "chipotle-in-adobo": { ingredientId: "smoked-paprika" },
  gochujang: { ingredientId: "paprika" },
  doubanjiang: { ingredientId: "paprika" },
  vegemite: { ingredientId: "mustard" },
  ketchup: { ingredientId: "tomato-paste" },
  "soy-milk": { ingredientId: "almond-milk" },
};

function stripSuffix(title: string): string {
  return title.replace(/\s*\((?:HA|Not-HA)\)\s*$/i, "").trim();
}

function withSuffix(title: string, suffix: "HA" | "Not-HA"): string {
  return `${stripSuffix(title)} (${suffix})`;
}

function swapLine(line: IngredientLine): IngredientLine | "drop" | "blocked" {
  if (STAR_FORBIDDEN.has(line.ingredientId)) {
    return line.optional ? "drop" : "blocked";
  }
  const swap = SWAPS[line.ingredientId];
  if (!swap) {
    return line;
  }
  let amount = swap.amount ?? line.amount;
  let unit = swap.unit !== undefined ? swap.unit : line.unit;
  if (line.ingredientId === "garlic" && (line.unit === "clove" || line.unit === "cloves")) {
    amount = Math.max(1, (line.amount ?? 2) * 0.5);
    unit = "tbsp";
  }
  return {
    ...line,
    ingredientId: swap.ingredientId,
    amount,
    unit,
    preparation: swap.preparation ?? line.preparation,
  };
}

function convertIngredients(recipe: HomeRecipe): IngredientLine[] | null {
  const next: IngredientLine[] = [];
  for (const line of recipe.ingredients) {
    const result = swapLine(line);
    if (result === "drop") {
      continue;
    }
    if (result === "blocked") {
      return null;
    }
    next.push(result);
  }
  return next;
}

function linesAreHa(lines: readonly IngredientLine[]): boolean {
  return (
    classifyRecipeHa({ eatOut: false, ingredients: [...lines] } as HomeRecipe, ingredientLookup) ===
    "ha-assumed"
  );
}

function rewriteSteps(recipe: HomeRecipe): string[] {
  const replacements: Array<[string, string]> = [];
  for (const line of recipe.ingredients) {
    const mapped = SWAPS[line.ingredientId]?.ingredientId;
    if (!mapped) {
      continue;
    }
    const fromName = ingredientLookup.get(line.ingredientId)?.name;
    const toName = ingredientLookup.get(mapped)?.name;
    if (fromName && toName && fromName !== toName) {
      replacements.push([fromName, toName]);
    }
  }
  replacements.sort((a, b) => b[0].length - a[0].length);
  return recipe.steps.map((step) => {
    let next = step;
    for (const [from, to] of replacements) {
      next = next.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), to);
    }
    return next;
  });
}

function serializeLine(line: IngredientLine): string {
  const parts = [
    `ingredientId: ${JSON.stringify(line.ingredientId)}`,
    `amount: ${line.amount === null ? "null" : line.amount}`,
    `unit: ${line.unit === null ? "null" : JSON.stringify(line.unit)}`,
  ];
  if (line.preparation) {
    parts.push(`preparation: ${JSON.stringify(line.preparation)}`);
  }
  if (line.optional) {
    parts.push("optional: true");
  }
  return `      { ${parts.join(", ")} }`;
}

function serializeRecipe(recipe: HomeRecipe): string {
  const related =
    recipe.relatedRecipeIds && recipe.relatedRecipeIds.length > 0
      ? `    relatedRecipeIds: ${JSON.stringify(recipe.relatedRecipeIds)},\n`
      : "";
  const notes = recipe.notes ? `    notes: ${JSON.stringify(recipe.notes)},\n` : "";
  return `  {
    id: ${JSON.stringify(recipe.id)},
    title: ${JSON.stringify(recipe.title)},
    mealType: ${JSON.stringify(recipe.mealType)},
    cuisine: ${JSON.stringify(recipe.cuisine)},
    specialOccasion: ${recipe.specialOccasion},
    ha: ${JSON.stringify(recipe.ha)},
    healthRating: ${JSON.stringify(recipe.healthRating)},
    eatOut: false,
${related}    prepMinutes: ${recipe.prepMinutes},
    cookMinutes: ${recipe.cookMinutes},
    servings: ${recipe.servings},
    ingredients: [
${recipe.ingredients.map(serializeLine).join(",\n")}
    ],
    steps: [
${recipe.steps.map((step) => `      ${JSON.stringify(step)}`).join(",\n")}
    ],
${notes}  }`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function patchTitleSimple(source: string, id: string, nextTitle: string): string {
  const pattern = new RegExp(`(id: "${escapeRegExp(id)}",\\n    title: )"[^"]*"`);
  return source.replace(pattern, `$1${JSON.stringify(nextTitle)}`);
}

function insertRelated(source: string, id: string, relatedId: string): string {
  const existing = new RegExp(
    `(id: "${escapeRegExp(id)}"[\\s\\S]*?relatedRecipeIds: \\[)([^\\]]*)(\\])`,
  );
  if (existing.test(source)) {
    return source.replace(existing, (full, prefix: string, inner: string, suffix: string) => {
      if (inner.includes(`"${relatedId}"`)) {
        return full;
      }
      const trimmed = inner.trim();
      const next =
        trimmed.length === 0 ? `"${relatedId}"` : `${trimmed.replace(/,$/, "")}, "${relatedId}"`;
      return `${prefix}${next}${suffix}`;
    });
  }

  const eatOut = new RegExp(`(id: "${escapeRegExp(id)}",[\\s\\S]*?eatOut: false,)\\n`);
  if (eatOut.test(source)) {
    return source.replace(eatOut, `$1\n    relatedRecipeIds: ["${relatedId}"],\n`);
  }

  const servings = new RegExp(`(id: "${escapeRegExp(id)}",[\\s\\S]*?servings: \\d+,)\\n`);
  return source.replace(servings, `$1\n    relatedRecipeIds: ["${relatedId}"],\n`);
}

const EXTRA_LINKS: Record<string, string[]> = {
  "cereal-and-milk": ["cereal-and-milk"],
  "coffee-drink": ["drip-coffee"],
  "tea-drink": ["steeped-tea"],
  "water-drink": ["glass-of-water"],
  "milk-drink": ["glass-of-milk"],
  "pork-chops-plate": ["mashed-potatoes", "pan-gravy", "roasted-green-beans"],
  "steak-and-potatoes": ["mashed-potatoes", "roasted-green-beans"],
  "chicken-rice-vegetables": ["steamed-rice", "steamed-broccoli"],
  "baked-chicken-plate": ["steamed-rice", "roasted-green-beans"],
  "salmon-and-sides": ["steamed-rice", "steamed-broccoli"],
  "meatloaf-plate": ["mashed-potatoes", "roasted-green-beans"],
  "sunday-roast": ["mashed-potatoes", "pan-gravy", "roasted-green-beans"],
  "bangers-and-mash": ["bangers", "mashed-potatoes", "pan-gravy"],
  "frittata-plate": ["veggie-frittata"],
  "congee-bowl": ["congee-with-egg"],
  "caprese-plate": ["caprese-salad"],
  "risotto-idea": ["parmesan-risotto", "mushroom-risotto"],
  "polenta-and-sausage": ["creamy-polenta-sausage"],
  "cottage-pie-idea": ["shepherds-pie"],
  "coconut-dessert": ["coconut-rice-pudding", "coconut-macaroons", "coconut-flan"],
  "toast-and-jam-breakfast": ["toast-and-jam"],
  pancakes: ["cornmeal-pancakes", "coconut-pancakes"],
  waffles: ["gf-waffles"],
  "huevos-rancheros-idea": ["huevos-rancheros"],
  "chilaquiles-plate": ["chilaquiles"],
  "migas-plate": ["migas"],
  "fried-egg-rice-breakfast": ["fried-egg-rice", "leftover-rice-breakfast"],
  "japanese-rice-breakfast": ["sesame-rice-breakfast", "grilled-fish-breakfast", "miso-soup"],
};

const LABEL_TO_ID: Record<string, string> = {
  "Cereal and Milk": "cereal-and-milk",
  Coffee: "drip-coffee",
  Tea: "steeped-tea",
  Water: "glass-of-water",
  Milk: "glass-of-milk",
  "Peanut Butter and Jelly Sandwich": "pb-and-j",
  "Mashed Potatoes": "mashed-potatoes",
  "Pan Gravy": "pan-gravy",
  Bagels: "bagel-and-cream-cheese",
  "Pop-Tarts": "pop-tarts",
  "Toaster Strudel": "toaster-strudel",
  Doughnuts: "doughnuts",
  "Breakfast Muffins": "breakfast-muffins",
  Croissants: "croissants",
  "Brioche Toast": "brioche-toast",
  Crepes: "crepes",
  "Pan Dulce": "pan-dulce",
  "Cinnamon Rolls": "cinnamon-rolls",
  Scones: "scones",
  "Biscuits and Gravy": "biscuits-and-gravy",
  "Stovetop Mac and Cheese": "stovetop-mac-and-cheese",
  "Hot Pockets": "hot-pockets",
  "Meatloaf Sandwich": "meatloaf-sandwich",
  Cornbread: "cornbread",
  "Homemade Pizza": "homemade-pizza",
  "Baked Mac and Cheese": "baked-mac-and-cheese",
  "Cheese and Crackers": "cheese-and-crackers",
  "Granola Bar": "granola-bar",
  Pretzels: "pretzels-snack",
  Jerky: "beef-jerky-snack",
  "Leftover Muffin or Pastry": "leftover-muffin",
  "Homemade Ice Cream": "homemade-ice-cream",
  Pie: "fruit-pie",
  "Chocolate or Candy": "chocolate-candy",
  "Orange Juice": "orange-juice-glass",
  "Hot Chocolate": "hot-chocolate-mug",
  "Protein Shake": "protein-shake",
  Soda: "soda-pour",
  "Energy Drink": "energy-drink-can",
  "Sports Drink (Gatorade)": "sports-drink-pour",
  "Egg in a Hole": "egg-in-a-hole",
  "English Muffins": "english-muffins-butter",
  "Weet-Bix": "weet-bix-bowl",
  "Vegemite on Toast": "vegemite-on-toast",
  "Beans on Toast": "beans-on-toast",
  "Mince on Toast": "mince-on-toast",
  Crumpets: "crumpets-butter",
  "Café con Leche": "cafe-con-leche",
  Espresso: "espresso",
  "Soy Milk": "soy-milk-warm",
  Congee: "congee-with-egg",
  Youtiao: "youtiao",
  Baozi: "baozi",
  "Miso Soup": "miso-soup",
  "Grilled Fish": "grilled-fish-breakfast",
  "Natto Rice": "natto-rice",
  "Korean Breakfast Rice": "korean-breakfast-rice",
  "Pão de Queijo": "pao-de-queijo",
  "Açaí Bowl": "acai-bowl",
  Tamales: "tamales",
  Frittata: "veggie-frittata",
  "Peameal Bacon Sandwich": "peameal-bacon-sandwich",
  "Full English Breakfast": "full-english",
  "Fish and Chips": "fish-and-chips",
  "Meat Pie": "meat-pie",
  "Sausage Roll": "sausage-roll",
  Poutine: "poutine",
  "Ploughman's Lunch": "ploughmans",
  Kimbap: "kimbap",
  Bento: "leftover-rice-bowl",
  Ramen: "ramen-bowl",
  Udon: "udon-bowl",
  Phở: "pho-bowl",
  Torta: "torta",
  Cemita: "cemita",
  Panini: "panini",
  Caprese: "caprese-salad",
  Tapioca: "tapioca-crepe",
  Gyro: "gyro",
  "Bangers and Mash": "bangers",
  "Cottage Pie": "shepherds-pie",
  "Chicken Parma": "chicken-parma",
  Schnitzel: "schnitzel",
  Milanesa: "milanesa",
  Risotto: "parmesan-risotto",
  Carbonara: "carbonara",
  Gnocchi: "gnocchi",
  "Polenta and Sausage": "creamy-polenta-sausage",
  Feijoada: "feijoada",
  Churrasco: "churrasco",
  Bibimbap: "bibimbap",
  "Kimchi Jjigae": "kimchi-jjigae",
  Donburi: "donburi",
  "Japanese Curry": "japanese-curry",
  Dumplings: "dumplings",
  "Mapo Tofu": "mapo-tofu",
  "Hot Pot": "hot-pot",
  Pozole: "pozole",
  "Chicken Mole": "chicken-mole",
  "Pad Thai": "pad-thai-home",
  Kebab: "kebab",
  "Moules Frites": "moules-frites",
  Onigiri: "onigiri",
  Tteokbokki: "tteokbokki",
  Potstickers: "potstickers",
  "Fairy Bread": "fairy-bread",
  "Nanaimo Bars": "nanaimo-bars",
  Brigadeiro: "brigadeiro",
  Pavlova: "pavlova",
  Lamingtons: "lamingtons",
  "Sticky Toffee Pudding": "sticky-toffee-pudding",
  Tiramisu: "tiramisu",
  Gelato: "gelato",
  Mochi: "mochi-dessert",
  "Red Bean Soup": "red-bean-soup",
  "Tres Leches": "tres-leches",
  Cannoli: "cannoli",
  Atole: "atole",
  "Agua Fresca": "agua-fresca",
  Horchata: "horchata",
  "Bubble Tea": "bubble-tea",
  "Barley Tea": "barley-tea",
  Guaraná: "guarana-soda",
};

type Plan = {
  titleById: Map<string, string>;
  relatedById: Map<string, string>;
  companions: HomeRecipe[];
};

function planRewrite(catalog: readonly Recipe[]): Plan {
  const existingIds = new Set(catalog.map((recipe) => recipe.id));
  const titleById = new Map<string, string>();
  const relatedById = new Map<string, string>();
  const companions: HomeRecipe[] = [];

  for (const recipe of catalog) {
    if (!isHomeRecipe(recipe)) {
      continue;
    }
    if (recipe.id.endsWith("-ha")) {
      titleById.set(recipe.id, withSuffix(recipe.title, "HA"));
      continue;
    }
    const status = classifyRecipeHa(recipe, ingredientLookup);
    if (status === "ha-assumed" || status === "ha-confirmed") {
      titleById.set(recipe.id, withSuffix(recipe.title, "HA"));
      continue;
    }
    titleById.set(recipe.id, withSuffix(recipe.title, "Not-HA"));
    const converted = convertIngredients(recipe);
    if (!converted || !linesAreHa(converted)) {
      continue;
    }
    const haId = `${recipe.id}-ha`;
    if (existingIds.has(haId)) {
      relatedById.set(recipe.id, haId);
      continue;
    }
    const base = stripSuffix(recipe.title);
    companions.push({
      ...recipe,
      id: haId,
      title: `${base} (HA)`,
      ha: "ha-assumed",
      relatedRecipeIds: [recipe.id],
      ingredients: converted,
      steps: rewriteSteps(recipe),
      notes: recipe.notes,
    });
    relatedById.set(recipe.id, haId);
  }

  return { titleById, relatedById, companions };
}

function formatRecipeRefs(
  refs: readonly MealIdeaRecipeRef[],
  catalog: Map<string, Recipe>,
): string {
  const lines = refs.map((ref) => {
    const recipe = ref.recipeId ? catalog.get(ref.recipeId) : undefined;
    const label = recipe?.title ?? ref.label;
    if (!ref.recipeId) {
      return `      { label: ${JSON.stringify(label)} }`;
    }
    return `      { label: ${JSON.stringify(label)}, recipeId: ${JSON.stringify(ref.recipeId)} }`;
  });
  return `    recipes: [\n${lines.join(",\n")},\n    ]`;
}

function upsertRecipesField(source: string, ideaId: string, block: string): string {
  const idToken = `id: "${ideaId}"`;
  const start = source.indexOf(idToken);
  if (start < 0) {
    throw new Error(`Meal idea ${ideaId} not found`);
  }
  const nextId = source.indexOf('\n    id: "', start + idToken.length);
  const sliceEnd = nextId < 0 ? source.length : nextId;
  const objectSlice = source.slice(start, sliceEnd);
  const recipesMatch = objectSlice.match(/\n    recipes: \[[\s\S]*?\n    \]/);
  if (recipesMatch && recipesMatch.index !== undefined) {
    const before = source.slice(0, start + recipesMatch.index);
    const after = source.slice(start + recipesMatch.index + recipesMatch[0].length);
    return `${before}\n${block}${after}`;
  }
  const closing = objectSlice.lastIndexOf("\n  },");
  const insertAt = closing >= 0 ? start + closing : start + objectSlice.length;
  return `${source.slice(0, insertAt)},\n${block}${source.slice(insertAt)}`;
}

function expandIdeaRefs(
  ideaId: string,
  current: readonly MealIdeaRecipeRef[] | undefined,
  catalog: Map<string, Recipe>,
  relatedById: Map<string, string>,
): MealIdeaRecipeRef[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  const add = (id: string | undefined) => {
    if (!id || seen.has(id) || !catalog.has(id)) {
      return;
    }
    seen.add(id);
    ids.push(id);
    const haId = relatedById.get(id);
    if (haId && catalog.has(haId) && !seen.has(haId)) {
      seen.add(haId);
      ids.push(haId);
    }
    const recipe = catalog.get(id);
    for (const related of recipe?.relatedRecipeIds ?? []) {
      if (!seen.has(related) && catalog.has(related)) {
        seen.add(related);
        ids.push(related);
      }
    }
  };

  for (const ref of current ?? []) {
    if (ref.recipeId) {
      add(ref.recipeId);
    } else {
      add(LABEL_TO_ID[ref.label]);
    }
  }
  for (const extra of EXTRA_LINKS[ideaId] ?? []) {
    add(extra);
  }

  return ids.map((id) => {
    const recipe = catalog.get(id);
    return { label: recipe?.title ?? id, recipeId: id };
  });
}

async function main() {
  const plan = planRewrite(recipes);
  const companionPath = path.join(RECIPE_DIR, "ha-variants.ts");
  const companionSource = `import type { Recipe } from "../types.ts";

export const haVariants: Recipe[] = [
${plan.companions.map(serializeRecipe).join(",\n")}
];
`;
  await writeFile(companionPath, companionSource);
  console.log(`Wrote ${plan.companions.length} HA companions to ha-variants.ts`);

  const names = (await readdir(RECIPE_DIR)).filter(
    (name) => name.endsWith(".ts") && name !== "index.ts" && name !== "ha-variants.ts",
  );
  for (const name of names) {
    const filePath = path.join(RECIPE_DIR, name);
    let source = await readFile(filePath, "utf8");
    const original = source;
    for (const [id, title] of plan.titleById) {
      source = patchTitleSimple(source, id, title);
    }
    for (const [id, relatedId] of plan.relatedById) {
      source = insertRelated(source, id, relatedId);
    }
    if (source !== original) {
      await writeFile(filePath, source);
      console.log(`Patched ${name}`);
    }
  }

  const indexPath = path.join(RECIPE_DIR, "index.ts");
  let indexSource = await readFile(indexPath, "utf8");
  if (!indexSource.includes("ha-variants")) {
    indexSource = indexSource.replace(
      'import { fromMealIdeasRegional } from "./from-meal-ideas-regional.ts";\n',
      'import { fromMealIdeasRegional } from "./from-meal-ideas-regional.ts";\nimport { haVariants } from "./ha-variants.ts";\n',
    );
    indexSource = indexSource.replace(
      "  ...fromMealIdeasRegional,\n",
      "  ...fromMealIdeasRegional,\n  ...haVariants,\n",
    );
    await writeFile(indexPath, indexSource);
  }

  const companionRecipes: Recipe[] = plan.companions;
  const catalog = new Map<string, Recipe>();
  for (const recipe of recipes) {
    const title = plan.titleById.get(recipe.id) ?? recipe.title;
    const related = plan.relatedById.get(recipe.id);
    catalog.set(recipe.id, {
      ...recipe,
      title,
      relatedRecipeIds: related
        ? [...(recipe.relatedRecipeIds ?? []), related]
        : recipe.relatedRecipeIds,
    });
  }
  for (const recipe of companionRecipes) {
    catalog.set(recipe.id, recipe);
  }

  for (const fileName of ["mealIdeas.ts", "mealIdeasExtra.ts"]) {
    const filePath = path.join(ROOT, "src", "data", fileName);
    let source = await readFile(filePath, "utf8");
    for (const idea of mealIdeas) {
      if (fileName === "mealIdeas.ts" && !source.includes(`id: "${idea.id}"`)) {
        continue;
      }
      if (fileName === "mealIdeasExtra.ts" && !source.includes(`id: "${idea.id}"`)) {
        continue;
      }
      const refs = expandIdeaRefs(idea.id, idea.recipes, catalog, plan.relatedById);
      if (refs.length === 0) {
        continue;
      }
      source = upsertRecipesField(source, idea.id, formatRecipeRefs(refs, catalog));
    }
    await writeFile(filePath, source);
    console.log(`Updated linked recipes in ${fileName}`);
  }
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 1;
}
