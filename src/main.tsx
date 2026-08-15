import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { AppActorsProvider } from "./actors.tsx";
import {
  persistFontSize,
  persistTheme,
  readStoredFontSize,
  readStoredTheme,
} from "./machines/prefsMachine.ts";
import "./style.css";

const theme = readStoredTheme();
const fontSize = readStoredFontSize();
document.documentElement.dataset.theme = theme;
document.documentElement.dataset.fontSize = fontSize;
persistTheme(theme);
persistFontSize(fontSize);

const root = document.querySelector("#app");

if (!(root instanceof HTMLElement)) {
  throw new Error("Missing #app root");
}

createRoot(root).render(
  <StrictMode>
    <AppActorsProvider>
      <App />
    </AppActorsProvider>
  </StrictMode>,
);
