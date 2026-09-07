/**
 * Search Unsplash (free license) for each meal idea and save a local JPEG
 * when the photo text actually mentions the plate. Re-run to fill gaps.
 *
 *   node --experimental-strip-types scripts/fetch-meal-idea-photos.ts
 */
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MEAL_IDEA_PHOTOS, type MealIdeaPhoto } from "../src/data/mealIdeaPhotos.data.ts";
import { mealIdeas } from "../src/data/mealIdeas.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "meal-ideas");
const DATA_FILE = path.join(ROOT, "src", "data", "mealIdeaPhotos.data.ts");

const SEARCH_DELAY_MS = 300;
const FIRST_QUERY_PAGES = 2;
const EXTRA_QUERY_PAGES = 1;
const MAX_QUERIES = 5;
const PER_PAGE = 20;
const MIN_SCORE = 1;
const IMAGE_QUERY = "w=720&h=540&fit=crop&crop=entropy&fm=jpg&q=72";
const LIMIT = Number.parseInt(process.env.MEAL_IDEA_PHOTO_LIMIT ?? "", 10);

const STOPWORDS = new Set([
  "and",
  "or",
  "the",
  "with",
  "of",
  "for",
  "a",
  "an",
  "night",
  "plate",
  "bowl",
  "cup",
  "sides",
  "lunch",
  "snack",
  "dessert",
  "drink",
  "idea",
]);

const MANUAL_PHOTOS: Record<string, string> = {
  "cereal-and-milk": "tVmiO2k9q2I",
  "doughnut-and-coffee": "0bZObncZ58Y",
  "yogurt-and-fruit": "9oDxUu6CUOw",
  "breakfast-burrito": "1r_k74aEK58",
  "toaster-pastry": "3P_DpqWUexE",
  "water-drink": "rCzy18K9hq0",
  "guarana-soda": "TIB72_d8ah4",
  "protein-shake": "JfWhrxbmF-U",
};

/** Reuse another plate's saved JPEG and credit (breakfast Smoothie uses the drinks Smoothie). */
const COPY_FROM: Record<string, string> = {
  "breakfast-smoothie": "smoothie-drink",
};

