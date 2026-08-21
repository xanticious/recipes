import { ingredientsInBrowseOrder } from "./ingredientBrowse.ts";
import { ingredientHaStatus } from "./ha.ts";
import type { Ingredient } from "./types.ts";

export const CATEGORIZER_COLUMNS = [
  "ha-confirmed",
  "ha-assumed",
  "unknown",
  "not-ha-assumed",
  "not-ha-confirmed",
] as const;

export type CategorizerColumn = (typeof CATEGORIZER_COLUMNS)[number];

export const CATEGORIZER_COLUMN_LABELS: Record<CategorizerColumn, string> = {
  "ha-confirmed": "HA - Confirmed",
  "ha-assumed": "HA - Assumed",
  unknown: "Unknown",
  "not-ha-assumed": "Not-HA Assumed",
  "not-ha-confirmed": "Not-HA Confirmed",
};

export const CATEGORIZER_COLUMN_KEYS: Record<CategorizerColumn, string> = {
  "ha-confirmed": "1",
  "ha-assumed": "2",
  unknown: "3",
  "not-ha-assumed": "4",
  "not-ha-confirmed": "5",
};

export const CATEGORIZER_KEY_COLUMNS: Readonly<Record<string, CategorizerColumn>> = {
  "1": "ha-confirmed",
  "2": "ha-assumed",
  "3": "unknown",
  "4": "not-ha-assumed",
  "5": "not-ha-confirmed",
};

export function isCategorizerColumn(value: string | null | undefined): value is CategorizerColumn {
  return CATEGORIZER_COLUMNS.some((column) => column === value);
}

export function categorizerColumnFromPoint(x: number, y: number): CategorizerColumn | null {
  const node = document.elementFromPoint(x, y);
  if (!(node instanceof Element)) {
    return null;
  }
  const value = node.closest("[data-column]")?.getAttribute("data-column");
  return isCategorizerColumn(value) ? value : null;
}

export type CategorizerExport = Record<CategorizerColumn, string[]>;

export function defaultCategorizerColumn(ingredient: Ingredient): CategorizerColumn {
  return ingredientHaStatus(ingredient);
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
  const lists: CategorizerExport = {
    "ha-confirmed": [],
    "ha-assumed": [],
    unknown: [],
    "not-ha-assumed": [],
    "not-ha-confirmed": [],
  };
  for (const ingredient of ingredientsInBrowseOrder(catalog)) {
    lists[categorizerColumn(ingredient, overrides)].push(ingredient.id);
  }
  return lists;
}

export function categorizerExportJson(
  catalog: readonly Ingredient[],
  overrides: Readonly<Record<string, CategorizerColumn>>,
): string {
  return `${JSON.stringify(categorizerExport(catalog, overrides), null, 2)}\n`;
}
