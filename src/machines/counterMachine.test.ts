import { createActor } from "xstate";
import { expect, test } from "vitest";
import { counterMachine } from "./counterMachine.ts";

function startCounter() {
  const actor = createActor(counterMachine);
  actor.start();
  return actor;
}

test("starts at 0", () => {
  const actor = startCounter();
  expect(actor.getSnapshot().context.count).toBe(0);
  actor.stop();
});

test("increment and decrement update the count", () => {
  const actor = startCounter();

  actor.send({ type: "increment" });
  actor.send({ type: "increment" });
  expect(actor.getSnapshot().context.count).toBe(2);

  actor.send({ type: "decrement" });
  expect(actor.getSnapshot().context.count).toBe(1);

  actor.stop();
});

test("reset returns the count to 0", () => {
  const actor = startCounter();

  actor.send({ type: "increment" });
  actor.send({ type: "reset" });
  expect(actor.getSnapshot().context.count).toBe(0);

  actor.stop();
});
