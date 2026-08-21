/**
 * Save a Google Street View storefront still for each Davis County restaurant.
 * Geocode with Nominatim, then pull a Street View image aimed at the building.
 * Leave the catalog placeholder when there is no nearby coverage.
 *
 *   node --experimental-strip-types scripts/fetch-restaurant-photos.ts
 *
 * Reads GOOGLE_MAPS_API_KEY from the environment or local.env.
 * Set STREETVIEW_REPLACE=1 to delete existing stills and fetch them all again.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RESTAURANT_CITY_LABELS } from "../src/data/restaurantBrowse.ts";
import { RESTAURANT_PHOTOS, type RestaurantPhoto } from "../src/data/restaurantPhotos.data.ts";
import { restaurants } from "../src/data/restaurants/index.ts";
import type { Restaurant } from "../src/data/types.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "restaurants");
const DATA_FILE = path.join(ROOT, "src", "data", "restaurantPhotos.data.ts");
const USER_AGENT = "recipes-1/0.0 (family recipe catalog; restaurant storefront photos)";
const NOMINATIM_DELAY_MS = 1100;
const STREETVIEW_DELAY_MS = 150;
const MAX_PANO_DISTANCE_M = 90;
const IMAGE_SIZE = "640x480";
const LIMIT = Number.parseInt(process.env.RESTAURANT_PHOTO_LIMIT ?? "", 10);

const DAVIS_COUNTY = {
  minLat: 40.8,
  maxLat: 41.2,
  minLng: -112.15,
  maxLng: -111.7,
};

const NAME_STOPWORDS = new Set([
  "and",
  "the",
  "of",
  "cafe",
  "restaurant",
  "grill",
  "kitchen",
  "diner",
  "house",
  "bistro",
  "bar",
  "co",
  "company",
  "style",
  "food",
  "mexican",
  "hawaiian",
]);

type LatLng = { lat: number; lng: number };

type NominatimHit = {
  lat: string;
  lon: string;
  display_name?: string;
  name?: string;
  type?: string;
  class?: string;
};

type StreetViewMetadata = {
  status: string;
  error_message?: string;
  pano_id?: string;
  location?: { lat: number; lng: number };
};

type FoundPhoto = {
  url: string;
  creditUrl: string;
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

function nameTokens(name: string): string[] {
  return foldAscii(name)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((token) => token.length > 2 && !NAME_STOPWORDS.has(token));
}

function hasToken(text: string, token: string): boolean {
  return new RegExp(`(?:^|[^a-z0-9])${token}(?:[^a-z0-9]|$)`, "i").test(text);
}

function tsString(value: string): string {
  return JSON.stringify(value);
}

function redact(url: string): string {
  return url.replace(/([?&]key=)[^&]+/gi, "$1REDACTED");
}

function inDavisCounty(point: LatLng): boolean {
  return (
    point.lat >= DAVIS_COUNTY.minLat &&
    point.lat <= DAVIS_COUNTY.maxLat &&
    point.lng >= DAVIS_COUNTY.minLng &&
    point.lng <= DAVIS_COUNTY.maxLng
  );
}

function haversineMeters(a: LatLng, b: LatLng): number {
  const earth = 6_371_000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)));
}

function bearingDegrees(from: LatLng, to: LatLng): number {
  const fromLat = (from.lat * Math.PI) / 180;
  const toLat = (to.lat * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(toLat);
  const x =
    Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function writeDataModule(photos: Readonly<Record<string, RestaurantPhoto>>): string {
  const entries = Object.entries(photos).toSorted(([a], [b]) => a.localeCompare(b));
  const lines = entries.map(
    ([id, photo]) =>
      `  ${tsString(id)}: { photographer: ${tsString(photo.photographer)}, creditUrl: ${tsString(photo.creditUrl)}, source: ${tsString(photo.source)} },`,
  );
  return `export type RestaurantPhotoSource = "streetview";

export type RestaurantPhoto = {
  photographer: string;
  creditUrl: string;
  source: RestaurantPhotoSource;
};

export const RESTAURANT_PHOTO_SOURCE_LABELS: Record<RestaurantPhotoSource, string> = {
  streetview: "Street View",
};

/** Filled by \`scripts/fetch-restaurant-photos.ts\` when a storefront photo is saved. */
export const RESTAURANT_PHOTOS: Readonly<Record<string, RestaurantPhoto>> = {
${lines.join("\n")}
};
`;
}

const KEY_ALIASES = [
  "GOOGLE_MAPS_API_KEY",
  "MAPS_API_KEY",
  "STREETVIEW_API_KEY",
  "StreetViewStaticKey",
  "GOOGLE_API_KEY",
];

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function looksLikeGoogleKey(value: string): boolean {
  return /^AIza[0-9A-Za-z_-]{20,}$/.test(value) || /^[A-Za-z0-9_-]{30,80}$/.test(value);
}

async function readEnvFile(): Promise<string> {
  const buf = await readFile(path.join(ROOT, "local.env"));
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString("utf16le");
  }
  return buf
    .toString("utf8")
    .replace(/^\uFEFF/, "")
    .replace(/\0/g, "");
}

function parseEnvAssignment(line: string): { key: string; value: string } | undefined {
  const trimmed = line
    .trim()
    .replace(/^\uFEFF/, "")
    .replace(/^export\s+/, "");
  if (trimmed.length === 0 || trimmed.startsWith("#")) {
    return undefined;
  }
  const separator = /[=:]/.exec(trimmed);
  if (!separator || separator.index === undefined || separator.index < 1) {
    const parts = trimmed.split(/\s+/);
    if (parts.length === 2 && looksLikeGoogleKey(parts[1] ?? "")) {
      return { key: parts[0] ?? "GOOGLE_MAPS_API_KEY", value: parts[1] ?? "" };
    }
    if (looksLikeGoogleKey(trimmed)) {
      return { key: "GOOGLE_MAPS_API_KEY", value: trimmed };
    }
    return undefined;
  }
  const key = trimmed.slice(0, separator.index).trim();
  const value = stripQuotes(trimmed.slice(separator.index + 1).trim());
  if (!key || !value) {
    return undefined;
  }
  return { key, value };
}

async function loadLocalEnv(): Promise<void> {
  try {
    const text = await readEnvFile();
    const parsed: Array<{ key: string; value: string }> = [];
    for (const rawLine of text.split(/\r?\n/)) {
      const assignment = parseEnvAssignment(rawLine);
      if (!assignment) {
        continue;
      }
      parsed.push(assignment);
      if (process.env[assignment.key] === undefined) {
        process.env[assignment.key] = assignment.value;
      }
    }
    if (parsed.length === 1 && process.env.GOOGLE_MAPS_API_KEY === undefined) {
      process.env.GOOGLE_MAPS_API_KEY = parsed[0]?.value;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Could not read local.env: ${message}`);
  }
}

