import { expect, test } from "vitest";
import { GUIDE_DISCLAIMER, GUIDE_HA, kitchenGuide } from "./guide.ts";

test("the substitution guide states House Approved once and lists household swaps", () => {
  expect(kitchenGuide.title).toBe("Substitution Guide");
  expect(kitchenGuide.ha).toBe(GUIDE_HA);
  expect(GUIDE_DISCLAIMER).toContain("our family");
  expect(kitchenGuide.substitutions).toEqual(
    expect.arrayContaining([
      { original: "Milk", substitution: "Almond milk" },
      {
        original: "Shredded cheddar cheese",
        substitution: "Daiya dairy-free cheddar shreds",
      },
      {
        original: "Sliced cheddar cheese",
        substitution:
          "Daiya cheddar cheese slices or Follow Your Heart dairy-free American cheese slices",
      },
      { original: "Wheat or white bread", substitution: "Sourdough bread" },
    ]),
  );
});
