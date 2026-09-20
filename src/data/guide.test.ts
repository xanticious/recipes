import { expect, test } from "vitest";
import { kitchenGuide } from "./guide.ts";

test("the kitchen guide covers House Approved, sourdough, and substitutions", () => {
  const ids = kitchenGuide.sections.map((section) => section.id);
  expect(ids).toEqual(["ha", "sourdough", "substitutions"]);
  const substitutions = kitchenGuide.sections.find((section) => section.id === "substitutions");
  expect(substitutions?.items).toEqual(
    expect.arrayContaining([
      "Substitute almond milk for milk.",
      "Substitute Daiya dairy-free cheddar shreds for cheddar.",
      "Substitute Follow Your Heart dairy-free American cheese slices for American cheese.",
    ]),
  );
});
