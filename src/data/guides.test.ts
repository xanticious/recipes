import { expect, test } from "vitest";
import { kitchenGuide } from "./guide.ts";

test("the kitchen guide covers conversion, swaps, and nutrition", () => {
  const ids = kitchenGuide.sections.map((section) => section.id);
  expect(ids).toEqual(
    expect.arrayContaining([
      "ha",
      "gluten",
      "lactose",
      "fat",
      "fructose",
      "fructans",
      "polyols",
      "convert",
      "nutrition",
    ]),
  );
  expect(kitchenGuide.sections.some((section) => (section.swaps?.length ?? 0) > 0)).toBe(true);
});
