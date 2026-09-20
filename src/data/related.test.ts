import { expect, test } from "vitest";
import { missingReverseLinks } from "./related.ts";

test("missingReverseLinks reports one-way ids and ignores unknown targets", () => {
  const items = [
    { id: "a", related: ["b"] },
    { id: "b", related: [] },
    { id: "c", related: ["missing"] },
  ];
  expect(missingReverseLinks(items, (item) => item.related)).toEqual(["a → b"]);
});

test("missingReverseLinks is empty when every listed id points back", () => {
  const items = [
    { id: "a", related: ["b", "c"] },
    { id: "b", related: ["a"] },
    { id: "c", related: ["a"] },
  ];
  expect(missingReverseLinks(items, (item) => item.related)).toEqual([]);
});
