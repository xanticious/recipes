/**
 * Point every Davis and Weber County location of a franchise at one generated
 * storefront file. Locations of one brand share a picture, including names that
 * add a street in parentheses. The master is the alphabetically first location
 * that already has both a generated PNG and a catalog JPEG.
 *
 *   node --experimental-strip-types scripts/wire-franchise-photos.ts
 */
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RESTAURANT_PHOTOS, type RestaurantPhoto } from "../src/data/restaurantPhotos.data.ts";
import { restaurants } from "../src/data/restaurants/index.ts";
import type { RestaurantCity } from "../src/data/types.ts";

const COUNTIES: ReadonlySet<RestaurantCity> = new Set([
  "bountiful",
  "centerville",
  "farmington",
  "kaysville",
  "layton",
  "north-salt-lake",
  "woods-cross",
  "ogden",
  "roy",
  "south-ogden",
  "riverdale",
  "north-ogden",
  "west-haven",
  "pleasant-view",
  "harrisville",
  "washington-terrace",
  "farr-west",
  "hooper",
  "plain-city",
  "marriott-slaterville",
  "uintah",
  "huntsville",
  "eden",
]);

function tsString(value: string): string {
  return JSON.stringify(value);
}

function writePhotoEntry(id: string, photo: RestaurantPhoto): string {
  if (photo.source === "generated") {
    if (photo.imageId) {
      return `  ${tsString(id)}: { source: "generated", imageId: ${tsString(photo.imageId)} },`;
    }
    return `  ${tsString(id)}: { source: "generated" },`;
  }
  return `  ${tsString(id)}: { photographer: ${tsString(photo.photographer)}, creditUrl: ${tsString(photo.creditUrl)}, source: "streetview" },`;
}

function writeDataModule(photos: Readonly<Record<string, RestaurantPhoto>>): string {
  const lines = Object.entries(photos)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([id, photo]) => writePhotoEntry(id, photo));
  return `export type RestaurantPhotoSource = "streetview" | "generated";

export type RestaurantPhoto =
  | {
      photographer: string;
      creditUrl: string;
      source: "streetview";
    }
  | {
      source: "generated";
      /** Franchise locations share this file. Omitted when the file name is this restaurant id. */
      imageId?: string;
    };

export const RESTAURANT_PHOTO_SOURCE_LABELS: Record<RestaurantPhotoSource, string> = {
  streetview: "Street View",
  generated: "AI illustration",
};

/** Filled by \`scripts/fetch-restaurant-photos.ts\` when a storefront photo is saved. */
export const RESTAURANT_PHOTOS: Readonly<Record<string, RestaurantPhoto>> = {
${lines.join("\n")}
};
`;
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "d-src-personal-recipes-1",
  "assets",
);

function hasGeneratedArt(id: string): boolean {
  return (
    existsSync(path.join(ASSETS, `${id}.png`)) &&
    existsSync(path.join(ROOT, "public", "restaurants", `${id}.jpg`))
  );
}

/** Same franchise entered under a slightly different catalog name. */
const BRAND_ALIASES: Readonly<Record<string, string>> = {
  "Habit Burger & Grill": "The Habit Burger Grill",
  "Applebee's": "Applebee's Grill + Bar",
  "Burly Burger Ii": "Burly Burger",
  Chipotle: "Chipotle Mexican Grill",
  "Daily Rise Downtown": "Daily Rise",
  "Dutch Bros": "Dutch Bros Coffee",
  "Handel's": "Handel's Homemade Ice Cream",
  "Javier's Authentic Mexican Food": "Javier's",
  Kneaders: "Kneaders Bakery & Cafe",
  "Menchie's": "Menchie's Frozen Yogurt",
  "Mo' Bettahs": "Mo' Bettahs Hawaiian Style Food",
  "Nielsen's": "Nielsen's Frozen Custard",
  "Rancherito's Mexican Food Ogden": "Rancherito's Mexican Food",
  Rumbi: "Rumbi Island Grill",
  "Seven Brothers": "Seven Brothers Burgers",
  "Zeppe's Italian Ice Moble #2 Lic#u637wm": "Zeppe's Italian Ice",
  "Einstein Bros Bagels": "Einstein Bros. Bagels",
  "Lucky Slice Ogden": "Lucky Slice Pizza",
  "Lucky Slice Events": "Lucky Slice Pizza",
  "Lucky Slice Moblie #1 - Lucky Slice Moblie Lkyslc1": "Lucky Slice Pizza",
  "Denny's Restaurant #8568 - Denny's Restaurant": "Denny's",
  "Anaya's Market Ogden Numero Seis": "Anaya's Market Ogden",
  "Coffee Links Cuisine,": "Coffee Links",
  "Kaffe Mercantile of Ogden": "Kaffe Mercantile",
  "Kaffe Mercantile South Ogden": "Kaffe Mercantile",
  "Wing Wah Gourmet": "Wing Wah",
  "Wing Wah Cafe": "Wing Wah",
  "Javiers 3": "Javier's",
  "Millers Farr West": "Millers",
  "Millers Pleasant View - Millers Pleasant View - Fast Food": "Millers",
};

const DAVIS: ReadonlySet<RestaurantCity> = new Set([
  "bountiful",
  "centerville",
  "farmington",
  "kaysville",
  "layton",
  "north-salt-lake",
  "woods-cross",
]);

/** "Subway (500 West)" is the same brand as "Subway". */
function brandName(name: string): string {
  const withoutPlace = name.replace(/ \([^)]*\)$/, "");
  return BRAND_ALIASES[withoutPlace] ?? withoutPlace;
}

const byName = new Map<string, string[]>();
for (const restaurant of restaurants) {
  if (!COUNTIES.has(restaurant.city)) {
    continue;
  }
  const brand = brandName(restaurant.name);
  const ids = byName.get(brand) ?? [];
  ids.push(restaurant.id);
  byName.set(brand, ids);
}

const photos: Record<string, RestaurantPhoto> = { ...RESTAURANT_PHOTOS };
let wired = 0;
for (const ids of byName.values()) {
  if (ids.length < 2) {
    continue;
  }
  const withArt = ids.filter((id) => hasGeneratedArt(id)).toSorted();
  const referenced = withArt.filter((id) =>
    Object.values(photos).some((photo) => photo.source === "generated" && photo.imageId === id),
  );
  const davisArt = withArt.filter((id) => {
    const city = restaurants.find((restaurant) => restaurant.id === id)?.city;
    return city !== undefined && DAVIS.has(city);
  });
  const master = referenced[0] ?? davisArt[0] ?? withArt[0];
  if (!master) {
    continue;
  }
  for (const id of ids) {
    photos[id] = id === master ? { source: "generated" } : { source: "generated", imageId: master };
    if (id !== master) {
      wired += 1;
    }
  }
}

let singles = 0;
for (const restaurant of restaurants) {
  if (!COUNTIES.has(restaurant.city)) {
    continue;
  }
  if (photos[restaurant.id]?.source === "generated") {
    continue;
  }
  if (!hasGeneratedArt(restaurant.id)) {
    continue;
  }
  photos[restaurant.id] = { source: "generated" };
  singles += 1;
}

writeFileSync(path.join(ROOT, "src", "data", "restaurantPhotos.data.ts"), writeDataModule(photos));
console.log(
  `wired=${String(wired)} singles=${String(singles)} entries=${String(Object.keys(photos).length)}`,
);