function requireApiKey(): string {
  for (const name of KEY_ALIASES) {
    const key = process.env[name]?.trim();
    if (key) {
      return key;
    }
  }
  throw new Error(
    "No Street View API key found. Save local.env as a single line: GOOGLE_MAPS_API_KEY=your-key",
  );
}

async function fetchJson<T>(url: string, headers: Record<string, string>): Promise<T> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { headers, redirect: "follow" });
    if (response.status === 429 || response.status === 503) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    if (!response.ok) {
      throw new Error(`HTTP ${String(response.status)} for ${redact(url)}`);
    }
    return (await response.json()) as T;
  }
  throw new Error(`Rate limited for ${redact(url)}`);
}

function shortName(name: string): string {
  const tokens = nameTokens(name);
  return tokens.slice(0, 3).join(" ");
}

function scoreHit(hit: NominatimHit, restaurant: Restaurant, city: string): number {
  const text = foldAscii(`${hit.name ?? ""} ${hit.display_name ?? ""}`).toLowerCase();
  const tokens = nameTokens(restaurant.name);
  const hits = tokens.filter((token) => hasToken(text, token)).length;
  const cityHit = hasToken(text, foldAscii(city).toLowerCase());
  const amenity =
    hit.class === "amenity" || hit.type === "restaurant" || hit.type === "fast_food" ? 2 : 0;
  return hits * 3 + (cityHit ? 2 : 0) + amenity;
}

async function geocode(restaurant: Restaurant): Promise<LatLng | undefined> {
  const city = RESTAURANT_CITY_LABELS[restaurant.city];
  const queries = unique([
    `${restaurant.name}, ${city}, Utah, USA`,
    `${shortName(restaurant.name)}, ${city}, Utah`,
  ]);
  let best: { point: LatLng; score: number } | undefined;
  for (const query of queries) {
    const params = new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "5",
      countrycodes: "us",
      viewbox: `${String(DAVIS_COUNTY.minLng)},${String(DAVIS_COUNTY.maxLat)},${String(DAVIS_COUNTY.maxLng)},${String(DAVIS_COUNTY.minLat)}`,
    });
    const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
    const hits = await fetchJson<NominatimHit[]>(url, {
      "user-agent": USER_AGENT,
      accept: "application/json",
    });
    await sleep(NOMINATIM_DELAY_MS);
    for (const hit of hits) {
      const point = { lat: Number(hit.lat), lng: Number(hit.lon) };
      if (!Number.isFinite(point.lat) || !Number.isFinite(point.lng) || !inDavisCounty(point)) {
        continue;
      }
      const score = scoreHit(hit, restaurant, city);
      if (score < 3) {
        continue;
      }
      if (!best || score > best.score) {
        best = { point, score };
      }
    }
    if (best && best.score >= 5) {
      return best.point;
    }
  }
  return best?.point;
}

