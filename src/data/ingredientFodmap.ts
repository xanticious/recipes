import { ingredientFodmapById } from "./ingredientFodmap.data.ts";

export { ingredientFodmapById };

export const FODMAP_STATUSES = ["low", "high", "depends"] as const;

export type FodmapStatus = (typeof FODMAP_STATUSES)[number];

export const FODMAP_REASONS = [
  "fructans",
  "gos",
  "lactose",
  "fructose",
  "sorbitol",
  "mannitol",
] as const;

export type FodmapReason = (typeof FODMAP_REASONS)[number];

export type IngredientFodmap = {
  description: string;
  status: FodmapStatus;
  reasons: readonly FodmapReason[];
  note?: string;
};

export const FODMAP_STATUS_LABELS: Record<FodmapStatus, string> = {
  low: "Low Fodmap",
  high: "High Fodmap",
  depends: "Depends on serving size",
};

export const FODMAP_REASON_LABELS: Record<FodmapReason, string> = {
  fructans: "fructans",
  gos: "GOS",
  lactose: "lactose",
  fructose: "excess fructose",
  sorbitol: "sorbitol",
  mannitol: "mannitol",
};

export function joinFodmapReasons(reasons: readonly FodmapReason[]): string {
  const labels = reasons.map((reason) => FODMAP_REASON_LABELS[reason]);
  if (labels.length === 0) {
    return "";
  }
  if (labels.length === 1) {
    return labels[0];
  }
  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

export function formatFodmapInfo(entry: IngredientFodmap): string {
  const status = FODMAP_STATUS_LABELS[entry.status];
  if (entry.note) {
    return `${status} (${entry.note})`;
  }
  const reasons = joinFodmapReasons(entry.reasons);
  return reasons.length > 0 ? `${status} (${reasons})` : status;
}

export function getIngredientFodmap(id: string): IngredientFodmap | undefined {
  return ingredientFodmapById[id];
}
