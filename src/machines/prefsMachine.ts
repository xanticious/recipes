import { assign, setup } from "xstate";
import type { FontSize, Theme } from "../data/types.ts";

export const THEME_STORAGE_KEY = "family-recipes-theme";
export const FONT_SIZE_STORAGE_KEY = "family-recipes-font-size";

export function readStoredTheme(): Theme {
  if (typeof localStorage === "undefined") {
    return "light";
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  if (typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function readStoredFontSize(): FontSize {
  if (typeof localStorage === "undefined") {
    return "medium";
  }
  const stored = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
  if (stored === "small" || stored === "medium" || stored === "large") {
    return stored;
  }
  return "medium";
}

export function persistTheme(theme: Theme): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export function persistFontSize(fontSize: FontSize): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, fontSize);
  }
}

export type PrefsContext = {
  theme: Theme;
  fontSize: FontSize;
};

export type PrefsEvent =
  | { type: "toggleTheme" }
  | { type: "setTheme"; theme: Theme }
  | { type: "setFontSize"; fontSize: FontSize };

export const prefsMachine = setup({
  types: {
    context: {} as PrefsContext,
    events: {} as PrefsEvent,
    input: {} as Partial<PrefsContext> | undefined,
  },
}).createMachine({
  id: "prefs",
  context: ({ input }) => ({
    theme: input?.theme ?? readStoredTheme(),
    fontSize: input?.fontSize ?? readStoredFontSize(),
  }),
  on: {
    toggleTheme: {
      actions: assign({
        theme: ({ context }) => (context.theme === "light" ? "dark" : "light"),
      }),
    },
    setTheme: {
      actions: assign({
        theme: ({ event }) => event.theme,
      }),
    },
    setFontSize: {
      actions: assign({
        fontSize: ({ event }) => event.fontSize,
      }),
    },
  },
});