const EXTRA_QUERIES: Record<string, readonly string[]> = {
  "leftover-dinner-plate": ["homemade dinner", "home cooked meal", "plated leftovers"],
  "leftover-rice-bowl-idea": ["rice bowl", "leftover rice"],
  "leftover-pastry-snack": ["muffin pastry", "breakfast pastry"],
  "toaster-pastry": ["pop tart", "poptart"],
  "toaster-strudel": ["apple pastry", "strudel pastry", "toaster strudel"],
  "hot-pocket": ["hot pocket", "savory pastry"],
  "wrap-lunch": ["wrap sandwich", "chicken wrap"],
  "salad-plate": ["dinner salad", "garden salad plate"],
  "chili-bowl": ["bowl of chili"],
  "baked-chicken-plate": ["baked chicken dinner", "roast chicken plate"],
  "pasta-marinara": ["spaghetti marinara", "pasta tomato sauce"],
  "soup-night": ["bowl of soup"],
  "salmon-and-sides": ["salmon dinner", "baked salmon plate"],
  "pork-chops-plate": ["pork chops dinner", "pork chop potatoes"],
  "chicken-rice-vegetables": ["chicken rice vegetables", "chicken and rice dinner"],
  "meatloaf-plate": ["meatloaf dinner", "meatloaf mashed potatoes"],
  "meatloaf-sandwich": ["meatloaf sandwich", "hot meat sandwich"],
  "wings-and-sides": ["chicken wings", "buffalo wings"],
  "mac-and-cheese-night": ["mac and cheese"],
  "fried-rice-night": ["fried rice"],
  "tamales-dinner": ["tamales"],
  "sunday-roast": ["roast chicken dinner"],
  "fruit-cup-snack": ["fruit salad", "cup of fruit"],
  "granola-bar": ["granola bar"],
  "trail-mix": ["mixed nuts raisins", "nuts dried fruit"],
  "water-drink": ["glass of water"],
  "soda-drink": ["soda can", "soft drink"],
  "energy-drink": ["energy drink can"],
  "sports-drink": ["sports drink bottle"],
  "protein-shake": ["banana protein shake", "protein smoothie"],
  "weet-bix": ["weetbix", "weet-bix cereal"],
  "youtiao-and-soy-milk": ["youtiao", "chinese fried dough"],
  "baozi-breakfast": ["baozi", "steamed buns"],
  "japanese-rice-breakfast": ["japanese breakfast", "grilled fish rice"],
  "korean-rice-soup-breakfast": ["korean breakfast", "banchan"],
  "pao-de-queijo-breakfast": ["pao de queijo", "brazilian cheese bread"],
  "peameal-bacon-sandwich": ["bacon sandwich", "back bacon"],
  "ploughmans-lunch": ["cheese pickle bread", "ploughman lunch"],
  "chicken-parma-au": ["chicken parmigiana", "breaded chicken"],
  "cemita-or-torta": ["cemita", "mexican torta"],
  "tapioca-crepe": ["tapioca pancake", "cassava pancake"],
  "red-bean-dessert": ["red bean dessert", "anko dessert"],
  "coconut-dessert": ["coconut dessert", "coconut pudding"],
  "gyro-or-doner": ["gyro", "doner kebab"],
  "huevos-or-chilaquiles": ["huevos rancheros", "chilaquiles"],
  "huevos-rancheros-idea": ["ranchero eggs", "mexican fried eggs"],
  "pancakes-or-waffles": ["pancakes", "waffles"],
  "turkey-sandwich": ["turkey sandwich", "ham sandwich"],
  "tuna-or-egg-sandwich": ["tuna sandwich", "egg salad sandwich"],
  "chocolate-or-candy": ["chocolate bar", "candy"],
  "cake-or-cupcake": ["cake", "cupcake"],
  "flan-or-custard": ["flan", "custard"],
  churros: ["churros", "cinnamon sugar tortillas"],
  "pb-and-j": ["peanut butter and jelly sandwich"],
  "hummus-and-veg": ["hummus vegetables", "hummus platter"],
  "apple-and-peanut-butter-snack": ["apple peanut butter"],
  "doughnut-and-coffee": ["doughnut with coffee", "donut with coffee"],
  "bagel-and-cream-cheese": ["bagel cream cheese"],
  "biscuits-and-gravy": ["sausage gravy", "buttermilk biscuits"],
  "potato-hash-and-eggs": ["hash and eggs", "potato hash"],
  "breakfast-burrito": ["breakfast burrito"],
  "english-muffin-and-butter": ["english muffin"],
  "toast-and-jam-breakfast": ["toast and jam", "jam on toast"],
  "fried-egg-rice-breakfast": ["fried egg rice", "egg on rice"],
  "natto-rice": ["natto"],
  "mince-on-toast": ["minced beef toast", "ground beef toast"],
  "vegemite-on-toast": ["vegemite", "yeast spread toast"],
  "toad-in-the-hole": ["yorkshire pudding", "sausage yorkshire pudding"],
  "full-english-breakfast": ["full english breakfast"],
  "cafe-con-leche-and-bread": ["cafe con leche", "coffee and bread"],
  "tamale-pie-idea": ["tamale pie"],
  "chicken-rice-casserole-idea": ["chicken casserole", "baked chicken rice"],
  "tuna-casserole-idea": ["tuna pasta", "tuna bake"],
  "breakfast-casserole-dinner": ["egg bake", "breakfast bake"],
  "orange-chicken-idea": ["orange chicken"],
  "butter-chicken-idea": ["butter chicken"],
  "dal-and-rice": ["dal rice", "dal and rice"],
  "carne-asada-plate": ["carne asada"],
  "mapo-tofu-idea": ["mapo tofu"],
  "mole-and-rice": ["mole poblano", "mexican red sauce rice"],
  "dumplings-and-rice": ["dumplings rice", "chinese dumplings"],
  "japanese-curry-idea": ["japanese curry"],
  "moules-frites": ["moules frites", "mussels fries"],
  "schnitzel-plate": ["schnitzel potatoes", "wiener schnitzel"],
  "polenta-and-sausage": ["polenta", "sausage tomatoes"],
  "bangers-and-mash": ["sausage mash", "sausages mashed potatoes"],
  "fairy-bread": ["fairy bread"],
  "nanaimo-bar-snack": ["chocolate coconut bar", "layered chocolate bar"],
  "brigadeiro-snack": ["brigadeiro"],
  "lamington-dessert": ["coconut sponge", "chocolate coconut cake"],
  "sticky-toffee-pudding": ["sticky toffee pudding"],
  "guarana-soda": ["guarana soda", "guarana drink", "guarana beverage"],
  "atole-drink": ["atole"],
  "agua-fresca": ["fruit water", "fresh fruit drink"],
  "barley-tea": ["roasted barley", "mugicha"],
  "pan-dulce": ["pan dulce", "mexican sweet bread"],
  "pho-bowl": ["pho", "vietnamese pho"],
  "acai-bowl": ["acai bowl"],
  "bento-lunch": ["bento box"],
  "kimbap-lunch": ["kimbap", "gimbap"],
  "donburi-idea": ["donburi"],
  "feijoada-idea": ["brazilian black beans", "black bean stew"],
  "churrasco-plate": ["churrasco"],
  "kimchi-stew": ["korean stew", "kimchi soup"],
  "hot-pot-idea": ["hot pot"],
  "pozole-idea": ["pozole"],
  "pad-thai-idea": ["pad thai"],
  "kebab-plate": ["kebab plate", "shish kebab"],
  "tteokbokki-snack": ["tteokbokki"],
  "onigiri-snack": ["onigiri"],
  "potstickers-snack": ["pan fried dumplings", "dumplings"],
  "pavlova-dessert": ["pavlova"],
  "tiramisu-idea": ["tiramisu"],
  "gelato-dessert": ["gelato"],
  "mochi-dessert": ["mochi"],
  "tres-leches-idea": ["tres leches cake"],
  "cannoli-idea": ["cannoli"],
  "espresso-drink": ["espresso"],
  "cafe-con-leche-drink": ["cafe con leche"],
  "bubble-tea": ["bubble tea", "boba tea"],
  "horchata-drink": ["horchata"],
  "soy-milk-drink": ["soy milk"],
  "migas-plate": ["scrambled eggs tortilla", "tex mex eggs"],
  "beans-on-toast": ["beans on toast"],
  crumpets: ["crumpets"],
  "congee-bowl": ["congee"],
  "milanesa-plate": ["milanesa"],
  "cottage-pie-idea": ["cottage pie", "beef mashed potato"],
  "carbonara-idea": ["spaghetti carbonara"],
  "gnocchi-idea": ["gnocchi"],
  "risotto-idea": ["risotto"],
  "bibimbap-idea": ["bibimbap"],
  "fish-and-chips": ["fish and chips"],
  "sausage-roll": ["sausage roll"],
  "meat-pie-lunch": ["meat pie"],
  poutine: ["poutine"],
  "torta-mexicana": ["mexican torta"],
  "panini-lunch": ["pressed sandwich", "panini sandwich"],
  "caprese-plate": ["caprese"],
  "ramen-bowl": ["ramen"],
  "udon-bowl": ["udon"],
  "steak-and-potatoes": ["steak and potatoes"],
  "rice-and-beans-plate": ["rice and beans"],
  "shepherds-pie-idea": ["shepherd pie", "mashed potato casserole"],
  "chicken-pot-pie-idea": ["pot pie", "chicken pie"],
  "fettuccine-alfredo-idea": ["fettuccine alfredo"],
  "pesto-pasta-idea": ["pesto pasta"],
  "shrimp-scampi-idea": ["shrimp scampi"],
  "chicken-parm-idea": ["breaded chicken pasta", "chicken parmesan"],
  "pulled-pork-idea": ["pulled pork"],
  "sausage-and-peppers-idea": ["sausage peppers onions", "italian sausage peppers"],
  "stuffed-peppers-idea": ["stuffed peppers"],
  "jambalaya-idea": ["cajun rice", "creole rice shrimp"],
  "tostadas-idea": ["tostada", "mexican tostada"],
  "fish-tacos-idea": ["fish tacos"],
  "baked-ziti-idea": ["baked ziti"],
  "chips-and-dip": ["chips and dip"],
  "cheese-and-crackers": ["cheese and crackers"],
  "hard-boiled-eggs-snack": ["hard boiled eggs"],
  "rice-cakes-snack": ["rice cakes"],
  "fruit-crisp": ["fruit crisp", "apple crisp"],
  "mug-cake": ["mug cake"],
  "banana-bread-dessert": ["banana bread"],
  "hot-chocolate": ["hot chocolate"],
  "orange-juice": ["orange juice"],
  "smoothie-drink": ["smoothie"],
  "milk-drink": ["glass of milk"],
  "coffee-drink": ["cup of coffee"],
  "tea-drink": ["cup of tea"],
  "avocado-toast-idea": ["avocado toast"],
  "granola-and-milk-idea": ["granola milk"],
  "oatmeal-bowl": ["oatmeal bowl"],
  "yogurt-and-fruit": ["yogurt with fruit"],
  "cereal-and-milk": ["cereal with milk", "bowl of cereal"],
  "eggs-and-toast": ["eggs and toast"],
  "scrambled-eggs-and-toast": ["scrambled eggs toast"],
  "fried-eggs-and-toast": ["fried eggs toast"],
  "omelette-and-toast": ["omelette toast"],
  "bacon-and-eggs": ["bacon and eggs"],
};

