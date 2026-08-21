/**
 * Classify House Approval from a list of ingredients, or write assumed tags
 * onto the recipe catalog.
 *
 *   node --experimental-strip-types scripts/classify-recipe-ha.ts chicken-breast rice broccoli
 *   node --experimental-strip-types scripts/classify-recipe-ha.ts --catalog --verbose
 *   node --experimental-strip-types scripts/classify-recipe-ha.ts --write
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  classifyRecipeHa,
  HA_TAG_TITLES,
  ingredientHaStatus,
  ingredientLookup,
  ingredients,
  isConfirmedHa,
  recipeHaBreakdown,
  recipes,
  type AssumedHaStatus,
  type HaStatus,
  type Ingredient,
  type RecipeHaIngredient,
} from "../src/data/index.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RECIPE_DIR = path.join(ROOT, "src", "data", "recipes");

const RECIPE_HA_BLOCK =
  /(id: "([^"]+)",\n    title: [^\n]+\n    mealType: [^\n]+\n    cuisine: [^\n]+\n    specialOccasion: (?:true|false),\n    ha: )"([^"]+)"/g;

type Flags = {
  write: boolean;
  verbose: boolean;
  catalog: boolean;
  tokens: string[];
};

function parseArgs(argv: string[]): Flags {
  const flags: Flags = { write: false, verbose: false, catalog: false, tokens: [] };
  for (const arg of argv) {
    if (arg === "--write") {
      flags.write = true;
    } else if (arg === "--verbose" || arg === "-v") {
      flags.verbose = true;
    } else if (arg === "--catalog") {
      flags.catalog = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown flag: ${arg}`);
    } else {
      flags.tokens.push(arg);
    }
  }
  return flags;
}

function printHelp() {
  console.log(`Classify recipe House Approval from ingredients.

Usage:
  node --experimental-strip-types scripts/classify-recipe-ha.ts <ingredient...>
  node --experimental-strip-types scripts/classify-recipe-ha.ts --catalog [--verbose]
  node --experimental-strip-types scripts/classify-recipe-ha.ts --write

Ingredients may be catalog ids or names. Assumed status is the worst ingredient:
  Not-HA (confirmed or assumed) → Not-HA Assumed
  Unknown (or a missing id)     → Unknown
  all HA confirmed or assumed   → HA Assumed

Confirmed tags are household yes/no and are never written by this script.
Eat-out entries have no ingredient list, so they classify as Unknown.`);
}

function normalizeToken(token: string): string {
  return token.trim().toLowerCase().replace(/_/g, "-").replace(/\s+/g, "-");
}

function resolveIngredient(token: string): Ingredient | undefined {
  const exact = ingredientLookup.get(token) ?? ingredientLookup.get(token.toLowerCase());
  if (exact) {
    return exact;
  }
  const slug = normalizeToken(token);
  const byId = ingredientLookup.get(slug);
  if (byId) {
    return byId;
  }
  const name = token.trim().toLowerCase();
  return ingredients.find(
    (ingredient) => ingredient.name.toLowerCase() === name || ingredient.id === slug,
  );
}

function statusLabel(status: HaStatus): string {
  return HA_TAG_TITLES[status];
}

function drivingIngredients(
  status: AssumedHaStatus,
  items: readonly RecipeHaIngredient[],
): RecipeHaIngredient[] {
  if (status === "not-ha-assumed") {
    return items.filter(
      (item) => item.status === "not-ha-assumed" || item.status === "not-ha-confirmed",
    );
  }
  if (status === "unknown") {
    return items.filter((item) => item.status === "unknown" || item.missing);
  }
  return [];
}

function printIngredientList(items: readonly RecipeHaIngredient[]) {
  const breakdown = {
    status: recipeHaBreakdown(
      items.map((item) => item.id),
      ingredientLookup,
    ).status,
    ingredients: items,
  };
  console.log(statusLabel(breakdown.status));
  if (items.length === 0) {
    return;
  }
  for (const item of items) {
    const missing = item.missing ? " (missing from catalog)" : "";
    console.log(`  ${item.id.padEnd(28)} ${statusLabel(item.status)}${missing}`);
  }
  const drivers = drivingIngredients(breakdown.status, items);
  if (drivers.length > 0) {
    console.log(`driven by: ${drivers.map((item) => item.name).join(", ")}`);
  }
}

function classifyTokens(tokens: string[]): number {
  const resolved: RecipeHaIngredient[] = [];
  const missing: string[] = [];
  for (const token of tokens) {
    const ingredient = resolveIngredient(token);
    if (!ingredient) {
      missing.push(token);
      resolved.push({ id: token, name: token, status: "unknown", missing: true });
      continue;
    }
    resolved.push({
      id: ingredient.id,
      name: ingredient.name,
      status: ingredientHaStatus(ingredient),
      missing: false,
    });
  }
  printIngredientList(resolved);
  if (missing.length > 0) {
    console.error(`Unknown ingredients: ${missing.join(", ")}`);
    return 1;
  }
  return 0;
}

function assumedCatalogHa(recipe: (typeof recipes)[number]): AssumedHaStatus {
  return classifyRecipeHa(recipe, ingredientLookup);
}

function printCatalog(verbose: boolean) {
  const counts: Record<AssumedHaStatus, number> = {
    "ha-assumed": 0,
    unknown: 0,
    "not-ha-assumed": 0,
  };
  let confirmed = 0;

  for (const recipe of recipes) {
    if (isConfirmedHa(recipe.ha)) {
      confirmed += 1;
      if (verbose) {
        console.log(`${recipe.id}\t${statusLabel(recipe.ha)}\t(confirmed)`);
      }
      continue;
    }
    const breakdown = recipe.eatOut
      ? { status: "unknown" as const, ingredients: [] }
      : recipeHaBreakdown(
          recipe.ingredients.map((line) => line.ingredientId),
          ingredientLookup,
        );
    counts[breakdown.status] += 1;
    const drivers = drivingIngredients(breakdown.status, breakdown.ingredients);
    const driverNote = drivers.length > 0 ? `\t${drivers.map((item) => item.name).join(", ")}` : "";
    console.log(`${recipe.id}\t${statusLabel(breakdown.status)}${driverNote}`);
    if (verbose) {
      for (const item of breakdown.ingredients) {
        const missing = item.missing ? " (missing)" : "";
        console.log(`  ${item.id}\t${statusLabel(item.status)}${missing}`);
      }
    }
  }

  console.error(
    `\n${recipes.length} recipes: ${counts["ha-assumed"]} HA - Assumed, ${counts.unknown} Unknown, ${counts["not-ha-assumed"]} Not-HA Assumed, ${confirmed} confirmed`,
  );
}

function patchRecipeSource(source: string, haById: Map<string, AssumedHaStatus>): string {
  RECIPE_HA_BLOCK.lastIndex = 0;
  return source.replace(RECIPE_HA_BLOCK, (full, prefix: string, id: string, current: string) => {
    if (current === "ha-confirmed" || current === "not-ha-confirmed") {
      return full;
    }
    const next = haById.get(id);
    if (!next) {
      return full;
    }
    return `${prefix}"${next}"`;
  });
}

async function writeCatalog(): Promise<number> {
  const haById = new Map<string, AssumedHaStatus>();
  for (const recipe of recipes) {
    if (isConfirmedHa(recipe.ha)) {
      continue;
    }
    haById.set(recipe.id, assumedCatalogHa(recipe));
  }

  const names = (await readdir(RECIPE_DIR)).filter(
    (name) => name.endsWith(".ts") && name !== "index.ts",
  );
  let files = 0;
  for (const name of names) {
    const filePath = path.join(RECIPE_DIR, name);
    const source = await readFile(filePath, "utf8");
    const next = patchRecipeSource(source, haById);
    if (next === source) {
      continue;
    }
    await writeFile(filePath, next);
    files += 1;
  }

  console.log(`Wrote assumed House Approval tags in ${files} files (${haById.size} recipes).`);
  return 0;
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));
  if (flags.tokens.length > 0) {
    if (flags.write) {
      throw new Error("Pass either ingredient ids or --write, not both.");
    }
    process.exitCode = classifyTokens(flags.tokens);
    return;
  }
  if (flags.write) {
    process.exitCode = await writeCatalog();
    return;
  }
  printCatalog(flags.verbose);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
