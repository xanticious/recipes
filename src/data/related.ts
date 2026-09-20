/** Catalog relation ids that are listed on A but not back on B. */
export function missingReverseLinks<T extends { id: string }>(
  items: readonly T[],
  relatedIds: (item: T) => readonly string[] | undefined,
): string[] {
  const byId = new Map(items.map((item) => [item.id, item]));
  const missing: string[] = [];
  for (const item of items) {
    for (const relatedId of relatedIds(item) ?? []) {
      const other = byId.get(relatedId);
      if (other === undefined) {
        continue;
      }
      if (!(relatedIds(other) ?? []).includes(item.id)) {
        missing.push(`${item.id} → ${relatedId}`);
      }
    }
  }
  return missing;
}
