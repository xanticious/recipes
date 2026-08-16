import { ingredientsInBrowseOrder } from "./ingredientBrowse.ts";
import { ingredientHaStatus } from "./ha.ts";
import type { Ingredient } from "./types.ts";

export const CATEGORIZER_COLUMNS = ["uncategorized", "ha", "pending", "notHa"] as const;

export type CategorizerColumn = (typeof CATEGORIZER_COLUMNS)[number];

export const CATEGORIZER_COLUMN_LABELS: Record<CategorizerColumn, string> = {
  uncategorized: "Uncategorized",
  ha: "HA",
  pending: "Pending",
  notHa: "Not HA",
};

export const CATEGORIZER_COLUMN_KEYS: Record<CategorizerColumn, string> = {
  uncategorized: "1",
  ha: "2",
  pending: "3",
  notHa: "4",
};

export const CATEGORIZER_KEY_COLUMNS: Readonly<Record<string, CategorizerColumn>> = {
  "1": "uncategorized",
  "2": "ha",
  "3": "pending",
  "4": "notHa",
};

export type CategorizerExport = {
  ha: string[];
  "not-ha": string[];
};

export function defaultCategorizerColumn(ingredient: Ingredient): CategorizerColumn {
  const status = ingredientHaStatus(ingredient);
  if (status === "yes") {
    return "ha";
  }
  if (status === "no") {
    return "notHa";
  }
  return "uncategorized";
}

export function categorizerColumn(
  ingredient: Ingredient,
  overrides: Readonly<Record<string, CategorizerColumn>>,
): CategorizerColumn {
  return overrides[ingredient.id] ?? defaultCategorizerColumn(ingredient);
}

export function ingredientsInColumn(
  catalog: readonly Ingredient[],
  overrides: Readonly<Record<string, CategorizerColumn>>,
  column: CategorizerColumn,
): Ingredient[] {
  return ingredientsInBrowseOrder(catalog).filter(
    (ingredient) => categorizerColumn(ingredient, overrides) === column,
  );
}

export function categorizerExport(
  catalog: readonly Ingredient[],
  overrides: Readonly<Record<string, CategorizerColumn>>,
): CategorizerExport {
  const ha: string[] = [];
  const notHa: string[] = [];
  for (const ingredient of ingredientsInBrowseOrder(catalog)) {
    const column = categorizerColumn(ingredient, overrides);
    if (column === "ha") {
      ha.push(ingredient.id);
    } else if (column === "notHa") {
      notHa.push(ingredient.id);
    }
  }
  return { ha, "not-ha": notHa };
}

export function categorizerExportJson(
  catalog: readonly Ingredient[],
  overrides: Readonly<Record<string, CategorizerColumn>>,
): string {
  return `${JSON.stringify(categorizerExport(catalog, overrides), null, 2)}\n`;
}
