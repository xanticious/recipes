import {
  FODMAP_REASONS,
  FODMAP_REASON_LABELS,
  FODMAP_TYPE_LABELS,
  fodmapLevelFromStatus,
  getIngredientFodmap,
  type FodmapReason,
} from "./ingredientFodmap.ts";
import type {
  FodmapLevel,
  GlutenLevel,
  Ingredient,
  IngredientHaStatus,
  LactoseLevel,
} from "./types.ts";

export type FodmapTypeRating = {
  level: FodmapLevel;
  servingSize?: string;
};

export type IngredientFodmapDiet = {
  overall: FodmapLevel | "unknown";
  servingSize?: string;
  highestTypes: readonly FodmapReason[];
  types: Record<FodmapReason, FodmapTypeRating>;
};

export type IngredientDiet = {
  lactose: LactoseLevel;
  gluten: GlutenLevel;
  cheese: boolean;
  fodmap: IngredientFodmapDiet;
};

const CHEESE_IDS = new Set([
  "cottage-cheese",
  "ricotta",
  "cream-cheese",
  "mascarpone",
  "cheddar",
  "sharp-cheddar",
  "colby",
  "colby-jack",
  "monterey-jack",
  "pepper-jack",
  "mozzarella",
  "fresh-mozzarella",
  "provolone",
  "american-cheese",
  "muenster",
  "havarti",
  "string-cheese",
  "cheese-curds",
  "feta",
  "goat-cheese",
  "brie",
  "camembert",
  "blue-cheese",
  "gorgonzola",
  "roquefort",
  "parmesan",
  "pecorino",
  "romano",
  "asiago",
  "gruyere",
  "swiss",
  "emmental",
  "gouda",
  "aged-gouda",
  "manchego",
  "halloumi",
  "paneer",
  "queso-fresco",
  "queso-blanco",
  "cotija",
  "oaxaca",
  "asadero",
  "queso-oaxaca",
  "fromage-blanc",
  "quark",
  "lactose-free-cheddar",
  "lactose-free-cheese-curds",
  "lactose-free-feta",
  "lactose-free-cream-cheese",
]);

const LOW_AT = /low(?: only)? at (?:about |up to )?/i;

