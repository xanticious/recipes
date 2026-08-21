/**
 * Search Unsplash (free license) for each catalog ingredient and save a local JPEG
 * when the photo text actually mentions the ingredient. Re-run to fill gaps.
 *
 *   node --experimental-strip-types scripts/fetch-ingredient-photos.ts
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INGREDIENT_PHOTOS, type IngredientPhoto } from "../src/data/ingredientPhotos.data.ts";
import { ingredients } from "../src/data/ingredients.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "ingredients");
const DATA_FILE = path.join(ROOT, "src", "data", "ingredientPhotos.data.ts");

const SEARCH_DELAY_MS = 300;
const FIRST_QUERY_PAGES = 2;
const EXTRA_QUERY_PAGES = 1;
const MAX_QUERIES = 3;
const PER_PAGE = 20;
const MIN_SCORE = 1;
const IMAGE_QUERY = "w=720&h=540&fit=crop&crop=entropy&fm=jpg&q=72";
const LIMIT = Number.parseInt(process.env.INGREDIENT_PHOTO_LIMIT ?? "", 10);

const STOPWORDS = new Set([
  "fresh",
  "dried",
  "ground",
  "the",
  "and",
  "or",
  "of",
  "for",
  "with",
  "free",
  "percent",
  "sliced",
  "canned",
  "jarred",
  "crushed",
  "diced",
  "baby",
  "whole",
  "sweetened",
  "lactose",
  "plant",
  "based",
  "raw",
  "leaves",
]);

const EXTRA_QUERIES: Record<string, readonly string[]> = {
  "bok-choy": ["bok choy", "pak choi"],
  "baby-bok-choy": ["baby bok choy", "baby pak choi"],
  jalapeno: ["jalapeno pepper", "jalapeño"],
  "green-onion": ["green onion", "scallion", "spring onion"],
  cilantro: ["cilantro", "fresh coriander"],
  "napa-cabbage": ["napa cabbage", "chinese cabbage"],
  "bell-pepper": ["bell pepper", "capsicum"],
  cheddar: ["cheddar cheese"],
  parmesan: ["parmesan cheese", "parmigiano"],
  mozzarella: ["mozzarella cheese"],
  "soy-sauce": ["soy sauce bottle"],
  "fish-sauce": ["fish sauce bottle"],
  ghee: ["ghee", "clarified butter"],
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

function searchQueries(id: string, name: string, kind: string): string[] {
  const extras = EXTRA_QUERIES[id] ?? [];
  const stripped = name
    .replace(/^lactose-free /i, "")
    .replace(/^fresh /i, "")
    .replace(/^ground /i, "")
    .replace(/^dried /i, "")
    .replace(/^sliced /i, "");
  const kindHint = kind === "spice" ? `${stripped} spice` : "";
  return unique([name, stripped, foldAscii(name), foldAscii(stripped), kindHint, ...extras]).slice(
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
  return new RegExp(`(?:^|[^a-z0-9])${token}(?:[^a-z0-9]|$)`, "i").test(text);
}

function photoText(photo: UnsplashPhoto): string {
  return [photo.alt_description, photo.description].filter(Boolean).join(" ").toLowerCase();
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

function writeDataModule(photos: Readonly<Record<string, IngredientPhoto>>): string {
  const entries = Object.entries(photos).toSorted(([a], [b]) => a.localeCompare(b));
  const lines = entries.map(([id, photo]) => {
    return `  ${tsString(id)}: { photographer: ${tsString(photo.photographer)}, username: ${tsString(photo.username)}, unsplashId: ${tsString(photo.unsplashId)} },`;
  });
  return `export type IngredientPhoto = {
  photographer: string;
  username: string;
  unsplashId: string;
};

/** Filled by \`scripts/fetch-ingredient-photos.ts\` when a free Unsplash match is saved. */
export const INGREDIENT_PHOTOS: Readonly<Record<string, IngredientPhoto>> = {
${lines.join("\n")}
};
`;
}

async function findPhoto(
  id: string,
  name: string,
  kind: string,
  usedIds: ReadonlySet<string>,
): Promise<UnsplashPhoto | undefined> {
  const queries = searchQueries(id, name, kind);
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
  const photos: Record<string, IngredientPhoto> = { ...INGREDIENT_PHOTOS };
  const usedIds = new Set(Object.values(photos).map((photo) => photo.unsplashId));
  let saved = 0;
  let skipped = 0;
  let missing = 0;

  const catalog = Number.isFinite(LIMIT) && LIMIT > 0 ? ingredients.slice(0, LIMIT) : ingredients;
  for (const [index, ingredient] of catalog.entries()) {
    const dest = path.join(OUT_DIR, `${ingredient.id}.jpg`);
    if (photos[ingredient.id]) {
      skipped += 1;
      continue;
    }
    process.stdout.write(`[${String(index + 1)}/${String(catalog.length)}] ${ingredient.id} … `);
    try {
      const photo = await findPhoto(ingredient.id, ingredient.name, ingredient.kind, usedIds);
      const username = photo?.user?.username;
      const photographer = photo?.user?.name ?? username;
      if (!photo || !username || !photographer) {
        console.log("no free match");
        missing += 1;
        continue;
      }
      await downloadJpeg(photo, dest);
      photos[ingredient.id] = {
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
