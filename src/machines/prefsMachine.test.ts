import { createActor } from "xstate";
import { expect, test } from "vitest";
import { prefsMachine } from "./prefsMachine.ts";

test("defaults to the provided theme and medium font", () => {
  const actor = createActor(prefsMachine, {
    input: { theme: "dark", fontSize: "medium", keepScreenAwake: true },
  });
  actor.start();
  expect(actor.getSnapshot().context).toEqual({
    theme: "dark",
    fontSize: "medium",
    keepScreenAwake: true,
  });
  actor.stop();
});

test("toggleTheme flips light and dark", () => {
  const actor = createActor(prefsMachine, { input: { theme: "light", fontSize: "small" } });
  actor.start();
  actor.send({ type: "toggleTheme" });
  expect(actor.getSnapshot().context.theme).toBe("dark");
  actor.send({ type: "toggleTheme" });
  expect(actor.getSnapshot().context.theme).toBe("light");
  actor.stop();
});

test("setFontSize updates the type scale", () => {
  const actor = createActor(prefsMachine, { input: { theme: "light", fontSize: "medium" } });
  actor.start();
  actor.send({ type: "setFontSize", fontSize: "large" });
  expect(actor.getSnapshot().context.fontSize).toBe("large");
  actor.stop();
});

test("setKeepScreenAwake updates the cooking preference", () => {
  const actor = createActor(prefsMachine, {
    input: { theme: "light", fontSize: "medium", keepScreenAwake: true },
  });
  actor.start();
  actor.send({ type: "setKeepScreenAwake", keepScreenAwake: false });
  expect(actor.getSnapshot().context.keepScreenAwake).toBe(false);
  actor.send({ type: "setKeepScreenAwake", keepScreenAwake: true });
  expect(actor.getSnapshot().context.keepScreenAwake).toBe(true);
  actor.stop();
});