function joinList(items: readonly string[]): string {
  if (items.length === 0) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export const LACTOSE_LABELS: Record<LactoseLevel, string> = {
  free: "None",
  low: "Low",
  high: "High",
};

export const GLUTEN_LABELS: Record<GlutenLevel, string> = {
  free: "None",
  low: "Low",
  high: "High",
};

export const FODMAP_LEVEL_LABELS: Record<FodmapLevel, string> = {
  low: "Low",
  watch: "Watch serving size",
  high: "High",
};

export function ingredientContainsCheese(ingredient: Ingredient): boolean {
  if (CHEESE_IDS.has(ingredient.id)) {
    return true;
  }
  const text = `${ingredient.id} ${ingredient.name}`.toLowerCase();
  return text.includes("cheese") || text.includes("queso");
}

export function servingSizeFromNote(note: string | undefined): string | undefined {
  if (!note) {
    return undefined;
  }
  const idx = note.search(LOW_AT);
  if (idx >= 0) {
    const rest = note.slice(idx).replace(LOW_AT, "").trim();
    const cut = rest.split(/[,;]|\s+high\b|\s+moderate\b/i)[0]?.trim();
    if (cut && cut.length > 0 && cut.length < 80) {
      return cut.replace(/\.$/, "");
    }
  }
  const amount = note.match(
    /(\d[\w./–\- %]*(?:g|ml|cup|tbsp|tsp|tablespoon|teaspoon|slice|glass|nuts?)\b[^,;]*)/i,
  );
  if (amount) {
    return amount[1].trim().replace(/\.$/, "");
  }
  return undefined;
}

function nameLooksLactoseFree(ingredient: Ingredient): boolean {
  return (
    ingredient.id.includes("lactose-free") || ingredient.name.toLowerCase().includes("lactose-free")
  );
}

function nameLooksGlutenFree(ingredient: Ingredient): boolean {
  const name = ingredient.name.toLowerCase();
  return (
    ingredient.id.startsWith("gf-") ||
    ingredient.id.includes("gluten-free") ||
    name.includes("gluten-free")
  );
}

export function ingredientLactoseLevel(ingredient: Ingredient): LactoseLevel {
  if (ingredient.lactose) {
    return ingredient.lactose;
  }
  if (nameLooksLactoseFree(ingredient)) {
    return "free";
  }
  if (ingredient.notes?.toLowerCase().includes("lactose-clear")) {
    return "free";
  }

  const fodmap = getIngredientFodmap(ingredient.id);
  if (fodmap?.reasons.includes("lactose")) {
    if (fodmap.status === "high") {
      return "high";
    }
    if (fodmap.status === "depends") {
      return "low";
    }
    return "free";
  }
  if (ingredient.flags.includes("lactose")) {
    return fodmap?.status === "low" ? "low" : "high";
  }
  return "free";
}

export function ingredientGlutenLevel(ingredient: Ingredient): GlutenLevel {
  if (ingredient.gluten) {
    return ingredient.gluten;
  }
  if (nameLooksGlutenFree(ingredient)) {
    return "free";
  }
  if (ingredient.flags.includes("gluten")) {
    return "high";
  }
  return "free";
}

function emptyFodmapTypes(): Record<FodmapReason, FodmapTypeRating> {
  return {
    fructose: { level: "low" },
    fructans: { level: "low" },
    gos: { level: "low" },
    lactose: { level: "low" },
    sorbitol: { level: "low" },
    mannitol: { level: "low" },
  };
}

export function ingredientFodmapDiet(ingredient: Ingredient): IngredientFodmapDiet {
  const entry = getIngredientFodmap(ingredient.id);
  const types = emptyFodmapTypes();
  if (!entry) {
    return { overall: "unknown", highestTypes: [], types };
  }

  const overall = fodmapLevelFromStatus(entry.status);
  const servingSize = overall === "watch" ? servingSizeFromNote(entry.note) : undefined;
  const highestTypes = overall === "low" ? [] : entry.reasons;

  for (const reason of entry.reasons) {
    types[reason] = {
      level: overall,
      ...(servingSize && overall !== "low" ? { servingSize } : {}),
    };
  }

  return {
    overall,
    ...(servingSize ? { servingSize } : {}),
    highestTypes,
    types,
  };
}

export function describeIngredientDiet(ingredient: Ingredient): IngredientDiet {
  return {
    lactose: ingredientLactoseLevel(ingredient),
    gluten: ingredientGlutenLevel(ingredient),
    cheese: ingredientContainsCheese(ingredient),
    fodmap: ingredientFodmapDiet(ingredient),
  };
}

export function assumedIngredientHa(ingredient: Ingredient): IngredientHaStatus {
  const diet = describeIngredientDiet(ingredient);
  const highFodmap = diet.fodmap.overall === "high";
  if (diet.lactose === "high" || diet.cheese || highFodmap) {
    return "not-ha-assumed";
  }
  const fodmapOk = diet.fodmap.overall === "low" || diet.fodmap.overall === "watch";
  if (diet.lactose === "free" && diet.gluten === "free" && fodmapOk) {
    return "ha-assumed";
  }
  return "unknown";
}

export function formatFodmapTypeLine(reason: FodmapReason, rating: FodmapTypeRating): string {
  const name = FODMAP_TYPE_LABELS[reason];
  if (rating.level === "low") {
    return `${name}: low`;
  }
  if (rating.level === "high") {
    return rating.servingSize ? `${name}: high (${rating.servingSize})` : `${name}: high`;
  }
  return rating.servingSize
    ? `${name}: watch serving size (${rating.servingSize})`
    : `${name}: watch serving size`;
}

export function formatHighestFodmap(diet: IngredientFodmapDiet): string {
  if (diet.overall === "unknown") {
    return "FODMAP unknown";
  }
  if (diet.overall === "low") {
    return "Low Fodmap";
  }

  const typeLabels = diet.highestTypes.map((reason) => FODMAP_REASON_LABELS[reason]);
  const types = typeLabels.length > 0 ? joinList(typeLabels) : "";
  if (diet.overall === "high") {
    return types ? `High Fodmap (${types})` : "High Fodmap";
  }

  const size = diet.servingSize;
  if (types && size) {
    return `Watch serving size (${types}, ${size})`;
  }
  if (types) {
    return `Watch serving size (${types})`;
  }
  if (size) {
    return `Watch serving size (${size})`;
  }
  return "Watch serving size";
}

export function fodmapTypeLines(diet: IngredientFodmapDiet): string[] {
  return FODMAP_REASONS.map((reason) => formatFodmapTypeLine(reason, diet.types[reason]));
}
