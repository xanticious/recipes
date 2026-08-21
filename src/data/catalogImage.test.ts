import { expect, test } from "vitest";
import {
  layoutPlaceholderLabel,
  measurePlaceholderText,
  placeholderHue,
  sizedCatalogImage,
  wrapPlaceholderText,
} from "./catalogImage.ts";

test("placeholder hue is stable and in 0–359", () => {
  expect(placeholderHue("bok-choy")).toBe(placeholderHue("bok-choy"));
  expect(placeholderHue("bok-choy")).not.toBe(placeholderHue("garlic"));
  expect(placeholderHue("garlic")).toBeGreaterThanOrEqual(0);
  expect(placeholderHue("garlic")).toBeLessThan(360);
});

test("placeholder text wraps to the requested width", () => {
  const lines = wrapPlaceholderText("Kneaders Bakery & Cafe", 20, 80);
  expect(lines.length).toBeGreaterThan(1);
  for (const line of lines) {
    expect(measurePlaceholderText(line, 20)).toBeLessThanOrEqual(80);
  }
});

test("thin placeholder boxes keep every line inside the visible height", () => {
  const layout = layoutPlaceholderLabel("The Coop by Roosters", 80, 80);
  expect(layout.lines.length).toBeGreaterThan(0);
  const usedHeight = layout.lines.length * layout.fontSize * layout.lineHeight;
  expect(usedHeight).toBeLessThanOrEqual(80);
  for (const line of layout.lines) {
    expect(measurePlaceholderText(line, layout.fontSize)).toBeLessThan(80);
  }
});

test("larger placeholder boxes use a larger fitted font", () => {
  const card = layoutPlaceholderLabel("Sushi", 320, 320);
  const panel = layoutPlaceholderLabel("Sushi", 720, 540);
  expect(panel.fontSize).toBeGreaterThan(card.fontSize);
});

test("sizedCatalogImage returns a photo at the requested dimensions", () => {
  const image = sizedCatalogImage({
    id: "sills-cafe-layton",
    name: "Sill's Cafe",
    width: 320,
    height: 320,
    src: "/restaurants/sills-cafe-layton.jpg",
    photo: { photographer: "Ada", url: "https://unsplash.com/@ada", source: "Unsplash" },
  });
  expect(image).toEqual({
    kind: "photo",
    width: 320,
    height: 320,
    src: "/restaurants/sills-cafe-layton.jpg",
    alt: "Sill's Cafe",
    credit: { photographer: "Ada", url: "https://unsplash.com/@ada", source: "Unsplash" },
  });
});

test("sizedCatalogImage falls back to a fitted placeholder", () => {
  const image = sizedCatalogImage({
    id: "sills-cafe-layton",
    name: "Sill's Cafe",
    width: 720,
    height: 540,
  });
  expect(image).toEqual({
    kind: "placeholder",
    width: 720,
    height: 540,
    alt: "Sill's Cafe",
    hue: placeholderHue("sills-cafe-layton"),
    layout: layoutPlaceholderLabel("Sill's Cafe", 720, 540),
  });
});
