/**
 * Seed Ogden restaurants from Weber-Morgan's public inspection directory
 * and Ogden City's active food business licenses.
 *
 *   node --experimental-strip-types scripts/export-weber-restaurants.ts
 *
 * Writes design/weber-food-establishments.csv, design/ogden-food-licenses.csv,
 * design/ogden-restaurant-review.csv, and src/data/restaurants/ogden.ts.
 * Re-running overwrites those files. Owner name and email are never saved.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const INSPECTION_URL =
  "https://www.inspectionsonline.us/ut/weberogden/inspect.nsf/SearchEstabNT?SearchView&Query=%5Bfld_Program%5D+CONTAINS+kw_Food&SearchOrder=4&SearchMax=0";

const LICENSE_QUERY =
  "https://arcgis.ogdencity.com/arcgis/rest/services/Secured/EnerGOV_BusinessLicenses/MapServer/0/query";

type Cuisine =
  | "american"
  | "mexican"
  | "italian"
  | "asian"
  | "mediterranean"
  | "indian"
  | "bbq"
  | "breakfast"
  | "fast-food"
  | "dessert"
  | "drinks"
  | "grocery"
  | "other";

type Establishment = {
  facilityId: string;
  name: string;
  street: string;
  cityRaw: string;
  city: string;
  zip: string;
};

type License = {
  licenseNumber: string;
  dba: string;
  businessName: string;
  street: string;
  naics: string;
  naicsDesc: string;
  description: string;
  status: string;
};

type Chain = {
  brand: string;
  name: string;
  cuisines: Cuisine[];
  description: string;
  menu?: string;
};

const CHAINS: Chain[] = [
  {
    brand: "chick fil a",
    name: "Chick-fil-A",
    cuisines: ["fast-food"],
    description: "Chicken sandwich chain for sandwiches, nuggets, and waffle fries.",
    menu: "chickFilAMenu",
  },
  {
    brand: "in n out",
    name: "In-N-Out Burger",
    cuisines: ["fast-food"],
    description: "Burger counter for protein-style burgers, fries, and shakes.",
    menu: "inNOutMenu",
  },
  {
    brand: "five guys",
    name: "Five Guys",
    cuisines: ["fast-food"],
    description: "Burger counter for made-to-order burgers, fries, and shakes.",
    menu: "fiveGuysMenu",
  },
  {
    brand: "raising cane",
    name: "Raising Cane's",
    cuisines: ["fast-food"],
    description: "Chicken-finger counter for fingers, crinkle fries, and Texas toast.",
    menu: "raisingCanesMenu",
  },
  {
    brand: "mcdonald",
    name: "McDonald's",
    cuisines: ["fast-food"],
    description: "Fast-food counter for burgers, fries, and breakfast.",
    menu: "mcdonaldsMenu",
  },
  {
    brand: "burger king",
    name: "Burger King",
    cuisines: ["fast-food"],
    description: "Fast-food counter for flame-grilled burgers, fries, and breakfast.",
    menu: "burgerKingMenu",
  },
  {
    brand: "wendy",
    name: "Wendy's",
    cuisines: ["fast-food"],
    description: "Fast-food counter for square burgers, chili, and fries.",
    menu: "wendysMenu",
  },
  {
    brand: "arby",
    name: "Arby's",
    cuisines: ["fast-food"],
    description: "Fast-food counter for roast beef sandwiches, curly fries, and shakes.",
    menu: "arbysMenu",
  },
  {
    brand: "taco bell",
    name: "Taco Bell",
    cuisines: ["fast-food", "mexican"],
    description: "Fast-food counter for tacos, burritos, and nachos.",
    menu: "tacoBellMenu",
  },
  {
    brand: "del taco",
    name: "Del Taco",
    cuisines: ["fast-food", "mexican"],
    description: "Fast-food counter for tacos, burgers, and fries.",
    menu: "delTacoMenu",
  },
  {
    brand: "taco time",
    name: "Taco Time",
    cuisines: ["fast-food", "mexican"],
    description: "Utah taco counter for soft tacos, burritos, and mexi-fries.",
    menu: "tacoTimeMenu",
  },
  {
    brand: "el pollo loco",
    name: "El Pollo Loco",
    cuisines: ["mexican"],
    description: "Fire-grilled chicken counter for burritos, bowls, and tacos.",
    menu: "elPolloLocoMenu",
  },
  {
    brand: "kfc",
    name: "KFC",
    cuisines: ["fast-food"],
    description: "Fried-chicken counter for buckets, bowls, and biscuits.",
    menu: "kfcMenu",
  },
  {
    brand: "popeyes",
    name: "Popeyes",
    cuisines: ["fast-food"],
    description: "Fried-chicken counter for chicken, biscuits, and sides.",
    menu: "popeyesMenu",
  },
  {
    brand: "sonic",
    name: "Sonic",
    cuisines: ["fast-food"],
    description: "Drive-in for burgers, tots, and slushes.",
    menu: "sonicMenu",
  },
  {
    brand: "carl s jr",
    name: "Carl's Jr.",
    cuisines: ["fast-food"],
    description: "Fast-food counter for charbroiled burgers, fries, and shakes.",
    menu: "carlsJrMenu",
  },
  {
    brand: "jack in the box",
    name: "Jack in the Box",
    cuisines: ["fast-food"],
    description: "Fast-food counter for burgers, tacos, and late-night breakfast.",
    menu: "jackInTheBoxMenu",
  },
  {
    brand: "arctic circle",
    name: "Arctic Circle",
    cuisines: ["fast-food"],
    description: "Utah drive-in for ranch burgers, fry sauce, and shakes.",
    menu: "arcticCircleMenu",
  },
  {
    brand: "culver",
    name: "Culver's",
    cuisines: ["fast-food"],
    description: "Butterburger counter for burgers, frozen custard, and cheese curds.",
    menu: "culversMenu",
  },
  {
    brand: "subway",
    name: "Subway",
    cuisines: ["fast-food"],
    description: "Sandwich counter for subs, cookies, and chips.",
    menu: "subwayMenu",
  },
  {
    brand: "jersey mike",
    name: "Jersey Mike's",
    cuisines: ["fast-food"],
    description: "Sub shop for sliced-to-order subs and chips.",
    menu: "jerseyMikesMenu",
  },
  {
    brand: "jimmy john",
    name: "Jimmy John's",
    cuisines: ["fast-food"],
    description: "Sandwich shop for subs and chips.",
    menu: "jimmyJohnsMenu",
  },
  {
    brand: "firehouse sub",
    name: "Firehouse Subs",
    cuisines: ["fast-food"],
    description: "Hot-sub shop for subs and chips.",
    menu: "firehouseSubsMenu",
  },
  {
    brand: "potbelly",
    name: "Potbelly",
    cuisines: ["fast-food"],
    description: "Toasted-sandwich shop for subs, salads, and shakes.",
    menu: "potbellyMenu",
  },
  {
    brand: "quiznos",
    name: "Quiznos",
    cuisines: ["fast-food"],
    description: "Toasted-sub shop.",
    menu: "quiznosMenu",
  },
  {
    brand: "panda express",
    name: "Panda Express",
    cuisines: ["asian", "fast-food"],
    description: "American Chinese counter for plates, bowls, and sides.",
    menu: "pandaExpressMenu",
  },
  {
    brand: "cafe rio",
    name: "Cafe Rio",
    cuisines: ["mexican"],
    description: "Fresh-Mex line for burritos, salads, and enchiladas.",
    menu: "cafeRioMenu",
  },
  {
    brand: "costa vida",
    name: "Costa Vida",
    cuisines: ["mexican"],
    description: "Fresh-Mex line for burritos, salads, enchiladas, and sweet pork.",
    menu: "costaVidaMenu",
  },
  {
    brand: "chipotle",
    name: "Chipotle",
    cuisines: ["mexican"],
    description: "Burrito counter for bowls, tacos, and chips.",
    menu: "chipotleMenu",
  },
  {
    brand: "mo bettah",
    name: "Mo' Bettahs",
    cuisines: ["asian"],
    description: "Hawaiian plate counter for rice, macaroni salad, and grilled meat.",
    menu: "moBettahsMenu",
  },
  {
    brand: "rumbi",
    name: "Rumbi",
    cuisines: ["asian"],
    description: "Island-grill counter for rice bowls and salads.",
    menu: "rumbiMenu",
  },
  {
    brand: "zao asian",
    name: "Zao Asian Cafe",
    cuisines: ["asian"],
    description: "Asian cafe line for bowls, plates, and noodles.",
    menu: "zaoMenu",
  },
  {
    brand: "noodles and company",
    name: "Noodles & Company",
    cuisines: ["asian"],
    description: "Noodle counter for pasta, pad thai, and salads.",
    menu: "noodlesAndCompanyMenu",
  },
  {
    brand: "cupbop",
    name: "Cupbop",
    cuisines: ["asian"],
    description: "Korean street-food counter for rice bowls.",
    menu: "cupbopMenu",
  },
  {
    brand: "pizza hut",
    name: "Pizza Hut",
    cuisines: ["italian"],
    description: "Pizza chain for pies, wings, and breadsticks.",
    menu: "pizzaHutMenu",
  },
  {
    brand: "domino",
    name: "Domino's",
    cuisines: ["italian"],
    description: "Delivery pizza for pies, wings, and bread bites.",
    menu: "dominosMenu",
  },
  {
    brand: "papa john",
    name: "Papa John's",
    cuisines: ["italian"],
    description: "Delivery pizza for pies and breadsticks.",
    menu: "papaJohnsMenu",
  },
  {
    brand: "papa murphy",
    name: "Papa Murphy's",
    cuisines: ["italian"],
    description: "Take-and-bake pizza counter.",
    menu: "papaMurphysMenu",
  },
  {
    brand: "little caesar",
    name: "Little Caesars",
    cuisines: ["italian"],
    description: "Hot-and-ready pizza counter.",
    menu: "littleCaesarsMenu",
  },
  {
    brand: "marco s pizza",
    name: "Marco's Pizza",
    cuisines: ["italian"],
    description: "Pizza shop for pies, cheezy bread, and wings.",
    menu: "marcosPizzaMenu",
  },
  {
    brand: "blaze pizza",
    name: "Blaze Pizza",
    cuisines: ["italian"],
    description: "Fast-fired pizza line for build-your-own pies.",
    menu: "blazePizzaMenu",
  },
  {
    brand: "mod pizza",
    name: "MOD Pizza",
    cuisines: ["italian"],
    description: "Fast-fired pizza line for build-your-own pies.",
    menu: "modPizzaMenu",
  },
  {
    brand: "hungry howie",
    name: "Hungry Howie's",
    cuisines: ["italian"],
    description: "Pizza shop for flavored-crust pies.",
    menu: "hungryHowiesMenu",
  },
  {
    brand: "olive garden",
    name: "Olive Garden",
    cuisines: ["italian"],
    description: "Italian chain for pasta, salad, and breadsticks.",
    menu: "oliveGardenMenu",
  },
  {
    brand: "texas roadhouse",
    name: "Texas Roadhouse",
    cuisines: ["american"],
    description: "Steakhouse for ribs, rolls, and burgers.",
    menu: "texasRoadhouseMenu",
  },
  {
    brand: "red robin",
    name: "Red Robin",
    cuisines: ["american"],
    description: "Burger restaurant for burgers, bottomless fries, and shakes.",
    menu: "redRobinMenu",
  },
  {
    brand: "chili s",
    name: "Chili's Grill & Bar",
    cuisines: ["american", "mexican"],
    description: "National chain for fajitas, burgers, and ribs.",
    menu: "chilisMenu",
  },
  {
    brand: "applebee",
    name: "Applebee's",
    cuisines: ["american"],
    description: "National chain for burgers, ribs, and appetizers.",
    menu: "applebeesMenu",
  },
  {
    brand: "black bear diner",
    name: "Black Bear Diner",
    cuisines: ["breakfast", "american"],
    description: "Diner for breakfast plates, burgers, and pot roast.",
    menu: "blackBearDinerMenu",
  },
  {
    brand: "ihop",
    name: "IHOP",
    cuisines: ["breakfast"],
    description: "Pancake house for breakfast plates and burgers.",
    menu: "ihopMenu",
  },
  {
    brand: "first watch",
    name: "First Watch",
    cuisines: ["breakfast"],
    description: "Daytime cafe for breakfast, brunch, and lunch.",
    menu: "firstWatchMenu",
  },
  {
    brand: "cafe zupas",
    name: "Cafe Zupas",
    cuisines: ["american"],
    description: "Soup, salad, and sandwich cafe.",
    menu: "cafeZupasMenu",
  },
  {
    brand: "kneaders",
    name: "Kneaders",
    cuisines: ["breakfast"],
    description: "Bakery cafe for sandwiches, soups, and pastries.",
    menu: "kneadersMenu",
  },
  {
    brand: "wingstop",
    name: "Wingstop",
    cuisines: ["american"],
    description: "Wing shop for bone-in wings and fries.",
    menu: "wingstopMenu",
  },
  {
    brand: "starbucks",
    name: "Starbucks",
    cuisines: ["drinks"],
    description: "Coffee shop for drinks and bakery snacks.",
    menu: "starbucksMenu",
  },
  {
    brand: "dutch bros",
    name: "Dutch Bros",
    cuisines: ["drinks"],
    description: "Drive-through coffee stand for drinks and rebels.",
    menu: "dutchBrosMenu",
  },
  {
    brand: "swig",
    name: "Swig",
    cuisines: ["drinks"],
    description: "Dirty-soda drive-through.",
    menu: "swigMenu",
  },
  {
    brand: "fiiz",
    name: "FiiZ Drinks",
    cuisines: ["drinks"],
    description: "Dirty-soda drive-through.",
    menu: "fiizMenu",
  },
  {
    brand: "beans and brew",
    name: "Beans & Brews",
    cuisines: ["drinks"],
    description: "Local coffee shop for drinks and pastries.",
    menu: "beansAndBrewsMenu",
  },
  {
    brand: "jamba",
    name: "Jamba",
    cuisines: ["drinks"],
    description: "Smoothie counter.",
    menu: "jambaMenu",
  },
  {
    brand: "tropical smoothie",
    name: "Tropical Smoothie Cafe",
    cuisines: ["drinks"],
    description: "Smoothie cafe for wraps and smoothies.",
  },
  {
    brand: "crumbl",
    name: "Crumbl Cookies",
    cuisines: ["dessert"],
    description: "Weekly cookie shop.",
    menu: "crumblMenu",
  },
  {
    brand: "cold stone",
    name: "Cold Stone Creamery",
    cuisines: ["dessert"],
    description: "Ice cream counter for mixed-in creations.",
    menu: "coldStoneMenu",
  },
  {
    brand: "baskin",
    name: "Baskin-Robbins",
    cuisines: ["dessert"],
    description: "Ice cream shop.",
    menu: "baskinRobbinsMenu",
  },
  {
    brand: "dairy queen",
    name: "Dairy Queen",
    cuisines: ["dessert"],
    description: "Treat counter for Blizzards, cones, and sundaes.",
    menu: "dairyQueenMenu",
  },
  {
    brand: "handel",
    name: "Handel's",
    cuisines: ["dessert"],
    description: "Ice cream shop for hand-packed scoops.",
    menu: "handelsMenu",
  },
  {
    brand: "snelgrove",
    name: "Snelgrove",
    cuisines: ["dessert"],
    description: "Utah ice cream shop.",
    menu: "snelgroveMenu",
  },
  {
    brand: "nielsen",
    name: "Nielsen's",
    cuisines: ["dessert"],
    description: "Utah ice cream shop.",
    menu: "nielsensMenu",
  },
  {
    brand: "nothing bundt",
    name: "Nothing Bundt Cakes",
    cuisines: ["dessert"],
    description: "Bundt-cake bakery.",
    menu: "nothingBundtMenu",
  },
  {
    brand: "mrs cavanaugh",
    name: "Mrs. Cavanaugh's",
    cuisines: ["dessert"],
    description: "Bakery for cakes and donuts.",
    menu: "mrsCavanaughsMenu",
  },
  {
    brand: "krispy kreme",
    name: "Krispy Kreme",
    cuisines: ["dessert"],
    description: "Donut shop.",
    menu: "krispyKremeMenu",
  },
  {
    brand: "menchie",
    name: "Menchie's",
    cuisines: ["dessert"],
    description: "Frozen-yogurt shop.",
    menu: "menchiesMenu",
  },
  {
    brand: "twisted sugar",
    name: "Twisted Sugar",
    cuisines: ["dessert"],
    description: "Cookie and dessert shop.",
    menu: "twistedSugarMenu",
  },
  {
    brand: "costco",
    name: "Costco",
    cuisines: ["grocery"],
    description: "Warehouse club with a food court and rotisserie chicken to go.",
    menu: "costcoMenu",
  },
  {
    brand: "sam s club",
    name: "Sam's Club",
    cuisines: ["grocery"],
    description: "Warehouse club with a cafe and rotisserie chicken.",
    menu: "groceryDeliMenu",
  },
  {
    brand: "smith s",
    name: "Smith's",
    cuisines: ["grocery"],
    description: "Grocery store with a deli, bakery, and hot food.",
    menu: "groceryDeliMenu",
  },
  {
    brand: "winco",
    name: "WinCo Foods",
    cuisines: ["grocery"],
    description: "Grocery store with a deli, pizza, and bakery.",
    menu: "groceryDeliMenu",
  },
  {
    brand: "harmon",
    name: "Harmons",
    cuisines: ["grocery"],
    description: "Grocery store with a deli, bakery, and hot food.",
    menu: "harmonsMenu",
  },
  {
    brand: "walmart",
    name: "Walmart",
    cuisines: ["grocery"],
    description: "Supercenter with a deli, bakery, and hot food.",
    menu: "groceryDeliMenu",
  },
  {
    brand: "target",
    name: "Target",
    cuisines: ["grocery"],
    description: "Store with a cafe, bakery, and ready-to-eat snacks.",
    menu: "groceryDeliMenu",
  },
  {
    brand: "sprouts",
    name: "Sprouts Farmers Market",
    cuisines: ["grocery"],
    description: "Grocery store with a hot bar, sandwiches, and bakery.",
    menu: "groceryDeliMenu",
  },
];

const CITY_ALIASES: Record<string, string> = {
  ogden: "Ogden",
  "n ogden": "North Ogden",
  "no ogden": "North Ogden",
  "north ogden": "North Ogden",
  "s ogden": "South Ogden",
  "so ogden": "South Ogden",
  "south ogden": "South Ogden",
  roy: "Roy",
  riverdale: "Riverdale",
  rivrdale: "Riverdale",
  "riverdale rd": "Riverdale",
  "riverdale road": "Riverdale",
  "west haven": "West Haven",
  "pleasant view": "Pleasant View",
  pleasant: "Pleasant View",
  "pleassant view": "Pleasant View",
  "farr west": "Farr West",
  harrisville: "Harrisville",
  hooper: "Hooper",
  huntsville: "Huntsville",
  "plain city": "Plain City",
  "plain clity": "Plain City",
  "marriott slaterville": "Marriott-Slaterville",
  "marriott-slaterville": "Marriott-Slaterville",
  "marriott/slaterville": "Marriott-Slaterville",
  "marriott slatersville": "Marriott-Slaterville",
  slaterville: "Marriott-Slaterville",
  uintah: "Uintah",
  "washington terr": "Washington Terrace",
  "washington terrace": "Washington Terrace",
  "w terrace": "Washington Terrace",
  eden: "Eden",
  liberty: "Liberty",
  morgan: "Morgan",
  "mt green": "Mountain Green",
  "mountain green": "Mountain Green",
  layton: "Layton",
  bountiful: "Bountiful",
  taylor: "Taylor",
};

const DROP_NAME =
  /\b(elementary|middle school|high school|junior high|jr high|preschool|daycare|day care|child care|head start|hospital|medical center|nursing|jail|prison|correctional|sheriff|church|seminary|mobile|food truck|food trailer|commissary|vending|maverik|7-eleven|7 eleven|chevron|sinclair|convenience)\b/i;

const DROP_FACILITY =
  /\b(jr\.?\s*high|learning center|kid corner|pint sized|spring gardens|holiday oil|flying j|fuelio|gas stop|extra mile|fast stop|exxon|quik trip|quick trip|travel center|common cents|assisted|asisted|assisited|senior living|cogir|rehabilit\w*|recovery center|care center)\b/i;

function csvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

function csv(rows: string[][]): string {
  return rows.map((row) => row.map(csvField).join(",")).join("\n") + "\n";
}

function norm(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasBrand(name: string, brand: string): boolean {
  return ` ${norm(name)} `.includes(` ${brand} `);
}

function titleCase(value: string): string {
  const small = new Set(["a", "an", "and", "at", "for", "n", "of", "on", "the"]);
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word, index) => {
      if (word === "bbq") return "BBQ";
      if (word === "y") return "y";
      if (index > 0 && small.has(word)) return word;
      if (word === "st") return "St";
      if (word === "ave") return "Ave";
      if (word === "blvd") return "Blvd";
      if (word === "rd") return "Rd";
      if (word === "dr") return "Dr";
      if (/^\d+(st|nd|rd|th)$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function storefrontName(raw: string): string {
  let name = raw.replace(/\s+/g, " ").trim();
  const parts = name.split(/\s+dba\s+/i);
  if (parts.length >= 2) {
    const left = parts[0] ?? name;
    const right = parts.slice(1).join(" ");
    const owner = /restaurant group|holdings|llc|inc\b|company/i;
    const place = /cafe|grill|pizza|restaurant|bakery|bar|bistro|kitchen/i;
    if (owner.test(right) && place.test(left)) name = left;
    else if (owner.test(left) && !owner.test(right)) name = right;
    else name = left;
  }
  name = name.replace(/\s+(llc|l\.l\.c\.|inc|incorporated|corp|corporation)\.?$/i, "");
  const halves = name.split(/\s+-\s+/);
  if (halves.length === 2 && halves[0] && halves[1] && norm(halves[0]) === norm(halves[1])) {
    name = halves[0];
  }
  name = name.replace(/\s+#\s*[a-z0-9-]+$/i, "");
  name = name.replace(/\s+\d{3,5}$/g, "");
  return name.trim();
}

function streetLabel(street: string): string {
  let label = street
    .replace(/\bunit\b.*$/i, "")
    .replace(/#.*$/, "")
    .trim();
  label = label.replace(/^\d+\s+/, "");
  label = label.replace(/\b(north|south|east|west)\b/gi, "");
  label = label.replace(/\s+/g, " ").trim();
  const titled = titleCase(label).replace(/\.$/, "");
  if (/^\d+$/.test(titled)) {
    return titleCase(
      street
        .replace(/\bunit\b.*$/i, "")
        .replace(/#.*$/, "")
        .trim(),
    ).replace(/\.$/, "");
  }
  return titled;
}

function normalizeCity(raw: string): string {
  const key = norm(raw)
    .replace(/\b\d{5}\b/g, "")
    .trim();
  return CITY_ALIASES[key] ?? titleCase(raw.replace(/\d{5}/g, "").trim());
}

function parseAddress(address: string): { street: string; cityRaw: string; zip: string } {
  const cleaned = address
    .replace(/\s+/g, " ")
    .replace(/([a-z])(Unit)/gi, "$1 $2")
    .trim();
  const split = cleaned.lastIndexOf(",");
  if (split === -1) {
    return { street: cleaned, cityRaw: "", zip: "" };
  }
  const street = cleaned.slice(0, split).trim();
  const tail = cleaned.slice(split + 1).trim();
  const zipMatch = /(\d{5})$/.exec(tail);
  const zip = zipMatch?.[1] ?? "";
  const cityRaw = tail.replace(/\d{5}$/, "").trim();
  return { street, cityRaw, zip };
}

function parseEstablishments(html: string): Establishment[] {
  const rows: Establishment[] = [];
  const pattern =
    /RestrictToCategory=([A-F0-9]+)'[^>]*>([^<]+)<\/A>[\s\S]*?WIDTH=60%><A HREF=[^>]*>([^<]+)<\/A>/g;
  for (const match of html.matchAll(pattern)) {
    const facilityId = match[1] ?? "";
    const name = (match[2] ?? "").replace(/\s+/g, " ").trim();
    const address = (match[3] ?? "").replace(/\s+/g, " ").trim();
    const parsed = parseAddress(address);
    rows.push({
      facilityId,
      name,
      street: parsed.street,
      cityRaw: parsed.cityRaw,
      city: normalizeCity(parsed.cityRaw),
      zip: parsed.zip,
    });
  }
  return rows;
}

async function fetchEstablishments(): Promise<Establishment[]> {
  const pages = await Promise.all(
    [0, 1001].map(async (start) => {
      const url = start === 0 ? INSPECTION_URL : `${INSPECTION_URL}&Start=${String(start)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Inspection search failed (${String(response.status)})`);
      }
      return parseEstablishments(await response.text());
    }),
  );
  const seen = new Set<string>();
  const rows: Establishment[] = [];
  for (const page of pages) {
    for (const row of page) {
      if (seen.has(row.facilityId)) continue;
      seen.add(row.facilityId);
      rows.push(row);
    }
  }
  return rows;
}

type LicenseFeature = {
  attributes: Record<string, string | null>;
};

async function fetchLicenses(): Promise<License[]> {
  const prefixes = ["722%", "4451%", "3118%"];
  const rows: License[] = [];
  for (const prefix of prefixes) {
    rows.push(
      ...(await fetchLicensePage(
        `Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.LICENSESTATUS = 'Active' AND Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.NAIC_CODE LIKE '${prefix}'`,
      )),
    );
  }
  return rows;
}

async function fetchLicensePage(where: string): Promise<License[]> {
  const outFields = [
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.LICENSENUMBER",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.DBA",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.BUSINESSNAME",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.PHY_ADDR_1",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.NAIC_CODE",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.NAIC_DESC",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.DESCRIPTION",
    "Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.LICENSESTATUS",
  ].join(",");
  const rows: License[] = [];
  let offset = 0;
  for (;;) {
    const url = new URL(LICENSE_QUERY);
    url.searchParams.set("where", where);
    url.searchParams.set("outFields", outFields);
    url.searchParams.set("returnGeometry", "false");
    url.searchParams.set("resultOffset", String(offset));
    url.searchParams.set("resultRecordCount", "500");
    url.searchParams.set("f", "json");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`License query failed (${String(response.status)})`);
    }
    const body = (await response.json()) as {
      features?: LicenseFeature[];
      exceededTransferLimit?: boolean;
      error?: { message?: string };
    };
    if (body.error) {
      throw new Error(body.error.message ?? "License query returned an error");
    }
    const features = body.features ?? [];
    for (const feature of features) {
      const attr = feature.attributes;
      const read = (suffix: string) =>
        (attr[`Ogden.PROPERTY.ENERGOV_BL_ADDRESSES.${suffix}`] ?? "").trim();
      rows.push({
        licenseNumber: read("LICENSENUMBER"),
        dba: read("DBA"),
        businessName: read("BUSINESSNAME"),
        street: read("PHY_ADDR_1"),
        naics: read("NAIC_CODE"),
        naicsDesc: read("NAIC_DESC"),
        description: read("DESCRIPTION"),
        status: read("LICENSESTATUS"),
      });
    }
    if (!body.exceededTransferLimit || features.length === 0) break;
    offset += features.length;
  }
  return rows;
}

function findChain(name: string): Chain | undefined {
  const key = norm(name);
  return CHAINS.find((chain) => hasBrand(key, chain.brand) || key.includes(chain.brand));
}

function classify(name: string, description: string, naics: string): Cuisine[] {
  const chain = findChain(name);
  if (chain) return chain.cuisines;
  const text = `${name} ${description}`.toLowerCase();
  if (naics.startsWith("4451") || /\bgrocery\b|\bsupermarket\b/.test(text)) return ["grocery"];
  if (/ice cream|gelato|bakery|donut|doughnut|cookie|cake shop|frozen yogurt|dessert/.test(text)) {
    return ["dessert"];
  }
  if (/coffee|soda|boba|smoothie|espresso|tea house|drive-through drink/.test(text))
    return ["drinks"];
  if (/\bbbq\b|barbecue|barbeque|smokehouse/.test(text)) return ["bbq"];
  if (/indian|tandoor|curry house/.test(text)) return ["indian"];
  if (/greek|gyro|mediterranean|falafel|shawarma|hummus/.test(text)) return ["mediterranean"];
  if (/sushi|ramen|pho\b|thai|chinese|wok|teriyaki|poke|hibachi|vietnam|korean|asian/.test(text)) {
    return ["asian"];
  }
  if (
    /taco|mexican|burrito|cantina|taqueria|enchilada|latin|aguachile|marisco|clamato|torta|pupusa/.test(
      text,
    )
  ) {
    return ["mexican"];
  }
  if (/pizza|italian|pasta|pizzeria/.test(text)) return ["italian"];
  if (/cafe|coffee shop|breakfast|pancake|waffle|diner|brunch/.test(text)) return ["breakfast"];
  if (/fast food|quick service|drive-through|drive through/.test(text)) return ["fast-food"];
  if (/\bbar\b|\bpub\b|brewery|tavern|taproom/.test(text)) return ["drinks"];
  if (/seafood|burger|steak|grill|restaurant|kitchen|bistro|diner/.test(text)) return ["american"];
  return ["other"];
}

function proseDescription(name: string, street: string, cuisines: Cuisine[]): string {
  const chain = findChain(name);
  if (chain) return chain.description;
  const where = streetLabel(street);
  const place = where.length > 0 ? ` on ${where.replace(/\.+$/, "")}` : "";
  const lead: Record<Cuisine, string> = {
    american: "American restaurant",
    mexican: "Mexican restaurant",
    italian: "Italian restaurant",
    asian: "Asian restaurant",
    mediterranean: "Mediterranean restaurant",
    indian: "Indian restaurant",
    bbq: "Barbecue restaurant",
    breakfast: "Breakfast and cafe spot",
    "fast-food": "Fast-food restaurant",
    dessert: "Dessert shop",
    drinks: "Drink shop",
    grocery: "Grocery store with hot food",
    other: "Place to eat",
  };
  return `${lead[cuisines[0] ?? "other"]}${place}.`;
}

function slug(value: string): string {
  return norm(value).replace(/\s+/g, "-").replace(/^-|-$/g, "");
}

function shouldKeep(license: License, name: string): string | undefined {
  if (
    DROP_NAME.test(name) ||
    DROP_NAME.test(license.description) ||
    DROP_FACILITY.test(name) ||
    DROP_FACILITY.test(license.description)
  ) {
    return "institution, mobile, or convenience";
  }
  if (license.naics.startsWith("44512") || license.naics === "44512") {
    return "convenience store";
  }
  if (license.naics.startsWith("7223")) {
    if (
      !/restaurant|cafe|bakery|ice cream|grill|pizza|deli/i.test(`${name} ${license.description}`)
    ) {
      return "special food service without a storefront";
    }
  }
  if (license.naics.startsWith("4451") && !license.naics.startsWith("44512")) {
    if (/dollar|family dollar|smoke|vape|liquor|pharmacy/i.test(name)) {
      return "not a grocery we would browse for a meal";
    }
  }
  if (
    license.naics.startsWith("3118") &&
    /tortilla manufacturing/i.test(license.description) &&
    !/bakery|restaurant/i.test(name)
  ) {
    return "manufacturing, not a bakery counter";
  }
  if (
    !license.naics.startsWith("722") &&
    !license.naics.startsWith("4451") &&
    !license.naics.startsWith("3118")
  ) {
    return "outside food NAICS";
  }
  return undefined;
}

function jsString(value: string): string {
  return JSON.stringify(value);
}

const WEBER_CITIES = [
  { label: "Roy", slug: "roy" },
  { label: "South Ogden", slug: "south-ogden" },
  { label: "Riverdale", slug: "riverdale" },
  { label: "North Ogden", slug: "north-ogden" },
  { label: "West Haven", slug: "west-haven" },
  { label: "Pleasant View", slug: "pleasant-view" },
  { label: "Harrisville", slug: "harrisville" },
  { label: "Washington Terrace", slug: "washington-terrace" },
  { label: "Farr West", slug: "farr-west" },
  { label: "Hooper", slug: "hooper" },
  { label: "Plain City", slug: "plain-city" },
  { label: "Marriott-Slaterville", slug: "marriott-slaterville" },
  { label: "Uintah", slug: "uintah" },
  { label: "Huntsville", slug: "huntsville" },
  { label: "Eden", slug: "eden" },
] as const;

const DROP_ESTABLISHMENT =
  /\b(elementary|middle school|high school|junior high|jr high|preschool|preschools|daycare|day care|child care|head start|hospital|medical|nursing|rehab|fellowship|jail|prison|correction|sheriff|church|seminary|lds|stake|mobile|food truck|food trailer|commissary|vending|maverik|7-11|7-eleven|7 eleven|chevron|sinclair|convenience|cafeteria|school|academy|senior center|weber state|wsu|university|college|district|charter|headstart)\b/i;

function renderCatalog(
  city: string,
  exportName: string,
  comment: string,
  rows: { id: string; name: string; description: string; cuisines: Cuisine[]; menu?: string }[],
): string {
  const menus = [...new Set(rows.flatMap((row) => (row.menu ? [row.menu] : [])))].toSorted();
  const importLine =
    menus.length === 0
      ? ""
      : `import {\n${menus.map((menu) => `  ${menu},`).join("\n")}\n} from "./popularMenus.ts";\n\n`;
  const entries = rows
    .map((row) => {
      const cuisines = row.cuisines.map((cuisine) => jsString(cuisine)).join(", ");
      const menuLine = row.menu ? `,\n    ${row.menu}` : "";
      return `  restaurant(\n    ${jsString(row.id)},\n    ${jsString(row.name)},\n    ${jsString(city)},\n    ${jsString(row.description)},\n    [${cuisines}]${menuLine},\n  )`;
    })
    .join(",\n");
  return `import { restaurant } from "../restaurantEntry.ts";\n${importLine}/** ${comment} */\nexport const ${exportName} = [\n${entries},\n];\n`;
}

function rowsForCity(cityLabel: string, citySlug: string, establishments: Establishment[]) {
  const places = establishments.filter((row) => row.city === cityLabel);
  const seen = new Set<string>();
  const candidates: { name: string; street: string }[] = [];
  for (const place of places) {
    const chain = findChain(place.name);
    const name = chain?.name ?? titleCase(storefrontName(place.name));
    const label = `${place.name} ${name}`;
    if (name.length === 0 || DROP_ESTABLISHMENT.test(label) || DROP_FACILITY.test(label)) continue;
    const key = `${norm(name)}|${norm(place.street)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    candidates.push({ name, street: place.street });
  }
  const nameCounts = new Map<string, number>();
  for (const candidate of candidates) {
    nameCounts.set(candidate.name, (nameCounts.get(candidate.name) ?? 0) + 1);
  }
  const usedIds = new Set<string>();
  return candidates
    .map((candidate) => {
      const label = streetLabel(candidate.street);
      const display =
        (nameCounts.get(candidate.name) ?? 0) > 1 && label.length > 0
          ? `${candidate.name} (${label})`
          : candidate.name;
      const base = slug(display).replace(new RegExp(`-${citySlug}$`), "");
      let id = `${base}-${citySlug}`;
      if (usedIds.has(id)) id = `${slug(candidate.name)}-${slug(label)}-${citySlug}`;
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${slug(candidate.name)}-${slug(label)}-${String(suffix)}-${citySlug}`;
        suffix += 1;
      }
      usedIds.add(id);
      const cuisines = classify(candidate.name, "", "");
      return {
        id,
        name: display,
        street: candidate.street,
        description: proseDescription(display, candidate.street, cuisines),
        cuisines,
        menu: findChain(candidate.name)?.menu,
      };
    })
    .toSorted((a, b) => a.name.localeCompare(b.name) || a.street.localeCompare(b.street));
}

async function main(): Promise<void> {
  const [establishments, licenses] = await Promise.all([fetchEstablishments(), fetchLicenses()]);
  await writeFile(
    path.join(ROOT, "design", "weber-food-establishments.csv"),
    csv([
      ["facility_id", "name", "street", "city_raw", "city", "zip"],
      ...establishments.map((row) => [
        row.facilityId,
        row.name,
        row.street,
        row.cityRaw,
        row.city,
        row.zip,
      ]),
    ]),
  );
  await writeFile(
    path.join(ROOT, "design", "ogden-food-licenses.csv"),
    csv([
      [
        "license_number",
        "dba",
        "business_name",
        "street",
        "naics",
        "naics_desc",
        "description",
        "status",
      ],
      ...licenses.map((row) => [
        row.licenseNumber,
        row.dba,
        row.businessName,
        row.street,
        row.naics,
        row.naicsDesc,
        row.description,
        row.status,
      ]),
    ]),
  );

  const seenLicense = new Set<string>();
  const uniqueLicenses = licenses.filter((license) => {
    if (seenLicense.has(license.licenseNumber)) return false;
    seenLicense.add(license.licenseNumber);
    return true;
  });

  type Kept = {
    id: string;
    name: string;
    street: string;
    naics: string;
    description: string;
    cuisines: Cuisine[];
    menu?: string;
    reason: string;
  };
  const kept: Kept[] = [];
  const review: string[][] = [
    ["decision", "reason", "name", "street", "naics", "license_description", "cuisines"],
  ];
  const nameCounts = new Map<string, number>();
  const candidates: { license: License; name: string }[] = [];
  for (const license of uniqueLicenses) {
    const rawName = license.dba.length > 0 ? license.dba : license.businessName;
    const chain = findChain(rawName);
    const name = chain?.name ?? titleCase(storefrontName(rawName));
    const drop = shouldKeep(license, `${rawName} ${name}`);
    if (drop) {
      review.push(["drop", drop, name, license.street, license.naics, license.description, ""]);
      continue;
    }
    if (name.length === 0) {
      review.push([
        "drop",
        "missing name",
        rawName,
        license.street,
        license.naics,
        license.description,
        "",
      ]);
      continue;
    }
    candidates.push({ license, name });
    nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
  }

  const usedIds = new Set<string>();
  for (const candidate of candidates) {
    const { license, name } = candidate;
    const label = streetLabel(license.street);
    const display =
      (nameCounts.get(name) ?? 0) > 1 && label.length > 0 ? `${name} (${label})` : name;
    const base = slug(display).replace(/-ogden$/, "");
    let id = `${base}-ogden`;
    if (usedIds.has(id)) id = `${slug(name)}-${slug(label)}-ogden`;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${slug(name)}-${slug(label)}-${String(suffix)}-ogden`;
      suffix += 1;
    }
    usedIds.add(id);
    const cuisines = classify(name, license.description, license.naics);
    const description = proseDescription(display, license.street, cuisines);
    const menu = findChain(name)?.menu;
    kept.push({
      id,
      name: display,
      street: license.street,
      naics: license.naics,
      description,
      cuisines,
      menu,
      reason: "active food license",
    });
    review.push([
      "keep",
      "active food license",
      display,
      license.street,
      license.naics,
      license.description,
      cuisines.join("|"),
    ]);
  }

  kept.sort((a, b) => a.name.localeCompare(b.name) || a.street.localeCompare(b.street));
  await writeFile(path.join(ROOT, "design", "ogden-restaurant-review.csv"), csv(review));
  await writeFile(
    path.join(ROOT, "src", "data", "restaurants", "ogden.ts"),
    renderCatalog(
      "ogden",
      "ogdenRestaurants",
      "Ogden places seeded from active city food licenses, September 2026.",
      kept,
    ),
  );
  const cityCounts: string[] = [];
  for (const city of WEBER_CITIES) {
    const rows = rowsForCity(city.label, city.slug, establishments);
    const exportName = `${city.slug.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}Restaurants`;
    await writeFile(
      path.join(ROOT, "src", "data", "restaurants", `${city.slug}.ts`),
      renderCatalog(
        city.slug,
        exportName,
        `${city.label} places seeded from Weber-Morgan food inspection records, September 2026.`,
        rows,
      ),
    );
    cityCounts.push(`${city.slug} ${String(rows.length)}`);
  }
  console.log(
    `establishments ${String(establishments.length)}, licenses ${String(uniqueLicenses.length)}, kept ${String(kept.length)}; ${cityCounts.join(", ")}`,
  );
}

await main();
