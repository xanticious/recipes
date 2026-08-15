import { createActor } from "xstate";
import { expect, test } from "vitest";
import { prefsMachine } from "./prefsMachine.ts";

test("defaults to the provided theme and medium font", () => {
  const actor = createActor(prefsMachine, { input: { theme: "dark", fontSize: "medium" } });
  actor.start();
  expect(actor.getSnapshot().context).toEqual({ theme: "dark", fontSize: "medium" });
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