type UnsplashPhoto = {
  id: string;
  plus?: boolean;
  premium?: boolean;
  alt_description: string | null;
  description: string | null;
  slug: string;
  urls?: { raw?: string; regular?: string; small?: string };
  user?: { name?: string; username?: string };
};

type SearchResponse = {
  total: number;
  results: UnsplashPhoto[];
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function foldAscii(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "");
}

function withInsteadOfAnd(value: string): string {
  return value.replace(/\s+and\s+/gi, " with ");
}

function primaryTitle(title: string): string {
  const withoutOr = title.split(/\s+or\s+/i)[0]?.trim() ?? title;
  return withoutOr.split(",")[0]?.trim() ?? withoutOr;
}

function searchQueries(id: string, title: string): string[] {
  const extras = EXTRA_QUERIES[id] ?? [];
  const primary = primaryTitle(title)
    .replace(/\s+Night$/i, "")
    .replace(/\s+Plate$/i, "")
    .replace(/\s+Bowl$/i, "")
    .replace(/\s+Cup$/i, "")
    .replace(/\s+for Dinner$/i, "");
  const withForm = withInsteadOfAnd(primary);
  return unique([...extras, withForm, foldAscii(withForm), primary, foldAscii(primary)]).slice(
    0,
    MAX_QUERIES,
  );
}

