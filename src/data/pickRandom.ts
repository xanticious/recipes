export function pickRandomId(
  ids: readonly string[],
  lastId: string | null,
  random: () => number = Math.random,
): string | null {
  if (ids.length === 0) {
    return null;
  }
  if (ids.length === 1) {
    return ids[0] ?? null;
  }

  const pool = lastId ? ids.filter((id) => id !== lastId) : ids;
  const index = Math.floor(random() * pool.length);
  return pool[index] ?? null;
}
