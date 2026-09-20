import { afterEach, expect, test, vi } from "vitest";
import { canRequestScreenWakeLock } from "./wakeLock.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("canRequestScreenWakeLock is false without the API", () => {
  vi.stubGlobal("navigator", {});
  expect(canRequestScreenWakeLock()).toBe(false);
});

test("canRequestScreenWakeLock is true when wakeLock exists", () => {
  vi.stubGlobal("navigator", { wakeLock: {} });
  expect(canRequestScreenWakeLock()).toBe(true);
});