function tokensFrom(name: string): string[] {
  return foldAscii(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function hasToken(text: string, token: string): boolean {
  const forms = new Set([token]);
  if (token.endsWith("es") && token.length > 4) {
    forms.add(token.slice(0, -2));
  } else if (token.endsWith("s") && token.length > 3) {
    forms.add(token.slice(0, -1));
  } else {
    forms.add(`${token}s`);
    forms.add(`${token}es`);
  }
  return [...forms].some((form) =>
    new RegExp(`(?:^|[^a-z0-9])${form}(?:[^a-z0-9]|$)`, "i").test(text),
  );
}

function photoText(photo: UnsplashPhoto): string {
  return [photo.alt_description, photo.slug].filter(Boolean).join(" ").toLowerCase();
}

function scoreAgainst(photo: UnsplashPhoto, name: string): number {
  const text = photoText(photo);
  const tokens = tokensFrom(name);
  if (tokens.length === 0) {
    return hasToken(text, foldAscii(name).toLowerCase()) ? 1 : 0;
  }
  const hits = tokens.filter((token) => hasToken(text, token)).length;
  return hits / tokens.length;
}

function scorePhoto(photo: UnsplashPhoto, names: readonly string[]): number {
  return Math.max(...names.map((name) => scoreAgainst(photo, name)), 0);
}

function isFreePhoto(photo: UnsplashPhoto): boolean {
  if (photo.plus || photo.premium) {
    return false;
  }
  const host = photo.urls?.raw ?? photo.urls?.regular ?? "";
  return host.includes("images.unsplash.com") && !host.includes("plus.unsplash.com");
}

async function searchUnsplash(query: string, page: number): Promise<SearchResponse> {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: String(PER_PAGE),
    license: "free",
  });
  const url = `https://unsplash.com/napi/search/photos?${params.toString()}`;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url);
    if (response.status === 429 || response.status === 401 || response.status === 503) {
      const wait = 4000 * (attempt + 1);
      console.warn(
        `  ${String(response.status)} for "${query}" page ${String(page)}; waiting ${String(wait)}ms`,
      );
      await sleep(wait);
      continue;
    }
    if (!response.ok) {
      throw new Error(`Unsplash search failed (${String(response.status)}) for ${query}`);
    }
    return (await response.json()) as SearchResponse;
  }
  throw new Error(`Unsplash search rate-limited for ${query}`);
}

async function fetchPhotoById(id: string): Promise<UnsplashPhoto> {
  const url = `https://unsplash.com/napi/photos/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unsplash photo ${id} failed (${String(response.status)})`);
  }
  return (await response.json()) as UnsplashPhoto;
}

function pickPhoto(
  photos: readonly UnsplashPhoto[],
  names: readonly string[],
  usedIds: ReadonlySet<string>,
): UnsplashPhoto | undefined {
  const ranked = photos
    .filter(isFreePhoto)
    .map((photo) => ({ photo, score: scorePhoto(photo, names) }))
    .filter((entry) => entry.score >= MIN_SCORE)
    .toSorted((a, b) => b.score - a.score);
  const unused = ranked.find((entry) => !usedIds.has(entry.photo.id));
  return (unused ?? ranked[0])?.photo;
}

