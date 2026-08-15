import { assign, setup } from "xstate";

export const counterMachine = setup({
  types: {
    context: {} as { count: number },
    events: {} as { type: "increment" } | { type: "decrement" } | { type: "reset" },
  },
}).createMachine({
  id: "counter",
  context: { count: 0 },
  on: {
    increment: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    decrement: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    reset: {
      actions: assign({ count: 0 }),
    },
  },
});
