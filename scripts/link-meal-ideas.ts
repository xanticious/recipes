/**
 * Replace Meal Idea linked recipes with HA / Not-HA catalog entries.
 *
 *   node --experimental-strip-types scripts/link-meal-ideas.ts
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mealIdeas, recipes } from "../src/data/index.ts";
import type { MealIdeaRecipeRef, Recipe } from "../src/data/types.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

function relatedHaMap(catalog: Map<string, Recipe>): Map<string, string> {
  const map = new Map<string, string>();
  for (const recipe of catalog.values()) {
    for (const related of recipe.relatedRecipeIds ?? []) {
      if (related === `${recipe.id}-ha`) {
        map.set(recipe.id, related);
      }
    }
  }
  return map;
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
    if (haId) {
      add(haId);
    }
    const recipe = catalog.get(id);
    for (const related of recipe?.relatedRecipeIds ?? []) {
      add(related);
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

function formatRecipeRefs(refs: readonly MealIdeaRecipeRef[]): string {
  const lines = refs.map(
    (ref) =>
      `      { label: ${JSON.stringify(ref.label)}, recipeId: ${JSON.stringify(ref.recipeId)} }`,
  );
  return `    recipes: [\n${lines.join(",\n")},\n    ]`;
}

function replaceRecipesField(objectSlice: string, block: string): string {
  const recipesIdx = objectSlice.search(/\n    recipes: \[/);
  if (recipesIdx >= 0) {
    const from = recipesIdx;
    const bracketStart = objectSlice.indexOf("[", from);
    let depth = 0;
    let end = bracketStart;
    for (let i = bracketStart; i < objectSlice.length; i += 1) {
      const ch = objectSlice[i];
      if (ch === "[") {
        depth += 1;
      } else if (ch === "]") {
        depth -= 1;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    return objectSlice.slice(0, from) + "\n" + block + objectSlice.slice(end);
  }
  const closing = objectSlice.indexOf("\n  },");
  if (closing < 0) {
    throw new Error("Could not find object close");
  }
  const before = objectSlice.slice(0, closing).replace(/,?\s*$/, ",");
  return `${before}\n${block}${objectSlice.slice(closing)}`;
}

async function patchFile(
  fileName: string,
  catalog: Map<string, Recipe>,
  relatedById: Map<string, string>,
) {
  const filePath = path.join(ROOT, "src", "data", fileName);
  let source = await readFile(filePath, "utf8");
  for (const idea of mealIdeas) {
    const idToken = `id: "${idea.id}"`;
    const start = source.indexOf(idToken);
    if (start < 0) {
      continue;
    }
    const close = source.indexOf("\n  },", start);
    if (close < 0) {
      throw new Error(`Could not find object close for ${idea.id}`);
    }
    const sliceEnd = close + "\n  },".length;
    const objectSlice = source.slice(start, sliceEnd);
    const refs = expandIdeaRefs(idea.id, idea.recipes, catalog, relatedById);
    if (refs.length === 0) {
      continue;
    }
    const nextSlice = replaceRecipesField(objectSlice, formatRecipeRefs(refs));
    source = source.slice(0, start) + nextSlice + source.slice(sliceEnd);
  }
  await writeFile(filePath, source);
  console.log(`Updated ${fileName}`);
}

const catalog = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const relatedById = relatedHaMap(catalog);
await patchFile("mealIdeas.ts", catalog, relatedById);
await patchFile("mealIdeasExtra.ts", catalog, relatedById);
