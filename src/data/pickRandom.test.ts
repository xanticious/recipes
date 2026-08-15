import { expect, test } from "vitest";
import { pickRandomId } from "./pickRandom.ts";

test("returns null when there are no ids", () => {
  expect(pickRandomId([], null)).toBeNull();
});

test("returns the only id even if it was last", () => {
  expect(pickRandomId(["only"], "only")).toBe("only");
});

test("avoids the last id when others exist", () => {
  const seen = new Set<string>();
  for (let i = 0; i < 20; i += 1) {
    const picked = pickRandomId(["a", "b", "c"], "a", () => 0);
    if (picked) {
      seen.add(picked);
    }
  }
  expect(seen.has("a")).toBe(false);
  expect(seen.size).toBe(1);
});

test("uses the random function to choose an index", () => {
  expect(pickRandomId(["a", "b", "c"], null, () => 0.99)).toBe("c");
});
