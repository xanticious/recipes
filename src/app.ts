import { createActor } from "xstate";
import styles from "./app.module.css";
import { counterMachine } from "./machines/counterMachine.ts";

export function mountApp(root: HTMLElement): () => void {
  const actor = createActor(counterMachine);

  root.innerHTML = `
    <main class="${styles.main}">
      <h1 class="${styles.title}">Recipes</h1>
      <p class="${styles.lede}">
        A static Vite app with TypeScript, xState, and CSS modules.
      </p>
      <p class="${styles.count}" data-count></p>
      <div class="${styles.actions}">
        <button type="button" data-decrement>Decrement</button>
        <button type="button" data-reset>Reset</button>
        <button type="button" data-increment>Increment</button>
      </div>
    </main>
  `;

  const countEl = root.querySelector("[data-count]");
  const increment = root.querySelector("[data-increment]");
  const decrement = root.querySelector("[data-decrement]");
  const reset = root.querySelector("[data-reset]");

  if (
    !(countEl instanceof HTMLElement) ||
    !(increment instanceof HTMLButtonElement) ||
    !(decrement instanceof HTMLButtonElement) ||
    !(reset instanceof HTMLButtonElement)
  ) {
    throw new Error("App markup is missing expected elements");
  }

  increment.addEventListener("click", () => {
    actor.send({ type: "increment" });
  });
  decrement.addEventListener("click", () => {
    actor.send({ type: "decrement" });
  });
  reset.addEventListener("click", () => {
    actor.send({ type: "reset" });
  });

  actor.subscribe((snapshot) => {
    countEl.textContent = `Count: ${String(snapshot.context.count)}`;
  });
  actor.start();

  return () => {
    actor.stop();
  };
}