async function downloadJpeg(photo: UnsplashPhoto, dest: string): Promise<void> {
  const raw = photo.urls?.raw;
  if (!raw) {
    throw new Error(`Missing image URL for ${photo.id}`);
  }
  const separator = raw.includes("?") ? "&" : "?";
  const url = `${raw}${separator}${IMAGE_QUERY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${String(response.status)}) for ${photo.id}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 2000) {
    throw new Error(`Image too small for ${photo.id} (${String(buffer.length)} bytes)`);
  }
  await writeFile(dest, buffer);
}

function tsString(value: string): string {
  return JSON.stringify(value);
}

function writeDataModule(photos: Readonly<Record<string, MealIdeaPhoto>>): string {
  const entries = Object.entries(photos).toSorted(([a], [b]) => a.localeCompare(b));
  const lines = entries.map(([id, photo]) => {
    return `  ${tsString(id)}: { photographer: ${tsString(photo.photographer)}, username: ${tsString(photo.username)}, unsplashId: ${tsString(photo.unsplashId)} },`;
  });
  return `export type MealIdeaPhoto = {
  photographer: string;
  username: string;
  unsplashId: string;
};

/** Filled by \`scripts/fetch-meal-idea-photos.ts\` when a free Unsplash match is saved. */
export const MEAL_IDEA_PHOTOS: Readonly<Record<string, MealIdeaPhoto>> = {
${lines.join("\n")}
};
`;
}

async function findPhoto(
  id: string,
  title: string,
  usedIds: ReadonlySet<string>,
): Promise<UnsplashPhoto | undefined> {
  const queries = searchQueries(id, title);
  const seen = new Set<string>();
  const collected: UnsplashPhoto[] = [];
  for (const [queryIndex, query] of queries.entries()) {
    const pages = queryIndex === 0 ? FIRST_QUERY_PAGES : EXTRA_QUERY_PAGES;
    for (let page = 1; page <= pages; page += 1) {
      const data = await searchUnsplash(query, page);
      await sleep(SEARCH_DELAY_MS);
      for (const photo of data.results) {
        if (seen.has(photo.id)) {
          continue;
        }
        seen.add(photo.id);
        collected.push(photo);
      }
      const match = pickPhoto(collected, queries, usedIds);
      if (match) {
        return match;
      }
      if (data.results.length === 0) {
        break;
      }
    }
  }
  return pickPhoto(collected, queries, usedIds);
}

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  const photos: Record<string, MealIdeaPhoto> = { ...MEAL_IDEA_PHOTOS };
  const usedIds = new Set(Object.values(photos).map((photo) => photo.unsplashId));
  let saved = 0;
  let skipped = 0;
  let missing = 0;

  const catalog = Number.isFinite(LIMIT) && LIMIT > 0 ? mealIdeas.slice(0, LIMIT) : mealIdeas;
  for (const [index, idea] of catalog.entries()) {
    const dest = path.join(OUT_DIR, `${idea.id}.jpg`);
    const copyFrom = COPY_FROM[idea.id];
    const manualId = MANUAL_PHOTOS[idea.id];
    if (photos[idea.id] && !copyFrom && (!manualId || photos[idea.id]?.unsplashId === manualId)) {
      skipped += 1;
      continue;
    }
    process.stdout.write(`[${String(index + 1)}/${String(catalog.length)}] ${idea.id} … `);
    try {
      if (copyFrom) {
        const source = photos[copyFrom];
        if (!source) {
          console.log(`missing source ${copyFrom}`);
          missing += 1;
          continue;
        }
        await copyFile(path.join(OUT_DIR, `${copyFrom}.jpg`), dest);
        photos[idea.id] = { ...source };
        saved += 1;
        console.log(`copied from ${copyFrom}`);
        continue;
      }
      const photo = manualId
        ? await fetchPhotoById(manualId)
        : await findPhoto(idea.id, idea.title, usedIds);
      const username = photo?.user?.username;
      const photographer = photo?.user?.name ?? username;
      if (!photo || !username || !photographer) {
        console.log("no free match");
        missing += 1;
        continue;
      }
      await downloadJpeg(photo, dest);
      photos[idea.id] = {
        photographer,
        username,
        unsplashId: photo.id,
      };
      usedIds.add(photo.id);
      saved += 1;
      console.log(`saved (${photo.id})`);
    } catch (error) {
      missing += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.log(`failed: ${message}`);
    }

    if ((saved + missing) % 25 === 0) {
      await writeFile(DATA_FILE, writeDataModule(photos), "utf8");
    }
  }

  await writeFile(DATA_FILE, writeDataModule(photos), "utf8");
  console.log(
    `Done. saved=${String(saved)} existing=${String(skipped)} missing=${String(missing)} totalPhotos=${String(Object.keys(photos).length)}`,
  );
}

await main();