async function streetViewMetadata(
  key: string,
  location: string,
  radius: number,
  source?: "outdoor",
): Promise<StreetViewMetadata> {
  const params = new URLSearchParams({
    location,
    radius: String(radius),
    return_error_code: "true",
    key,
  });
  if (source) {
    params.set("source", source);
  }
  const url = `https://maps.googleapis.com/maps/api/streetview/metadata?${params.toString()}`;
  const data = await fetchJson<StreetViewMetadata>(url, { accept: "application/json" });
  if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
    throw new Error(data.error_message ?? data.status);
  }
  return data;
}

async function findStreetView(
  key: string,
  restaurant: Restaurant,
): Promise<FoundPhoto | undefined> {
  const city = RESTAURANT_CITY_LABELS[restaurant.city];
  const point = await geocode(restaurant);
  const location = point
    ? `${point.lat.toFixed(7)},${point.lng.toFixed(7)}`
    : `${restaurant.name}, ${city}, UT`;
  const attempts: Array<{ radius: number; source?: "outdoor" }> = [
    { radius: 50, source: "outdoor" },
    { radius: 80, source: "outdoor" },
    { radius: 50 },
  ];
  for (const attempt of attempts) {
    const meta = await streetViewMetadata(key, location, attempt.radius, attempt.source);
    await sleep(STREETVIEW_DELAY_MS);
    if (meta.status !== "OK" || !meta.location || !meta.pano_id) {
      continue;
    }
    const pano = { lat: meta.location.lat, lng: meta.location.lng };
    if (!inDavisCounty(pano)) {
      continue;
    }
    if (point && haversineMeters(point, pano) > MAX_PANO_DISTANCE_M) {
      continue;
    }
    const heading = point ? Math.round(bearingDegrees(pano, point)) : 0;
    const params = new URLSearchParams({
      size: IMAGE_SIZE,
      pano: meta.pano_id,
      heading: String(heading),
      pitch: "8",
      fov: "80",
      return_error_code: "true",
      key,
    });
    return {
      url: `https://maps.googleapis.com/maps/api/streetview?${params.toString()}`,
      creditUrl: `https://www.google.com/maps/@?api=1&map_action=pano&pano=${encodeURIComponent(meta.pano_id)}&heading=${String(heading)}&pitch=8&fov=80`,
    };
  }
  return undefined;
}

async function downloadJpeg(url: string, dest: string): Promise<boolean> {
  const response = await fetch(url, {
    headers: { accept: "image/jpeg" },
    redirect: "follow",
  });
  if (!response.ok) {
    return false;
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 4000 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return false;
  }
  await writeFile(dest, buffer);
  return true;
}

async function clearOldPhotos(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(OUT_DIR);
  await Promise.all(
    files
      .filter((file) => file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".webp"))
      .map((file) => unlink(path.join(OUT_DIR, file))),
  );
}

async function main(): Promise<void> {
  await loadLocalEnv();
  const key = requireApiKey();
  await mkdir(OUT_DIR, { recursive: true });
  const replace = process.env.STREETVIEW_REPLACE === "1";
  if (replace) {
    await clearOldPhotos();
  }
  const photos: Record<string, RestaurantPhoto> = replace ? {} : { ...RESTAURANT_PHOTOS };
  if (replace) {
    await writeFile(DATA_FILE, writeDataModule(photos), "utf8");
  }

  let saved = 0;
  let missing = 0;
  const catalog = Number.isFinite(LIMIT) && LIMIT > 0 ? restaurants.slice(0, LIMIT) : restaurants;
  for (const [index, restaurant] of catalog.entries()) {
    process.stdout.write(`[${String(index + 1)}/${String(catalog.length)}] ${restaurant.id} … `);
    const dest = path.join(OUT_DIR, `${restaurant.id}.jpg`);
    if (photos[restaurant.id] && existsSync(dest)) {
      console.log("exists");
      continue;
    }
    try {
      const found = await findStreetView(key, restaurant);
      if (!found) {
        console.log("no storefront coverage");
        missing += 1;
        continue;
      }
      const ok = await downloadJpeg(found.url, dest);
      await sleep(STREETVIEW_DELAY_MS);
      if (!ok) {
        console.log("download failed");
        missing += 1;
        continue;
      }
      photos[restaurant.id] = {
        photographer: "Google",
        creditUrl: found.creditUrl,
        source: "streetview",
      };
      saved += 1;
      console.log("saved (streetview)");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`failed: ${message}`);
      if (
        message.includes("REQUEST_DENIED") ||
        message.includes("OVER_QUERY_LIMIT") ||
        message.includes("GOOGLE_MAPS_API_KEY")
      ) {
        throw error;
      }
      missing += 1;
    }

    if ((saved + missing) % 10 === 0) {
      await writeFile(DATA_FILE, writeDataModule(photos), "utf8");
    }
  }

  await writeFile(DATA_FILE, writeDataModule(photos), "utf8");
  console.log(
    `Done. saved=${String(saved)} missing=${String(missing)} totalPhotos=${String(Object.keys(photos).length)}`,
  );
}

await main();
