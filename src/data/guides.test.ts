import { expect, test } from "vitest";
import { kitchenGuide } from "./guide.ts";

test("the kitchen guide covers House Approved, sourdough, and substitutions", () => {
  const ids = kitchenGuide.sections.map((section) => section.id);
  expect(ids).toEqual(["ha", "sourdough", "substitutions"]);
  const substitutions = kitchenGuide.sections.find((section) => section.id === "substitutions");
  expect(substitutions?.items?.length).toBeGreaterThan(0);
});
