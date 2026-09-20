import { afterEach, expect, test, vi } from "vitest";
import { scrollPageToTop } from "./navigation.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("scrollPageToTop jumps to the top of the window", () => {
  const scrollTo = vi.fn<(x: number, y: number) => void>();
  vi.stubGlobal("window", { scrollTo });
  scrollPageToTop();
  expect(scrollTo).toHaveBeenCalledWith(0, 0);
});
