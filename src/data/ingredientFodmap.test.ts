import { expect, test } from "vitest";
import {
  fodmapLevelFromStatus,
  formatFodmapInfo,
  getIngredientFodmap,
  joinFodmapReasons,
} from "./ingredientFodmap.ts";

test("fodmapLevelFromStatus maps depends to watch", () => {
  expect(fodmapLevelFromStatus("low")).toBe("low");
  expect(fodmapLevelFromStatus("high")).toBe("high");
  expect(fodmapLevelFromStatus("depends")).toBe("watch");
});

test("joinFodmapReasons uses commas and a final and", () => {
  expect(joinFodmapReasons([])).toBe("");
  expect(joinFodmapReasons(["fructose"])).toBe("fructose");
  expect(joinFodmapReasons(["fructose", "lactose"])).toBe("fructose and lactose");
  expect(joinFodmapReasons(["fructose", "fructans", "gos"])).toBe("fructose, fructans, and GOS");
});

test("formatFodmapInfo prefers a note, then reasons", () => {
  expect(
    formatFodmapInfo({
      description: "Garlic",
      status: "high",
      reasons: ["fructans"],
      note: "avoid even small amounts",
    }),
  ).toBe("High Fodmap (avoid even small amounts)");
  expect(
    formatFodmapInfo({
      description: "Garlic",
      status: "high",
      reasons: ["fructans"],
    }),
  ).toBe("High Fodmap (fructans)");
  expect(
    formatFodmapInfo({
      description: "Rice",
      status: "low",
      reasons: [],
    }),
  ).toBe("Low Fodmap");
});

test("getIngredientFodmap looks up catalog rows", () => {
  expect(getIngredientFodmap("garlic")?.status).toBe("high");
  expect(getIngredientFodmap("not-an-ingredient")).toBeUndefined();
});
